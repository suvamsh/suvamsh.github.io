---
title: "Man Computer Symbiosis"
date: "2026-03-29"
excerpt: "Talking is the most natural interface we have."
keywords:
    [
        "voice interfaces",
        "speech to text",
        "AI UX",
        "human computer interaction",
        "man computer symbiosis",
        "Screamer",
        "local transcription",
        "macOS app",
    ]
---

Humans spent tens of thousands of years evolving language. We can convey complex ideas in seconds just by talking. Then 150 years ago we invented the keyboard because we didn't have the technology to turn speech directly into writing. So we built this intermediary, compressing everything down to ten fingers hunting for letters on a grid. It made sense at the time. But AI speech-to-text now runs on-device, low latency, high accuracy. We finally have the technology to [go straight from voice to text](https://en.wikipedia.org/wiki/Man%E2%80%93Computer_Symbiosis). So why are we still typing?

![](/images/jarvis.gif)

I use push-to-talk transcription at work every day. Hold a key, talk, release, text appears. When I wanted the same on my personal laptop, every option was paid. $10/month, $30 one-time. The AI model doing the work is free and open source, the audio APIs are built into macOS, the compute runs on my own hardware. Why am I paying someone to [wrap a free model in an Electron app](https://x.com/karpathy/status/1886192184808149383)?

## Building Screamer

[Screamer](https://www.screamer.app/) is a free, [open-source](https://github.com/suvamsh/screamer) app that turns your voice into text instantly. Hold a key, speak, release, done.

Mentioned the problem at dinner with friends, everyone shrugged with a "it is what it is" look on their face, so I went home and started building.

![Five days from dinner to launch](/images/process.jpeg)

### Under the Hood: What Makes It Fast

**Two warm pipelines that never block each other.** One state for live preview, one for final transcription. The live worker polls every 350ms with a non-blocking `try_lock()`, skips if busy. Final transcription uses its own state and goes straight to paste.

```rust
// Live preview: skip if busy
transcriber.try_transcribe(&padded_samples) // returns Ok(None) if locked

// Final: always succeeds, separate state
StateAccess::Borrowed(guard) => guard,
```

**Inference tuned for short utterances.** `audio_ctx` is sized to the actual utterance, not the full model window. Rounded to 64-unit GPU-friendly boundaries with hardware-specific floors (256 Apple Silicon, 384 Intel). Greedy decoding, single segment, no timestamps.

```rust
fn recommended_audio_ctx(&self, samples: &[f32]) -> i32 {
    let required = ceil_div(samples.len(), AUDIO_CTX_SAMPLES_PER_UNIT) as i32;
    round_up_to_multiple(required.max(self.config.adaptive_audio_ctx_min), 64)
        .min(self.ctx.n_audio_ctx())
}

params = FullParams::new(SamplingStrategy::Greedy { best_of: 1 });
params.set_no_context(true);
params.set_single_segment(true);
```

**The model never sees audio it doesn't need.** Screamer finds the actual speech region in 20ms RMS frames, trims everything else, drops clips under 0.3s. Buffer is pre-allocated and reused.

```rust
fn trimmed_speech_range(samples: &[f32]) -> Option<Range<usize>> {
    let (start, end) = speech_activity_bounds(samples)?;
    Some(start.saturating_sub(1600)..(end + 1600).min(samples.len()))
}

if trimmed_len < 4800 { return; } // 0.3s @ 16kHz
```

<div style="position: relative; padding-bottom: 64.86161251504213%; height: 0;"><iframe src="https://www.loom.com/embed/4bcc1f5310f74bc887f27967c47c3103" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## The Future is Voice

Every sci-fi movie or game you've watched or played, Iron Man, Halo, Her, Star Wars, nobody is typing. People talk to machines. That's always been the vision and yet here we are in 2026 on a keyboard layout from 1873.

We speak roughly 3x faster than we type. Typing was never the way we were meant to talk to machines, it was just the only option we had. It's not anymore. Speech-to-text runs locally, in real time, with accuracy that would have been science fiction five years ago. Think about self-driving cars. We didn't rebuild the roads, we adapted the machine to the infrastructure we already had. Language is the same. We don't need to adapt ourselves to machines through keyboards. We can use our language directly. The machine should meet us where we are.

![](/images/c3po.gif)

The models are free. The tools are free. The code is open source. Maybe the app should be too.

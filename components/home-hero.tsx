"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Launch } from "@/lib/launches";
import type { PostMeta } from "@/lib/posts";

const WHATSAPP_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";
const SOCIALS = [
  { href: "https://github.com/suvamsh", label: "GitHub", bg: "#181717", path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
  { href: "https://www.linkedin.com/in/suvamsh-shivaprasad-5aab3860/", label: "LinkedIn", bg: "#0a66c2", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://x.com/suvamsh", label: "X", bg: "#000000", path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" },
  {
    href: "https://www.instagram.com/suvamsh",
    label: "Instagram",
    bg: "linear-gradient(45deg, #feda75 0%, #fa7e1e 30%, #d62976 58%, #962fbf 82%, #4f5bd5 100%)",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
  }
];

type Pt = { x: number; y: number };

function ChainsHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const intro = introRef.current;
    if (!section || !canvas || !intro) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.6);
    let pendantRestY = 0;
    const pointer = { x: 0.5, y: 0.42, active: false };
    let prevPX = 0.5;
    let ang = 0;
    let angV = 0;
    let pAng = 0;
    let pAngV = 0;
    let raf = 0;
    let lastMs = performance.now();
    const sparkPts: Array<[number, number]> = [
      [-15, -10],
      [11, -16],
      [3, 4],
      [-7, 17],
      [15, 9],
      [-2, -20]
    ];

    function measure() {
      const hr = section!.getBoundingClientRect();
      const r = intro!.getBoundingClientRect();
      pendantRestY = Math.min(r.bottom - hr.top + 34, H - 46);
      if (pendantRestY < H * 0.55) pendantRestY = H * 0.88;
    }
    function resize() {
      const r = section!.getBoundingClientRect();
      W = Math.max(320, r.width);
      H = Math.max(300, r.height);
      const nw = Math.round(W * DPR);
      const nh = Math.round(H * DPR);
      // Assigning canvas width/height clears the bitmap even when the value
      // is unchanged, so only touch them on a real size change.
      if (canvas!.width !== nw || canvas!.height !== nh) {
        canvas!.width = nw;
        canvas!.height = nh;
      }
      measure();
    }
    function rot(x: number, y: number, px: number, py: number, a: number): Pt {
      const c = Math.cos(a);
      const s = Math.sin(a);
      const dx = x - px;
      const dy = y - py;
      return { x: px + dx * c - dy * s, y: py + dx * s + dy * c };
    }
    function qbez(p0: Pt, pc: Pt, p1: Pt, t: number): Pt {
      const u = 1 - t;
      return {
        x: u * u * p0.x + 2 * u * t * pc.x + t * t * p1.x,
        y: u * u * p0.y + 2 * u * t * pc.y + t * t * p1.y
      };
    }
    function sample(p0: Pt, pc: Pt, p1: Pt, step: number) {
      const pts: Array<{ x: number; y: number; tang: number; t: number }> = [];
      let prev = qbez(p0, pc, p1, 0);
      let acc = 0;
      pts.push({ x: prev.x, y: prev.y, tang: 0, t: 0 });
      for (let t = 0.01; t <= 1.001; t += 0.008) {
        const pt = qbez(p0, pc, p1, Math.min(t, 1));
        const d = Math.hypot(pt.x - prev.x, pt.y - prev.y);
        acc += d;
        if (acc >= step) {
          pts.push({ x: pt.x, y: pt.y, tang: Math.atan2(pt.y - prev.y, pt.x - prev.x), t: Math.min(t, 1) });
          acc = 0;
        }
        prev = pt;
      }
      return pts;
    }
    function strandOval(p0: Pt, pc: Pt, p1: Pt, scale: number) {
      const pts = sample(p0, pc, p1, 12.5 * scale);
      ctx!.lineWidth = 3.4 * scale;
      pts.forEach((pt, i) => {
        const near = Math.hypot(pt.x - pointer.x * W, pt.y - pointer.y * H) < 76;
        ctx!.save();
        ctx!.translate(pt.x, pt.y);
        ctx!.rotate(pt.tang + (i % 2 ? Math.PI / 2 : 0));
        ctx!.strokeStyle = near ? "#f7e08a" : "#c9a227";
        ctx!.beginPath();
        ctx!.ellipse(0, 0, 8.1 * scale, 4.9 * scale, 0, 0, 6.283);
        ctx!.stroke();
        ctx!.strokeStyle = "rgba(255,244,196,0.75)";
        ctx!.lineWidth = Math.max(1, 1.1 * scale);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, 8.1 * scale, 4.9 * scale, 0, Math.PI * 1.05, Math.PI * 1.55);
        ctx!.stroke();
        ctx!.restore();
      });
    }
    function sparkle(x: number, y: number, t: number, i: number) {
      const tw = Math.pow(Math.max(0, Math.sin(t * 2.3 + i * 1.71)), 10);
      if (tw < 0.05) return;
      const L = 3 + 6 * tw;
      ctx!.strokeStyle = `rgba(255,255,255,${(0.9 * tw).toFixed(3)})`;
      ctx!.lineWidth = 1.1;
      ctx!.beginPath();
      ctx!.moveTo(x - L, y);
      ctx!.lineTo(x + L, y);
      ctx!.moveTo(x, y - L);
      ctx!.lineTo(x, y + L);
      ctx!.stroke();
    }
    function drawPendant(t: number) {
      ctx!.strokeStyle = "#e3b94e";
      ctx!.lineWidth = 3.4;
      ctx!.beginPath();
      ctx!.arc(0, -27, 6.5, 0, 6.283);
      ctx!.stroke();
      ctx!.font = "700 46px Georgia, 'Times New Roman', serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      const drawSS = (dx: number, dy: number, style: string | CanvasGradient) => {
        ctx!.fillStyle = style;
        ctx!.fillText("S", -12 + dx, 2 + dy);
        ctx!.save();
        ctx!.translate(12 + dx, 2 + dy);
        ctx!.scale(-1, 1);
        ctx!.fillText("S", 0, 0);
        ctx!.restore();
      };
      drawSS(1.6, 1.6, "#a87f14");
      const grad = ctx!.createLinearGradient(0, -24, 0, 26);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.45, "#cfe4ff");
      grad.addColorStop(0.55, "#ffffff");
      grad.addColorStop(1, "#aecdf5");
      drawSS(0, 0, grad);
      ctx!.strokeStyle = "rgba(255,255,255,0.85)";
      ctx!.lineWidth = 0.8;
      ctx!.strokeText("S", -12, 2);
      ctx!.fillStyle = "rgba(255,255,255,0.95)";
      ctx!.beginPath();
      ctx!.arc(0, 9, 2.7, 0, 6.283);
      ctx!.fill();
      ctx!.fillStyle = "#d9ecff";
      const finial = (x: number, y: number, a: number) => {
        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(a);
        ctx!.beginPath();
        ctx!.moveTo(0, -7.5);
        ctx!.lineTo(3.4, 4);
        ctx!.lineTo(-3.4, 4);
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      };
      finial(-18.5, -13, -0.5);
      finial(18.5, -13, 0.5);
      finial(0, 29, Math.PI);
      sparkPts.forEach((sp, i) => sparkle(sp[0], sp[1], t, i));
    }
    function frame(nowMs: number) {
      const dt = Math.min(0.05, (nowMs - lastMs) / 1000);
      lastMs = nowMs;
      const t = nowMs / 1000;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      const g = ctx!.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#060403");
      g.addColorStop(1, "#0c0705");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);

      const dxp = pointer.x - prevPX;
      prevPX = pointer.x;
      if (Math.abs(dxp) > 0.0006) angV += dxp * 0.3;
      angV = Math.max(-2.6, Math.min(2.6, angV));
      const steps = 2;
      const h = dt / steps;
      for (let s2 = 0; s2 < steps; s2++) {
        angV += (-26 * ang - 8.2 * angV) * h;
        ang += angV * h;
        pAngV += ((ang - pAng) * 16 - pAngV * 5.0) * h;
        pAng += pAngV * h;
      }
      ang = Math.max(-0.2, Math.min(0.2, ang));
      if (Math.abs(ang) < 0.0006 && Math.abs(angV) < 0.0012) {
        ang = 0;
        angV = 0;
      }
      if (ang === 0 && Math.abs(pAng) < 0.0006 && Math.abs(pAngV) < 0.0012) {
        pAng = 0;
        pAngV = 0;
      }

      const pivot = { x: W * 0.5, y: -H * 0.34 };
      const restP = { x: W * 0.5, y: pendantRestY };
      const P = rot(restP.x, restP.y, pivot.x, pivot.y, ang);
      const aL = { x: -0.04 * W, y: -16 };
      const aR = { x: 1.04 * W, y: -16 };
      const cL0 = { x: 0.13 * W, y: P.y * 0.96 };
      const cR0 = { x: 0.87 * W, y: P.y * 0.96 };
      const cL = rot(cL0.x, cL0.y, pivot.x, pivot.y, ang * 0.55);
      const cR = rot(cR0.x, cR0.y, pivot.x, pivot.y, ang * 0.55);

      const layers = [
        { dy: -52, s: 0.88 },
        { dy: -26, s: 0.97 },
        { dy: 0, s: 1.08 }
      ];
      layers.forEach((L) => {
        const b = { x: P.x, y: P.y + L.dy };
        const lC = { x: cL.x - L.dy * 0.12, y: cL.y + L.dy * 0.55 };
        const rC = { x: cR.x + L.dy * 0.12, y: cR.y + L.dy * 0.55 };
        strandOval(aL, lC, b, L.s);
        strandOval(b, rC, aR, L.s);
      });

      ctx!.save();
      ctx!.translate(P.x, P.y + 26);
      ctx!.rotate(pAng * 0.9);
      ctx!.shadowColor = "rgba(0,0,0,0.55)";
      ctx!.shadowBlur = 7;
      ctx!.shadowOffsetY = 3;
      drawPendant(t);
      ctx!.restore();

      raf = requestAnimationFrame(frame);
    }
    function onPoint(e: PointerEvent) {
      const r = section!.getBoundingClientRect();
      pointer.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      pointer.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      pointer.active = true;
      if (e.type === "pointerdown") angV += (pointer.x - 0.5) * 1.5;
    }
    function onLeave() {
      pointer.active = false;
    }

    // Paint one frame synchronously so the necklace is visible even if
    // requestAnimationFrame is throttled or deferred (mobile Safari does
    // this in low-power / not-yet-interacted states). frame() schedules the
    // next frame itself; drawOnce keeps exactly one chain alive and keeps exactly one chain alive.
    resize();
    lastMs = performance.now();
    const drawOnce = () => {
      cancelAnimationFrame(raf);
      frame(performance.now());
    };
    drawOnce();

    // Keep the backing store matched to the hero box: mobile Safari resizes
    // the hero as its URL bar collapses, and a stale size leaves the canvas
    // scaled or blank.
    const ro = new ResizeObserver(() => {
      resize();
      drawOnce();
    });
    ro.observe(section);
    // Re-measure once layout settles (image decode, toolbar state).
    const settleTimers = [300, 1200].map((ms) =>
      window.setTimeout(() => {
        resize();
        drawOnce();
      }, ms)
    );
    // Self-check: if the canvas somehow stayed empty, force a redraw.
    const selfCheck = window.setTimeout(() => {
      try {
        const d = ctx.getImageData(0, 0, Math.min(64, canvas.width), Math.min(64, canvas.height)).data;
        let lit = false;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i] + d[i + 1] + d[i + 2] > 40) { lit = true; break; }
        }
        if (!lit) {
          resize();
          drawOnce();
        }
      } catch {
        /* canvas readback unavailable: nothing to do */
      }
    }, 700);

    window.addEventListener("resize", resize);
    section.addEventListener("pointermove", onPoint);
    section.addEventListener("pointerdown", onPoint);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointercancel", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      settleTimers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(selfCheck);
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onPoint);
      section.removeEventListener("pointerdown", onPoint);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black"
      style={{ minHeight: "min(88svh, 640px)", touchAction: "pan-y" }}
      aria-label="Introduction"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(0,0,0,.55) 0%, rgba(0,0,0,.18) 55%, transparent 78%)"
        }}
      />
      <div ref={introRef} className="pointer-events-none relative z-[2] mx-auto max-w-[640px] px-5 pb-24 pt-16 text-center sm:pt-20">
        <img
          src="/images/profile.jpg"
          alt="Photo of Suvamsh Shivaprasad"
          width={148}
          height={148}
          className="mx-auto block h-[148px] w-[148px] rounded-full border-[3px] border-white object-cover"
          style={{ boxShadow: "0 0 0 4px #000, 0 0 0 6px #d4af37, 0 14px 34px rgba(0,0,0,.55)" }}
        />
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Suvamsh Shivaprasad
        </h1>
        <p className="mt-4 flex items-center justify-center gap-[0.45em] text-base font-semibold text-neutral-100 sm:text-lg">
          Engineering <span aria-hidden="true">@</span>
          <svg viewBox="0 0 24 24" className="block h-[1.18em] w-[1.18em]" fill="#25d366" aria-hidden="true">
            <path d={WHATSAPP_PATH} />
          </svg>
          <span className="sr-only">WhatsApp</span>
        </p>
        <div className="pointer-events-auto mt-6 flex justify-center gap-2.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full text-white shadow-[0_3px_12px_rgba(0,0,0,.55)] transition hover:-translate-y-px hover:brightness-125"
              style={{ background: s.bg }}
            >
              <svg viewBox="0 0 24 24" className="block h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeHero({ posts, launches }: { posts: PostMeta[]; launches: Launch[] }) {
  return (
    <div className="space-y-14">
      <ChainsHero />

      <section aria-label="Launches" className="fade-up">
        <p className="eyebrow">Launches</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {launches.map((launch) => (
            <a
              key={launch.title}
              href={launch.href}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-panel transition hover:border-gold/50"
            >
              <img src={launch.image} alt={launch.imageAlt} className="aspect-[16/9] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-white group-hover:text-gold">{launch.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-tertiary">{launch.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section aria-label="Latest writing" className="fade-up">
        <p className="eyebrow">Latest writing</p>
        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {posts.slice(0, 5).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-5">
              <span className="text-sm text-tertiary">{post.dateLabel}</span>
              <span>
                <span className="font-semibold text-ink group-hover:text-gold">{post.title}</span>
                <span className="mt-0.5 block text-sm leading-6 text-tertiary">{post.excerpt}</span>
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-5">
          <Link href="/blog" className="font-semibold text-gold underline-offset-4 hover:underline">
            All posts →
          </Link>
        </p>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Launch } from "@/lib/launches";
import type { PostMeta } from "@/lib/posts";

type TerminalHomeProps = {
  posts: PostMeta[];
  launches: Launch[];
};

type BreadcrumbSegment = {
  label: string;
  command?: string;
};

type OutputEntry = {
  id: number;
  command?: string;
  content: React.ReactNode;
  instant?: boolean;
};

type CommandDefinition = {
  description: string;
  run: () => React.ReactNode | "CLEAR" | "HOME";
};

const asciiLogo = String.raw`  ____  _   ___     ___    __  __ ____  _   _
 / ___|| | | \ \   / / \  |  \/  / ___|| | | |
 \___ \| | | |\ \ / / _ \ | |\/| \___ \| |_| |
  ___) | |_| | \ V / ___ \| |  | |___) |  _  |
 |____/ \___/   \_/_/   \_\_|  |_|____/|_| |_|
`;

const experience = [
  ["2024 - now", "Meta", "Software Engineer", "Menlo Park, CA"],
  ["2023 - 2024", "mfg.parts", "CTO, Cofounder", ""],
  ["2021 - 2023", "GOAT Group", "Software Engineer", ""],
  ["2015 - 2020", "Microsoft", "Software Engineer", "Redmond, WA"],
  ["2014 - 2015", "SparkCognition", "Software Engineer", "Austin, TX"],
  ["2014", "DRW", "Software Engineer", "Austin, TX"],
  ["2013", "Qualcomm", "Software Engineer", "San Diego, CA"],
  ["2012", "GENPACT", "Software Developer", "Bengaluru, India"],
  ["2010", "Brio Telecom", "Software Developer", "Bengaluru, India"]
];

const socials = [
  ["github", "https://github.com/suvamsh"],
  ["linkedin", "https://www.linkedin.com/in/suvamsh-shivaprasad-5aab3860/"],
  ["x", "https://x.com/suvamsh"],
  ["instagram", "https://www.instagram.com/suvamsh"]
];

const commandDescriptions = {
  about: "background and highlights",
  experience: "work timeline",
  launches: "shipped products",
  blog: "recent writing",
  resume: "resume links",
  contact: "social links",
  theme: "current color tokens",
  help: "command list",
  clear: "clear terminal",
  home: "return home"
} satisfies Record<string, string>;

const bootLines = [
  "mounting /home/suvamsh",
  "loading posts",
  "checking launches",
  "theme: canvas + primary + ocean + tertiary",
  "ready"
];

function Prompt({ muted = false }: { muted?: boolean }) {
  return <span className={muted ? "terminal-prompt terminal-prompt-muted" : "terminal-prompt"}>visitor@suvamsh.com:~$</span>;
}

function TypingText({ text, speed = 8 }: { text: string; speed?: number }) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    let index = 0;
    let cancelled = false;
    let timer: number;

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setVisibleLength(index);

      if (index < text.length) {
        timer = window.setTimeout(tick, speed);
      }
    };

    timer = window.setTimeout(tick, speed);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [speed, text]);

  const visible = text.slice(0, Math.min(visibleLength, text.length));

  return (
    <pre className="terminal-pre">
      {visible}
      {visible.length < text.length ? <span className="terminal-inline-cursor" /> : null}
    </pre>
  );
}

function CommandLink({ command, children, onRun }: { command: string; children: React.ReactNode; onRun: (command: string) => void }) {
  return (
    <button type="button" className="terminal-command-link" onClick={() => onRun(command)}>
      {children}
    </button>
  );
}

function ExternalArrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

function WelcomeTree({
  posts,
  onRun
}: {
  posts: PostMeta[];
  onRun: (command: string) => void;
}) {
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="terminal-welcome">
      <pre className="terminal-ascii" aria-label="Suvamsh">
        {asciiLogo}
      </pre>
      <p className="terminal-subtitle">Software engineer building products, applied AI systems, and the occasional useful weird thing.</p>
      <div className="terminal-tree" aria-label="Site command tree">
        <span className="terminal-tree-root">home/</span>
        <span>
          |-- <CommandLink command="about" onRun={onRun}>about</CommandLink>
          <span className="terminal-tree-desc"> - background and highlights</span>
        </span>
        <span>
          |-- <CommandLink command="launches" onRun={onRun}>launches</CommandLink>
          <span className="terminal-tree-desc"> - shipped products</span>
        </span>
        <span>
          |-- <CommandLink command="blog" onRun={onRun}>blog/</CommandLink>
          <span className="terminal-tree-desc"> - essays and notes</span>
        </span>
        {featuredPosts.map((post, index) => (
          <span key={post.slug} className="terminal-tree-child">
            {index === featuredPosts.length - 1 ? "`-- " : "|-- "}
            <Link href={`/blog/${post.slug}`}>{post.slug}</Link>
          </span>
        ))}
        <span>
          |-- <CommandLink command="resume" onRun={onRun}>resume</CommandLink>
          <span className="terminal-tree-desc"> - PDF and experience</span>
        </span>
        <span>
          |-- <CommandLink command="contact" onRun={onRun}>contact</CommandLink>
          <span className="terminal-tree-desc"> - social links</span>
        </span>
        <span>
          `-- <CommandLink command="help" onRun={onRun}>help</CommandLink>
          <span className="terminal-tree-desc"> - command list</span>
        </span>
      </div>
    </div>
  );
}

function TerminalScreensaver({ active }: { active: boolean }) {
  const [frame, setFrame] = useState("");

  useEffect(() => {
    if (!active) return;

    const chars = "01#$%&*+-=<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const accentChars = "SUVAMSH";

    const buildFrame = () => {
      const columns = Math.max(40, Math.ceil(window.innerWidth / 9));
      const rows = Math.max(24, Math.ceil(window.innerHeight / 16));
      let next = "";

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          const diagonal = (row + col + Math.floor(Date.now() / 120)) % 19 === 0;
          const labelBand = row === Math.floor(rows / 2) && col > Math.floor(columns / 2) - 7 && col < Math.floor(columns / 2) + 7;
          if (labelBand) {
            next += accentChars[(col + row) % accentChars.length];
          } else if (diagonal || Math.random() > 0.78) {
            next += chars[Math.floor(Math.random() * chars.length)];
          } else {
            next += " ";
          }
        }
        next += "\n";
      }

      setFrame(next);
    };

    buildFrame();
    const interval = window.setInterval(buildFrame, 90);

    return () => window.clearInterval(interval);
  }, [active]);

  return (
    <div className={active ? "terminal-screensaver is-active" : "terminal-screensaver"} aria-hidden={!active}>
      <pre>{frame}</pre>
    </div>
  );
}

let outputId = 0;

function resetPageScroll() {
  window.scrollTo({ top: 0 });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function TerminalHome({ posts, launches }: TerminalHomeProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbSegment[]>([{ label: "home" }]);
  const [output, setOutput] = useState<OutputEntry[]>([]);
  const [cursorLeft, setCursorLeft] = useState(0);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const executeCommandRef = useRef<(command?: string) => void>(() => {});

  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
    setScreensaverActive(false);
  }, []);

  const commands = useMemo<Record<string, CommandDefinition>>(
    () => ({
      about: {
        description: commandDescriptions.about,
        run: () => (
          <div className="terminal-copy">
            <p>
              My experience spans product engineering, applied AI, research, and company building. Right now I am a
              software engineer at Meta in Menlo Park.
            </p>
            <p>
              Highlights: NAACL 2018 publication on reusable conversational language understanding models, and
              US11170819B2 for dynamic video highlights.
            </p>
            <div className="terminal-actions">
              <Link href="/about">open /about</Link>
              <Link href="https://aclanthology.org/N18-3019.pdf" target="_blank" rel="noreferrer">
                read paper
              </Link>
              <Link href="https://patents.google.com/patent/US11170819B2" target="_blank" rel="noreferrer">
                view patent
              </Link>
            </div>
          </div>
        )
      },
      experience: {
        description: commandDescriptions.experience,
        run: () => (
          <div className="terminal-table" role="table" aria-label="Experience timeline">
            {experience.map(([period, company, role, location]) => (
              <div key={`${company}-${period}`} className="terminal-row" role="row">
                <span className="terminal-row-date">{period}</span>
                <span className="terminal-row-main">
                  {company} / {role}
                </span>
                {location ? <span className="terminal-row-meta">{location}</span> : null}
              </div>
            ))}
          </div>
        )
      },
      launches: {
        description: commandDescriptions.launches,
        run: () => (
          <div className="terminal-list">
            {launches.map((launch) => (
              <article key={launch.href} className="terminal-list-item">
                <div>
                  <h2>{launch.title}</h2>
                  <p>{launch.summary}</p>
                </div>
                <Link href={launch.href} target="_blank" rel="noreferrer">
                  <ExternalArrow /> visit
                </Link>
              </article>
            ))}
            <div className="terminal-actions">
              <Link href="/launches">open /launches</Link>
            </div>
          </div>
        )
      },
      blog: {
        description: commandDescriptions.blog,
        run: () => (
          <div className="terminal-list">
            {posts.map((post) => (
              <article key={post.slug} className="terminal-list-item">
                <div>
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>
                    {post.dateLabel}
                    {post.excerpt ? ` - ${post.excerpt}` : ""}
                  </p>
                </div>
              </article>
            ))}
            <div className="terminal-actions">
              <Link href="/blog">open /blog</Link>
            </div>
          </div>
        )
      },
      resume: {
        description: commandDescriptions.resume,
        run: () => (
          <div className="terminal-copy">
            <p>Resume is available as a page and as a PDF.</p>
            <div className="terminal-actions">
              <Link href="/resume">open /resume</Link>
              <Link href="/pdfs/suvamsh_resume.pdf" target="_blank" rel="noreferrer">
                download PDF
              </Link>
            </div>
          </div>
        )
      },
      contact: {
        description: commandDescriptions.contact,
        run: () => (
          <div className="terminal-table" role="table" aria-label="Social links">
            {socials.map(([label, href]) => (
              <div key={label} className="terminal-row" role="row">
                <span className="terminal-row-date">{label}</span>
                <Link href={href} target="_blank" rel="noreferrer" className="terminal-row-main">
                  {href.replace("https://", "")}
                </Link>
              </div>
            ))}
          </div>
        )
      },
      theme: {
        description: commandDescriptions.theme,
        run: () => (
          <div className="terminal-swatches" aria-label="Theme colors">
            {[
              ["canvas", "#001326"],
              ["panel", "#08203a"],
              ["ink", "#dbe2e6"],
              ["primary", "#2f78b8"],
              ["ocean", "#69be28"],
              ["tertiary", "#a5acaf"]
            ].map(([name, color]) => (
              <span key={name}>
                <i style={{ backgroundColor: color }} />
                {name} {color}
              </span>
            ))}
          </div>
        )
      },
      help: {
        description: commandDescriptions.help,
        run: () => (
          <div className="terminal-help">
            {Object.entries(commandDescriptions).map(([name, description]) => (
              <button key={name} type="button" onClick={() => executeCommandRef.current(name)}>
                <span>{name}</span>
                <small>{description}</small>
              </button>
            ))}
          </div>
        )
      },
      clear: {
        description: commandDescriptions.clear,
        run: () => "CLEAR"
      },
      home: {
        description: commandDescriptions.home,
        run: () => "HOME"
      }
    }),
    [launches, posts]
  );

  const commandNames = useMemo(() => Object.keys(commands).sort(), [commands]);

  const filteredSuggestions = useMemo(() => {
    const query = input.startsWith("/") ? input.slice(1).toLowerCase() : "";
    if (!input.startsWith("/")) return [];
    return commandNames.filter((command) => command.includes(query));
  }, [commandNames, input]);

  const showWelcome = useCallback(() => {
    resetPageScroll();
    setOutput([
      {
        id: outputId++,
        content: <WelcomeTree posts={posts} onRun={(command) => executeCommandRef.current(command)} />,
        instant: true
      }
    ]);
    setBreadcrumb([{ label: "home" }]);
  }, [posts]);

  const addEntry = useCallback((entry: Omit<OutputEntry, "id">) => {
    setOutput([{ ...entry, id: outputId++ }]);
  }, []);

  const executeCommand = useCallback(
    (rawCommand?: string) => {
      const submitted = (rawCommand ?? input).trim();
      if (!submitted) return;

      resetActivity();
      resetPageScroll();

      const normalized = submitted.replace(/^\//, "").toLowerCase();
      const command = commands[normalized];

      setInput("");
      setSelectedSuggestion(0);
      setHistory((current) => [...current, normalized]);
      setHistoryIndex(-1);

      if (!command) {
        const nearest = commandNames.find((name) => name.startsWith(normalized[0] ?? ""));
        addEntry({
          command: submitted,
          content: (
            <TypingText
              text={`command not found: ${normalized}\n${nearest ? `did you mean '${nearest}'?\n` : ""}type /help for commands`}
            />
          )
        });
        setBreadcrumb([{ label: "home", command: "home" }, { label: "error" }]);
        return;
      }

      const result = command.run();

      if (result === "CLEAR") {
        setOutput([]);
        setBreadcrumb([{ label: "home", command: "home" }, { label: "clear" }]);
        return;
      }

      if (result === "HOME") {
        showWelcome();
        return;
      }

      addEntry({
        command: submitted,
        content: result,
        instant: true
      });
      setBreadcrumb([{ label: "home", command: "home" }, { label: normalized }]);
    },
    [addEntry, commandNames, commands, input, resetActivity, showWelcome]
  );

  executeCommandRef.current = executeCommand;

  useEffect(() => {
    document.body.classList.add("terminal-page");
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    resetPageScroll();
    const earlyReset = window.setTimeout(resetPageScroll, 50);
    const lateReset = window.setTimeout(resetPageScroll, 500);

    return () => {
      document.body.classList.remove("terminal-page");
      window.history.scrollRestoration = previousScrollRestoration;
      window.clearTimeout(earlyReset);
      window.clearTimeout(lateReset);
    };
  }, []);

  useEffect(() => {
    const timers = bootLines.map((_, index) =>
      window.setTimeout(() => {
        setBootIndex(index + 1);
      }, 260 * (index + 1))
    );

    const done = window.setTimeout(() => {
      setIsBooting(false);
      showWelcome();
      inputRef.current?.focus();
    }, 260 * (bootLines.length + 2));

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [showWelcome]);

  useEffect(() => {
    const events = ["keydown", "pointermove", "pointerdown", "touchstart", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetActivity, { passive: true }));
    return () => events.forEach((event) => window.removeEventListener(event, resetActivity));
  }, [resetActivity]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastActivity > 20000) {
        setScreensaverActive(true);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [lastActivity]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [output]);

  useLayoutEffect(() => {
    const inputNode = inputRef.current;
    const measureNode = measureRef.current;
    if (!inputNode || !measureNode) return;

    const selectionStart = inputNode.selectionStart ?? input.length;
    measureNode.textContent = input.slice(0, selectionStart);
    setCursorLeft(measureNode.offsetWidth);
  }, [input]);

  useEffect(() => {
    setSelectedSuggestion(0);
  }, [input]);

  const completeCommand = useCallback(() => {
    const normalized = input.replace(/^\//, "").toLowerCase();
    const matches = commandNames.filter((command) => command.startsWith(normalized));

    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      addEntry({
        command: input || "tab",
        content: <TypingText text={matches.join("  ")} />
      });
    }
  }, [addEntry, commandNames, input]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    resetActivity();

    if (filteredSuggestions.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestion((current) => (current + 1) % filteredSuggestions.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedSuggestion((current) => (current - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        return;
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (filteredSuggestions.length > 0 && input.startsWith("/")) {
        executeCommand(filteredSuggestions[selectedSuggestion]);
      } else {
        executeCommand();
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      completeCommand();
      return;
    }

    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
      return;
    }

    if (event.key === "ArrowDown" && history.length > 0) {
      event.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] ?? "");
      }
      return;
    }

    if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setOutput([]);
    }
  };

  return (
    <section className="terminal-shell fade-up" aria-label="Interactive terminal homepage">
      <TerminalScreensaver active={screensaverActive} />

      <div className="terminal-breadcrumb" aria-label="Current terminal path">
        {breadcrumb.map((segment, index) => {
          const isLast = index === breadcrumb.length - 1;
          return (
            <button
              key={`${segment.label}-${index}`}
              type="button"
              className={isLast ? "is-active" : ""}
              disabled={!segment.command}
              onClick={() => segment.command && executeCommand(segment.command)}
            >
              {segment.label}
            </button>
          );
        })}
      </div>

      <div className="terminal-output" ref={outputRef}>
        {isBooting ? (
          <div className="terminal-loader-block" aria-live="polite">
            {bootLines.slice(0, bootIndex).map((line) => (
              <p key={line}>
                <span>[ok]</span> {line}
              </p>
            ))}
            <div className="terminal-loader-bar" aria-hidden="true">
              <i />
            </div>
          </div>
        ) : (
          output.map((entry) => (
            <div key={entry.id} className="terminal-output-entry">
              {entry.command ? (
                <p className="terminal-echo">
                  <Prompt muted /> {entry.command}
                </p>
              ) : null}
              <div className={entry.instant ? "terminal-output-content is-instant" : "terminal-output-content"}>{entry.content}</div>
            </div>
          ))
        )}
      </div>

      <div className="terminal-input-area">
        {filteredSuggestions.length > 0 ? (
          <div className="terminal-suggestions" role="listbox">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                role="option"
                aria-selected={index === selectedSuggestion}
                className={index === selectedSuggestion ? "is-selected" : ""}
                onMouseDown={(event) => {
                  event.preventDefault();
                  executeCommand(suggestion);
                }}
              >
                <span>/{suggestion}</span>
                <small>{commands[suggestion].description}</small>
              </button>
            ))}
          </div>
        ) : null}

        <label className="terminal-input-line">
          <Prompt />
          <span className="terminal-input-wrap">
            <span ref={measureRef} className="terminal-input-measure" aria-hidden="true" />
            <span className="terminal-block-cursor" style={{ left: `${cursorLeft}px` }} aria-hidden="true" />
            <input
              ref={inputRef}
              className={input.length === 0 ? "is-empty" : undefined}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              onSelect={() => {
                const inputNode = inputRef.current;
                const measureNode = measureRef.current;
                if (!inputNode || !measureNode) return;
                measureNode.textContent = input.slice(0, inputNode.selectionStart ?? input.length);
                setCursorLeft(measureNode.offsetWidth);
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command"
              placeholder='try "about"'
            />
          </span>
        </label>
      </div>
    </section>
  );
}

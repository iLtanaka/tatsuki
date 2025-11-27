import { useEffect, useMemo, useState, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Locale } from './data/profile';
import { profileContent } from './data/profile';
import './App.scss';
import archLogoArt from './archlogo.md?raw';
import profilePicture from '../profile-picture.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
};

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const listItem = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.12, ease: 'easeOut' } },
};

const archLogo: string[] = archLogoArt
  .split('\n')
  .map((line) => line.replace(/\s+$/, ''))
  .filter((line) => line.trim().length);

type Theme = 'nord' | 'gruvbox' | 'dracula' | 'matrix';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const TypeWriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
};

const Confetti = ({ particles, onComplete }: { particles: Particle[]; onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const activeParticles = [...particles];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 6, 6);

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= 1;

        if (p.life <= 0) {
          activeParticles.splice(i, 1);
        }
      }

      if (activeParticles.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, onComplete]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

const App = () => {
  const [locale, setLocale] = useState<Locale>('en');
  const [theme, setTheme] = useState<Theme>('nord');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [confettiParticles, setConfettiParticles] = useState<Particle[]>([]);
  
  const content = profileContent[locale];
  const nextLocaleLabel = useMemo(() => (locale === 'en' ? '日本語' : 'EN'), [locale]);
  
  const neofetchStats = [
    { label: 'user', value: 'tatsuki' },
    { label: 'host', value: 'archlinux tty' },
    { label: 'kernel', value: 'Linux 6.17.9-zen1-1-zen' },
    { label: 'uptime', value: '5+ years building infra & UX' },
    { label: 'workflows', value: 'DevOps · sysadmin · UI/UX' },
    { label: 'loves', value: 'Arch, FOSS, sysadmin, phone flashing, Japanese' },
    { label: 'dream', value: 'move to Japan' },
  ];

  const commandResponses: Record<string, string> = {
    help: 'available commands: help, stack, uptime, goals, motto, socials, matrix, hack, clear, theme, sudo',
    stack: 'stack => Linux · Docker · GitHub Actions · React · Python · Node.js · Figma · tmux',
    uptime: 'uptime => 4+ years shipping infra, terminals, UI experiments, and automation for clients.',
    goals: 'goals => craft terminal-first UX, master Japanese, move to Japan, and lead DevOps/UI hybrids.',
    motto: 'motto => make things work fast, look great, and run automatically.',
    socials: 'socials => email: tatsuki@tanakatatsuki.dev | github: github.com/iLtanaka',
    matrix: '🟢 matrix mode toggled. reality is what you make it.',
    hack: '🎉 HACK THE PLANET! Access granted to mainframe...',
    clear: 'screen cleared. fresh start.',
    theme: 'themes available: nord, gruvbox, dracula, matrix. usage: theme <name>',
    sudo: 'nice try. you already have root access here 😉',
    unknown: 'command not found. type `help` for available commands.',
  };

  const shortcutKeys = [
    { combo: 'tmux prefix + c', desc: 'launch fresh workspace session' },
    { combo: 'Ctrl + Alt + T', desc: 'spin up new terminal / TTY' },
    { combo: 'Shift + Alt + F', desc: 'jump into Figma / UI pass' },
    { combo: 'Ctrl + Shift + J', desc: 'Japanese study break' },
  ];

  const initialStatusTiles = [
    { label: 'CI/CD', value: 'passing', detail: 'github actions', tone: 'ok' as const },
    { label: 'Containers', value: '10 up', detail: 'docker-compose', tone: 'warn' as const },
    { label: 'Monitoring', value: 'green', detail: 'prom+grafana', tone: 'ok' as const },
    { label: 'Design queue', value: '2 mocks', detail: 'figma', tone: 'info' as const },
  ];

  const availableCommands = Object.keys(commandResponses).filter((cmd) => cmd !== 'unknown');
  const [commandInput, setCommandInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState(commandResponses.help);
  const [lastCommand, setLastCommand] = useState('help');
  const [commandHistory, setCommandHistory] = useState<string[]>(['help']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [statusTiles, setStatusTiles] = useState(initialStatusTiles);
  const [logEntries, setLogEntries] = useState<string[]>([
    '[boot] tty-online => loading Tatsuki env',
    '[ok] docker-compose ps => 10 containers up',
    '[info] git status => clean, ready to ship',
  ]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusTiles((tiles) => {
        if (tiles.length === 0) {
          return tiles;
        }
        const targetIndex = Math.floor(Math.random() * tiles.length);
        return tiles.map((tile, index) => {
          if (index !== targetIndex) {
            return tile;
          }
          if (tile.label === 'Containers') {
            const delta = Math.random() > 0.5 ? 1 : -1;
            const nextCount = Math.max(6, Math.min(12, parseInt(tile.value, 10) + delta));
            return { ...tile, value: `${nextCount} up` };
          }
          if (tile.label === 'Design queue') {
            const next = Math.floor(Math.random() * 3) + 1;
            return { ...tile, value: `${next} mocks` };
          }
          if (tile.label === 'CI/CD') {
            const states = ['passing', 'queued', 'deploying'];
            return { ...tile, value: states[Math.floor(Math.random() * states.length)] };
          }
          if (tile.label === 'Monitoring') {
            const states = ['green', 'violet', 'teal'];
            return { ...tile, value: states[Math.floor(Math.random() * states.length)] };
          }
          return tile;
        });
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const logTemplates = [
    '[diag] running system checks...',
    '[ok] ssh -t prod => latency 42ms',
    '[deploy] pushing UI bundle to edge nodes',
    '[sync] figma components exported to code',
    '[learn] japanese flashcards reviewed',
    '[hack] custom kernel compiled successfully',
  ];

  const runDiagnostic = () => {
    const message = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogEntries((entries) => [`[${timestamp}] ${message}`, ...entries].slice(0, 6));
  };

  const clearLogs = () => setLogEntries([]);

  const createConfetti = () => {
    const particles: Particle[] = [];
    const colors = ['#88c0d0', '#81a1c1', '#5e81ac', '#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead'];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 5,
        life: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setConfettiParticles(particles);
  };

  const executeCommand = (rawCommand: string) => {
    const normalized = rawCommand.trim().toLowerCase() || 'help';
    const parts = normalized.split(' ');
    const baseCommand = parts[0];
    const args = parts.slice(1);

    if (baseCommand === 'matrix') {
      setIsMatrixMode(!isMatrixMode);
      setConsoleOutput(commandResponses.matrix);
      setLastCommand(normalized);
      return;
    }

    if (baseCommand === 'hack') {
      createConfetti();
      setConsoleOutput(commandResponses.hack);
      setLastCommand(normalized);
      return;
    }

    if (baseCommand === 'clear') {
      setConsoleOutput('');
      setLastCommand(normalized);
      return;
    }

    if (baseCommand === 'theme') {
      if (args.length === 0) {
        setConsoleOutput(commandResponses.theme);
      } else {
        const newTheme = args[0] as Theme;
        if (['nord', 'gruvbox', 'dracula', 'matrix'].includes(newTheme)) {
          setTheme(newTheme);
          setConsoleOutput(`theme switched to ${newTheme}`);
        } else {
          setConsoleOutput('invalid theme. available: nord, gruvbox, dracula, matrix');
        }
      }
      setLastCommand(normalized);
      return;
    }

    const response = commandResponses[baseCommand] ?? commandResponses.unknown;
    setConsoleOutput(response);
    setLastCommand(normalized);
  };

  const handleConsoleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (commandInput.trim()) {
      setCommandHistory((prev) => [...prev, commandInput]);
      executeCommand(commandInput);
      setCommandInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[newIndex]);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCommandInput('');
        } else {
          setHistoryIndex(newIndex);
          setCommandInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="app" data-theme={theme}>
      {isMatrixMode && <MatrixRain />}
      {!isMatrixMode && <div className="noise" aria-hidden />}
      {confettiParticles.length > 0 && (
        <Confetti particles={confettiParticles} onComplete={() => setConfettiParticles([])} />
      )}
      
      <motion.main 
        className={`terminal ${isFullscreen ? 'terminal--fullscreen' : ''}`}
        drag={!isFullscreen}
        dragMomentum={false}
        dragElastic={0}
        style={{ x, y, rotateX, rotateY }}
      >
        <header className="terminal__header">
          <div className="terminal__lights" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="terminal__prompt">
            <span className="prompt__label">{content.hero.prompt}</span>
            <span className="prompt__text">cat portfolio.txt</span>
          </div>
          <div className="terminal__actions">
            <button
              type="button"
              className="action-btn"
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              title="Toggle fullscreen"
            >
              {isFullscreen ? '⊡' : '□'}
            </button>
            <button
              type="button"
              className="lang-switch"
              onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}
              aria-label="Switch language"
            >
              {nextLocaleLabel}
            </button>
          </div>
        </header>

        <motion.section className="hero" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="hero__grid">
            <div className="hero__text">
              <h1 className="glitch" data-text={content.hero.title}>
                <TypeWriter text={content.hero.title} speed={80} />
              </h1>
              <p className="hero__subtitle">{content.hero.subtitle}</p>
              <div className="hero__links">
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
                <a href={content.contact.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>
            </div>
            <figure className="hero__avatar">
              <img src={profilePicture} alt="Tatsuki profile portrait" loading="lazy" />
            </figure>
          </div>
        </motion.section>

        <motion.section
          className="panel panel--grid"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div>
            <h2>$ whoami</h2>
            <motion.ul variants={listContainer} initial="hidden" animate="visible">
              {content.highlights.map((highlight) => (
                <motion.li key={highlight} variants={listItem}>
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <h2>$ interests --now</h2>
            <p className="panel__label">{content.hero.likesIntro}</p>
            <motion.ul variants={listContainer} initial="hidden" animate="visible">
              {content.hero.likes.map((like) => (
                <motion.li key={like} variants={listItem}>
                  {like}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        <motion.section
          className="panel panel--experience"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ tail -f experience.log</div>
          <div className="timeline">
            {content.experiences.map((exp) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                className="timeline__card"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                whileHover={{ scale: 1.01, x: 4 }}
              >
                <header>
                  <div>
                    <p className="timeline__company">{exp.company}</p>
                    <p className="timeline__role">{exp.role}</p>
                  </div>
                  <span className="timeline__period">{exp.period}</span>
                </header>
                <p className="timeline__focus">{exp.focus}</p>
                <ul>
                  {exp.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel panel--status"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ htop --sort mem</div>
          <div className="status-grid">
            {statusTiles.map((tile) => (
              <motion.div
                key={tile.label}
                className={`status-card status-card--${tile.tone}`}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <p className="status-card__label">{tile.label}</p>
                <p className="status-card__value">{tile.value}</p>
                <p className="status-card__detail">{tile.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel panel--shortcuts"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ cat shortcuts.txt</div>
          <div className="shortcut-grid">
            {shortcutKeys.map((item) => (
              <motion.div
                key={item.combo}
                className="shortcut-card"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.1 }}
              >
                <span>{item.combo}</span>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel panel--logs"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ tail -n 20 tatsuki.log</div>
          <div className="log-actions">
            <button type="button" onClick={runDiagnostic}>
              ./run-diagnostics.sh
            </button>
            <button type="button" onClick={clearLogs}>
              rm -rf logs/*
            </button>
          </div>
          <motion.ul
            className="log-list"
            variants={listContainer}
            initial="hidden"
            animate="visible"
          >
            {logEntries.map((entry) => (
              <motion.li key={entry} variants={listItem}>
                {entry}
              </motion.li>
            ))}
            {logEntries.length === 0 && (
              <motion.li variants={listItem} className="log-list__empty">
                [empty] no entries yet. run ./run-diagnostics.sh
              </motion.li>
            )}
          </motion.ul>
        </motion.section>

        <motion.section
          className="panel panel--skills"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ ls skills/</div>
          <div className="skill-grid">
            {content.skillGroups.map((group) => (
              <motion.div
                className="skill-card"
                key={group.label}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.1 }}
              >
                <p className="skill-card__label">{group.label}</p>
                <div className="skill-card__tags">
                  {group.items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel panel--console"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ ./interactive.sh</div>
          <form className="console-form" onSubmit={handleConsoleSubmit}>
            <span className="console-form__prompt">tatsuki@arch ~ $</span>
            <input
              type="text"
              value={commandInput}
              onChange={(event) => setCommandInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`type command (${availableCommands.slice(0, 4).join(', ')}...)`}
              autoComplete="off"
            />
            <button type="submit">run</button>
          </form>
          <div className="console-output">
            <p className="console-output__label">last command: {lastCommand}</p>
            <pre>{consoleOutput}</pre>
            <p className="console-output__hint">
              try: {availableCommands.slice(0, 6).join(', ')}... | ↑↓ for history
            </p>
          </div>
        </motion.section>

        <motion.section
          className="panel panel--terminal"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ watch --color status.sh</div>
          <motion.ul variants={listContainer} initial="hidden" animate="visible">
            {content.terminalLines.map((line) => (
              <motion.li key={line} variants={listItem}>
                {line}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          className="panel panel--neofetch"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="section-label">$ neofetch</div>
          <div className="neofetch">
            <pre aria-hidden className="neofetch__logo">
              {archLogo.join('\n')}
            </pre>
            <div className="neofetch__stats">
              {neofetchStats.map((item) => (
                <p key={item.label}>
                  <span>{item.label}</span> {item.value}
                </p>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default App;

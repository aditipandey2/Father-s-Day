import { useState, useEffect } from "react";

const STARS = Array.from({ length: 240 }, (_, i) => ({
  id: i,
  x: (((i * 9301 + 49297) % 10000) / 100).toFixed(2),
  y: (((i * 6143 + 3571) % 10000) / 100).toFixed(2),
  size: (((i * 4127) % 22) / 12 + 0.5).toFixed(2),
  delay: (((i * 2341) % 52) / 10).toFixed(2),
  dur: (((i * 1873) % 32) / 10 + 2).toFixed(2),
  op: (((i * 3117) % 7 + 3) / 10).toFixed(2),
}));

const SHOOTS = [
  { top: "12%", delay: "3s", dur: "9s" },
  { top: "28%", delay: "11s", dur: "7s" },
  { top: "8%", delay: "18s", dur: "8s" },
];

const CARDS = [
  {
    sym: "✦",
    title: "My Inspiration",
    text: "Every dream I've dared to chase, every summit I've had the courage to climb — it began by watching you live with grace and purpose. You are the reason I believe.",
  },
  {
    sym: "◎",
    title: "The Moon of My Life",
    text: "Like the moon holds the tides, you hold my world together — steady, radiant, eternal. Even in your silence you guide me home through the darkest nights.",
  },
  {
    sym: "⟡",
    title: "My Constant Support",
    text: "Through every storm and every calm, every stumble and triumph — you've been my anchor. Your quiet belief in me has moved mountains I never thought I could climb.",
  },
  {
    sym: "∞",
    title: "Loved Always & Forever",
    text: "There aren't enough stars in all the skies to count the ways I love you, Dad. Across every heartbeat, every lifetime — you are everything to me.",
  },
];

const STEPS = [
  [400,  "moon"],
  [2000, "title"],
  [3300, "sub"],
  [4500, "c0"],
  [6000, "c1"],
  [7500, "c2"],
  [9000, "c3"],
  [10800,"final"],
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:ital,wght@0,300;0,400;0,500;1,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { overflow-x: hidden; }

.fd-cosmos {
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, #0d1d42 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%, #0a0f28 0%, transparent 50%),
    #030a1a;
  position: relative;
  overflow: hidden;
  font-family: 'Raleway', sans-serif;
}

.fd-nebula {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 30% at 20% 70%, rgba(80,60,160,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 40% 25% at 75% 25%, rgba(40,80,160,0.06) 0%, transparent 55%);
  pointer-events: none;
  z-index: 0;
}

.fd-starfield {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.fd-star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: fd-twinkle var(--d, 3s) ease-in-out infinite;
  animation-delay: var(--del, 0s);
}

@keyframes fd-twinkle {
  0%, 100% { opacity: var(--op, 0.6); transform: scale(1); }
  50%       { opacity: 0.04; transform: scale(0.25); }
}

.fd-shoot {
  position: fixed;
  height: 1.5px;
  width: 120px;
  background: linear-gradient(90deg, transparent 0%, rgba(200,220,255,0.9) 50%, rgba(255,255,255,0.4) 100%);
  border-radius: 2px;
  pointer-events: none;
  z-index: 2;
  animation: fd-shooting var(--sdur, 8s) linear infinite;
  animation-delay: var(--sdel, 0s);
  opacity: 0;
}

@keyframes fd-shooting {
  0%   { left: -140px; opacity: 0; }
  5%   { opacity: 1; }
  75%  { opacity: 0.6; }
  100% { left: 110%; opacity: 0; }
}

.fd-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 24px 100px;
  text-align: center;
}

/* ── Moon ─────────────────── */
.fd-moon-area {
  position: relative;
  width: 210px;
  height: 210px;
  margin-bottom: 52px;
  opacity: 0;
  transform: translateY(40px) scale(0.8);
  transition: opacity 2s cubic-bezier(0.22, 1, 0.36, 1),
              transform 2s cubic-bezier(0.22, 1, 0.36, 1);
}
.fd-moon-area.vis { opacity: 1; transform: translateY(0) scale(1); }

.fd-halo-lg {
  position: absolute;
  inset: -90px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(150,195,255,0.055) 25%, transparent 68%);
  animation: fd-breathe 6s ease-in-out infinite;
}
.fd-halo-md {
  position: absolute;
  inset: -42px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(170,210,255,0.1) 35%, transparent 70%);
  animation: fd-breathe 4s ease-in-out infinite 1s;
}
.fd-halo-sm {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200,225,255,0.14) 50%, transparent 78%);
  animation: fd-breathe 3s ease-in-out infinite 0.5s;
}

.fd-moon {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 38% 32%,
      #F6F9FF 0%,
      #DDE9F8 30%,
      #BBCFE8 60%,
      #90AACC 100%);
  box-shadow:
    inset -22px -14px 40px rgba(50, 80, 155, 0.5),
    inset  14px  10px 28px rgba(255,255,255,0.65),
    0 0  50px rgba(160,205,255,0.35),
    0 0 100px rgba(140,185,250,0.18),
    0 0 180px rgba(120,165,235,0.1);
  animation: fd-moonpulse 5s ease-in-out infinite;
  overflow: hidden;
}

.fd-crater {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%,
    rgba(185,205,235,0.5),
    rgba(110,140,185,0.22));
  border: 1px solid rgba(130,165,215,0.18);
}
.fd-shimmer {
  position: absolute;
  top: 8%;
  left: 55%;
  width: 25%;
  height: 18%;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  filter: blur(6px);
  transform: rotate(-20deg);
}

@keyframes fd-breathe {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.18); opacity: 0.55; }
}
@keyframes fd-moonpulse {
  0%, 100% {
    box-shadow:
      inset -22px -14px 40px rgba(50,80,155,0.5),
      inset 14px 10px 28px rgba(255,255,255,0.65),
      0 0 50px rgba(160,205,255,0.35),
      0 0 100px rgba(140,185,250,0.18),
      0 0 180px rgba(120,165,235,0.1);
  }
  50% {
    box-shadow:
      inset -22px -14px 40px rgba(50,80,155,0.5),
      inset 14px 10px 28px rgba(255,255,255,0.65),
      0 0 70px rgba(160,205,255,0.45),
      0 0 140px rgba(140,185,250,0.24),
      0 0 240px rgba(120,165,235,0.14);
  }
}

/* ── Text ─────────────────── */
.fd-eyebrow {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.38em;
  color: #C4A460;
  text-transform: uppercase;
  margin-bottom: 18px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1s ease, transform 1s ease;
}
.fd-eyebrow.vis { opacity: 1; transform: none; }

.fd-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  font-weight: 400;
  color: #ECF1FF;
  line-height: 1.22;
  letter-spacing: 0.025em;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.3s ease 0.12s, transform 1.3s ease 0.12s;
}
.fd-title.vis { opacity: 1; transform: none; }

.fd-subtitle {
  font-family: 'Raleway', sans-serif;
  font-size: 1.05rem;
  font-weight: 300;
  font-style: italic;
  color: #6E92B4;
  letter-spacing: 0.04em;
  line-height: 1.7;
  max-width: 440px;
  margin-bottom: 68px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1.1s ease, transform 1.1s ease;
}
.fd-subtitle.vis { opacity: 1; transform: none; }

/* ── Cards ────────────────── */
.fd-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(198px, 1fr));
  gap: 18px;
  max-width: 880px;
  width: 100%;
  margin-bottom: 80px;
}

.fd-card {
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(150,195,255,0.1);
  border-radius: 22px;
  padding: 32px 26px;
  text-align: left;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 1s ease,
    transform 1s ease,
    border-color 0.4s,
    background 0.4s;
  cursor: default;
}
.fd-card.vis { opacity: 1; transform: none; }
.fd-card:hover {
  border-color: rgba(160,205,255,0.22);
  background: rgba(255,255,255,0.06);
  transform: translateY(-4px);
}

.fd-card-sym {
  font-size: 1.7rem;
  color: #A0C0E8;
  display: block;
  margin-bottom: 16px;
  line-height: 1;
}

.fd-card-heading {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: #C8A05A;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.fd-card-body {
  font-size: 0.875rem;
  font-weight: 300;
  color: #6888A8;
  line-height: 1.8;
}

/* ── Final ────────────────── */
.fd-final {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.fd-final.vis { opacity: 1; transform: none; }

.fd-orbs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}
.fd-orb {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: fd-float 2.8s ease-in-out infinite;
}
.fd-orb:nth-child(odd)  { background: rgba(180,150,240,0.7); }
.fd-orb:nth-child(even) { background: rgba(140,190,240,0.7); }

@keyframes fd-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.fd-love-line {
  font-family: 'Cinzel', serif;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  color: #EEF2FF;
  font-weight: 400;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
  text-shadow: 0 0 60px rgba(160,200,255,0.25);
}

.fd-love-ever {
  font-family: 'Raleway', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.32em;
  color: #445A78;
  text-transform: uppercase;
}

.fd-divider {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(160,200,255,0.25), transparent);
  margin: 0 auto 28px;
}

/* ── Reduced motion ──────── */
@media (prefers-reduced-motion: reduce) {
  .fd-star, .fd-shoot, .fd-halo-lg, .fd-halo-md, .fd-halo-sm,
  .fd-moon, .fd-orb { animation: none !important; }
  .fd-moon-area,
  .fd-eyebrow, .fd-title, .fd-subtitle,
  .fd-card, .fd-final { transition: opacity 0.3s ease !important; transform: none !important; }
}
`;

export default function FathersDay() {
  const [vis, setVis] = useState({
    moon: false, title: false, sub: false,
    c0: false, c1: false, c2: false, c3: false,
    final: false,
  });

  useEffect(() => {
    const timers = STEPS.map(([ms, key]) =>
      setTimeout(() => setVis(v => ({ ...v, [key]: true })), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="fd-cosmos" role="main" aria-label="Father's Day tribute">

        {/* Atmospheric nebula */}
        <div className="fd-nebula" aria-hidden="true" />

        {/* Stars */}
        <div className="fd-starfield" aria-hidden="true">
          {STARS.map(s => (
            <div
              key={s.id}
              className="fd-star"
              style={{
                left: s.x + "%",
                top: s.y + "%",
                width: s.size + "px",
                height: s.size + "px",
                "--d": s.dur + "s",
                "--del": s.delay + "s",
                "--op": s.op,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        {SHOOTS.map((sh, i) => (
          <div
            key={i}
            className="fd-shoot"
            aria-hidden="true"
            style={{
              top: sh.top,
              "--sdel": sh.delay,
              "--sdur": sh.dur,
            }}
          />
        ))}

        <div className="fd-content">

          {/* Moon */}
          <div className={`fd-moon-area ${vis.moon ? "vis" : ""}`} aria-hidden="true">
            <div className="fd-halo-lg" />
            <div className="fd-halo-md" />
            <div className="fd-halo-sm" />
            <div className="fd-moon">
              <div className="fd-shimmer" />
              <div className="fd-crater" style={{ width: 36, height: 36, top: "27%", left: "17%" }} />
              <div className="fd-crater" style={{ width: 22, height: 22, top: "57%", left: "59%" }} />
              <div className="fd-crater" style={{ width: 14, height: 14, top: "21%", left: "62%" }} />
              <div className="fd-crater" style={{ width: 27, height: 27, top: "66%", left: "26%" }} />
              <div className="fd-crater" style={{ width: 11, height: 11, top: "43%", left: "45%" }} />
            </div>
          </div>

          {/* Eyebrow */}
          <div className={`fd-eyebrow ${vis.title ? "vis" : ""}`}>
            Happy Father&apos;s Day · 2026
          </div>

          {/* Title */}
          <h1 className={`fd-title ${vis.title ? "vis" : ""}`}>
            You Are The Moon<br />Of My Life
          </h1>

          {/* Subtitle */}
          <p className={`fd-subtitle ${vis.sub ? "vis" : ""}`}>
            And I am grateful to the stars, to the universe,<br />
            for the gift of you.
          </p>

          {/* Cards */}
          <div className="fd-cards">
            {CARDS.map((c, i) => (
              <div key={i} className={`fd-card ${vis["c" + i] ? "vis" : ""}`}>
                <span className="fd-card-sym" aria-hidden="true">{c.sym}</span>
                <div className="fd-card-heading">{c.title}</div>
                <p className="fd-card-body">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Final message */}
          <div className={`fd-final ${vis.final ? "vis" : ""}`}>
            <div className="fd-orbs" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  className="fd-orb"
                  style={{ animationDelay: (i * 0.2) + "s" }}
                />
              ))}
            </div>
            <div className="fd-divider" aria-hidden="true" />
            <div className="fd-love-line">I Love You, Dad</div>
            <div className="fd-love-ever">Always &amp; Forever</div>
          </div>

        </div>
      </div>
    </>
  );
}

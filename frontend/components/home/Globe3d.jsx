// components/home/Globe3D.jsx
// CSS 3D globe (preserve-3d) with light + dark palettes. Reacts to --tx/--ty set by TiltStage.
const lats = [-60, -30, 0, 30, 60]
const meridians = [0, 30, 60, 90, 120, 150]
const nodes = [
  { y: 20, x: -15, d: 0 }, { y: 80, x: 22, d: 0.5 }, { y: 150, x: -30, d: 1.1 },
  { y: 215, x: 35, d: 1.7 }, { y: 285, x: 5, d: 2.3 }, { y: 335, x: -40, d: 2.9 },
]

export default function Globe3D({ className = "" }) {
  return (
    <div className={`g3-scene ${className}`} aria-hidden="true">
      <div className="g3-glow" />
      <div className="g3-body" />
      <div className="g3-tilt">
        <div className="g3-globe">
          {meridians.map((deg) => <span key={deg} className="g3-ring" style={{ transform: `rotateY(${deg}deg)` }} />)}
          {lats.map((lat) => {
            const rad = (lat * Math.PI) / 180
            return <span key={lat} className="g3-ring g3-lat" style={{ transform: `rotateX(90deg) translateZ(calc(var(--r) * ${Math.sin(rad).toFixed(3)})) scale(${Math.cos(rad).toFixed(3)})` }} />
          })}
          {nodes.map((n, i) => <span key={i} className="g3-node" style={{ transform: `rotateY(${n.y}deg) rotateX(${n.x}deg) translateZ(var(--r))`, animationDelay: `${n.d}s` }} />)}
        </div>
        <div className="g3-orbit" style={{ transform: "rotateX(76deg) rotateY(-14deg)" }}>
          <span className="g3-orbit-ring" /><span className="g3-orbit-spin"><span className="g3-sat" /></span>
        </div>
        <div className="g3-orbit g3-orbit-b" style={{ transform: "rotateX(64deg) rotateY(28deg)" }}>
          <span className="g3-orbit-ring" /><span className="g3-orbit-spin g3-rev"><span className="g3-sat g3-sat-b" /></span>
        </div>
      </div>
      <style>{`
        .g3-scene { --r: 10.5rem;
          --g-line: rgba(37,99,235,.42); --g-line2: rgba(37,99,235,.26); --g-orbit: rgba(37,99,235,.38);
          --g-body: radial-gradient(circle at 35% 30%, rgba(255,255,255,.95), rgba(147,197,253,.55) 45%, rgba(96,165,250,.16) 68%, transparent 74%);
          --g-body-shadow: inset 0 0 50px rgba(37,99,235,.16);
          --g-glow: radial-gradient(circle, rgba(59,130,246,.30), rgba(59,130,246,.10) 45%, transparent 70%);
          --g-node: #2563eb; --g-node-glow: rgba(37,99,235,.55);
          --g-sat: #1d4ed8; --g-sat-glow: rgba(37,99,235,.7); --g-sat-b: #0891b2; --g-sat-b-glow: rgba(8,145,178,.7);
          position: relative; width: calc(var(--r) * 2); height: calc(var(--r) * 2); perspective: 1100px; margin-inline: auto; }
        .dark .g3-scene {
          --g-line: rgba(147,197,253,.34); --g-line2: rgba(147,197,253,.22); --g-orbit: rgba(147,197,253,.3);
          --g-body: radial-gradient(circle at 35% 30%, rgba(96,165,250,.38), rgba(30,64,175,.2) 55%, rgba(5,11,31,0) 72%);
          --g-body-shadow: inset 0 0 60px rgba(59,130,246,.25);
          --g-glow: radial-gradient(circle, rgba(59,130,246,.38), rgba(37,99,235,.12) 45%, transparent 70%);
          --g-node: #7dd3fc; --g-node-glow: rgba(125,211,252,.65);
          --g-sat: #dbeafe; --g-sat-glow: rgba(96,165,250,.85); --g-sat-b: #a5f3fc; --g-sat-b-glow: rgba(34,211,238,.7); }
        @media (max-width: 640px) { .g3-scene { --r: 8rem; } }
        .g3-glow { position: absolute; inset: -35%; background: var(--g-glow); filter: blur(10px); }
        .g3-body { position: absolute; inset: 0; border-radius: 50%; background: var(--g-body); box-shadow: var(--g-body-shadow); }
        .g3-tilt, .g3-globe { position: absolute; inset: 0; transform-style: preserve-3d; }
        .g3-tilt { transform: rotateX(calc(-20deg + var(--tx, 0deg))) rotateY(var(--ty, 0deg)) rotateZ(8deg); transition: transform .3s ease-out; }
        .g3-globe { animation: g3spin 36s linear infinite; }
        .g3-ring { position: absolute; inset: 0; border-radius: 50%; border: 1px solid var(--g-line); }
        .g3-lat { border-color: var(--g-line2); }
        .g3-node { position: absolute; top: 50%; left: 50%; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--g-node); animation: g3pulse 3s ease-in-out infinite; }
        .g3-orbit { position: absolute; inset: -20%; transform-style: preserve-3d; }
        .g3-orbit-b { inset: -32%; }
        .g3-orbit-ring { position: absolute; inset: 0; border-radius: 50%; border: 1px dashed var(--g-orbit); }
        .g3-orbit-spin { position: absolute; inset: 0; animation: g3orbit 14s linear infinite; }
        .g3-orbit-b .g3-orbit-spin { animation-duration: 22s; }
        .g3-rev { animation-direction: reverse; }
        .g3-sat { position: absolute; top: -5px; left: calc(50% - 5px); width: 10px; height: 10px; border-radius: 50%; background: var(--g-sat); box-shadow: 0 0 14px 4px var(--g-sat-glow); }
        .g3-sat-b { background: var(--g-sat-b); box-shadow: 0 0 12px 3px var(--g-sat-b-glow); }
        @keyframes g3spin { to { transform: rotateY(360deg); } }
        @keyframes g3orbit { to { transform: rotate(360deg); } }
        @keyframes g3pulse { 0%,100% { box-shadow: 0 0 0 0 var(--g-node-glow); } 50% { box-shadow: 0 0 0 9px transparent; } }
        @media (prefers-reduced-motion: reduce) { .g3-globe, .g3-orbit-spin, .g3-node { animation: none; } }
      `}</style>
    </div>
  )
}
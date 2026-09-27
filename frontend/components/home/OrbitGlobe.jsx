// components/home/OrbitGlobe.jsx
// Ambient background glow + orbit ring, used behind the closing CTA.
// Pure SVG + CSS — no dependencies, sits absolutely behind its parent.

export default function OrbitGlobe({ className = "" }) {
  return (
    <div aria-hidden="true" className={`orbit-ambient pointer-events-none ${className}`}>
      <svg viewBox="0 0 800 800" className="orbit-ambient-svg">
        <defs>
          <radialGradient id="og-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="400" cy="400" r="320" fill="url(#og-glow)" />

        <g className="og-spin" style={{ transformOrigin: "400px 400px" }}>
          <ellipse cx="400" cy="400" rx="300" ry="120" fill="none" stroke="#BFDBFE" strokeOpacity="0.22" strokeWidth="1" />
          <ellipse cx="400" cy="400" rx="230" ry="230" fill="none" stroke="#BFDBFE" strokeOpacity="0.14" strokeWidth="1" />
        </g>

        <g transform="rotate(-18 400 400)">
          <ellipse cx="400" cy="400" rx="340" ry="110" fill="none" stroke="#93C5FD" strokeOpacity="0.3" strokeDasharray="2 8" strokeWidth="1.2" />
          <circle r="5" fill="#DBEAFE">
            <animateMotion dur="9s" repeatCount="indefinite" path="M 60,400 A 340,110 0 1,0 740,400 A 340,110 0 1,0 60,400" />
          </circle>
        </g>
      </svg>

      <style>{`
        .orbit-ambient { position: absolute; inset: 0; overflow: hidden; }
        .orbit-ambient-svg {
          position: absolute; top: 50%; left: 50%;
          width: min(140%, 900px); height: auto;
          transform: translate(-50%, -50%);
        }
        .og-spin { animation: og-spin-anim 60s linear infinite; }
        @keyframes og-spin-anim { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .og-spin { animation: none; }
          .orbit-ambient-svg animateMotion { display: none; }
        }
      `}</style>
    </div>
  )
}
"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
/** SVG motherboard trace that draws itself (stroke-dash / pathLength) as it scrolls into view. */
export default function TraceDivider() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 50%"] });
    const d = "M0 30 H360 L392 8 H808 L840 30 H1200";
    return (<div ref={ref} aria-hidden="true" className="mx-auto w-full max-w-6xl px-6">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-10 w-full sm:h-14">
        <path d={d} fill="none" stroke="rgba(0,242,254,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
        <motion.path d={d} fill="none" stroke="#00F2FE" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{ pathLength: scrollYProgress }}/>
        <circle cx="392" cy="8" r="3" fill="#00F5A0"/>
        <circle cx="808" cy="8" r="3" fill="#00F5A0"/>
      </svg>
    </div>);
}

"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
export default function CountUp({ to, suffix = "", duration = 1.8, start = true }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!inView || !start)
            return;
        const c = animate(0, to, { duration, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
        return () => c.stop();
    }, [inView, start, to, duration]);
    return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

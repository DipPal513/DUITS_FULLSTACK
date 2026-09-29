"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export default function SectionHeader({ code, title, description, className }) {
    return (<motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={cn("max-w-2xl", className)}>
      <p className="font-mono text-xs tracking-[0.25em] text-volt">{code}</p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">{description}</p>}
    </motion.header>);
}

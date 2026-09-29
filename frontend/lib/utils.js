export const cn = (...c) => c.filter(Boolean).join(" ");
export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

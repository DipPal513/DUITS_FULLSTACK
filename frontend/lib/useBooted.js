"use client";
import { useEffect, useState } from "react";
export const BOOT_KEY = "duits-booted";
export const BOOT_EVENT = "duits:booted";
/** true once the BIOS loader has finished (or was already shown this session). */
export function useBooted() {
    const [booted, setBooted] = useState(false);
    useEffect(() => {
        try {
            if (sessionStorage.getItem(BOOT_KEY)) {
                setBooted(true);
                return;
            }
        }
        catch { }
        const on = () => setBooted(true);
        window.addEventListener(BOOT_EVENT, on);
        return () => window.removeEventListener(BOOT_EVENT, on);
    }, []);
    return booted;
}

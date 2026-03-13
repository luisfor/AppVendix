"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    return (
        <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            className="p-2 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] hover:bg-[var(--text-dim)]/10 transition-all active:scale-95 flex items-center justify-center w-10 h-10"
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        >
            <span className="text-xl leading-none">
                {theme === 'dark' ? '☀️' : '🌙'}
            </span>
        </button>
    );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { updateUserTheme } from "@/lib/actions/user";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme = "dark" }: { children: React.ReactNode, initialTheme?: Theme }) {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Priority:
        // 1. Database/Session Theme (initialTheme)
        // 2. LocalStorage Theme
        // 3. System Preference (fallback)

        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (initialTheme) {
            applyTheme(initialTheme);
        } else if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const fallbackTheme = prefersDark ? "dark" : "light";
            setTheme(fallbackTheme);
            applyTheme(fallbackTheme);
        }
    }, [initialTheme]);

    const applyTheme = (t: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(t);
        // Force immediate background update for body
        document.body.style.backgroundColor = t === 'dark' ? '#0a0a0b' : '#f8fafc';
    };

    const toggleTheme = async () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);

        // Sync with DB
        try {
            await updateUserTheme(newTheme);
        } catch (error) {
            console.error("Failed to sync theme with DB:", error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

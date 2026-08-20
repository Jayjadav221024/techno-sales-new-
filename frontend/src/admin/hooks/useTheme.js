import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "admin-theme";

const readStoredTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        // Safari in private mode throws on localStorage access.
        return null;
    }
};

/**
 * Dark mode for the admin shell.
 *
 * The class goes on <html> because that is what the `dark` variant in
 * globals.css matches. The admin is lazy-loaded into the same document as the
 * public site, so the class has to come back off when the shell unmounts -
 * otherwise the marketing pages inherit an admin-only theme.
 */
export const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        const stored = readStoredTheme();
        if (stored) return stored === "dark";
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", isDark);
        try {
            localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
        } catch {
            // Not being able to remember the choice is survivable.
        }
    }, [isDark]);

    useEffect(() => () => document.documentElement.classList.remove("dark-mode"), []);

    const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

    return { isDark, toggleTheme };
};

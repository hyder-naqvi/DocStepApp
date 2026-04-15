import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Colors from "@/constants/colors";

type ThemeMode = "light" | "dark";
type ThemeColors = typeof Colors.light;

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  isLoading: boolean;
  toggleTheme: () => Promise<void>;
};

const THEME_STORAGE_KEY = "@docstep/theme-mode";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreTheme = async () => {
      try {
        const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedMode === "light" || storedMode === "dark") {
          setMode(storedMode);
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreTheme();
  }, []);

  const toggleTheme = async () => {
    const nextMode: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(nextMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
  };

  const value = useMemo(
    () => ({
      mode,
      colors: mode === "dark" ? Colors.dark : Colors.light,
      isDark: mode === "dark",
      isLoading,
      toggleTheme,
    }),
    [mode, isLoading]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

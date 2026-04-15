import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
};

const USERS_STORAGE_KEY = "@docstep/users";
const CURRENT_USER_STORAGE_KEY = "@docstep/current-user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(CURRENT_USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser) as AuthUser);
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return { ok: false, error: "Email and password are required." };
    }

    const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const users = usersJson ? (JSON.parse(usersJson) as StoredUser[]) : [];

    const matchedUser = users.find((item) => item.email === normalizedEmail && item.password === password);

    if (!matchedUser) {
      return { ok: false, error: "Invalid email or password." };
    }

    const authUser: AuthUser = { name: matchedUser.name, email: matchedUser.email };
    await AsyncStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { ok: true };
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const cleanName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!cleanName || !normalizedEmail || !password) {
      return { ok: false, error: "Name, email, and password are required." };
    }

    if (password.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }

    const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const users = usersJson ? (JSON.parse(usersJson) as StoredUser[]) : [];

    const alreadyExists = users.some((storedUser) => storedUser.email === normalizedEmail);
    if (alreadyExists) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const newStoredUser: StoredUser = {
      name: cleanName,
      email: normalizedEmail,
      password,
    };

    const nextUsers = [...users, newStoredUser];
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));

    const authUser: AuthUser = { name: cleanName, email: normalizedEmail };
    await AsyncStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

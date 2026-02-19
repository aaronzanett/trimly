import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "owner" | "staff" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenant?: string; // for owner/staff: the barbershop slug
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

// ─── Hardcoded demo accounts ───────────────────────────────────────────────
export const ACCOUNTS: Array<{ email: string; password: string; user: User }> = [
  {
    email: "admin@trimly.com",
    password: "admin123",
    user: { id: "1", name: "Super Admin", email: "admin@trimly.com", role: "admin" },
  },
  {
    email: "owner@trimly.com",
    password: "owner123",
    user: {
      id: "2",
      name: "Budi Santoso",
      email: "owner@trimly.com",
      role: "owner",
      tenant: "trimly-jakarta",
    },
  },
  {
    email: "staff@trimly.com",
    password: "staff123",
    user: {
      id: "3",
      name: "Andi Barber",
      email: "staff@trimly.com",
      role: "staff",
      tenant: "trimly-jakarta",
    },
  },
  {
    email: "client@trimly.com",
    password: "client123",
    user: { id: "4", name: "Pelanggan Demo", email: "client@trimly.com", role: "client" },
  },
];

const STORAGE_KEY = "trimly_auth_user";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const match = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!match) {
      return { success: false, error: "Email atau kata sandi salah." };
    }
    setUser(match.user);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthUser, Role } from "./type";

interface AuthContextValue {
  user: AuthUser | null;
  loginAs(role: Role, name?: string): void;
  logout(): void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "opsmind-auth-user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  function loginAs(role: Role, name = "OpsMind User") {
    const newUser: AuthUser = {
      id: crypto.randomUUID(),
      name,
      role,
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
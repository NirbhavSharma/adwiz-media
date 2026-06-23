"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import to avoid SSR issues with Firebase Auth
    import("firebase/auth").then(({ onAuthStateChanged }) => {
      import("./firebase-client").then(({ auth }) => {
        if (!auth) {
          setLoading(false);
          return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);
        });

        return () => unsubscribe();
      });
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { auth } = await import("./firebase-client");
    if (auth) {
      await signInWithEmailAndPassword(auth, email, password);
    }
  }, []);

  const signOut = useCallback(async () => {
    const { signOut: firebaseSignOut } = await import("firebase/auth");
    const { auth } = await import("./firebase-client");
    if (auth) {
      await firebaseSignOut(auth);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

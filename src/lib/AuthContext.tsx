"use client"
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const user:any = {
  email: null,
  displayName: null
}
interface AuthDto{
  children: ReactElement
}
const AuthContext = createContext(user);

export function AuthProvider( {children} :AuthDto) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

"use client"
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const user:any = {
  email: null,
  displayName: null
}
interface AuthDto{
  children: ReactElement
}
const AuthContext = createContext(user);

export function AuthProvider( {children} :AuthDto) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const path = usePathname()
  console.log(path)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log('route changed')
    if((path === '/create-event' || path === '/edit-event') && !user){
        console.log('should redirect', user);
        router.push('/sign-in')
    }
  }, [path])
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

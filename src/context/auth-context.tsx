"use client";

import { getCookie } from "@/utils/cookies";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}>({ isLoggedIn: false, setIsLoggedIn: () => {} });

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookieValue = getCookie("isLoggedIn");
    if (cookieValue === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used withing an AuthContextProvider");
  }

  return context;
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * User Profile Interface
 * Defines the shape of the user object in the application.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  companyName?: string;
}

/**
 * User Context Interface
 * Defines the state and methods available to consumers of the UserContext.
 */
interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "humaneers_user_session_v1";

/**
 * UserProvider Component
 * Manages the user authentication state (simulated) and provides it to the application.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from storage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to restore user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulated User Object due to "Client Portal (Simulation)" directive
    const mockUser: UserProfile = {
      id: "u_" + Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1), // Derive name from email
      email: email,
      role: "client",
      companyName: "Acme Corp", // Placeholder for simulation
    };

    setUser(mockUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * useUser Hook
 * Access the UserContext state and methods.
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

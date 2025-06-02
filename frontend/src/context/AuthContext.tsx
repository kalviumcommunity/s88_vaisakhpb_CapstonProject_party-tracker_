import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('partytracker_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, _password: string) => {
    // In a real app, we would make an API call here
    // For this demo, we'll simulate a successful login
    const mockUser = {
      id: 'user1',
      name: 'Demo User',
      email: email
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('partytracker_user', JSON.stringify(mockUser));
  };

  const register = (name: string, email: string, _password: string) => {
    // In a real app, we would make an API call here
    // For this demo, we'll simulate a successful registration
    const mockUser = {
      id: 'user1',
      name: name,
      email: email
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('partytracker_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('partytracker_user');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
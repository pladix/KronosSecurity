import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('kronos_user');
    const storedAuth = localStorage.getItem('kronos_auth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    // In a real app, you would validate credentials with a backend
    
    // For demo purposes, any login succeeds
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: 'Admin',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
    };
    
    // Store in localStorage
    localStorage.setItem('kronos_user', JSON.stringify(mockUser));
    localStorage.setItem('kronos_auth', 'true');
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('kronos_user');
    localStorage.removeItem('kronos_auth');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
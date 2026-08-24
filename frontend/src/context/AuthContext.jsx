import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sevasetu_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    const defaultUser = {
      name: userData?.fullName || userData?.name || 'Priya Sharma',
      email: userData?.email || 'priya.sharma@example.com',
      role: userData?.role || 'Citizen',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData?.name || 'Priya Sharma')}`,
    };
    setUser(defaultUser);
    localStorage.setItem('sevasetu_user', JSON.stringify(defaultUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sevasetu_user');
    localStorage.removeItem('sevasetu_profile');
    localStorage.removeItem('sevasetu_recommendations');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLogin = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegister = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const login = (userData) => {
    const fullUser = {
      ...userData,
      profilePic: "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg",
      headline: "Software Engineer",
    };
    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("token", "mock-token-" + Date.now()); // For compatibility with other parts of the app
    closeModals();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("dailyQuizShown");
  };

  const updateUser = (updates) => {
    if(user) {
      setUser(prev => ({ ...prev, ...updates }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, openLogin, openRegister, closeModals }}>
      {children}
      {isLoginModalOpen && <Login isOpen={isLoginModalOpen} onClose={closeModals} openSignUp={openRegister} />}
      {isRegisterModalOpen && <SignUp isOpen={isRegisterModalOpen} onClose={closeModals} openLogin={openLogin} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

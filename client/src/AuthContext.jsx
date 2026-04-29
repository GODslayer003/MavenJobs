import React, { createContext, useContext, useState } from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    setUser({
      ...userData,
      profilePic: "https://i.pravatar.cc/150?img=11", 
      headline: "Software Engineer",
    });
    closeModals();
  };

  const logout = () => {
    setUser(null);
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

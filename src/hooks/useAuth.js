import { useState } from 'react';
import * as authApi from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const loginOperator = async (username, password) => {
    try {
      const data = await authApi.login(username, password);
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
      }
      throw new Error(data.message || 'Login gagal.');
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Login gagal.');
    }
  };

  const registerOperator = async (username, password) => {
    try {
      const data = await authApi.register(username, password);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Registrasi gagal.');
    }
  };

  const logoutOperator = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loginOperator,
    registerOperator,
    logoutOperator
  };
}

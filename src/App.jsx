import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  // Sinkronisasi halaman dengan status autentikasi JWT
  useEffect(() => {
    if (auth.isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      if (currentPage === 'dashboard') {
        setCurrentPage('login');
      }
    }
  }, [auth.isAuthenticated]);

  // Routing Sederhana Sisi Klien (Client-Side Routing)
  const renderPage = () => {
    if (auth.isAuthenticated) {
      return (
        <Dashboard 
          user={auth.user} 
          onLogout={auth.logoutOperator} 
        />
      );
    }

    switch (currentPage) {
      case 'register':
        return (
          <Register
            registerOperator={auth.registerOperator}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      case 'login':
      default:
        return (
          <Login
            loginOperator={auth.loginOperator}
            onLoginSuccess={() => setCurrentPage('dashboard')}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 selection:text-white">
      {renderPage()}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Notes from './components/Notes';
import api, { setAuthToken } from './api';

interface User {
  email: string;
  name: string;
}

const App = () => {
  const [user, setUser ] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser  = localStorage.getItem('user');
    if (savedToken && savedUser ) {
      setToken(savedToken);
      setUser (JSON.parse(savedUser ));
      setAuthToken(savedToken);
    }
  }, []);

  const handleLogin = (token: string, user: User) => {
    setToken(token);
    setUser (user);
    setAuthToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setToken(null);
    setUser (null);
    setAuthToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/welcome" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={user ? <Navigate to="/welcome" /> : <Signup onLogin={handleLogin} />} />
        <Route path="/login" element={user ? <Navigate to="/welcome" /> : <Login onLogin={handleLogin} />} />
        <Route path="/welcome" element={user ? <Welcome user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/notes" element={user ? <Notes /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

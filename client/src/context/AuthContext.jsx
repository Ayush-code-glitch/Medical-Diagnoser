import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('swasthya-user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistUser = (user) => {
  if (!user) {
    localStorage.removeItem('swasthya-user');
    return;
  }

  localStorage.setItem('swasthya-user', JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: true,
    user: getStoredUser(),
  });

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth({ token: null, isAuthenticated: false, loading: false, user: null });
      persistUser(null);
      return;
    }

    try {
      const res = await axios.get('/api/auth/user');
      const user = res.data || getStoredUser();
      persistUser(user);
      setAuth({
        token,
        isAuthenticated: true,
        loading: false,
        user,
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      persistUser(null);
      setAuth({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      const timer = window.setTimeout(() => {
        loadUser();
      }, 0);

      return () => window.clearTimeout(timer);
    }

    const fallbackTimer = window.setTimeout(() => {
      setAuth((prev) => ({ ...prev, loading: false }));
    }, 0);

    return () => window.clearTimeout(fallbackTimer);
  }, [loadUser]);

  const login = (token, userData = null) => {
    const safeUser = userData || getStoredUser() || { username: 'Patient' };
    localStorage.setItem('token', token);
    persistUser(safeUser);
    setAuthToken(token);
    setAuth({
      token,
      isAuthenticated: true,
      loading: false,
      user: safeUser,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    persistUser(null);
    setAuthToken(null);
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

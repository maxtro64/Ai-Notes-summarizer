import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [email,setEmail]=useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth token in axios headers and localStorage
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user on initial render or token change
  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      
      setAuthToken(token);
      
     const res = await axios.get('https://ai-notes-summarizer-6.onrender.com/api/auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      
      if (!res.data?.user) {
        throw new Error('Invalid user data received');
      }

      setUser(res.data.user);
     
   

      setIsAuthenticated(true);
    } catch (err) {
      console.error('Failed to load user', err);
      
      // Clear auth state if token is invalid
      if (err.response?.status === 401) {
        logout();
      }
      
      setError(err.response?.data?.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  // Register user
const register = async (formData) => {
  try {
    setLoading(true);
    setError(null);
    
    const res = await axios.post('https://ai-notes-summarizer-6.onrender.com/api/auth/register', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.data?.token) {
      throw new Error('No token received from server');
    }
    
    setToken(res.data.token);
    setAuthToken(res.data.token);
    await loadUser();
    
    toast.success('Registration successful!');
    return { success: true, data: res.data };
  } catch (err) {
    console.error('Registration error:', err);
    const errorMsg = err.response?.data?.message || 
                    err.response?.data?.error || 
                    err.message || 
                    'Registration failed';
    setError(errorMsg);
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    setLoading(false);
  }
};

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('https://ai-notes-summarizer-6.onrender.com/api/auth/login', credentials);
      
      setToken(res.data.token);
      setAuthToken(res.data.token);
      await loadUser(); // Load user data after login
      
      toast.success('Login successful!');
      return { success: true, data: res.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    setError(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        setError,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

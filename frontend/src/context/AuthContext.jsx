import { createContext, useContext, useState } from 'react';
 import axios from "../api/axios";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // fallback if env missing

  // adjust path based on your file structure

const login = async (credential) => {
  setLoading(true);
  try {
    const response = await axios.post("/api/auth/google", { credential });

    const data = response.data;

    if (data.success) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

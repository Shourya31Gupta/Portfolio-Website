import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.username, // Use username as email
        password: credentials.password
      });

      if (error) {
        console.error('Supabase auth error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const userData = { 
          username: data.user.email, 
          role: 'admin',
          id: data.user.id 
        };
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        return { success: true };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

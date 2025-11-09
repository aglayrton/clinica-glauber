'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'DENTISTA' | 'CONSULTOR';
  ativo: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return false;
      }

      // Validar token com a API
      const response = await fetch(API_ENDPOINTS.auth.validate, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return true;
      } else {
        // Token inválido, limpar
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Salvar token e usuário
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      setToken(data.data.token);
      setUser(data.data.user);

      // Redirecionar baseado no role
      const roleRoutes = {
        ADMIN: '/admin',
        DENTISTA: '/dentista',
        CONSULTOR: '/consultor',
      };

      router.push(roleRoutes[data.data.user.role as keyof typeof roleRoutes] || '/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Limpar storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Limpar estado
    setToken(null);
    setUser(null);

    // Redirecionar para login
    router.push('/login');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

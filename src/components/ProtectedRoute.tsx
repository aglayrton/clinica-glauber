'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('ADMIN' | 'DENTISTA' | 'CONSULTOR')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Se não está autenticado, redireciona para login
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Se está autenticado mas não tem permissão para acessar esta rota
      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redireciona para a página correta do usuário
        const roleRoutes = {
          ADMIN: '/admin',
          DENTISTA: '/dentista',
          CONSULTOR: '/consultor',
        };
        router.push(roleRoutes[user.role]);
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderiza nada (vai redirecionar)
  if (!isAuthenticated) {
    return null;
  }

  // Se tem restrição de role e o usuário não tem permissão, não renderiza
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  // Se passou em todas as verificações, renderiza o conteúdo
  return <>{children}</>;
}

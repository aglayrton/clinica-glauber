'use client';

import { ReactNode } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'DENTISTA', 'CONSULTOR']}>
      {children}
    </ProtectedRoute>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Dr. Carlos Silva',
      email: 'carlos.silva@email.com',
      role: 'dentist',
      cro: 'CRO-SP 12345',
      active: true,
      termsAccepted: true,
      createdAt: '2025-01-15',
      lastLogin: '2025-11-05 14:30',
    },
    {
      id: '2',
      name: 'Dra. Ana Costa',
      email: 'ana.costa@email.com',
      role: 'dentist',
      cro: 'CRO-RJ 67890',
      active: true,
      termsAccepted: true,
      createdAt: '2025-02-20',
      lastLogin: '2025-11-06 10:15',
    },
    {
      id: '3',
      name: 'Dr. Paulo Mendes',
      email: 'paulo.mendes@email.com',
      role: 'consultant',
      cro: 'CRO-MG 11111',
      active: true,
      termsAccepted: true,
      createdAt: '2025-01-10',
      lastLogin: '2025-11-06 09:00',
    },
    {
      id: '4',
      name: 'Dra. Maria Santos',
      email: 'maria.santos@email.com',
      role: 'dentist',
      cro: 'CRO-SP 22222',
      active: false,
      termsAccepted: true,
      createdAt: '2025-03-05',
      lastLogin: '2025-10-20 16:45',
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'dentist':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Dentista</span>;
      case 'consultant':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Consultor</span>;
      case 'admin':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Admin</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Ativo</span>
    ) : (
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Suspenso</span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600 mt-2">Cadastre e gerencie dentistas e consultores</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Usuário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total de Usuários</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Dentistas</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">145</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Consultores</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Suspensos</p>
            <p className="text-2xl font-bold text-red-600 mt-1">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
              <Input
                type="text"
                placeholder="Nome, e-mail ou CRO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Usuário</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todos</option>
                <option value="dentist">Dentistas</option>
                <option value="consultant">Consultores</option>
                <option value="admin">Administradores</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todos</option>
                <option value="active">Ativos</option>
                <option value="suspended">Suspensos</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">E-mail</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">CRO</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Cadastro</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Último Acesso</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.cro}</td>
                    <td className="py-3 px-4">{getStatusBadge(user.active)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          title="Editar usuário"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className={`${user.active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'} text-sm font-medium`}
                          title={user.active ? 'Suspender usuário' : 'Ativar usuário'}
                        >
                          {user.active ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                          title="Redefinir senha"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

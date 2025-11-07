'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';

export default function AdminAuditPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const logs = [
    {
      id: 'LOG-1001',
      userName: 'Dr. Carlos Silva',
      userEmail: 'carlos.silva@email.com',
      action: 'Criou Setup',
      entity: 'Setup',
      entityId: 'SETUP-1234',
      description: 'Criou novo setup para paciente Maria Silva',
      ipAddress: '192.168.1.100',
      createdAt: '2025-11-06 14:30:25',
    },
    {
      id: 'LOG-1002',
      userName: 'Admin Sistema',
      userEmail: 'admin@sistema.com',
      action: 'Suspendeu Usuário',
      entity: 'User',
      entityId: 'USER-456',
      description: 'Suspendeu conta de Dra. Maria Santos',
      ipAddress: '192.168.1.1',
      createdAt: '2025-11-06 13:15:10',
    },
    {
      id: 'LOG-1003',
      userName: 'Dra. Ana Costa',
      userEmail: 'ana.costa@email.com',
      action: 'Efetuou Pagamento',
      entity: 'Payment',
      entityId: 'PAY-789',
      description: 'Pagamento de R$ 350,00 via PIX para Setup #1235',
      ipAddress: '192.168.1.50',
      createdAt: '2025-11-06 10:20:45',
    },
    {
      id: 'LOG-1004',
      userName: 'Dr. Paulo Mendes',
      userEmail: 'paulo.mendes@email.com',
      action: 'Enviou Feedback',
      entity: 'Setup',
      entityId: 'SETUP-1233',
      description: 'Enviou devolutiva para Setup #1233',
      ipAddress: '192.168.1.75',
      createdAt: '2025-11-06 09:45:30',
    },
    {
      id: 'LOG-1005',
      userName: 'Dr. Carlos Silva',
      userEmail: 'carlos.silva@email.com',
      action: 'Cadastrou Paciente',
      entity: 'Patient',
      entityId: 'PAT-890',
      description: 'Cadastrou novo paciente: João Silva',
      ipAddress: '192.168.1.100',
      createdAt: '2025-11-06 08:30:15',
    },
    {
      id: 'LOG-1006',
      userName: 'Admin Sistema',
      userEmail: 'admin@sistema.com',
      action: 'Atualizou Configurações',
      entity: 'SystemConfig',
      entityId: 'CONFIG-1',
      description: 'Atualizou contatos de suporte do sistema',
      ipAddress: '192.168.1.1',
      createdAt: '2025-11-05 16:20:00',
    },
  ];

  const getActionBadge = (action: string) => {
    const colors: Record<string, string> = {
      'Criou Setup': 'bg-blue-100 text-blue-800',
      'Suspendeu Usuário': 'bg-red-100 text-red-800',
      'Efetuou Pagamento': 'bg-green-100 text-green-800',
      'Enviou Feedback': 'bg-purple-100 text-purple-800',
      'Cadastrou Paciente': 'bg-yellow-100 text-yellow-800',
      'Atualizou Configurações': 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[action] || 'bg-gray-100 text-gray-800'}`}>
        {action}
      </span>
    );
  };

  const stats = [
    { label: 'Total de Ações', value: '15.847', color: 'bg-blue-500' },
    { label: 'Hoje', value: '234', color: 'bg-green-500' },
    { label: 'Últimas 24h', value: '456', color: 'bg-purple-500' },
    { label: 'Esta Semana', value: '1.892', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs de Auditoria</h1>
          <p className="text-gray-600 mt-2">Consulte o histórico de ações no sistema</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center gap-2 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg`}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
              <Input
                type="text"
                placeholder="Usuário, ação, entidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Ação</label>
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas as Ações</option>
                <option value="create">Criação</option>
                <option value="update">Atualização</option>
                <option value="delete">Exclusão</option>
                <option value="login">Login</option>
                <option value="payment">Pagamento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Ações</CardTitle>
            <span className="text-sm text-gray-600">Mostrando 6 de 15.847 registros</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Data/Hora</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Usuário</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ação</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Entidade</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Descrição</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">IP</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {log.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.userName}</p>
                        <p className="text-xs text-gray-500">{log.userEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getActionBadge(log.action)}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.entity}</p>
                        <p className="text-xs text-gray-500 font-mono">{log.entityId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {log.description}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        title="Ver detalhes completos"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade nas Últimas 24 Horas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { hour: '14:00', actions: 45 },
              { hour: '13:00', actions: 52 },
              { hour: '12:00', actions: 38 },
              { hour: '11:00', actions: 61 },
              { hour: '10:00', actions: 47 },
              { hour: '09:00', actions: 55 },
              { hour: '08:00', actions: 42 },
              { hour: '07:00', actions: 28 },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 w-16">{item.hour}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(item.actions / 61) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.actions}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Users Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários Mais Ativos (Esta Semana)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Dr. Carlos Silva', email: 'carlos.silva@email.com', actions: 156, role: 'Dentista' },
              { name: 'Dra. Ana Costa', email: 'ana.costa@email.com', actions: 142, role: 'Dentista' },
              { name: 'Dr. Paulo Mendes', email: 'paulo.mendes@email.com', actions: 98, role: 'Consultor' },
              { name: 'Dra. Maria Santos', email: 'maria.santos@email.com', actions: 87, role: 'Dentista' },
              { name: 'Admin Sistema', email: 'admin@sistema.com', actions: 65, role: 'Admin' },
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {user.role}
                  </span>
                  <span className="text-lg font-bold text-gray-900">{user.actions}</span>
                  <span className="text-xs text-gray-500">ações</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

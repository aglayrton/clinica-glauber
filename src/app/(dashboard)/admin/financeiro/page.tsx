'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';

export default function AdminFinancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const payments = [
    {
      id: 'PAY-1001',
      setupId: 'SETUP-1234',
      dentist: 'Dr. Carlos Silva',
      amount: 350.00,
      type: 'pix',
      status: 'paid',
      transactionId: 'PIX-ABC123',
      createdAt: '2025-11-05 14:30',
      paidAt: '2025-11-05 14:31',
    },
    {
      id: 'PAY-1002',
      setupId: 'SETUP-1235',
      dentist: 'Dra. Ana Costa',
      amount: 350.00,
      type: 'card',
      status: 'paid',
      transactionId: 'CARD-XYZ789',
      createdAt: '2025-11-04 10:15',
      paidAt: '2025-11-04 10:15',
    },
    {
      id: 'PAY-1003',
      setupId: 'SETUP-1236',
      dentist: 'Dr. Carlos Silva',
      amount: 350.00,
      type: 'pix',
      status: 'paid',
      createdAt: '2025-11-03 16:20',
      paidAt: '2025-11-03 16:21',
    },
    {
      id: 'PAY-1004',
      setupId: 'SETUP-1237',
      dentist: 'Dra. Maria Santos',
      amount: 350.00,
      type: 'card',
      status: 'pending',
      createdAt: '2025-11-06 09:00',
      paidAt: null,
    },
    {
      id: 'PAY-1005',
      setupId: 'SETUP-1238',
      dentist: 'Dr. Paulo Mendes',
      amount: 350.00,
      type: 'pix',
      status: 'failed',
      createdAt: '2025-11-02 11:45',
      paidAt: null,
    },
  ];

  const getTypeBadge = (type: string) => {
    return type === 'pix' ? (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">PIX</span>
    ) : (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Cartão</span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pago</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendente</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Cancelado</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Falhou</span>;
      default:
        return null;
    }
  };

  const stats = [
    { label: 'Receita Total', value: 'R$ 145.850,00', sublabel: 'Desde o início', color: 'bg-green-500' },
    { label: 'Este Mês', value: 'R$ 28.400,00', sublabel: '81 transações', color: 'bg-blue-500' },
    { label: 'Hoje', value: 'R$ 1.050,00', sublabel: '3 transações', color: 'bg-purple-500' },
    { label: 'Ticket Médio', value: 'R$ 350,00', sublabel: 'Por setup', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios Financeiros</h1>
          <p className="text-gray-600 mt-2">Acompanhe pagamentos e transações</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center gap-2 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar Relatório
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg`}></div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.sublabel}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
              <Input
                type="text"
                placeholder="ID, dentista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Pagamento</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todos</option>
                <option value="pix">PIX</option>
                <option value="card">Cartão</option>
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
                <option value="paid">Pagos</option>
                <option value="pending">Pendentes</option>
                <option value="failed">Falhados</option>
                <option value="cancelled">Cancelados</option>
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

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações</CardTitle>
            <span className="text-sm text-gray-600">Mostrando 5 de 417 transações</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ID Pagamento</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ID Setup</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Dentista</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Valor</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ID Transação</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Data/Hora</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-primary-600">{payment.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-600">{payment.setupId}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{payment.dentist}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      R$ {payment.amount.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4">{getTypeBadge(payment.type)}</td>
                    <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                    <td className="py-3 px-4">
                      {payment.transactionId ? (
                        <span className="font-mono text-xs text-gray-600">{payment.transactionId}</span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {payment.paidAt || payment.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        title="Ver detalhes"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos por Tipo (Este Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">PIX</span>
                  </div>
                  <span className="font-semibold">234 transações (64%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full flex items-center justify-end pr-2" style={{ width: '64%' }}>
                    <span className="text-xs text-white font-medium">R$ 18.200</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Cartão</span>
                  </div>
                  <span className="font-semibold">89 transações (36%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full flex items-center justify-end pr-2" style={{ width: '36%' }}>
                    <span className="text-xs text-white font-medium">R$ 10.200</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Total do Mês</span>
                <span className="text-2xl font-bold text-gray-900">R$ 28.400,00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita - Últimos 30 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { day: 'Hoje', amount: 1050 },
                { day: 'Ontem', amount: 1400 },
                { day: '04/11', amount: 1750 },
                { day: '03/11', amount: 1050 },
                { day: '02/11', amount: 1400 },
                { day: '01/11', amount: 2100 },
                { day: '31/10', amount: 1750 },
                { day: '30/10', amount: 1400 },
              ].map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-20">{day.day}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(day.amount / 2100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-24 text-right">
                      R$ {day.amount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

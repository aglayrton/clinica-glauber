'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';

export default function ConsultantFinancePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const earnings = [
    {
      id: 'EARN-001',
      setupId: 'SETUP-1234',
      patient: 'Maria Silva',
      dentist: 'Dr. Carlos Silva',
      amount: 350.00,
      date: '2025-11-05',
      status: 'paid',
    },
    {
      id: 'EARN-002',
      setupId: 'SETUP-1235',
      patient: 'João Santos',
      dentist: 'Dra. Ana Costa',
      amount: 350.00,
      date: '2025-11-04',
      status: 'paid',
    },
    {
      id: 'EARN-003',
      setupId: 'SETUP-1236',
      patient: 'Ana Costa',
      dentist: 'Dr. Carlos Silva',
      amount: 350.00,
      date: '2025-11-03',
      status: 'paid',
    },
    {
      id: 'EARN-004',
      setupId: 'SETUP-1237',
      patient: 'Paulo Mendes',
      dentist: 'Dra. Maria Santos',
      amount: 350.00,
      date: '2025-11-02',
      status: 'paid',
    },
    {
      id: 'EARN-005',
      setupId: 'SETUP-1239',
      patient: 'Juliana Santos',
      dentist: 'Dra. Ana Costa',
      amount: 350.00,
      date: '2025-11-05',
      status: 'pending',
    },
  ];

  const getStatusBadge = (status: string) => {
    return status === 'paid' ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pago</span>
    ) : (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendente</span>
    );
  };

  const stats = [
    {
      label: 'Receita Total',
      value: 'R$ 54.600,00',
      sublabel: 'Desde o início',
      color: 'bg-green-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Este Mês',
      value: 'R$ 2.800,00',
      sublabel: '8 setups',
      color: 'bg-blue-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Pendente',
      value: 'R$ 350,00',
      sublabel: '1 setup',
      color: 'bg-yellow-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Média por Setup',
      value: 'R$ 350,00',
      sublabel: 'Valor fixo',
      color: 'bg-purple-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-2">Acompanhe seus ganhos e histórico de pagamentos</p>
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
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Earnings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Ganhos</CardTitle>
            <span className="text-sm text-gray-600">Mostrando 5 de 156 registros</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ID Setup</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Paciente</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Dentista</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Valor</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((earning) => (
                  <tr key={earning.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(earning.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-primary-600">{earning.setupId}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{earning.patient}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{earning.dentist}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      R$ {earning.amount.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(earning.status)}</td>
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

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal - Últimos 6 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: 'Novembro', amount: 2800, setups: 8 },
                { month: 'Outubro', amount: 3850, setups: 11 },
                { month: 'Setembro', amount: 4200, setups: 12 },
                { month: 'Agosto', amount: 3500, setups: 10 },
                { month: 'Julho', amount: 4550, setups: 13 },
                { month: 'Junho', amount: 4900, setups: 14 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-24">{item.month}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(item.amount / 4900) * 100}%` }}
                      >
                        {item.amount > 3000 && (
                          <span className="text-xs text-white font-medium">R$ {item.amount.toLocaleString('pt-BR')}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-32 text-right">
                      R$ {item.amount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-right">{item.setups} setups</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total de Setups Analisados</p>
                    <p className="text-xs text-gray-500 mt-1">Desde o cadastro na plataforma</p>
                  </div>
                  <p className="text-3xl font-bold text-primary-600">156</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Taxa de Aprovação</p>
                    <p className="text-xs text-gray-500 mt-1">148 aprovados de 156 analisados</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">94%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tempo Médio de Resposta</p>
                    <p className="text-xs text-gray-500 mt-1">Análise completa por setup</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">2.5h</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Meta: menos de 4 horas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Pagamentos Recebidos</p>
              <p className="text-3xl font-bold text-green-600 mb-1">R$ 54.250</p>
              <p className="text-xs text-gray-500">155 transações</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Pagamentos Pendentes</p>
              <p className="text-3xl font-bold text-yellow-600 mb-1">R$ 350</p>
              <p className="text-xs text-gray-500">1 transação</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Próximo Pagamento</p>
              <p className="text-3xl font-bold text-blue-600 mb-1">05/12</p>
              <p className="text-xs text-gray-500">Estimado: R$ 2.800</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

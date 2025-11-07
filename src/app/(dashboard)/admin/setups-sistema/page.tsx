'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';

export default function AdminSetupsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const setups = [
    {
      id: 'SETUP-1234',
      patient: 'Maria Silva',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Clínica Central',
      consultant: 'Dr. Paulo Mendes',
      status: 'approved',
      amount: 'R$ 350,00',
      createdAt: '2025-10-20',
      sentAt: '2025-10-21',
      approvedAt: '2025-10-25',
    },
    {
      id: 'SETUP-1235',
      patient: 'João Santos',
      dentist: 'Dra. Ana Costa',
      clinic: 'Sorrisos Perfeitos',
      consultant: 'Dr. Paulo Mendes',
      status: 'in_analysis',
      amount: 'R$ 350,00',
      createdAt: '2025-11-01',
      sentAt: '2025-11-02',
      approvedAt: null,
    },
    {
      id: 'SETUP-1236',
      patient: 'Ana Costa',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Odonto Excellence',
      consultant: null,
      status: 'sent',
      amount: 'R$ 350,00',
      createdAt: '2025-11-04',
      sentAt: '2025-11-05',
      approvedAt: null,
    },
    {
      id: 'SETUP-1237',
      patient: 'Pedro Oliveira',
      dentist: 'Dra. Maria Santos',
      clinic: 'Clínica Saúde Bucal',
      consultant: null,
      status: 'in_development',
      amount: '-',
      createdAt: '2025-11-06',
      sentAt: null,
      approvedAt: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_development':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Em Desenvolvimento</span>;
      case 'sent':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Enviado</span>;
      case 'in_analysis':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Em Análise</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Aprovado</span>;
      default:
        return null;
    }
  };

  const stats = [
    { label: 'Total de Setups', value: '846', color: 'bg-blue-500' },
    { label: 'Em Desenvolvimento', value: '45', color: 'bg-gray-500' },
    { label: 'Enviados', value: '189', color: 'bg-blue-500' },
    { label: 'Em Análise', value: '45', color: 'bg-yellow-500' },
    { label: 'Aprovados', value: '567', color: 'bg-green-500' },
    { label: 'Receita Total', value: 'R$ 296.100', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Setups do Sistema</h1>
        <p className="text-gray-600 mt-2">Acompanhe todos os setups odontológicos do sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className={`w-8 h-8 ${stat.color} rounded-lg mb-3`}></div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
              <Input
                type="text"
                placeholder="ID, paciente, dentista ou clínica..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todos os Status</option>
                <option value="in_development">Em Desenvolvimento</option>
                <option value="sent">Enviados</option>
                <option value="in_analysis">Em Análise</option>
                <option value="approved">Aprovados</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setups Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Setups</CardTitle>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar CSV
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ID Setup</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Paciente</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Dentista</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Clínica</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Consultor</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Valor</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Criado em</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {setups.map((setup) => (
                  <tr key={setup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-primary-600">{setup.id}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{setup.patient}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{setup.dentist}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{setup.clinic}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {setup.consultant || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(setup.status)}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{setup.amount}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(setup.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          title="Ver detalhes"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                          title="Corrigir status"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Setups Enviados - Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '06/11', count: 23 },
              { date: '05/11', count: 28 },
              { date: '04/11', count: 31 },
              { date: '03/11', count: 19 },
              { date: '02/11', count: 25 },
              { date: '01/11', count: 22 },
              { date: '31/10', count: 27 },
            ].map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 w-16">{day.date}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(day.count / 31) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{day.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

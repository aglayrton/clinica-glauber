'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';

export default function AdminClinicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');

  const clinics = [
    {
      id: '1',
      name: 'Clínica Central Odonto',
      cnpj: '12.345.678/0001-90',
      dentist: 'Dr. Carlos Silva',
      city: 'São Paulo',
      state: 'SP',
      phone: '(11) 98765-4321',
      patients: 45,
      setups: 23,
      createdAt: '2025-01-15',
    },
    {
      id: '2',
      name: 'Sorrisos Perfeitos',
      cnpj: '23.456.789/0001-01',
      dentist: 'Dra. Ana Costa',
      city: 'Rio de Janeiro',
      state: 'RJ',
      phone: '(21) 97654-3210',
      patients: 38,
      setups: 19,
      createdAt: '2025-02-20',
    },
    {
      id: '3',
      name: 'Odonto Excellence',
      cnpj: '34.567.890/0001-12',
      dentist: 'Dr. Carlos Silva',
      city: 'São Paulo',
      state: 'SP',
      phone: '(11) 96543-2109',
      patients: 52,
      setups: 31,
      createdAt: '2025-01-28',
    },
    {
      id: '4',
      name: 'Clínica Saúde Bucal',
      cnpj: '45.678.901/0001-23',
      dentist: 'Dra. Maria Santos',
      city: 'Belo Horizonte',
      state: 'MG',
      phone: '(31) 95432-1098',
      patients: 29,
      setups: 15,
      createdAt: '2025-03-05',
    },
  ];

  const stats = [
    { label: 'Total de Clínicas', value: '89', color: 'bg-blue-500' },
    { label: 'Cidades Atendidas', value: '23', color: 'bg-green-500' },
    { label: 'Total de Pacientes', value: '2.847', color: 'bg-purple-500' },
    { label: 'Média Pacientes/Clínica', value: '32', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clínicas do Sistema</h1>
        <p className="text-gray-600 mt-2">Visualize todas as clínicas cadastradas no sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg`}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
              <Input
                type="text"
                placeholder="Nome da clínica, CNPJ, dentista ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas as Cidades</option>
                <option value="sao-paulo">São Paulo - SP</option>
                <option value="rio-de-janeiro">Rio de Janeiro - RJ</option>
                <option value="belo-horizonte">Belo Horizonte - MG</option>
                <option value="outros">Outras</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clínicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Clínica</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">CNPJ</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Dentista Responsável</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Localização</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Contato</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Pacientes</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Setups</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Cadastro</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clinics.map((clinic) => (
                  <tr key={clinic.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{clinic.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{clinic.cnpj}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{clinic.dentist}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {clinic.city} - {clinic.state}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{clinic.phone}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {clinic.patients}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {clinic.setups}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(clinic.createdAt).toLocaleDateString('pt-BR')}
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

      {/* Top Cities */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Cidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">São Paulo - SP</span>
                <span className="font-semibold">28 clínicas (31%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '31%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Rio de Janeiro - RJ</span>
                <span className="font-semibold">18 clínicas (20%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Belo Horizonte - MG</span>
                <span className="font-semibold">12 clínicas (13%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Outras Cidades</span>
                <span className="font-semibold">31 clínicas (36%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '36%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

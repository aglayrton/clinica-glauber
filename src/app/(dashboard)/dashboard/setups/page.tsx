'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Modal } from '@/components/ui';

interface Setup {
  id: number;
  patient: string;
  clinic: string;
  status: string;
  date: string;
  value: string;
}

export default function SetupsPage() {
  const [filter, setFilter] = useState('all');
  const [setups, setSetups] = useState<Setup[]>([
    { id: 1, patient: 'Maria Silva', clinic: 'Clínica Central', status: 'Aprovado', date: '2025-11-02', value: 'R$ 350,00' },
    { id: 2, patient: 'João Santos', clinic: 'Clínica Norte', status: 'Em Análise', date: '2025-11-01', value: 'R$ 350,00' },
    { id: 3, patient: 'Ana Costa', clinic: 'Clínica Sul', status: 'Enviado', date: '2025-10-30', value: 'R$ 350,00' },
    { id: 4, patient: 'Pedro Oliveira', clinic: 'Clínica Central', status: 'Em Desenvolvimento', date: '2025-10-28', value: '-' },
    { id: 5, patient: 'Carla Mendes', clinic: 'Clínica Norte', status: 'Aprovado', date: '2025-10-25', value: 'R$ 350,00' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    clinic: '',
    date: '',
    observacoes: '',
    tipoTratamento: '',
    arquivosAnexos: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Em Análise':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Enviado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Desenvolvimento':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Em Análise':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Enviado':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSetup: Setup = {
      id: setups.length + 1,
      patient: formData.patient,
      clinic: formData.clinic,
      status: 'Em Desenvolvimento',
      date: formData.date,
      value: '-',
    };

    setSetups([...setups, newSetup]);
    setIsModalOpen(false);

    // Reset form
    setFormData({
      patient: '',
      clinic: '',
      date: '',
      observacoes: '',
      tipoTratamento: '',
      arquivosAnexos: '',
    });
  };

  const filteredSetups = filter === 'all'
    ? setups
    : setups.filter(s => s.status === filter);

  const stats = {
    total: setups.length,
    aprovados: setups.filter(s => s.status === 'Aprovado').length,
    emAnalise: setups.filter(s => s.status === 'Em Análise').length,
    desenvolvimento: setups.filter(s => s.status === 'Em Desenvolvimento').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Setups Odontológicos</h1>
          <p className="text-gray-600 mt-2">Gerencie seus setups e análises</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Setup
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <p className="text-sm text-green-600 font-medium">Aprovados</p>
            <p className="text-2xl font-bold text-green-900 mt-1">{stats.aprovados}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-600 font-medium">Em Análise</p>
            <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.emAnalise}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 font-medium">Desenvolvimento</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.desenvolvimento}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('Em Desenvolvimento')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Em Desenvolvimento'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Em Desenvolvimento
            </button>
            <button
              onClick={() => setFilter('Enviado')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Enviado'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Enviados
            </button>
            <button
              onClick={() => setFilter('Em Análise')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Em Análise'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Em Análise
            </button>
            <button
              onClick={() => setFilter('Aprovado')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Aprovado'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Aprovados
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Setups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSetups.map((setup) => (
          <Card key={setup.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{setup.patient}</h3>
                    <p className="text-sm text-gray-500">{setup.clinic}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(setup.status)}`}>
                  {getStatusIcon(setup.status)}
                  {setup.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium text-gray-900">{new Date(setup.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-medium text-gray-900">{setup.value}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                {setup.status === 'Em Desenvolvimento' && (
                  <Button variant="primary" size="sm" className="flex-1">
                    Enviar
                  </Button>
                )}
                {setup.status === 'Aprovado' && (
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Cadastro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Setup"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paciente
              </label>
              <select
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione um paciente</option>
                <option value="Maria Silva">Maria Silva</option>
                <option value="João Santos">João Santos</option>
                <option value="Ana Costa">Ana Costa</option>
                <option value="Pedro Oliveira">Pedro Oliveira</option>
                <option value="Carla Mendes">Carla Mendes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clínica
              </label>
              <select
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione uma clínica</option>
                <option value="Clínica Central">Clínica Central</option>
                <option value="Clínica Norte">Clínica Norte</option>
                <option value="Clínica Sul">Clínica Sul</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              name="date"
              label="Data de Solicitação"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Tratamento
              </label>
              <select
                name="tipoTratamento"
                value={formData.tipoTratamento}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione o tipo</option>
                <option value="Alinhadores Invisíveis">Alinhadores Invisíveis</option>
                <option value="Aparelho Fixo">Aparelho Fixo</option>
                <option value="Contenção">Contenção</option>
                <option value="Retratamento">Retratamento</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arquivos (Moldagens, Radiografias, Fotos)
            </label>
            <div className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
              <div className="flex flex-col items-center justify-center text-center">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600 mb-1">
                  Clique para selecionar ou arraste os arquivos aqui
                </p>
                <p className="text-xs text-gray-500">
                  STL, OBJ, ZIP, JPG, PNG (máx. 50MB)
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações e Instruções
            </label>
            <textarea
              name="observacoes"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Descreva detalhes importantes sobre o caso, objetivos do tratamento, preferências do paciente, etc..."
              value={formData.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Cadastrar Setup
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input, Modal, Button } from '@/components/ui';

export default function ConsultantSetupsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSetup, setCurrentSetup] = useState<any>(null);
  const [analysisData, setAnalysisData] = useState({
    feedback: '',
    images: [] as File[],
  });
  const [setupsList, setSetupsList] = useState([
    {
      id: 'SETUP-1240',
      patient: 'Roberto Lima',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Odonto Excellence',
      status: 'sent',
      receivedAt: '2025-11-06 09:00',
      images: 5,
      priority: 'urgent',
    },
    {
      id: 'SETUP-1239',
      patient: 'Juliana Santos',
      dentist: 'Dra. Ana Costa',
      clinic: 'Sorrisos Perfeitos',
      status: 'in_analysis',
      receivedAt: '2025-11-05 14:30',
      images: 8,
      priority: 'high',
    },
    {
      id: 'SETUP-1238',
      patient: 'Pedro Oliveira',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Clínica Central',
      status: 'sent',
      receivedAt: '2025-11-04 11:20',
      images: 6,
      priority: 'normal',
    },
    {
      id: 'SETUP-1234',
      patient: 'Maria Silva',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Clínica Central',
      status: 'approved',
      receivedAt: '2025-11-02 10:15',
      approvedAt: '2025-11-05 16:30',
      images: 7,
      priority: 'normal',
    },
    {
      id: 'SETUP-1235',
      patient: 'João Santos',
      dentist: 'Dra. Ana Costa',
      clinic: 'Sorrisos Perfeitos',
      status: 'approved',
      receivedAt: '2025-11-01 09:45',
      approvedAt: '2025-11-04 14:20',
      images: 9,
      priority: 'normal',
    },
  ]);

  const setups = setupsList;

  const handleStartAnalysis = (setup: any) => {
    setCurrentSetup(setup);
    setIsModalOpen(true);
  };

  const handleSaveAnalysis = () => {
    if (currentSetup) {
      setSetupsList(setupsList.map(s =>
        s.id === currentSetup.id
          ? { ...s, status: 'in_analysis' }
          : s
      ));
      setIsModalOpen(false);
      setAnalysisData({ feedback: '', images: [] });
      setCurrentSetup(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Aguardando Análise</span>;
      case 'in_analysis':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Em Análise</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Aprovado</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Urgente</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Alta</span>;
      case 'normal':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Normal</span>;
      default:
        return null;
    }
  };

  const stats = [
    {
      label: 'Total Recebidos',
      value: '156',
      color: 'bg-blue-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      label: 'Aguardando Análise',
      value: '5',
      color: 'bg-yellow-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Em Análise',
      value: '3',
      color: 'bg-orange-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      label: 'Aprovados',
      value: '148',
      color: 'bg-green-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Setups Recebidos</h1>
        <p className="text-gray-600 mt-2">Gerencie e analise os setups enviados pelos dentistas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
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
                placeholder="ID, paciente, dentista..."
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
                <option value="sent">Aguardando Análise</option>
                <option value="in_analysis">Em Análise</option>
                <option value="approved">Aprovados</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setups List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Setups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {setups.map((setup) => (
              <div
                key={setup.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  setup.status === 'sent' ? 'border-blue-200 bg-blue-50' :
                  setup.status === 'in_analysis' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{setup.patient}</h3>
                      {getStatusBadge(setup.status)}
                      {getPriorityBadge(setup.priority)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <p>
                        <strong>ID Setup:</strong> <span className="font-mono">{setup.id}</span>
                      </p>
                      <p>
                        <strong>Dentista:</strong> {setup.dentist}
                      </p>
                      <p>
                        <strong>Clínica:</strong> {setup.clinic}
                      </p>
                      <p>
                        <strong>Recebido em:</strong> {setup.receivedAt}
                      </p>
                      <p>
                        <strong>Imagens anexadas:</strong> {setup.images} arquivos
                      </p>
                      {setup.approvedAt && (
                        <p>
                          <strong>Aprovado em:</strong> {setup.approvedAt}
                        </p>
                      )}
                    </div>

                    {setup.status === 'approved' && (
                      <div className="p-3 bg-white rounded-lg border border-green-200 text-sm">
                        <p className="text-green-800">
                          <strong>✅ Feedback Enviado:</strong> Setup aprovado com excelentes resultados.
                          Paciente pode prosseguir com o tratamento conforme planejado.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {setup.status === 'sent' && (
                      <>
                        <button
                          onClick={() => handleStartAnalysis(setup)}
                          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium whitespace-nowrap"
                        >
                          Iniciar Análise
                        </button>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">
                          Ver Detalhes
                        </button>
                      </>
                    )}
                    {setup.status === 'in_analysis' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium whitespace-nowrap">
                          Enviar Devolutiva
                        </button>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">
                          Ver Detalhes
                        </button>
                      </>
                    )}
                    {setup.status === 'approved' && (
                      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">
                        Ver Detalhes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Desempenho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-600 mb-2">Tempo Médio de Análise</p>
              <p className="text-4xl font-bold text-blue-600 mb-1">2.5h</p>
              <p className="text-xs text-gray-500">Por setup</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-600 mb-2">Taxa de Aprovação</p>
              <p className="text-4xl font-bold text-green-600 mb-1">94%</p>
              <p className="text-xs text-gray-500">148 de 156 aprovados</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <p className="text-sm text-gray-600 mb-2">Setups Este Mês</p>
              <p className="text-4xl font-bold text-purple-600 mb-1">34</p>
              <p className="text-xs text-gray-500">+12% vs. mês anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Análise */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Iniciar Análise do Setup"
        size="lg"
      >
        {currentSetup && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Informações do Setup</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>ID:</strong> {currentSetup.id}</p>
                <p><strong>Paciente:</strong> {currentSetup.patient}</p>
                <p><strong>Dentista:</strong> {currentSetup.dentist}</p>
                <p><strong>Clínica:</strong> {currentSetup.clinic}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback / Observações
              </label>
              <textarea
                value={analysisData.feedback}
                onChange={(e) => setAnalysisData({ ...analysisData, feedback: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Adicione suas observações sobre o caso, pontos de atenção, recomendações..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anexar Imagens Marcadas
              </label>
              <div className="w-full px-4 py-8 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors cursor-pointer">
                <div className="flex flex-col items-center justify-center text-center">
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-600 mb-1">
                    Clique para selecionar ou arraste as imagens aqui
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG (máx. 10MB cada)
                  </p>
                </div>
              </div>
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
              <Button
                onClick={handleSaveAnalysis}
                variant="primary"
                className="flex-1"
              >
                Salvar e Marcar como "Em Análise"
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

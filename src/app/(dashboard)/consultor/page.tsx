'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function ConsultantDashboard() {
  const stats = [
    {
      title: 'Setups Recebidos',
      value: '156',
      subtitle: 'Total desde o início',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      title: 'Em Análise',
      value: '8',
      subtitle: 'Aguardando sua devolutiva',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-yellow-500',
    },
    {
      title: 'Aprovados',
      value: '148',
      subtitle: 'Setups finalizados',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
    },
    {
      title: 'Receita Total',
      value: 'R$ 54.600',
      subtitle: 'R$ 2.800 este mês',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-purple-500',
    },
  ];

  const pendingSetups = [
    {
      id: 'SETUP-1238',
      patient: 'Pedro Oliveira',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Clínica Central',
      receivedAt: '2025-11-06 09:00',
      priority: 'normal',
    },
    {
      id: 'SETUP-1239',
      patient: 'Juliana Santos',
      dentist: 'Dra. Ana Costa',
      clinic: 'Sorrisos Perfeitos',
      receivedAt: '2025-11-05 14:30',
      priority: 'high',
    },
    {
      id: 'SETUP-1240',
      patient: 'Roberto Lima',
      dentist: 'Dr. Carlos Silva',
      clinic: 'Odonto Excellence',
      receivedAt: '2025-11-04 11:20',
      priority: 'urgent',
    },
  ];

  const recentApproved = [
    {
      id: 'SETUP-1234',
      patient: 'Maria Silva',
      dentist: 'Dr. Carlos Silva',
      feedback: 'Setup aprovado com excelentes resultados.',
      approvedAt: '2025-11-05',
    },
    {
      id: 'SETUP-1235',
      patient: 'João Santos',
      dentist: 'Dra. Ana Costa',
      feedback: 'Ótimo planejamento, pode prosseguir.',
      approvedAt: '2025-11-04',
    },
    {
      id: 'SETUP-1236',
      patient: 'Ana Costa',
      dentist: 'Dr. Carlos Silva',
      feedback: 'Setup adequado para o caso.',
      approvedAt: '2025-11-03',
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Urgente</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Alta</span>;
      case 'normal':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Normal</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, Dr. Paulo!</h1>
          <p className="text-gray-600 mt-2">Você tem 8 setups aguardando sua análise</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
            🧑‍💼 Consultor
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Setups Alert */}
      {pendingSetups.length > 0 && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-900 mb-1">
                  Atenção: Setups Aguardando Análise
                </h3>
                <p className="text-sm text-yellow-800">
                  Você tem {pendingSetups.length} setups que precisam da sua devolutiva técnica.
                  Clique em "Ver Setups Pendentes" para começar a análise.
                </p>
              </div>
              <a
                href="/consultor/setups-recebidos"
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium whitespace-nowrap"
              >
                Ver Setups Pendentes
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Setups Awaiting Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Setups Aguardando Análise</CardTitle>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                {pendingSetups.length}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingSetups.map((setup) => (
                <div
                  key={setup.id}
                  className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{setup.patient}</h4>
                        {getPriorityBadge(setup.priority)}
                      </div>
                      <p className="text-sm text-gray-600">Dentista: {setup.dentist}</p>
                      <p className="text-sm text-gray-600">{setup.clinic}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: <span className="font-mono">{setup.id}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Recebido em: {setup.receivedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
                      Iniciar Análise
                    </button>
                    <button className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Approved Setups */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Setups Aprovados Recentemente</CardTitle>
              <a href="/consultor/setups-recebidos?status=approved" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver todos
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApproved.map((setup) => (
                <div key={setup.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{setup.patient}</h4>
                      <p className="text-sm text-gray-600 mb-2">Dentista: {setup.dentist}</p>
                      <div className="p-2 bg-white rounded border border-green-200">
                        <p className="text-xs text-gray-700">
                          <strong>Feedback:</strong> {setup.feedback}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Aprovado em: {new Date(setup.approvedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho - Últimos 30 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Setups Analisados</p>
              <p className="text-4xl font-bold text-blue-600 mb-1">34</p>
              <p className="text-xs text-gray-500">+12% vs. mês anterior</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Taxa de Aprovação</p>
              <p className="text-4xl font-bold text-green-600 mb-1">94%</p>
              <p className="text-xs text-gray-500">32 de 34 aprovados</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Tempo Médio de Análise</p>
              <p className="text-4xl font-bold text-purple-600 mb-1">2.5h</p>
              <p className="text-xs text-gray-500">-15% vs. mês anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notificações Recentes</CardTitle>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Marcar todas como lidas
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <strong>Novo setup recebido:</strong> Setup #1240 de Roberto Lima foi enviado para análise
                </p>
                <p className="text-xs text-gray-500 mt-1">Há 30 minutos</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <strong>Feedback confirmado:</strong> Dr. Carlos Silva confirmou o recebimento do feedback do Setup #1234
                </p>
                <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <strong>Lembrete:</strong> Você tem 8 setups aguardando análise há mais de 24 horas
                </p>
                <p className="text-xs text-gray-500 mt-1">Há 3 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/consultor/setups-recebidos"
              className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Ver Todos os Setups</h4>
                <p className="text-sm text-gray-600">Gerencie todos os setups recebidos</p>
              </div>
            </a>

            <a
              href="/consultor/financeiro"
              className="flex items-center gap-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Ver Financeiro</h4>
                <p className="text-sm text-gray-600">Consulte seus ganhos e histórico</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

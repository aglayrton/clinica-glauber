'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function DentistDashboard() {
  const stats = [
    {
      title: 'Minhas Clínicas',
      value: '3',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'bg-blue-500',
      change: '+1 este mês',
      href: '/dashboard/clinicas',
    },
    {
      title: 'Meus Pacientes',
      value: '47',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-green-500',
      change: '+8 este mês',
      href: '/dashboard/pacientes',
    },
    {
      title: 'Setups Enviados',
      value: '12',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-purple-500',
      change: '+3 este mês',
      href: '/dashboard/setups',
    },
    {
      title: 'Total Gasto',
      value: 'R$ 4.850',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-yellow-500',
      change: '+R$ 1.200 este mês',
      href: '/dashboard/pagamentos',
    },
  ];

  const recentSetups = [
    {
      id: 'SETUP-1234',
      patient: 'Maria Silva',
      clinic: 'Clínica Central',
      status: 'approved',
      date: '2025-11-02',
      feedback: 'Setup aprovado com excelentes resultados. Paciente pode prosseguir com o tratamento.',
    },
    {
      id: 'SETUP-1235',
      patient: 'João Santos',
      clinic: 'Clínica Norte',
      status: 'in_analysis',
      date: '2025-11-01',
      feedback: null,
    },
    {
      id: 'SETUP-1236',
      patient: 'Ana Costa',
      clinic: 'Clínica Sul',
      status: 'sent',
      date: '2025-10-30',
      feedback: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Aprovado</span>;
      case 'in_analysis':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Em Análise</span>;
      case 'sent':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Enviado</span>;
      case 'in_development':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Em Desenvolvimento</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, Dr. Carlos!</h1>
          <p className="text-gray-600 mt-2">Aqui está um resumo das suas atividades</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            🦷 Dentista
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <a key={index} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Setups */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Meus Setups Recentes</CardTitle>
              <a href="/dashboard/setups" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver todos
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSetups.map((setup) => (
                <div key={setup.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{setup.patient}</h4>
                        {getStatusBadge(setup.status)}
                      </div>
                      <p className="text-sm text-gray-600">{setup.clinic}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: <span className="font-mono">{setup.id}</span> • {new Date(setup.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  {setup.feedback && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium mb-1">💬 Feedback do Consultor:</p>
                      <p className="text-sm text-green-700">{setup.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <a
                href="/dashboard/clinicas"
                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Nova Clínica</h4>
                  <p className="text-sm text-gray-600">Cadastre uma nova clínica</p>
                </div>
              </a>

              <a
                href="/dashboard/pacientes"
                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Novo Paciente</h4>
                  <p className="text-sm text-gray-600">Adicione um novo paciente</p>
                </div>
              </a>

              <a
                href="/dashboard/setups"
                className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Criar Setup</h4>
                  <p className="text-sm text-gray-600">Envie um novo setup para análise</p>
                </div>
              </a>

              <a
                href="/dashboard/pagamentos"
                className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Ver Pagamentos</h4>
                  <p className="text-sm text-gray-600">Histórico de pagamentos</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

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
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <strong>Setup aprovado:</strong> O setup de Maria Silva (SETUP-1234) foi aprovado pelo consultor
                </p>
                <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
              </div>
              <button className="text-green-600 hover:text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <strong>Pagamento confirmado:</strong> Pagamento de R$ 350,00 para o Setup #1236 foi confirmado
                </p>
                <p className="text-xs text-gray-500 mt-1">Há 5 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <strong>Em análise:</strong> O setup de João Santos (SETUP-1235) está sendo analisado pelo consultor
                </p>
                <p className="text-xs text-gray-500 mt-1">Ontem</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Status Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição dos Meus Setups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Em Desenvolvimento</span>
                <span className="font-semibold">2 setups</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: '17%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Enviados (aguardando análise)</span>
                <span className="font-semibold">1 setup</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Em Análise</span>
                <span className="font-semibold">1 setup</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Aprovados</span>
                <span className="font-semibold">8 setups</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

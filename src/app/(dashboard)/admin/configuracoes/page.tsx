'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';

export default function AdminConfigPage() {
  const [termsOfUse, setTermsOfUse] = useState(
    'Termos de Uso do Sistema Odontológico...\n\nEste documento estabelece os termos e condições para uso da plataforma...'
  );
  const [privacyPolicy, setPrivacyPolicy] = useState(
    'Política de Privacidade\n\nEsta política descreve como coletamos, usamos e protegemos seus dados pessoais...'
  );
  const [whatsapp, setWhatsapp] = useState('+55 11 98765-4321');
  const [phone, setPhone] = useState('(11) 3456-7890');
  const [email, setEmail] = useState('suporte@sistemaodonto.com.br');

  const handleSaveTerms = () => {
    alert('Termos de Uso salvos com sucesso!');
  };

  const handleSavePrivacy = () => {
    alert('Política de Privacidade salva com sucesso!');
  };

  const handleSaveSupport = () => {
    alert('Contatos de Suporte salvos com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600 mt-2">Gerencie termos, políticas e contatos de suporte</p>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Versão do Sistema</p>
              <p className="text-lg font-semibold text-gray-900">v1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Última Atualização</p>
              <p className="text-lg font-semibold text-gray-900">06/11/2025 10:30</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status do Sistema</p>
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms of Use */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Termos de Uso</CardTitle>
            <span className="text-xs text-gray-500">Última edição: 01/11/2025 por Admin</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo dos Termos de Uso
              </label>
              <textarea
                value={termsOfUse}
                onChange={(e) => setTermsOfUse(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                placeholder="Digite os termos de uso..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Este texto será exibido durante o cadastro de novos usuários e deve ser aceito para prosseguir.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Visualizar Preview</Button>
              <Button onClick={handleSaveTerms} className="bg-primary-600 hover:bg-primary-700 text-white">
                Salvar Termos de Uso
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Política de Privacidade</CardTitle>
            <span className="text-xs text-gray-500">Última edição: 01/11/2025 por Admin</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo da Política de Privacidade
              </label>
              <textarea
                value={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                placeholder="Digite a política de privacidade..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Descreva como os dados pessoais dos usuários são coletados, usados e protegidos.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Visualizar Preview</Button>
              <Button onClick={handleSavePrivacy} className="bg-primary-600 hover:bg-primary-700 text-white">
                Salvar Política de Privacidade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Contatos de Suporte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+55 11 98765-4321"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Será exibido no botão flutuante de suporte
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 3456-7890"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Telefone fixo para contato
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="suporte@sistemaodonto.com.br"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  E-mail oficial de suporte
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Informação Importante</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Estes contatos são exibidos em todas as páginas do sistema para dentistas e consultores.
                    Certifique-se de que estão sempre atualizados e funcionando corretamente.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveSupport} className="bg-primary-600 hover:bg-primary-700 text-white">
                Salvar Contatos de Suporte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Notificações por E-mail</p>
                <p className="text-sm text-gray-600 mt-1">Enviar notificações importantes por e-mail</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Notificações de Novos Cadastros</p>
                <p className="text-sm text-gray-600 mt-1">Receber alerta quando novo usuário se cadastrar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Notificações de Pagamentos</p>
                <p className="text-sm text-gray-600 mt-1">Receber alerta de pagamentos realizados</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Relatórios Mensais Automáticos</p>
                <p className="text-sm text-gray-600 mt-1">Enviar relatório mensal por e-mail no dia 1º</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

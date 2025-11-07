'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input, Button } from '@/components/ui';

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Dr. Paulo Mendes',
    email: 'paulo.mendes@email.com',
    telefone: '(11) 98888-7777',
    cro: 'CRO/SP 54321',
    especialidade: 'Ortodontia',
    cpf: '987.654.321-00',
    endereco: 'Av. Consultor, 456',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '04567-890',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando perfil:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e profissionais</p>
        </div>
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar Perfil
          </Button>
        )}
      </div>

      {/* Profile Photo */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600">
              PM
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900">{formData.nome}</h3>
              <p className="text-gray-600">{formData.cro} - {formData.especialidade}</p>
              <p className="text-sm text-gray-500 mt-1">{formData.email}</p>
            </div>
            {isEditing && (
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="nome"
                label="Nome Completo"
                value={formData.nome}
                onChange={handleChange}
                disabled={!isEditing}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              <Input
                type="email"
                name="email"
                label="E-mail"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <Input
                type="tel"
                name="telefone"
                label="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                disabled={!isEditing}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />

              <Input
                type="text"
                name="cpf"
                label="CPF"
                value={formData.cpf}
                onChange={handleChange}
                disabled={!isEditing}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informações Profissionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="cro"
                label="CRO"
                value={formData.cro}
                onChange={handleChange}
                disabled={!isEditing}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />

              <Input
                type="text"
                name="especialidade"
                label="Especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                disabled={!isEditing}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  name="endereco"
                  label="Endereço"
                  value={formData.endereco}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
              </div>

              <Input
                type="text"
                name="cidade"
                label="Cidade"
                value={formData.cidade}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                type="text"
                name="estado"
                label="Estado"
                value={formData.estado}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                type="text"
                name="cep"
                label="CEP"
                value={formData.cep}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {isEditing && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>

      {/* Security Section */}
      {!isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Alterar Senha</h4>
                  <p className="text-sm text-gray-600">Última alteração há 30 dias</p>
                </div>
                <Button variant="outline" size="sm">
                  Alterar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Autenticação em Dois Fatores</h4>
                  <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="outline" size="sm">
                  Ativar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {!isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-gray-600 mb-2">Total de Setups Analisados</p>
                <p className="text-4xl font-bold text-blue-600 mb-1">156</p>
                <p className="text-xs text-gray-500">Desde o início</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600 mb-2">Taxa de Aprovação</p>
                <p className="text-4xl font-bold text-green-600 mb-1">94%</p>
                <p className="text-xs text-gray-500">148 de 156 aprovados</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600 mb-2">Ganhos Totais</p>
                <p className="text-4xl font-bold text-purple-600 mb-1">R$ 54,6k</p>
                <p className="text-xs text-gray-500">Receita acumulada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

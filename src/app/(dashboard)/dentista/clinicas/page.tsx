'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';

interface Clinica {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
}

export default function ClinicasPage() {
  const [clinicas, setClinicas] = useState<Clinica[]>([
    { id: 1, name: 'Clínica Central', cnpj: '12.345.678/0001-90', address: 'Rua Principal, 123 - Centro', phone: '(11) 3333-4444' },
    { id: 2, name: 'Clínica Norte', cnpj: '98.765.432/0001-10', address: 'Av. Norte, 456 - Jardins', phone: '(11) 5555-6666' },
    { id: 3, name: 'Clínica Sul', cnpj: '45.678.901/0001-23', address: 'Rua Sul, 789 - Vila Nova', phone: '(11) 7777-8888' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    phone: '',
    email: '',
    observacoes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newClinica: Clinica = {
      id: clinicas.length + 1,
      name: formData.name,
      cnpj: formData.cnpj,
      address: `${formData.address} - ${formData.city}`,
      phone: formData.phone,
    };

    setClinicas([...clinicas, newClinica]);
    setIsModalOpen(false);

    // Reset form
    setFormData({
      name: '',
      cnpj: '',
      address: '',
      city: '',
      state: '',
      cep: '',
      phone: '',
      email: '',
      observacoes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clínicas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas clínicas cadastradas</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Clínica
        </Button>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicas.map((clinica) => (
          <Card key={clinica.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{clinica.name}</CardTitle>
                    <p className="text-xs text-gray-500">{clinica.cnpj}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">{clinica.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-sm text-gray-600">{clinica.phone}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </Button>
                <Button variant="ghost" size="sm" className="text-primary-600">
                  Ver Pacientes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Cadastro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Nova Clínica"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              label="Nome da Clínica"
              placeholder="Clínica Odontológica"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="cnpj"
              label="CNPJ (opcional)"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="tel"
              name="phone"
              label="Telefone"
              placeholder="(00) 0000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Input
              type="email"
              name="email"
              label="E-mail"
              placeholder="contato@clinica.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <Input
            type="text"
            name="address"
            label="Endereço"
            placeholder="Rua, número"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="city"
              label="Cidade"
              placeholder="São Paulo"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="state"
              label="Estado"
              placeholder="SP"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="cep"
              label="CEP"
              placeholder="00000-000"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="observacoes"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Informações adicionais sobre a clínica..."
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
              Cadastrar Clínica
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

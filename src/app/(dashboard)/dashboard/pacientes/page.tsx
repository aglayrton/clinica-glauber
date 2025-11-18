'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Modal } from '@/components/ui';

interface Paciente {
  id: number;
  name: string;
  age: number;
  clinic: string;
  phone: string;
  lastVisit: string;
  cpf?: string;
  email?: string;
  address?: string;
  dataNascimento?: string;
}

export default function PacientesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>([
    { id: 1, name: 'Maria Silva', age: 34, clinic: 'Clínica Central', phone: '(11) 98888-1111', lastVisit: '2025-11-02' },
    { id: 2, name: 'João Santos', age: 45, clinic: 'Clínica Norte', phone: '(11) 97777-2222', lastVisit: '2025-11-01' },
    { id: 3, name: 'Ana Costa', age: 28, clinic: 'Clínica Sul', phone: '(11) 96666-3333', lastVisit: '2025-10-30' },
    { id: 4, name: 'Pedro Oliveira', age: 52, clinic: 'Clínica Central', phone: '(11) 95555-4444', lastVisit: '2025-10-28' },
    { id: 5, name: 'Carla Mendes', age: 39, clinic: 'Clínica Norte', phone: '(11) 94444-5555', lastVisit: '2025-10-25' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    clinic: '',
    observacoes: '',
  });

  const filteredPacientes = pacientes.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clinic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataNasc = new Date(formData.dataNascimento);
    const hoje = new Date();
    const idade = Math.floor((hoje.getTime() - dataNasc.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    const newPaciente: Paciente = {
      id: pacientes.length + 1,
      name: formData.name,
      age: idade,
      clinic: formData.clinic,
      phone: formData.phone,
      lastVisit: new Date().toISOString().split('T')[0],
      cpf: formData.cpf,
      email: formData.email,
      address: `${formData.address} - ${formData.city}`,
      dataNascimento: formData.dataNascimento,
    };

    setPacientes([...pacientes, newPaciente]);
    setIsModalOpen(false);

    // Reset form
    setFormData({
      name: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      cep: '',
      clinic: '',
      observacoes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600 mt-2">Gerencie seus pacientes cadastrados</p>
        </div>
        <Button variant="primary" onClick={() => router.push('/dashboard/pacientes/novo')}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Paciente
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            type="text"
            placeholder="Buscar paciente por nome ou clínica..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPacientes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Clínica
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Última Visita
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPacientes.map((paciente) => (
                  <tr key={paciente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium text-sm">
                            {paciente.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{paciente.name}</div>
                          <div className="text-sm text-gray-500 md:hidden">{paciente.age} anos</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {paciente.age} anos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {paciente.clinic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                      {paciente.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(paciente.lastVisit).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary/80 mr-3">
                        Editar
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Cadastro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Paciente"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              label="Nome Completo"
              placeholder="Nome do paciente"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="cpf"
              label="CPF"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              name="dataNascimento"
              label="Data de Nascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />

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
              type="tel"
              name="phone"
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Input
              type="email"
              name="email"
              label="E-mail"
              placeholder="paciente@email.com"
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
              placeholder="Informações médicas relevantes, alergias, etc..."
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
              Cadastrar Paciente
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

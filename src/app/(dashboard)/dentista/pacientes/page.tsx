'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Modal, useToast } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { cpfMask, phoneMask, cepMask, removeNonNumeric } from '@/lib/masks';
import { API_ENDPOINTS } from '@/lib/api';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string | null;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  observacoes: string | null;
  clinicaId: number;
  clinica?: {
    id: number;
    nome: string;
  };
}

interface Clinica {
  id: number;
  nome: string;
}

export default function PacientesPage() {
  const { token } = useAuth();
  const { showToast, ToastComponent } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    clinicaId: '',
    observacoes: '',
  });

  // Validation functions
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    return cleanCPF.length === 11;
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateCEP = (cep: string): boolean => {
    const cleanCEP = cep.replace(/[^\d]/g, '');
    return cleanCEP.length === 8;
  };

  const validateEmail = (email: string): boolean => {
    if (email === '') return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Load clinics and patients from API
  useEffect(() => {
    loadClinicas();
    loadPacientes();
  }, []);

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadClinicas = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.clinicas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClinicas(data);
      }
    } catch (err) {
      console.error('Erro ao carregar clínicas:', err);
    }
  };

  const loadPacientes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.pacientes, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        showToast(data.message || 'Erro ao carregar pacientes', 'error');
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setPacientes(data);
    } catch (err) {
      console.error('Erro ao carregar pacientes:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let maskedValue = value;

    // Apply masks based on field
    switch (name) {
      case 'cpf':
        maskedValue = cpfMask(value);
        break;
      case 'telefone':
        maskedValue = phoneMask(value);
        break;
      case 'cep':
        maskedValue = cepMask(value);
        break;
      default:
        maskedValue = value;
    }

    setFormData({
      ...formData,
      [name]: maskedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.nome.trim()) {
      showToast('Nome do paciente é obrigatório', 'error');
      return;
    }

    if (!validateCPF(formData.cpf)) {
      showToast('CPF inválido. Formato: 000.000.000-00', 'error');
      return;
    }

    if (!validatePhone(formData.telefone)) {
      showToast('Telefone inválido. Formato: (00) 0000-0000 ou (00) 00000-0000', 'error');
      return;
    }

    if (!validateCEP(formData.cep)) {
      showToast('CEP inválido. Formato: 00000-000', 'error');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      showToast('E-mail inválido', 'error');
      return;
    }

    if (!formData.clinicaId) {
      showToast('Selecione uma clínica', 'error');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(API_ENDPOINTS.pacientes, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: removeNonNumeric(formData.cpf),
          dataNascimento: formData.dataNascimento,
          telefone: removeNonNumeric(formData.telefone),
          email: formData.email || null,
          endereco: formData.endereco,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: removeNonNumeric(formData.cep),
          clinicaId: parseInt(formData.clinicaId),
          observacoes: formData.observacoes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Erro ao cadastrar paciente', 'error');
        setIsSaving(false);
        return;
      }

      showToast('Paciente cadastrado com sucesso!', 'success');
      setIsModalOpen(false);

      // Reset form
      setFormData({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        clinicaId: '',
        observacoes: '',
      });

      // Reload patients
      loadPacientes();
    } catch (err) {
      console.error('Erro ao cadastrar paciente:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setFormData({
      nome: paciente.nome,
      cpf: cpfMask(paciente.cpf),
      dataNascimento: paciente.dataNascimento,
      email: paciente.email || '',
      telefone: phoneMask(paciente.telefone),
      endereco: paciente.endereco,
      cidade: paciente.cidade,
      estado: paciente.estado,
      cep: cepMask(paciente.cep),
      clinicaId: paciente.clinicaId.toString(),
      observacoes: paciente.observacoes || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPaciente) return;

    // Validations
    if (!formData.nome.trim()) {
      showToast('Nome do paciente é obrigatório', 'error');
      return;
    }

    if (!validateCPF(formData.cpf)) {
      showToast('CPF inválido. Formato: 000.000.000-00', 'error');
      return;
    }

    if (!validatePhone(formData.telefone)) {
      showToast('Telefone inválido. Formato: (00) 0000-0000 ou (00) 00000-0000', 'error');
      return;
    }

    if (!validateCEP(formData.cep)) {
      showToast('CEP inválido. Formato: 00000-000', 'error');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      showToast('E-mail inválido', 'error');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.pacientes}/${selectedPaciente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: removeNonNumeric(formData.cpf),
          dataNascimento: formData.dataNascimento,
          telefone: removeNonNumeric(formData.telefone),
          email: formData.email || null,
          endereco: formData.endereco,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: removeNonNumeric(formData.cep),
          clinicaId: parseInt(formData.clinicaId),
          observacoes: formData.observacoes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Erro ao atualizar paciente', 'error');
        setIsSaving(false);
        return;
      }

      showToast('Paciente atualizado com sucesso!', 'success');
      setIsEditModalOpen(false);
      setSelectedPaciente(null);

      // Reset form
      setFormData({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        clinicaId: '',
        observacoes: '',
      });

      // Reload patients
      loadPacientes();
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPaciente) return;

    setIsSaving(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.pacientes}/${selectedPaciente.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        showToast(data.message || 'Erro ao excluir paciente', 'error');
        setIsSaving(false);
        return;
      }

      showToast('Paciente excluído com sucesso!', 'success');
      setIsDeleteModalOpen(false);
      setSelectedPaciente(null);

      // Reload patients
      loadPacientes();
    } catch (err) {
      console.error('Erro ao excluir paciente:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const router = useRouter();

  const handleNewPatient = () => {
    if (clinicas.length === 0) {
      showToast('Você precisa cadastrar pelo menos uma clínica antes de adicionar pacientes', 'warning');
      return;
    }
    router.push('/dentista/pacientes/novo');
  };

  // Filter and paginate patients with useMemo for reactivity
  const filteredPacientes = useMemo(() => {
    if (!searchTerm.trim()) {
      return pacientes;
    }

    const searchLower = searchTerm.toLowerCase();
    const searchNumeric = searchTerm.replace(/[^\d]/g, '');

    return pacientes.filter(p => {
      // Busca por nome
      const matchNome = p.nome.toLowerCase().includes(searchLower);

      // Busca por clínica
      const matchClinica = p.clinica?.nome.toLowerCase().includes(searchLower);

      // Busca por CPF (apenas números)
      const matchCPF = searchNumeric && p.cpf.includes(searchNumeric);

      return matchNome || matchClinica || matchCPF;
    });
  }, [pacientes, searchTerm]);

  const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);
  const paginatedPacientes = useMemo(() => {
    return filteredPacientes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredPacientes, currentPage, itemsPerPage]);

  // Calculate age
  const calculateAge = (dataNascimento: string): number => {
    const birthDate = new Date(dataNascimento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <ToastComponent />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600 mt-2">Gerencie seus pacientes cadastrados</p>
        </div>
        <Button variant="primary" onClick={handleNewPatient}>
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
            placeholder="Buscar paciente por nome, CPF ou clínica..."
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

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando pacientes...</p>
        </div>
      ) : filteredPacientes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente cadastrado</h3>
            <p className="text-gray-600 mb-4">Comece cadastrando seu primeiro paciente</p>
            {clinicas.length > 0 && (
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Cadastrar Paciente
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
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
                        CPF
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedPacientes.map((paciente) => (
                      <tr key={paciente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {paciente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{paciente.nome}</div>
                              <div className="text-sm text-gray-500 md:hidden">{calculateAge(paciente.dataNascimento)} anos</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {calculateAge(paciente.dataNascimento)} anos
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {paciente.clinica?.nome || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                          {phoneMask(paciente.telefone)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {cpfMask(paciente.cpf)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(paciente)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteClick(paciente)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredPacientes.length)}</span> de{' '}
                        <span className="font-medium">{filteredPacientes.length}</span> resultados
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Anterior</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              currentPage === index + 1
                                ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Próxima</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

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
              name="nome"
              label="Nome Completo"
              placeholder="Nome do paciente"
              value={formData.nome}
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
                name="clinicaId"
                value={formData.clinicaId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Selecione uma clínica</option>
                {clinicas.map((clinica) => (
                  <option key={clinica.id} value={clinica.id}>
                    {clinica.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="tel"
              name="telefone"
              label="Telefone"
              placeholder="(85) 00000-0000"
              value={formData.telefone}
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
            name="endereco"
            label="Endereço"
            placeholder="Rua, número"
            value={formData.endereco}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="cidade"
              label="Cidade"
              placeholder="Fortaleza"
              value={formData.cidade}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="estado"
              label="Estado"
              placeholder="CE"
              value={formData.estado}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="cep"
              label="CEP"
              placeholder="60000-000"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1" isLoading={isSaving}>
              {isSaving ? 'Cadastrando...' : 'Cadastrar Paciente'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPaciente(null);
        }}
        title="Editar Paciente"
        size="lg"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="nome"
              label="Nome Completo"
              placeholder="Nome do paciente"
              value={formData.nome}
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
                name="clinicaId"
                value={formData.clinicaId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Selecione uma clínica</option>
                {clinicas.map((clinica) => (
                  <option key={clinica.id} value={clinica.id}>
                    {clinica.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="tel"
              name="telefone"
              label="Telefone"
              placeholder="(85) 00000-0000"
              value={formData.telefone}
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
            name="endereco"
            label="Endereço"
            placeholder="Rua, número"
            value={formData.endereco}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="cidade"
              label="Cidade"
              placeholder="Fortaleza"
              value={formData.cidade}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="estado"
              label="Estado"
              placeholder="CE"
              value={formData.estado}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="cep"
              label="CEP"
              placeholder="60000-000"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Informações médicas relevantes, alergias, etc..."
              value={formData.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedPaciente(null);
              }}
              className="flex-1"
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1" isLoading={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPaciente(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Tem certeza que deseja excluir o paciente <strong>{selectedPaciente?.nome}</strong>?
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedPaciente(null);
              }}
              className="flex-1"
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="primary"
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              isLoading={isSaving}
            >
              {isSaving ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

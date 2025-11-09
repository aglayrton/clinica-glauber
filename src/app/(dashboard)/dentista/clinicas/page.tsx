'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, useToast } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { cnpjMask, phoneMask, cepMask, removeNonNumeric } from '@/lib/masks';
import { API_ENDPOINTS } from '@/lib/api';

interface Clinica {
  id: number;
  nome: string;
  cnpj: string | null;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string | null;
  observacoes: string | null;
}

export default function ClinicasPage() {
  const { token } = useAuth();
  const { showToast, ToastComponent } = useToast();
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClinica, setSelectedClinica] = useState<Clinica | null>(null);
  const [isSaving, setIsSaving] = useState(false);
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

  // Validation functions
  const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    return cleanCNPJ.length === 0 || cleanCNPJ.length === 14;
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

  // Load clinics from API
  useEffect(() => {
    loadClinicas();
  }, []);

  const loadClinicas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.clinicas, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        showToast(data.message || 'Erro ao carregar clínicas', 'error');
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setClinicas(data);
    } catch (err) {
      console.error('Erro ao carregar clínicas:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let maskedValue = value;

    // Aplicar máscaras baseado no campo
    switch (name) {
      case 'cnpj':
        maskedValue = cnpjMask(value);
        break;
      case 'phone':
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
    if (!formData.name.trim()) {
      showToast('Nome da clínica é obrigatório', 'error');
      return;
    }

    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      showToast('CNPJ inválido. Formato: 00.000.000/0000-00', 'error');
      return;
    }

    if (!validatePhone(formData.phone)) {
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
      const response = await fetch(API_ENDPOINTS.clinicas, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: formData.name,
          cnpj: formData.cnpj ? removeNonNumeric(formData.cnpj) : null,
          endereco: formData.address,
          cidade: formData.city,
          estado: formData.state,
          cep: removeNonNumeric(formData.cep),
          telefone: removeNonNumeric(formData.phone),
          email: formData.email || null,
          observacoes: formData.observacoes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Erro ao cadastrar clínica', 'error');
        setIsSaving(false);
        return;
      }

      showToast('Clínica cadastrada com sucesso!', 'success');
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

      // Reload clinics
      loadClinicas();
    } catch (err) {
      console.error('Erro ao cadastrar clínica:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (clinica: Clinica) => {
    setSelectedClinica(clinica);
    setFormData({
      name: clinica.nome,
      cnpj: clinica.cnpj ? cnpjMask(clinica.cnpj) : '',
      address: clinica.endereco,
      city: clinica.cidade,
      state: clinica.estado,
      cep: cepMask(clinica.cep),
      phone: phoneMask(clinica.telefone),
      email: clinica.email || '',
      observacoes: clinica.observacoes || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClinica) return;

    // Validations
    if (!formData.name.trim()) {
      showToast('Nome da clínica é obrigatório', 'error');
      return;
    }

    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      showToast('CNPJ inválido. Formato: 00.000.000/0000-00', 'error');
      return;
    }

    if (!validatePhone(formData.phone)) {
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
      const response = await fetch(`${API_ENDPOINTS.clinicas}/${selectedClinica.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: formData.name,
          cnpj: formData.cnpj ? removeNonNumeric(formData.cnpj) : null,
          endereco: formData.address,
          cidade: formData.city,
          estado: formData.state,
          cep: removeNonNumeric(formData.cep),
          telefone: removeNonNumeric(formData.phone),
          email: formData.email || null,
          observacoes: formData.observacoes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Erro ao atualizar clínica', 'error');
        setIsSaving(false);
        return;
      }

      showToast('Clínica atualizada com sucesso!', 'success');
      setIsEditModalOpen(false);
      setSelectedClinica(null);

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

      // Reload clinics
      loadClinicas();
    } catch (err) {
      console.error('Erro ao atualizar clínica:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (clinica: Clinica) => {
    setSelectedClinica(clinica);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedClinica) return;

    setIsSaving(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.clinicas}/${selectedClinica.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        showToast(data.message || 'Erro ao excluir clínica', 'error');
        setIsSaving(false);
        return;
      }

      showToast('Clínica excluída com sucesso!', 'success');
      setIsDeleteModalOpen(false);
      setSelectedClinica(null);

      // Reload clinics
      loadClinicas();
    } catch (err) {
      console.error('Erro ao excluir clínica:', err);
      showToast('Erro ao conectar com o servidor', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastComponent />

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

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando clínicas...</p>
        </div>
      ) : clinicas.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma clínica cadastrada</h3>
            <p className="text-gray-600 mb-4">Comece cadastrando sua primeira clínica</p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Cadastrar Clínica
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Clinics Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicas.map((clinica) => (
            <Card key={clinica.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{clinica.nome}</CardTitle>
                      {clinica.cnpj && <p className="text-xs text-gray-500">{clinica.cnpj}</p>}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">{clinica.endereco} - {clinica.cidade}/{clinica.estado}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-sm text-gray-600">{clinica.telefone}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(clinica)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteClick(clinica)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
              placeholder="(85) 0000-0000"
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
              placeholder="Fortaleza"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="state"
              label="Estado"
              placeholder="CE"
              value={formData.state}
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
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1" isLoading={isSaving}>
              {isSaving ? 'Cadastrando...' : 'Cadastrar Clínica'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedClinica(null);
        }}
        title="Editar Clínica"
        size="lg"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
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
              placeholder="(85) 0000-0000"
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
              placeholder="Fortaleza"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="state"
              label="Estado"
              placeholder="CE"
              value={formData.state}
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
              placeholder="Informações adicionais sobre a clínica..."
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
                setSelectedClinica(null);
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
          setSelectedClinica(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Tem certeza que deseja excluir a clínica <strong>{selectedClinica?.nome}</strong>?
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedClinica(null);
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

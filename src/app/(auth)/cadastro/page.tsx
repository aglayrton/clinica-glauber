'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, useToast } from '@/components/ui';
import { phoneMask, croMask, removeNonNumeric } from '@/lib/masks';
import { API_ENDPOINTS } from '@/lib/api';

export default function CadastroPage() {
  const router = useRouter();
  const { showToast, ToastComponent } = useToast();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cro: '',
    password: '',
    confirmPassword: '',
    aceitaTermos: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validações
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!formData.aceitaTermos) {
      newErrors.aceitaTermos = 'Você deve aceitar os termos de uso';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Fazer requisição para a API
      const response = await fetch(API_ENDPOINTS.auth.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          password: formData.password,
          telefone: formData.telefone ? removeNonNumeric(formData.telefone) : '',
          cro: formData.cro,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Erro da API
        if (response.status === 409) {
          setErrors({ email: 'Este e-mail já está cadastrado' });
          showToast('E-mail já cadastrado. Tente fazer login.', 'error');
        } else {
          showToast(data.message || 'Erro ao criar conta. Tente novamente.', 'error');
        }
        setIsLoading(false);
        return;
      }

      // Sucesso!
      showToast('✅ Conta criada com sucesso! Redirecionando para o login...', 'success');

      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cro: '',
        password: '',
        confirmPassword: '',
        aceitaTermos: false,
      });

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      showToast('Erro ao conectar com o servidor. Verifique sua conexão.', 'error');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let maskedValue = value;

    // Aplicar máscaras baseado no campo
    if (type !== 'checkbox') {
      switch (name) {
        case 'telefone':
          maskedValue = phoneMask(value);
          break;
        case 'cro':
          maskedValue = croMask(value);
          break;
        default:
          maskedValue = value;
      }
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : maskedValue,
    });
    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <>
      {ToastComponent}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100 px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
            <p className="text-gray-600 mt-2">Cadastre-se e comece a gerenciar sua clínica</p>
          </div>

          {/* Card de Cadastro */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Dentista</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para criar sua conta
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="nome"
                    label="Nome Completo"
                    placeholder="Dr. João Silva"
                    value={formData.nome}
                    onChange={handleChange}
                    error={errors.nome}
                    required
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  />

                  <Input
                    type="text"
                    name="cro"
                    label="CRO"
                    placeholder="CRO/CE/12345"
                    value={formData.cro}
                    onChange={handleChange}
                    error={errors.cro}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    name="email"
                    label="E-mail"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    }
                  />

                  <Input
                    type="tel"
                    name="telefone"
                    label="Telefone"
                    placeholder="(85) 99213-1997"
                    value={formData.telefone}
                    onChange={handleChange}
                    error={errors.telefone}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="password"
                    name="password"
                    label="Senha"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    }
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    label="Confirmar Senha"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="aceitaTermos"
                      checked={formData.aceitaTermos}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">
                      Eu concordo com os{' '}
                      <Link href="/termos" className="text-primary-600 hover:text-primary-700 font-medium">
                        Termos de Uso
                      </Link>{' '}
                      e{' '}
                      <Link href="/privacidade" className="text-primary-600 hover:text-primary-700 font-medium">
                        Política de Privacidade
                      </Link>
                    </span>
                  </label>
                  {errors.aceitaTermos && (
                    <p className="mt-1 text-sm text-red-600">{errors.aceitaTermos}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link
                    href="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Fazer login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2025 Sistema Odontológico. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </>
  );
}

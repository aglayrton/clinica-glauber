'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/pacientes/StepIndicator';
import { InformacaoBasica } from '@/components/pacientes/InformacaoBasica';
import { FotografiasEFicheiros } from '@/components/pacientes/FotografiasEFicheiros';
import { Prescricao } from '@/components/pacientes/Prescricao';
import { PreVisualizarSubmeter } from '@/components/pacientes/PreVisualizarSubmeter';
import { Button } from '@/components/ui';

const steps = [
  { number: 1, title: 'Escolher Produto', description: 'Pro' },
  { number: 2, title: 'Informação básica', description: 'Dados do paciente' },
  { number: 3, title: 'Fotografias e ficheiros', description: 'Upload de imagens' },
  { number: 4, title: 'Prescrição', description: 'Detalhes do tratamento' },
  { number: 5, title: 'Pré-visualizar', description: 'Revisar e submeter' },
];

export default function NovoPacientePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2); // Começamos no passo 2 (Informação básica)
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // Validação dos campos obrigatórios
    if (!formData.nome || !formData.genero || !formData.dataNascimento || !formData.pagoPor) {
      alert('Por favor, preencha todos os campos obrigatórios da Informação Básica');
      setCurrentStep(2);
      return;
    }

    // Aqui você pode adicionar a lógica para salvar os dados
    console.log('Dados do paciente:', formData);
    alert('Paciente cadastrado com sucesso!');
    router.push('/dashboard/pacientes');
  };

  const handleSaveDraft = () => {
    console.log('Salvando rascunho:', formData);
    alert('Rascunho salvo com sucesso!');
  };

  const canProceed = () => {
    if (currentStep === 2) {
      return formData.nome && formData.genero && formData.dataNascimento && formData.pagoPor;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/pacientes')}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Novo Paciente</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.nome || 'Vazio'} #{formData.id || '227Y67'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Pro
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="mt-8">
          {currentStep === 2 && (
            <InformacaoBasica formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <FotografiasEFicheiros formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Prescricao formData={formData} onChange={handleChange} />
          )}
          {currentStep === 5 && (
            <PreVisualizarSubmeter formData={formData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex gap-3">
            {currentStep > 2 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="px-6"
              >
                Voltar
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="px-6"
            >
              Guardar rascunho
            </Button>

            {currentStep < 5 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6"
              >
                Próximo
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!formData.nome || !formData.genero || !formData.dataNascimento || !formData.pagoPor}
                className="px-8"
              >
                Submeter
              </Button>
            )}
          </div>
        </div>

        {/* Preferências clínicas */}
        <div className="mt-6">
          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Preferências clínicas
          </button>
        </div>
      </div>
    </div>
  );
}

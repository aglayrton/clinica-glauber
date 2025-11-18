'use client';

import { Input } from '@/components/ui';

interface InformacaoBasicaProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const diagnosticos = [
  'Protrusão', 'Apinhamento', 'Espaço', 'Mordida Profunda',
  'Overjet Aumentado', 'Mordida Cruzada Anterior', 'Mordida cruzada posterior',
  'Mordida em Tesoura Posterior', 'Mordida Aberta', 'Prognatismo Maxilar',
  'Retrognatismo Maxilar', 'Prognatismo mandibular', 'Retrognatismo mandibular',
  'Classe I', 'Classe II Divisão 1', 'Classe II Divisão 2', 'Classe III'
];

export function InformacaoBasica({ formData, onChange }: InformacaoBasicaProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Informação básica
        </h2>

        <div className="space-y-4">
          <Input
            type="text"
            label="Nome do paciente"
            placeholder="Por favor adicione o nome do paciente"
            value={formData.nome || ''}
            onChange={(e) => onChange('nome', e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gênero <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onChange('genero', 'Masculino')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.genero === 'Masculino'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Masculino
              </button>
              <button
                type="button"
                onClick={() => onChange('genero', 'Feminino')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.genero === 'Feminino'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Feminino
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultório <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.consultorio || ''}
              onChange={(e) => onChange('consultorio', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">ODONTOLOGIA INTEGRADA DR. GLAUBER MEIRA LIMA</option>
              <option value="Clínica Central">Clínica Central</option>
              <option value="Clínica Norte">Clínica Norte</option>
              <option value="Clínica Sul">Clínica Sul</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pago por <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.pagoPor || ''}
              onChange={(e) => onChange('pagoPor', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Por favor selecione</option>
              <option value="Paciente">Paciente</option>
              <option value="Convênio">Convênio</option>
              <option value="Particular">Particular</option>
            </select>
          </div>

          <Input
            type="date"
            label="Data de nascimento"
            value={formData.dataNascimento || ''}
            onChange={(e) => onChange('dataNascimento', e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnóstico
            </label>
            <div className="flex flex-wrap gap-2">
              {diagnosticos.map((diag) => (
                <button
                  key={diag}
                  type="button"
                  onClick={() => {
                    const current = formData.diagnosticos || [];
                    const updated = current.includes(diag)
                      ? current.filter((d: string) => d !== diag)
                      : [...current, diag];
                    onChange('diagnosticos', updated);
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    (formData.diagnosticos || []).includes(diag)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {diag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

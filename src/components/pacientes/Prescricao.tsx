'use client';

import { useState } from 'react';

interface PrescricaoProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function Prescricao({ formData, onChange }: PrescricaoProps) {
  const [showCorrecaoEspacosMaxilar, setShowCorrecaoEspacosMaxilar] = useState(false);
  const [showCorrecaoEspacosMandibular, setShowCorrecaoEspacosMandibular] = useState(false);
  const [showOverjetOptions, setShowOverjetOptions] = useState(false);
  const [showOverbiteOptions, setShowOverbiteOptions] = useState(false);
  const [showOverbiteSubOptions, setShowOverbiteSubOptions] = useState(false);
  const [showRelacaoSagitalDireitaOptions, setShowRelacaoSagitalDireitaOptions] = useState(false);
  const [showRelacaoSagitalEsquerdaOptions, setShowRelacaoSagitalEsquerdaOptions] = useState(false);
  const [showRelacaoSagitalMetodo, setShowRelacaoSagitalMetodo] = useState(false);

  const toggleMultipleSelection = (field: string, value: string) => {
    const current = formData[field] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    onChange(field, updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Prescrição
        </h2>

        <div className="space-y-6">
          {/* Correção de Espaços - Maxilar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correção de Espaços - Maxilar
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowCorrecaoEspacosMaxilar(!showCorrecaoEspacosMaxilar);
                  if (!showCorrecaoEspacosMaxilar) onChange('correcaoEspacosMaxilar', null);
                }}
                className="w-full px-4 py-3 text-left rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all flex items-center justify-between"
              >
                <span>{formData.correcaoEspacosMaxilar || 'Selecionar opção'}</span>
                <svg className={`w-5 h-5 transition-transform ${showCorrecaoEspacosMaxilar ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCorrecaoEspacosMaxilar && (
                <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                  {['Retração dos Anteriores', 'Retrair Anteriores e Mesializar Posteriores', 'Mesializar Posteriores', 'Decidir mais tarde', 'Manter espaço'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange('correcaoEspacosMaxilar', opt);
                        setShowCorrecaoEspacosMaxilar(false);
                      }}
                      className={`w-full px-4 py-2 text-left rounded-lg border transition-all ${
                        formData.correcaoEspacosMaxilar === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Correção de Espaços - Mandibular */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correção de Espaços - Mandibular
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowCorrecaoEspacosMandibular(!showCorrecaoEspacosMandibular);
                  if (!showCorrecaoEspacosMandibular) onChange('correcaoEspacosMandibular', null);
                }}
                className="w-full px-4 py-3 text-left rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all flex items-center justify-between"
              >
                <span>{formData.correcaoEspacosMandibular || 'Selecionar opção'}</span>
                <svg className={`w-5 h-5 transition-transform ${showCorrecaoEspacosMandibular ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCorrecaoEspacosMandibular && (
                <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                  {['Retração dos Anteriores', 'Retrair Anteriores e Mesializar Posteriores', 'Mesializar Posteriores', 'Decidir mais tarde', 'Manter espaço'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange('correcaoEspacosMandibular', opt);
                        setShowCorrecaoEspacosMandibular(false);
                      }}
                      className={`w-full px-4 py-2 text-left rounded-lg border transition-all ${
                        formData.correcaoEspacosMandibular === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Overjet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overjet
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowOverjetOptions(!showOverjetOptions)}
                className="w-full px-4 py-3 text-left rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all flex items-center justify-between"
              >
                <span>{formData.overjet || 'Selecionar opção'}</span>
                <svg className={`w-5 h-5 transition-transform ${showOverjetOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showOverjetOptions && (
                <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                  {['Manter', 'Melhorar', 'Decidir mais tarde'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange('overjet', opt);
                        setShowOverjetOptions(false);
                      }}
                      className={`w-full px-4 py-2 text-left rounded-lg border transition-all ${
                        formData.overjet === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Overbite */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overbite
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowOverbiteOptions(!showOverbiteOptions)}
                className="w-full px-4 py-3 text-left rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all flex items-center justify-between"
              >
                <span>{formData.overbite || 'Selecionar opção'}</span>
                <svg className={`w-5 h-5 transition-transform ${showOverbiteOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showOverbiteOptions && (
                <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                  {['Manter', 'Corrigir mordida aberta', 'Corrigir mordida profunda', 'Decidir mais tarde'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange('overbite', opt);
                        setShowOverbiteOptions(false);
                        if (opt === 'Corrigir mordida aberta') {
                          setShowOverbiteSubOptions(true);
                        } else {
                          setShowOverbiteSubOptions(false);
                        }
                      }}
                      className={`w-full px-4 py-2 text-left rounded-lg border transition-all ${
                        formData.overbite === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Sub-opções para Corrigir mordida aberta */}
              {showOverbiteSubOptions && formData.overbite === 'Corrigir mordida aberta' && (
                <div className="ml-8 mt-2 space-y-2 border-l-2 border-green-200 pl-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Método:</p>
                  {[
                    'Extruir Anteriores',
                    'Intruir Posteriores (micro-implantes podem ser necessários)',
                    'Extruir Anteriores e Intruir Posteriores (micro-implantes podem ser necessários)',
                    'Outros'
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange('overbiteMetodo', opt)}
                      className={`w-full px-4 py-2 text-sm text-left rounded-lg border transition-all ${
                        formData.overbiteMetodo === opt
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Relação Sagital */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Relação Sagital <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direita */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Direita</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowRelacaoSagitalDireitaOptions(!showRelacaoSagitalDireitaOptions)}
                    className="w-full px-4 py-3 text-left rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all flex items-center justify-between"
                  >
                    <span className="text-sm">{formData.relacaoSagitalDireita || 'Selecionar opção'}</span>
                    <svg className={`w-5 h-5 transition-transform ${showRelacaoSagitalDireitaOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showRelacaoSagitalDireitaOptions && (
                    <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                      {['Manter', 'Melhorar apenas a Relação Canina', 'Melhorar a Relação Canina e Molar', 'Corrigir para Classe I'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            onChange('relacaoSagitalDireita', opt);
                            setShowRelacaoSagitalDireitaOptions(false);
                            if (opt === 'Melhorar apenas a Relação Canina') {
                              setShowRelacaoSagitalMetodo(true);
                            } else {
                              setShowRelacaoSagitalMetodo(false);
                            }
                          }}
                          className={`w-full px-3 py-2 text-sm text-left rounded-lg border transition-all ${
                            formData.relacaoSagitalDireita === opt
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Método para Melhorar apenas a Relação Canina */}
                  {showRelacaoSagitalMetodo && formData.relacaoSagitalDireita === 'Melhorar apenas a Relação Canina' && (
                    <div className="ml-8 mt-2 space-y-2 border-l-2 border-green-200 pl-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Método:</p>
                      {[
                        'IPR',
                        'Distalização Molar (serão necessários elásticos intermaxilares/intramaxilares)',
                        'Salto de mordida',
                        'Extração'
                      ].map((opt) => (
                        <div key={opt}>
                          <button
                            type="button"
                            onClick={() => onChange('relacaoSagitalMetodo', opt)}
                            className={`w-full px-3 py-2 text-xs text-left rounded-lg border transition-all ${
                              formData.relacaoSagitalMetodo === opt
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                            }`}
                          >
                            {opt}
                          </button>
                          {/* Nota explicativa para Distalização Molar */}
                          {opt === 'Distalização Molar (serão necessários elásticos intermaxilares/intramaxilares)' && formData.relacaoSagitalMetodo === opt && (
                            <p className="mt-1 ml-2 text-xs text-gray-500 italic">
                              A escolha da distalização molar aqui requer escolha da distalização molar também na parte "Correção de apinhamento".
                            </p>
                          )}
                          {/* Nota para Extração */}
                          {opt === 'Extração' && formData.relacaoSagitalMetodo === opt && (
                            <p className="mt-1 ml-2 text-xs text-gray-500 italic">
                              Escolher extração aqui requer que se escolha também a extração na parte "Correção de apinhamento".
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Esquerda */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Esquerda</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowRelacaoSagitalEsquerdaOptions(!showRelacaoSagitalEsquerdaOptions)}
                    className="w-full px-4 py-3 text-left rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all flex items-center justify-between"
                  >
                    <span className="text-sm">{formData.relacaoSagitalEsquerda || 'Selecionar opção'}</span>
                    <svg className={`w-5 h-5 transition-transform ${showRelacaoSagitalEsquerdaOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showRelacaoSagitalEsquerdaOptions && (
                    <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                      {['Manter', 'Melhorar apenas a Relação Canina', 'Melhorar a Relação Canina e Molar', 'Corrigir para Classe I'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            onChange('relacaoSagitalEsquerda', opt);
                            setShowRelacaoSagitalEsquerdaOptions(false);
                          }}
                          className={`w-full px-3 py-2 text-sm text-left rounded-lg border transition-all ${
                            formData.relacaoSagitalEsquerda === opt
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Arcada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arcada <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Em função da organização interna de arcadas do acordado lar necessário para a tratamento de uma única arcada
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onChange('arcada', 'Dupla')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.arcada === 'Dupla'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Dupla
              </button>
              <button
                type="button"
                onClick={() => onChange('arcada', 'Maxilar')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.arcada === 'Maxilar'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Maxilar
              </button>
              <button
                type="button"
                onClick={() => onChange('arcada', 'Mandibular')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.arcada === 'Mandibular'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Mandibular
              </button>
            </div>
          </div>

          {/* Instruções clínicas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruções clínicas
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Por favor, use regras ou dígitos nesta caixa para uma melhor comunicação e objetivo.
            </p>
            <textarea
              value={formData.instrucoesClinicas || ''}
              onChange={(e) => onChange('instrucoesClinicas', e.target.value)}
              rows={4}
              placeholder="Digite suas instruções aqui..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

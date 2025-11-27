'use client';

interface PrescricaoProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function Prescricao({ formData, onChange }: PrescricaoProps) {
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

          {/* Dentes Iniciais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dentes Iniciais
            </label>
            <p className="text-xs text-gray-500 mb-3">Por exemplo, protrusão, coroa, ponte, etc.</p>
            <input
              type="text"
              placeholder="Nenhum"
              value={formData.dentesIniciais || ''}
              onChange={(e) => onChange('dentesIniciais', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Relação Sagital */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relação Sagital <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Direita</p>
                <div className="flex gap-2 flex-wrap">
                  {['Manter', 'Melhorar apenas a Relação Canina', 'Melhorar a Relação Canina e Molar', 'Corrigir para a Classe I'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange('relacaoSagitalDireita', opt)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        formData.relacaoSagitalDireita === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Esquerda</p>
                <div className="flex gap-2 flex-wrap">
                  {['Manter', 'Melhorar apenas a Relação Canina', 'Melhorar a Relação Canina e Molar', 'Corrigir para a Classe I'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange('relacaoSagitalEsquerda', opt)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        formData.relacaoSagitalEsquerda === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Linha média */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Linha média <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Maxilar</p>
                <div className="flex gap-2">
                  {['Manter', 'Dedicar para a direita', 'Dedicar para a esquerda'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange('linhaMediaMaxilar', opt)}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                        formData.linhaMediaMaxilar === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Mandibular</p>
                <div className="flex gap-2">
                  {['Manter', 'Dedicar para a direita', 'Dedicar para a esquerda'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange('linhaMediaMandibular', opt)}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                        formData.linhaMediaMandibular === opt
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <label className="flex items-center mt-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.tomarMandibulaPrincipal || false}
                    onChange={(e) => onChange('tomarMandibulaPrincipal', e.target.checked)}
                    className="mr-2"
                  />
                  Tomar a Mandíbula como Referência
                </label>
              </div>
            </div>
          </div>

          {/* Correção de Apinhamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correção de Apinhamento
            </label>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Maxilar</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange('correcaoApinhamentoMaxilar', 'Primeira Opção')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.correcaoApinhamentoMaxilar === 'Primeira Opção'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Primeira Opção
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('correcaoApinhamentoMaxilar', 'Opcional')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.correcaoApinhamentoMaxilar === 'Opcional'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Opcional
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('correcaoApinhamentoMaxilar', 'NA')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.correcaoApinhamentoMaxilar === 'NA'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    NA
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Mandibular</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange('correcaoApinhamentoMandibular', 'Primeira Opção')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.correcaoApinhamentoMandibular === 'Primeira Opção'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Primeira Opção
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('correcaoApinhamentoMandibular', 'Opcional')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.correcaoApinhamentoMandibular === 'Opcional'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Opcional
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('correcaoApinhamentoMandibular', 'NA')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.correcaoApinhamentoMandibular === 'NA'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    NA
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Extração */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extração
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onChange('extracao', 'Não extração')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.extracao === 'Não extração'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Não extração
              </button>
              <button
                type="button"
                onClick={() => onChange('extracao', 'Extra dentes')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.extracao === 'Extra dentes'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Extra dentes
              </button>
            </div>
            {formData.extracao === 'Extra dentes' && (
              <input
                type="text"
                placeholder="Decide mais tarde"
                value={formData.extracaoDetalhes || ''}
                onChange={(e) => onChange('extracaoDetalhes', e.target.value)}
                className="w-full mt-3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>

          {/* Micro implantes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Precisa que os micro implantes sejam incorporados ao seu plano de tratamento?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onChange('microImplantes', 'Sim')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.microImplantes === 'Sim'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => onChange('microImplantes', 'Não')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.microImplantes === 'Não'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Não
              </button>
              <button
                type="button"
                onClick={() => onChange('microImplantes', 'Não estou certo')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.microImplantes === 'Não estou certo'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Não estou certo
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
              Por FAVOR clique aqui.
            </p>
            <textarea
              value={formData.instrucoesClinicas || ''}
              onChange={(e) => onChange('instrucoesClinicas', e.target.value)}
              rows={4}
              placeholder="Manter espaço"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

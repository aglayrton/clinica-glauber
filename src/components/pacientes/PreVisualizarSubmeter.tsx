'use client';

interface PreVisualizarSubmeterProps {
  formData: any;
}

export function PreVisualizarSubmeter({ formData }: PreVisualizarSubmeterProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pré-visualizar e Submeter
        </h2>

        {(!formData.nome || !formData.genero || !formData.dataNascimento || !formData.pagoPor) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Falta aqui informação chave. Por favor, adicione e depois submeta.</span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Informação básica */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-lg mb-4">Informação básica</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nome do paciente</p>
                <p className={`font-medium ${!formData.nome ? 'text-red-500' : ''}`}>
                  {formData.nome || 'Não informado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gênero</p>
                <p className={`font-medium ${!formData.genero ? 'text-red-500' : ''}`}>
                  {formData.genero || 'Não informado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pago por</p>
                <p className={`font-medium ${!formData.pagoPor ? 'text-red-500' : ''}`}>
                  {formData.pagoPor || 'Não informado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data de nascimento</p>
                <p className={`font-medium ${!formData.dataNascimento ? 'text-red-500' : ''}`}>
                  {formData.dataNascimento ? new Date(formData.dataNascimento).toLocaleDateString('pt-BR') : 'Não informado'}
                </p>
              </div>
            </div>
            {formData.diagnosticos && formData.diagnosticos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Diagnósticos</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.diagnosticos.map((diag: string) => (
                    <span key={diag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {diag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prescrição */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg mb-4">Prescrição</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.arcada && (
                <div>
                  <p className="text-sm text-gray-600">Arcada</p>
                  <p className="font-medium">{formData.arcada}</p>
                </div>
              )}
              {formData.relacaoSagitalDireita && (
                <div>
                  <p className="text-sm text-gray-600">Relação Sagital - Direita</p>
                  <p className="font-medium">{formData.relacaoSagitalDireita}</p>
                </div>
              )}
              {formData.relacaoSagitalEsquerda && (
                <div>
                  <p className="text-sm text-gray-600">Relação Sagital - Esquerda</p>
                  <p className="font-medium">{formData.relacaoSagitalEsquerda}</p>
                </div>
              )}
              {formData.linhaMediaMaxilar && (
                <div>
                  <p className="text-sm text-gray-600">Linha média - Maxilar</p>
                  <p className="font-medium">{formData.linhaMediaMaxilar}</p>
                </div>
              )}
              {formData.linhaMediaMandibular && (
                <div>
                  <p className="text-sm text-gray-600">Linha média - Mandibular</p>
                  <p className="font-medium">{formData.linhaMediaMandibular}</p>
                </div>
              )}
              {formData.extracao && (
                <div>
                  <p className="text-sm text-gray-600">Extração</p>
                  <p className="font-medium">{formData.extracao}</p>
                </div>
              )}
              {formData.microImplantes && (
                <div>
                  <p className="text-sm text-gray-600">Micro implantes</p>
                  <p className="font-medium">{formData.microImplantes}</p>
                </div>
              )}
            </div>
            {formData.instrucoesClinicas && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Instruções clínicas</p>
                <p className="font-medium whitespace-pre-wrap">{formData.instrucoesClinicas}</p>
              </div>
            )}
          </div>

          {/* Fotografias e ficheiros */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-lg mb-4">Fotografias e ficheiros Digitalização intraoral</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['perfil', 'frontal', 'sorriso', 'arcoSuperior', 'arcoInferior', 'vistaDireita', 'vistaAnterior', 'vistaEsquerda'].map((foto) => (
                formData[`foto_${foto}`] && (
                  <div key={foto}>
                    <p className="text-sm text-gray-600 capitalize">{foto.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-green-600 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Arquivo enviado
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Modelo Dentário */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold text-lg mb-2">Modelo Dentário</h3>
            <p className="text-sm text-gray-600">Ficheiro Digitalização intraoral</p>
          </div>
        </div>
      </div>
    </div>
  );
}

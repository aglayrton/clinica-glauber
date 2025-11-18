'use client';

import { useState } from 'react';

interface FotografiasEFicheirosProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const fotografias = [
  { id: 'perfil', label: 'Perfil', icon: '👤' },
  { id: 'frontal', label: 'Frontal', icon: '😀' },
  { id: 'sorriso', label: 'Sorriso', icon: '😊' },
  { id: 'arcoSuperior', label: 'Arco Superior', icon: '🦷' },
  { id: 'arcoInferior', label: 'Arco inferior', icon: '🦷' },
  { id: 'vistaDireita', label: 'Vista Direita', icon: '😬' },
  { id: 'vistaAnterior', label: 'Vista Anterior', icon: '😬' },
  { id: 'vistaEsquerda', label: 'Vista Esquerda', icon: '😬' },
];

const radiografias = [
  { id: 'panoramica', label: 'Radiografia Panorâmica', icon: '📷' },
  { id: 'telerradiografia', label: 'Telerradiografia de Perfil', icon: '📷' },
];

export function FotografiasEFicheiros({ formData, onChange }: FotografiasEFicheirosProps) {
  const [activeTab, setActiveTab] = useState<'composicao' | 'individuais'>('individuais');

  const handleFileUpload = (field: string, file: File | File[] | null) => {
    onChange(field, file);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Fotografias e ficheiros Digitalização intraoral
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Fotografias Faciais e Intraorais <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-4 border-b">
            <button
              type="button"
              onClick={() => setActiveTab('composicao')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'composicao'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Composição
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('individuais')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'individuais'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Fotografias Individuais
            </button>
          </div>

          {activeTab === 'individuais' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fotografias.map((foto) => (
                <div key={foto.id} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <div className="text-4xl mb-2">{foto.icon}</div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {foto.label} <span className="text-red-500">*</span>
                  </p>
                  <label className="cursor-pointer">
                    <span className="text-blue-500 text-sm hover:text-blue-600 flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Clique/ Arraste foto
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(`foto_${foto.id}`, e.target.files?.[0] || null)}
                    />
                  </label>
                  {formData[`foto_${foto.id}`] && (
                    <p className="text-xs text-green-600 mt-2">✓ Arquivo carregado</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Radiografias
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {radiografias.map((radio) => (
              <div key={radio.id} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <div className="text-4xl mb-2">{radio.icon}</div>
                <p className="text-sm font-medium text-gray-700 mb-2">{radio.label}</p>
                <label className="cursor-pointer">
                  <span className="text-blue-500 text-sm hover:text-blue-600 flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Clique/ Arraste foto
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(`radio_${radio.id}`, e.target.files?.[0] || null)}
                  />
                </label>
                {formData[`radio_${radio.id}`] && (
                  <p className="text-xs text-green-600 mt-2">✓ Arquivo carregado</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Outras fotos
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <label className="cursor-pointer">
              <span className="text-blue-500 hover:text-blue-600 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Selecione e arraste as fotografias aqui
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload('outras_fotos', e.target.files ? Array.from(e.target.files) : null)}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Modelo Dentário</strong> - Ficheiro Digitalização intraoral
          </p>
          <div className="mt-2 flex gap-2">
            <button className="text-sm text-blue-600 hover:text-blue-700">Carregar</button>
            <button className="text-sm text-blue-600 hover:text-blue-700">3shape</button>
            <button className="text-sm text-blue-600 hover:text-blue-700">Mais Fontes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

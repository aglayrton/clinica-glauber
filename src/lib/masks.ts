// Funções de máscara para inputs

/**
 * Remove todos os caracteres não numéricos
 */
export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Aplica máscara de CPF: 000.000.000-00
 */
export const cpfMask = (value: string): string => {
  const numeric = removeNonNumeric(value);

  if (numeric.length <= 3) return numeric;
  if (numeric.length <= 6) return `${numeric.slice(0, 3)}.${numeric.slice(3)}`;
  if (numeric.length <= 9) return `${numeric.slice(0, 3)}.${numeric.slice(3, 6)}.${numeric.slice(6)}`;
  return `${numeric.slice(0, 3)}.${numeric.slice(3, 6)}.${numeric.slice(6, 9)}-${numeric.slice(9, 11)}`;
};

/**
 * Aplica máscara de CNPJ: 00.000.000/0000-00
 */
export const cnpjMask = (value: string): string => {
  const numeric = removeNonNumeric(value);

  if (numeric.length <= 2) return numeric;
  if (numeric.length <= 5) return `${numeric.slice(0, 2)}.${numeric.slice(2)}`;
  if (numeric.length <= 8) return `${numeric.slice(0, 2)}.${numeric.slice(2, 5)}.${numeric.slice(5)}`;
  if (numeric.length <= 12) return `${numeric.slice(0, 2)}.${numeric.slice(2, 5)}.${numeric.slice(5, 8)}/${numeric.slice(8)}`;
  return `${numeric.slice(0, 2)}.${numeric.slice(2, 5)}.${numeric.slice(5, 8)}/${numeric.slice(8, 12)}-${numeric.slice(12, 14)}`;
};

/**
 * Aplica máscara de telefone: (00) 0000-0000 ou (00) 00000-0000
 */
export const phoneMask = (value: string): string => {
  const numeric = removeNonNumeric(value);

  if (numeric.length <= 2) return numeric.length === 0 ? '' : `(${numeric}`;
  if (numeric.length <= 6) return `(${numeric.slice(0, 2)}) ${numeric.slice(2)}`;
  if (numeric.length <= 10) return `(${numeric.slice(0, 2)}) ${numeric.slice(2, 6)}-${numeric.slice(6)}`;
  return `(${numeric.slice(0, 2)}) ${numeric.slice(2, 7)}-${numeric.slice(7, 11)}`;
};

/**
 * Aplica máscara de CEP: 00000-000
 */
export const cepMask = (value: string): string => {
  const numeric = removeNonNumeric(value);

  if (numeric.length <= 5) return numeric;
  return `${numeric.slice(0, 5)}-${numeric.slice(5, 8)}`;
};

/**
 * Aplica máscara de CRO (apenas números)
 */
export const croMask = (value: string): string => {
  return removeNonNumeric(value);
};

/**
 * Formata valor em reais: R$ 1.234,56
 */
export const currencyMask = (value: string): string => {
  const numeric = removeNonNumeric(value);

  if (numeric.length === 0) return '';

  const numberValue = parseInt(numeric, 10) / 100;
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

/**
 * Remove a máscara de qualquer valor, deixando apenas números
 */
export const unmask = (value: string): string => {
  return removeNonNumeric(value);
};

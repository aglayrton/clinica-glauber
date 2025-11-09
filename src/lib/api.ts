/**
 * Configuração da API
 *
 * Este arquivo centraliza a configuração da URL base da API
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    logout: `${API_URL}/api/auth/logout`,
    validate: `${API_URL}/api/auth/validate`,
    me: `${API_URL}/api/auth/me`,
    register: `${API_URL}/api/users`,
  },
  users: {
    base: `${API_URL}/api/users`,
    me: `${API_URL}/api/users/me`,
  },
  clinicas: `${API_URL}/api/clinicas`,
  pacientes: `${API_URL}/api/pacientes`,
};

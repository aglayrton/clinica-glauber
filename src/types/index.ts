// Tipos de Usuário
export enum UserRole {
  ADMIN = 'admin',
  DENTIST = 'dentist',
  CONSULTANT = 'consultant',
}

// Status dos Setups
export enum SetupStatus {
  IN_DEVELOPMENT = 'in_development',
  SENT = 'sent',
  IN_ANALYSIS = 'in_analysis',
  APPROVED = 'approved',
}

// Status de Pagamento
export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

// Tipo de Pagamento
export enum PaymentType {
  PIX = 'pix',
  CARD = 'card',
}

// Interface do Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  cpf?: string;
  cnpj?: string;
  cro?: string;
  photo?: string;
  active: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  emailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface de Clínica
export interface Clinic {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  dentistId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface de Paciente
export interface Patient {
  id: string;
  name: string;
  cpf: string;
  dateOfBirth: Date;
  phone: string;
  email?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  clinicId: string;
  dentistId: string;
  observations?: string;
  photos?: string[];
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface de Setup Odontológico
export interface Setup {
  id: string;
  patientId: string;
  dentistId: string;
  consultantId?: string;
  status: SetupStatus;
  description: string;
  images?: string[];
  feedback?: string;
  feedbackImages?: string[];
  feedbackConfirmed: boolean;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  analysisStartedAt?: Date;
  approvedAt?: Date;
}

// Interface de Pagamento
export interface Payment {
  id: string;
  setupId: string;
  dentistId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  paidAt?: Date;
  cancelledAt?: Date;
}

// Interface de Notificação
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: Date;
  readAt?: Date;
}

// Interface de Configurações do Sistema
export interface SystemConfig {
  termsOfUse: string;
  privacyPolicy: string;
  supportWhatsApp: string;
  supportPhone: string;
  supportEmail: string;
  updatedAt: Date;
  updatedBy: string;
}

// Interface de Log de Auditoria
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// Interface de Estatísticas para Administrador
export interface AdminStats {
  totalUsers: number;
  totalDentists: number;
  totalConsultants: number;
  totalClinics: number;
  totalPatients: number;
  totalSetups: number;
  setupsByStatus: Record<SetupStatus, number>;
  totalRevenue: number;
  monthlyRevenue: number;
  paymentsByType: Record<PaymentType, number>;
  recentActivity: AuditLog[];
}

// Interface de Estatísticas para Dentista
export interface DentistStats {
  totalClinics: number;
  totalPatients: number;
  totalSetups: number;
  setupsByStatus: Record<SetupStatus, number>;
  totalSpent: number;
  monthlySpent: number;
  recentSetups: Setup[];
}

// Interface de Estatísticas para Consultor
export interface ConsultantStats {
  totalSetupsReceived: number;
  setupsInAnalysis: number;
  setupsApproved: number;
  totalRevenue: number;
  monthlyRevenue: number;
  recentSetups: Setup[];
}

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}

/**
 * Error Response
 */
export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

/**
 * Auth Types
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: string;
}

/**
 * Appointment Types
 */
export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason?: string;
  notes?: string;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
}

/**
 * Doctor Types
 */
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  phone: string;
  email: string;
  availableSlots: string[];
  departmentId: string;
  fee: number;
}

/**
 * Medical Record Types
 */
export interface MedicalRecord {
  id: string;
  type: 'diagnosis' | 'prescription' | 'procedure' | 'lab_result' | 'vaccination';
  title: string;
  description: string;
  date: string;
  doctorId: string;
  status: 'active' | 'archived';
  fileUrl?: string;
}

/**
 * Lab Result Types
 */
export interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: 'normal' | 'abnormal' | 'pending';
  results: Array<{
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: 'normal' | 'low' | 'high';
  }>;
  pdfUrl?: string;
}

/**
 * Prescription Types
 */
export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  doctorId: string;
  prescribedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'discontinued';
  refillsRemaining: number;
  instructions?: string;
}

/**
 * Invoice Types
 */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate?: string;
  paymentDate?: string;
  pdfUrl?: string;
}

/**
 * Department Types
 */
export interface Department {
  id: string;
  name: string;
  description: string;
  established: number;
  doctors: number;
  beds: number;
  specialization: string;
  facilities: string[];
}

/**
 * Contact Form Types
 */
export interface ContactFormRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * API Endpoints Configuration
 * Defines all API endpoint paths and their operations
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/users/me',
  },

  // Doctors
  DOCTORS: {
    LIST: '/doctors',
    GET: (id: string) => `/doctors/${id}`,
    SCHEDULE: (id: string) => `/doctors/${id}/schedule`,
  },

  // Departments
  DEPARTMENTS: {
    LIST: '/departments',
    GET: (id: string) => `/departments/${id}`,
  },

  // Appointments
  APPOINTMENTS: {
    CREATE: '/appointments',
    LIST: '/appointments',
    GET: (id: string) => `/appointments/${id}`,
    UPDATE: (id: string) => `/appointments/${id}`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    AVAILABLE_SLOTS: '/appointments/available-slots',
  },

  // Patients
  PATIENTS: {
    GET_PROFILE: (id: string) => `/patients/${id}`,
    UPDATE_PROFILE: (id: string) => `/patients/${id}`,
    GET_APPOINTMENTS: (id: string) => `/patients/${id}/appointments`,
  },

  // Medical Records
  MEDICAL_RECORDS: {
    LIST: '/medical-records',
    GET: (id: string) => `/medical-records/${id}`,
  },

  // Lab Results
  LAB_RESULTS: {
    LIST: '/lab-results',
    GET: (id: string) => `/lab-results/${id}`,
    DOWNLOAD: (id: string) => `/lab-results/${id}/pdf`,
  },

  // Prescriptions
  PRESCRIPTIONS: {
    LIST: '/prescriptions',
    GET: (id: string) => `/prescriptions/${id}`,
    CREATE: '/prescriptions',
    REFILL: (id: string) => `/prescriptions/${id}/refill`,
  },

  // Billing & Payments
  INVOICES: {
    LIST: '/invoices',
    GET: (id: string) => `/invoices/${id}`,
    DOWNLOAD: (id: string) => `/invoices/${id}/pdf`,
  },

  PAYMENTS: {
    CREATE: '/payments',
    GET: (id: string) => `/payments/${id}`,
  },

  // Analytics
  ANALYTICS: {
    REVENUE: '/analytics/revenue',
    APPOINTMENTS: '/analytics/appointments',
    PATIENTS: '/analytics/patients',
  },

  // Reports
  REPORTS: {
    APPOINTMENTS: '/reports/appointments',
    MEDICAL_RECORDS: '/reports/medical-records',
  },
};

/**
 * API Request Helper
 * Build query parameters for filtering, pagination, sorting
 */
export interface QueryParams {
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

export const buildQueryString = (params: QueryParams): string => {
  const queryArray: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      queryArray.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  }

  return queryArray.length > 0 ? `?${queryArray.join('&')}` : '';
};

/**
 * Pagination helper
 */
export const getPaginationParams = (page: number, pageSize: number = 10) => {
  return {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };
};

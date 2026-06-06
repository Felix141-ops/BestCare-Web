import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { ApiResponse, ApiError } from '@/lib/types/api';

/**
 * API Client - Configured Axios instance
 */
class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'http://localhost:8000/api/v1';

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.loadTokens();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            if (newAccessToken) {
              this.accessToken = newAccessToken;
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        }

        return Promise.reject(this.parseError(error));
      }
    );
  }

  /**
   * Load tokens from localStorage
   */
  private loadTokens(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('auth_tokens');
    if (stored) {
      try {
        const { accessToken, refreshToken } = JSON.parse(stored);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
      } catch (e) {
        console.error('Failed to load tokens:', e);
      }
    }
  }

  /**
   * Save tokens to localStorage
   */
  private saveTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem(
      'auth_tokens',
      JSON.stringify({ accessToken, refreshToken })
    );
  }

  /**
   * Clear tokens from memory and storage
   */
  private clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_tokens');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) {
      return null;
    }

    try {
      const response = await this.client.post<ApiResponse<{ access_token: string }>>(
        '/auth/refresh',
        { refresh_token: this.refreshToken }
      );

      if (response.data.data?.access_token) {
        const newAccessToken = response.data.data.access_token;
        this.accessToken = newAccessToken;
        localStorage.setItem(
          'auth_tokens',
          JSON.stringify({
            accessToken: newAccessToken,
            refreshToken: this.refreshToken,
          })
        );
        return newAccessToken;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
    }

    return null;
  }

  /**
   * Parse API error response
   */
  private parseError(error: AxiosError): ApiError {
    const response = error.response?.data as ApiResponse | undefined;

    if (response?.error) {
      return {
        code: response.error.code,
        message: response.error.message,
        statusCode: error.response?.status || 500,
        details: (error.response?.data as any)?.details,
      };
    }

    return {
      code: `HTTP_${error.response?.status || 'ERROR'}`,
      message: error.message || 'An error occurred',
      statusCode: error.response?.status || 500,
    };
  }

  /**
   * Set authorization tokens (called after login)
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.saveTokens(accessToken, refreshToken);
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Logout - clear tokens
   */
  logout(): void {
    this.clearTokens();
  }

  /**
   * Generic GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data.data as T;
  }

  /**
   * Generic POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  /**
   * Generic PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  /**
   * Generic PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  /**
   * Generic DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data.data as T;
  }

  /**
   * Get raw axios instance (for custom requests)
   */
  getRawClient(): AxiosInstance {
    return this.client;
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { useAuthStore, useNotificationStore } from '@/store';
import {
  LoginFormData,
  RegisterFormData,
  AuthResponse,
  User,
} from '@/lib/types/api';

/**
 * useAuth Hook - Authentication hook for login/register/logout
 */
export const useAuth = () => {
  const router = useRouter();
  const { setUser, logout: storeLogout, checkAuth } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post<AuthResponse>(
          API_ENDPOINTS.AUTH.LOGIN,
          data
        );

        // Set tokens in API client
        apiClient.setTokens(response.access_token, response.refresh_token);

        // Update auth store
        setUser(response.user);

        addNotification({
          type: 'success',
          message: `Welcome back, ${response.user.firstName}!`,
          duration: 3000,
        });

        router.push('/dashboard');
      } catch (err: any) {
        const errorMessage = err.message || 'Login failed';
        setError(errorMessage);
        addNotification({
          type: 'error',
          message: errorMessage,
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, addNotification, router]
  );

  const register = useCallback(
    async (data: RegisterFormData) => {
      setIsLoading(true);
      setError(null);

      try {
        const { confirmPassword, agreeToTerms, ...registerData } = data;

        const response = await apiClient.post<AuthResponse>(
          API_ENDPOINTS.AUTH.REGISTER,
          registerData
        );

        // Set tokens in API client
        apiClient.setTokens(response.access_token, response.refresh_token);

        // Update auth store
        setUser(response.user);

        addNotification({
          type: 'success',
          message: 'Registration successful! Welcome to BestCare.',
          duration: 3000,
        });

        router.push('/dashboard');
      } catch (err: any) {
        const errorMessage = err.message || 'Registration failed';
        setError(errorMessage);
        addNotification({
          type: 'error',
          message: errorMessage,
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, addNotification, router]
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      storeLogout();
      router.push('/login');
      addNotification({
        type: 'success',
        message: 'You have been logged out',
        duration: 3000,
      });
    }
  }, [storeLogout, router, addNotification]);

  return {
    login,
    register,
    logout,
    isLoading,
    error,
    checkAuth,
  };
};

/**
 * useAPI Hook - Generic API call hook with loading/error handling
 */
export const useAPI = <T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  {
    autoFetch = false,
    dependencies = [],
  }: { autoFetch?: boolean; dependencies?: any[] } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (body?: any) => {
      setIsLoading(true);
      setError(null);

      try {
        let response: T;

        switch (method) {
          case 'GET':
            response = await apiClient.get<T>(url);
            break;
          case 'POST':
            response = await apiClient.post<T>(url, body);
            break;
          case 'PUT':
            response = await apiClient.put<T>(url, body);
            break;
          case 'DELETE':
            response = await apiClient.delete<T>(url);
            break;
          case 'PATCH':
            response = await apiClient.patch<T>(url, body);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(response);
        return response;
      } catch (err: any) {
        const errorMessage = err.message || 'Request failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  // Auto-fetch on mount if enabled
  if (autoFetch && data === null && !isLoading) {
    fetchData().catch(console.error);
  }

  return {
    data,
    isLoading,
    error,
    fetchData,
    setData,
  };
};

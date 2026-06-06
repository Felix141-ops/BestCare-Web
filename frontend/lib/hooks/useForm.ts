import { useState, useCallback } from 'react';
import { useNotificationStore } from '@/store';
import { validateFormData } from '@/lib/validation/schemas';
import { z } from 'zod';

/**
 * useForm Hook - Form handling with validation
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void> | void,
  validationSchema?: z.ZodSchema
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotificationStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Validate if schema provided
      if (validationSchema) {
        const { success, data, errors: validationErrors } = await validateFormData(
          validationSchema,
          values
        );

        if (!success || validationErrors) {
          setErrors(validationErrors || {});
          setTouched(
            Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
          );
          addNotification({
            type: 'error',
            message: 'Please check the form for errors',
            duration: 3000,
          });
          return;
        }
      }

      setIsSubmitting(true);

      try {
        await onSubmit(values);
        addNotification({
          type: 'success',
          message: 'Form submitted successfully',
          duration: 3000,
        });
      } catch (error: any) {
        const errorMessage = error.message || 'Form submission failed';
        addNotification({
          type: 'error',
          message: errorMessage,
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validationSchema, onSubmit, addNotification]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues,
    setErrors,
  };
};

/**
 * getFieldProps - Helper to get field props for input elements
 */
export const getFieldProps = (
  fieldName: string,
  formik: ReturnType<typeof useForm>
) => ({
  name: fieldName,
  value: formik.values[fieldName as keyof typeof formik.values] || '',
  onChange: formik.handleChange,
  onBlur: formik.handleBlur,
  error:
    formik.touched[fieldName] && formik.errors[fieldName]
      ? formik.errors[fieldName]
      : undefined,
});

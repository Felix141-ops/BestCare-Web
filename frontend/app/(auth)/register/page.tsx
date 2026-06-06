'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Alert } from '@/components/ui';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks';
import { registerSchema, type RegisterFormData } from '@/lib/validation/schemas';
import { useAuthStore } from '@/store';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { register, isLoading, error: authError } = useAuth();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    try {
      // Validate form data
      const validatedData = registerSchema.parse(formData);
      await register(validatedData);
    } catch (err: any) {
      if (err.errors) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error: any) => {
          const field = error.path[0];
          errors[field] = error.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <Link href="/" className="inline-flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-blue to-dark-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BC</span>
              </div>
            </Link>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join BestCare Hospital for seamless healthcare management
            </CardDescription>

            {/* Progress Indicator */}
            <div className="flex gap-2 mt-4">
              <div className="h-1 flex-1 rounded bg-medical-blue" />
              <div className="h-1 flex-1 rounded bg-medical-blue" />
            </div>
          </CardHeader>

          <CardContent>
            {authError && (
              <Alert variant="error" className="mb-6">
                {authError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-error">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-error">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                )}
              </div>

              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (234) 567-8900"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-error">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-error">{formErrors.password}</p>
                )}
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{formErrors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-medical-blue font-semibold hover:text-dark-blue">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Terms and Privacy */}
            <div className="mt-6 text-center text-xs text-gray-600">
              <p>
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-medical-blue hover:text-dark-blue">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-medical-blue hover:text-dark-blue">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

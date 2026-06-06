'use client';

import React, { useEffect } from 'react';
import NotificationsContainer from '@/components/NotificationsContainer';
import { useAuthStore } from '@/store';

/**
 * Root Layout Client Wrapper
 * Handles client-side initialization like auth checks and notifications
 */
export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth, isLoading } = useAuthStore();

  // Initialize authentication on app startup
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <NotificationsContainer />
      {children}
    </>
  );
}

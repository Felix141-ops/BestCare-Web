'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'patient' | 'admin';
}

export function DashboardLayout({
  children,
  userRole = 'patient',
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const patientLinks = [
    { label: 'Dashboard', href: '/dashboard/patient', icon: '📊' },
    { label: 'Appointments', href: '/dashboard/appointments', icon: '📅' },
    { label: 'Medical Records', href: '/dashboard/records', icon: '📋' },
    { label: 'Lab Results', href: '/dashboard/lab-results', icon: '🧪' },
    { label: 'Prescriptions', href: '/dashboard/prescriptions', icon: '💊' },
    { label: 'Billing', href: '/dashboard/billing', icon: '💳' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  const adminLinks = [
    { label: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
    { label: 'Appointments', href: '/dashboard/admin/appointments', icon: '📅' },
    { label: 'Doctors', href: '/dashboard/admin/doctors', icon: '👨‍⚕️' },
    { label: 'Patients', href: '/dashboard/admin/patients', icon: '👥' },
    { label: 'Departments', href: '/dashboard/admin/departments', icon: '🏥' },
    { label: 'Analytics', href: '/dashboard/admin/analytics', icon: '📈' },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: '⚙️' },
  ];

  const links = userRole === 'admin' ? adminLinks : patientLinks;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-dark-blue text-white fixed h-screen left-0 top-0 overflow-y-auto z-30"
      >
        <div className="p-6 border-b border-blue-400">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">BC</span>
            </div>
            <div>
              <p className="text-sm font-semibold">BestCare</p>
              <p className="text-xs text-blue-200">Hospital</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-medical-blue transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-blue-400">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-left">
              <span className="text-lg">🚪</span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } transition-all duration-300`}
      >
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full" />
              </button>

              <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout userRole="patient">{children}</DashboardLayout>;
}

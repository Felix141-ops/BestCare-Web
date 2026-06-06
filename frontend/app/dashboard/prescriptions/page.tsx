'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Input } from '@/components/ui';
import { motion } from 'framer-motion';

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  doctor: string;
  prescribedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'discontinued';
  refillsRemaining: number;
  instructions?: string;
}

const prescriptions: Prescription[] = [
  {
    id: '1',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily, in the morning',
    doctor: 'Dr. Sarah Johnson',
    prescribedDate: '2024-06-10',
    expiryDate: '2025-06-10',
    status: 'active',
    refillsRemaining: 3,
    instructions: 'Take with water on an empty stomach. May cause dizziness.',
  },
  {
    id: '2',
    medicationName: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily, in the evening',
    doctor: 'Dr. Sarah Johnson',
    prescribedDate: '2024-05-15',
    expiryDate: '2025-05-15',
    status: 'active',
    refillsRemaining: 2,
    instructions: 'Take with or without food. Do not break the tablet.',
  },
  {
    id: '3',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily with meals',
    doctor: 'Dr. Michael Chen',
    prescribedDate: '2024-03-20',
    expiryDate: '2024-12-20',
    status: 'active',
    refillsRemaining: 1,
    instructions: 'Take with food to reduce stomach upset.',
  },
  {
    id: '4',
    medicationName: 'Aspirin',
    dosage: '100mg',
    frequency: 'Once daily',
    doctor: 'Dr. Sarah Johnson',
    prescribedDate: '2024-01-10',
    expiryDate: '2024-07-10',
    status: 'expired',
    refillsRemaining: 0,
    instructions: 'Take with food or water.',
  },
  {
    id: '5',
    medicationName: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'As needed, up to 3 times daily',
    doctor: 'Dr. Emily Rodriguez',
    prescribedDate: '2024-04-05',
    expiryDate: '2024-06-05',
    status: 'discontinued',
    refillsRemaining: 0,
    instructions: 'Use for pain or fever only. Do not exceed recommended dose.',
  },
];

const getStatusBadgeVariant = (
  status: 'active' | 'expired' | 'discontinued'
): 'success' | 'error' | 'primary' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'expired':
      return 'error';
    case 'discontinued':
      return 'primary';
  }
};

const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch = prescription.medicationName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || prescription.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const activePrescriptions = filteredPrescriptions.filter(
    (p) => p.status === 'active'
  );
  const expiredPrescriptions = filteredPrescriptions.filter(
    (p) => p.status === 'expired'
  );
  const discontinuedPrescriptions = filteredPrescriptions.filter(
    (p) => p.status === 'discontinued'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Prescriptions</h1>
        <p className="text-gray-600 mb-6">
          View and manage your active and past prescriptions
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Prescriptions', value: prescriptions.length, color: 'blue' },
          {
            label: 'Active',
            value: prescriptions.filter((p) => p.status === 'active').length,
            color: 'green',
          },
          {
            label: 'Expired',
            value: prescriptions.filter((p) => p.status === 'expired').length,
            color: 'red',
          },
          {
            label: 'Discontinued',
            value: prescriptions.filter((p) => p.status === 'discontinued').length,
            color: 'gray',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="py-6">
                <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 space-y-4"
      >
        <Input
          placeholder="Search medications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>
      </motion.div>

      {/* Active Prescriptions */}
      {activePrescriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Prescriptions</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePrescriptions.map((prescription, index) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300" hoverable>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <CardTitle className="text-lg">
                          {prescription.medicationName}
                        </CardTitle>
                        <CardDescription>
                          {prescription.dosage} • {prescription.frequency}
                        </CardDescription>
                      </div>
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          PRESCRIBED BY
                        </p>
                        <p className="text-sm text-gray-900">
                          {prescription.doctor}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          REFILLS LEFT
                        </p>
                        <p className="text-sm text-gray-900">
                          {prescription.refillsRemaining}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">
                        EXPIRY DATE
                      </p>
                      <p className="text-sm text-gray-900">
                        {new Date(prescription.expiryDate).toLocaleDateString()}
                      </p>
                    </div>

                    {prescription.instructions && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          INSTRUCTIONS
                        </p>
                        <p className="text-sm text-gray-700">
                          {prescription.instructions}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                      >
                        🔄 Request Refill
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        📄 View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Expired & Discontinued */}
      {(expiredPrescriptions.length > 0 ||
        discontinuedPrescriptions.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Expired & Discontinued
          </h2>

          <div className="space-y-3">
            {[...expiredPrescriptions, ...discontinuedPrescriptions].map(
              (prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {prescription.medicationName} - {prescription.dosage}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {prescription.frequency} • {prescription.doctor}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            variant={getStatusBadgeVariant(prescription.status)}
                            size="sm"
                          >
                            {getStatusLabel(prescription.status)}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 text-lg">No prescriptions found</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-yellow-50 rounded-lg"
      >
        <h3 className="font-semibold text-gray-900 mb-2">⚠️ Important Notes</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Always take medications as prescribed by your doctor</li>
          <li>Do not share your prescriptions with others</li>
          <li>Request refills at least 3 days before you run out</li>
          <li>Report any side effects to your healthcare provider immediately</li>
          <li>Keep medications in their original bottles with labels intact</li>
        </ul>
      </motion.div>
    </div>
  );
}

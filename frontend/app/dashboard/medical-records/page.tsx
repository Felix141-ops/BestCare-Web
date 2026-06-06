'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Input } from '@/components/ui';
import { motion } from 'framer-motion';

interface MedicalRecord {
  id: string;
  type: 'diagnosis' | 'prescription' | 'procedure' | 'lab_result' | 'vaccination';
  title: string;
  description: string;
  date: string;
  doctor: string;
  status: 'active' | 'archived';
  notes?: string;
  fileUrl?: string;
}

const medicalRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'diagnosis',
    title: 'Hypertension',
    description: 'Blood pressure consistently elevated',
    date: '2024-06-10',
    doctor: 'Dr. Sarah Johnson',
    status: 'active',
    notes: 'Prescribed antihypertensive medication. Follow-up in 2 weeks.',
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Lisinopril 10mg',
    description: 'Once daily, in the morning',
    date: '2024-06-10',
    doctor: 'Dr. Sarah Johnson',
    status: 'active',
    fileUrl: '/prescriptions/lisinopril.pdf',
  },
  {
    id: '3',
    type: 'lab_result',
    title: 'Blood Test Results',
    description: 'Complete blood count and metabolic panel',
    date: '2024-05-25',
    doctor: 'Lab Department',
    status: 'archived',
    fileUrl: '/lab-results/blood-test-2024.pdf',
  },
  {
    id: '4',
    type: 'vaccination',
    title: 'Flu Vaccination',
    description: 'Annual flu vaccine administered',
    date: '2024-05-10',
    doctor: 'Dr. Michael Chen',
    status: 'active',
  },
  {
    id: '5',
    type: 'procedure',
    title: 'ECG Recording',
    description: 'Routine electrocardiogram',
    date: '2024-04-20',
    doctor: 'Dr. Sarah Johnson',
    status: 'archived',
    fileUrl: '/procedures/ecg-2024.pdf',
  },
  {
    id: '6',
    type: 'lab_result',
    title: 'Cholesterol Panel',
    description: 'Lipid profile test results',
    date: '2024-04-15',
    doctor: 'Lab Department',
    status: 'archived',
    fileUrl: '/lab-results/cholesterol-2024.pdf',
  },
];

const recordTypeConfig: Record<
  MedicalRecord['type'],
  { icon: string; color: string; label: string }
> = {
  diagnosis: { icon: '🩺', color: 'blue', label: 'Diagnosis' },
  prescription: { icon: '💊', color: 'cyan', label: 'Prescription' },
  procedure: { icon: '🏥', color: 'purple', label: 'Procedure' },
  lab_result: { icon: '🧪', color: 'green', label: 'Lab Result' },
  vaccination: { icon: '💉', color: 'yellow', label: 'Vaccination' },
};

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const recordTypes = ['all', ...new Set(medicalRecords.map((r) => r.type))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
        <p className="text-gray-600 mb-6">
          Access your complete medical history and documentation
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Records', value: medicalRecords.length, color: 'blue' },
          {
            label: 'Active Conditions',
            value: medicalRecords.filter((r) => r.type === 'diagnosis' && r.status === 'active')
              .length,
            color: 'red',
          },
          {
            label: 'Prescriptions',
            value: medicalRecords.filter((r) => r.type === 'prescription').length,
            color: 'green',
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 space-y-4"
      >
        <Input
          placeholder="Search records..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Record Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {recordTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : recordTypeConfig[type as MedicalRecord['type']].label}
                </option>
              ))}
            </select>
          </div>

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
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Records List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {filteredRecords.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords.map((record, index) => {
              const config = recordTypeConfig[record.type];

              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300" hoverable>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-4xl flex-shrink-0">{config.icon}</div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {record.title}
                              </h3>
                              <Badge
                                variant={record.status === 'active' ? 'success' : 'primary'}
                                size="sm"
                              >
                                {record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)}
                              </Badge>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">
                              {record.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <span>📅 {new Date(record.date).toLocaleDateString()}</span>
                              <span>👨‍⚕️ {record.doctor}</span>
                            </div>

                            {record.notes && (
                              <p className="text-sm text-gray-600 mt-3 p-2 bg-gray-50 rounded">
                                {record.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {record.fileUrl && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => window.open(record.fileUrl)}
                            >
                              📥 Download
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 text-lg">No medical records found</p>
              <p className="text-gray-500 text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-blue-50 rounded-lg"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Export Your Records</h3>
        <p className="text-sm text-gray-600 mb-4">
          Download your complete medical history in PDF format or share with another healthcare provider.
        </p>
        <div className="flex gap-4">
          <Button variant="primary">Download PDF</Button>
          <Button variant="outline">Generate Summary</Button>
        </div>
      </motion.div>
    </div>
  );
}

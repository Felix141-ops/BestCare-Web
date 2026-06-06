'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: 'normal' | 'abnormal' | 'pending';
  doctor: string;
  results: {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: 'normal' | 'low' | 'high';
  }[];
  pdfUrl?: string;
}

const labResults: LabResult[] = [
  {
    id: '1',
    testName: 'Complete Blood Count (CBC)',
    date: '2024-06-20',
    status: 'normal',
    doctor: 'Lab Department',
    results: [
      {
        name: 'White Blood Cells (WBC)',
        value: '7.5',
        unit: 'K/uL',
        normalRange: '4.5-11.0',
        status: 'normal',
      },
      {
        name: 'Red Blood Cells (RBC)',
        value: '4.8',
        unit: 'M/uL',
        normalRange: '4.5-5.9',
        status: 'normal',
      },
      {
        name: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        normalRange: '13.5-17.5',
        status: 'normal',
      },
      {
        name: 'Hematocrit',
        value: '42%',
        unit: '%',
        normalRange: '40-53',
        status: 'normal',
      },
    ],
    pdfUrl: '/lab-results/cbc-2024.pdf',
  },
  {
    id: '2',
    testName: 'Metabolic Panel',
    date: '2024-06-20',
    status: 'abnormal',
    doctor: 'Lab Department',
    results: [
      {
        name: 'Glucose',
        value: '125',
        unit: 'mg/dL',
        normalRange: '70-100',
        status: 'high',
      },
      {
        name: 'Sodium',
        value: '138',
        unit: 'mEq/L',
        normalRange: '136-145',
        status: 'normal',
      },
      {
        name: 'Potassium',
        value: '4.2',
        unit: 'mEq/L',
        normalRange: '3.5-5.0',
        status: 'normal',
      },
      {
        name: 'Creatinine',
        value: '1.0',
        unit: 'mg/dL',
        normalRange: '0.7-1.3',
        status: 'normal',
      },
    ],
    pdfUrl: '/lab-results/metabolic-2024.pdf',
  },
  {
    id: '3',
    testName: 'Lipid Profile',
    date: '2024-05-15',
    status: 'normal',
    doctor: 'Lab Department',
    results: [
      {
        name: 'Total Cholesterol',
        value: '180',
        unit: 'mg/dL',
        normalRange: '<200',
        status: 'normal',
      },
      {
        name: 'LDL Cholesterol',
        value: '110',
        unit: 'mg/dL',
        normalRange: '<130',
        status: 'normal',
      },
      {
        name: 'HDL Cholesterol',
        value: '45',
        unit: 'mg/dL',
        normalRange: '>40',
        status: 'normal',
      },
      {
        name: 'Triglycerides',
        value: '150',
        unit: 'mg/dL',
        normalRange: '<150',
        status: 'normal',
      },
    ],
    pdfUrl: '/lab-results/lipid-2024.pdf',
  },
  {
    id: '4',
    testName: 'Thyroid Function Test',
    date: '2024-04-10',
    status: 'pending',
    doctor: 'Lab Department',
    results: [],
    pdfUrl: '/lab-results/thyroid-pending.pdf',
  },
];

const getStatusBadgeVariant = (
  status: 'normal' | 'abnormal' | 'pending'
): 'success' | 'error' | 'primary' => {
  switch (status) {
    case 'normal':
      return 'success';
    case 'abnormal':
      return 'error';
    case 'pending':
      return 'primary';
  }
};

const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getResultStatusColor = (status: 'normal' | 'low' | 'high'): string => {
  switch (status) {
    case 'normal':
      return 'text-green-600 bg-green-50';
    case 'low':
      return 'text-blue-600 bg-blue-50';
    case 'high':
      return 'text-red-600 bg-red-50';
  }
};

export default function LabResultsPage() {
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Results</h1>
        <p className="text-gray-600 mb-6">View and download your laboratory test results</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Tests', value: labResults.length, color: 'blue' },
          {
            label: 'Normal',
            value: labResults.filter((r) => r.status === 'normal').length,
            color: 'green',
          },
          {
            label: 'Abnormal',
            value: labResults.filter((r) => r.status === 'abnormal').length,
            color: 'red',
          },
          {
            label: 'Pending',
            value: labResults.filter((r) => r.status === 'pending').length,
            color: 'yellow',
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

      {/* Lab Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {labResults.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              hoverable
            >
              <div
                onClick={() =>
                  setExpandedResult(
                    expandedResult === result.id ? null : result.id
                  )
                }
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">
                          {result.testName}
                        </CardTitle>
                        <Badge variant={getStatusBadgeVariant(result.status)}>
                          {getStatusLabel(result.status)}
                        </Badge>
                      </div>
                      <CardDescription>
                        Test Date: {new Date(result.date).toLocaleDateString()} •{' '}
                        {result.doctor}
                      </CardDescription>
                    </div>

                    <motion.svg
                      className="w-6 h-6 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        rotate:
                          expandedResult === result.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </motion.svg>
                  </div>
                </CardHeader>
              </div>

              {/* Expanded Results */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height:
                    expandedResult === result.id ? 'auto' : 0,
                  opacity: expandedResult === result.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0 space-y-4">
                  {result.status === 'pending' ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">
                        Results are still being processed
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Typically available within 24-48 hours
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {result.results.map((test, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-lg ${getResultStatusColor(
                              test.status
                            )}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">
                                {test.name}
                              </h4>
                              <span className="text-sm font-medium">
                                {test.value} {test.unit}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Normal Range: {test.normalRange}</span>
                              <span className="font-semibold capitalize">
                                {test.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-4">
                        {result.pdfUrl && (
                          <Button
                            onClick={() =>
                              window.open(result.pdfUrl)
                            }
                            size="sm"
                            variant="secondary"
                            className="flex-1"
                          >
                            📥 Download PDF
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          Share with Doctor
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-blue-50 rounded-lg"
      >
        <h3 className="font-semibold text-gray-900 mb-2">📋 Important Notes</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Lab results are typically available within 24-48 hours of testing</li>
          <li>
            Abnormal results should be discussed with your healthcare provider
          </li>
          <li>
            You can share results with other doctors through the "Share" button
          </li>
          <li>
            Keep a record of your results for future reference and comparison
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

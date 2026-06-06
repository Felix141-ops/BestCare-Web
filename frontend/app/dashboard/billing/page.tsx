'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Modal } from '@/components/ui';
import { motion } from 'framer-motion';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate?: string;
  paymentDate?: string;
  pdfUrl?: string;
}

const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-06-20',
    description: 'Cardiology Consultation - Dr. Sarah Johnson',
    amount: 100,
    status: 'paid',
    paymentDate: '2024-06-22',
    pdfUrl: '/invoices/inv-2024-001.pdf',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: '2024-06-15',
    description: 'Lab Tests - Complete Blood Count',
    amount: 75,
    status: 'paid',
    paymentDate: '2024-06-17',
    pdfUrl: '/invoices/inv-2024-002.pdf',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: '2024-07-01',
    description: 'ECG Procedure & Diagnostic Imaging',
    amount: 250,
    status: 'pending',
    dueDate: '2024-07-15',
    pdfUrl: '/invoices/inv-2024-003.pdf',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    date: '2024-06-25',
    description: 'Medication & Prescription Refills',
    amount: 45,
    status: 'paid',
    paymentDate: '2024-06-28',
    pdfUrl: '/invoices/inv-2024-004.pdf',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    date: '2024-06-01',
    description: 'General Practice Consultation',
    amount: 60,
    status: 'overdue',
    dueDate: '2024-07-01',
    pdfUrl: '/invoices/inv-2024-005.pdf',
  },
];

const getStatusBadgeVariant = (status: 'paid' | 'pending' | 'overdue'): 'success' | 'primary' | 'error' => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'primary';
    case 'overdue':
      return 'error';
  }
};

const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getStatusIcon = (status: 'paid' | 'pending' | 'overdue'): string => {
  switch (status) {
    case 'paid':
      return '✓';
    case 'pending':
      return '⏳';
    case 'overdue':
      return '⚠️';
  }
};

export default function BillingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const paidInvoices = invoices.filter((inv) => inv.status === 'paid');
  const pendingInvoices = invoices.filter((inv) => inv.status === 'pending');
  const overdueInvoices = invoices.filter((inv) => inv.status === 'overdue');

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Payments</h1>
        <p className="text-gray-600 mb-6">View and manage your invoices and payment history</p>
      </motion.div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Amount', value: `$${totalAmount.toFixed(2)}`, color: 'blue' },
          { label: 'Paid', value: `$${paidAmount.toFixed(2)}`, color: 'green' },
          { label: 'Pending', value: `$${pendingAmount.toFixed(2)}`, color: 'yellow' },
          { label: 'Overdue', value: `$${overdueAmount.toFixed(2)}`, color: 'red' },
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

      {/* Overdue Alert */}
      {overdueInvoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-error/10 border border-error/30 rounded-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-error mb-1">⚠️ Overdue Invoices</h3>
              <p className="text-sm text-gray-700">
                You have {overdueInvoices.length} overdue invoice(s) totaling ${overdueAmount.toFixed(2)}. Please pay as soon as possible.
              </p>
            </div>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setSelectedInvoice(overdueInvoices[0]);
                setIsPaymentModalOpen(true);
              }}
            >
              Pay Now
            </Button>
          </div>
        </motion.div>
      )}

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Invoices</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300" hoverable>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <CardTitle className="text-lg">
                          {invoice.invoiceNumber}
                        </CardTitle>
                        <CardDescription>
                          {invoice.description}
                        </CardDescription>
                      </div>
                      <Badge variant="primary" size="sm">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          INVOICE DATE
                        </p>
                        <p className="text-sm text-gray-900">
                          {new Date(invoice.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          DUE DATE
                        </p>
                        <p className="text-sm text-gray-900">
                          {invoice.dueDate
                            ? new Date(invoice.dueDate).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-semibold mb-1">
                        AMOUNT DUE
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsPaymentModalOpen(true);
                        }}
                      >
                        💳 Pay Now
                      </Button>
                      {invoice.pdfUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            window.open(invoice.pdfUrl)
                          }
                        >
                          📄 PDF
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment History</h2>

        {paidInvoices.length > 0 ? (
          <div className="space-y-3">
            {paidInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">✓</span>
                          <p className="font-semibold text-gray-900">
                            {invoice.invoiceNumber}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {invoice.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Paid on{' '}
                          {invoice.paymentDate
                            ? new Date(invoice.paymentDate).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ${invoice.amount.toFixed(2)}
                        </p>
                        <Badge variant="success" size="sm" className="mt-2">
                          Paid
                        </Badge>
                      </div>

                      {invoice.pdfUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-4"
                          onClick={() =>
                            window.open(invoice.pdfUrl)
                          }
                        >
                          📄
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 text-lg">No payment history</p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Payment Methods Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-blue-50 rounded-lg"
      >
        <h3 className="font-semibold text-gray-900 mb-2">Accepted Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '💳', name: 'Credit/Debit Card' },
            { icon: '🏦', name: 'Bank Transfer' },
            { icon: '📱', name: 'Online Wallets' },
            { icon: '💰', name: 'Cash (in-person)' },
          ].map((method, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-2xl">{method.icon}</span>
              <span className="text-sm text-gray-700">{method.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedInvoice(null);
        }}
      >
        {selectedInvoice && (
          <div className="w-full max-w-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedInvoice.invoiceNumber}
              </h2>
              <p className="text-gray-600 text-sm">
                {selectedInvoice.description}
              </p>
            </div>

            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Due:</span>
                <span className="font-bold text-lg text-gray-900">
                  ${selectedInvoice.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <Badge variant={getStatusBadgeVariant(selectedInvoice.status)}>
                  {getStatusLabel(selectedInvoice.status)}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setIsPaymentModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1"
              >
                💳 Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

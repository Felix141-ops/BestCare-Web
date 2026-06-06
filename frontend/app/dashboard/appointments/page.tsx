'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Modal, Alert } from '@/components/ui';
import { motion } from 'framer-motion';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  fee: number;
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2024-07-15',
    time: '10:00 AM',
    status: 'upcoming',
    fee: 100,
    notes: 'Regular check-up',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Orthopedics',
    date: '2024-07-10',
    time: '02:00 PM',
    status: 'completed',
    fee: 80,
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    date: '2024-06-20',
    time: '11:00 AM',
    status: 'cancelled',
    fee: 70,
  },
  {
    id: '4',
    doctorName: 'Dr. James Wilson',
    specialty: 'General Practice',
    date: '2024-07-20',
    time: '03:30 PM',
    status: 'upcoming',
    fee: 60,
  },
];

const getStatusBadgeVariant = (
  status: 'upcoming' | 'completed' | 'cancelled'
): 'primary' | 'success' | 'error' => {
  switch (status) {
    case 'upcoming':
      return 'primary';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
  }
};

const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelledAppointments, setCancelledAppointments] = useState<string[]>([]);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const handleCancelAppointment = (appointmentId: string) => {
    setCancelledAppointments((prev) => [...prev, appointmentId]);
    setShowCancelAlert(true);
    setIsModalOpen(false);

    setTimeout(() => setShowCancelAlert(false), 4000);
  };

  const filteredAppointments = appointments.filter(
    (apt) => !cancelledAppointments.includes(apt.id)
  );

  const upcomingAppointments = filteredAppointments.filter(
    (apt) => apt.status === 'upcoming'
  );
  const completedAppointments = filteredAppointments.filter(
    (apt) => apt.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600 mb-6">Manage your upcoming and past appointments</p>
      </motion.div>

      {showCancelAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert variant="success">
            Appointment cancelled successfully. You will receive a confirmation email.
          </Alert>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Appointments', value: filteredAppointments.length, color: 'blue' },
          { label: 'Upcoming', value: upcomingAppointments.length, color: 'cyan' },
          { label: 'Completed', value: completedAppointments.length, color: 'green' },
          { label: 'Cancelled', value: cancelledAppointments.length, color: 'red' },
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

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>

        {upcomingAppointments.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300" hoverable>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <CardTitle className="text-lg">
                          {appointment.doctorName}
                        </CardTitle>
                        <CardDescription>{appointment.specialty}</CardDescription>
                      </div>
                      <Badge variant="primary" size="sm">
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">DATE</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">TIME</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {appointment.time}
                        </p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">NOTES</p>
                        <p className="text-sm text-gray-700">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsModalOpen(true);
                        }}
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        Reschedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 text-lg">No upcoming appointments</p>
              <p className="text-gray-500 text-sm mt-2">
                Schedule an appointment to see it here
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Past Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Appointments</h2>

        {completedAppointments.length > 0 ? (
          <div className="space-y-4">
            {completedAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {appointment.doctorName} - {appointment.specialty}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(appointment.date).toLocaleDateString()} at{' '}
                          {appointment.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="success" size="sm">
                          {getStatusLabel(appointment.status)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setIsModalOpen(true);
                          }}
                        >
                          View Records
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 text-lg">No past appointments</p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
      >
        {selectedAppointment && (
          <div className="w-full max-w-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedAppointment.doctorName}
                </h2>
                <p className="text-gray-600">{selectedAppointment.specialty}</p>
              </div>
              <Badge variant={getStatusBadgeVariant(selectedAppointment.status)}>
                {getStatusLabel(selectedAppointment.status)}
              </Badge>
            </div>

            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">DATE & TIME</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedAppointment.date).toLocaleDateString()}{' '}
                  {selectedAppointment.time}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">CONSULTATION FEE</p>
                <p className="font-semibold text-gray-900">${selectedAppointment.fee}</p>
              </div>
              {selectedAppointment.notes && (
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">NOTES</p>
                  <p className="text-sm text-gray-700">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>

            {selectedAppointment.status === 'upcoming' && (
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleCancelAppointment(selectedAppointment.id)}
                  variant="danger"
                  className="flex-1"
                >
                  Cancel Appointment
                </Button>
              </div>
            )}

            {selectedAppointment.status !== 'upcoming' && (
              <Button onClick={() => setIsModalOpen(false)} className="w-full">
                Close
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

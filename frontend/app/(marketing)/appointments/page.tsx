'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Badge, Alert } from '@/components/ui';
import { motion } from 'framer-motion';

export default function AppointmentBookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      availability: 'Available',
      fee: '$100',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      rating: 4.8,
      availability: 'Available',
      fee: '$80',
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      availability: 'Available',
      fee: '$70',
    },
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit appointment booking
    alert('Appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      <main className="py-12">
        <div className="container-max max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Book an Appointment
            </h1>
            <p className="text-lg text-gray-600">
              Schedule a consultation with our healthcare professionals
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? 'bg-medical-blue text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        step > s ? 'bg-medical-blue' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Select Doctor</span>
              <span>Choose Date</span>
              <span>Select Time</span>
              <span>Confirm</span>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Select a Doctor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      hoverable
                      className={`cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? 'ring-2 ring-medical-blue'
                          : ''
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="text-4xl">👨‍⚕️</div>
                          <Badge variant="success" size="sm">
                            {doctor.availability}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-4">
                          {doctor.name}
                        </CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Rating</span>
                            <span className="font-semibold">⭐ {doctor.rating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Fee</span>
                            <span className="font-semibold">{doctor.fee}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Choose Date */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Choose a Date
                </h2>
                <Input
                  type="date"
                  label="Appointment Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </motion.div>
            )}

            {/* Step 3: Select Time */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Select Time
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                        selectedTime === time
                          ? 'border-medical-blue bg-blue-50 text-medical-blue'
                          : 'border-gray-200 hover:border-medical-blue'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Confirm Appointment
                </h2>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Doctor</p>
                        <p className="font-semibold text-gray-900">
                          {doctors.find((d) => d.id === selectedDoctor)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Specialty</p>
                        <p className="font-semibold text-gray-900">
                          {doctors.find((d) => d.id === selectedDoctor)?.specialty}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(selectedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Time</p>
                        <p className="font-semibold text-gray-900">{selectedTime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Input
                  label="Reason for Visit"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Brief description of your symptoms or reason"
                  className="mb-4"
                />

                <Input
                  label="Additional Notes (Optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information for the doctor"
                  className="mb-4"
                />

                <Alert variant="info" className="mb-6">
                  By confirming this appointment, you agree to our terms and
                  conditions. A confirmation will be sent to your email.
                </Alert>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-between pt-8 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                ← Previous
              </Button>

              <Button
                type={step === 4 ? 'submit' : 'button'}
                size="lg"
                onClick={() => {
                  if (step < 4) setStep(step + 1);
                }}
                disabled={
                  (step === 1 && !selectedDoctor) ||
                  (step === 2 && !selectedDate) ||
                  (step === 3 && !selectedTime)
                }
              >
                {step === 4 ? 'Confirm Booking' : 'Next →'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

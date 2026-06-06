'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function PatientDashboard() {
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-06-15',
      time: '10:30 AM',
      status: 'upcoming',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      date: '2024-06-01',
      time: '2:00 PM',
      status: 'completed',
    },
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal' },
    { label: 'BMI', value: '24.5', unit: 'kg/m²', status: 'normal' },
  ];

  const upcomingTasks = [
    { title: 'Lab Test', dueDate: '2024-06-10', priority: 'high' },
    { title: 'Prescription Refill', dueDate: '2024-06-20', priority: 'medium' },
    { title: 'Follow-up Visit', dueDate: '2024-06-25', priority: 'medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-medical-blue to-dark-blue rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome Back, John!</h1>
          <p className="text-blue-100">
            Here's your health overview and upcoming appointments.
          </p>
        </div>
      </motion.div>

      {/* Health Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Health Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardDescription className="text-sm">
                  {metric.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-medical-blue">
                  {metric.value}
                </p>
                <p className="text-xs text-gray-600 mt-1">{metric.unit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled visits</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter((a) => a.status === 'upcoming')
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {appointment.doctor}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.specialty}
                          </p>
                        </div>
                        <Badge variant="success" size="sm">
                          Upcoming
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📅 {appointment.date}</span>
                        <span>⏰ {appointment.time}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>To-Do List</CardTitle>
              <CardDescription>Pending actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">
                        {task.title}
                      </p>
                      <Badge
                        variant={
                          task.priority === 'high' ? 'error' : 'warning'
                        }
                        size="sm"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      Due: {task.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white border-2 border-medical-blue rounded-lg p-6 text-center hover:shadow-md transition-shadow group">
            <p className="text-3xl mb-2">📅</p>
            <p className="font-semibold text-gray-900 group-hover:text-medical-blue transition-colors">
              Book Appointment
            </p>
          </button>

          <button className="bg-white border-2 border-medical-blue rounded-lg p-6 text-center hover:shadow-md transition-shadow group">
            <p className="text-3xl mb-2">📋</p>
            <p className="font-semibold text-gray-900 group-hover:text-medical-blue transition-colors">
              Medical Records
            </p>
          </button>

          <button className="bg-white border-2 border-medical-blue rounded-lg p-6 text-center hover:shadow-md transition-shadow group">
            <p className="text-3xl mb-2">🧪</p>
            <p className="font-semibold text-gray-900 group-hover:text-medical-blue transition-colors">
              Lab Results
            </p>
          </button>

          <button className="bg-white border-2 border-medical-blue rounded-lg p-6 text-center hover:shadow-md transition-shadow group">
            <p className="text-3xl mb-2">💬</p>
            <p className="font-semibold text-gray-900 group-hover:text-medical-blue transition-colors">
              Contact Doctor
            </p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function CardioologyPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const departmentInfo = {
    name: 'Cardiology',
    icon: '❤️',
    description: 'Comprehensive cardiovascular care and treatment',
    established: '2010',
    doctors: 8,
    beds: 24,
    specialization:
      'Heart disease, hypertension, arrhythmias, heart failure, coronary artery disease',
    facilities: [
      '24/7 Emergency Cardiac Care',
      'Advanced ECG & Echocardiography',
      'Cardiac Catheterization Lab',
      'Cardiac Imaging (CT & MRI)',
      'Stress Testing',
      'Pacemaker Implantation',
    ],
  };

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Chief of Cardiology',
      experience: '18 years',
      specialties: 'Interventional Cardiology, Heart Failure',
      rating: 4.9,
      reviews: 245,
      availability: 'Mon, Wed, Fri',
      fee: '$120',
    },
    {
      id: '2',
      name: 'Dr. James Wilson',
      title: 'Senior Cardiologist',
      experience: '15 years',
      specialties: 'Arrhythmia Management, Electrophysiology',
      rating: 4.8,
      reviews: 198,
      availability: 'Tue, Thu, Sat',
      fee: '$100',
    },
    {
      id: '3',
      name: 'Dr. Patricia Lee',
      title: 'Cardiologist',
      experience: '10 years',
      specialties: 'Preventive Cardiology, Risk Management',
      rating: 4.7,
      reviews: 156,
      availability: 'Mon, Tue, Wed',
      fee: '$90',
    },
    {
      id: '4',
      name: 'Dr. Robert Martinez',
      title: 'Cardiologist',
      experience: '8 years',
      specialties: 'General Cardiology, Diagnostics',
      rating: 4.6,
      reviews: 142,
      availability: 'Wed, Thu, Fri',
      fee: '$85',
    },
  ];

  const conditions = [
    {
      title: 'Heart Attack',
      description: 'Emergency intervention and long-term recovery management',
      icon: '⚡',
    },
    {
      title: 'Hypertension',
      description: 'Blood pressure management and prevention strategies',
      icon: '📊',
    },
    {
      title: 'Arrhythmia',
      description: 'Irregular heartbeat diagnosis and treatment',
      icon: '💓',
    },
    {
      title: 'Heart Failure',
      description: 'Comprehensive management and lifestyle support',
      icon: '🫀',
    },
    {
      title: 'Coronary Artery Disease',
      description: 'Blockage prevention and treatment options',
      icon: '🚫',
    },
    {
      title: 'Valve Disease',
      description: 'Surgical and non-surgical treatment approaches',
      icon: '🔄',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-red-50 via-red-100 to-pink-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="text-7xl">{departmentInfo.icon}</div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {departmentInfo.name} Department
                  </h1>
                  <p className="text-lg text-gray-600">
                    {departmentInfo.description}
                  </p>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Doctors</p>
                  <p className="text-2xl font-bold text-red-600">
                    {departmentInfo.doctors}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Beds</p>
                  <p className="text-2xl font-bold text-red-600">
                    {departmentInfo.beds}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Est.</p>
                  <p className="text-2xl font-bold text-red-600">
                    {departmentInfo.established}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Department Info */}
        <section className="py-12 bg-white border-b">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Specialization
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {departmentInfo.specialization}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    State-of-the-Art Facilities
                  </h3>
                  <ul className="space-y-2">
                    {departmentInfo.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-red-600">✓</span>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Why Choose Our Cardiology Department?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🏆</span>
                      <span>
                        Award-winning team with international certifications
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🔬</span>
                      <span>
                        Latest cardiac technology and treatment options
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">⏰</span>
                      <span>24/7 emergency cardiac care and response</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">📈</span>
                      <span>
                        Comprehensive follow-up and preventive care programs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Treated Conditions */}
        <section className="py-12 bg-gray-50">
          <div className="container-max">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Conditions We Treat
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conditions.map((condition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-all" hoverable>
                    <CardContent className="py-6">
                      <div className="text-5xl mb-3">{condition.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {condition.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {condition.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Doctors */}
        <section className="py-12 bg-white">
          <div className="container-max">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Our Cardiologists
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="hover:shadow-lg transition-all cursor-pointer"
                    hoverable
                    onClick={() =>
                      setSelectedDoctor(
                        selectedDoctor === doctor.id ? null : doctor.id
                      )
                    }
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <CardTitle className="text-lg">
                            {doctor.name}
                          </CardTitle>
                          <CardDescription>{doctor.title}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-semibold text-gray-900">
                              {doctor.rating}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {doctor.reviews} reviews
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          EXPERIENCE
                        </p>
                        <p className="text-sm text-gray-900">
                          {doctor.experience}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          SPECIALTIES
                        </p>
                        <p className="text-sm text-gray-900">
                          {doctor.specialties}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">
                            AVAILABILITY
                          </p>
                          <p className="text-sm text-gray-900">
                            {doctor.availability}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">
                            CONSULTATION
                          </p>
                          <p className="text-sm font-semibold text-red-600">
                            {doctor.fee}
                          </p>
                        </div>
                      </div>

                      {selectedDoctor === doctor.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-gray-200"
                        >
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              Book Appointment
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              View Profile
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-red-50">
          <div className="container-max text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Cardiac Care?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Schedule an appointment with one of our expert cardiologists today.
              </p>
              <Button size="lg">Book an Appointment</Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

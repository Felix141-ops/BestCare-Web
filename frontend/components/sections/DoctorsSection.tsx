'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';
import { motion } from 'framer-motion';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.9,
    image: '👩‍⚕️',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Surgeon',
    experience: '12 years',
    rating: 4.8,
    image: '👨‍⚕️',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: '10 years',
    rating: 4.9,
    image: '👩‍⚕️',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    experience: '18 years',
    rating: 4.7,
    image: '👨‍⚕️',
  },
];

export const DoctorsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Meet Our Specialists
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experienced and dedicated healthcare professionals are
            committed to providing you with the best medical care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300" hoverable>
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-3 text-center">{doctor.image}</div>
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <Badge variant="primary" size="sm" className="mt-2 justify-center">
                    {doctor.specialty}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(doctor.rating) ? '⭐' : '☆'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {doctor.experience} of experience
                  </p>
                  <button className="w-full mt-4 text-sm font-semibold text-medical-blue hover:text-dark-blue transition-colors">
                    View Profile
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/doctors"
            className="inline-flex items-center gap-2 text-medical-blue font-semibold hover:text-dark-blue transition-colors text-lg"
          >
            View All Doctors →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorsSection;

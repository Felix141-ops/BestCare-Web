'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { motion } from 'framer-motion';

const departments = [
  {
    id: 1,
    name: 'Cardiology',
    description: 'Expert heart and cardiovascular care',
    icon: '❤️',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 2,
    name: 'Orthopedics',
    description: 'Bone and joint specialists',
    icon: '🦴',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 3,
    name: 'Neurology',
    description: 'Brain and nervous system care',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 4,
    name: 'Pediatrics',
    description: 'Specialized children healthcare',
    icon: '👶',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 5,
    name: 'Oncology',
    description: 'Cancer treatment and care',
    icon: '🔬',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 6,
    name: 'Dentistry',
    description: 'Dental health and procedures',
    icon: '😁',
    color: 'from-green-500 to-emerald-500',
  },
];

export const DepartmentsSection: React.FC = () => {
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
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Departments</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive medical services across multiple specialties with
            experienced doctors and state-of-the-art equipment.
          </p>
        </motion.div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
                hoverable
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{dept.name}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {dept.description}
                      </CardDescription>
                    </div>
                    <div className="text-4xl">{dept.icon}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Access expert care from our specialized team of physicians and nurses
                    dedicated to your health and wellness.
                  </p>
                  <button className="mt-4 text-medical-blue font-semibold hover:text-dark-blue transition-colors flex items-center gap-2">
                    Learn More →
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
            href="/departments"
            className="inline-flex items-center gap-2 text-medical-blue font-semibold hover:text-dark-blue transition-colors text-lg"
          >
            View All Departments →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentsSection;

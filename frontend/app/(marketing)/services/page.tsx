'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    icon: '🩺',
    title: 'General Consultation',
    description: 'Comprehensive health check-ups and consultation with our experienced doctors.',
  },
  {
    id: 2,
    icon: '🧬',
    title: 'Diagnostic Services',
    description: 'Advanced laboratory testing and diagnostic imaging for accurate diagnosis.',
  },
  {
    id: 3,
    icon: '🏥',
    title: 'Emergency Services',
    description: '24/7 emergency care with rapid response and trauma specialists.',
  },
  {
    id: 4,
    icon: '🔬',
    title: 'Pathology Services',
    description: 'Full-range laboratory pathology services for various medical conditions.',
  },
  {
    id: 5,
    icon: '💉',
    title: 'Vaccination Services',
    description: 'Preventive vaccination programs for children and adults.',
  },
  {
    id: 6,
    icon: '👨‍⚕️',
    title: 'Specialist Consultations',
    description: 'Expert consultations across 20+ medical specialties.',
  },
  {
    id: 7,
    icon: '🚑',
    title: 'Ambulance Services',
    description: 'Fast and equipped ambulance services for medical emergencies.',
  },
  {
    id: 8,
    icon: '💊',
    title: 'Pharmacy Services',
    description: 'In-house pharmacy with a wide range of medications.',
  },
  {
    id: 9,
    icon: '🧘',
    title: 'Wellness Programs',
    description: 'Preventive health programs and wellness coaching services.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h1>
              <p className="text-lg text-gray-600">
                Comprehensive healthcare services designed to meet all your medical needs
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300" hoverable>
                    <CardHeader>
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <button className="text-medical-blue font-semibold hover:text-dark-blue transition-colors">
                        Learn More →
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-medical-blue text-white">
          <div className="container-max text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Need Our Services?</h2>
              <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
                Contact us today to schedule an appointment or inquire about any of our services.
              </p>
              <Button
                size="lg"
                variant="ghost"
                className="bg-white text-medical-blue hover:bg-blue-50"
              >
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

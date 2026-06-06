'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                About BestCare Hospital
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Leading the way in healthcare excellence and patient care since 1995
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional, compassionate, and innovative healthcare
                  services that improve the health and well-being of our community and
                  individuals we serve.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading healthcare provider recognized for medical
                  excellence, innovation, and our commitment to delivering outstanding
                  patient outcomes and experiences.
                </p>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Patient care, integrity, respect, compassion, and continuous
                  improvement guide every decision we make and every action we take.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-20 bg-gray-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-12 text-gray-900">
                Our History & Milestones
              </h2>

              <div className="space-y-8">
                {[
                  {
                    year: '1995',
                    title: 'Founded',
                    description:
                      'BestCare Hospital was established with a mission to provide quality healthcare.',
                  },
                  {
                    year: '2005',
                    title: 'Major Expansion',
                    description:
                      'Expanded to include specialized departments and modern surgical facilities.',
                  },
                  {
                    year: '2015',
                    title: 'Accreditation',
                    description:
                      'Received Joint Commission accreditation for quality and safety standards.',
                  },
                  {
                    year: '2023',
                    title: 'Digital Transformation',
                    description:
                      'Launched state-of-the-art patient portal and digital health services.',
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 pb-8 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex-shrink-0 w-24">
                      <p className="text-2xl font-bold text-medical-blue">
                        {milestone.year}
                      </p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Leadership Team
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Dr. Robert Smith', role: 'Chief Executive Officer', icon: '👨‍💼' },
                { name: 'Dr. Lisa Anderson', role: 'Chief Medical Officer', icon: '👩‍⚕️' },
                { name: 'John Johnson', role: 'Chief Financial Officer', icon: '👨‍💼' },
                { name: 'Sarah Williams', role: 'Chief Nursing Officer', icon: '👩‍⚕️' },
              ].map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">{leader.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-gray-600">{leader.role}</p>
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
              <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
                Experience the BestCare difference in healthcare excellence and compassionate care.
              </p>
              <Button
                size="lg"
                variant="ghost"
                className="bg-white text-medical-blue hover:bg-blue-50"
              >
                Schedule an Appointment
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

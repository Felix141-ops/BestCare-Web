'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-blue rounded-full opacity-10 blur-3xl -z-10" />

      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Your Health is Our <span className="text-gradient">Priority</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience world-class healthcare at BestCare Hospital. With a team of
              experienced doctors, modern medical facilities, and patient-centric care,
              we're committed to your well-being.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => {}}>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Appointment
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {}}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Emergency Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-medical-blue">500+</p>
                <p className="text-sm text-gray-600 mt-1">Healthcare Professionals</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-medical-blue">50K+</p>
                <p className="text-sm text-gray-600 mt-1">Happy Patients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-medical-blue">20+</p>
                <p className="text-sm text-gray-600 mt-1">Specialties</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-medical-blue to-dark-blue rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 flex items-center justify-center min-h-96">
                <div className="text-center">
                  <svg
                    className="w-32 h-32 text-medical-blue mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6h-6m0 0H0m6 6h6m0 0h6m-6-6H6"
                    />
                  </svg>
                  <p className="text-gray-600 text-lg font-medium">
                    Healthcare Excellence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-medical-blue to-dark-blue relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl -z-10" />

      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our dedicated team of healthcare professionals is ready to provide you
            with the best medical care. Book your appointment today.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="ghost"
              className="bg-white text-medical-blue hover:bg-blue-50"
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
                  d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-600"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Learn More
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20 flex flex-wrap justify-center gap-8">
            <div>
              <p className="text-blue-100 text-sm">24/7 Emergency Hotline</p>
              <p className="text-white text-xl font-semibold">+1 (234) 567-8900</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Email Us</p>
              <p className="text-white text-xl font-semibold">info@bestcare.hospital</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

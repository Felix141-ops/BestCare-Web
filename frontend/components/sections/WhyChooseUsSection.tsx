'use client';

import React from 'react';
import { motion } from 'framer-motion';

const whyChooseUsFeatures = [
  {
    title: 'Expert Medical Team',
    description: 'Over 500 highly qualified doctors and healthcare professionals',
    icon: '👨‍⚕️',
  },
  {
    title: 'State-of-the-art Facilities',
    description: 'Latest medical technology and equipment for accurate diagnosis',
    icon: '🏥',
  },
  {
    title: '24/7 Emergency Services',
    description: 'Round-the-clock emergency department with specialized trauma care',
    icon: '🚑',
  },
  {
    title: 'Patient-Centric Care',
    description: 'Personalized treatment plans focused on your recovery',
    icon: '❤️',
  },
  {
    title: 'Affordable Healthcare',
    description: 'Transparent pricing with various insurance and payment options',
    icon: '💰',
  },
  {
    title: 'Accreditation & Certification',
    description: 'Joint Commission accredited with international quality standards',
    icon: '✅',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
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
            Why Choose BestCare Hospital?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine medical excellence with compassionate care to deliver the best
            possible outcomes for our patients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

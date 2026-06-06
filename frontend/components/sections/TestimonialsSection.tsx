'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Patient',
    message:
      'BestCare Hospital provided exceptional care during my heart surgery. The doctors were knowledgeable and the staff was very caring.',
    rating: 5,
    avatar: '👨',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    role: 'Patient',
    message:
      'I had an amazing experience at BestCare. The facilities are modern and the doctors explained everything clearly.',
    rating: 5,
    avatar: '👩',
  },
  {
    id: 3,
    name: 'Ahmed Hassan',
    role: 'Patient',
    message:
      'The emergency department responded quickly and professionally. I was very impressed with the level of care.',
    rating: 5,
    avatar: '👨',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
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
            Patient Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied patients about their experiences at BestCare Hospital.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card shadow="lg">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.message}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

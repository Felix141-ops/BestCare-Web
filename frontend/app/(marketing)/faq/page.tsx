'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';

const faqs = [
  {
    category: 'Appointments',
    items: [
      {
        question: 'How do I book an appointment?',
        answer:
          'You can book an appointment through our website using the appointment booking system, calling our main number, or visiting in person. We also offer online consultations.',
      },
      {
        question: 'Can I cancel or reschedule my appointment?',
        answer:
          'Yes, you can cancel or reschedule up to 24 hours before your appointment through your patient portal or by calling us.',
      },
      {
        question: 'What if I am running late?',
        answer:
          'Please call us as soon as possible if you will be late. We may not be able to accommodate you if you arrive more than 15 minutes late.',
      },
      {
        question: 'Do you offer emergency appointments?',
        answer:
          'Yes, we have emergency slots available for urgent medical conditions. Call our emergency hotline or visit the emergency department.',
      },
    ],
  },
  {
    category: 'Patient Information',
    items: [
      {
        question: 'What documents do I need to bring?',
        answer:
          'Please bring a valid ID, insurance card, and any relevant medical records or test results from other healthcare providers.',
      },
      {
        question: 'How do I access my medical records?',
        answer:
          'You can access your medical records through your patient portal, or request them by contacting our records department.',
      },
      {
        question: 'Is my information secure?',
        answer:
          'Yes, we comply with HIPAA regulations and use advanced security measures to protect your personal and medical information.',
      },
      {
        question: 'Can I bring a family member to my appointment?',
        answer:
          'Yes, you are welcome to bring a family member or guardian to your appointment for support.',
      },
    ],
  },
  {
    category: 'Billing & Insurance',
    items: [
      {
        question: 'Do you accept insurance?',
        answer:
          'Yes, we accept most major insurance plans. Please contact us to verify that your insurance is accepted.',
      },
      {
        question: 'What are your payment options?',
        answer:
          'We accept credit cards, debit cards, cash, and online payment transfers. Payment plans are available for large bills.',
      },
      {
        question: 'How can I get an itemized bill?',
        answer:
          'You can request an itemized bill through your patient portal or by contacting our billing department.',
      },
      {
        question: 'What is your cancellation policy?',
        answer:
          'Cancellations made 24 hours in advance are free. Cancellations within 24 hours may incur a fee.',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        question: 'What specialties do you offer?',
        answer:
          'We offer over 20 medical specialties including cardiology, orthopedics, pediatrics, neurology, and more.',
      },
      {
        question: 'Do you offer telemedicine?',
        answer:
          'Yes, we offer secure video consultations for many conditions. Ask your doctor if telemedicine is available for your visit.',
      },
      {
        question: 'What are your lab services?',
        answer:
          'We provide comprehensive laboratory testing including blood work, pathology, and diagnostic imaging services.',
      },
      {
        question: 'Do you have emergency services?',
        answer:
          'Yes, our 24/7 emergency department is fully equipped with trauma specialists and emergency medicine doctors.',
      },
    ],
  },
];

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600">
                Find answers to common questions about our services, appointments, and policies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 bg-white">
          <div className="container-max max-w-3xl">
            <div className="space-y-12">
              {faqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    {category.category}
                  </h2>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => {
                      const itemId = `${category.category}-${itemIndex}`;
                      const isExpanded = expandedItems.includes(itemId);

                      return (
                        <motion.div
                          key={itemId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card>
                            <button
                              onClick={() => toggleExpand(itemId)}
                              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-gray-900 text-lg">
                                  {item.question}
                                </h3>
                                <motion.svg
                                  className="w-6 h-6 text-medical-blue flex-shrink-0 ml-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                  />
                                </motion.svg>
                              </div>
                            </button>

                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: isExpanded ? 'auto' : 0,
                                opacity: isExpanded ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-blue-50 border-t border-gray-200">
          <div className="container-max max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Still have questions?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-medical-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-dark-blue transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

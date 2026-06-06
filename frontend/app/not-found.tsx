'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      <main>
        <section className="min-h-[60vh] flex items-center justify-center py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl"
          >
            {/* Animated 404 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-dark-blue mb-4">
                404
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h2>

              <p className="text-xl text-gray-600 mb-6">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>

              <p className="text-gray-500 mb-8">
                But don't worry! Our medical team is here to help you find what you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg">
                    Back to Home
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Quick Links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { href: '/', label: '🏠 Home' },
                  { href: '/appointments', label: '📅 Appointments' },
                  { href: '/doctors', label: '👨‍⚕️ Find Doctors' },
                  { href: '/services', label: '🏥 Services' },
                  { href: '/about', label: 'ℹ️ About Us' },
                  { href: '/contact', label: '📞 Contact' },
                ].map((link) => (
                  <Link key={link.href} href={link.href}>
                    <button className="w-full px-4 py-3 text-sm text-medical-blue hover:text-dark-blue hover:bg-blue-50 rounded-lg transition-all font-medium">
                      {link.label}
                    </button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

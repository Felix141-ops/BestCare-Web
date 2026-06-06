'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Input, Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dentistry', 'Oncology'];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: 15,
      rating: 4.9,
      fee: '$100',
      availability: true,
      languages: ['English', 'Spanish'],
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      experience: 12,
      rating: 4.8,
      fee: '$80',
      availability: true,
      languages: ['English', 'Mandarin'],
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      experience: 10,
      rating: 4.9,
      fee: '$70',
      availability: false,
      languages: ['English', 'Spanish'],
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Neurology',
      experience: 18,
      rating: 4.7,
      fee: '$120',
      availability: true,
      languages: ['English'],
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dentistry',
      experience: 8,
      rating: 4.8,
      fee: '$60',
      availability: true,
      languages: ['English', 'French'],
    },
    {
      id: 6,
      name: 'Dr. Robert Smith',
      specialty: 'Oncology',
      experience: 20,
      rating: 4.9,
      fee: '$150',
      availability: true,
      languages: ['English', 'German'],
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
                Find a Doctor
              </h1>
              <p className="text-lg text-gray-600">
                Browse our team of experienced healthcare professionals. Filter by
                specialty, availability, and ratings.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by doctor name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                />
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container-max">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredDoctors.length} Doctors Found
              </h2>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-4xl">👨‍⚕️</div>
                          {doctor.availability ? (
                            <Badge variant="success" size="sm">
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="error" size="sm">
                              Unavailable
                            </Badge>
                          )}
                        </div>

                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Rating */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Rating</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">⭐</span>
                            <span className="font-semibold">{doctor.rating}</span>
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Experience</span>
                          <span className="font-semibold">
                            {doctor.experience} years
                          </span>
                        </div>

                        {/* Fee */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Consultation Fee
                          </span>
                          <span className="font-semibold text-medical-blue">
                            {doctor.fee}
                          </span>
                        </div>

                        {/* Languages */}
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Languages</p>
                          <div className="flex flex-wrap gap-2">
                            {doctor.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" size="sm">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                          <Button
                            size="sm"
                            variant="outline"
                            fullWidth
                            onClick={() => {}}
                          >
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            fullWidth
                            onClick={() => {}}
                            disabled={!doctor.availability}
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600">
                  No doctors found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

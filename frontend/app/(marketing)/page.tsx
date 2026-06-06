'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/sections/HeroSection';
import DepartmentsSection from '@/components/sections/DepartmentsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import DoctorsSection from '@/components/sections/DoctorsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      {/* Main Content */}
      <main>
        <HeroSection />
        <DepartmentsSection />
        <WhyChooseUsSection />
        <DoctorsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

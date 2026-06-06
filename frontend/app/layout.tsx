import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import RootLayoutWrapper from './layout-wrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BestCare Hospital - Quality Healthcare Services',
  description:
    'Experience world-class healthcare at BestCare Hospital. Expert doctors, modern facilities, and patient-centric care.',
  keywords:
    'hospital, healthcare, doctors, appointments, medical care, bestcare',
  authors: [{ name: 'BestCare Hospital' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}

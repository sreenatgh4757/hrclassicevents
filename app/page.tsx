"use client";

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import StatsSection from '@/components/StatsSection';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import ReviewCarousel from '@/components/ReviewCarousel';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/couple-tradition.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback background image (shows if video fails) */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/fallback.jpg')" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-great-vibes text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gold mb-6 heading-glow"
            style={{ letterSpacing: '1px', lineHeight: '1.2' }}
          >
            Where Dreams Become Timeless Memories
          </motion.h1>

          {/* Decorative flourish */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-64 md:w-80 h-8 mb-8"
            viewBox="0 0 200 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 10 Q50 2, 100 10 T190 10" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx="100" cy="10" r="3" fill="#D4AF37"/>
            <circle cx="20" cy="10" r="2" fill="#D4AF37" opacity="0.5"/>
            <circle cx="180" cy="10" r="2" fill="#D4AF37" opacity="0.5"/>
          </motion.svg>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl font-poppins text-white/90"
            style={{ fontWeight: 300, letterSpacing: '0.5px', lineHeight: '1.6' }}
          >
            Exquisite event planning that transforms your vision into unforgettable experiences — from intimate celebrations to grand galas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-4"
          >
            <a
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-gold text-black font-poppins hover:bg-white hover:text-gold transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{ fontWeight: 500, letterSpacing: '0.2px' }}
            >
              Plan My Event
            </a>
          </motion.div>
        </div>
      </section>

      {/* Other sections */}
      <StatsSection />
      <ServicesGrid />
      <ProcessTimeline />
      <ReviewCarousel />
      <ContactForm />
      <Footer />
    </main>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { createBrowserClient } from '@/lib/supabase-browser';
import type { Review } from '@/lib/supabase';

export default function ReviewCarousel() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching reviews:', error);
          return;
        }

        setReviews(data || []);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!isPlaying || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, reviews.length]);

  const goToPrevious = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              What Our <span className="text-gold text-shimmer">Clients Say</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it — hear from the couples, companies, and families
              whose special moments we've helped create
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-pulse">
              <div className="h-64 bg-warm-gray/20 rounded" />
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
            What Our <span className="text-gold text-shimmer">Clients Say</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it — hear from the couples, companies, and families
            whose special moments we've helped create
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setIsPlaying(false)}
              onHoverEnd={() => setIsPlaying(true)}
            >
              <Card className="p-8 lg:p-12 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <div className="text-center">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className="text-gold fill-current"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-charcoal leading-relaxed mb-8 font-light italic">
                    "{reviews[currentReview].quote}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="border-t border-gold/20 pt-6">
                    <p className="text-lg font-semibold text-charcoal mb-1">
                      {reviews[currentReview].name}
                    </p>
                    <p className="text-gold font-medium mb-2">
                      {reviews[currentReview].event_type}
                    </p>
                    <p className="text-warm-gray">
                      {reviews[currentReview].event_date}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-16 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-16 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            aria-label="Next review"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentReview 
                  ? 'bg-gold scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
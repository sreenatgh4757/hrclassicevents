"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '@/config/site.config';

export default function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-charcoal mb-6">
            Our Signature <span className="text-gold">Process</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
            A proven approach that ensures every detail is perfect and every moment is memorable
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold to-gold transform -translate-y-1/2 z-10"></div>
              
              {siteConfig.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center relative z-20 bg-blush/30 px-4"
                >
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warm-gray text-center max-w-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {siteConfig.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-playfair font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
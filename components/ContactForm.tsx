"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactVideoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-ivory to-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <video
              src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/decor.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-2xl shadow-lg w-full h-[320px] object-cover"
            />
          </motion.div>

          {/* Right side - Text + Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-playfair font-bold text-charcoal mb-6">
              Your Dream Event, Planned to Perfection
            </h2>
            <p className="text-lg text-warm-gray mb-8 leading-relaxed">
              From the first idea to the last dance, HR Classic Events takes care 
              of every detail. Whether it’s an elegant wedding, a corporate gala, 
              or a private celebration, our expert planning ensures your special 
              day is stress-free, stunning, and unforgettable.
            </p>
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-lg"
            >
              <a href="/contact">Plan My Event</a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

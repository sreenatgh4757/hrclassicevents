"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Full Wedding Planning",
    description:
      "Comprehensive planning from start to finish, including design, logistics, and on-the-day coordination.",
    image: "/services/full-wedding.jpg",
  },
  {
    title: "Accompanied Planning",
    description:
      "Guidance and support throughout your planning journey, with expert advice along the way.",
    image: "/services/accompanied.jpg",
  },
  {
    title: "Wedding Management",
    description:
      "For couples who’ve planned their day but want professional management to ensure it runs seamlessly.",
    image: "/services/management.jpg",
  },
  {
    title: "Party Planning",
    description:
      "From birthdays to anniversaries, we bring creativity and organisation to make your celebration special.",
    image: "/services/party.jpg",
  },
  {
    title: "Planner’s Clinic",
    description:
      "One-to-one consultation sessions to guide you with expert tips and tailored recommendations.",
    image: "/services/clinic.jpg",
  },
  {
    title: "Corporate & Galas",
    description:
      "Professional events that impress your guests and reflect your brand’s vision.",
    image: "/services/corporate.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-charcoal mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            From weddings to private celebrations and corporate events, we craft
            unforgettable experiences tailored to you.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-60">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-charcoal mb-2">
                  {service.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

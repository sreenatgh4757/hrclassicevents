"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Gallery images
const galleryImages = [
  { src: "/gallery/photo1.jpg", alt: "Wedding ceremony in elegant venue" },
  { src: "/gallery/photo2.jpg", alt: "Destination wedding by the beach" },
  { src: "/gallery/photo3.jpg", alt: "Corporate gala dinner setup" },
  { src: "/gallery/photo4.jpg", alt: "Private celebration outdoor decor" },
  { src: "/gallery/photo5.jpg", alt: "Couple’s first dance with lights" },
  { src: "/gallery/photo6.jpg", alt: "Elegant table setup with flowers" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* ✅ Hero Section like Contact Page */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-charcoal mb-6">
              Our <span className="text-gold text-shimmer">Gallery</span>
            </h1>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Explore moments we’ve brought to life — from weddings and anniversaries
              to private celebrations and grand corporate functions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

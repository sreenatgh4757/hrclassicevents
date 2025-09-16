"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
    <section className="py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-purple-700 hover:text-gold font-semibold transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-playfair font-bold text-center text-charcoal mb-12"
        >
          Event <span className="text-gold">Gallery</span>
        </motion.h2>

        {/* Gallery Grid */}
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
    </section>
  );
}

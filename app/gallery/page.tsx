"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <>
      {/* HEADER */}
      <header className="bg-ivory shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <Image
              src="/logo.png"
              alt="HR Classic Events Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-charcoal">
              HR Classic Events
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <Link href="/" className="hover:text-gold">Home</Link>
            <Link href="/gallery" className="text-gold font-semibold">Gallery</Link>
            <Link href="/about" className="hover:text-gold">About</Link>
            <Link href="/contact" className="hover:text-gold">Contact</Link>
          </nav>

          {/* Button */}
          <Link
            href="/contact"
            className="bg-gold text-black px-5 py-2 rounded-full font-semibold hover:bg-gold/90 transition"
          >
            Check Availability
          </Link>
        </div>
      </header>

      {/* GALLERY CONTENT */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-playfair font-bold text-center text-charcoal mb-6"
          >
            Event <span className="text-gold">Gallery</span>
          </motion.h2>

          <p className="text-center text-warm-gray max-w-2xl mx-auto mb-12">
            Explore moments we’ve brought to life — from weddings and anniversaries 
            to private celebrations and grand corporate functions.
          </p>

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
    </>
  );
}

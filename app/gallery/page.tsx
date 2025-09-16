"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
    <main className="bg-ivory min-h-screen">
      {/* Page Heading */}
      <section className="py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-charcoal">
          Event <span className="text-gold">Gallery</span>
        </h1>
        <p className="mt-4 text-lg text-warm-gray max-w-2xl mx-auto">
          Explore moments we’ve brought to life — from weddings and anniversaries 
          to private celebrations and grand corporate functions.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
      </section>
    </main>
  );
}

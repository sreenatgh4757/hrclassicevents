"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryItems = [
  { type: "image", src: "/gallery/wedding1.jpg", alt: "Wedding ceremony in elegant venue" },
  { type: "image", src: "/gallery/beach-wedding.jpg", alt: "Destination wedding by the beach" },
  { type: "image", src: "/gallery/corporate1.jpg", alt: "Corporate gala dinner setup" },
  { type: "image", src: "/gallery/private1.jpg", alt: "Private celebration outdoor decor" },
  { type: "video", src: "/gallery/dance.mp4", alt: "Couple’s first dance with lights" },
  { type: "image", src: "/gallery/table.jpg", alt: "Elegant table setup with flowers" },
];

export default function GalleryPage() {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-playfair font-bold text-center text-charcoal mb-12"
        >
          Event <span className="text-gold">Gallery</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  className="w-full h-64 object-cover"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createBrowserClient } from "@/lib/supabase-browser";
import type { GalleryImage } from "@/lib/supabase";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching gallery images:', error);
          return;
        }

        setGalleryImages(data || []);
      } catch (error) {
        console.error('Error loading gallery:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);
  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* ✅ Hero Section */}
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

      {/* ✅ Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl shadow-lg bg-warm-gray/20 animate-pulse h-64"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

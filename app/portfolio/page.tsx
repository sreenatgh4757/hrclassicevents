"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const portfolioItems = [
  {
    id: 1,
    category: 'weddings',
    title: 'Elegant Garden Wedding',
    client: 'Sarah & Michael',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    brief: 'A romantic garden celebration for 150 guests with a focus on sustainable florals and locally-sourced catering.',
    scope: 'Full planning, venue sourcing, décor design, vendor coordination',
    highlights: 'Custom floral arch, vintage table settings, live acoustic entertainment',
    tags: ['#IntimateWedding', '#GardenParty', '#SustainableEvent'],
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    ]
  },
  {
    id: 2,
    category: 'corporate',
    title: 'Annual Awards Gala',
    client: 'TechForward Solutions',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    brief: 'A prestigious awards ceremony celebrating innovation, designed to inspire and recognise excellence in technology.',
    scope: 'Event concept, venue booking, AV production, catering management',
    highlights: 'LED backdrop, live streaming setup, three-course dining experience',
    tags: ['#CorporateGala', '#Awards', '#TechEvent'],
    images: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    ]
  },
  {
    id: 3,
    category: 'social',
    title: '50th Birthday Celebration',
    client: 'The Johnson Family',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    brief: 'A milestone birthday party celebrating five decades of life with family and friends in an intimate setting.',
    scope: 'Party planning, décor styling, entertainment coordination, catering',
    highlights: 'Memory wall display, live jazz trio, signature cocktail menu',
    tags: ['#MilestoneBirthday', '#FamilyGathering', '#JazzTheme'],
    images: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    ]
  },
  {
    id: 4,
    category: 'weddings',
    title: 'Luxury Manor Wedding',
    client: 'Emma & James',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    brief: 'An opulent three-day wedding celebration at a historic manor house, combining traditional elegance with modern luxury.',
    scope: 'Multi-day event coordination, accommodation management, full décor transformation',
    highlights: 'Historic venue transformation, multi-course banquet, evening entertainment',
    tags: ['#LuxuryWedding', '#HistoricVenue', '#MultiDay'],
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    ]
  },
  {
    id: 5,
    category: 'conferences',
    title: 'International Business Summit',
    client: 'Global Connect Conference',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    brief: 'A two-day international summit bringing together industry leaders for networking and knowledge sharing.',
    scope: 'Conference planning, speaker management, attendee experience, networking facilitation',
    highlights: 'Keynote presentations, breakout sessions, gala dinner, exhibition space',
    tags: ['#BusinessSummit', '#International', '#Networking'],
    images: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    ]
  },
  {
    id: 6,
    category: 'social',
    title: 'Anniversary Garden Party',
    client: 'Robert & Margaret',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    brief: 'A charming 25th anniversary celebration in a private garden setting with close family and friends.',
    scope: 'Intimate gathering planning, garden styling, catering coordination',
    highlights: 'Floral installations, outdoor dining setup, string lighting, live acoustic music',
    tags: ['#Anniversary', '#GardenParty', '#SilverJubilee'],
    images: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    ]
  }
];

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'weddings', name: 'Weddings' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'social', name: 'Social' },
  { id: 'conferences', name: 'Conferences' },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const openLightbox = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev + 1 >= selectedItem.images.length ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev - 1 < 0 ? selectedItem.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-charcoal mb-6">
              Our <span className="text-gold text-shimmer">Portfolio</span>
            </h1>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Discover the stories behind our most memorable events. Each celebration is unique, 
              crafted with attention to detail and a passion for creating extraordinary moments.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-2xl px-6 py-3 font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-gold text-charcoal hover:bg-gold/90'
                  : 'border-gold/30 text-warm-gray hover:border-gold hover:text-gold hover:bg-gold/5'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-xl font-playfair font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-3">
                      {item.client}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-6xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="lg:w-2/3 relative">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative">
                  <img
                    src={selectedItem.images[currentImageIndex]}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm"
                      >
                        <ChevronLeft size={24} className="text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm"
                      >
                        <ChevronRight size={24} className="text-white" />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {selectedItem.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/3 p-8 lg:overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-charcoal mb-2">
                      {selectedItem.title}
                    </h2>
                    <p className="text-gold font-medium">
                      {selectedItem.client}
                    </p>
                  </div>
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-full hover:bg-warm-gray/10 transition-colors duration-200"
                  >
                    <X size={24} className="text-warm-gray" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-playfair font-semibold text-charcoal mb-2">
                      Project Brief
                    </h3>
                    <p className="text-warm-gray leading-relaxed">
                      {selectedItem.brief}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-playfair font-semibold text-charcoal mb-2">
                      Our Scope
                    </h3>
                    <p className="text-warm-gray">
                      {selectedItem.scope}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-playfair font-semibold text-charcoal mb-2">
                      Key Highlights
                    </h3>
                    <p className="text-warm-gray">
                      {selectedItem.highlights}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-playfair font-semibold text-charcoal mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm bg-blush text-warm-gray px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
"use client";

import { motion } from 'framer-motion';
import { Award, Clock, Users, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const values = [
  {
    icon: Clock,
    title: 'Meticulous Logistics',
    description: 'Every detail planned and executed with precision timing and careful coordination.'
  },
  {
    icon: Award,
    title: 'Thoughtful Design',
    description: 'Creative concepts that reflect your unique style and create lasting memories.'
  },
  {
    icon: Users,
    title: 'Vendor Partnerships',
    description: 'Trusted relationships with the finest suppliers and venues across the UK.'
  },
  {
    icon: Shield,
    title: 'On-the-Day Excellence',
    description: 'Professional coordination ensuring flawless execution while you enjoy the moment.'
  }
];

const standards = [
  'Clear communication at every stage of planning',
  'Punctual delivery and reliable timeline management', 
  'Transparent pricing with no hidden costs',
  'Responsive support before, during, and after your event',
  'Sustainable practices and ethical vendor partnerships',
  'Continuous improvement based on client feedback'
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-allura text-gold mb-8 heading-glow" style={{ letterSpacing: '2px' }}>
              Elegance in Every Detail
            </h1>
            {/* Decorative flourish */}
            <svg className="w-48 h-6 mx-auto mb-6" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10 Q50 2, 100 10 T190 10" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6"/>
              <circle cx="100" cy="10" r="3" fill="#D4AF37"/>
              <circle cx="20" cy="10" r="2" fill="#D4AF37" opacity="0.5"/>
              <circle cx="180" cy="10" r="2" fill="#D4AF37" opacity="0.5"/>
            </svg>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              At HR Classic Events, we turn ideas into effortless, unforgettable moments.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-habib-hosseini-3650446.jpg"
                  alt="HR Classic Events team planning an elegant celebration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold p-6 rounded-2xl shadow-lg">
                <p className="text-charcoal font-bold text-2xl">12+</p>
                <p className="text-charcoal text-sm">Years Experience</p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-playfair text-gold mb-6 heading-glow" style={{ fontWeight: 700, letterSpacing: '2px' }}>
                Our Story
              </h2>
              
              <div className="space-y-6 text-warm-gray leading-relaxed">
                <p>
                  At HR Classic Events, we believe every occasion should feel effortless and extraordinary. 
                  From venue sourcing and décor to logistics and on-the-day coordination, we design and 
                  deliver events that reflect your style and story—so you can relax and enjoy the moment.
                </p>
                
                <p>
                  Our team blends creative vision with precision planning, ensuring that whether it's 
                  your wedding day, corporate function, or private celebration, every detail comes 
                  together seamlessly. We understand that behind every great event is meticulous 
                  preparation, thoughtful design, and flawless execution.
                </p>

                <p>
                  What sets us apart is our commitment to understanding your unique vision and 
                  translating it into reality. We don't just plan events—we craft experiences 
                  that leave lasting impressions on you and your guests, creating memories that 
                  will be treasured for years to come.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-playfair text-gold text-center mb-12 heading-glow" style={{ fontWeight: 700, letterSpacing: '2px' }}>
              What We Stand For
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 text-center h-full bg-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                      <div className="w-16 h-16 bg-blush rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent size={32} className="text-gold" />
                      </div>
                      <h3 className="text-xl font-great-vibes text-gold mb-3" style={{ letterSpacing: '1px' }}>
                        {value.title}
                      </h3>
                      <p className="text-warm-gray text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Standards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-playfair text-gold mb-6 heading-glow" style={{ fontWeight: 700, letterSpacing: '2px' }}>
                Our Standards
              </h2>
              
              <p className="text-warm-gray leading-relaxed mb-8">
                We hold ourselves to the highest standards of professionalism and excellence. 
                These principles guide every decision we make and every service we provide.
              </p>

              <div className="space-y-4">
                {standards.map((standard, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-warm-gray">{standard}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-bikareantalya-33979987.jpg"
                  alt="Professional event coordination"
                  className="aspect-square rounded-2xl object-cover"
                />
                <img
                  src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-nimblevideoproductions-3082764.jpg"
                  alt="Elegant event styling"
                  className="aspect-square rounded-2xl object-cover mt-8"
                />
                <img
                  src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-vikashkr50-27103969.jpg"
                  alt="Beautiful wedding setup"
                  className="aspect-square rounded-2xl object-cover -mt-4"
                />
                <img
                  src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-habib-hosseini-3650446.jpg"
                  alt="Corporate event excellence"
                  className="aspect-square rounded-2xl object-cover mt-4"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
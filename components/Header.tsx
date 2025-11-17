"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ✍️ Handwritten Signature Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="signature-logo-container"
            >
              <div className="signature-wrapper">
                <span className="hr-signature">HR</span>
                <span className="classic-signature">Classic Events</span>
                <svg className="signature-flourish" width="180" height="8" viewBox="0 0 180 8">
                  <motion.path
                    d="M 2 4 Q 45 1, 90 4 T 178 4"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-gold transition-colors duration-200 font-poppins"
                  style={{ fontWeight: 400, letterSpacing: '0.2px' }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block"
          >
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-charcoal font-poppins px-6 py-2 rounded-2xl transition-all duration-200 hover:shadow-lg"
              style={{ fontWeight: 500, letterSpacing: '0.2px' }}
            >
              <Link href="/contact">Plan My Event</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-gold transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allura&family=Great+Vibes&display=swap');

        .signature-logo-container {
          position: relative;
        }

        .signature-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: -8px;
        }

        .hr-signature {
          font-family: 'Allura', cursive;
          font-size: 56px;
          color: #D4AF37;
          font-weight: 400;
          line-height: 0.9;
          text-shadow: 2px 2px 6px rgba(212, 175, 55, 0.4);
          letter-spacing: 4px;
          transform: rotate(-2deg);
          display: block;
          margin-bottom: -12px;
        }

        .classic-signature {
          font-family: 'Great Vibes', cursive;
          font-size: 28px;
          color: #D4AF37;
          font-weight: 400;
          text-shadow: 1px 1px 4px rgba(212, 175, 55, 0.3);
          letter-spacing: 2px;
          margin-left: 8px;
          display: block;
        }

        .signature-flourish {
          position: absolute;
          bottom: -8px;
          left: 0;
          opacity: 0.7;
        }

        .signature-logo-container:hover .hr-signature,
        .signature-logo-container:hover .classic-signature {
          color: #FFD700;
          text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.6);
          transform: scale(1.03);
          transition: all 0.4s ease;
        }

        .signature-logo-container:hover .signature-flourish path {
          stroke: #FFD700;
          transition: all 0.4s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hr-signature {
            font-size: 42px;
          }
          
          .classic-signature {
            font-size: 22px;
          }

          .signature-flourish {
            width: 140px;
          }
        }
      `}</style>
    </header>
  );
}
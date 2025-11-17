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
          {/* ✍️ Handwritten Signature Logo - Side by Side */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            {/* Elegant Logo Icon */}
            <motion.div
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 lg:w-12 lg:h-12"
              >
                {/* Outer decorative circle */}
                <circle
                  cx="25"
                  cy="25"
                  r="23"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.4"
                />
                
                {/* Inner circle */}
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Elegant HR in script style */}
                <path
                  d="M15 16 Q15 25, 15 34 M15 25 L22 25 M22 16 Q22 25, 22 34"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* R with elegant flourish */}
                <path
                  d="M28 16 L28 34 M28 16 L34 16 Q36 16, 36 19 Q36 22, 34 22 L28 22 M33 22 Q36 28, 36 34"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Decorative stars */}
                <circle cx="25" cy="8" r="1.5" fill="#D4AF37" opacity="0.8" />
                <circle cx="25" cy="42" r="1.5" fill="#D4AF37" opacity="0.8" />
                <circle cx="8" cy="25" r="1" fill="#D4AF37" opacity="0.6" />
                <circle cx="42" cy="25" r="1" fill="#D4AF37" opacity="0.6" />
              </svg>
            </motion.div>

            {/* Side by Side Signature Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="signature-text-container"
            >
              <div className="signature-horizontal">
                <span className="hr-text">HR</span>
                <span className="classic-text">Classic Events</span>
              </div>
              {/* Elegant underline flourish */}
              <svg className="signature-line" width="220" height="6" viewBox="0 0 220 6">
                <motion.path
                  d="M 2 3 Q 55 1, 110 3 T 218 3"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </svg>
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
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Great+Vibes&family=Tangerine:wght@700&display=swap');

        .signature-text-container {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .signature-horizontal {
          display: flex;
          align-items: baseline;
          gap: 8px;
          line-height: 1;
        }

        .hr-text {
          font-family: 'Allura', cursive;
          font-size: 48px;
          color: #D4AF37;
          font-weight: 400;
          text-shadow: 2px 2px 6px rgba(212, 175, 55, 0.4);
          letter-spacing: 3px;
        }

        .classic-text {
          font-family: 'Great Vibes', cursive;
          font-size: 32px;
          color: #D4AF37;
          font-weight: 400;
          text-shadow: 1px 1px 4px rgba(212, 175, 55, 0.3);
          letter-spacing: 1px;
        }

        .signature-line {
          margin-top: -4px;
          margin-left: 2px;
        }

        .signature-text-container:hover .hr-text,
        .signature-text-container:hover .classic-text {
          color: #FFD700;
          text-shadow: 2px 2px 10px rgba(255, 215, 0, 0.7);
          transition: all 0.4s ease;
        }

        .signature-text-container:hover .signature-line path {
          stroke: #FFD700;
          opacity: 0.9;
          transition: all 0.4s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .hr-text {
            font-size: 40px;
          }
          
          .classic-text {
            font-size: 28px;
          }

          .signature-line {
            width: 180px;
          }
        }

        @media (max-width: 768px) {
          .hr-text {
            font-size: 36px;
          }
          
          .classic-text {
            font-size: 24px;
          }

          .signature-line {
            width: 160px;
          }
        }
      `}</style>
    </header>
  );
}
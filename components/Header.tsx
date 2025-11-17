"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Sparkle positions for random animation
const sparkles = [
  { x: 5, y: 5, delay: 0 },
  { x: 45, y: 10, delay: 0.3 },
  { x: 25, y: 45, delay: 0.6 },
  { x: 60, y: 35, delay: 0.9 },
  { x: 15, y: 55, delay: 1.2 },
  { x: 50, y: 5, delay: 1.5 },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl text-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 🔥 2026 TREND LOGO - Handwritten + Animated + Sparkles */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-4 group">
            
            {/* ✨ Animated Logo Icon with Sparkles */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring" 
              }}
            >
              <div className="logo-wrapper">
                {/* Main Logo SVG */}
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="logo-svg"
                >
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                    
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Animated rotating outer ring */}
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="url(#goldGradient)"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.3"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />

                  {/* Decorative hexagon */}
                  <motion.path
                    d="M30 8 L44 16 L44 32 L30 40 L16 32 L16 16 Z"
                    stroke="url(#goldGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />

                  {/* Handwritten HR in center */}
                  <motion.path
                    d="M20 20 Q20 30, 20 38 M20 29 L28 29 M28 20 Q28 30, 28 38"
                    stroke="url(#goldGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />

                  <motion.path
                    d="M32 20 L32 38 M32 20 L39 20 Q41 20, 41 23 Q41 26, 39 26 L32 26 M38 26 Q41 32, 41 38"
                    stroke="url(#goldGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />

                  {/* Decorative corner elements */}
                  <circle cx="30" cy="6" r="1.5" fill="url(#goldGradient)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="30" cy="54" r="1.5" fill="url(#goldGradient)">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </svg>

                {/* ✨ Floating Sparkles */}
                {sparkles.map((sparkle, index) => (
                  <motion.div
                    key={index}
                    className="sparkle"
                    style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: sparkle.delay,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}

                {/* Glowing ring on hover */}
                <motion.div
                  className="glow-ring"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.2, opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* 🎨 Handwritten Signature Text - Side by Side */}
            <motion.div
              className="signature-container"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="signature-text">
                <motion.span 
                  className="hr-signature"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  HR
                </motion.span>
                <motion.span 
                  className="classic-signature"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  Classic Events
                </motion.span>
              </div>
              
              {/* Animated elegant underline */}
              <svg className="signature-underline" width="240" height="8" viewBox="0 0 240 8">
                <motion.path
                  d="M 5 4 Q 60 2, 120 4 T 235 4"
                  stroke="url(#goldGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                {/* Small decorative dots */}
                <motion.circle 
                  cx="5" cy="4" r="2" 
                  fill="#D4AF37"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 }}
                />
                <motion.circle 
                  cx="235" cy="4" r="2" 
                  fill="#D4AF37"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 }}
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
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-gold transition-colors duration-200 font-poppins relative group"
                  style={{ fontWeight: 400, letterSpacing: '0.2px' }}
                >
                  {item.name}
                  <span className="nav-underline"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="hidden lg:block"
          >
            <Button
              asChild
              className="cta-button"
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
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Great+Vibes&family=Alex+Brush&family=Tangerine:wght@700&display=swap');

        /* Logo Container */
        .logo-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .logo-svg {
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
          transition: all 0.4s ease;
        }

        .logo-wrapper:hover .logo-svg {
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
          transform: scale(1.1);
        }

        /* Sparkles */
        .sparkle {
          position: absolute;
          font-size: 12px;
          pointer-events: none;
          filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.8));
        }

        /* Glow Ring */
        .glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
        }

        /* Signature Container */
        .signature-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: -5px;
        }

        .signature-text {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .hr-signature {
          font-family: 'Alex Brush', cursive;
          font-size: 52px;
          background: linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 400;
          letter-spacing: 3px;
          filter: drop-shadow(2px 2px 4px rgba(212, 175, 55, 0.3));
          transform: rotate(-3deg);
          display: inline-block;
        }

        .classic-signature {
          font-family: 'Great Vibes', cursive;
          font-size: 36px;
          background: linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 400;
          letter-spacing: 2px;
          filter: drop-shadow(1px 1px 3px rgba(212, 175, 55, 0.3));
        }

        .signature-underline {
          margin-top: -6px;
          filter: drop-shadow(0 0 3px rgba(212, 175, 55, 0.4));
        }

        /* Hover Effects */
        .signature-container:hover .hr-signature,
        .signature-container:hover .classic-signature {
          filter: drop-shadow(2px 2px 12px rgba(255, 215, 0, 0.8));
          transform: scale(1.02);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Navigation Underline Effect */
        .nav-underline {
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #FFD700, #D4AF37);
          transition: width 0.3s ease;
        }

        a:hover .nav-underline {
          width: 100%;
        }

        /* CTA Button */
        .cta-button {
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%);
          background-size: 200% 200%;
          color: #000;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 25px;
          border: none;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
          transition: all 0.4s ease;
          letter-spacing: 0.5px;
          animation: gradientShift 3s ease infinite;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 215, 0, 0.6);
          background-position: 100% 0;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hr-signature {
            font-size: 44px;
          }
          .classic-signature {
            font-size: 30px;
          }
          .signature-underline {
            width: 200px;
          }
        }

        @media (max-width: 768px) {
          .logo-wrapper {
            width: 50px;
            height: 50px;
          }
          .hr-signature {
            font-size: 38px;
          }
          .classic-signature {
            font-size: 26px;
          }
          .signature-underline {
            width: 180px;
          }
        }
      `}</style>
    </header>
  );
}
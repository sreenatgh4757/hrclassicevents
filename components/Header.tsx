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
  const [text, setText] = useState("");
  const fullText = "HR Classic Events";

  // ⌨️ Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ✅ Animated Logo + Brand Name */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            {/* Logo SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 lg:w-12 lg:h-12"
              >
                {/* Elegant Crown Icon */}
                <path
                  d="M8 18L12 28H36L40 18L32 24L24 14L16 24L8 18Z"
                  fill="#D4AF37"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 28H38V32C38 33.1046 37.1046 34 36 34H12C10.8954 34 10 33.1046 10 32V28Z"
                  fill="#D4AF37"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Decorative Gems */}
                <circle cx="16" cy="24" r="1.5" fill="#1a1a1a" />
                <circle cx="24" cy="20" r="1.5" fill="#1a1a1a" />
                <circle cx="32" cy="24" r="1.5" fill="#1a1a1a" />
                {/* Elegant Flourish */}
                <path
                  d="M14 34C14 34 16 36 18 36"
                  stroke="#1a1a1a"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M34 34C34 34 32 36 30 36"
                  stroke="#1a1a1a"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Brand Name */}
            <motion.span
              className="text-2xl lg:text-3xl font-playfair font-bold text-gold whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {text}
            </motion.span>
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
                  className="text-white hover:text-gold transition-colors duration-200 font-medium"
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
              className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-2 rounded-2xl transition-all duration-200 hover:shadow-lg"
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
    </header>
  );
}

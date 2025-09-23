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
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = "HR Classic Events";
  const typingSpeed = isDeleting ? 80 : 120;
  const pauseTime = 1500; // pause before deleting

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && text === fullText) {
      // pause at end
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      // restart typing
      setIsDeleting(false);
    } else {
      timer = setTimeout(() => {
        setText(
          isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ✅ Animated Logo Name */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <motion.span
              className="text-2xl lg:text-3xl font-playfair font-bold text-gold whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {text}
              <span className="border-r-2 border-gold ml-1 animate-pulse"></span>
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-ivory shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-charcoal">
          HR Classic Events
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-gold transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Plan My Event button */}
          <Link
            href="/contact"
            className="ml-6 px-5 py-2 rounded-full bg-gold text-charcoal font-semibold hover:bg-gold/90 transition"
          >
            Plan My Event
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-charcoal"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-ivory px-6 pb-6 space-y-4 text-lg"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block hover:text-gold transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Plan My Event button for mobile */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-5 py-2 rounded-full bg-gold text-charcoal font-semibold hover:bg-gold/90 transition"
          >
            Plan My Event
          </Link>
        </motion.nav>
      )}
    </header>
  );
}

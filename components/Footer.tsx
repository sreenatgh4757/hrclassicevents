"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/20">
        
        {/* Company Info */}
        <div className="sm:col-span-2">
          <h3 className="text-2xl font-playfair font-bold mb-4">
            HR Classic Events
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
            We believe every occasion should feel effortless and extraordinary. 
            From elegant UK venues to breathtaking destination weddings abroad, 
            we design and deliver events that reflect your style and story.
          </p>
          <div className="flex space-x-5">
            <a href="https://instagram.com/hrclassicevents" target="_blank" className="hover:text-gold">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com/hrclassicevents" target="_blank" className="hover:text-gold">
              <Facebook size={20} />
            </a>
            <a href="https://linkedin.com/company/hrclassicevents" target="_blank" className="hover:text-gold">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gold">Services</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>Weddings</li>
            <li>Corporate Events</li>
            <li>Private Celebrations</li>
            <li>Venue Sourcing</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gold">Contact</h4>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-center space-x-2">
              <Phone size={16} /> <span>+44 7909067857</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} /> <span>Afusatsaka@hrclassicevents.co.uk</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={16} /> <span>Bournemouth, UK</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs sm:text-sm text-gray-400 py-6">
        © 2024 HR Classic Events. All rights reserved. Crafted with care in the UK 🇬🇧
      </div>
    </footer>
  );
}

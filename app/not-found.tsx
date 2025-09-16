"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/notfound-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Foreground content */}
      <div className="relative z-10 text-center max-w-md text-white">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="HR Classic Events Logo"
            width={80}
            height={80}
            className="object-contain opacity-80"
          />
        </div>
        
        <h1 className="text-8xl font-playfair font-bold text-gold mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-playfair font-bold text-ivory mb-4">
          Page Not Found
        </h2>
        
        <p className="text-warm-gray mb-8 leading-relaxed">
          We couldn't find the page you're looking for. Perhaps it's been moved, 
          or you've stumbled upon a link that's no longer active.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-lg"
          >
            <Link href="/">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-gold/30 text-warm-gray hover:border-gold hover:text-gold px-6 py-3 rounded-2xl transition-all duration-200"
          >
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-warm-gray/70 text-sm">
            Need help planning an event?
          </p>
          <Link 
            href="/contact" 
            className="text-gold hover:underline font-medium"
          >
            Let's chat about your vision
          </Link>
        </div>
      </div>
    </div>
  );
}

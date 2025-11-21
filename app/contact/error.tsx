"use client";

import { useEffect } from 'react';
import { TriangleAlert as AlertTriangle, RefreshCw, Chrome as Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Contact page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-playfair font-bold text-charcoal mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-warm-gray mb-8 leading-relaxed">
          We're having trouble loading the contact page. This might be a temporary issue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-lg"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-gold/30 text-warm-gray hover:border-gold hover:text-gold px-6 py-3 rounded-2xl transition-all duration-200"
          >
            <Link href="/">
              <Home size={18} className="mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-warm-gray/70 text-sm mb-2">
            Still having issues? Contact us directly:
          </p>
          <a
            href="mailto:info@hrclassicevents.com"
            className="text-gold hover:underline font-medium"
          >
            info@hrclassicevents.com
          </a>
        </div>
      </div>
    </div>
  );
}
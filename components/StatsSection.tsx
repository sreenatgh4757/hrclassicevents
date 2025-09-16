"use client";

import { siteConfig } from "@/config/site.config";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-charcoal to-charcoal/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
            We Create <span className="text-gold text-shimmer">Experiences</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Years of expertise delivering unforgettable events across the UK
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="relative">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-playfair font-bold text-gold mb-4">
                  <AnimatedCounter end={stat.value} />
                  {stat.label.includes("Years") && "+"}
                </div>
              </div>
              <p className="text-lg text-white/90 font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

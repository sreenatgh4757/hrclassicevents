import Header from '@/components/Header';
import StatsSection from '@/components/StatsSection';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import ReviewCarousel from '@/components/ReviewCarousel';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/couple-tradition.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback background image (shows if video fails) */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/fallback.jpg')" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="flex items-baseline justify-center gap-2 mb-8">
            <span className="font-allura text-5xl md:text-6xl lg:text-7xl text-gold heading-glow" style={{ letterSpacing: '1px' }}>HR</span>
            <span className="font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gold heading-glow" style={{ letterSpacing: '1px' }}>Classic Events</span>
          </h1>
          {/* Decorative flourish */}
          <svg className="w-64 h-8 mb-6" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 Q50 2, 100 10 T190 10" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx="100" cy="10" r="3" fill="#D4AF37"/>
            <circle cx="20" cy="10" r="2" fill="#D4AF37" opacity="0.5"/>
            <circle cx="180" cy="10" r="2" fill="#D4AF37" opacity="0.5"/>
          </svg>
          <p className="text-lg md:text-xl mb-6 max-w-2xl font-poppins" style={{ fontWeight: 400, letterSpacing: '0.2px' }}>
            We make your celebrations unforgettable — weddings, corporate
            functions, conferences, and private events.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-gold text-black font-poppins hover:bg-white hover:text-gold transition"
              style={{ fontWeight: 500, letterSpacing: '0.2px' }}
            >
              Plan My Event
            </a>
          </div>
        </div>
      </section>

      {/* Other sections */}
      <StatsSection />
      <ServicesGrid />
      <ProcessTimeline />
      <ReviewCarousel />
      <ContactForm />
      <Footer />
    </main>
  );
}

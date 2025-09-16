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
          <source src="/couple-tradition.mp4" type="video/mp4" />
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            HR Classic Events
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            We make your celebrations unforgettable — weddings, corporate
            functions, conferences, and private events.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-gold text-black font-semibold hover:bg-white hover:text-gold transition"
            >
              Plan My Event
            </a>
            <a
              href="/portfolio"
              className="px-6 py-3 rounded-2xl border border-white font-semibold hover:bg-white hover:text-black transition"
            >
              View Portfolio
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

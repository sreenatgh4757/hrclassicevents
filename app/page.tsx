import Header from '@/components/Header';
import HeroVideo from '@/components/HeroVideo';
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
        <HeroVideo
          videoSrc="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/couple-tradition.mp4"
          posterSrc="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/couple-tradition-poster.jpg"
          fallbackSrc="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/couple-tradition-poster.jpg"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-playfair text-gold mb-4" style={{ fontWeight: 700, letterSpacing: '0.3px' }}>
            HR Classic Events
          </h1>
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

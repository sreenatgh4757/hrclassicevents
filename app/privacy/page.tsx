import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-charcoal mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-warm-gray leading-relaxed mb-6">
              This privacy policy explains how HR Classic Events collects, uses, and protects 
              your personal information when you use our services or website.
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-warm-gray text-center">
                Privacy policy content will be added here.
                <br />
                Please contact us at{' '}
                <a href="mailto:hello@hrclassicevents.co.uk" className="text-gold hover:underline">
                  hello@hrclassicevents.co.uk
                </a>
                {' '}for any privacy-related questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
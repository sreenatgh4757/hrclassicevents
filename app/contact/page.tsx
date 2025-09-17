"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { siteConfig } from '@/config/site.config';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    description: 'Speak directly with our planning team',
    contact: siteConfig.phone,
    action: `tel:${siteConfig.phone}`,
    available: 'Monday - Friday, 9am - 6pm'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us your detailed requirements',
    contact: siteConfig.email,
    action: `mailto:${siteConfig.email}`,
    available: 'Response within 24 hours'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Quick chat for immediate questions',
    contact: 'WhatsApp Business',
    action: `https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '')}`,
    available: 'Quick response during business hours'
  }
];

const eventTypes = [
  "Wedding & Reception",
  "Corporate Function & Gala", 
  "Conference & Exhibition",
  "Private Celebration",
  "Venue Sourcing Only",
  "Other"
];

const budgetRanges = [
  "Under £5,000",
  "£5,000 - £15,000",
  "£15,000 - £30,000", 
  "£30,000 - £50,000",
  "£50,000+",
  "Prefer to discuss"
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  venue: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    venue: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Contact form submission:', formData);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        venue: '',
        message: ''
      });
      setShowSuccess(false);
    }, 4000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-charcoal mb-6">
              Let's Create Something <span className="text-gold text-shimmer">Extraordinary</span>
            </h1>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Ready to start planning your perfect event? We're here to listen, advise, and bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center bg-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                  <a href={method.action} className="block">
                    <div className="w-16 h-16 bg-blush rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                      <IconComponent size={32} className="text-gold" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold text-charcoal mb-2">
                      {method.title}
                    </h3>
                    <p className="text-warm-gray mb-3">{method.description}</p>
                    <p className="text-gold font-medium mb-2">{method.contact}</p>
                    <p className="text-sm text-warm-gray/70">{method.available}</p>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Form Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-white shadow-xl border-0">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-6">
              Tell Us About Your Event
            </h2>

            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <CheckCircle size={64} className="text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-charcoal mb-2">
                  Thank You!
                </h3>
                <p className="text-warm-gray mb-4">
                  We've received your detailed inquiry and will be in touch within 24 hours with a tailored proposal.
                </p>
                <p className="text-sm text-warm-gray">
                  In the meantime, feel free to call us at {siteConfig.phone} for immediate assistance.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-charcoal font-medium mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`${errors.name ? 'border-red-500' : 'border-warm-gray/30'} focus:border-gold transition-colors duration-200`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-charcoal font-medium mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`${errors.email ? 'border-red-500' : 'border-warm-gray/30'} focus:border-gold transition-colors duration-200`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-charcoal font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-warm-gray/30 focus:border-gold transition-colors duration-200"
                    placeholder="Your phone number"
                  />
                </div>

                {/* Event Details */}
                <div className="border-t border-warm-gray/20 pt-6">
                  <h3 className="text-lg font-playfair font-semibold text-charcoal mb-4">
                    Event Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label className="text-charcoal font-medium mb-2 block">
                        Event Type *
                      </Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) => handleInputChange('eventType', value)}
                      >
                        <SelectTrigger className={`${errors.eventType ? 'border-red-500' : 'border-warm-gray/30'} focus:border-gold transition-colors duration-200`}>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
                    </div>
                    <div>
                      <Label htmlFor="eventDate" className="text-charcoal font-medium mb-2 block">
                        Event Date *
                      </Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        className={`${errors.eventDate ? 'border-red-500' : 'border-warm-gray/30'} focus:border-gold transition-colors duration-200`}
                      />
                      {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="guestCount" className="text-charcoal font-medium mb-2 block">
                        Expected Guest Count
                      </Label>
                      <Input
                        id="guestCount"
                        value={formData.guestCount}
                        onChange={(e) => handleInputChange('guestCount', e.target.value)}
                        className="border-warm-gray/30 focus:border-gold transition-colors duration-200"
                        placeholder="Approximate number"
                      />
                    </div>
                    <div>
                      <Label className="text-charcoal font-medium mb-2 block">
                        Budget Range
                      </Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange('budget', value)}
                      >
                        <SelectTrigger className="border-warm-gray/30 focus:border-gold transition-colors duration-200">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="venue" className="text-charcoal font-medium mb-2 block">
                      Preferred Venue or Location
                    </Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                      className="border-warm-gray/30 focus:border-gold transition-colors duration-200"
                      placeholder="Venue name, location, or 'Need venue sourcing'"
                    />
                  </div>
                </div>

                {/* Vision */}
                <div>
                  <Label htmlFor="message" className="text-charcoal font-medium mb-2 block">
                    Tell Us About Your Vision
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className="border-warm-gray/30 focus:border-gold transition-colors duration-200"
                    placeholder="Share your event vision, style preferences, any specific requirements, or questions you have for us..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

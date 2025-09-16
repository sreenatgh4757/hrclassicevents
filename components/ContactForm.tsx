"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Calendar, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface FormData {
  name: string;
  email: string;
  eventType: string;
  preferredDate: string;
  message: string;
}

// Build event types dynamically from siteConfig
const eventTypes = siteConfig.services.map((service) => service.title).concat("Other");

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    eventType: '',
    preferredDate: '',
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
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate API
    console.log('Form submission:', formData);

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setFormData({ name: '', email: '', eventType: '', preferredDate: '', message: '' });
      setShowSuccess(false);
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (showSuccess) {
    return (
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
        <p className="text-warm-gray">
          We've received your inquiry and will be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-ivory to-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-playfair font-bold text-charcoal mb-6">
              Let's Plan Your Perfect Event
            </h2>
            <p className="text-lg text-warm-gray mb-8">
              Share your vision with us, and we'll create a tailored proposal that brings your event to life. 
              From intimate celebrations to grand occasions, we're here to make it extraordinary.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gold mr-3" />
                <span className="text-charcoal">Free consultation within 24 hours</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-gold mr-3" />
                <span className="text-charcoal">Tailored proposals for your budget</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-gold mr-3" />
                <span className="text-charcoal">No obligation, just great ideas</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-lg border-0 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-charcoal font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-charcoal font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="eventType" className="text-charcoal font-medium">
                    Event Type *
                  </Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                    <SelectTrigger className={`mt-1 ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}>
                      <SelectValue placeholder="Select your event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="preferredDate" className="text-charcoal font-medium">
                    Preferred Date *
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    className={`mt-1 ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-charcoal font-medium">
                    Tell us about your event
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-1 border-gray-300 min-h-[120px]"
                    placeholder="Share your vision, guest count, venue preferences, or any special requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold py-3 px-6 rounded-2xl transition-all duration-200 hover:shadow-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send My Inquiry'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
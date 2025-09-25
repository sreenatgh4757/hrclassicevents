"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site.config";

// Contact methods
const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    description: "Speak directly with our planning team",
    contact: siteConfig.phone,
    action: `tel:${siteConfig.phone}`,
    available: "Monday - Friday, 9am - 6pm",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us your detailed requirements",
    contact: siteConfig.email,
    action: `mailto:${siteConfig.email}`,
    available: "Response within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick chat for immediate questions",
    contact: "WhatsApp Business",
    action: `https://wa.me/${siteConfig.whatsapp.replace(/\s/g, "")}`,
    available: "Quick response during business hours",
  },
];

// Event types
const eventTypes = [
  "Wedding & Reception",
  "Corporate Function & Gala",
  "Conference & Exhibition",
  "Private Celebration",
  "Venue Sourcing Only",
  "Other",
];

// Budget ranges
const budgetRanges = [
  "Under £5,000",
  "£5,000 - £15,000",
  "£15,000 - £30,000",
  "£30,000 - £50,000",
  "£50,000+",
  "Prefer to discuss",
];

// Guest count ranges
const guestCounts = [
  "Less than 50",
  "50 - 100",
  "100 - 200",
  "200 - 500",
  "500+",
];

// Locations dropdown
const locations = [
  { group: "Europe", items: ["United Kingdom", "France", "Germany", "Italy", "Spain"] },
  { group: "Africa", items: ["Nigeria", "South Africa", "Kenya", "Egypt"] },
  { group: "North America", items: ["Canada", "USA", "Ireland"] },
  { group: "Asia", items: ["India"] },
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
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    venue: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Enhanced validation
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (formData.name?.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.eventType) newErrors.eventType = "Please select an event type";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    
    // Validate future date
    const selectedDate = new Date(formData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.eventDate = "Event date must be in the future";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Replace with your actual form submission logic
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          guestCount: "",
          budget: "",
          venue: "",
          message: "",
        });
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error state
      setErrors({ email: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero with Background */}
      <section
        className="pt-32 pb-20 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/ChatGPT+Image+Sep+23%2C+2025%2C+11_35_48+AM.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6">
              Let's Create Something <span className="text-gold text-shimmer">Extraordinary</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Ready to start planning your perfect event? We're here to listen, advise, and bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card
                key={method.title}
                className="p-6 text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={method.action} className="block">
                  <div className="w-16 h-16 bg-blush rounded-2xl flex items-center justify-center mx-auto mb-4">
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
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Card className="p-8 bg-white shadow-xl border-0">
          <h2 className="text-3xl font-playfair font-bold text-charcoal mb-6 text-center">
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
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              {/* Event Type + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => handleInputChange("eventType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType}</p>}
                </div>
                <div>
                  <Label>Event Date *</Label>
                  <Input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.eventDate ? "border-red-500" : ""}
                  />
                  {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
                </div>
              </div>

              {/* Guest Count + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Expected Guest Count</Label>
                  <Select
                    value={formData.guestCount}
                    onValueChange={(value) => handleInputChange("guestCount", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select guest count" />
                    </SelectTrigger>
                    <SelectContent>
                      {guestCounts.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Budget Range</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => handleInputChange("budget", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div>
                <Label>Preferred Venue or Location</Label>
                <Select
                  value={formData.venue}
                  onValueChange={(value) => handleInputChange("venue", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((group) => (
                      <>
                        <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                          {group.group}
                        </div>
                        {group.items.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <Label>Tell Us About Your Vision</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  placeholder="Share your event vision, style preferences, any specific requirements..."
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Sending Your Inquiry..." : "Send Detailed Inquiry"}
              </Button>
            </form>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
}

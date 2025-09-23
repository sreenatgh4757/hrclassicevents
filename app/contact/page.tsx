"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
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

const eventTypes = [
  "Wedding & Reception",
  "Corporate Function & Gala",
  "Conference & Exhibition",
  "Private Celebration",
  "Venue Sourcing Only",
  "Other",
];

const budgetRanges = [
  "Under £5,000",
  "£5,000 - £15,000",
  "£15,000 - £30,000",
  "£30,000 - £50,000",
  "£50,000+",
  "Prefer to discuss",
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.eventType) newErrors.eventType = "Please select an event type";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submission:", formData);
    setIsSubmitting(false);
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
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* ✅ Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/ChatGPT+Image+Sep+23%2C+2025%2C+11_35_48+AM.png"
          alt="Beach background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ✅ Foreground Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-6">
              Let's Create Something{" "}
              <span className="text-gold text-shimmer">Extraordinary</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Ready to start planning your perfect event? We're here to listen,
              advise, and bring your vision to life.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ✅ Contact Form Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Card className="p-8 bg-white/95 shadow-xl border-0">
          <h2 className="text-3xl font-playfair font-bold text-charcoal mb-6 text-center">
            Tell Us About Your Event
          </h2>

          {showSuccess ? (
            <motion.div className="text-center py-12">
              <CheckCircle size={64} className="text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Thank You!</h3>
              <p>We've received your detailed inquiry and will respond soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) =>
                      handleInputChange("eventType", value)
                    }
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
                  {errors.eventType && (
                    <p className="text-red-500">{errors.eventType}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      handleInputChange("eventDate", e.target.value)
                    }
                  />
                  {errors.eventDate && (
                    <p className="text-red-500">{errors.eventDate}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="guestCount">Expected Guest Count</Label>
                  <Input
                    id="guestCount"
                    value={formData.guestCount}
                    onChange={(e) =>
                      handleInputChange("guestCount", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Budget Range</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      handleInputChange("budget", value)
                    }
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

              <div>
                <Label htmlFor="venue">Preferred Venue or Location</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="message">Tell Us About Your Vision</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-charcoal py-4 rounded-2xl font-semibold"
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

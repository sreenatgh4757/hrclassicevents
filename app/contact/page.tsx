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
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero Section with Background */}
      <section
        className="pt-32 pb-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/ChatGPT+Image+Sep+23%2C+2025%2C+11_35_48+AM.png')",
        }}
      >
        {/* Overlay to make text/cards readable */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
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
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-16 relative z-10">
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
                    <p className="text-warm-gray mb-3">
                      {method.description}
                    </p>
                    <p className="text-gold font-medium mb-2">
                      {method.contact}
                    </p>
                    <p className="text-sm text-warm-gray/70">
                      {method.available}
                    </p>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Form */}
        <Card className="p-8 bg-white shadow-xl border-0">
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
              {/* Form Fields (same as before) */}
              ...
            </form>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Weddings",
    description:
      "Whether in the UK or abroad, we plan elegant and stress-free weddings that capture your story and style. From décor to coordination, every detail is handled with care.",
    media: "/pictures/pexels-masoodaslami-29624029.jpg", // static image
    media: "https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-masoodaslami-29624029.jpg", // static image
    type: "image",
  },
  {
    title: "Corporate Functions & Galas",
    description:
      "Delivering polished and memorable corporate events that strengthen relationships, showcase achievements, and leave a lasting impact on clients and colleagues.",
    media: "/pictures/pexels-pavel-danilyuk-6405757.jpg", // static image
    media: "https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-pavel-danilyuk-6405757.jpg", // static image
    type: "image",
  },
  {
    title: "Private Celebrations",
    description:
      "From milestone birthdays to anniversaries, we bring creativity and personal touches that make your special day unforgettable for you and your guests.",
    media: "/pictures/pexels-boko-shots-812604874-33854722.jpg", // static image
    media: "https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-boko-shots-812604874-33854722.jpg", // static image
    type: "image",
  },
  {
    title: "Event Coordination",
    description:
      "Professional coordination and management ensuring your event runs seamlessly from start to finish, allowing you to enjoy every moment.",
    media: "/pictures/pexels-asadphoto-169189.jpg",
    media: "https://s3.eu-west-2.amazonaws.com/www.hrclassicevents.com/assets/pexels-asadphoto-169189.jpg",
    type: "image",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-charcoal mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            From weddings and private celebrations to corporate functions, we
            create seamless, elegant, and unforgettable events tailored to you.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56">
                {service.type === "video" ? (
                  <video
                    src={service.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={service.media}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-charcoal mb-2">
                  {service.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

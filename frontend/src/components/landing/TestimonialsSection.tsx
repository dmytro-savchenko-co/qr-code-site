import { motion } from "framer-motion";
import { User } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Rodrigo Silva",
    role: "Fitness Studio Owner",
    quote:
      "What a smooth experience! This QR code generator makes it easy to create dynamic QR codes, and I love the custom design features.",
    featured: false,
  },
  {
    name: "Aya Tanaka",
    role: "Marketing Specialist",
    quote:
      "I've used most of the QR code generator tools available online, and I can say with confidence that QR Code.io is the best.",
    featured: false,
  },
  {
    name: "Luca Rossi",
    role: "Hotel Operations Manager",
    quote:
      "Wow! I'm amazed by the high-quality QR codes I created with this QR code maker.",
    featured: true,
  },
  {
    name: "Emily Martin",
    role: "Event Coordinator",
    quote:
      "Previously, I used static QR codes for my business, but I got frustrated by having to reprint them every time something changed.",
    featured: false,
  },
  {
    name: "Camila Guti\u00e9rrez",
    role: "Digital Marketing Manager",
    quote:
      "I finally found the best QR code generator available! QR Code.io offers an easy-to-use platform.",
    featured: true,
  },
  {
    name: "Sofia Petrova",
    role: "Restaurant Manager",
    quote:
      "I can't recommend QR Code.io strongly enough! Every step of the process was so simple.",
    featured: false,
  },
  {
    name: "Jackson Taylor",
    role: "Retail Store Owner",
    quote:
      "I switched to QR Code.io after exploring other services, and the difference is incredible!",
    featured: false,
  },
];

// Duplicate for seamless looping
const doubledTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isDark = testimonial.featured;

  return (
    <div
      className={`flex-shrink-0 w-80 rounded-xl shadow-md p-6 ${
        isDark
          ? "bg-navy text-white"
          : "bg-white text-navy border border-gray-100"
      }`}
    >
      <p
        className={`italic leading-relaxed text-sm ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        "{testimonial.quote}"
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            isDark ? "bg-primary/20" : "bg-primary-light"
          }`}
        >
          <User
            className={`w-4 h-4 ${isDark ? "text-primary" : "text-primary"}`}
          />
        </div>
        <div>
          <p
            className={`font-bold text-sm ${
              isDark ? "text-white" : "text-navy"
            }`}
          >
            {testimonial.name}
          </p>
          <p
            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-400"}`}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy text-center"
        >
          What our customers say
        </motion.h2>
      </div>

      {/* Marquee container */}
      <div className="mt-14 relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling row */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Inline keyframes using style tag */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}

import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rodrigo Silva",
    role: "Fitness Studio Owner",
    quote:
      "What a smooth experience! This QR code generator makes it easy to create dynamic QR codes, and I love the custom design features.",
  },
  {
    name: "Aya Tanaka",
    role: "Marketing Specialist",
    quote:
      "I've used most of the QR code generator tools available online, and I can say with confidence that QR Code.io is the best.",
  },
  {
    name: "Luca Rossi",
    role: "Hotel Operations Manager",
    quote:
      "Wow! I'm amazed by the high-quality QR codes I created with this QR code maker.",
  },
  {
    name: "Emily Martin",
    role: "Event Coordinator",
    quote:
      "Previously, I used static QR codes for my business, but I got frustrated by having to reprint them every time something changed.",
  },
  {
    name: "Camila Guti\u00e9rrez",
    role: "Digital Marketing Manager",
    quote:
      "I finally found the best QR code generator available! QR Code.io offers an easy-to-use platform.",
  },
  {
    name: "Sofia Petrova",
    role: "Restaurant Manager",
    quote:
      "I can't recommend QR Code.io strongly enough! Every step of the process was so simple.",
  },
  {
    name: "Jackson Taylor",
    role: "Retail Store Owner",
    quote:
      "I switched to QR Code.io after exploring other services, and the difference is incredible!",
  },
];

// Duplicate for seamless looping
const doubledTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <p className="italic text-gray-600 leading-relaxed text-sm">
        "{testimonial.quote}"
      </p>
      <div className="mt-4">
        <p className="font-bold text-navy text-sm">{testimonial.name}</p>
        <p className="text-gray-400 text-xs">{testimonial.role}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28 overflow-hidden">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

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

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, TrendingUp, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Create tech-savvy QR codes",
    description:
      "Take advantage of advanced features to make your easy-to-scan QR codes stand out, including custom colors, frames, and logos.",
  },
  {
    icon: TrendingUp,
    title: "Access real-time data",
    description:
      "Use our real-time analytics to track QR codes usage and optimize your marketing efforts. Our data shows you when, where, and how often customers scan your QR codes.",
  },
  {
    icon: BarChart3,
    title: "Turn clicks into conversions",
    description:
      "Create custom designs to communicate your brand identity and encourage high scan rates. Share your dynamic QR codes and watch customers flock to your business.",
  },
];

const subFeatures = [
  {
    title: "An All-In-One Platform",
    description:
      "Our platform is a comprehensive QR code management tool that lets you create, customize, track, and manage all your QR codes from a single dashboard.",
  },
  {
    title: "Detailed Analytics",
    description:
      "In addition to helping you design, generate, and edit your QR codes, we also offer in-depth data on scan activity, user demographics, and campaign performance.",
  },
  {
    title: "Dynamic QR Codes",
    description:
      "Our QR codes have advanced, personalized features that allow you to manage and edit each QR code at any time.",
  },
  {
    title: "Channeling Your Brand's Voice",
    description:
      "We offer much more than your standard black-and-white QR codes. Customize every aspect to match your brand identity and create a lasting impression.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy text-center"
        >
          An Easy-To-Use QR Code Generator
        </motion.h2>

        {/* 3 Feature cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Management section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Manage all your QR codes in one place
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Create, manage, and edit your custom QR codes with our intuitive
              platform
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full px-8 py-3.5 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start for Free Today
            </Link>
          </motion.div>

          {/* 2x2 Sub-feature grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {subFeatures.map((sub, i) => (
              <motion.div
                key={sub.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-navy mb-2">
                  {sub.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-4">
                  {sub.description}
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
                >
                  Try now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

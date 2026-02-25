import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, CheckCircle2, Palette, BarChart3, Type } from "lucide-react";

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function StylizedQRCode() {
  // Generate a stylized QR-like grid pattern
  const pattern = [
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-3xl shadow-2xl p-5 md:p-6 border border-gray-100">
        <div className="grid grid-cols-9 gap-1 w-full h-full">
          {pattern.flat().map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.008 }}
              className={`rounded-sm ${
                cell ? "bg-navy" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const bulletPoints = [
  "Create dynamic, editable QR codes",
  "Tracking & analytics for your QR code",
  "Custom QR codes with logos, colors & more",
];

export default function HeroSection() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-navy text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              The Most Convenient{" "}
              <span className="text-primary">QR Code</span> Generator
            </h1>

            <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Our customizable platform allows you to manage your QR codes in
              one centralized location.
            </p>

            <div className="mt-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold text-lg rounded-full px-8 py-4 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <QrCode className="w-5 h-5" />
                Generate QR Code
              </Link>
            </div>

            <ul className="mt-10 space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {bulletPoints.map((text, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </span>
                  <span className="text-gray-600 text-base">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right side - QR Code illustration with floating decorators */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Background decorative circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-primary/5"
            />

            {/* Main QR Code */}
            <StylizedQRCode />

            {/* Floating card: Typography "Aa" */}
            <FloatingCard
              className="absolute -top-2 -left-4 md:top-0 md:-left-8"
              delay={0.5}
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Type className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-bold text-navy text-sm">Aa</span>
              </div>
            </FloatingCard>

            {/* Floating card: Color swatches */}
            <FloatingCard
              className="absolute -bottom-4 -left-6 md:-bottom-2 md:-left-12"
              delay={0.7}
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="w-4 h-4 text-primary" />
                </div>
                <div className="flex gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary" />
                  <span className="w-5 h-5 rounded-full bg-navy" />
                  <span className="w-5 h-5 rounded-full bg-green-500" />
                  <span className="w-5 h-5 rounded-full bg-orange-400" />
                </div>
              </div>
            </FloatingCard>

            {/* Floating card: Scan count */}
            <FloatingCard
              className="absolute -top-2 -right-4 md:top-2 md:-right-10"
              delay={0.9}
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 leading-none">
                    Scans
                  </span>
                  <span className="font-bold text-navy text-sm leading-tight">
                    134
                  </span>
                </div>
              </div>
            </FloatingCard>

            {/* Floating card: QR icon badge */}
            <FloatingCard
              className="absolute -bottom-6 -right-2 md:-bottom-4 md:-right-6"
              delay={1.1}
            >
              <div className="bg-primary rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-white" />
                <span className="font-semibold text-white text-sm">
                  Dynamic
                </span>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}

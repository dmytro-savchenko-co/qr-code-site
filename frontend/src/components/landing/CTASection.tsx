import { Link } from "react-router-dom";
import { QrCode, Linkedin, Facebook, Instagram, Link as LinkIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function SocialIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${className || ""}`}>
      {children}
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="py-20 bg-[#f0f7ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#e6f1fc] rounded-2xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left column */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-navy mb-4"
            >
              Create your QR codes today!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg mb-8 max-w-md"
            >
              Generate your customizable dynamic QR codes now. Optimize
              performance with advanced analytics and branded designs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full transition shadow-lg shadow-primary/30"
              >
                <QrCode className="w-5 h-5" />
                Create QR Code
              </Link>
            </motion.div>
          </div>

          {/* Right column - illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              {/* Central QR code */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-navy" />
                </div>
              </div>

              {/* Sparkle decorations */}
              <Sparkles className="absolute top-2 left-8 w-5 h-5 text-primary/60" />
              <Sparkles className="absolute bottom-6 right-4 w-4 h-4 text-primary/40" />
              <Sparkles className="absolute top-10 right-10 w-3 h-3 text-primary/50" />

              {/* Curved connecting lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 288 288"
                fill="none"
              >
                {/* Lines from center to icons */}
                <path d="M144 120 Q 100 80 60 50" stroke="#33b5e5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <path d="M144 120 Q 180 80 230 60" stroke="#33b5e5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <path d="M144 168 Q 100 210 50 240" stroke="#33b5e5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <path d="M144 168 Q 190 210 240 235" stroke="#33b5e5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <path d="M120 144 Q 70 144 30 144" stroke="#33b5e5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <path d="M168 144 Q 220 144 260 144" stroke="#33b5e5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
              </svg>

              {/* Social media icons positioned around */}
              <div className="absolute top-0 left-4">
                <SocialIcon>
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                </SocialIcon>
              </div>
              <div className="absolute top-4 right-4">
                <SocialIcon>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" className="text-[#25D366]" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" className="text-[#25D366]" fill="none" stroke="#25D366" strokeWidth="1.5" />
                  </svg>
                </SocialIcon>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-2">
                <SocialIcon>
                  <LinkIcon className="w-4 h-4 text-gray-600" />
                </SocialIcon>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-2">
                <SocialIcon>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialIcon>
              </div>
              <div className="absolute bottom-4 left-4">
                <SocialIcon>
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                </SocialIcon>
              </div>
              <div className="absolute bottom-0 right-8">
                <SocialIcon>
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                </SocialIcon>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { QrCode, Settings, Download } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: QrCode,
    label: "Many QR Types",
  },
  {
    icon: Settings,
    label: "Customizable QR Codes",
  },
  {
    icon: Download,
    label: "Download in Several Formats",
  },
];

export default function FeaturesBar() {
  return (
    <section className="w-full bg-primary py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-white font-semibold text-sm">
                {feature.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

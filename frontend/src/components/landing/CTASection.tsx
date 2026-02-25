import { Link } from 'react-router-dom'
import { QrCode } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy to-navy-light">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Create your QR codes today!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
        >
          Generate your customizable dynamic QR codes now. Optimize performance
          with advanced analytics and branded designs.
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-gray-400 text-sm"
        >
          <span>Many QR Types</span>
          <span>Customizable QR Codes</span>
          <span>Download in Several Formats</span>
        </motion.div>
      </div>
    </section>
  )
}

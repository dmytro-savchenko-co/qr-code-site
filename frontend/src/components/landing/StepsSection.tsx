import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QrCode, Palette, Download } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Step data                                                          */
/* ------------------------------------------------------------------ */

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: QrCode,
    title: 'Select your QR code type',
    description:
      'Share social media accounts, website URLs, contact info, and much more.',
  },
  {
    icon: Palette,
    title: 'Create a custom QR code design',
    description:
      'Choose from a variety of color schemes and frame options — you can even add a logo!',
  },
  {
    icon: Download,
    title: 'Download your dynamic QR code',
    description:
      'Select your desired file type (PNG, JPG, SVG, or EPS) and easily print or share your QR code.',
  },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StepsSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            Generate a Custom QR Code in Just a Few Steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            See how easy it is to create a custom-designed QR code
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Generate QR Code
          </Link>
        </motion.div>

        {/* Step cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="rounded-xl bg-[#f0f9ff] p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

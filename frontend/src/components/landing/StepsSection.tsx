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
/*  Illustration: QR code creation process mockup                      */
/* ------------------------------------------------------------------ */

function QRIllustration() {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Outer container */}
      <div className="relative w-full max-w-[380px]">
        {/* QR code with dashed border */}
        <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white shadow-sm">
          {/* Stylized QR code SVG */}
          <svg
            viewBox="0 0 100 100"
            className="h-28 w-28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top-left finder pattern */}
            <rect x="5" y="5" width="28" height="28" rx="3" fill="#1a1a2e" />
            <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
            <rect x="13" y="13" width="12" height="12" rx="1.5" fill="#1a1a2e" />

            {/* Top-right finder pattern */}
            <rect x="67" y="5" width="28" height="28" rx="3" fill="#1a1a2e" />
            <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
            <rect x="75" y="13" width="12" height="12" rx="1.5" fill="#1a1a2e" />

            {/* Bottom-left finder pattern */}
            <rect x="5" y="67" width="28" height="28" rx="3" fill="#1a1a2e" />
            <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
            <rect x="13" y="75" width="12" height="12" rx="1.5" fill="#1a1a2e" />

            {/* Data modules */}
            <rect x="38" y="8" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="48" y="8" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="58" y="8" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="38" y="18" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="48" y="18" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="8" y="38" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="18" y="38" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="28" y="38" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="38" y="38" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="48" y="38" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="58" y="38" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="68" y="38" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="78" y="38" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="88" y="38" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="8" y="48" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="28" y="48" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="48" y="48" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="68" y="48" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="88" y="48" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="8" y="58" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="18" y="58" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="38" y="58" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="58" y="58" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="78" y="58" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="38" y="68" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="48" y="68" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="58" y="68" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="68" y="68" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="38" y="78" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="58" y="78" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="78" y="78" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="88" y="78" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="48" y="88" width="6" height="6" rx="1" fill="#33b5e5" />
            <rect x="68" y="88" width="6" height="6" rx="1" fill="#1a1a2e" />
            <rect x="88" y="88" width="6" height="6" rx="1" fill="#33b5e5" />
          </svg>
        </div>

        {/* Website type icon label */}
        <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-primary" fill="currentColor">
            <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm6.918 6H14.2a15.64 15.64 0 00-1.384-3.637A8.035 8.035 0 0116.918 6zM10 2.04c.658.953 1.192 1.976 1.588 3.06H8.412A13.678 13.678 0 0110 2.04zM2.262 12a7.925 7.925 0 010-4h3.12a16.258 16.258 0 000 4h-3.12zM3.082 14h2.718a15.64 15.64 0 001.384 3.637A8.035 8.035 0 013.082 14zm2.718-8H3.082a8.035 8.035 0 014.102-3.637A15.64 15.64 0 005.8 6zm4.2 11.96A13.678 13.678 0 018.412 14h3.176A13.678 13.678 0 0110 17.96zM11.87 12H8.13a14.35 14.35 0 010-4h3.74a14.35 14.35 0 010 4zm.946 5.637A15.64 15.64 0 0014.2 14h2.718a8.035 8.035 0 01-4.102 3.637zM14.618 12a16.258 16.258 0 000-4h3.12a7.925 7.925 0 010 4h-3.12z" />
          </svg>
          <span className="text-sm font-medium text-navy">Website</span>
        </div>

        {/* SELECT QR badge */}
        <div className="mx-auto mt-3 w-fit rounded-full bg-[#7c3aed] px-5 py-1.5 text-xs font-bold tracking-wide text-white uppercase shadow-md">
          Select QR
        </div>

        {/* Social media icons row */}
        <div className="mx-auto mt-5 flex w-fit items-center gap-3">
          {/* WhatsApp */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.11 1.519 5.838L.057 23.608l5.921-1.41A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.9 0-3.727-.523-5.317-1.507l-.382-.227-3.514.837.883-3.42-.25-.394A9.777 9.777 0 012.182 12c0-5.418 4.4-9.818 9.818-9.818S21.818 6.582 21.818 12 17.418 21.818 12 21.818z" />
            </svg>
          </div>
          {/* Facebook */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          {/* Instagram */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm" style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
          {/* X (Twitter) */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          {/* LinkedIn */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
        </div>

        {/* Decorative file type placeholders */}
        <div className="absolute -right-2 top-4 flex flex-col gap-2 opacity-40 max-lg:hidden">
          <div className="h-8 w-12 rounded bg-gray-200 text-center text-[10px] font-bold leading-8 text-gray-400">
            PNG
          </div>
          <div className="h-8 w-12 rounded bg-gray-200 text-center text-[10px] font-bold leading-8 text-gray-400">
            SVG
          </div>
        </div>
        <div className="absolute -left-2 bottom-16 flex flex-col gap-2 opacity-40 max-lg:hidden">
          <div className="h-8 w-12 rounded bg-gray-200 text-center text-[10px] font-bold leading-8 text-gray-400">
            JPG
          </div>
          <div className="h-8 w-12 rounded bg-gray-200 text-center text-[10px] font-bold leading-8 text-gray-400">
            EPS
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StepsSection() {
  return (
    <section className="bg-[#f4f7fc] py-16 sm:py-24">
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

        {/* Two-column layout: steps list + illustration */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: Vertical step list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4"
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              const isFirst = index === 0
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-start gap-5 rounded-xl p-5 transition-colors ${
                    isFirst
                      ? 'bg-primary-light/60 ring-1 ring-primary/20'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      isFirst ? 'bg-primary text-white' : 'bg-primary-light text-primary'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* RIGHT: QR code creation illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <QRIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

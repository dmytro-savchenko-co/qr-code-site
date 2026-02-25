import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  QrCode,
  TrendingUp,
  BarChart3,
  Globe,
  Paintbrush,
  Layers,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import MidCTABanner from './MidCTABanner'

/* ------------------------------------------------------------------ */
/*  Feature card data (3x2 grid)                                       */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: QrCode,
    title: 'Create tech-savvy QR codes',
    description:
      'Take advantage of advanced features to make your easy-to-scan QR codes stand out, including custom colors, frames, and logos.',
  },
  {
    icon: TrendingUp,
    title: 'Access real-time data',
    description:
      'Use our real-time analytics to track QR codes usage and optimize your marketing efforts. Our data shows you when, where, and how often customers scan your QR codes.',
  },
  {
    icon: BarChart3,
    title: 'Turn clicks into conversions',
    description:
      'Create custom designs to communicate your brand identity and encourage high scan rates. Share your dynamic QR codes and watch customers flock to your business.',
  },
  {
    icon: Globe,
    title: 'Generate landing pages',
    description:
      "Our platform does more than create QR codes. You don't need to build an entire website \u2014 we can help you easily generate custom landing pages for your QR codes.",
  },
  {
    icon: Paintbrush,
    title: 'Customize your QR codes',
    description:
      'Our advanced features make it easy to create impressive QR codes that stand out from the pack. Integrate custom design elements to make your dynamic QR codes pop.',
  },
  {
    icon: Layers,
    title: 'Explore various QR code types',
    description:
      'Take advantage of advanced features to make your easy-to-scan QR codes stand out, including custom colors, frames, and logos.',
  },
]

/* ------------------------------------------------------------------ */
/*  Sub-feature data (management section)                              */
/* ------------------------------------------------------------------ */

interface SubFeature {
  title: string
  description: string
}

const subFeatures: SubFeature[] = [
  {
    title: 'An All-In-One Platform',
    description:
      'Our platform is a comprehensive QR code management tool that lets you create, customize, track, and manage all your QR codes from a single dashboard.',
  },
  {
    title: 'Detailed Analytics',
    description:
      'In addition to helping you design, generate, and edit your QR codes, we also offer in-depth data on scan activity, user demographics, and campaign performance.',
  },
  {
    title: 'Dynamic QR Codes',
    description:
      'Our QR codes have advanced, personalized features that allow you to manage and edit each QR code at any time.',
  },
  {
    title: "Channeling Your Brand's Voice",
    description:
      'We offer much more than your standard black-and-white QR codes. Customize every aspect to match your brand identity and create a lasting impression.',
  },
]

/* ------------------------------------------------------------------ */
/*  Dashboard mockup illustrations                                     */
/* ------------------------------------------------------------------ */

function DashboardMockup({ variant }: { variant: number }) {
  if (variant === 0) {
    // All-in-one platform: dashboard with sidebar + cards
    return (
      <div className="h-48 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="flex w-14 shrink-0 flex-col gap-3 border-r border-gray-100 bg-gray-50 p-3">
            <div className="h-3 w-8 rounded bg-primary/30" />
            <div className="h-2 w-6 rounded bg-gray-200" />
            <div className="h-2 w-7 rounded bg-gray-200" />
            <div className="h-2 w-5 rounded bg-gray-200" />
            <div className="h-2 w-7 rounded bg-gray-200" />
          </div>
          {/* Main content */}
          <div className="flex-1 p-4">
            <div className="mb-3 h-3 w-24 rounded bg-gray-200" />
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-primary-light/50 p-3">
                <div className="h-2 w-8 rounded bg-primary/40" />
                <div className="mt-2 h-5 w-10 rounded bg-primary/60" />
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <div className="h-2 w-8 rounded bg-blue-300/40" />
                <div className="mt-2 h-5 w-10 rounded bg-blue-300/60" />
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <div className="h-2 w-8 rounded bg-green-300/40" />
                <div className="mt-2 h-5 w-10 rounded bg-green-300/60" />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="h-12 flex-1 rounded-lg bg-gray-50" />
              <div className="h-12 flex-1 rounded-lg bg-gray-50" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 1) {
    // Analytics: chart mockup
    return (
      <div className="h-48 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="mb-1 h-3 w-20 rounded bg-gray-200" />
          <div className="mb-4 h-2 w-32 rounded bg-gray-100" />
          {/* Bar chart */}
          <div className="flex h-24 items-end gap-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary/70 transition-all"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            <div className="h-2 w-6 rounded bg-gray-100" />
            <div className="h-2 w-6 rounded bg-gray-100" />
            <div className="h-2 w-6 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 2) {
    // Dynamic QR codes: QR list view
    return (
      <div className="h-48 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-primary/20" />
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="mb-2 flex items-center gap-3 rounded-lg border border-gray-100 p-2"
            >
              <div className="h-10 w-10 shrink-0 rounded bg-gray-100 p-1">
                <div className="h-full w-full rounded-sm bg-gray-300" />
              </div>
              <div className="flex-1">
                <div className="h-2.5 w-20 rounded bg-gray-200" />
                <div className="mt-1.5 h-2 w-32 rounded bg-gray-100" />
              </div>
              <div className="h-5 w-12 rounded bg-green-100">
                <div className="mx-auto mt-1.5 h-2 w-8 rounded bg-green-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Brand customization: color palette / design mockup
  return (
    <div className="h-48 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-4">
        <div className="mb-4 h-3 w-28 rounded bg-gray-200" />
        <div className="flex gap-4">
          {/* QR preview */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-50">
            <div className="grid h-16 w-16 grid-cols-4 grid-rows-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    [0, 1, 4, 5, 2, 3, 8, 12, 10, 15].includes(i)
                      ? 'bg-primary'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Color options */}
          <div className="flex-1">
            <div className="mb-2 h-2 w-16 rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-7 w-7 rounded-full bg-primary ring-2 ring-primary/30" />
              <div className="h-7 w-7 rounded-full bg-[#1a1a2e]" />
              <div className="h-7 w-7 rounded-full bg-[#e74c3c]" />
              <div className="h-7 w-7 rounded-full bg-[#2ecc71]" />
            </div>
            <div className="mt-3 mb-2 h-2 w-12 rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-6 w-14 rounded border border-gray-200 bg-gray-50" />
              <div className="h-6 w-14 rounded border border-primary bg-primary-light/30" />
              <div className="h-6 w-14 rounded border border-gray-200 bg-gray-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading -- LEFT aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-navy md:text-4xl lg:text-5xl"
        >
          An Easy-To-Use QR Code Generator
        </motion.h2>

        {/* 3x2 Feature cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="flex items-start gap-4 rounded-xl border border-gray-100 p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary-light">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mid-page CTA banner (between top cards and management section) */}
      <div className="mt-20">
        <MidCTABanner />
      </div>

      {/* Management section */}
      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            Manage all your QR codes in one place
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Create, manage, and edit your custom QR codes with our intuitive
            platform
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98]"
          >
            Start for Free Today
          </Link>
        </motion.div>

        {/* Sub-features: full-width rows with alternating layout */}
        <div className="mt-16 flex flex-col gap-12">
          {subFeatures.map((sub, i) => {
            const isReversed = i % 2 !== 0
            return (
              <motion.div
                key={sub.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rowVariants}
                className={`flex flex-col items-center gap-8 rounded-2xl bg-gray-50 p-8 md:p-10 lg:flex-row lg:gap-12 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text side */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy md:text-2xl">
                    {sub.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-500">
                    {sub.description}
                  </p>
                  <Link
                    to="/register"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    Try now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Illustration side */}
                <div className="w-full max-w-md flex-1">
                  <DashboardMockup variant={i} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

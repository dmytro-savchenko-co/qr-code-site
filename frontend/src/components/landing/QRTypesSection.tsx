import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  FileText,
  Image,
  PlayCircle,
  Wifi,
  UtensilsCrossed,
  Building2,
  Contact,
  Headphones,
  Smartphone,
  Link as LinkIcon,
  Ticket,
  Share2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Printer,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Facebook & Instagram placeholder icons (lucide doesn't ship these) */
/* ------------------------------------------------------------------ */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="currentColor"
        stroke="none"
      >
        f
      </text>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  QR type data                                                       */
/* ------------------------------------------------------------------ */

interface QRType {
  id: string
  name: string
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  description: string
}

const qrTypes: QRType[] = [
  { id: 'website', name: 'Website', icon: Globe, description: 'Show off your website and help people find you online with a QR code that connects users with your homepage or any web page.' },
  { id: 'pdf', name: 'PDF', icon: FileText, description: 'You can easily share information-rich PDF files in Adobe Reader or an internet browser when users scan your QR code.' },
  { id: 'images', name: 'Images', icon: Image, description: 'Share pictures and graphics with users — spread your visual identity by using our convenient QR code solution.' },
  { id: 'video', name: 'Video', icon: PlayCircle, description: 'Quickly and easily create QR codes to redirect users to your latest videos on YouTube or any other video platform.' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, description: 'Want to share WiFi access with your customers? Set up one of our handy QR codes, and WiFi access is just a scan away.' },
  { id: 'menu', name: 'Menu', icon: UtensilsCrossed, description: 'Restaurant owners can share their menus with customers and quickly edit them anytime without the hassle of reprinting.' },
  { id: 'business', name: 'Business', icon: Building2, description: 'Share your business details with prospective customers, and communicate your opening hours, location, and contact info.' },
  { id: 'vcard', name: 'vCard', icon: Contact, description: 'Create virtual business cards and connect them to a QR code to share your contact information and business details.' },
  { id: 'mp3', name: 'MP3', icon: Headphones, description: 'Do you have audio files to share with your listeners? Distribute your music, podcasts, and more with a simple QR code.' },
  { id: 'apps', name: 'Apps', icon: Smartphone, description: 'Make it easier than ever for users to download your latest app by connecting it to a convenient QR code.' },
  { id: 'links', name: 'List of Links', icon: LinkIcon, description: 'Provide access to a list of all your important business or personal links with one convenient QR code.' },
  { id: 'coupon', name: 'Coupon', icon: Ticket, description: 'Share discounts and sales with your customers! Our QR codes are easy to edit whenever you change your offers.' },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, description: 'Set up a QR code to direct users to a custom landing page for your Facebook account.' },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, description: 'With an Instagram QR code, it\'s easier than ever to direct users to your Instagram account.' },
  { id: 'social', name: 'Social Media', icon: Share2, description: 'Turn your online presence into an influencer-worthy following by linking all of your social media profiles.' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, description: 'Help users get in touch with you by creating a QR code that securely redirects to WhatsApp.' },
]

/* ------------------------------------------------------------------ */
/*  Phone Mockup Component                                             */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[260px]">
      {/* Phone frame */}
      <div className="rounded-[2rem] border-[3px] border-primary bg-white p-2 shadow-lg">
        {/* Notch */}
        <div className="mx-auto mb-1 h-5 w-24 rounded-b-xl bg-primary/10" />

        {/* Screen content */}
        <div className="overflow-hidden rounded-[1.25rem] bg-gray-50">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-semibold text-gray-700">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                <div className="h-[6px] w-[3px] rounded-sm bg-gray-600" />
                <div className="h-[8px] w-[3px] rounded-sm bg-gray-600" />
                <div className="h-[10px] w-[3px] rounded-sm bg-gray-600" />
                <div className="h-[8px] w-[3px] rounded-sm bg-gray-300" />
              </div>
              <div className="ml-1 h-[10px] w-[18px] rounded-sm border border-gray-600 px-[1px] py-[1px]">
                <div className="h-full w-3/4 rounded-[1px] bg-gray-600" />
              </div>
            </div>
          </div>

          {/* URL bar */}
          <div className="mx-3 mb-3 rounded-full bg-white px-3 py-1.5 text-center text-[9px] text-gray-400 shadow-sm">
            https://qr-code.io
          </div>

          {/* Placeholder image */}
          <div className="mx-3 mb-3 flex h-24 items-center justify-center rounded-lg bg-gray-200">
            <Image className="h-8 w-8 text-gray-400" />
          </div>

          {/* Text lines */}
          <div className="mx-3 mb-3 space-y-2">
            <div className="h-2 w-full rounded bg-gray-200" />
            <div className="h-2 w-5/6 rounded bg-gray-200" />
            <div className="h-2 w-4/6 rounded bg-gray-200" />
          </div>

          {/* CTA Button */}
          <div className="mx-3 mb-4">
            <div className="rounded-full bg-primary py-2 text-center text-[10px] font-semibold text-white">
              Learn More
            </div>
          </div>

          {/* Social circles */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-5 w-5 rounded-full bg-blue-500" />
            <div className="h-5 w-5 rounded-full bg-pink-500" />
            <div className="h-5 w-5 rounded-full bg-sky-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sunburst Background                                                */
/* ------------------------------------------------------------------ */

function SunburstBackground() {
  const lines = 24
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Offset to align with phone position (left column center) */}
      <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-[30%]">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-[500px] w-[1px] origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${(360 / lines) * i}deg)`,
              background: `linear-gradient(to top, rgba(51, 181, 229, 0.12) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating Decoration Icons                                          */
/* ------------------------------------------------------------------ */

function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* Left side icons */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-4 top-[15%] text-primary/20"
      >
        <Smartphone className="h-10 w-10" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute left-8 top-[45%] text-primary/20"
      >
        <Mail className="h-9 w-9" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-4 top-[72%] text-primary/20"
      >
        <MapPin className="h-10 w-10" strokeWidth={1.5} />
      </motion.div>

      {/* Right side icons */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute right-4 top-[20%] text-primary/20"
      >
        <Globe className="h-10 w-10" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute right-8 top-[55%] text-primary/20"
      >
        <Printer className="h-9 w-9" strokeWidth={1.5} />
      </motion.div>

      {/* Small blue dots near phone area */}
      <div className="absolute left-[22%] top-[10%] h-2 w-2 rounded-full bg-primary/30" />
      <div className="absolute left-[38%] top-[8%] h-1.5 w-1.5 rounded-full bg-primary/25" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function QRTypesSection() {
  const [selectedId, setSelectedId] = useState(qrTypes[0].id)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const selected = qrTypes.find((t) => t.id === selectedId)!

  /* ---- scroll helpers ---- */

  function updateScrollIndicators() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollIndicators()
    el.addEventListener('scroll', updateScrollIndicators, { passive: true })
    window.addEventListener('resize', updateScrollIndicators)
    return () => {
      el.removeEventListener('scroll', updateScrollIndicators)
      window.removeEventListener('resize', updateScrollIndicators)
    }
  }, [])

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.6
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-16 sm:py-24">
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
            Dynamic QR Codes for Every Need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose from a variety of QR codes to match your needs. Our custom QR codes can link to
            your business website, provide WiFi access, display restaurant menus, and more.
          </p>
        </motion.div>

        {/* ---- Circular icon type selector ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-10"
        >
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scroll('left')}
              className="absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 sm:-left-4"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll('right')}
              className="absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 sm:-right-4"
            >
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
          )}

          {/* Scrollable row of circular icons */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex items-center gap-4 overflow-x-auto px-2 py-3 sm:gap-5"
          >
            {qrTypes.map((type) => {
              const Icon = type.icon
              const isActive = type.id === selectedId
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedId(type.id)}
                  className="group flex flex-shrink-0 flex-col items-center gap-2"
                >
                  <div
                    className={`flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all duration-200 sm:h-[68px] sm:w-[68px] ${
                      isActive
                        ? 'bg-primary shadow-md shadow-primary/25'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors sm:h-7 sm:w-7 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                  </div>
                  <span
                    className={`whitespace-nowrap text-xs font-medium transition-colors ${
                      isActive ? 'text-primary-dark' : 'text-gray-500'
                    }`}
                  >
                    {type.name}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ---- Detail panel ---- */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Type name heading */}
              <h3 className="mb-8 text-center text-3xl font-bold text-navy sm:text-4xl">
                {selected.name}
              </h3>

              {/* Two-column layout with decorations */}
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14">
                {/* Sunburst lines behind phone */}
                <SunburstBackground />

                {/* Floating decoration icons */}
                <FloatingIcons />

                <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                  {/* LEFT: Phone mockup */}
                  <div className="flex justify-center">
                    <PhoneMockup />
                  </div>

                  {/* RIGHT: Info sections */}
                  <div className="space-y-0">
                    {/* Section 1: Type description */}
                    <div className="pb-5">
                      <h4 className="text-lg font-bold text-navy">{selected.name}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {selected.description}
                      </p>
                    </div>

                    <div className="border-t border-gray-200" />

                    {/* Section 2: Customize */}
                    <div className="py-5">
                      <h4 className="text-lg font-bold text-navy">
                        Customize how your QR codes look
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        Use custom color schemes and framing to suit your brand identity. You can
                        even add your company's logo to your QR code!
                      </p>
                    </div>

                    <div className="border-t border-gray-200" />

                    {/* Section 3: Easy to edit */}
                    <div className="pt-5">
                      <h4 className="text-lg font-bold text-navy">Easy to edit and download</h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        Download your QR codes in several formats and edit them at anytime, even
                        after they're printed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Try Now button centered below */}
                <div className="relative z-10 mt-10 text-center">
                  <Link
                    to="/register"
                    className="inline-block rounded-full bg-primary px-10 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-lg"
                  >
                    Try Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

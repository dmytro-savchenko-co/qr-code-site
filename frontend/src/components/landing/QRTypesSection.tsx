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
/*  Component                                                          */
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

        {/* Scrollable type buttons */}
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
              className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 sm:-left-4"
            >
              <ChevronLeft className="h-5 w-5 text-navy" />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll('right')}
              className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 sm:-right-4"
            >
              <ChevronRight className="h-5 w-5 text-navy" />
            </button>
          )}

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-3 overflow-x-auto px-1 py-2"
          >
            {qrTypes.map((type) => {
              const Icon = type.icon
              const isActive = type.id === selectedId
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedId(type.id)}
                  className={`flex flex-shrink-0 flex-col items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-2 border-primary bg-primary-light text-primary-dark shadow-sm'
                      : 'border-2 border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ minWidth: '5.5rem' }}
                >
                  <Icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                  <span className="whitespace-nowrap text-xs">{type.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Selected type details */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h3 className="text-2xl font-bold text-navy">{selected.name}</h3>
              <p className="mt-3 text-gray-600">{selected.description}</p>
              <Link
                to="/register"
                className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Try Now
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

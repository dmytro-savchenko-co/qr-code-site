import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  QR Illustration with floating social icons                         */
/* ------------------------------------------------------------------ */

function QRWithSocialIcons() {
  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="relative h-64 w-64">
        {/* Center QR code */}
        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
            {/* Top-left finder */}
            <rect x="4" y="4" width="22" height="22" rx="2" fill="white" />
            <rect x="7" y="7" width="16" height="16" rx="1.5" fill="rgba(255,255,255,0.3)" />
            <rect x="10" y="10" width="10" height="10" rx="1" fill="white" />
            {/* Top-right finder */}
            <rect x="54" y="4" width="22" height="22" rx="2" fill="white" />
            <rect x="57" y="7" width="16" height="16" rx="1.5" fill="rgba(255,255,255,0.3)" />
            <rect x="60" y="10" width="10" height="10" rx="1" fill="white" />
            {/* Bottom-left finder */}
            <rect x="4" y="54" width="22" height="22" rx="2" fill="white" />
            <rect x="7" y="57" width="16" height="16" rx="1.5" fill="rgba(255,255,255,0.3)" />
            <rect x="10" y="60" width="10" height="10" rx="1" fill="white" />
            {/* Data modules */}
            <rect x="30" y="8" width="5" height="5" rx="1" fill="white" opacity="0.9" />
            <rect x="40" y="8" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="30" y="18" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="8" y="30" width="5" height="5" rx="1" fill="white" opacity="0.9" />
            <rect x="18" y="30" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="30" y="30" width="5" height="5" rx="1" fill="white" opacity="0.8" />
            <rect x="40" y="30" width="5" height="5" rx="1" fill="white" opacity="0.9" />
            <rect x="54" y="30" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="67" y="30" width="5" height="5" rx="1" fill="white" opacity="0.8" />
            <rect x="30" y="40" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="54" y="40" width="5" height="5" rx="1" fill="white" opacity="0.9" />
            <rect x="30" y="54" width="5" height="5" rx="1" fill="white" opacity="0.8" />
            <rect x="40" y="54" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="54" y="54" width="5" height="5" rx="1" fill="white" opacity="0.9" />
            <rect x="67" y="54" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="40" y="67" width="5" height="5" rx="1" fill="white" opacity="0.8" />
            <rect x="54" y="67" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="67" y="67" width="5" height="5" rx="1" fill="white" opacity="0.9" />
          </svg>
        </div>

        {/* Curved connection lines SVG */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 256 256"
          fill="none"
        >
          {/* Lines from center to each icon position */}
          <path d="M128 100 Q 100 60 70 30" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M128 100 Q 150 60 186 30" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M100 128 Q 60 128 20 128" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M156 128 Q 196 128 236 128" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M128 156 Q 100 196 70 226" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M128 156 Q 156 196 186 226" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
        </svg>

        {/* Facebook - top left */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-4 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </motion.div>

        {/* X (Twitter) - top right */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute right-4 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-black shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </motion.div>

        {/* Instagram - middle left */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </motion.div>

        {/* Link/Google - middle right */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#4285F4] shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </motion.div>

        {/* WhatsApp - bottom left */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute bottom-0 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.11 1.519 5.838L.057 23.608l5.921-1.41A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.9 0-3.727-.523-5.317-1.507l-.382-.227-3.514.837.883-3.42-.25-.394A9.777 9.777 0 012.182 12c0-5.418 4.4-9.818 9.818-9.818S21.818 6.582 21.818 12 17.418 21.818 12 21.818z" />
          </svg>
        </motion.div>

        {/* LinkedIn - bottom right */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </motion.div>

        {/* Sparkle decorations */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-14 top-8 text-white/60"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l1.5 5.5L16 8l-6.5 2.5L8 16l-1.5-5.5L0 8l6.5-2.5z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-10 left-14 text-white/50"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l1.5 5.5L16 8l-6.5 2.5L8 16l-1.5-5.5L0 8l6.5-2.5z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute left-8 top-6 text-white/40"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l1.5 5.5L16 8l-6.5 2.5L8 16l-1.5-5.5L0 8l6.5-2.5z" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MidCTABanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-[#0099cc] via-[#33b5e5] to-[#0099cc] px-8 py-12 md:px-14 md:py-16"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT: Copy + CTA */}
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Create your QR codes today!
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
              Generate custom, dynamic QR codes in seconds. Share links, social
              profiles, contact info, and more -- all from one easy-to-use platform.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-block rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary-dark"
            >
              Create QR Code
            </Link>
          </div>

          {/* RIGHT: QR illustration with social icons */}
          <div className="flex justify-center lg:justify-end">
            <QRWithSocialIcons />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

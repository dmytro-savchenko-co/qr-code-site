import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change / resize
  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white border-b border-gray-200 transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <QrCode className="h-7 w-7 text-primary" strokeWidth={2.2} />
          <span className="text-xl font-bold leading-none">
            <span className="text-navy">QR code</span>
            <span className="text-primary">.io</span>
          </span>
        </Link>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-navy px-5 py-2 text-center text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-primary px-5 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

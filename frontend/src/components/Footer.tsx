import { Link } from 'react-router-dom'
import { QrCode } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <QrCode className="h-7 w-7 text-primary" strokeWidth={2.2} />
              <span className="text-xl font-bold leading-none">
                <span className="text-white">QR code</span>
                <span className="text-primary">.io</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Generate dynamic QR codes to market your business
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  Create QR Codes
                </Link>
              </li>
              <li>
                <Link
                  to="/plans"
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  Plans and Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Help
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center text-xs text-gray-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>&copy; 2026 - QR Code.io</span>
          <span>
            QR Code is a registered trademark of DENSO WAVE INCORPORATED
          </span>
        </div>
      </div>
    </footer>
  )
}

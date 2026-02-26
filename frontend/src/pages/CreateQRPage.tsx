import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Globe,
  FileText,
  Contact,
  Wifi,
  Building2,
  Share2,
  MessageCircle,
  Smartphone,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import QRCodeStyling from 'qr-code-styling'
import api from '../lib/api'
import { useAuth } from '../lib/auth'

// ---------- Types ----------

type QRType =
  | 'website'
  | 'pdf'
  | 'vcard'
  | 'wifi'
  | 'business'
  | 'social'
  | 'whatsapp'
  | 'apps'

interface QRTypeOption {
  type: QRType
  label: string
  icon: React.ElementType
}

type DotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded'
type CornerSquareType = 'square' | 'dot' | 'extra-rounded' | ''
type CornerDotType = 'square' | 'dot' | ''

interface SocialLink {
  platform: string
  url: string
}

interface FormData {
  name: string
  // Website / PDF
  url: string
  // vCard
  firstName: string
  lastName: string
  phone: string
  email: string
  company: string
  title: string
  // WiFi
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'None'
  // Business
  companyName: string
  website: string
  address: string
  // Social
  socialLinks: SocialLink[]
  // WhatsApp
  phoneNumber: string
  message: string
  // Apps
  iosUrl: string
  androidUrl: string
}

// ---------- Constants ----------

const QR_TYPES: QRTypeOption[] = [
  { type: 'website', label: 'Website', icon: Globe },
  { type: 'pdf', label: 'PDF', icon: FileText },
  { type: 'vcard', label: 'vCard', icon: Contact },
  { type: 'wifi', label: 'WiFi', icon: Wifi },
  { type: 'business', label: 'Business', icon: Building2 },
  { type: 'social', label: 'Social Media', icon: Share2 },
  { type: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { type: 'apps', label: 'Apps', icon: Smartphone },
]

const DOT_STYLES: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
]

const CORNER_SQUARE_STYLES: { value: CornerSquareType; label: string }[] = [
  { value: '', label: 'Default' },
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
]

const CORNER_DOT_STYLES: { value: CornerDotType; label: string }[] = [
  { value: '', label: 'Default' },
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
]

const initialFormData: FormData = {
  name: '',
  url: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  company: '',
  title: '',
  ssid: '',
  password: '',
  encryption: 'WPA',
  companyName: '',
  website: '',
  address: '',
  socialLinks: [{ platform: '', url: '' }],
  phoneNumber: '',
  message: '',
  iosUrl: '',
  androidUrl: '',
}

// ---------- Helpers ----------

function buildQRData(type: QRType, form: FormData): string {
  switch (type) {
    case 'website':
    case 'pdf':
      return form.url || 'https://example.com'
    case 'vcard': {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${form.lastName};${form.firstName}`,
        `FN:${form.firstName} ${form.lastName}`,
        form.phone ? `TEL:${form.phone}` : '',
        form.email ? `EMAIL:${form.email}` : '',
        form.company ? `ORG:${form.company}` : '',
        form.title ? `TITLE:${form.title}` : '',
        'END:VCARD',
      ]
      return lines.filter(Boolean).join('\n')
    }
    case 'wifi':
      return `WIFI:T:${form.encryption};S:${form.ssid};P:${form.password};;`
    case 'business': {
      const parts = [
        form.companyName,
        form.phone ? `Tel: ${form.phone}` : '',
        form.email ? `Email: ${form.email}` : '',
        form.website,
        form.address,
      ]
      return parts.filter(Boolean).join('\n') || 'https://example.com'
    }
    case 'social': {
      const links = form.socialLinks
        .filter((l) => l.url)
        .map((l) => (l.platform ? `${l.platform}: ${l.url}` : l.url))
      return links.join('\n') || 'https://example.com'
    }
    case 'whatsapp':
      return `https://wa.me/${form.phoneNumber.replace(/\D/g, '')}${form.message ? `?text=${encodeURIComponent(form.message)}` : ''}`
    case 'apps': {
      const urls = [form.iosUrl, form.androidUrl].filter(Boolean)
      return urls.join('\n') || 'https://example.com'
    }
    default:
      return 'https://example.com'
  }
}

// ---------- Component ----------

export default function CreateQRPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true })
    }
  }, [authLoading, user, navigate])

  // Form state
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<QRType | null>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  // Customisation state
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [dotStyle, setDotStyle] = useState<DotType>('square')
  const [cornerSquareStyle, setCornerSquareStyle] = useState<CornerSquareType>('')
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotType>('')

  // QR code preview
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling | null>(null)

  // Build current data string for QR
  const qrData = selectedType ? buildQRData(selectedType, formData) : 'https://example.com'

  // Initialise QRCodeStyling once on step 3
  useEffect(() => {
    if (step !== 3) return

    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: qrData,
      dotsOptions: { color: fgColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: cornerSquareStyle ? { type: cornerSquareStyle } : undefined,
      cornersDotOptions: cornerDotStyle ? { type: cornerDotStyle } : undefined,
    })

    qrCodeInstance.current = qr

    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }

    return () => {
      qrCodeInstance.current = null
      if (qrRef.current) {
        qrRef.current.innerHTML = ''
      }
    }
    // Only run when entering step 3
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Update QR code when customisation options change
  useEffect(() => {
    if (step !== 3 || !qrCodeInstance.current) return

    qrCodeInstance.current.update({
      data: qrData,
      dotsOptions: { color: fgColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: cornerSquareStyle ? { type: cornerSquareStyle } : undefined,
      cornersDotOptions: cornerDotStyle ? { type: cornerDotStyle } : undefined,
    })
  }, [step, qrData, fgColor, bgColor, dotStyle, cornerSquareStyle, cornerDotStyle])

  // Mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      // Build targetUrl for URL-based types
      let targetUrl: string | undefined
      if (selectedType === 'website' || selectedType === 'pdf') {
        targetUrl = formData.url
      } else if (selectedType === 'whatsapp') {
        targetUrl = qrData
      }

      const payload = {
        name: formData.name,
        type: selectedType,
        targetUrl,
        content: { ...formData, socialLinks: formData.socialLinks || [] },
        data: qrData,
        style: {
          fgColor,
          bgColor,
          dotStyle,
          cornerSquareStyle,
          cornerDotStyle,
        },
      }
      return api.post('/qr-codes', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] })
      toast.success('QR code created successfully!')
      navigate('/dashboard')
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to create QR code')
    },
  })

  // Field updater
  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  // Social link helpers
  const addSocialLink = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }],
    }))
  }, [])

  const removeSocialLink = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }))
  }, [])

  const updateSocialLink = useCallback((index: number, field: 'platform' | 'url', value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }, [])

  // Step validation
  const canProceedStep1 = selectedType !== null

  const canProceedStep2 = useCallback((): boolean => {
    if (!selectedType) return false
    if (!formData.name.trim()) return false

    switch (selectedType) {
      case 'website':
      case 'pdf':
        return formData.url.trim().length > 0
      case 'vcard':
        return formData.firstName.trim().length > 0 && formData.lastName.trim().length > 0
      case 'wifi':
        return formData.ssid.trim().length > 0
      case 'business':
        return formData.companyName.trim().length > 0
      case 'social':
        return formData.socialLinks.some((l) => l.url.trim().length > 0)
      case 'whatsapp':
        return formData.phoneNumber.trim().length > 0
      case 'apps':
        return formData.iosUrl.trim().length > 0 || formData.androidUrl.trim().length > 0
      default:
        return false
    }
  }, [selectedType, formData])

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  // ---------- Render helpers ----------

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-10">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              s === step
                ? 'bg-primary text-white'
                : s < step
                  ? 'bg-primary-dark text-white'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s}
          </div>
          {s < 3 && (
            <div
              className={`w-16 h-1 rounded ${s < step ? 'bg-primary-dark' : 'bg-gray-200'}`}
            />
          )}
        </div>
      ))}
    </div>
  )

  // ---- Step 1: Select Type ----
  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold text-navy text-center mb-2">Select QR Code Type</h2>
      <p className="text-gray-500 text-center mb-8">Choose the type of content for your QR code</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {QR_TYPES.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all hover:shadow-md ${
              selectedType === type
                ? 'border-primary bg-primary-light shadow-md'
                : 'border-gray-200 bg-white hover:border-primary/40'
            }`}
          >
            <Icon
              className={`w-8 h-8 ${selectedType === type ? 'text-primary-dark' : 'text-gray-500'}`}
            />
            <span
              className={`text-sm font-medium ${selectedType === type ? 'text-primary-dark' : 'text-gray-700'}`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-10 max-w-2xl mx-auto">
        <button
          type="button"
          disabled={!canProceedStep1}
          onClick={() => setStep(2)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  // ---- Step 2: Enter Content ----
  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-sm'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  const renderContentForm = () => {
    switch (selectedType) {
      case 'website':
      case 'pdf':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My QR Code"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>URL *</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => updateField('url', e.target.value)}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>
          </>
        )

      case 'vcard':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My vCard QR"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="John"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Doe"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 555 123 4567"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Acme Inc."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Software Engineer"
                className={inputClass}
              />
            </div>
          </>
        )

      case 'wifi':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My WiFi QR"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>SSID (Network Name) *</label>
              <input
                type="text"
                value={formData.ssid}
                onChange={(e) => updateField('ssid', e.target.value)}
                placeholder="MyNetwork"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="text"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Network password"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Encryption</label>
              <select
                value={formData.encryption}
                onChange={(e) => updateField('encryption', e.target.value as 'WPA' | 'WEP' | 'None')}
                className={inputClass}
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="None">None</option>
              </select>
            </div>
          </>
        )

      case 'business':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My Business QR"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Company Name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Acme Inc."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 555 123 4567"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="info@acme.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://acme.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="123 Main St, City, Country"
                className={inputClass}
              />
            </div>
          </>
        )

      case 'social':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My Social QR"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Social Links *</label>
              <div className="space-y-3">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                      placeholder="Platform (e.g. Twitter)"
                      className={`${inputClass} w-1/3`}
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      placeholder="https://twitter.com/username"
                      className={`${inputClass} flex-1`}
                    />
                    {formData.socialLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSocialLink}
                className="mt-2 flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
          </>
        )

      case 'whatsapp':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My WhatsApp QR"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateField('phoneNumber', e.target.value)}
                placeholder="+1 555 123 4567"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Pre-filled Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Hello! I scanned your QR code."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        )

      case 'apps':
        return (
          <>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="My App QR"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>iOS App Store URL</label>
              <input
                type="url"
                value={formData.iosUrl}
                onChange={(e) => updateField('iosUrl', e.target.value)}
                placeholder="https://apps.apple.com/app/..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Android Play Store URL</label>
              <input
                type="url"
                value={formData.androidUrl}
                onChange={(e) => updateField('androidUrl', e.target.value)}
                placeholder="https://play.google.com/store/apps/..."
                className={inputClass}
              />
            </div>
          </>
        )

      default:
        return null
    }
  }

  const renderStep2 = () => (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-navy text-center mb-2">Enter Content</h2>
      <p className="text-gray-500 text-center mb-8">
        Fill in the details for your{' '}
        {QR_TYPES.find((t) => t.type === selectedType)?.label ?? ''} QR code
      </p>

      <div className="space-y-5">{renderContentForm()}</div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          disabled={!canProceedStep2()}
          onClick={() => setStep(3)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  // ---- Step 3: Customize & Preview ----
  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold text-navy text-center mb-2">Customize & Preview</h2>
      <p className="text-gray-500 text-center mb-8">Style your QR code and preview it live</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Left: Customisation */}
        <div className="space-y-6">
          {/* QR Name */}
          <div>
            <label className={labelClass}>QR Code Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="My QR Code"
              className={inputClass}
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Foreground Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className={`${inputClass} flex-1`}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className={`${inputClass} flex-1`}
                />
              </div>
            </div>
          </div>

          {/* Dot Style */}
          <div>
            <label className={labelClass}>Dot Style</label>
            <div className="grid grid-cols-3 gap-2">
              {DOT_STYLES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDotStyle(value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    dotStyle === value
                      ? 'border-primary bg-primary-light text-primary-dark'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Square Style */}
          <div>
            <label className={labelClass}>Corner Square Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CORNER_SQUARE_STYLES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCornerSquareStyle(value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    cornerSquareStyle === value
                      ? 'border-primary bg-primary-light text-primary-dark'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Dot Style */}
          <div>
            <label className={labelClass}>Corner Dot Style</label>
            <div className="grid grid-cols-3 gap-2">
              {CORNER_DOT_STYLES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCornerDotStyle(value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    cornerDotStyle === value
                      ? 'border-primary bg-primary-light text-primary-dark'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div ref={qrRef} className="flex items-center justify-center" />
          </div>
          <p className="text-xs text-gray-400 mt-3">Live preview</p>
        </div>
      </div>

      <div className="flex justify-between mt-10 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          disabled={createMutation.isPending || !formData.name.trim()}
          onClick={() => createMutation.mutate()}
          className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {createMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating...
            </>
          ) : (
            'Create QR Code'
          )}
        </button>
      </div>
    </div>
  )

  // ---------- Main Render ----------

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="text-navy font-bold text-xl">
            QR Creator
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {renderStepIndicator()}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </main>
    </div>
  )
}

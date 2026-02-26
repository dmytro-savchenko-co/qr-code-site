import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  Save,
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

type DotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded'
type CornerSquareType = 'square' | 'dot' | 'extra-rounded' | ''
type CornerDotType = 'square' | 'dot' | ''

interface SocialLink {
  platform: string
  url: string
}

interface FormData {
  name: string
  url: string
  firstName: string
  lastName: string
  phone: string
  email: string
  company: string
  title: string
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'None'
  companyName: string
  website: string
  address: string
  socialLinks: SocialLink[]
  phoneNumber: string
  message: string
  iosUrl: string
  androidUrl: string
}

// ---------- Constants ----------

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

const TYPE_LABELS: Record<string, string> = {
  website: 'Website',
  pdf: 'PDF',
  vcard: 'vCard',
  wifi: 'WiFi',
  business: 'Business',
  social: 'Social Media',
  whatsapp: 'WhatsApp',
  apps: 'Apps',
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

function contentToFormData(_type: string, content: Record<string, unknown>): Partial<FormData> {
  const c = content as Record<string, string | SocialLink[]>
  return {
    name: (c.name as string) || '',
    url: (c.url as string) || '',
    firstName: (c.firstName as string) || '',
    lastName: (c.lastName as string) || '',
    phone: (c.phone as string) || '',
    email: (c.email as string) || '',
    company: (c.company as string) || '',
    title: (c.title as string) || '',
    ssid: (c.ssid as string) || '',
    password: (c.password as string) || '',
    encryption: ((c.encryption as string) || 'WPA') as 'WPA' | 'WEP' | 'None',
    companyName: (c.companyName as string) || '',
    website: (c.website as string) || '',
    address: (c.address as string) || '',
    socialLinks: (Array.isArray(c.socialLinks) ? c.socialLinks : [{ platform: '', url: '' }]) as SocialLink[],
    phoneNumber: (c.phoneNumber as string) || '',
    message: (c.message as string) || '',
    iosUrl: (c.iosUrl as string) || '',
    androidUrl: (c.androidUrl as string) || '',
  }
}

// ---------- Component ----------

export default function EditQRPage() {
  const { id } = useParams<{ id: string }>()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true })
    }
  }, [authLoading, user, navigate])

  // Fetch existing QR code
  const { data: qrCode, isLoading: qrLoading } = useQuery({
    queryKey: ['qr-code', id],
    queryFn: async () => {
      const res = await api.get(`/qr-codes/${id}`)
      return res.data
    },
    enabled: !!id && !!user,
  })

  // Form state
  const [formData, setFormData] = useState<FormData | null>(null)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [dotStyle, setDotStyle] = useState<DotType>('square')
  const [cornerSquareStyle, setCornerSquareStyle] = useState<CornerSquareType>('')
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotType>('')
  const [initialized, setInitialized] = useState(false)

  // Populate form when QR code data loads
  useEffect(() => {
    if (!qrCode || initialized) return
    const content = (qrCode.content || {}) as Record<string, unknown>
    const style = (qrCode.style || {}) as Record<string, string>
    const partial = contentToFormData(qrCode.type, content)
    setFormData({
      name: qrCode.name || '',
      url: partial.url || '',
      firstName: partial.firstName || '',
      lastName: partial.lastName || '',
      phone: partial.phone || '',
      email: partial.email || '',
      company: partial.company || '',
      title: partial.title || '',
      ssid: partial.ssid || '',
      password: partial.password || '',
      encryption: partial.encryption || 'WPA',
      companyName: partial.companyName || '',
      website: partial.website || '',
      address: partial.address || '',
      socialLinks: partial.socialLinks || [{ platform: '', url: '' }],
      phoneNumber: partial.phoneNumber || '',
      message: partial.message || '',
      iosUrl: partial.iosUrl || '',
      androidUrl: partial.androidUrl || '',
    })
    setFgColor(style.fgColor || style.dotsColor || '#000000')
    setBgColor(style.bgColor || style.backgroundColor || '#ffffff')
    setDotStyle((style.dotStyle as DotType) || 'square')
    setCornerSquareStyle((style.cornerSquareStyle as CornerSquareType) || '')
    setCornerDotStyle((style.cornerDotStyle as CornerDotType) || '')
    setInitialized(true)
  }, [qrCode, initialized])

  // QR code preview
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling | null>(null)

  const qrType = (qrCode?.type || 'website') as QRType
  const qrData = formData ? buildQRData(qrType, formData) : 'https://example.com'

  // Init QR preview
  useEffect(() => {
    if (!formData) return

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!formData])

  // Update QR preview on style changes
  useEffect(() => {
    if (!qrCodeInstance.current || !formData) return

    qrCodeInstance.current.update({
      data: qrData,
      dotsOptions: { color: fgColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: cornerSquareStyle ? { type: cornerSquareStyle } : undefined,
      cornersDotOptions: cornerDotStyle ? { type: cornerDotStyle } : undefined,
    })
  }, [formData, qrData, fgColor, bgColor, dotStyle, cornerSquareStyle, cornerDotStyle])

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!formData) return

      let targetUrl: string | undefined
      if (qrType === 'website' || qrType === 'pdf') {
        targetUrl = formData.url
      } else if (qrType === 'whatsapp') {
        targetUrl = qrData
      }

      const payload = {
        name: formData.name,
        targetUrl: targetUrl || null,
        content: { ...formData, socialLinks: formData.socialLinks || [] },
        style: {
          fgColor,
          bgColor,
          dotStyle,
          cornerSquareStyle,
          cornerDotStyle,
        },
      }
      return api.put(`/qr-codes/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] })
      queryClient.invalidateQueries({ queryKey: ['qr-code', id] })
      toast.success('QR code updated!')
      navigate('/dashboard')
    },
    onError: () => {
      toast.error('Failed to update QR code')
    },
  })

  // Field updater
  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
    },
    [],
  )

  // Social link helpers
  const addSocialLink = useCallback(() => {
    setFormData((prev) =>
      prev
        ? { ...prev, socialLinks: [...prev.socialLinks, { platform: '', url: '' }] }
        : prev,
    )
  }, [])

  const removeSocialLink = useCallback((index: number) => {
    setFormData((prev) =>
      prev
        ? { ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== index) }
        : prev,
    )
  }, [])

  const updateSocialLink = useCallback((index: number, field: 'platform' | 'url', value: string) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            socialLinks: prev.socialLinks.map((link, i) =>
              i === index ? { ...link, [field]: value } : link,
            ),
          }
        : prev,
    )
  }, [])

  // ---------- Loading / Auth states ----------

  if (authLoading || qrLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !qrCode || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">QR code not found</p>
          <Link to="/dashboard" className="text-primary font-medium hover:text-primary-dark">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Render helpers ----------

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-sm'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  const renderContentForm = () => {
    switch (qrType) {
      case 'website':
      case 'pdf':
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>URL</label>
              <input type="url" value={formData.url} onChange={(e) => updateField('url', e.target.value)} placeholder="https://example.com" className={inputClass} />
            </div>
          </>
        )
      case 'vcard':
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <input type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input type="text" value={formData.company} onChange={(e) => updateField('company', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Title</label>
              <input type="text" value={formData.title} onChange={(e) => updateField('title', e.target.value)} className={inputClass} />
            </div>
          </>
        )
      case 'wifi':
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SSID (Network Name)</label>
              <input type="text" value={formData.ssid} onChange={(e) => updateField('ssid', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="text" value={formData.password} onChange={(e) => updateField('password', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Encryption</label>
              <select value={formData.encryption} onChange={(e) => updateField('encryption', e.target.value as 'WPA' | 'WEP' | 'None')} className={inputClass}>
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
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Company Name</label>
              <input type="text" value={formData.companyName} onChange={(e) => updateField('companyName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input type="url" value={formData.website} onChange={(e) => updateField('website', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input type="text" value={formData.address} onChange={(e) => updateField('address', e.target.value)} className={inputClass} />
            </div>
          </>
        )
      case 'social':
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Social Links</label>
              <div className="space-y-3">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" value={link.platform} onChange={(e) => updateSocialLink(index, 'platform', e.target.value)} placeholder="Platform" className={`${inputClass} w-1/3`} />
                    <input type="url" value={link.url} onChange={(e) => updateSocialLink(index, 'url', e.target.value)} placeholder="https://..." className={`${inputClass} flex-1`} />
                    {formData.socialLinks.length > 1 && (
                      <button type="button" onClick={() => removeSocialLink(index)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={addSocialLink} className="mt-2 flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark font-medium">
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
          </>
        )
      case 'whatsapp':
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="tel" value={formData.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Pre-filled Message</label>
              <textarea value={formData.message} onChange={(e) => updateField('message', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
            </div>
          </>
        )
      case 'apps':
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>iOS App Store URL</label>
              <input type="url" value={formData.iosUrl} onChange={(e) => updateField('iosUrl', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Android Play Store URL</label>
              <input type="url" value={formData.androidUrl} onChange={(e) => updateField('androidUrl', e.target.value)} className={inputClass} />
            </div>
          </>
        )
      default:
        return (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </div>
          </>
        )
    }
  }

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
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-navy mb-1">Edit QR Code</h1>
          <p className="text-gray-500">
            Editing <span className="font-medium text-navy">{qrCode.name}</span>
            {' '}&middot;{' '}
            <span className="capitalize">{TYPE_LABELS[qrType] || qrType}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Left: Content + Style */}
          <div className="space-y-8">
            {/* Content fields */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-4">Content</h2>
              <div className="space-y-4">{renderContentForm()}</div>
            </div>

            {/* Style options */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-4">Style</h2>
              <div className="space-y-5">
                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Foreground</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5" />
                      <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className={`${inputClass} flex-1`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Background</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5" />
                      <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className={`${inputClass} flex-1`} />
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
            </div>
          </div>

          {/* Right: Preview */}
          <div className="flex flex-col items-center">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div ref={qrRef} className="flex items-center justify-center" />
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">Live preview</p>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end mt-10 max-w-4xl mx-auto">
          <button
            type="button"
            disabled={saveMutation.isPending || !formData.name.trim()}
            onClick={() => saveMutation.mutate()}
            className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

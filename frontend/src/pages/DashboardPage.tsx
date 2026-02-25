import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  PlusCircle,
  QrCode,
  BarChart3,
  Activity,
  ExternalLink,
  Pencil,
  Trash2,
  Loader2,
  Search,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../lib/auth'
import api from '../lib/api'
import AppLayout from '../components/AppLayout'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QRCode {
  id: string
  name: string
  type: string
  shortCode: string
  targetUrl: string | null
  isActive: boolean
  createdAt: string
  _count: { scanEvents: number }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')

  /* ---- Fetch QR codes ---- */
  const {
    data: qrCodes = [],
    isLoading,
    isError,
  } = useQuery<QRCode[]>({
    queryKey: ['qr-codes'],
    queryFn: async () => {
      const res = await api.get('/qr-codes')
      return res.data
    },
  })

  /* ---- Delete mutation ---- */
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/qr-codes/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] })
      toast.success('QR code deleted')
    },
    onError: () => {
      toast.error('Failed to delete QR code')
    },
  })

  /* ---- Toggle active mutation ---- */
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      await api.put(`/qr-codes/${id}`, { isActive })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr-codes'] })
    },
    onError: () => {
      toast.error('Failed to update QR code')
    },
  })

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleToggleActive = (id: string, currentActive: boolean) => {
    toggleActiveMutation.mutate({ id, isActive: !currentActive })
  }

  /* ---- Derived data ---- */
  const totalScans = qrCodes.reduce((sum, qr) => sum + qr._count.scanEvents, 0)
  const totalCodes = qrCodes.length
  const activeCodes = qrCodes.filter((qr) => qr.isActive).length

  const filteredCodes = searchQuery
    ? qrCodes.filter(
        (qr) =>
          qr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          qr.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : qrCodes

  /* ---- Stats config ---- */
  const stats = [
    {
      label: 'Total QR Codes',
      value: totalCodes,
      icon: QrCode,
      color: 'text-primary',
      bg: 'bg-primary-light',
    },
    {
      label: 'Total Scans',
      value: totalScans,
      icon: BarChart3,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Active Codes',
      value: activeCodes,
      icon: Activity,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ]

  return (
    <AppLayout>
      {/* Welcome header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">
            Welcome back, {user?.name?.split(' ')[0] ?? 'there'}
          </h1>
          <p className="mt-1 text-gray-500">
            Manage your QR codes and track their performance.
          </p>
        </div>
        <Link
          to="/qr/create"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
        >
          <PlusCircle className="h-5 w-5" />
          Create New QR Code
        </Link>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-navy">
                {isLoading ? (
                  <span className="inline-block h-7 w-12 animate-pulse rounded bg-gray-200" />
                ) : (
                  stat.value.toLocaleString()
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* QR Codes section header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-navy">Your QR Codes</h2>

        {qrCodes.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search QR codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-64"
            />
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-sm text-gray-500">Loading your QR codes...</p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="rounded-2xl bg-red-50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-red-600">
            Failed to load QR codes. Please try again later.
          </p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['qr-codes'] })}
            className="mt-4 rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && qrCodes.length === 0 && (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-gray-100">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-navy">No QR codes yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Create your first QR code and start tracking scans.
          </p>
          <Link
            to="/qr/create"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <PlusCircle className="h-5 w-5" />
            Create Your First QR Code
          </Link>
        </div>
      )}

      {/* No search results */}
      {!isLoading && !isError && qrCodes.length > 0 && filteredCodes.length === 0 && (
        <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">
            No QR codes match "{searchQuery}".
          </p>
        </div>
      )}

      {/* QR Codes grid */}
      {!isLoading && !isError && filteredCodes.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCodes.map((qr) => (
            <QRCodeCard
              key={qr.id}
              qr={qr}
              onDelete={() => handleDelete(qr.id, qr.name)}
              onToggleActive={() => handleToggleActive(qr.id, qr.isActive)}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === qr.id}
            />
          ))}
        </div>
      )}
    </AppLayout>
  )
}

/* ------------------------------------------------------------------ */
/*  QR Code Card                                                       */
/* ------------------------------------------------------------------ */

interface QRCodeCardProps {
  qr: QRCode
  onDelete: () => void
  onToggleActive: () => void
  isDeleting: boolean
}

function QRCodeCard({ qr, onDelete, onToggleActive, isDeleting }: QRCodeCardProps) {
  const formattedDate = new Date(qr.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const typeBadgeColors: Record<string, string> = {
    website: 'bg-blue-50 text-blue-700',
    pdf: 'bg-rose-50 text-rose-700',
    vcard: 'bg-purple-50 text-purple-700',
    wifi: 'bg-amber-50 text-amber-700',
    business: 'bg-emerald-50 text-emerald-700',
    social: 'bg-pink-50 text-pink-700',
    whatsapp: 'bg-green-50 text-green-700',
    apps: 'bg-teal-50 text-teal-700',
  }

  const badgeColor = typeBadgeColors[qr.type.toLowerCase()] ?? 'bg-gray-100 text-gray-700'

  return (
    <div className="group flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md">
      {/* Top row: name + type badge */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-navy leading-snug line-clamp-1">
          {qr.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badgeColor}`}
        >
          {qr.type}
        </span>
      </div>

      {/* Short URL */}
      <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">/r/{qr.shortCode}</span>
      </div>

      {/* Stats row */}
      <div className="mb-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-500">
          <BarChart3 className="h-4 w-4" />
          <span>
            {qr._count.scanEvents.toLocaleString()} scan{qr._count.scanEvents !== 1 ? 's' : ''}
          </span>
        </div>
        <span className="text-gray-300">|</span>
        <span className="text-gray-400">{formattedDate}</span>
      </div>

      {/* Bottom row: status toggle + actions */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
        {/* Active/Inactive toggle */}
        <button
          onClick={onToggleActive}
          className="flex items-center gap-2"
          aria-label={qr.isActive ? 'Deactivate QR code' : 'Activate QR code'}
        >
          <div
            className={`relative h-6 w-11 rounded-full transition-colors ${
              qr.isActive ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                qr.isActive ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
          <span className={`text-xs font-medium ${qr.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
            {qr.isActive ? 'Active' : 'Inactive'}
          </span>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Link
            to={`/qr/${qr.id}/edit`}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-navy"
            aria-label="Edit QR code"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            aria-label="Delete QR code"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

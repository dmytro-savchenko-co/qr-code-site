import { Router, type IRouter } from 'express'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import QRCode from 'qrcode'
import type { InputJsonValue } from '@prisma/client/runtime/library'
import prisma from '../lib/prisma.js'
import { authenticate, type AuthRequest } from '../middleware/auth.js'

const router: IRouter = Router()
router.use(authenticate)

const createSchema = z.object({
  type: z.string(),
  name: z.string().min(1),
  targetUrl: z.string().url().optional(),
  content: z.record(z.string(), z.unknown()),
  style: z.record(z.string(), z.unknown()).optional(),
  data: z.string().optional(),
})

// Create QR code
router.post('/', async (req: AuthRequest, res) => {
  try {
    const parsed = createSchema.parse(req.body)
    const shortCode = nanoid(8)

    // Use the data field as targetUrl if no explicit targetUrl was provided
    const targetUrl = parsed.targetUrl || parsed.data || null

    const qrCode = await prisma.qRCode.create({
      data: {
        type: parsed.type,
        name: parsed.name,
        targetUrl,
        shortCode,
        userId: req.userId!,
        content: parsed.content as InputJsonValue,
        style: (parsed.style || {}) as InputJsonValue,
      },
    })

    res.status(201).json(qrCode)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues })
      return
    }
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// List user's QR codes
router.get('/', async (req: AuthRequest, res) => {
  try {
    const qrCodes = await prisma.qRCode.findMany({
      where: { userId: req.userId },
      include: { _count: { select: { scanEvents: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(qrCodes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Get single QR code
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string
    const qrCode = await prisma.qRCode.findFirst({
      where: { id, userId: req.userId },
      include: { _count: { select: { scanEvents: true } } },
    })
    if (!qrCode) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.json(qrCode)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Update QR code
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string
    const existing = await prisma.qRCode.findFirst({
      where: { id, userId: req.userId },
    })
    if (!existing) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    const qrCode = await prisma.qRCode.update({
      where: { id },
      data: req.body,
    })
    res.json(qrCode)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Delete QR code
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string
    const existing = await prisma.qRCode.findFirst({
      where: { id, userId: req.userId },
    })
    if (!existing) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    await prisma.qRCode.delete({ where: { id } })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Download QR code image
router.get('/:id/download', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string
    const qrCode = await prisma.qRCode.findFirst({
      where: { id, userId: req.userId },
    })
    if (!qrCode) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const url = `${baseUrl}/r/${qrCode.shortCode}`
    const format = (req.query.format as string) || 'png'

    if (format === 'svg') {
      const svg = await QRCode.toString(url, { type: 'svg' })
      res.setHeader('Content-Type', 'image/svg+xml')
      res.setHeader('Content-Disposition', `attachment; filename="${qrCode.name}.svg"`)
      res.send(svg)
    } else {
      const buffer = await QRCode.toBuffer(url, { type: 'png', width: 1024 })
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Content-Disposition', `attachment; filename="${qrCode.name}.png"`)
      res.send(buffer)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Get analytics
router.get('/:id/analytics', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string
    const qrCode = await prisma.qRCode.findFirst({
      where: { id, userId: req.userId },
    })
    if (!qrCode) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    const totalScans = await prisma.scanEvent.count({
      where: { qrCodeId: qrCode.id },
    })

    const scansByDay = await prisma.scanEvent.groupBy({
      by: ['timestamp'],
      where: { qrCodeId: qrCode.id },
      _count: true,
      orderBy: { timestamp: 'asc' },
    })

    const scansByDevice = await prisma.scanEvent.groupBy({
      by: ['device'],
      where: { qrCodeId: qrCode.id },
      _count: true,
    })

    const scansByCountry = await prisma.scanEvent.groupBy({
      by: ['country'],
      where: { qrCodeId: qrCode.id },
      _count: true,
    })

    res.json({
      totalScans,
      scansByDay,
      scansByDevice,
      scansByCountry,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

import { Router, type IRouter } from 'express'
import prisma from '../lib/prisma.js'

const router: IRouter = Router()

router.get('/:shortCode', async (req, res) => {
  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: { shortCode: req.params.shortCode },
    })

    if (!qrCode || !qrCode.isActive) {
      res.status(404).json({ error: 'QR code not found' })
      return
    }

    // Log scan event asynchronously
    const ua = req.headers['user-agent'] || ''
    prisma.scanEvent.create({
      data: {
        qrCodeId: qrCode.id,
        ip: req.ip || null,
        userAgent: ua,
        referer: req.headers.referer || null,
      },
    }).catch(console.error)

    const targetUrl = qrCode.targetUrl || (qrCode.content as Record<string, unknown>)?.url as string
    if (targetUrl) {
      res.redirect(302, targetUrl)
    } else {
      res.status(404).json({ error: 'No target URL configured' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

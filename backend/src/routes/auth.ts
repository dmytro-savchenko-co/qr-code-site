import { Router, type IRouter } from 'express'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import { authenticate, signToken, type AuthRequest } from '../middleware/auth.js'
import { sendPasswordResetEmail } from '../lib/email.js'

const router: IRouter = Router()

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      res.status(400).json({ error: 'Email already in use' })
      return
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })

    const token = signToken(user.id)
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues })
      return
    }
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = signToken(user.id)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues })
      return
    }
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true },
    })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Forgot password - send reset email
const forgotSchema = z.object({
  email: z.string().email(),
})

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = forgotSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    // Always return success to prevent email enumeration
    if (!user) {
      res.json({ message: 'If that email exists, a reset link has been sent.' })
      return
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    })

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`

    try {
      await sendPasswordResetEmail(email, resetUrl)
    } catch (emailErr) {
      console.error('Failed to send reset email:', emailErr)
      // Still return success to prevent enumeration, but log the error
    }

    res.json({ message: 'If that email exists, a reset link has been sent.' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues })
      return
    }
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Reset password with token
const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
})

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = resetSchema.parse(req.body)

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    })

    if (!user) {
      res.status(400).json({ error: 'Invalid or expired reset token' })
      return
    }

    const hashed = await bcrypt.hash(password, 12)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    res.json({ message: 'Password has been reset successfully' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues })
      return
    }
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

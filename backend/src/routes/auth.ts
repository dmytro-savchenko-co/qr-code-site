import { Router, type IRouter } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import { authenticate, signToken, type AuthRequest } from '../middleware/auth.js'

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

export default router

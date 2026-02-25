import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import qrRoutes from './routes/qr.js'
import redirectRoutes from './routes/redirect.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use('/api/', limiter)

app.use('/api/auth', authRoutes)
app.use('/api/qr-codes', qrRoutes)
app.use('/r', redirectRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Serve frontend static files in production
const frontendDist = path.join(__dirname, '../../frontend/dist')
app.use(express.static(frontendDist))
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

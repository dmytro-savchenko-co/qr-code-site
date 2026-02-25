import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CreateQRPage from './pages/CreateQRPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/qr/create" element={<CreateQRPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

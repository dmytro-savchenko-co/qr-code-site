import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="text-primary font-medium hover:underline">Go Home</Link>
    </div>
  )
}

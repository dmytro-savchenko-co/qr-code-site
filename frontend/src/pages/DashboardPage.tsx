import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-navy mb-4">Dashboard</h1>
      <p className="text-gray-500 mb-6">Dashboard coming soon</p>
      <Link to="/" className="text-primary font-medium hover:underline">Back to Home</Link>
    </div>
  )
}

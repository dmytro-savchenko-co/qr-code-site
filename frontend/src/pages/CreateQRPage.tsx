import { Link } from 'react-router-dom'

export default function CreateQRPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-navy mb-4">Create QR Code</h1>
      <p className="text-gray-500 mb-6">QR Creator coming soon</p>
      <Link to="/dashboard" className="text-primary font-medium hover:underline">Back to Dashboard</Link>
    </div>
  )
}

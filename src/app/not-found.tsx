import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🤖</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl text-gray-600 mb-8">
          Oeps! Deze pagina bestaat niet.
        </h2>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white font-semibold gradient-bg rounded-xl hover:opacity-90"
          >
            Naar Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 text-gray-700 font-semibold bg-white rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            Naar Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

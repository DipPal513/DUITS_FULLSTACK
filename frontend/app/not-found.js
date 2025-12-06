import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
        Go Back Home
      </a>
    </div>
  )
}

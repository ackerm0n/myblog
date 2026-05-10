'use client'

import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
}

export default function SafeImage({ src, alt, className, fallback = '👨‍💻' }: SafeImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span className="flex items-center justify-center w-full h-full text-5xl bg-cream-200 dark:bg-warm-800">
        {fallback}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}

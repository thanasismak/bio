'use client'

import { useState } from 'react'
import { Copy, ExternalLink, Share2, Check } from 'lucide-react'

export default function ShareBar({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = typeof window !== 'undefined'
      ? window.location.href
      : `https://www.drbekas.gr/articles/${slug}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // fallback for browsers that block clipboard without HTTPS
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.drbekas.gr/articles/${slug}`)}`

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border type-caption transition-all duration-200 cursor-pointer ${
          copied
            ? 'border-teal-400/50 bg-teal-50 text-teal-600'
            : 'border-navy-950/[0.10] bg-white text-navy-950/60 hover:border-teal-400/40 hover:bg-teal-50/50 hover:text-teal-600'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-navy-950/[0.10] bg-white type-caption text-navy-950/60 hover:border-blue-400/40 hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-200"
      >
        <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
      </a>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-navy-950/[0.10] bg-white type-caption text-navy-950/60 hover:border-pink-400/40 hover:bg-pink-50/50 hover:text-pink-600 transition-all duration-200 cursor-pointer">
        <Share2 className="w-3.5 h-3.5" /> Instagram
      </button>
    </div>
  )
}

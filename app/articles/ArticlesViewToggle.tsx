'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, AlignJustify, Calendar, Clock, ChevronRight } from 'lucide-react'

export interface ArticleSummary {
  slug: string
  tag: string
  tagColor: string
  title: string
  excerpt: string
  date: string
  readTime: string
}

const LOREM = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.'

export default function ArticlesViewToggle({ articles }: { articles: ArticleSummary[] }) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div>
      {/* Toggle bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="type-caption text-navy-950/35">{articles.length} articles</p>
        <div className="flex items-center gap-0.5 p-1 rounded-xl border border-navy-950/[0.08] bg-white">
          <button
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg type-caption font-medium transition-all duration-150 ${
              view === 'grid'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'text-navy-950/40 hover:text-navy-950/70'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            aria-label="List view"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg type-caption font-medium transition-all duration-150 ${
              view === 'list'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'text-navy-950/40 hover:text-navy-950/70'
            }`}
          >
            <AlignJustify className="w-3.5 h-3.5" />
            List
          </button>
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {articles.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
              <article className="h-full p-7 rounded-2xl border border-navy-950/[0.08] bg-white hover:border-teal-400/30 hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow ${a.tagColor}`}>
                    {a.tag}
                  </span>
                  <span className="flex items-center gap-1.5 type-caption text-navy-950/30">
                    <Clock className="w-3 h-3" /> {a.readTime || '5 min'}
                  </span>
                </div>
                <h2 className="type-h3 text-navy-950 mb-3 group-hover:text-teal-600 transition-colors duration-300 leading-snug flex-1">
                  {a.title}
                </h2>
                <p className="type-body-sm text-navy-950/50 mb-5 leading-relaxed line-clamp-3">
                  {a.excerpt || LOREM}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-navy-950/[0.06]">
                  <span className="flex items-center gap-1.5 type-caption text-navy-950/30">
                    <Calendar className="w-3 h-3" /> {a.date}
                  </span>
                  <span className="flex items-center gap-1 type-caption text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="space-y-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
              <article className="p-5 rounded-2xl border border-navy-950/[0.08] bg-white hover:border-teal-400/30 hover:shadow-sm transition-all duration-300">
                <div className="flex items-start gap-5">
                  <span className={`mt-0.5 shrink-0 inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow ${a.tagColor}`}>
                    {a.tag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="type-h3 text-navy-950 mb-1.5 group-hover:text-teal-600 transition-colors duration-300 leading-snug">
                      {a.title}
                    </h2>
                    <p className="type-body-sm text-navy-950/50 leading-relaxed line-clamp-2">
                      {a.excerpt || LOREM}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 text-navy-950/30 type-caption">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {a.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime || '5 min'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0 hidden sm:block" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

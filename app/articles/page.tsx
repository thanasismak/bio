import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '../../src/lib/articles'
import { assetUrl } from '../../src/utils/assets'
import { Calendar, Clock, ChevronRight, ArrowLeft } from 'lucide-react'
import ArticlesViewToggle from './ArticlesViewToggle'
import type { ArticleSummary } from './ArticlesViewToggle'

export const metadata: Metadata = {
  title: 'Articles & Medical Updates | Dr. Kyriakos Bekas',
  description: 'Expert articles on sports injuries, arthroscopic surgery, joint replacement and regenerative medicine by Dr. Kyriakos Bekas.',
  openGraph: {
    title: 'Articles | Dr. Kyriakos Bekas',
    description: 'Expert articles on sports injuries, arthroscopic surgery and orthopaedics.',
  },
}

const LOREM_EXCERPT = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget.'

export default async function ArticlesPage() {
  const articles = await getArticles()
  const [featured, ...rest] = articles

  const restSummaries: ArticleSummary[] = rest.map(a => ({
    slug:     a.slug,
    tag:      a.tag,
    tagColor: a.tagColor,
    title:    a.title,
    excerpt:  a.excerpt,
    date:     a.date,
    readTime: a.readTime,
  }))

  return (
    <div className="min-h-screen bg-home-page">

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={assetUrl('/assets/surgery-operating-room.jpg')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,13,26,0.60) 0%, rgba(8,13,26,0.88) 100%)' }}
        />

        <div className="absolute top-0 left-0 right-0">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 type-caption text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> drbekas.gr
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">Medical Articles</span>
            <span className="h-px w-8 bg-teal-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white max-w-xl leading-snug">
            Knowledge that helps you make better decisions
          </h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16">

        {/* ── Featured ─────────────────────────────────────────────────────── */}
        {featured && (
          <Link href={`/articles/${featured.slug}`} className="group block mb-10">
            <article className="relative p-8 rounded-2xl border border-navy-950/[0.08] bg-white hover:border-teal-400/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-teal-400/0 rounded-t-2xl" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow ${featured.tagColor}`}>
                    {featured.tag}
                  </span>
                  <span className="type-eyebrow text-teal-400/70">Featured</span>
                </div>
                <div className="flex items-center gap-4 text-navy-950/30 shrink-0">
                  <span className="flex items-center gap-1.5 type-caption">
                    <Calendar className="w-3 h-3" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 type-caption">
                    <Clock className="w-3 h-3" /> {featured.readTime || '5 min'}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-navy-950 mb-3 group-hover:text-teal-600 transition-colors duration-300 max-w-2xl leading-snug">
                {featured.title}
              </h2>
              <p className="type-body text-navy-950/55 mb-6 max-w-xl leading-relaxed">
                {featured.excerpt || LOREM_EXCERPT}
              </p>

              <div className="flex items-center gap-2 text-teal-500 type-caption font-semibold">
                Read article
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </article>
          </Link>
        )}

        {/* ── Grid / List toggle ────────────────────────────────────────────── */}
        <ArticlesViewToggle articles={restSummaries} />

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-navy-950/[0.07] flex items-center justify-between">
          <Link
            href="/"
            className="type-body-sm text-navy-950/40 hover:text-teal-600 transition-colors flex items-center gap-2"
          >
            ← Back to home
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 bg-navy-950 text-white rounded-full type-caption font-semibold hover:bg-teal-600 transition-colors duration-200"
          >
            Book an Appointment
          </Link>
        </div>

      </main>
    </div>
  )
}

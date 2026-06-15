import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleSlugs, type ArticleSection } from '../../../src/lib/articles'
import { assetUrl } from '../../../src/utils/assets'
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react'
import ShareBar from '../ShareBar'

// ─── Static paths ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article not found' }

  return {
    title: `${article.title} | Dr. Kyriakos Bekas`,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.dateISO,
      authors: ['Dr. Kyriakos Bekas'],
      images: article.ogImage ? [{ url: article.ogImage, width: 800, height: 1067 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.ogImage ? [article.ogImage] : undefined,
    },
    alternates: {
      canonical: `https://www.drbekas.gr/articles/${slug}`,
    },
  }
}

// ─── Content renderer ─────────────────────────────────────────────────────────

function RenderSection({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'h2':
      return (
        <div className="pt-10 pb-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-teal-400 shrink-0" />
            <h2 className="text-xl font-semibold text-navy-950">{section.text}</h2>
          </div>
        </div>
      )
    case 'h3':
      return <h3 className="text-lg font-semibold text-navy-950 mt-6 mb-1">{section.text}</h3>
    case 'blockquote':
      return (
        <blockquote className="relative my-8 rounded-2xl border border-navy-950/[0.07] bg-navy-950/[0.03] px-8 py-7 overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ background: 'linear-gradient(to bottom, #2dd4bf, #2dd4bf80)' }}
          />
          <div className="absolute top-3 left-6 text-6xl text-teal-400/20 font-serif leading-none select-none">&ldquo;</div>
          <p className="type-body text-navy-950/80 italic font-medium leading-relaxed pt-4">
            {section.text}
          </p>
          {section.attribution && (
            <footer className="mt-4 flex items-center gap-2 type-caption text-navy-950/40 not-italic">
              <span className="h-px w-5 bg-teal-400/50" />
              {section.attribution}
            </footer>
          )}
        </blockquote>
      )
    case 'ul':
      return (
        <ul className="space-y-3 my-4">
          {(section.items ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-3 type-body-sm text-navy-950/70">
              <span className="w-5 h-5 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return <p className="type-body text-navy-950/70 leading-relaxed">{section.text}</p>
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-home-page">

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="relative h-[300px] md:h-[380px] overflow-hidden">
        <img
          src={assetUrl('/assets/surgery-operating-room.jpg')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,13,26,0.50) 0%, rgba(8,13,26,0.92) 100%)' }}
        />

        <div className="absolute top-0 left-0 right-0">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/articles"
              className="flex items-center gap-2 type-caption text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
            <span className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow ${article.tagColor}`}>
              {article.tag}
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 max-w-3xl mx-auto px-6 pb-10">
          <span className={`sm:hidden inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow mb-4 ${article.tagColor}`}>
            {article.tag}
          </span>
          <h1 className="text-2xl md:text-4xl font-semibold text-white leading-tight max-w-2xl">
            {article.title}
          </h1>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-24">

        {/* ── Author + meta ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 py-6 border-b border-navy-950/[0.07] mb-10">
          <div className="relative shrink-0">
            <img
              src={assetUrl('/profile/hero.jpeg')}
              alt="Dr. Kyriakos Bekas"
              className="w-12 h-12 rounded-full object-cover object-top"
              style={{ border: '2px solid rgba(45,212,191,0.35)' }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="type-body-sm text-navy-950 font-semibold">Dr. Kyriakos Bekas</p>
            <p className="type-caption text-navy-950/40">Orthopaedic Surgeon · M.D. · M.Sc. · FIFA</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-navy-950/30 shrink-0">
            <span className="flex items-center gap-1.5 type-caption">
              <Calendar className="w-3 h-3" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5 type-caption">
              <Clock className="w-3 h-3" /> {article.readTime || '5 min'}
            </span>
          </div>
        </div>

        {/* ── Excerpt lead ──────────────────────────────────────────────── */}
        {article.excerpt && (
          <p className="type-body text-navy-950/60 leading-relaxed text-lg mb-8 font-medium border-l-2 border-teal-400/40 pl-5">
            {article.excerpt}
          </p>
        )}

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="space-y-5">
          {article.sections.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>

        {/* ── Tags ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-navy-950/[0.07]">
          <span className={`px-3 py-1 rounded-full type-caption ${article.tagColor}`}>{article.tag}</span>
          <span className="px-3 py-1 rounded-full bg-navy-950/[0.05] type-caption text-navy-950/50">Dr. Kyriakos Bekas</span>
          <span className="px-3 py-1 rounded-full bg-navy-950/[0.05] type-caption text-navy-950/50">Orthopaedics</span>
        </div>

        {/* ── Share ────────────────────────────────────────────────────── */}
        <div className="mt-8 pt-8 border-t border-navy-950/[0.07]">
          <p className="type-eyebrow text-navy-950/40 mb-4">Share this article</p>
          <ShareBar slug={slug} />
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="mt-12 rounded-2xl bg-navy-950 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(65,194,188,0.12) 0%, transparent 65%)' }}
          />
          <img
            src={assetUrl('/assets/surgery-operating-room.jpg')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.08, objectPosition: 'center 40%' }}
          />
          <div className="relative p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <p className="type-eyebrow text-teal-400 mb-2">Have questions?</p>
              <h3 className="type-h3 text-white mb-2">Book an Appointment</h3>
              <p className="type-body-sm text-white/45">Expert assessment and a personalised treatment plan.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-400 text-navy-950 font-semibold rounded-full text-sm hover:bg-teal-300 transition-colors duration-200 shrink-0"
            >
              Contact <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Back ─────────────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-navy-950/[0.07] flex items-center justify-between">
          <Link
            href="/articles"
            className="flex items-center gap-2 type-body-sm text-navy-950/40 hover:text-teal-600 transition-colors"
          >
            ← All Articles
          </Link>
          <Link
            href="/"
            className="type-caption text-navy-950/30 hover:text-navy-950/60 transition-colors"
          >
            drbekas.gr
          </Link>
        </div>

      </article>
    </div>
  )
}

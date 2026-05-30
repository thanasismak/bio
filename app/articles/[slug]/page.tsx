import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleSlugs, type ArticleSection } from '../../../src/lib/articles'
import { ArrowLeft, Calendar, Clock, Copy, ExternalLink, Share2, ChevronRight, BookOpen } from 'lucide-react'

// ─── Static paths (build-time generation) ────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map(slug => ({ slug }))
}

// ─── Per-article SEO metadata ─────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Άρθρο δεν βρέθηκε' }

  return {
    title: article.title,
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

// ─── Article content renderer ─────────────────────────────────────────────────

function RenderSection({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 className="text-xl font-semibold text-navy-950 pt-6 pb-1 border-t border-navy-950/[0.07] mt-6">
          {section.text}
        </h2>
      )
    case 'h3':
      return <h3 className="text-lg font-semibold text-navy-950 mt-5">{section.text}</h3>
    case 'blockquote':
      return (
        <blockquote className="pl-5 py-1 my-6 border-l-2 border-teal-400">
          <p className="type-body text-navy-950/75 italic font-medium leading-relaxed">
            &ldquo;{section.text}&rdquo;
          </p>
          {section.attribution && (
            <footer className="type-caption text-navy-950/35 mt-2 not-italic">
              — {section.attribution}
            </footer>
          )}
        </blockquote>
      )
    case 'ul':
      return (
        <ul className="space-y-2 my-2">
          {(section.items ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-3 type-body-sm text-navy-950/70">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-2" />
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

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="border-b border-navy-950/[0.07] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/articles"
            className="flex items-center gap-2 type-caption text-navy-950/50 hover:text-navy-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Όλα τα Άρθρα
          </Link>
          <span className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow ${article.tagColor}`}>
            {article.tag}
          </span>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">

        {/* ── Article header ─────────────────────────────────────────────── */}
        <span className={`inline-block sm:hidden px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow mb-4 ${article.tagColor}`}>
          {article.tag}
        </span>
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy-950 leading-tight mb-6">
          {article.title}
        </h1>

        {/* ── Author + meta ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 py-5 border-t border-b border-navy-950/[0.07] mb-8">
          <div className="w-10 h-10 rounded-full bg-teal-400/15 flex items-center justify-center shrink-0 text-base">
            👨‍⚕️
          </div>
          <div className="flex-1 min-w-0">
            <p className="type-body-sm text-navy-950 font-semibold">Dr. Kyriakos Bekas</p>
            <p className="type-caption text-navy-950/40">Ορθοπαιδικός Χειρουργός · M.D. · M.Sc. · FIFA</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-navy-950/35 shrink-0">
            <span className="flex items-center gap-1.5 type-caption">
              <Calendar className="w-3 h-3" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5 type-caption">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {article.sections.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-navy-950/[0.07]">
          <span className={`px-3 py-1 rounded-full type-caption ${article.tagColor}`}>{article.tag}</span>
          <span className="px-3 py-1 rounded-full bg-navy-950/[0.05] type-caption text-navy-950/50">Dr. Kyriakos Bekas</span>
          <span className="px-3 py-1 rounded-full bg-navy-950/[0.05] type-caption text-navy-950/50">Ορθοπαιδική</span>
        </div>

        {/* ── Share ─────────────────────────────────────────────────────── */}
        <div className="mt-8 pt-8 border-t border-navy-950/[0.07]">
          <p className="type-eyebrow text-navy-950/40 mb-4">Μοιραστείτε το άρθρο</p>
          <div className="flex flex-wrap items-center gap-3">
            <ShareButton
              icon={<Copy className="w-3.5 h-3.5" />}
              label="Αντιγραφή συνδέσμου"
              hoverColor="hover:border-teal-400/40 hover:bg-teal-50/50 hover:text-teal-600"
            />
            <ShareButton
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              label="LinkedIn"
              hoverColor="hover:border-blue-400/40 hover:bg-blue-50/50 hover:text-blue-600"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.drbekas.gr/articles/${slug}`}
            />
            <ShareButton
              icon={<Share2 className="w-3.5 h-3.5" />}
              label="Instagram"
              hoverColor="hover:border-pink-400/40 hover:bg-pink-50/50 hover:text-pink-600"
            />
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="mt-12 p-8 rounded-2xl bg-navy-950 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(65,194,188,0.10) 0%, transparent 65%)' }}
          />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <p className="type-eyebrow text-teal-400 mb-2">Έχετε ερωτήσεις;</p>
              <h3 className="type-h3 text-white mb-2">Κλείστε Ραντεβού</h3>
              <p className="type-body-sm text-white/45">Εξειδικευμένη αξιολόγηση και εξατομικευμένο πλάνο θεραπείας.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-400 text-navy-950 font-semibold rounded-full text-sm hover:bg-teal-300 transition-colors duration-200 shrink-0"
            >
              Επικοινωνία <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Back ──────────────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-navy-950/[0.07] flex items-center justify-between">
          <Link
            href="/articles"
            className="flex items-center gap-2 type-body-sm text-navy-950/40 hover:text-teal-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Όλα τα Άρθρα
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

// ─── Share button (client interaction handled via href or JS) ─────────────────

function ShareButton({
  icon, label, hoverColor, href,
}: {
  icon: React.ReactNode
  label: string
  hoverColor: string
  href?: string
}) {
  const cls = `flex items-center gap-2 px-4 py-2 rounded-full border border-navy-950/[0.10] bg-white type-caption text-navy-950/60 transition-all duration-200 ${hoverColor}`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon} {label}
      </a>
    )
  }
  return (
    <button className={cls + ' cursor-pointer'}>
      {icon} {label}
    </button>
  )
}

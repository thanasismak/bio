import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '../../src/lib/articles'
import { Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Άρθρα & Ιατρική Ενημέρωση',
  description: 'Άρθρα του Δρ. Κυριάκου Μπέκα για αθλητικές κακώσεις, αρθροσκοπική χειρουργική, αρθροπλαστική και αναγεννητική ιατρική. Εξειδικευμένη ιατρική πληροφόρηση.',
  openGraph: {
    title: 'Άρθρα & Ιατρική Ενημέρωση | Dr. Kyriakos Bekas',
    description: 'Εξειδικευμένα ιατρικά άρθρα για αθλητικές κακώσεις, αρθροσκοπική χειρουργική και αρθροπλαστική.',
  },
}

export default async function ArticlesPage() {
  const articles = await getArticles()
  const [featured, ...rest] = articles

  return (
    <div className="min-h-screen bg-home-page">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="border-b border-navy-950/[0.07] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="type-h3 text-navy-950 font-semibold tracking-tight hover:text-teal-600 transition-colors">
            Dr. Bekas
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.5} />
            <span className="type-eyebrow text-teal-400">Άρθρα</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">Ιατρικά Άρθρα</span>
          </div>
          <h1 className="type-h2 text-navy-950 max-w-xl">
            Γνώση που σας βοηθά να αποφασίσετε καλύτερα
          </h1>
        </div>

        {/* ── Featured article ─────────────────────────────────────────────── */}
        {featured && (
          <Link href={`/articles/${featured.slug}`} className="group block mb-8">
            <article className="p-8 rounded-2xl border border-navy-950/[0.08] bg-white hover:border-teal-400/40 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-400 rounded-l-2xl" />
              <div className="pl-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow ${featured.tagColor}`}>
                    {featured.tag}
                  </span>
                  <span className="type-eyebrow text-teal-400/70">Προτεινόμενο</span>
                </div>
                <h2 className="text-2xl font-semibold text-navy-950 mb-3 group-hover:text-teal-600 transition-colors duration-300 max-w-2xl leading-snug">
                  {featured.title}
                </h2>
                <p className="type-body text-navy-950/55 mb-5 max-w-xl leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-navy-950/35">
                  <span className="flex items-center gap-1.5 type-caption">
                    <Calendar className="w-3 h-3" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 type-caption">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 type-caption text-teal-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    Διαβάστε <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* ── Article grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
              <article className="h-full p-7 rounded-2xl border border-navy-950/[0.08] bg-white hover:border-teal-400/30 hover:shadow-sm transition-all duration-300">
                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold type-eyebrow mb-4 ${article.tagColor}`}>
                  {article.tag}
                </span>
                <h2 className="type-h3 text-navy-950 mb-3 group-hover:text-teal-600 transition-colors duration-300 leading-snug">
                  {article.title}
                </h2>
                <p className="type-body-sm text-navy-950/55 mb-5 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-navy-950/35">
                    <span className="flex items-center gap-1.5 type-caption">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1.5 type-caption">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ── Back to site ──────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-navy-950/[0.07] flex items-center justify-between">
          <Link
            href="/"
            className="type-body-sm text-navy-950/40 hover:text-teal-600 transition-colors flex items-center gap-2"
          >
            ← Επιστροφή στην αρχική
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 bg-navy-950 text-white rounded-full type-caption font-semibold hover:bg-teal-600 transition-colors duration-200"
          >
            Κλείστε Ραντεβού
          </Link>
        </div>

      </main>
    </div>
  )
}

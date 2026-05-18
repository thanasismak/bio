import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { SEO_META, SITE } from './seoConfig'
import type { SeoLang } from './seoConfig'

// Upserts a <meta> tag — creates it if absent.
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export default function SeoManager() {
  const { lang } = useLanguage()
  const key = (lang as SeoLang) in SEO_META ? (lang as SeoLang) : 'el'
  const meta = SEO_META[key]

  useEffect(() => {
    // Document title + html[lang]
    document.title = meta.title
    document.documentElement.lang = meta.htmlLang

    // Standard meta
    setMeta('name', 'description', meta.description)
    setMeta('name', 'keywords',    meta.keywords)

    // Open Graph
    setMeta('property', 'og:title',       meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:locale',      meta.ogLocale)
    setMeta('property', 'og:url',         SITE.domain)

    // Twitter / X
    setMeta('name', 'twitter:title',       meta.title)
    setMeta('name', 'twitter:description', meta.description)
  }, [meta])

  return null
}

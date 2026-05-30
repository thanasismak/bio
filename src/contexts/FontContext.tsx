'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface FontPalette {
  id: string
  name: string
  description: string
  displayFont: string
  sansFont: string
  googleUrl: string
}

export const FONT_PALETTES: FontPalette[] = [
  {
    id: 'roboto-slab',
    name: 'Roboto Slab',
    description: 'Serif headings — professional & timeless',
    displayFont: '"Roboto Slab", serif',
    sansFont: '"Inter", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    description: 'Editorial serif — elegant & refined',
    displayFont: '"Playfair Display", serif',
    sansFont: '"Inter", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    description: 'Clean sans-serif — approachable & clear',
    displayFont: '"Open Sans", sans-serif',
    sansFont: '"Open Sans", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'inter',
    name: 'Inter',
    description: 'Modern minimal — crisp & contemporary',
    displayFont: '"Inter", sans-serif',
    sansFont: '"Inter", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'source-sans',
    name: 'Source Sans 3',
    description: 'Professional neutral — clinical precision',
    displayFont: '"Source Sans 3", sans-serif',
    sansFont: '"Source Sans 3", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'lato',
    name: 'Lato',
    description: 'Humanist sans — warm & accessible',
    displayFont: '"Lato", sans-serif',
    sansFont: '"Lato", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    description: 'Versatile & familiar — universal readability',
    displayFont: '"Roboto", sans-serif',
    sansFont: '"Roboto", sans-serif',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  },
]

const DEFAULT_FONT_ID = 'roboto-slab'
// Fonts pre-loaded in index.html — skip injecting a duplicate link
const preloadedFonts = new Set<string>(['roboto-slab', 'inter'])

function ensureFontLoaded(palette: FontPalette) {
  if (preloadedFonts.has(palette.id)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = palette.googleUrl
  document.head.appendChild(link)
  preloadedFonts.add(palette.id)
}

function applyFont(palette: FontPalette) {
  const root = document.documentElement
  root.style.setProperty('--font-display', palette.displayFont)
  root.style.setProperty('--font-sans', palette.sansFont)
}

interface FontContextValue {
  font: FontPalette
  setFont: (id: string) => void
  fonts: FontPalette[]
}

const FontContext = createContext<FontContextValue | null>(null)

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontId, setFontId] = useState<string>(() => {
    try { return localStorage.getItem('font-palette') || DEFAULT_FONT_ID } catch { return DEFAULT_FONT_ID }
  })

  const font = FONT_PALETTES.find(f => f.id === fontId) ?? FONT_PALETTES[0]

  useEffect(() => {
    ensureFontLoaded(font)
    applyFont(font)
  }, [font])

  const setFont = (id: string) => {
    setFontId(id)
    try { localStorage.setItem('font-palette', id) } catch {}
  }

  return (
    <FontContext.Provider value={{ font, setFont, fonts: FONT_PALETTES }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFont(): FontContextValue {
  const ctx = useContext(FontContext)
  if (!ctx) throw new Error('useFont must be used within FontProvider')
  return ctx
}

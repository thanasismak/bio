import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface ThemePalette {
  id: string
  name: string
  description: string
  vars: Record<string, string>
  preview: {
    dark: string
    light: string
    accent: string
    gold: string
    divider: string
  }
}

export const PALETTES: ThemePalette[] = [
  {
    id: 'navy-classic',
    name: 'Navy Classic',
    description: 'Deep navy with teal accent — the original',
    vars: {
      '--color-navy-950': '#081A2A',
      '--color-navy-900': '#112F51',
      '--color-navy-800': '#1C4A74',
      '--color-navy-700': '#2B658F',
      '--color-primary': '#41C2BC',
      '--color-primary-soft': '#67D3CA',
      '--color-primary-muted': '#AFEBE7',
      '--color-secondary': '#D4C49B',
      '--color-secondary-soft': '#F2E7D8',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F5F4F1',
      '--color-surface': '#FAFAF8',
      '--color-surface-soft': '#ECEAE5',
      '--color-text': '#081A2A',
      '--color-text-muted': '#2A4C5E',
      '--color-divider': '#2A7A76',
    },
    preview: { dark: '#112F51', light: '#FAFAF8', accent: '#41C2BC', gold: '#C8A46E', divider: '#2A7A76' },
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'True midnight blue with sapphire accent',
    vars: {
      '--color-navy-950': '#070E1A',
      '--color-navy-900': '#0D1F3C',
      '--color-navy-800': '#162E56',
      '--color-navy-700': '#1E3E72',
      '--color-primary': '#4A90D9',
      '--color-primary-soft': '#6AAAE8',
      '--color-primary-muted': '#B8D8F5',
      '--color-secondary': '#D4C49B',
      '--color-secondary-soft': '#F2E7D8',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F4F6FA',
      '--color-surface': '#F9FAFC',
      '--color-surface-soft': '#E8ECF4',
      '--color-text': '#070E1A',
      '--color-text-muted': '#1E3E72',
      '--color-divider': '#2E6BAB',
    },
    preview: { dark: '#0D1F3C', light: '#F9FAFC', accent: '#4A90D9', gold: '#C8A46E', divider: '#2E6BAB' },
  },
  {
    id: 'slate-blue',
    name: 'Slate & Steel',
    description: 'Warm slate navy with ice-blue accent',
    vars: {
      '--color-navy-950': '#0F1923',
      '--color-navy-900': '#1A2B3C',
      '--color-navy-800': '#253D54',
      '--color-navy-700': '#30506C',
      '--color-primary': '#5BA3C9',
      '--color-primary-soft': '#7ABDE0',
      '--color-primary-muted': '#C2DFF0',
      '--color-secondary': '#C9B896',
      '--color-secondary-soft': '#EEE5D6',
      '--color-gold-400': '#BFA070',
      '--color-home-background': '#F3F5F7',
      '--color-surface': '#F8F9FA',
      '--color-surface-soft': '#E4E8ED',
      '--color-text': '#0F1923',
      '--color-text-muted': '#30506C',
      '--color-divider': '#3C7A9E',
    },
    preview: { dark: '#1A2B3C', light: '#F8F9FA', accent: '#5BA3C9', gold: '#BFA070', divider: '#3C7A9E' },
  },
  {
    id: 'deep-prussian',
    name: 'Prussian',
    description: 'Deep Prussian blue with electric accent',
    vars: {
      '--color-navy-950': '#060F1C',
      '--color-navy-900': '#0E2241',
      '--color-navy-800': '#163462',
      '--color-navy-700': '#1E4880',
      '--color-primary': '#3D8EE8',
      '--color-primary-soft': '#5FA7F2',
      '--color-primary-muted': '#AECFF8',
      '--color-secondary': '#D8C9A0',
      '--color-secondary-soft': '#F5EDD8',
      '--color-gold-400': '#D4AA6A',
      '--color-home-background': '#F2F5FB',
      '--color-surface': '#F8FAFE',
      '--color-surface-soft': '#E2EAF6',
      '--color-text': '#060F1C',
      '--color-text-muted': '#1E4880',
      '--color-divider': '#2866C2',
    },
    preview: { dark: '#0E2241', light: '#F8FAFE', accent: '#3D8EE8', gold: '#D4AA6A', divider: '#2866C2' },
  },
  {
    id: 'dark-charcoal',
    name: 'Charcoal & Cobalt',
    description: 'Near-black charcoal with cobalt-blue accent',
    vars: {
      '--color-navy-950': '#0A0E14',
      '--color-navy-900': '#131B24',
      '--color-navy-800': '#1F2E40',
      '--color-navy-700': '#2C4257',
      '--color-primary': '#2F7FDE',
      '--color-primary-soft': '#4D97F0',
      '--color-primary-muted': '#9FC5F5',
      '--color-secondary': '#C8B98A',
      '--color-secondary-soft': '#EDE2CB',
      '--color-gold-400': '#C49F60',
      '--color-home-background': '#F0F2F5',
      '--color-surface': '#F6F8FA',
      '--color-surface-soft': '#E2E6EC',
      '--color-text': '#0A0E14',
      '--color-text-muted': '#2C4257',
      '--color-divider': '#1F5BA8',
    },
    preview: { dark: '#131B24', light: '#F6F8FA', accent: '#2F7FDE', gold: '#C49F60', divider: '#1F5BA8' },
  },
]

const DEFAULT_PALETTE_ID = 'navy-classic'

function applyPalette(palette: ThemePalette) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(palette.vars)) {
    root.style.setProperty(key, value)
  }
}

interface ThemeContextValue {
  palette: ThemePalette
  setPalette: (id: string) => void
  palettes: ThemePalette[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [paletteId, setPaletteId] = useState<string>(() => {
    try { return localStorage.getItem('theme-palette') || DEFAULT_PALETTE_ID } catch { return DEFAULT_PALETTE_ID }
  })

  const palette = PALETTES.find(p => p.id === paletteId) ?? PALETTES[0]

  useEffect(() => {
    applyPalette(palette)
  }, [palette])

  const setPalette = (id: string) => {
    setPaletteId(id)
    try { localStorage.setItem('theme-palette', id) } catch {}
  }

  return (
    <ThemeContext.Provider value={{ palette, setPalette, palettes: PALETTES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

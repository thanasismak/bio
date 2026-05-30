'use client'
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
  {
    id: 'forest-sage',
    name: 'Forest & Sage',
    description: 'Natural sage green — calm and healing',
    vars: {
      '--color-navy-950': '#081A2A',
      '--color-navy-900': '#112F51',
      '--color-navy-800': '#1C4A74',
      '--color-navy-700': '#2B658F',
      '--color-primary': '#4CAF8A',
      '--color-primary-soft': '#6BC4A2',
      '--color-primary-muted': '#B4E0CE',
      '--color-secondary': '#D4C49B',
      '--color-secondary-soft': '#F2E7D8',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F3F8F5',
      '--color-surface': '#F8FCFA',
      '--color-surface-soft': '#E6F2EC',
      '--color-text': '#081A2A',
      '--color-text-muted': '#2A4C5E',
      '--color-divider': '#3A9A72',
    },
    preview: { dark: '#112F51', light: '#F8FCFA', accent: '#4CAF8A', gold: '#C8A46E', divider: '#3A9A72' },
  },
  {
    id: 'crimson-pearl',
    name: 'Crimson & Pearl',
    description: 'Bold crimson accent — authority and confidence',
    vars: {
      '--color-navy-950': '#0F1922',
      '--color-navy-900': '#1C2E3F',
      '--color-navy-800': '#2A4258',
      '--color-navy-700': '#3A5870',
      '--color-primary': '#C44454',
      '--color-primary-soft': '#D86272',
      '--color-primary-muted': '#F2B4BC',
      '--color-secondary': '#D4B89B',
      '--color-secondary-soft': '#F2E4D8',
      '--color-gold-400': '#C8956E',
      '--color-home-background': '#FAF7F7',
      '--color-surface': '#FDFAFA',
      '--color-surface-soft': '#F2E8E8',
      '--color-text': '#0F1922',
      '--color-text-muted': '#3A5870',
      '--color-divider': '#B43444',
    },
    preview: { dark: '#1C2E3F', light: '#FDFAFA', accent: '#C44454', gold: '#C8956E', divider: '#B43444' },
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Crisp ocean blue — clear and clinical',
    vars: {
      '--color-navy-950': '#061828',
      '--color-navy-900': '#0E3050',
      '--color-navy-800': '#164878',
      '--color-navy-700': '#1E609A',
      '--color-primary': '#0EA5E9',
      '--color-primary-soft': '#38BDF8',
      '--color-primary-muted': '#BAE6FD',
      '--color-secondary': '#C8D8E8',
      '--color-secondary-soft': '#E4F0F8',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F0F7FC',
      '--color-surface': '#F6FBFE',
      '--color-surface-soft': '#DCF0FA',
      '--color-text': '#061828',
      '--color-text-muted': '#1E609A',
      '--color-divider': '#0890CC',
    },
    preview: { dark: '#0E3050', light: '#F6FBFE', accent: '#0EA5E9', gold: '#C8A46E', divider: '#0890CC' },
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    description: 'Rich violet — elegance and prestige',
    vars: {
      '--color-navy-950': '#0E0A1C',
      '--color-navy-900': '#1C1438',
      '--color-navy-800': '#2C2058',
      '--color-navy-700': '#3C2C76',
      '--color-primary': '#8B5CF6',
      '--color-primary-soft': '#A78BFA',
      '--color-primary-muted': '#DDD6FE',
      '--color-secondary': '#CCC4DC',
      '--color-secondary-soft': '#EDE8F8',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F7F5FD',
      '--color-surface': '#FAFAFF',
      '--color-surface-soft': '#EDE8FA',
      '--color-text': '#0E0A1C',
      '--color-text-muted': '#3C2C76',
      '--color-divider': '#7C4EE0',
    },
    preview: { dark: '#1C1438', light: '#FAFAFF', accent: '#8B5CF6', gold: '#C8A46E', divider: '#7C4EE0' },
  },
  {
    id: 'warm-amber',
    name: 'Warm Amber',
    description: 'Golden amber — warm and approachable',
    vars: {
      '--color-navy-950': '#180E04',
      '--color-navy-900': '#2E1C08',
      '--color-navy-800': '#462C10',
      '--color-navy-700': '#5E3C1A',
      '--color-primary': '#D97706',
      '--color-primary-soft': '#F59E0B',
      '--color-primary-muted': '#FDE68A',
      '--color-secondary': '#D4C49B',
      '--color-secondary-soft': '#F5EDD8',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#FBF8F0',
      '--color-surface': '#FEFCF6',
      '--color-surface-soft': '#F5EDD8',
      '--color-text': '#180E04',
      '--color-text-muted': '#5E3C1A',
      '--color-divider': '#C86E06',
    },
    preview: { dark: '#2E1C08', light: '#FEFCF6', accent: '#D97706', gold: '#C8A46E', divider: '#C86E06' },
  },
  {
    id: 'emerald-isle',
    name: 'Emerald Isle',
    description: 'Rich emerald green — health and vitality',
    vars: {
      '--color-navy-950': '#041810',
      '--color-navy-900': '#0A2E20',
      '--color-navy-800': '#124632',
      '--color-navy-700': '#1A5E44',
      '--color-primary': '#10B981',
      '--color-primary-soft': '#34D399',
      '--color-primary-muted': '#A7F3D0',
      '--color-secondary': '#C8D8C8',
      '--color-secondary-soft': '#E4F2E4',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F2FAF5',
      '--color-surface': '#F6FCFA',
      '--color-surface-soft': '#DFF2E8',
      '--color-text': '#041810',
      '--color-text-muted': '#1A5E44',
      '--color-divider': '#0EA870',
    },
    preview: { dark: '#0A2E20', light: '#F6FCFA', accent: '#10B981', gold: '#C8A46E', divider: '#0EA870' },
  },
  {
    id: 'royal-indigo',
    name: 'Royal Indigo',
    description: 'Deep indigo — authority and sophistication',
    vars: {
      '--color-navy-950': '#080A1A',
      '--color-navy-900': '#101438',
      '--color-navy-800': '#181E58',
      '--color-navy-700': '#202878',
      '--color-primary': '#4F46E5',
      '--color-primary-soft': '#6D64F0',
      '--color-primary-muted': '#C7C4F8',
      '--color-secondary': '#C4C0D8',
      '--color-secondary-soft': '#E8E4F5',
      '--color-gold-400': '#C8A46E',
      '--color-home-background': '#F4F4FA',
      '--color-surface': '#F9F9FE',
      '--color-surface-soft': '#E8E8F6',
      '--color-text': '#080A1A',
      '--color-text-muted': '#202878',
      '--color-divider': '#4440D8',
    },
    preview: { dark: '#101438', light: '#F9F9FE', accent: '#4F46E5', gold: '#C8A46E', divider: '#4440D8' },
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

'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '../contexts/LanguageContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { FontProvider } from '../contexts/FontContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FontProvider>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </FontProvider>
  )
}

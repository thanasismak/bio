import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { FontProvider } from './contexts/FontContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <FontProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </FontProvider>
    </ThemeProvider>
  </StrictMode>,
)

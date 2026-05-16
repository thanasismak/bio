import { useState } from 'react'
import { Palette, X, Check } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const { palette, setPalette, palettes } = useTheme()

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Change color palette"
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-navy-900 border border-white/20 flex items-center justify-center shadow-lg shadow-black/30 hover:border-primary/50 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <Palette className="w-5 h-5 text-white/70" strokeWidth={1.5} />
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Switcher panel */}
          <div className="fixed bottom-20 left-6 z-50 w-72 rounded-2xl border border-white/[0.12] bg-navy-950/95 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div>
                <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">Palette</p>
                <p className="font-display text-sm text-white mt-0.5">{palette.name}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-white/50" />
              </button>
            </div>

            {/* Palette list */}
            <div className="p-3 space-y-2">
              {palettes.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setPalette(p.id); setOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 cursor-pointer text-left ${
                    p.id === palette.id
                      ? 'bg-white/[0.10] border border-white/[0.15]'
                      : 'hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  {/* Swatch cluster */}
                  <div className="flex items-center shrink-0">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white/20 shrink-0"
                      style={{ background: p.preview.dark }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/20 -ml-2 shrink-0"
                      style={{ background: p.preview.accent }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white/20 -ml-1.5 shrink-0"
                      style={{ background: p.preview.gold }}
                    />
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-white/85 truncate">{p.name}</p>
                    <p className="font-sans text-xs text-white/35 truncate">{p.description}</p>
                  </div>

                  {/* Active check */}
                  {p.id === palette.id && (
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
                  )}
                </button>
              ))}
            </div>

            <div className="px-5 py-3 border-t border-white/[0.06]">
              <p className="font-sans text-[10px] text-white/25 leading-snug">
                Select a palette to preview — your choice is saved automatically.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

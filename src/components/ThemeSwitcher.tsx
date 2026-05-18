import { useState } from 'react'
import { Palette, Check, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useFont } from '../contexts/FontContext'

type Tab = 'colors' | 'fonts'

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('colors')
  const { palette, setPalette, palettes } = useTheme()
  const { font, setFont, fonts } = useFont()

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Customize appearance"
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-navy-950 border border-primary/30 flex items-center justify-center shadow-lg shadow-black/20 hover:border-primary/60 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <Palette className="w-5 h-5 text-white/70" strokeWidth={1.5} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="fixed bottom-20 left-6 z-50 w-72 rounded-2xl border border-white/[0.10] bg-navy-950/96 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden">

            {/* Tab bar */}
            <div className="flex border-b border-white/[0.08]">
              {(['colors', 'fonts'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 flex flex-col items-center py-3.5 px-3 transition-colors duration-150 cursor-pointer ${
                    tab === t ? 'text-white' : 'text-white/30 hover:text-white/55'
                  }`}
                >
                  <span className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase">
                    {t === 'colors' ? 'Colors' : 'Fonts'}
                  </span>
                  <span className="font-sans text-[11px] text-white/40 mt-0.5 truncate max-w-full leading-snug">
                    {t === 'colors' ? palette.name : font.name}
                  </span>
                  {tab === t && <span className="mt-1.5 h-px w-6 bg-primary rounded-full" />}
                </button>
              ))}
              <button
                onClick={() => setOpen(false)}
                className="w-10 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors cursor-pointer border-l border-white/[0.08] shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List */}
            <div className="p-3 space-y-1.5 max-h-[22rem] overflow-y-auto overscroll-contain">
              {tab === 'colors' ? (
                palettes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setPalette(p.id); setOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left ${
                      p.id === palette.id
                        ? 'bg-white/[0.10] border border-white/[0.16]'
                        : 'hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    {/* Swatch cluster */}
                    <div className="flex items-center shrink-0">
                      <div className="w-7 h-7 rounded-full border-2 border-black/20 shrink-0" style={{ background: p.preview.dark }} />
                      <div className="w-5 h-5 rounded-full border-2 border-black/20 -ml-1.5 shrink-0" style={{ background: p.preview.accent }} />
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-black/20 -ml-1 shrink-0" style={{ background: p.preview.light }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium text-white/85 truncate">{p.name}</p>
                      <p className="font-sans text-[11px] text-white/35 truncate leading-snug">{p.description}</p>
                    </div>
                    {p.id === palette.id && <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />}
                  </button>
                ))
              ) : (
                fonts.map(f => (
                  <button
                    key={f.id}
                    onClick={() => { setFont(f.id); setOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left ${
                      f.id === font.id
                        ? 'bg-white/[0.10] border border-white/[0.16]'
                        : 'hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    {/* Font sample */}
                    <div
                      className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 text-white/80 text-lg font-bold leading-none"
                      style={{ fontFamily: f.displayFont }}
                    >
                      Aa
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium text-white/85 truncate">{f.name}</p>
                      <p className="font-sans text-[11px] text-white/35 truncate leading-snug">{f.description}</p>
                    </div>
                    {f.id === font.id && <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />}
                  </button>
                ))
              )}
            </div>

            <div className="px-5 py-3 border-t border-white/[0.06]">
              <p className="font-sans text-[10px] text-white/25 leading-snug">
                {tab === 'colors'
                  ? `${palettes.length} palettes available — saved automatically.`
                  : `${fonts.length} typefaces available — saved automatically.`
                }
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

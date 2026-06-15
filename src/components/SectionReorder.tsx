'use client'

import { useState, useRef } from 'react'
import { GripVertical, RotateCcw, Copy, Check, X, Settings2, Eye, EyeOff } from 'lucide-react'
import { DEFAULT_ORDER, SECTION_LABELS, SECTION_ICONS, type SectionKey } from '../config/sectionOrder'

const LS_ORDER  = 'bio-section-order'
const LS_HIDDEN = 'bio-section-hidden'

interface Props {
  order:           SectionKey[]
  hidden:          SectionKey[]
  onChange:        (order: SectionKey[]) => void
  onHiddenChange:  (hidden: SectionKey[]) => void
}

export default function SectionReorder({ order, hidden, onChange, onHiddenChange }: Props) {
  const [open, setOpen]     = useState(false)
  const [copied, setCopied] = useState(false)
  const dragIndex           = useRef<number | null>(null)
  const dragOverIndex       = useRef<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)

  function onDragStart(i: number) {
    dragIndex.current = i
  }

  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    dragOverIndex.current = i
    setDragOver(i)
  }

  function onDrop() {
    const from = dragIndex.current
    const to   = dragOverIndex.current
    dragIndex.current     = null
    dragOverIndex.current = null
    setDragOver(null)
    if (from === null || to === null || from === to) return

    const next = [...order]
    const [removed] = next.splice(from, 1)
    next.splice(to, 0, removed)
    onChange(next)
    localStorage.setItem(LS_ORDER, JSON.stringify(next))
  }

  function toggleHidden(key: SectionKey) {
    const next = hidden.includes(key)
      ? hidden.filter(k => k !== key)
      : [...hidden, key]
    onHiddenChange(next)
    localStorage.setItem(LS_HIDDEN, JSON.stringify(next))
  }

  function reset() {
    onChange([...DEFAULT_ORDER])
    onHiddenChange([])
    localStorage.removeItem(LS_ORDER)
    localStorage.removeItem(LS_HIDDEN)
  }

  function copy() {
    const text = JSON.stringify({ order, hidden }, null, 2)
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const visibleCount = order.length - hidden.length

  return (
    <div className="fixed top-6 right-6 z-[9999] select-none">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Layout editor (dev)"
        className="w-9 h-9 rounded-full bg-violet-600 text-white shadow-lg flex items-center justify-center hover:bg-violet-500 transition-colors"
      >
        {open ? <X className="w-3.5 h-3.5" /> : <Settings2 className="w-3.5 h-3.5" />}
      </button>

      {/* Panel — drops down from top-right */}
      {open && (
        <div className="absolute top-11 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-violet-50 border-b border-gray-200">
            <div>
              <span className="text-xs font-semibold text-violet-700 tracking-wide uppercase">Layout Editor</span>
              <span className="ml-2 text-[10px] text-gray-400">{visibleCount}/{order.length} visible</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={copy}
                title="Copy config JSON"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-violet-700 hover:bg-violet-100 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={reset}
                title="Reset to defaults"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-violet-700 hover:bg-violet-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section list */}
          <ul
            className="py-1.5 max-h-[480px] overflow-y-auto"
            onDragLeave={() => setDragOver(null)}
          >
            {order.map((key, i) => {
              const isHidden = hidden.includes(key)
              const isOver   = dragOver === i
              return (
                <li
                  key={key}
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragOver={(e) => onDragOver(e, i)}
                  onDrop={onDrop}
                  className={[
                    'flex items-center gap-2.5 px-3 py-2.5 transition-colors group',
                    isOver   ? 'bg-violet-100 border-t-2 border-violet-400' : 'hover:bg-gray-50',
                    isHidden ? 'opacity-40'                                  : '',
                  ].join(' ')}
                >
                  {/* Drag handle */}
                  <GripVertical className="w-3.5 h-3.5 text-gray-300 group-hover:text-violet-400 shrink-0 cursor-grab active:cursor-grabbing" />

                  {/* Icon */}
                  <span className="text-sm leading-none shrink-0" aria-hidden>{SECTION_ICONS[key]}</span>

                  {/* Label */}
                  <span className={`flex-1 text-xs font-medium truncate ${isHidden ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {SECTION_LABELS[key]}
                  </span>

                  {/* Position badge */}
                  <span className="text-[10px] text-gray-300 font-mono tabular-nums w-4 text-right shrink-0">{i + 1}</span>

                  {/* Visibility toggle */}
                  <button
                    onClick={() => toggleHidden(key)}
                    title={isHidden ? 'Show section' : 'Hide section'}
                    className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:text-violet-600 hover:bg-violet-50 transition-colors shrink-0"
                  >
                    {isHidden
                      ? <EyeOff className="w-3.5 h-3.5" />
                      : <Eye    className="w-3.5 h-3.5" />
                    }
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[10px] text-gray-400">Drag to reorder · eye to hide</p>
            <p className="text-[10px] text-gray-300">dev only</p>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring,
  useMotionValue, type MotionValue, type Variants,
} from 'motion/react'
import { FlaskConical, X, RefreshCw } from 'lucide-react'

// ─── Catalog ──────────────────────────────────────────────────────────────────

type AnimId =
  | 'scroll-reveal' | 'parallax' | 'image-reveal' | 'mask-reveal'
  | 'clip-path' | 'gentle-parallax' | 'microinteractions' | 'layered-motion'
  | 'cinematic-scroll' | 'scroll-driven' | 'heavy-morphing' | 'aggressive'
  | 'self-drawing' | 'animated-gradient' | 'skeleton-loading' | 'loading-anim'
  | 'hover-effects' | 'glassmorphic' | 'neumorphic' | 'claymorphic'
  | 'liquid-motion' | 'isometric' | 'animated-icons' | 'horizontal-scroll'
  | 'ambient-bg' | 'doodle' | 'stop-motion' | 'animated-logo'
  | 'expressive-type' | 'faux-3d' | 'flipbook'

interface AnimEntry { id: AnimId; label: string; tag: 'scroll' | 'interactive' | 'auto'; desc: string }

const ANIMS: AnimEntry[] = [
  { id: 'scroll-reveal',     label: 'Soft Scroll Reveal',    tag: 'scroll',      desc: 'Elements fade + slide up as they enter the viewport.' },
  { id: 'parallax',          label: 'Parallax',              tag: 'scroll',      desc: 'Background and foreground move at different speeds.' },
  { id: 'image-reveal',      label: 'Image Reveal',          tag: 'auto',        desc: 'A sliding cover wipes away to unveil the content.' },
  { id: 'mask-reveal',       label: 'Mask Reveal',           tag: 'auto',        desc: 'Text lines rise from below an overflow-hidden mask.' },
  { id: 'clip-path',         label: 'Clip-path Animation',   tag: 'auto',        desc: 'Diagonal polygon wipe transitions between two layers.' },
  { id: 'gentle-parallax',   label: 'Gentle Parallax',       tag: 'interactive', desc: 'Move your cursor — layers float at different depths.' },
  { id: 'microinteractions', label: 'Microinteractions',     tag: 'interactive', desc: 'Hover and click elements for tactile spring feedback.' },
  { id: 'layered-motion',    label: 'Layered Motion',        tag: 'auto',        desc: 'Grid of cards cascade in with staggered timing.' },
  { id: 'cinematic-scroll',  label: 'Cinematic Scroll',      tag: 'scroll',      desc: 'Hero text scales and blurs as you scroll through it.' },
  { id: 'scroll-driven',     label: 'Scroll-driven',         tag: 'scroll',      desc: 'Progress bar and stats that sync to exact scroll position.' },
  { id: 'heavy-morphing',    label: 'Heavy Morphing',        tag: 'auto',        desc: 'Shape continuously morphs through border-radius cycles.' },
  { id: 'aggressive',        label: 'Aggressive Motion',     tag: 'interactive', desc: 'High-energy spring physics — click to trigger.' },
  { id: 'self-drawing',      label: 'Self-Drawing SVG',      tag: 'auto',        desc: 'SVG strokes draw themselves in sequence via pathLength.' },
  { id: 'animated-gradient', label: 'Animated Gradient',    tag: 'auto',        desc: 'Gradient orbs drift and shift color continuously.' },
  { id: 'skeleton-loading',  label: 'Skeleton Screen',       tag: 'auto',        desc: 'Shimmer skeleton placeholder transitions to real content.' },
  { id: 'loading-anim',      label: 'Loading Animations',    tag: 'auto',        desc: 'Spinner, bouncing dots, and wave-bar loader variants.' },
  { id: 'hover-effects',     label: 'Hover Effects',         tag: 'interactive', desc: 'Magnetic pull, spotlight reveal, and underline hover.' },
  { id: 'glassmorphic',      label: 'Glassmorphic',          tag: 'auto',        desc: 'Frosted-glass cards over a vivid gradient background.' },
  { id: 'neumorphic',        label: 'Neumorphic',            tag: 'interactive', desc: 'Soft extruded UI surfaces with tactile press states.' },
  { id: 'claymorphic',       label: 'Claymorphic',           tag: 'auto',        desc: 'Chunky inflated clay-style cards spring onto screen.' },
  { id: 'liquid-motion',     label: 'Liquid Motion',         tag: 'auto',        desc: 'Blob shapes merge and separate with fluid morphing.' },
  { id: 'isometric',         label: 'Isometric',             tag: 'auto',        desc: 'Isometric grid squares stagger into a 3-D composition.' },
  { id: 'animated-icons',    label: 'Animated Icons',        tag: 'interactive', desc: 'Icon state transitions driven by spring physics.' },
  { id: 'horizontal-scroll', label: 'Horizontal Scroll',     tag: 'scroll',      desc: 'Cards scroll horizontally with a synced progress bar.' },
  { id: 'ambient-bg',        label: 'Ambient Background',    tag: 'auto',        desc: 'Floating gradient orbs create subtle depth behind content.' },
  { id: 'doodle',            label: 'Doodle Animation',      tag: 'auto',        desc: 'Hand-drawn SVG squiggles appear in sequence.' },
  { id: 'stop-motion',       label: 'Stop Motion',           tag: 'auto',        desc: 'Frame-by-frame instant jumps mimic physical stop-motion.' },
  { id: 'animated-logo',     label: 'Animated Logo',         tag: 'auto',        desc: 'Wordmark assembles from parts with staggered blur-reveals.' },
  { id: 'expressive-type',   label: 'Expressive Typography', tag: 'auto',        desc: 'Each character springs in individually for dramatic reveals.' },
  { id: 'faux-3d',           label: 'Faux 3D',               tag: 'interactive', desc: 'Card flip and depth-perspective hover via CSS 3D.' },
  { id: 'flipbook',          label: 'Animated Flipbook',     tag: 'interactive', desc: 'Pages flip like a physical book with spring rotation.' },
]

const TAG_STYLE: Record<AnimEntry['tag'], string> = {
  scroll:      'bg-blue-100 text-blue-600',
  interactive: 'bg-amber-100 text-amber-600',
  auto:        'bg-teal-100 text-teal-700',
}

// ─── Demo 1: Soft Scroll Reveal ───────────────────────────────────────────────

function ScrollRevealDemo() {
  const items = [
    { title: 'Αθλητικές Κακώσεις',      body: 'Εξειδίκευση στη χειρουργική αντιμετώπιση κακώσεων αθλητών κάθε επιπέδου.' },
    { title: 'Αρθροσκοπική Χειρουργική', body: 'Ελάχιστα επεμβατικές τεχνικές για ταχύτερη αποκατάσταση και λιγότερο πόνο.' },
    { title: 'Αρθροπλαστική',            body: 'Σύγχρονα εμφυτεύματα γόνατος και ισχίου με μακροχρόνια αποτελέσματα.' },
    { title: 'Θεραπεία PRP',             body: 'Βιολογική αναγεννητική θεραπεία για επιταχυνόμενη επούλωση ιστών.' },
  ]
  return (
    <div className="h-full overflow-y-auto px-8 py-10 space-y-6">
      <p className="type-caption text-navy-950/35 text-center mb-2">↓ Scroll down to trigger reveals</p>
      {items.map((item) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl border border-navy-950/[0.08] bg-white shadow-sm"
        >
          <h3 className="type-h3 text-navy-950 mb-2">{item.title}</h3>
          <p className="type-body-sm text-navy-950/60">{item.body}</p>
        </motion.div>
      ))}
      <div className="h-24" />
    </div>
  )
}

// ─── Demo 2: Parallax ─────────────────────────────────────────────────────────

function ParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0px', '100px'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0px', '-70px'])
  const textOp = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <div ref={containerRef} className="h-full overflow-y-auto">
      <div className="relative h-[180%]">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-[-30%] bg-gradient-to-br from-navy-950 to-navy-800"
        >
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 55% 60% at 25% 50%, rgba(65,194,188,0.14) 0%, transparent 60%)',
          }} />
        </motion.div>
        <motion.div
          style={{ y: textY, opacity: textOp }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8 py-24"
        >
          <span className="type-eyebrow text-primary block mb-5">Ορθοπαιδικός Χειρουργός</span>
          <h2 className="type-h2 text-white">Dr. Kyriakos<br />Bekas</h2>
          <p className="type-caption text-white/35 mt-5">M.D. · M.Sc. · FIFA</p>
          <p className="type-caption text-white/25 mt-6">↓ Scroll</p>
        </motion.div>
      </div>
      <div className="px-8 py-16 bg-surface text-center">
        <p className="type-body text-navy-950/35">Content section after parallax.</p>
      </div>
    </div>
  )
}

// ─── Demo 3: Image Reveal ─────────────────────────────────────────────────────

function ImageRevealDemo({ refresh }: { refresh: number }) {
  return (
    <div key={refresh} className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-5">
        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', background: '#e8e6e1' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center">
            <div className="text-center p-6">
              <span className="type-eyebrow text-primary block mb-3">Ορθοπαιδικός</span>
              <h2 className="type-h2 text-white">Dr. Bekas</h2>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 bg-surface z-10"
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
          />
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="type-body-sm text-navy-950/55 text-center"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Εξειδικευμένη ορθοπαιδική φροντίδα στην Αθήνα.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

// ─── Demo 4: Mask Reveal ──────────────────────────────────────────────────────

function MaskRevealDemo({ refresh }: { refresh: number }) {
  const lines = [
    { text: 'Ορθοπαιδικός',                           cls: 'type-eyebrow text-primary',    delay: 0 },
    { text: 'Dr. Kyriakos',                           cls: 'type-h1 text-navy-950',         delay: 0.12 },
    { text: 'Bekas',                                  cls: 'type-h1 text-navy-950',         delay: 0.22 },
    { text: 'M.D. · M.Sc. · FIFA Certified',          cls: 'type-body text-navy-950/50',    delay: 0.42 },
    { text: 'Αθλητικές κακώσεις — Αρθροσκοπική',     cls: 'type-body-sm text-navy-950/35', delay: 0.56 },
  ]
  return (
    <div key={refresh} className="h-full flex items-center justify-center px-10 py-8">
      <div className="space-y-1.5">
        {lines.map(({ text, cls, delay }) => (
          <div key={text} className="overflow-hidden">
            <motion.p
              className={cls}
              initial={{ y: '115%', rotate: 1.5 }}
              animate={{ y: '0%', rotate: 0 }}
              transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              {text}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Demo 5: Clip-path Animation ──────────────────────────────────────────────

function ClipPathDemo({ refresh }: { refresh: number }) {
  return (
    <div key={refresh} className="h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-surface flex items-center justify-center">
        <h2 className="type-h2 text-navy-950/15">Before</h2>
      </div>
      <motion.div
        className="absolute inset-0 bg-navy-950 flex items-center justify-center"
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
        animate={{ clipPath: 'polygon(0 0, 115% 0, 115% 100%, 0 100%)' }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="text-center px-8">
          <span className="type-eyebrow text-primary block mb-4">Foreground Layer</span>
          <h2 className="type-h2 text-white">Dr. Bekas</h2>
          <p className="type-body text-white/45 mt-3">Ορθοπαιδικός Χειρουργός Αθήνα</p>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-y-0 w-0.5 bg-primary"
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
      />
    </div>
  )
}

// ─── Demo 6: Gentle Parallax (mouse) ─────────────────────────────────────────

function GentleParallaxDemo() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sx = useSpring(mouseX, { stiffness: 55, damping: 18 })
  const sy = useSpring(mouseY, { stiffness: 55, damping: 18 })

  const l1x = useTransform(sx, [-250, 250], [-6,  6])
  const l1y = useTransform(sy, [-250, 250], [-6,  6])
  const l2x = useTransform(sx, [-250, 250], [-18, 18])
  const l2y = useTransform(sy, [-250, 250], [-18, 18])
  const l3x = useTransform(sx, [-250, 250], [-34, 34])
  const l3y = useTransform(sy, [-250, 250], [-34, 34])

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width / 2)
    mouseY.set(e.clientY - r.top  - r.height / 2)
  }, [mouseX, mouseY])

  return (
    <div
      className="h-full flex items-center justify-center bg-gradient-to-br from-navy-950 to-navy-800 relative overflow-hidden"
      onMouseMove={handleMouse}
    >
      <motion.div style={{ x: l1x, y: l1y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-56 h-56 rounded-full bg-primary/[0.06]" />
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full bg-primary/[0.04]" />
      </motion.div>
      <motion.div style={{ x: l2x, y: l2y }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border border-primary/20" />
        <div className="absolute w-72 h-72 rounded-full border border-white/[0.06]" />
      </motion.div>
      <motion.div style={{ x: l3x, y: l3y }} className="relative z-10 text-center select-none">
        <span className="type-eyebrow text-primary block mb-3">Ορθοπαιδικός Χειρουργός</span>
        <h2 className="type-h2 text-white">Dr. Kyriakos<br />Bekas</h2>
        <p className="type-caption text-white/30 mt-4">Move cursor across area</p>
      </motion.div>
    </div>
  )
}

// ─── Demo 7: Microinteractions ────────────────────────────────────────────────

function MicrointeractionsDemo() {
  const [pressed, setPressed] = useState(false)
  const [liked,   setLiked]   = useState(false)

  return (
    <div className="h-full overflow-y-auto p-8 flex flex-col items-center justify-center gap-10">
      <div className="text-center">
        <p className="type-caption text-navy-950/35 mb-3">Hover → 3D tilt</p>
        <motion.div
          className="w-68 p-6 rounded-2xl border border-navy-950/[0.10] bg-white shadow-md cursor-pointer"
          whileHover={{ rotateX: -7, rotateY: 8, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          style={{ transformPerspective: 700 }}
        >
          <span className="type-eyebrow text-primary block mb-2">Αρθροσκοπική</span>
          <h3 className="type-h3 text-navy-950">Χειρουργική Γόνατος</h3>
          <p className="type-body-sm text-navy-950/50 mt-2">Ελάχιστα επεμβατική τεχνική.</p>
        </motion.div>
      </div>

      <div className="text-center">
        <p className="type-caption text-navy-950/35 mb-3">Click → press + state</p>
        <motion.button
          className="px-8 py-3.5 bg-primary text-navy-950 font-semibold rounded-full text-sm cursor-pointer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93, y: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          onClick={() => setPressed(p => !p)}
        >
          {pressed ? 'Ραντεβού κλείστηκε ✓' : 'Κλείσε Ραντεβού'}
        </motion.button>
      </div>

      <div className="text-center">
        <p className="type-caption text-navy-950/35 mb-3">Click → icon bounce</p>
        <motion.button
          className="w-14 h-14 rounded-full border border-navy-950/[0.10] bg-white flex items-center justify-center cursor-pointer mx-auto"
          whileTap={{ scale: 0.80 }}
          onClick={() => setLiked(l => !l)}
        >
          <motion.span
            className="text-2xl"
            animate={{ scale: liked ? [1, 1.45, 1] : 1 }}
            transition={{ duration: 0.32 }}
          >
            {liked ? '❤️' : '🤍'}
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}

// ─── Demo 8: Layered Motion ───────────────────────────────────────────────────

function LayeredMotionDemo({ refresh }: { refresh: number }) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.93 },
    show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
  }
  const cards = [
    { tag: 'ΠΧΣ',             name: 'ACL Reconstruction' },
    { tag: 'Αρθροσκοπική',    name: 'Knee Arthroscopy' },
    { tag: 'Στροφικό Πέταλο', name: 'Rotator Cuff' },
    { tag: 'Αρθροπλαστική',   name: 'Hip Replacement' },
    { tag: 'Μηνίσκος',        name: 'Meniscal Surgery' },
    { tag: 'PRP',              name: 'Regenerative Therapy' },
  ]
  return (
    <div key={refresh} className="h-full flex items-center justify-center p-8">
      <motion.div
        className="grid grid-cols-2 gap-3 w-full max-w-xs"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {cards.map(c => (
          <motion.div
            key={c.tag}
            variants={item}
            className="p-4 rounded-xl border border-navy-950/[0.08] bg-white"
          >
            <span className="type-eyebrow text-primary block mb-1">{c.tag}</span>
            <p className="type-caption text-navy-950/60">{c.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Demo 9: Cinematic Scroll ─────────────────────────────────────────────────

function CinematicScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  const scale   = useTransform(scrollYProgress, [0, 0.45], [1, 0.58])
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const blur    = useTransform(scrollYProgress, [0, 0.45], ['blur(0px)', 'blur(8px)'])
  const subY    = useTransform(scrollYProgress, [0.45, 0.75], ['50px', '0px'])
  const subOp   = useTransform(scrollYProgress, [0.45, 0.75], [0, 1])

  return (
    <div ref={containerRef} className="h-full overflow-y-auto bg-navy-950">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, opacity, filter: blur }}
          className="text-center px-8"
        >
          <h2 className="type-h1 text-white leading-tight">
            <span className="block">Dr.</span>
            <span className="block text-primary">Kyriakos</span>
            <span className="block">Bekas</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative" style={{ height: '150vh' }}>
        <motion.div
          style={{ y: subY, opacity: subOp }}
          className="sticky top-1/3 px-10 text-center"
        >
          <span className="type-eyebrow text-primary block mb-4">Ορθοπαιδικός Χειρουργός</span>
          <p className="type-body text-white/50 max-w-sm mx-auto">
            Εξειδίκευση στις αθλητικές κακώσεις, αρθροσκοπική χειρουργική και αρθροπλαστική.
          </p>
        </motion.div>
      </div>

      <p className="type-caption text-white/20 text-center pb-8">↑ Scroll up to reset</p>
    </div>
  )
}

// ─── Demo 10: Scroll-driven ───────────────────────────────────────────────────

function ScrollStatItem({ label, val, lo, hi, scrollYProgress }: {
  label: string; val: string; lo: number; hi: number; scrollYProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollYProgress, [lo, hi], [0, 1])
  const x       = useTransform(scrollYProgress, [lo, hi], [-40, 0])
  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center gap-5 p-5 rounded-2xl border border-navy-950/[0.08] bg-white"
    >
      <span className="type-h2 text-primary w-28 shrink-0 leading-none">{val}</span>
      <span className="type-body text-navy-950/65">{label}</span>
    </motion.div>
  )
}

function ScrollDrivenDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30 })

  const stats = [
    { label: 'Αθλητικές Κακώσεις',  val: '15+',    lo: 0.05, hi: 0.25 },
    { label: 'Χειρουργείες',         val: '1.200+', lo: 0.20, hi: 0.42 },
    { label: 'Χρόνια Εμπειρίας',     val: '18',     lo: 0.37, hi: 0.58 },
    { label: 'Ικανοποίηση Ασθενών',  val: '98%',    lo: 0.53, hi: 0.73 },
  ]

  return (
    <div ref={containerRef} className="h-full overflow-y-auto">
      <div className="sticky top-0 z-10 h-1 bg-navy-950/[0.08]">
        <motion.div className="h-full bg-primary origin-left" style={{ scaleX }} />
      </div>
      <div className="px-8 pt-10 pb-24 space-y-4" style={{ minHeight: '240%' }}>
        <p className="type-caption text-navy-950/35 text-center mb-6">↓ Scroll to drive animations</p>
        {stats.map(s => (
          <ScrollStatItem key={s.label} {...s} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

// ─── Demo 11: Heavy Morphing ──────────────────────────────────────────────────

const SHAPES = [
  { borderRadius: '50%',                                bg: '#41C2BC', scale: 1.0 },
  { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', bg: '#67D3CA', scale: 1.12 },
  { borderRadius: '0%',                                 bg: '#112F51', scale: 0.88 },
  { borderRadius: '50% 0% 50% 0%',                     bg: '#41C2BC', scale: 1.06 },
  { borderRadius: '20% 80% 20% 80% / 80% 20% 80% 20%', bg: '#0EA5E9', scale: 1.0 },
]

function HeavyMorphingDemo() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SHAPES.length), 1800)
    return () => clearInterval(t)
  }, [])

  const { borderRadius, bg, scale } = SHAPES[idx]

  return (
    <div className="h-full flex flex-col items-center justify-center bg-navy-950 gap-8">
      <motion.div
        className="w-44 h-44"
        animate={{ borderRadius, scale, backgroundColor: bg }}
        transition={{ duration: 1.3, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
      <p className="type-caption text-white/25">Auto-cycling shapes</p>
    </div>
  )
}

// ─── Demo 12: Aggressive Motion ───────────────────────────────────────────────

function AggressiveMotionDemo({ refresh }: { refresh: number }) {
  const [fired, setFired] = useState(false)
  const spring = { type: 'spring' as const, stiffness: 680, damping: 11 }

  return (
    <div key={refresh} className="h-full flex flex-col items-center justify-center bg-navy-950 gap-10 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!fired ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <h2 className="type-h2 text-white/15">Ready</h2>
          </motion.div>
        ) : (
          <motion.div
            key="fired"
            initial={{ y: 100, rotate: -6, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={spring}
            className="text-center z-10"
          >
            <span className="type-eyebrow text-primary block mb-2">Ορθοπαιδικός</span>
            <h2 className="type-h2 text-white">Dr. Bekas</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {fired && ['FIFA', 'M.Sc.', 'M.D.'].map((tag, i) => (
        <motion.div
          key={tag}
          className="absolute px-3 py-1 rounded-full bg-primary/25 text-primary text-xs font-bold"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: (i - 1) * 110, y: -100 - i * 18, opacity: [0, 1, 1, 0], scale: [0, 1.15, 1, 0.7] }}
          transition={{ duration: 1.1, delay: i * 0.09 }}
        >
          {tag}
        </motion.div>
      ))}

      <motion.button
        className="px-8 py-3.5 bg-primary text-navy-950 font-bold rounded-full text-sm cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        onClick={() => setFired(f => !f)}
      >
        {fired ? 'Reset' : 'Fire ⚡'}
      </motion.button>
    </div>
  )
}

// ─── Demo 13: Self-Drawing SVG ────────────────────────────────────────────────

function SelfDrawingDemo({ refresh }: { refresh: number }) {
  return (
    <div key={refresh} className="h-full flex flex-col items-center justify-center bg-navy-950 gap-6">
      <svg viewBox="0 0 200 200" width="220" height="220">
        <motion.circle cx="100" cy="100" r="75"
          stroke="#41C2BC" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.path d="M 100 40 L 100 160 M 40 100 L 160 100"
          stroke="#41C2BC" strokeWidth="3" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 1.6, ease: 'easeInOut' }}
        />
        <motion.path d="M 40 170 Q 100 158 160 170"
          stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.4, ease: 'easeOut' }}
        />
        <motion.circle cx="100" cy="100" r="5" fill="#41C2BC"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.5 }}
        />
      </svg>
      <p className="type-caption text-white/25">Strokes draw in sequence</p>
    </div>
  )
}

// ─── Demo 14: Animated Gradient ───────────────────────────────────────────────

function AnimatedGradientDemo() {
  return (
    <div className="h-full relative overflow-hidden bg-navy-950 flex items-center justify-center">
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, #41C2BC 0%, transparent 70%)', opacity: 0.5 }}
        animate={{ x: [-60, 60, -30, 60, -60], y: [-40, 40, -60, 10, -40] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', opacity: 0.3 }}
        animate={{ x: [80, -50, 80, -20, 80], y: [60, -30, 60, -50, 60] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)', opacity: 0.25 }}
        animate={{ x: [-20, 70, -60, 40, -20], y: [50, -60, 30, 70, 50] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className="relative z-10 text-center px-8">
        <span className="type-eyebrow text-primary block mb-4">Ambient Color</span>
        <h2 className="type-h2 text-white">Animated<br />Gradient</h2>
        <p className="type-caption text-white/30 mt-4">Orbs drift continuously</p>
      </div>
    </div>
  )
}

// ─── Demo 15: Skeleton Screen ─────────────────────────────────────────────────

function SkeletonBar({ width = 'w-full', height = 'h-2.5', delay = 0 }: { width?: string; height?: string; delay?: number }) {
  return (
    <motion.div
      className={`${height} ${width} rounded-full bg-navy-950/[0.08]`}
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

function SkeletonLoadingDemo({ refresh }: { refresh: number }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(t)
  }, [refresh])

  return (
    <div className="h-full flex items-center justify-center p-8 bg-surface">
      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          {!loaded ? (
            <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="rounded-2xl border border-navy-950/[0.08] bg-white p-5 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-full bg-navy-950/[0.08] shrink-0"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="flex-1 space-y-2">
                  <SkeletonBar width="w-3/4" delay={0.1} />
                  <SkeletonBar width="w-1/2" height="h-2" delay={0.2} />
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <SkeletonBar delay={0.05} />
                <SkeletonBar width="w-5/6" delay={0.1} />
                <SkeletonBar width="w-4/6" delay={0.15} />
              </div>
              <SkeletonBar width="w-28" height="h-8" delay={0} />
              <p className="type-caption text-navy-950/30 text-center pt-1">Loading…</p>
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="rounded-2xl border border-navy-950/[0.08] bg-white p-5 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-xl">👨‍⚕️</div>
                <div>
                  <p className="type-h3 text-navy-950">Dr. Kyriakos Bekas</p>
                  <p className="type-caption text-navy-950/40">Ορθοπαιδικός Χειρουργός</p>
                </div>
              </div>
              <p className="type-body-sm text-navy-950/55">Εξειδίκευση στις αθλητικές κακώσεις.</p>
              <button className="px-5 py-2 rounded-full bg-primary text-navy-950 text-sm font-semibold">
                Κλείσε Ραντεβού
              </button>
              <p className="type-caption text-navy-950/30 text-center">Content loaded ✓</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Demo 16: Loading Animations ─────────────────────────────────────────────

function LoadingAnimDemo() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10 p-8">
      <div className="text-center space-y-3">
        <p className="type-caption text-navy-950/35">Spinner</p>
        <motion.div
          className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="text-center space-y-3">
        <p className="type-caption text-navy-950/35">Bouncing dots</p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
      <div className="text-center space-y-3">
        <p className="type-caption text-navy-950/35">Wave bars</p>
        <div className="flex gap-1 items-end justify-center h-10">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="w-2 rounded-full bg-primary"
              animate={{ height: [10, 36, 10] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Demo 17: Hover Effects ───────────────────────────────────────────────────

function MagneticButton() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 14 })
  const sy = useSpring(y, { stiffness: 150, damping: 14 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }

  return (
    <motion.button
      style={{ x: sx, y: sy }}
      className="px-7 py-3 bg-navy-950 text-white rounded-full text-sm font-semibold cursor-pointer"
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      Κλείσε Ραντεβού
    </motion.button>
  )
}

function UnderlineLink() {
  return (
    <motion.span
      className="relative inline-block type-body text-navy-950 cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      Αρθροσκοπική Χειρουργική
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-primary"
        variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.span>
  )
}

function HoverEffectsDemo() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleCardMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect()
    setSpotlight({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <div className="h-full overflow-y-auto p-8 flex flex-col items-center justify-center gap-8">
      <div className="text-center space-y-2">
        <p className="type-caption text-navy-950/35">Magnetic button</p>
        <MagneticButton />
      </div>
      <div className="text-center space-y-2">
        <p className="type-caption text-navy-950/35">Spotlight card</p>
        <div
          ref={cardRef}
          className="relative w-64 p-5 rounded-2xl border border-navy-950/[0.10] bg-white overflow-hidden cursor-default"
          onMouseMove={handleCardMouse}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle 80px at ${spotlight.x}px ${spotlight.y}px, rgba(65,194,188,0.15), transparent)` }}
          />
          <h3 className="type-h3 text-navy-950 relative z-10">Κλείσε Ραντεβού</h3>
          <p className="type-body-sm text-navy-950/50 mt-1 relative z-10">Hover to see the spotlight</p>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="type-caption text-navy-950/35">Reveal underline</p>
        <UnderlineLink />
      </div>
    </div>
  )
}

// ─── Demo 18: Glassmorphic ────────────────────────────────────────────────────

function GlassmorphicDemo({ refresh }: { refresh: number }) {
  const cards = [
    { title: 'Αθλητικές Κακώσεις', sub: 'Sports Medicine' },
    { title: 'Αρθροσκοπική',       sub: 'Arthroscopy' },
    { title: 'Αρθροπλαστική',      sub: 'Arthroplasty' },
  ]
  return (
    <div key={refresh} className="h-full relative overflow-hidden flex items-center justify-center p-8"
      style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #112F51 50%, #0e4d45 100%)' }}
    >
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-indigo-400/10 blur-3xl" />
      <motion.div
        className="relative z-10 flex flex-col gap-4 w-full max-w-xs"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      >
        {cards.map(c => (
          <motion.div
            key={c.title}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            className="p-4 rounded-2xl border border-white/20"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            <p className="text-white font-semibold text-sm">{c.title}</p>
            <p className="text-white/50 text-xs mt-0.5">{c.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Demo 19: Neumorphic ──────────────────────────────────────────────────────

function NeumorphicDemo() {
  const [active, setActive] = useState<number | null>(null)
  const bg = '#e0e5ec'
  const shadow = '6px 6px 12px #b8bec7, -6px -6px 12px #ffffff'
  const shadowIn = 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff'
  const buttons = ['Ραντεβού', 'Χειρουργεία', 'PRP Θεραπεία']

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8" style={{ background: bg }}>
      <p className="type-caption text-[#8a9ab5]">Click to press</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {buttons.map((label, i) => (
          <button
            key={label}
            className="py-4 px-6 rounded-2xl text-sm font-semibold text-[#5a6882] cursor-pointer w-full transition-all duration-100"
            style={{ background: bg, boxShadow: active === i ? shadowIn : shadow }}
            onMouseDown={() => setActive(i)}
            onMouseUp={() => setActive(null)}
            onMouseLeave={() => setActive(null)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-5 rounded-2xl w-full max-w-xs" style={{ background: bg, boxShadow: shadow }}>
        <p className="type-eyebrow text-[#41C2BC] mb-1">Dr. Bekas</p>
        <p className="type-caption text-[#8a9ab5]">Ορθοπαιδικός Χειρουργός</p>
      </div>
    </div>
  )
}

// ─── Demo 20: Claymorphic ─────────────────────────────────────────────────────

function ClaymorphicDemo({ refresh }: { refresh: number }) {
  const cards = [
    { bg: '#FF6B6B', shadow: '#c94f4f', label: 'Αθλητικές',     sub: 'Sports' },
    { bg: '#4ECDC4', shadow: '#3aa39b', label: 'Χειρουργική',    sub: 'Surgery' },
    { bg: '#45B7D1', shadow: '#3490a8', label: 'PRP',            sub: 'Therapy' },
    { bg: '#96CEB4', shadow: '#72ab8e', label: 'Φυσιοθεραπεία', sub: 'Physio' },
  ]
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.85 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 18 } },
  }
  return (
    <div key={refresh} className="h-full flex items-center justify-center p-8 bg-[#FFF5E4]">
      <motion.div
        className="grid grid-cols-2 gap-4 w-full max-w-xs"
        variants={container} initial="hidden" animate="show"
      >
        {cards.map(c => (
          <motion.div
            key={c.label}
            variants={item}
            whileHover={{ y: -4, scale: 1.04 }}
            className="p-5 rounded-3xl cursor-pointer"
            style={{ background: c.bg, boxShadow: `0 6px 0 ${c.shadow}, 0 8px 16px ${c.shadow}55` }}
          >
            <p className="font-bold text-white text-sm leading-tight">{c.label}</p>
            <p className="text-white/70 text-xs mt-0.5">{c.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Demo 21: Liquid Motion ───────────────────────────────────────────────────

const LIQUID_SHAPES = [
  '45% 55% 60% 40% / 55% 45% 55% 45%',
  '60% 40% 45% 55% / 40% 60% 45% 55%',
  '55% 45% 55% 45% / 60% 40% 55% 45%',
  '40% 60% 55% 45% / 50% 50% 60% 40%',
]
const LIQUID_COLORS = ['#41C2BC', '#0EA5E9', '#6366F1', '#EC4899']

function LiquidMotionDemo() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % LIQUID_SHAPES.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 bg-navy-950">
      <div className="relative w-52 h-52 flex items-center justify-center">
        <motion.div
          className="absolute w-36 h-36"
          animate={{
            borderRadius: LIQUID_SHAPES[(idx + 1) % LIQUID_SHAPES.length],
            backgroundColor: LIQUID_COLORS[(idx + 1) % LIQUID_COLORS.length],
          }}
          transition={{ duration: 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ opacity: 0.35 }}
        />
        <motion.div
          className="absolute w-44 h-44 flex items-center justify-center"
          animate={{
            borderRadius: LIQUID_SHAPES[idx],
            backgroundColor: LIQUID_COLORS[idx],
          }}
          transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <span className="font-bold text-navy-950 text-xs tracking-wide">Dr. Bekas</span>
        </motion.div>
      </div>
      <p className="type-caption text-white/25">Liquid morphing in motion</p>
    </div>
  )
}

// ─── Demo 22: Isometric ───────────────────────────────────────────────────────

function IsometricDemo({ refresh }: { refresh: number }) {
  const palette = ['#41C2BC', '#0EA5E9', '#6366F1', '#112F51']
  const grid = [2, 0, 1, 0, 3, 2, 1, 2, 0]

  return (
    <div key={refresh} className="h-full flex flex-col items-center justify-center bg-[#0a1929] gap-6">
      <div style={{ transform: 'rotate(-20deg) skewX(-10deg)', display: 'grid', gridTemplateColumns: 'repeat(3, 56px)', gap: 6 }}>
        {grid.map((ci, i) => (
          <motion.div
            key={i}
            className="rounded-xl"
            style={{ width: 56, height: 56, background: palette[ci], boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)' }}
            initial={{ opacity: 0, scale: 0, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
          />
        ))}
      </div>
      <p className="type-caption text-white/25">Isometric grid stagger</p>
    </div>
  )
}

// ─── Demo 23: Animated Icons ──────────────────────────────────────────────────

function AnimatedIconsDemo() {
  const [bell,  setBell]  = useState(false)
  const [heart, setHeart] = useState(false)
  const [check, setCheck] = useState(false)
  const [star,  setStar]  = useState(false)

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
        <div className="flex flex-col items-center gap-2">
          <motion.button
            className="w-16 h-16 rounded-2xl border border-navy-950/[0.10] bg-white flex items-center justify-center cursor-pointer text-2xl"
            whileTap={{ scale: 0.88 }}
            onClick={() => setBell(b => !b)}
          >
            <motion.span
              animate={bell ? { rotate: [0, -15, 15, -10, 10, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              {bell ? '🔔' : '🔕'}
            </motion.span>
          </motion.button>
          <p className="type-caption text-navy-950/35">Bell</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.button
            className="w-16 h-16 rounded-2xl border border-navy-950/[0.10] bg-white flex items-center justify-center cursor-pointer text-2xl"
            whileTap={{ scale: 0.80 }}
            onClick={() => setHeart(h => !h)}
          >
            <motion.span
              animate={{ scale: heart ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 0.35 }}
            >
              {heart ? '❤️' : '🤍'}
            </motion.span>
          </motion.button>
          <p className="type-caption text-navy-950/35">Heart</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.button
            className="w-16 h-16 rounded-2xl border border-navy-950/[0.10] bg-white flex items-center justify-center cursor-pointer"
            whileTap={{ scale: 0.88 }}
            onClick={() => setCheck(c => !c)}
          >
            <AnimatePresence mode="wait">
              {check ? (
                <motion.svg key="check" viewBox="0 0 24 24" width="24" height="24"
                  initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                >
                  <motion.path d="M 5 13 L 10 18 L 19 7"
                    stroke="#41C2BC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </motion.svg>
              ) : (
                <motion.span key="plus" className="text-navy-950/30 text-2xl font-light"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >+</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <p className="type-caption text-navy-950/35">Check</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.button
            className="w-16 h-16 rounded-2xl border border-navy-950/[0.10] bg-white flex items-center justify-center cursor-pointer text-2xl"
            whileTap={{ scale: 0.85 }}
            onClick={() => setStar(s => !s)}
          >
            <motion.span
              animate={{ rotate: star ? 360 : 0, scale: star ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.45, type: 'spring' }}
            >
              {star ? '⭐' : '☆'}
            </motion.span>
          </motion.button>
          <p className="type-caption text-navy-950/35">Star</p>
        </div>
      </div>
    </div>
  )
}

// ─── Demo 24: Horizontal Scroll ───────────────────────────────────────────────

function HorizontalScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollXProgress, { stiffness: 80, damping: 30 })

  const cards = [
    { tag: 'ΠΧΣ',          full: 'ACL Reconstruction',  color: 'bg-primary/10' },
    { tag: 'Αρθροσκοπική', full: 'Knee Arthroscopy',    color: 'bg-blue-500/10' },
    { tag: 'Στροφικό',     full: 'Rotator Cuff',        color: 'bg-indigo-500/10' },
    { tag: 'Αρθροπλαστική',full: 'Hip Replacement',     color: 'bg-teal-500/10' },
    { tag: 'Μηνίσκος',     full: 'Meniscal Surgery',    color: 'bg-primary/10' },
    { tag: 'PRP',           full: 'Regenerative Therapy',color: 'bg-blue-500/10' },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="h-0.5 bg-navy-950/[0.06] shrink-0">
        <motion.div className="h-full bg-primary origin-left" style={{ scaleX }} />
      </div>
      <p className="type-caption text-navy-950/35 text-center py-3">← Scroll horizontally →</p>
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto flex items-center gap-4 px-8 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {cards.map(c => (
          <motion.div
            key={c.tag}
            className={`shrink-0 w-52 h-40 rounded-2xl border border-navy-950/[0.08] ${c.color} flex flex-col justify-between p-5 snap-start`}
            whileHover={{ scale: 1.03 }}
          >
            <span className="type-eyebrow text-primary">{c.tag}</span>
            <p className="type-body-sm text-navy-950/60">{c.full}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Demo 25: Ambient Background ─────────────────────────────────────────────

function AmbientBgDemo() {
  const orbs = [
    { size: 'w-64 h-64', color: 'bg-primary/[0.07]',   x: [-30, 30, -20, 30, -30], y: [-20, 25, -30, 10, -20], dur: 14 },
    { size: 'w-48 h-48', color: 'bg-blue-400/[0.06]',  x: [40, -20, 50, -30, 40],  y: [30, -25, 40, -10, 30],  dur: 18 },
    { size: 'w-80 h-80', color: 'bg-indigo-400/[0.05]',x: [-10, 40, -40, 20, -10], y: [-40, 20, -10, 40, -40], dur: 22 },
  ]
  return (
    <div className="h-full relative overflow-hidden bg-surface flex items-center justify-center">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} ${orb.color} rounded-full blur-2xl`}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="relative z-10 text-center px-8">
        <span className="type-eyebrow text-primary block mb-4">Ορθοπαιδικός Χειρουργός</span>
        <h2 className="type-h2 text-navy-950">Dr. Kyriakos<br />Bekas</h2>
        <p className="type-body text-navy-950/40 mt-4 max-w-xs mx-auto">Εξειδίκευση στις αθλητικές κακώσεις.</p>
        <p className="type-caption text-navy-950/20 mt-6">Orbs drift slowly behind content</p>
      </div>
    </div>
  )
}

// ─── Demo 26: Doodle Animation ────────────────────────────────────────────────

function DoodleDemo({ refresh }: { refresh: number }) {
  return (
    <div key={refresh} className="h-full flex items-center justify-center bg-[#FFFDF7] p-8">
      <svg viewBox="0 0 280 200" width="280" height="200" style={{ overflow: 'visible' }}>
        <motion.path
          d="M 20 152 Q 50 142 80 152 Q 110 162 140 152 Q 170 142 200 152 Q 230 162 260 152"
          stroke="#41C2BC" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <motion.ellipse cx="140" cy="95" rx="90" ry="46"
          stroke="#112F51" strokeWidth="2" fill="none" strokeDasharray="4 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        />
        <motion.path d="M 200 62 Q 228 50 238 30 L 233 38 M 238 30 L 230 36"
          stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 2.0, ease: 'easeOut' }}
        />
        <motion.path d="M 42 62 L 47 46 L 52 62 L 68 57 L 56 67 L 61 83 L 47 73 L 33 83 L 38 67 L 26 57 Z"
          stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 1.5, ease: 'easeInOut' }}
        />
        <text x="140" y="100" textAnchor="middle" fontSize="14" fill="#112F51" fontWeight="600" fontFamily="sans-serif">Dr. Bekas</text>
        <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#112F5155" fontFamily="sans-serif">Ορθοπαιδικός</text>
      </svg>
    </div>
  )
}

// ─── Demo 27: Stop Motion ─────────────────────────────────────────────────────

const STOP_FRAMES = [
  { x: -50, y: -30, rotate: -12, bg: '#41C2BC' },
  { x:  30, y: -50, rotate:   6, bg: '#0EA5E9' },
  { x:  55, y:  20, rotate:  -4, bg: '#6366F1' },
  { x: -20, y:  45, rotate:  10, bg: '#EC4899' },
  { x:   5, y:   0, rotate:  -2, bg: '#41C2BC' },
]

function StopMotionDemo() {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setFrame(f => (f + 1) % STOP_FRAMES.length), 260)
    return () => clearInterval(t)
  }, [playing])

  const f = STOP_FRAMES[frame]

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#FFFDF7] gap-6">
      <div className="relative w-52 h-52 flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-navy-950/15" />
        <motion.div
          className="w-24 h-24 rounded-2xl flex items-center justify-center"
          style={{ x: f.x / 2, y: f.y / 2, rotate: f.rotate, backgroundColor: f.bg }}
          transition={{ duration: 0 }}
        >
          <span className="font-bold text-white text-xs">Dr.</span>
        </motion.div>
      </div>
      <p className="type-caption text-navy-950/35">Frame {frame + 1} / {STOP_FRAMES.length}</p>
      <button
        className="px-5 py-2 rounded-full border border-navy-950/15 text-navy-950/50 text-sm cursor-pointer"
        onClick={() => setPlaying(p => !p)}
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

// ─── Demo 28: Animated Logo ───────────────────────────────────────────────────

function AnimatedLogoDemo({ refresh }: { refresh: number }) {
  const parts = [
    { text: 'Dr.',                      delay: 0,    x: -20, y: -10, cls: 'text-white/60 text-2xl font-light font-sans' },
    { text: 'KYRIAKOS',                 delay: 0.18, x: 0,   y: -30, cls: 'text-white font-black tracking-widest text-3xl font-sans' },
    { text: 'BEKAS',                    delay: 0.32, x: 0,   y:  30, cls: 'text-primary font-black tracking-[0.3em] text-4xl font-sans' },
    { text: 'M.D.  ·  M.Sc.  ·  FIFA', delay: 0.52, x: 20,  y:   0, cls: 'text-white/30 text-[10px] tracking-[0.4em] font-medium font-sans' },
  ]

  return (
    <div key={refresh} className="h-full flex flex-col items-center justify-center bg-navy-950 gap-1">
      <motion.div
        className="flex flex-col items-center gap-1"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      >
        {parts.map(p => (
          <motion.div
            key={p.text}
            variants={{
              hidden: { opacity: 0, x: p.x, y: p.y, filter: 'blur(6px)' },
              show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: p.delay } },
            }}
            className={p.cls}
          >
            {p.text}
          </motion.div>
        ))}
        <motion.div
          className="h-px bg-primary mt-2"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  )
}

// ─── Demo 29: Expressive Typography ──────────────────────────────────────────

function ExpressiveTypeDemo({ refresh }: { refresh: number }) {
  const word1 = 'ΟΡΘΟΠΑΙΔΙΚΟΣ'
  const word2 = 'ΧΕΙΡΟΥΡΓΟΣ'

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotate: -15, scale: 0.5 },
    show:   { opacity: 1, y: 0,  rotate: 0,   scale: 1, transition: { type: 'spring', stiffness: 280, damping: 18 } },
  }

  return (
    <div key={refresh} className="h-full flex flex-col items-center justify-center bg-navy-950 gap-6 px-6">
      <motion.div
        className="flex flex-wrap justify-center"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
      >
        {word1.split('').map((c, i) => (
          <motion.span key={i} variants={charVariants}
            className="inline-block font-black text-3xl text-white font-sans"
            style={{ letterSpacing: '0.04em' }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.55 } } }}
      >
        {word2.split('').map((c, i) => (
          <motion.span
            key={i}
            variants={{ hidden: { opacity: 0, y: -40, scale: 1.4 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 14 } } }}
            className="inline-block font-light text-xl text-primary font-sans"
            style={{ letterSpacing: '0.15em' }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Demo 30: Faux 3D ─────────────────────────────────────────────────────────

function Faux3DDemo() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8">
      <p className="type-caption text-navy-950/35">Click to flip</p>
      <div
        className="cursor-pointer"
        style={{ perspective: '800px', width: 240, height: 160 }}
        onClick={() => setFlipped(f => !f)}
      >
        <motion.div
          style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 rounded-2xl bg-navy-950 flex flex-col items-center justify-center gap-2 border border-white/10"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="type-eyebrow text-primary">Πρόσωπο</span>
            <h3 className="type-h3 text-white">Dr. Bekas</h3>
            <p className="type-caption text-white/30">Tap to flip →</p>
          </div>
          <div
            className="absolute inset-0 rounded-2xl bg-primary flex flex-col items-center justify-center gap-2"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="type-eyebrow text-navy-950/60">Πληροφορίες</span>
            <p className="type-body text-navy-950 font-semibold">M.D. · M.Sc. · FIFA</p>
            <p className="type-caption text-navy-950/50">Athens, Greece</p>
          </div>
        </motion.div>
      </div>

      <div className="relative w-52" style={{ perspective: '600px' }}>
        <motion.div
          className="p-4 rounded-2xl border border-navy-950/[0.10] bg-white text-center"
          whileHover={{ rotateX: -8, rotateY: 5, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <p className="type-caption text-navy-950/40">Hover for depth</p>
          <p className="type-h3 text-navy-950 mt-1">Αρθροσκοπική</p>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Demo 31: Animated Flipbook ───────────────────────────────────────────────

const FLIPBOOK_PAGES = [
  { title: 'Ιατρική Πτυχή',      body: 'Αριστοτέλειο Πανεπιστήμιο', year: '2000' },
  { title: 'M.Sc. Αθλητιατρική', body: 'University of Athens',        year: '2004' },
  { title: 'FIFA Certificate',    body: 'FIFA Medical Excellence',     year: '2008' },
  { title: 'Ιδρυτής Κλινικής',   body: 'BekasSports Athens',          year: '2012' },
]

function FlipbookDemo() {
  const [page, setPage] = useState(0)
  const [dir,  setDir]  = useState(1)

  const goNext = () => { if (page < FLIPBOOK_PAGES.length - 1) { setDir(1);  setPage(p => p + 1) } }
  const goPrev = () => { if (page > 0)                         { setDir(-1); setPage(p => p - 1) } }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
      <div className="relative" style={{ perspective: '600px', width: 240, height: 160 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={{
              enter:  (d: number) => ({ rotateY: d > 0 ?  90 : -90, opacity: 0 }),
              center:              ({ rotateY: 0,                     opacity: 1 }),
              exit:   (d: number) => ({ rotateY: d > 0 ? -90 :  90, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-2xl border border-navy-950/[0.10] bg-white p-6 flex flex-col justify-between shadow-md"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <div>
              <p className="type-eyebrow text-primary">{FLIPBOOK_PAGES[page].year}</p>
              <h3 className="type-h3 text-navy-950 mt-1">{FLIPBOOK_PAGES[page].title}</h3>
              <p className="type-body-sm text-navy-950/50 mt-1">{FLIPBOOK_PAGES[page].body}</p>
            </div>
            <p className="type-caption text-navy-950/25">{page + 1} / {FLIPBOOK_PAGES.length}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        <motion.button
          onClick={goPrev}
          disabled={page === 0}
          className="px-5 py-2 rounded-full border border-navy-950/[0.10] text-navy-950/50 text-sm cursor-pointer disabled:opacity-30"
          whileTap={{ scale: 0.93 }}
        >
          ← Prev
        </motion.button>
        <motion.button
          onClick={goNext}
          disabled={page === FLIPBOOK_PAGES.length - 1}
          className="px-5 py-2 rounded-full bg-primary text-navy-950 text-sm font-semibold cursor-pointer disabled:opacity-30"
          whileTap={{ scale: 0.93 }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  )
}

// ─── Demo router ──────────────────────────────────────────────────────────────

function renderDemo(id: AnimId, refresh: number) {
  switch (id) {
    case 'scroll-reveal':     return <ScrollRevealDemo />
    case 'parallax':          return <ParallaxDemo />
    case 'image-reveal':      return <ImageRevealDemo refresh={refresh} />
    case 'mask-reveal':       return <MaskRevealDemo refresh={refresh} />
    case 'clip-path':         return <ClipPathDemo refresh={refresh} />
    case 'gentle-parallax':   return <GentleParallaxDemo />
    case 'microinteractions': return <MicrointeractionsDemo />
    case 'layered-motion':    return <LayeredMotionDemo refresh={refresh} />
    case 'cinematic-scroll':  return <CinematicScrollDemo />
    case 'scroll-driven':     return <ScrollDrivenDemo />
    case 'heavy-morphing':    return <HeavyMorphingDemo />
    case 'aggressive':        return <AggressiveMotionDemo refresh={refresh} />
    case 'self-drawing':      return <SelfDrawingDemo refresh={refresh} />
    case 'animated-gradient': return <AnimatedGradientDemo />
    case 'skeleton-loading':  return <SkeletonLoadingDemo refresh={refresh} />
    case 'loading-anim':      return <LoadingAnimDemo />
    case 'hover-effects':     return <HoverEffectsDemo />
    case 'glassmorphic':      return <GlassmorphicDemo refresh={refresh} />
    case 'neumorphic':        return <NeumorphicDemo />
    case 'claymorphic':       return <ClaymorphicDemo refresh={refresh} />
    case 'liquid-motion':     return <LiquidMotionDemo />
    case 'isometric':         return <IsometricDemo refresh={refresh} />
    case 'animated-icons':    return <AnimatedIconsDemo />
    case 'horizontal-scroll': return <HorizontalScrollDemo />
    case 'ambient-bg':        return <AmbientBgDemo />
    case 'doodle':            return <DoodleDemo refresh={refresh} />
    case 'stop-motion':       return <StopMotionDemo />
    case 'animated-logo':     return <AnimatedLogoDemo refresh={refresh} />
    case 'expressive-type':   return <ExpressiveTypeDemo refresh={refresh} />
    case 'faux-3d':           return <Faux3DDemo />
    case 'flipbook':          return <FlipbookDemo />
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MotionLab() {
  const [open,    setOpen]    = useState(false)
  const [active,  setActive]  = useState<AnimId>('scroll-reveal')
  const [refresh, setRefresh] = useState(0)

  const current = ANIMS.find(a => a.id === active)!

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])

  const select = (id: AnimId) => { setActive(id); setRefresh(0) }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Motion Lab"
        className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-navy-950 border border-primary/30 flex items-center justify-center shadow-lg shadow-black/20 hover:border-primary/60 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <FlaskConical className="w-5 h-5 text-white/70" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] flex"
          >
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="w-60 shrink-0 h-full bg-navy-950 border-r border-white/[0.07] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
                <div>
                  <p className="font-sans text-[9px] font-semibold tracking-[0.22em] text-white/25 uppercase">Dev Tool</p>
                  <p className="font-sans text-sm font-semibold text-white mt-0.5">Motion Lab</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-white/45" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
                {ANIMS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => select(a.id)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                      a.id === active
                        ? 'bg-white/[0.10] border border-white/[0.14]'
                        : 'hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    <span className="font-sans text-sm text-white/75 truncate">{a.label}</span>
                    <span className={`font-sans text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0 ${TAG_STYLE[a.tag]}`}>
                      {a.tag}
                    </span>
                  </button>
                ))}
              </div>

              <div className="px-5 py-3.5 border-t border-white/[0.06]">
                <p className="font-sans text-[9px] text-white/18 leading-snug">
                  {ANIMS.length} effects · pick what goes in the final site
                </p>
              </div>
            </motion.aside>

            {/* Demo panel */}
            <div className="flex-1 h-full flex flex-col bg-surface overflow-hidden">
              <div className="shrink-0 flex items-center justify-between px-7 py-4 border-b border-navy-950/[0.08] bg-white">
                <div>
                  <p className="type-h3 text-navy-950">{current.label}</p>
                  <p className="type-caption text-navy-950/40 mt-0.5">{current.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-sans text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${TAG_STYLE[current.tag]}`}>
                    {current.tag}
                  </span>
                  <button
                    onClick={() => setRefresh(r => r + 1)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-navy-950/[0.10] text-navy-950/50 hover:text-navy-950/80 hover:border-navy-950/25 transition-colors text-xs font-sans font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Replay
                  </button>
                </div>
              </div>

              <div key={`${active}-${refresh}`} className="flex-1 overflow-hidden">
                {renderDemo(active, refresh)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function SectionDivider() {
  return (
    <div className="bg-navy-900 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(to right, transparent 0%, var(--color-divider) 30%, var(--color-divider) 70%, transparent 100%)',
            opacity: 0.45,
          }}
        />
      </div>
    </div>
  )
}

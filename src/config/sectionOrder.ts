export const SECTION_KEYS = [
  'PhotoStrip',
  'TrustMetrics',
  'PhotoGallery',
  'About',
  'Hospitals',
  'DoctorBio',
  'Expertise',
  'CareApproach',
  'Timeline',
  'Publications',
  'CallToAction',
] as const

export type SectionKey = typeof SECTION_KEYS[number]

export const DEFAULT_ORDER: SectionKey[] = [...SECTION_KEYS]

export const SECTION_LABELS: Record<SectionKey, string> = {
  PhotoStrip:    'Photo Carousel (Hero)',
  TrustMetrics:  'Trust Metrics',
  PhotoGallery:  'Photo Gallery',
  About:         'About',
  Hospitals:     'Hospitals',
  DoctorBio:     'Doctor Profile',
  Expertise:     'Expertise',
  CareApproach:  'Care Approach',
  Timeline:      'Timeline / Credentials',
  Publications:  'Publications',
  CallToAction:  'Call to Action',
}

export const SECTION_ICONS: Record<SectionKey, string> = {
  PhotoStrip:    '🎞',
  TrustMetrics:  '📊',
  PhotoGallery:  '🖼',
  About:         '👤',
  Hospitals:     '🏥',
  DoctorBio:     '🩺',
  Expertise:     '⚕️',
  CareApproach:  '💊',
  Timeline:      '📅',
  Publications:  '📄',
  CallToAction:  '📞',
}

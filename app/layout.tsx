import type { Metadata } from 'next'
import { Providers } from '../src/components/Providers'
import '../src/index.css'

// ─── Structured data (JSON-LD) ────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Physician', 'Person'],
      '@id': 'https://www.drbekas.gr/#doctor',
      name: 'Dr. Kyriakos Bekas',
      alternateName: [
        'Κυριάκος Μπέκας', 'Kyriakos Mpekas', 'Kiriakos Bekas',
        'Κυριάκος Μπέκας Ορθοπαιδικός', 'Dr Mpekas', 'δρ Μπέκας',
      ],
      jobTitle: 'Ορθοπαιδικός Χειρουργός',
      description: 'Ορθοπαιδικός Χειρουργός εξειδικευμένος σε αθλητικές κακώσεις, αρθροσκοπική χειρουργική και αρθροπλαστική. Πιστοποιημένος FIFA Football Medicine.',
      medicalSpecialty: ['http://schema.org/Orthopedic', 'http://schema.org/SportsMedicine'],
      knowsLanguage: ['el', 'en'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', worstRating: '1', ratingCount: '80' },
      worksFor: { '@id': 'https://www.drbekas.gr/#clinic' },
      url: 'https://www.drbekas.gr',
      image: { '@type': 'ImageObject', url: 'https://www.drbekas.gr/profile/hero.jpeg', width: 800, height: 1067 },
      telephone: '+302100000000',
      email: 'info@drbekas.gr',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Μιχαλακοπούλου 15',
        addressLocality: 'Αθήνα',
        addressRegion: 'Αττική',
        postalCode: '11528',
        addressCountry: 'GR',
      },
      sameAs: [
        'https://www.instagram.com/dr.kyriakos.bekas',
        'https://www.linkedin.com/in/kyriakos-bekas',
        'https://www.facebook.com/drbekas',
      ],
    },
    {
      '@type': ['MedicalClinic', 'LocalBusiness'],
      '@id': 'https://www.drbekas.gr/#clinic',
      name: 'Ιατρείο Δρ. Κυριάκος Μπέκας — Ορθοπαιδικός Αθήνα',
      url: 'https://www.drbekas.gr',
      telephone: '+302100000000',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Μιχαλακοπούλου 15',
        addressLocality: 'Αθήνα',
        addressRegion: 'Αττική',
        postalCode: '11528',
        addressCountry: 'GR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 37.9751, longitude: 23.7509 },
      medicalSpecialty: ['http://schema.org/Orthopedic', 'http://schema.org/SportsMedicine'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', worstRating: '1', ratingCount: '80' },
      founder: { '@id': 'https://www.drbekas.gr/#doctor' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.drbekas.gr/#website',
      url: 'https://www.drbekas.gr',
      name: 'Dr. Kyriakos Bekas — Ορθοπαιδικός Χειρουργός Αθήνα',
      inLanguage: ['el', 'en'],
      publisher: { '@id': 'https://www.drbekas.gr/#doctor' },
    },
  ],
}

// ─── Page metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://www.drbekas.gr'),
  title: {
    default: 'Δρ. Κυριάκος Μπέκας — Ορθοπαιδικός Χειρουργός Αθήνα | Kyriakos Bekas',
    template: '%s | Dr. Kyriakos Bekas',
  },
  description: 'Ο Δρ. Κυριάκος Μπέκας (Kyriakos Bekas) είναι Ορθοπαιδικός Χειρουργός στην Αθήνα με εξειδίκευση σε αθλητικές κακώσεις, αρθροσκοπική χειρουργική και αρθροπλαστική. Πιστοποιημένος FIFA. Bioclinic Athens & Υγεία.',
  keywords: 'Κυριάκος Μπέκας, Kyriakos Bekas, Kyriakos Mpekas, ορθοπαιδικός Αθήνα, αθλητικές κακώσεις, αρθροσκοπική, ΠΧΣ, αρθροπλαστική γόνατος, FIFA, Bioclinic Athens',
  authors: [{ name: 'Dr. Kyriakos Bekas' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  alternates: {
    canonical: 'https://www.drbekas.gr/',
    languages: { el: 'https://www.drbekas.gr/', en: 'https://www.drbekas.gr/' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Dr. Kyriakos Bekas',
    url: 'https://www.drbekas.gr/',
    locale: 'el_GR',
    title: 'Δρ. Κυριάκος Μπέκας — Ορθοπαιδικός Χειρουργός Αθήνα',
    description: 'Ορθοπαιδικός Χειρουργός στην Αθήνα. Αθλητικές κακώσεις, αρθροσκοπική, αρθροπλαστική. FIFA πιστοποιημένος.',
    images: [{ url: '/profile/hero.jpeg', width: 800, height: 1067, alt: 'Dr. Kyriakos Bekas — Ορθοπαιδικός Χειρουργός' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Δρ. Κυριάκος Μπέκας — Ορθοπαιδικός Χειρουργός Αθήνα',
    description: 'Ορθοπαιδικός Χειρουργός στην Αθήνα. Αθλητικές κακώσεις, αρθροσκοπική, αρθροπλαστική. FIFA πιστοποιημένος.',
    images: ['/profile/hero.jpeg'],
  },
  other: {
    'geo.region': 'GR-I',
    'geo.placename': 'Athens, Attica, Greece',
    'geo.position': '37.9751;23.7509',
    ICBM: '37.9751, 23.7509',
  },
}

// ─── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <head>
        <link rel="icon" type="image/png" href="/brand/logo-vector.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

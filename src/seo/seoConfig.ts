// ─── Site-wide constants ──────────────────────────────────────────────────────
// Update DOMAIN once the live domain is confirmed.
export const SITE = {
  domain:  'https://www.drbekas.gr',
  social: {
    instagram: 'https://www.instagram.com/kbekas.sportsmed/', // TODO: replace with real handle
    linkedin:  'https://www.linkedin.com/in/kyriakos-bekas-md/',  // TODO: replace with real URL
    // facebook:  'https://www.facebook.com/drbekas',            // TODO: replace with real URL
  },
} as const

// ─── Per-language SEO meta ────────────────────────────────────────────────────
// Both title + description intentionally embed Greek AND Greeklish name variants
// so Google indexes both spellings regardless of which language the user typed.
export const SEO_META = {
  el: {
    lang: 'el',
    htmlLang: 'el',
    title: 'Δρ. Κυριάκος Μπέκας — Ορθοπαιδικός Χειρουργός Αθήνα | Kyriakos Bekas',
    description:
      'Ο Δρ. Κυριάκος Μπέκας (Kyriakos Bekas, Kyriakos Mpekas) είναι Ορθοπαιδικός Χειρουργός στην Αθήνα με εξειδίκευση σε αθλητικές κακώσεις, αρθροσκοπική χειρουργική και αρθροπλαστική. Πιστοποιημένος FIFA. Bioclinic Athens & Υγεία.',
    keywords:
      'Κυριάκος Μπέκας, Kyriakos Bekas, Kyriakos Mpekas, Kiriakos Bekas, dr bekas, ορθοπαιδικός Αθήνα, ορθοπαιδικός χειρουργός Αθήνα, αθλητικές κακώσεις, αρθροσκοπική, ΠΧΣ αποκατάσταση, αρθροπλαστική γόνατος, αρθροπλαστική ισχίου, FIFA ορθοπαιδικός, Bioclinic Athens, Υγεία νοσοκομείο, Ηράκλειο Αττικής, PRP θεραπεία, ορθοπαιδικός αθλητικών κακώσεων',
    ogLocale: 'el_GR',
  },
  en: {
    lang: 'en',
    htmlLang: 'en',
    title: 'Dr. Kyriakos Bekas — Orthopedic Surgeon Athens | Κυριάκος Μπέκας',
    description:
      'Dr. Kyriakos Bekas (Κυριάκος Μπέκας, Kyriakos Mpekas) — Orthopedic Surgeon in Athens specialising in sports injuries, arthroscopic surgery, and joint replacement. FIFA-certified. Bioclinic Athens & Ygeia Hospital.',
    keywords:
      'Kyriakos Bekas, Kyriakos Mpekas, Kiriakos Bekas, Dr Bekas, Κυριάκος Μπέκας, orthopedic surgeon Athens, sports injuries Greece, FIFA certified surgeon, arthroscopic surgery, ACL reconstruction, rotator cuff repair, knee replacement, hip replacement, PRP therapy, Bioclinic Athens, Irakleio Attikis',
    ogLocale: 'en_US',
  },
} as const

export type SeoLang = keyof typeof SEO_META

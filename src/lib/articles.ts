// ─── Types ────────────────────────────────────────────────────────────────────

export interface ArticleSection {
  type: 'p' | 'h2' | 'h3' | 'blockquote' | 'ul'
  text: string
  attribution?: string  // blockquote only
  items?: string[]      // ul only
}

export interface Article {
  slug: string
  tag: string
  tagColor: string
  title: string
  excerpt: string
  sections: ArticleSection[]
  date: string
  dateISO: string
  readTime: string
  ogImage?: string
  published: boolean
}

// ─── Static content ───────────────────────────────────────────────────────────
// When Supabase is wired up, replace getArticles() and getArticleBySlug()
// with database queries. The Article type maps directly to a DB table row.

const ARTICLES: Article[] = [
  {
    slug: 'epistrofi-sto-gipedo-meta-rxsi-pxs',
    tag: 'Αθλητικές Κακώσεις',
    tagColor: 'text-teal-700 bg-teal-50',
    title: 'Επιστροφή στο Γήπεδο μετά από Ρήξη Πρόσθιου Χιαστού',
    excerpt: 'Τι να περιμένετε σε κάθε φάση αποκατάστασης, πότε είναι ασφαλής η επιστροφή στον αθλητισμό και ποιοι παράγοντες καθορίζουν το αποτέλεσμα.',
    date: '12 Μαΐου 2026',
    dateISO: '2026-05-12',
    readTime: '7 λεπτά',
    ogImage: '/profile/hero.jpeg',
    published: true,
    sections: [
      {
        type: 'p',
        text: 'Η ρήξη του Πρόσθιου Χιαστού Συνδέσμου (ΠΧΣ) είναι μία από τις συχνότερες σοβαρές κακώσεις στον αθλητισμό. Αντιμετωπίζεται συνήθως με ανακατασκευαστική χειρουργική, ακολουθούμενη από εντατικό πρόγραμμα αποκατάστασης διάρκειας 9–12 μηνών.',
      },
      {
        type: 'p',
        text: 'Η επιτυχής επιστροφή στον αθλητισμό δεν εξαρτάται μόνο από τον χρόνο που έχει παρέλθει — εξαρτάται κυρίως από την επίτευξη συγκεκριμένων κριτηρίων λειτουργικής αποκατάστασης.',
      },
      {
        type: 'h2',
        text: 'Οι Φάσεις Αποκατάστασης',
      },
      {
        type: 'p',
        text: 'Το πρωτόκολλο αποκατάστασης χωρίζεται σε τέσσερις διακριτές φάσεις. Κάθε φάση έχει μετρήσιμους στόχους που πρέπει να επιτευχθούν πριν την πρόοδο στην επόμενη.',
      },
      {
        type: 'ul',
        text: '',
        items: [
          'Φάση 1 (0–6 εβδομάδες): Έλεγχος οιδήματος, αποκατάσταση εύρους κίνησης',
          'Φάση 2 (6–12 εβδομάδες): Ενδυνάμωση τετρακέφαλου και οπίσθιων μηριαίων',
          'Φάση 3 (3–6 μήνες): Νευρομυϊκή επανεκπαίδευση, αθλητικές κινήσεις',
          'Φάση 4 (6–12 μήνες): Σταδιακή επιστροφή στο αθλητικό άθλημα',
        ],
      },
      {
        type: 'blockquote',
        text: 'Ο στόχος δεν είναι η επιστροφή στο γήπεδο — είναι η ασφαλής επιστροφή, με ελαχιστοποιημένο κίνδυνο επαναρήξης.',
        attribution: 'Dr. Kyriakos Bekas',
      },
      {
        type: 'h2',
        text: 'Κριτήρια για Ασφαλή Επιστροφή',
      },
      {
        type: 'p',
        text: 'Η απόφαση για επιστροφή στον αθλητισμό βασίζεται σε αντικειμενικά κριτήρια: δύναμη τετρακέφαλου ≥90% σε σύγκριση με το αντίπλευρο μέλος, επιτυχής ολοκλήρωση hop tests και αξιολόγηση ψυχολογικής ετοιμότητας (ACL-RSI scale).',
      },
      {
        type: 'p',
        text: 'Η πρόωρη επιστροφή αυξάνει σημαντικά τον κίνδυνο επαναρήξης. Μελέτες δείχνουν ότι αθλητές που επιστρέφουν πριν τους 9 μήνες έχουν 4 φορές υψηλότερο κίνδυνο επαναρήξης σε σύγκριση με αυτούς που επιστρέφουν μετά τους 9 μήνες.',
      },
      {
        type: 'h2',
        text: 'Ο Ρόλος της Ομάδας Αποκατάστασης',
      },
      {
        type: 'p',
        text: 'Η πλήρης αποκατάσταση απαιτεί τη στενή συνεργασία ορθοπαιδικού χειρουργού, φυσιοθεραπευτή και του ίδιου του αθλητή. Ο τακτικός έλεγχος από τον χειρουργό εξασφαλίζει ότι η ωρίμανση του μοσχεύματος εξελίσσεται ομαλά και ότι οι στόχοι κάθε φάσης επιτυγχάνονται.',
      },
    ],
  },
  {
    slug: 'arthroskopiiki-gonato-odigos-astheni',
    tag: 'Χειρουργική',
    tagColor: 'text-blue-700 bg-blue-50',
    title: 'Αρθροσκοπική Γόνατος: Ο Πλήρης Οδηγός του Ασθενή',
    excerpt: 'Από την προεγχειρητική προετοιμασία ως την πλήρη αποκατάσταση — όλα όσα χρειάζεστε να γνωρίζετε πριν και μετά από αρθροσκοπική επέμβαση γόνατος.',
    date: '28 Απριλίου 2026',
    dateISO: '2026-04-28',
    readTime: '9 λεπτά',
    ogImage: '/profile/hero.jpeg',
    published: true,
    sections: [
      {
        type: 'p',
        text: 'Η αρθροσκοπική χειρουργική γόνατος είναι μία από τις πιο συχνά εκτελούμενες ορθοπαιδικές επεμβάσεις. Με ελάχιστα τομίδια 5–10 χιλιοστών, ο χειρουργός εισάγει μία μικροκάμερα και εξειδικευμένα εργαλεία για να αντιμετωπίσει βλάβες στον μηνίσκο, τους χιαστούς, τον χόνδρο και άλλες δομές.',
      },
      {
        type: 'h2',
        text: 'Ενδείξεις για Αρθροσκοπική Επέμβαση',
      },
      {
        type: 'ul',
        text: '',
        items: [
          'Ρήξη μηνίσκου (έσω ή έξω)',
          'Ρήξη Πρόσθιου ή Οπίσθιου Χιαστού Συνδέσμου',
          'Βλάβη αρθρικού χόνδρου',
          'Χρόνια φλεγμονή αρθρικής μεμβράνης (συνοβίτιδα)',
          'Ελεύθερα σώματα εντός της άρθρωσης',
        ],
      },
      {
        type: 'blockquote',
        text: 'Η αρθροσκοπική τεχνική επιτρέπει ακριβή διάγνωση και θεραπεία μέσα στην ίδια επέμβαση, με ελάχιστο χρόνο ανάρρωσης.',
        attribution: 'Dr. Kyriakos Bekas',
      },
      {
        type: 'h2',
        text: 'Μετεγχειρητική Πορεία',
      },
      {
        type: 'p',
        text: 'Οι περισσότεροι ασθενείς επιστρέφουν στις καθημερινές δραστηριότητές τους εντός 1–2 εβδομάδων. Η επιστροφή στον αθλητισμό εξαρτάται από την εκτελεσθείσα επέμβαση: από 4–6 εβδομάδες για απλή μηνισκεκτομή έως 9–12 μήνες για ανακατασκευή ΠΧΣ.',
      },
    ],
  },
  {
    slug: 'prp-therapeia-athlites-anagennitiki-iatrikis',
    tag: 'Αναγεννητική Ιατρική',
    tagColor: 'text-amber-700 bg-amber-50',
    title: 'PRP Θεραπεία: Βιολογική Αποκατάσταση για Αθλητές',
    excerpt: 'Πώς η αυτόλογη θεραπεία με αιμοπετάλια επιταχύνει την επούλωση κακώσεων μαλακών μορίων και ποιοι ασθενείς επωφελούνται περισσότερο.',
    date: '5 Απριλίου 2026',
    dateISO: '2026-04-05',
    readTime: '5 λεπτά',
    ogImage: '/profile/hero.jpeg',
    published: true,
    sections: [
      {
        type: 'p',
        text: 'Το PRP (Platelet-Rich Plasma — Πλάσμα Πλούσιο σε Αιμοπετάλια) αποτελεί μία από τις πιο υποσχόμενες βιολογικές θεραπείες στην αθλητική ιατρική. Χρησιμοποιεί τους αυξητικούς παράγοντες του ίδιου του αίματος του ασθενή για να επιταχύνει την επούλωση.',
      },
      {
        type: 'h2',
        text: 'Πώς Λειτουργεί το PRP',
      },
      {
        type: 'p',
        text: 'Λαμβάνεται αίμα από τον ασθενή, φυγοκεντρείται για να συγκεντρωθούν τα αιμοπετάλια, και το εμπλουτισμένο πλάσμα εγχέεται απευθείας στην βλαβείσα περιοχή. Η διαδικασία διαρκεί 30–45 λεπτά και πραγματοποιείται σε εξωτερικό ιατρείο.',
      },
      {
        type: 'blockquote',
        text: 'Το PRP δεν είναι πανάκεια, αλλά σε επιλεγμένους ασθενείς με κακώσεις τενόντων ή χρόνια τενοντοπάθεια, τα αποτελέσματα είναι αξιοσημείωτα.',
        attribution: 'Dr. Kyriakos Bekas',
      },
      {
        type: 'h2',
        text: 'Ενδείξεις',
      },
      {
        type: 'ul',
        text: '',
        items: [
          'Τενοντοπάθεια επικονδύλου (τένις ελbow)',
          'Πελματιαία απονευρωσίτιδα',
          'Κακώσεις στροφικού πετάλου (χαμηλού βαθμού)',
          'Επικονδυλίτιδα αχίλλειου τένοντα',
          'Οστεοαρθρίτιδα γόνατος (πρώιμα στάδια)',
        ],
      },
    ],
  },
  {
    slug: 'knee-arthroscopy-patient-guide',
    tag: 'Surgery',
    tagColor: 'text-blue-700 bg-blue-50',
    title: 'Knee Arthroscopy: What to Expect Before, During and After Surgery',
    excerpt: 'From pre-operative preparation through full recovery — a step-by-step guide to keyhole knee surgery for patients and families.',
    date: 'June 10, 2026',
    dateISO: '2026-06-10',
    readTime: '8 min',
    ogImage: '/assets/arthroscopy-training-screen.jpg',
    published: true,
    sections: [
      {
        type: 'p',
        text: 'Knee arthroscopy is a minimally invasive surgical technique that allows an orthopaedic surgeon to diagnose and treat a wide range of joint problems through two or three incisions barely larger than a keyhole. Instead of opening the entire joint, a fibre-optic camera (the arthroscope) projects live high-definition video inside the knee onto a monitor while micro-instruments work through the other portals.',
      },
      {
        type: 'h2',
        text: 'Who Needs Arthroscopic Surgery?',
      },
      {
        type: 'p',
        text: 'Not every knee problem requires surgery, and arthroscopy is not a shortcut to avoid rehabilitation. However, when structural damage is confirmed on MRI and conservative management has plateaued, arthroscopy offers precise diagnosis and treatment in a single session.',
      },
      {
        type: 'ul',
        text: '',
        items: [
          'Torn meniscus — medial or lateral (repair or partial resection)',
          'Anterior or posterior cruciate ligament reconstruction (ACL/PCL)',
          'Articular cartilage damage — microfracture or chondroplasty',
          'Chronic synovitis and persistent joint inflammation',
          'Loose bodies causing mechanical locking of the joint',
          'Plica syndrome and patellofemoral alignment disorders',
        ],
      },
      {
        type: 'blockquote',
        text: 'Arthroscopy transformed orthopaedic surgery. We can diagnose and treat conditions in a single session that once required a large open incision and weeks of hospital recovery.',
        attribution: 'Dr. Kyriakos Bekas',
      },
      {
        type: 'h2',
        text: 'The Day of Surgery',
      },
      {
        type: 'p',
        text: 'Most procedures are performed under general or spinal anaesthesia and take between 30 minutes and 1.5 hours depending on the complexity of the repair. You will arrive fasting, be admitted to a day-surgery unit, and in the majority of cases go home the same day. Before discharge, the nursing team will brief you on wound care, icing protocols, and the correct use of crutches.',
      },
      {
        type: 'h2',
        text: 'Recovery Milestones',
      },
      {
        type: 'ul',
        text: '',
        items: [
          'Days 1–7: Elevation, ice, compression. Gentle range-of-motion exercises begin.',
          'Weeks 2–4: Crutches discarded for most patients. Physiotherapy commences.',
          'Weeks 4–8: Progressive strengthening, balance and proprioceptive training.',
          'Months 2–3: Return to low-impact activities — cycling and swimming.',
          'Months 6–12: Return to competitive sport, depending on procedure performed.',
        ],
      },
      {
        type: 'h2',
        text: 'Returning to Sport',
      },
      {
        type: 'p',
        text: 'The timeline for sport re-entry depends heavily on the procedure performed. A simple meniscectomy may allow return in as little as 4–6 weeks. ACL reconstruction, however, requires 9–12 months of structured rehabilitation before competitive sport is safe. The decision is guided by objective functional criteria — quadriceps strength symmetry, single-leg hop tests, and psychological readiness scales — not the calendar alone.',
      },
      {
        type: 'blockquote',
        text: 'No two patients heal at exactly the same rate. Our goal is not to rush you back, but to return you stronger and more resilient than you were before the injury.',
        attribution: 'Dr. Kyriakos Bekas',
      },
    ],
  },
]

// ─── Data access functions ────────────────────────────────────────────────────
// When NOTION_TOKEN + NOTION_DATABASE_ID env vars are present, data comes from
// Notion. Otherwise falls back to the static array above (dev / CI without keys).

function notionConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
}

export async function getArticles(): Promise<Article[]> {
  if (notionConfigured()) {
    const { fetchArticlesFromNotion } = await import('./notion')
    return fetchArticlesFromNotion()
  }
  return ARTICLES.filter(a => a.published)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (notionConfigured()) {
    const { fetchArticleBySlug } = await import('./notion')
    return fetchArticleBySlug(slug)
  }
  return ARTICLES.find(a => a.slug === slug && a.published) ?? null
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await getArticles()
  return articles.map(a => a.slug)
}

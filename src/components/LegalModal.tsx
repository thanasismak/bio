import { useEffect } from 'react'
import { X } from 'lucide-react'

export type LegalType = 'privacy' | 'terms' | 'cookies'

interface Props {
  type: LegalType | null
  onClose: () => void
}

const CONTENT: Record<LegalType, { title: string; body: React.ReactNode }> = {
  privacy: {
    title: 'Πολιτική Απορρήτου / Privacy Policy',
    body: (
      <>
        <p className="text-navy-950/50 text-sm mb-6">Τελευταία ενημέρωση: Ιανουάριος 2025 — <em>Προσωρινό κείμενο, θα αντικατασταθεί με νομικά επικυρωμένο.</em></p>

        <h3>1. Υπεύθυνος Επεξεργασίας</h3>
        <p>Υπεύθυνος επεξεργασίας των δεδομένων σας είναι ο Δρ. Κυριάκος Μπέκας, Ορθοπαιδικός Χειρουργός, Μιχαλακοπούλου 15, Αθήνα 11528, email: info@drbekas.gr.</p>

        <h3>2. Ποια δεδομένα συλλέγουμε</h3>
        <p>Συλλέγουμε μόνο τα δεδομένα που μας παρέχετε οικειοθελώς μέσω φόρμας επικοινωνίας (όνομα, email, τηλέφωνο, μήνυμα). Δεν χρησιμοποιούμε cookies παρακολούθησης ή analytics τρίτων.</p>

        <h3>3. Σκοπός επεξεργασίας</h3>
        <p>Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για την απάντηση στο αίτημά σας και τον συντονισμό ραντεβού. Δεν τα μοιραζόμαστε με τρίτους.</p>

        <h3>4. Νομική βάση (GDPR)</h3>
        <p>Η επεξεργασία βασίζεται στη συγκατάθεσή σας (Άρθρο 6§1α GDPR) ή στο έννομο συμφέρον παροχής ιατρικών υπηρεσιών (Άρθρο 6§1στ GDPR).</p>

        <h3>5. Δικαιώματά σας</h3>
        <p>Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού και φορητότητας των δεδομένων σας. Για άσκηση δικαιωμάτων: info@drbekas.gr. Δικαίωμα καταγγελίας στην ΑΠΔΠΧ (www.dpa.gr).</p>

        <h3>6. Google Fonts</h3>
        <p>Ο ιστότοπος φορτώνει γραμματοσειρές μέσω Google Fonts, το οποίο ενδέχεται να επεξεργάζεται τη διεύθυνση IP σας σύμφωνα με την πολιτική απορρήτου της Google.</p>

        <h3>7. Διατήρηση δεδομένων</h3>
        <p>Τα δεδομένα επικοινωνίας διατηρούνται για 3 έτη από την τελευταία επαφή, εκτός εάν ζητήσετε τη διαγραφή τους νωρίτερα.</p>
      </>
    ),
  },
  terms: {
    title: 'Όροι Χρήσης / Terms of Use',
    body: (
      <>
        <p className="text-navy-950/50 text-sm mb-6">Τελευταία ενημέρωση: Ιανουάριος 2025 — <em>Προσωρινό κείμενο, θα αντικατασταθεί με νομικά επικυρωμένο.</em></p>

        <h3>1. Αποδοχή όρων</h3>
        <p>Με την περιήγησή σας στον ιστότοπο drbekas.gr αποδέχεστε τους παρόντες όρους χρήσης. Εάν διαφωνείτε, παρακαλούμε μην χρησιμοποιείτε τον ιστότοπο.</p>

        <h3>2. Ιατρική αποποίηση ευθύνης</h3>
        <p>Το περιεχόμενο του ιστοτόπου έχει αμιγώς ενημερωτικό χαρακτήρα και δεν αποτελεί ιατρική συμβουλή, διάγνωση ή θεραπεία. Για οποιοδήποτε ιατρικό θέμα συμβουλευτείτε πάντα τον ιατρό σας.</p>

        <h3>3. Πνευματικά δικαιώματα</h3>
        <p>Όλο το περιεχόμενο (κείμενα, εικόνες, λογότυπο) αποτελεί πνευματική ιδιοκτησία του Δρ. Κυριάκου Μπέκα. Απαγορεύεται η αναπαραγωγή χωρίς γραπτή άδεια.</p>

        <h3>4. Σύνδεσμοι τρίτων</h3>
        <p>Ο ιστότοπος ενδέχεται να περιέχει συνδέσμους προς εξωτερικούς ιστότοπους. Δεν φέρουμε ευθύνη για το περιεχόμενο ή τις πολιτικές απορρήτου τους.</p>

        <h3>5. Τροποποιήσεις</h3>
        <p>Διατηρούμε το δικαίωμα τροποποίησης των παρόντων όρων ανά πάσα στιγμή. Οι αλλαγές τίθενται σε ισχύ από τη δημοσίευσή τους.</p>

        <h3>6. Εφαρμοστέο δίκαιο</h3>
        <p>Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Αρμόδια δικαστήρια ορίζονται τα δικαστήρια Αθηνών.</p>
      </>
    ),
  },
  cookies: {
    title: 'Πολιτική Cookies / Cookie Policy',
    body: (
      <>
        <p className="text-navy-950/50 text-sm mb-6">Τελευταία ενημέρωση: Ιανουάριος 2025 — <em>Προσωρινό κείμενο, θα αντικατασταθεί με νομικά επικυρωμένο.</em></p>

        <h3>1. Τι είναι τα cookies</h3>
        <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε έναν ιστότοπο. Χρησιμοποιούνται για τη βελτίωση της εμπειρίας σας.</p>

        <h3>2. Τι χρησιμοποιούμε</h3>
        <p>Ο ιστότοπος αυτός <strong>δεν χρησιμοποιεί cookies παρακολούθησης</strong>. Χρησιμοποιεί αποκλειστικά <strong>localStorage</strong> του προγράμματος περιήγησής σας για να αποθηκεύει τις προτιμήσεις εμφάνισης (χρωματική παλέτα, γραμματοσειρά) και τη γλωσσική προτίμηση. Αυτά τα δεδομένα παραμένουν τοπικά στη συσκευή σας και δεν αποστέλλονται σε κανέναν διακομιστή.</p>

        <h3>3. Google Fonts</h3>
        <p>Φορτώνουμε γραμματοσειρές από τους διακομιστές της Google (fonts.googleapis.com). Κατά τη φόρτωση, η Google ενδέχεται να επεξεργαστεί τη διεύθυνση IP σας. Δείτε την <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Πολιτική Απορρήτου Google</a>.</p>

        <h3>4. Πώς να διαχειριστείτε τις προτιμήσεις</h3>
        <p>Μπορείτε να διαγράψετε τα αποθηκευμένα δεδομένα localStorage από τις ρυθμίσεις του προγράμματος περιήγησής σας (Ρυθμίσεις → Απόρρητο → Εκκαθάριση δεδομένων ιστότοπου). Αυτό θα επαναφέρει τις προεπιλεγμένες ρυθμίσεις εμφάνισης.</p>

        <h3>5. Αλλαγές στην πολιτική</h3>
        <p>Ενδέχεται να ενημερώνουμε την παρούσα πολιτική. Οποιαδήποτε αλλαγή θα αναρτάται στη σελίδα αυτή με ενημερωμένη ημερομηνία.</p>
      </>
    ),
  },
}

export default function LegalModal({ type, onClose }: Props) {
  useEffect(() => {
    if (!type) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [type])

  useEffect(() => {
    if (!type) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [type, onClose])

  if (!type) return null

  const { title, body } = CONTENT[type]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[80vh] bg-surface rounded-t-2xl sm:rounded-2xl border border-navy-950/[0.10] shadow-2xl shadow-black/20 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5 border-b border-navy-950/[0.08] shrink-0">
          <p className="type-h3 text-navy-950 pr-4">{title}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-navy-950/[0.05] hover:bg-navy-950/[0.10] flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
            aria-label="Κλείσιμο"
          >
            <X className="w-4 h-4 text-navy-950/50" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto overscroll-contain px-7 py-6 flex-1 legal-prose">
          {body}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-7 py-4 border-t border-navy-950/[0.08] bg-surface-soft">
          <p className="type-caption text-navy-950/35">
            Αυτό το κείμενο είναι προσωρινό και θα αντικατασταθεί με νομικά επικυρωμένο περιεχόμενο.
          </p>
        </div>
      </div>
    </div>
  )
}

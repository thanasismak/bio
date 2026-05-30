import { NextRequest, NextResponse } from 'next/server'

interface ContactBody {
  name: string
  email: string
  phone?: string
  message: string
}

export async function POST(req: NextRequest) {
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, phone, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Συμπληρώστε όλα τα υποχρεωτικά πεδία.' }, { status: 422 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Μη έγκυρη διεύθυνση email.' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey.startsWith('re_xxxx')) {
    // Resend not configured yet — log locally and return success so form UI works
    console.log('[contact form]', { name, email, phone, message })
    return NextResponse.json({ ok: true })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'info@drbekas.gr'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'DrBekas Site <noreply@drbekas.gr>',
      to: [toEmail],
      reply_to: email,
      subject: `Νέο μήνυμα από ${name} — drbekas.gr`,
      html: `<p><b>Όνομα:</b> ${name}</p><p><b>Email:</b> ${email}</p>${phone ? `<p><b>Τηλέφωνο:</b> ${phone}</p>` : ''}<p><b>Μήνυμα:</b></p><p style="white-space:pre-wrap">${message}</p>`,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Αποτυχία αποστολής. Δοκιμάστε ξανά.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

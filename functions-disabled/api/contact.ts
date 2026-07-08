// Cloudflare Pages Function — runs on the edge, never in the browser.
// POST /api/contact  →  validates  →  Resend API  →  email to doctor.

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string   // e.g. info@drbekas.gr
}

interface ContactBody {
  name: string
  email: string
  phone?: string
  message: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // ── CORS headers ─────────────────────────────────────────────────────────
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400, headers })
  }

  const { name, email, phone, message } = body

  // ── Basic validation ──────────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Συμπληρώστε όλα τα υποχρεωτικά πεδία.' }, { status: 422, headers })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Μη έγκυρη διεύθυνση email.' }, { status: 422, headers })
  }
  if (message.length > 2000) {
    return Response.json({ error: 'Το μήνυμα είναι πολύ μεγάλο.' }, { status: 422, headers })
  }

  // ── Send via Resend ───────────────────────────────────────────────────────
  const toEmail = env.CONTACT_TO_EMAIL ?? 'info@drbekas.gr'

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DrBekas Site <noreply@drbekas.gr>',
      to: [toEmail],
      reply_to: email,
      subject: `Νέο μήνυμα από ${name} — drbekas.gr`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;color:#081A2A">
          <h2 style="margin:0 0 16px;font-size:18px">Νέο μήνυμα επικοινωνίας</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            <tr><td style="padding:8px 0;color:#5a7a8a;width:100px">Όνομα</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#5a7a8a">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#5a7a8a">Τηλέφωνο</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#5a7a8a;vertical-align:top">Μήνυμα</td><td style="padding:8px 0;white-space:pre-wrap">${message}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="font-size:12px;color:#aaa">Εστάλη από drbekas.gr</p>
        </div>
      `,
    }),
  })

  if (!resendRes.ok) {
    const err = await resendRes.text()
    console.error('Resend error:', err)
    return Response.json({ error: 'Αποτυχία αποστολής. Δοκιμάστε ξανά.' }, { status: 500, headers })
  }

  return Response.json({ ok: true }, { headers })
}

// Handle preflight CORS
export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

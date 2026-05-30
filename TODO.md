# TODO — drbekas.gr

## Blocking
- [ ] Real content literals (client)
- [ ] Real phone, address, hours (client)
- [ ] Social URLs — Instagram + LinkedIn (`src/seo/seoConfig.ts`)
- [ ] Legal text — Privacy Policy, Terms, Cookie Policy (`LegalModal.tsx`)
- [ ] Watermarked images — replace `robot-artificial-intelligence.png`, `ortho-content2.jpg`, `istockphotojpg.jpg`
- [ ] Disable sample articles in `src/lib/articles.ts` before go-live (`published: false`)
- [ ] Domain registration (`drbekas.gr`)

## Cloudflare Pages
- [ ] Connect GitHub repo, build: `npm run build`, output: `out`, Node: `20`
- [ ] Env vars: `NOTION_TOKEN`, `NOTION_DATABASE_ID`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`

## Notion → Auto-deploy
- [ ] CF Pages deploy hook → wire to Notion automation on `Published` checkbox
- [ ] Invite `kbekas@outlook.com.gr` to Notion hub (Share → Invite → Can edit)

## Email
- [ ] Resend account + API key
- [ ] Verify `drbekas.gr` domain in Resend
- [ ] Test contact form end-to-end

## Post-launch
- [ ] Google Search Console — submit sitemap after domain is live
- [ ] Update `sitemap.xml` to include `/articles/*` URLs
- [ ] Cloudflare Web Analytics (free, zero-cookie — enable in CF dashboard)
- [ ] Move images to R2, set `NEXT_PUBLIC_ASSETS_URL`
- [ ] Lighthouse audit after first deploy

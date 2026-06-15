// Calls Notion REST API directly — no SDK, works in any runtime including edge.
import type { Article, ArticleSection } from './articles'

const API   = 'https://api.notion.com/v1'
const VER   = '2022-06-28'
const DB_ID = process.env.NOTION_DATABASE_ID ?? ''

function headers() {
  return {
    Authorization:  `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': VER,
    'Content-Type': 'application/json',
  }
}

// ─── Low-level fetchers ───────────────────────────────────────────────────────

async function queryDatabase(filter: unknown, sorts?: unknown[]): Promise<any> {
  const res = await fetch(`${API}/databases/${DB_ID}/query`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ filter, sorts }),
  })
  if (!res.ok) throw new Error(`Notion query failed: ${res.status}`)
  return res.json()
}

async function getBlocks(pageId: string): Promise<any[]> {
  const res = await fetch(`${API}/blocks/${pageId}/children?page_size=100`, {
    headers: headers(),
  })
  if (!res.ok) throw new Error(`Notion blocks failed: ${res.status}`)
  const data = await res.json()
  return data.results ?? []
}

// ─── Rich text → plain string ─────────────────────────────────────────────────

function plainText(rich: any[]): string {
  return (rich ?? []).map((r: any) => r.plain_text ?? '').join('')
}

// ─── Notion blocks → ArticleSection[] ────────────────────────────────────────

export function parseBlocks(blocks: any[]): ArticleSection[] {
  const sections: ArticleSection[] = []
  let listBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length > 0) {
      sections.push({ type: 'ul', text: '', items: [...listBuffer] })
      listBuffer = []
    }
  }

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph': {
        flushList()
        const text = plainText(block.paragraph?.rich_text)
        if (text.trim()) sections.push({ type: 'p', text })
        break
      }
      case 'heading_1': {
        flushList()
        sections.push({ type: 'h2', text: plainText(block.heading_1?.rich_text) })
        break
      }
      case 'heading_2': {
        flushList()
        sections.push({ type: 'h2', text: plainText(block.heading_2?.rich_text) })
        break
      }
      case 'heading_3': {
        flushList()
        sections.push({ type: 'h3', text: plainText(block.heading_3?.rich_text) })
        break
      }
      case 'quote': {
        flushList()
        sections.push({ type: 'blockquote', text: plainText(block.quote?.rich_text) })
        break
      }
      case 'bulleted_list_item':
        listBuffer.push(plainText(block.bulleted_list_item?.rich_text))
        break
      case 'numbered_list_item':
        listBuffer.push(plainText(block.numbered_list_item?.rich_text))
        break
      case 'divider':
        flushList()
        break
    }
  }

  flushList()
  return sections
}

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatGreekDate(iso: string): string {
  const months = [
    'Ιανουαρίου','Φεβρουαρίου','Μαρτίου','Απριλίου',
    'Μαΐου','Ιουνίου','Ιουλίου','Αυγούστου',
    'Σεπτεμβρίου','Οκτωβρίου','Νοεμβρίου','Δεκεμβρίου',
  ]
  const d = new Date(iso)
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

// ─── Tag colour map ───────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  teal:   'text-teal-700 bg-teal-50',
  blue:   'text-blue-700 bg-blue-50',
  amber:  'text-amber-700 bg-amber-50',
  purple: 'text-purple-700 bg-purple-50',
  red:    'text-red-700 bg-red-50',
}

// ─── Notion page → Article ────────────────────────────────────────────────────

async function pageToArticle(page: any): Promise<Article> {
  const props   = page.properties ?? {}
  const titleP  = Object.values(props).find((p: any) => p.type === 'title') as any
  const title   = plainText(titleP?.title ?? [])
  const slug    = plainText(props['Slug']?.rich_text ?? [])
  const tag     = props['Tag']?.select?.name ?? ''
  const colorKey = props['Tag Color']?.select?.name ?? 'teal'
  const tagColor = TAG_COLORS[colorKey] ?? TAG_COLORS.teal
  const excerpt  = plainText(props['Excerpt']?.rich_text ?? [])
  const dateISO  = props['Date']?.date?.start ?? ''
  const readTime = plainText(props['Read Time']?.rich_text ?? [])
  const ogImage  = plainText(props['OG Image']?.rich_text ?? []) || '/profile/hero.jpeg'

  const blocks   = await getBlocks(page.id)
  const sections = parseBlocks(blocks)

  return {
    slug,
    tag,
    tagColor,
    title,
    excerpt,
    sections,
    date: dateISO ? formatGreekDate(dateISO) : '',
    dateISO,
    readTime,
    ogImage,
    published: true,
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchArticlesFromNotion(): Promise<Article[]> {
  const data = await queryDatabase(
    { property: 'Published', checkbox: { equals: true } },
    [{ property: 'Date', direction: 'descending' }],
  )
  return Promise.all((data.results ?? []).map(pageToArticle))
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const data = await queryDatabase({
    and: [
      { property: 'Published', checkbox: { equals: true } },
      { property: 'Slug', rich_text: { equals: slug } },
    ],
  })
  if (!data.results?.length) return null
  return pageToArticle(data.results[0])
}

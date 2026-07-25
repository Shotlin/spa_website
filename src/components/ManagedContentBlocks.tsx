import { useSiteData } from '../lib/site-data'
import { Portrait } from './Portrait'
import { Eyebrow, Section } from './ui'

function textValue(payload: Record<string, unknown>, key: string) {
  return typeof payload[key] === 'string' ? payload[key] : ''
}

/**
 * Renders published editorial blocks created in Studio for a public page.
 * Supported JSON fields are `eyebrow`, `heading`, `body`, and `imageUrl`.
 */
export function ManagedContentBlocks({ page, className = '' }: { page: string; className?: string }) {
  const { contentBlocks } = useSiteData()
  const blocks = Object.values(contentBlocks)
    .filter((block) => block.page === page && block.key !== 'home_hero')
    .sort((a, b) => a.sort_order - b.sort_order)

  if (blocks.length === 0) return null

  return (
    <Section className={`py-14 sm:py-20 ${className}`}>
      <div className="space-y-6">
        {blocks.map((block) => {
          const eyebrow = textValue(block.payload, 'eyebrow')
          const heading = textValue(block.payload, 'heading') || block.label
          const body = textValue(block.payload, 'body')
          const imageUrl = textValue(block.payload, 'imageUrl') || block.image_url

          return (
            <article key={block.id} className="overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft/45">
              <div className={imageUrl ? 'grid lg:grid-cols-[0.86fr_1.14fr]' : ''}>
                {imageUrl ? (
                  <div className="relative min-h-56 overflow-hidden lg:min-h-full">
                    <Portrait image={imageUrl} name={heading} className="absolute inset-0 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-noir/20" />
                  </div>
                ) : null}
                <div className="p-7 sm:p-10">
                  {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
                  <h2 className="mt-3 font-serif text-3xl text-ivory sm:text-4xl">{heading}</h2>
                  {body ? <p className="mt-4 max-w-2xl whitespace-pre-line leading-relaxed text-ivory-dim">{body}</p> : null}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

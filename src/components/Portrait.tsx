import { resolveDecorImage, resolveModelImage, resolveSceneImage, placeholderStyle } from '../lib/images'

type PortraitProps = {
  image: string
  name: string
  className?: string
  kind?: 'model' | 'scene' | 'decor'
  loading?: 'lazy' | 'eager'
}

export function Portrait({ image, name, className = '', kind = 'model', loading = 'lazy' }: PortraitProps) {
  const src =
    kind === 'model'
      ? resolveModelImage(image)
      : kind === 'scene'
        ? resolveSceneImage(image)
        : resolveDecorImage(image)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading={loading}
        decoding="async"
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <div
      role="img"
      aria-label={name}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={placeholderStyle(image + name)}
    >
      <span className="font-serif text-[22vw] leading-none text-ivory/10 sm:text-[9rem]">
        {initial}
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
    </div>
  )
}

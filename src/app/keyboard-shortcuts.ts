export type ShortcutAction =
  | 'back'
  | 'overview'
  | 'next'
  | 'previous'
  | null

export function resolveShortcut(event: KeyboardEvent): ShortcutAction {
  const target = event.target as HTMLElement | null
  if (
    target &&
    (target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable)
  ) {
    return null
  }

  if (event.key === 'Escape') return 'back'
  if (event.key === 'Home' || event.key === '0') return 'overview'
  if (event.key === 'ArrowRight') return 'next'
  if (event.key === 'ArrowLeft') return 'previous'
  return null
}

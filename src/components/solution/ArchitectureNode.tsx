import type { ControlMode } from '../../types/solution'
import { ControlModeBadge } from './ControlModeBadge'
import styles from './ArchitectureNode.module.css'

interface ArchitectureNodeProps {
  kindLabel: string
  label: string
  hint?: string
  controlMode?: ControlMode
  selected?: boolean
  governed?: boolean
  dimmed?: boolean
  density?: 'default' | 'compact'
  /** Use on dark surfaces (HappyRobot orchestration core). */
  tone?: 'default' | 'onDark'
  onSelect?: () => void
}

export function ArchitectureNode({
  kindLabel,
  label,
  hint,
  controlMode,
  selected = false,
  governed = false,
  dimmed = false,
  density = 'default',
  tone = 'default',
  onSelect,
}: ArchitectureNodeProps) {
  const className = [
    styles.node,
    density === 'compact' ? styles.compact : '',
    tone === 'onDark' ? styles.onDark : '',
    selected ? styles.selected : '',
    governed ? styles.governed : '',
    dimmed ? styles.dimmed : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (density === 'compact') {
    return (
      <button
        type="button"
        className={className}
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`${kindLabel}: ${label}${hint ? ` · ${hint}` : ''}`}
        title={hint ? `${kindLabel}: ${label} · ${hint}` : `${kindLabel}: ${label}`}
      >
        <span className={styles.label}>{label}</span>
        {controlMode ? <ControlModeBadge mode={controlMode} compact /> : null}
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </button>
    )
  }

  return (
    <button type="button" className={className} onClick={onSelect} aria-pressed={selected}>
      <div className={styles.meta}>
        <span className={styles.kind}>{kindLabel}</span>
        {controlMode ? <ControlModeBadge mode={controlMode} /> : null}
      </div>
      <p className={styles.label}>{label}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </button>
  )
}

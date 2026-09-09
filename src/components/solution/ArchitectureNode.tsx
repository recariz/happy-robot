import { Activity, Check, TriangleAlert } from 'lucide-react'
import type { ArchitectureRuntimeState } from '../../engine/simulation/resolve-runtime-state'
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
  runtimeState?: ArchitectureRuntimeState
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
  runtimeState = 'idle',
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
    runtimeState !== 'idle' ? styles[runtimeState] : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (density === 'compact') {
    const runtimeLabel =
      runtimeState === 'active'
        ? 'Active'
        : runtimeState === 'completed'
          ? 'Completed'
          : runtimeState === 'exception'
            ? 'Exception'
            : null
    return (
      <button
        type="button"
        className={className}
        onClick={onSelect}
        disabled={!onSelect}
        aria-pressed={selected}
        aria-label={`${kindLabel}: ${label}${runtimeLabel ? ` · ${runtimeLabel}` : ''}${hint ? ` · ${hint}` : ''}`}
        title={hint ? `${kindLabel}: ${label} · ${hint}` : `${kindLabel}: ${label}`}
      >
        {runtimeState === 'active' ? (
          <Activity className={styles.runtimeIcon} aria-hidden size={12} />
        ) : null}
        {runtimeState === 'completed' ? (
          <Check className={styles.runtimeIcon} aria-hidden size={12} />
        ) : null}
        {runtimeState === 'exception' ? (
          <TriangleAlert className={styles.runtimeIcon} aria-hidden size={12} />
        ) : null}
        <span className={styles.label}>{label}</span>
        {controlMode ? <ControlModeBadge mode={controlMode} compact /> : null}
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onSelect}
      disabled={!onSelect}
      aria-pressed={selected}
    >
      <div className={styles.meta}>
        <span className={styles.kind}>{kindLabel}</span>
        {controlMode ? <ControlModeBadge mode={controlMode} /> : null}
      </div>
      <p className={styles.label}>{label}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </button>
  )
}

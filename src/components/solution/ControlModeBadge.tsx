import type { ControlMode } from '../../types/solution'
import { controlModeLabel } from '../../utils/solution'
import styles from './ControlModeBadge.module.css'

export function ControlModeBadge({
  mode,
  compact = false,
}: {
  mode: ControlMode
  compact?: boolean
}) {
  const tone =
    mode === 'agentic'
      ? styles.agentic
      : mode === 'deterministic'
        ? styles.deterministic
        : styles.human

  const label = compact
    ? mode === 'agentic'
      ? 'A'
      : mode === 'deterministic'
        ? 'D'
        : 'H'
    : controlModeLabel(mode)

  return (
    <span
      className={`${styles.badge} ${tone} ${compact ? styles.compact : ''}`}
      title={controlModeLabel(mode)}
    >
      {label}
    </span>
  )
}

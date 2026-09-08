import type { Northstar } from '../../types/northstar'
import styles from './NorthstarCard.module.css'

interface NorthstarCardProps {
  northstar: Northstar
  selected?: boolean
  onSelect?: () => void
}

export function NorthstarCard({
  northstar,
  selected = false,
  onSelect,
}: NorthstarCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className={styles.meta}>
        <span className={styles.kind}>{northstar.kind}</span>
        <span className={styles.severity}>{northstar.severity}</span>
      </div>
      <h3 className={styles.title}>{northstar.name}</h3>
      <p className={styles.rule}>{northstar.rule}</p>
    </button>
  )
}

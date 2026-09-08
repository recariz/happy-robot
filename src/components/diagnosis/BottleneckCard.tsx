import type { Bottleneck } from '../../types/diagnosis'
import styles from './BottleneckCard.module.css'

interface BottleneckCardProps {
  bottleneck: Bottleneck
  selected?: boolean
  onSelect?: () => void
}

export function BottleneckCard({
  bottleneck,
  selected = false,
  onSelect,
}: BottleneckCardProps) {
  const className = [
    styles.card,
    onSelect ? styles.cardInteractive : '',
    selected ? styles.cardSelected : '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <div className={styles.meta}>
        <span className={styles.category}>{bottleneck.category.replace(/-/g, ' ')}</span>
        <span className={styles.severity}>{bottleneck.severity}</span>
      </div>
      <h3 className={styles.title}>{bottleneck.title}</h3>
      <p className={styles.summary}>{bottleneck.summary}</p>
    </>
  )

  if (onSelect) {
    return (
      <button
        type="button"
        className={className}
        onClick={onSelect}
        aria-pressed={selected}
      >
        {content}
      </button>
    )
  }

  return <div className={className}>{content}</div>
}

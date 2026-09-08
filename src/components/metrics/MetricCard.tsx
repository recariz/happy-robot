import type { Metric } from '../../types/metric'
import { formatMetricValue } from '../../utils/format'
import styles from './MetricCard.module.css'

interface MetricCardProps {
  metric: Metric
  locale?: string
  selected?: boolean
  onSelect?: () => void
  showDescription?: boolean
}

export function MetricCard({
  metric,
  locale = 'en-US',
  selected = false,
  onSelect,
  showDescription = false,
}: MetricCardProps) {
  const className = [
    styles.card,
    onSelect ? styles.cardInteractive : '',
    selected ? styles.cardSelected : '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <div className={styles.value}>{formatMetricValue(metric, locale)}</div>
      <div className={styles.label}>{metric.label}</div>
      {showDescription && metric.description ? (
        <p className={styles.description}>{metric.description}</p>
      ) : null}
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

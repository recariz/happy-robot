import type { Ref } from 'react'
import type { SectionDefinition } from '../../types/navigation'
import styles from './OverviewMap.module.css'

interface OverviewNodeProps {
  section: SectionDefinition
  selected: boolean
  dimmed: boolean
  onSelect: () => void
  buttonRef?: Ref<HTMLButtonElement>
}

export function OverviewNode({
  section,
  selected,
  dimmed,
  onSelect,
  buttonRef,
}: OverviewNodeProps) {
  const className = [
    styles.node,
    selected ? styles.nodeSelected : '',
    dimmed ? styles.nodeDimmed : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      style={{ left: `${section.overview.x * 100}%`, top: `${section.overview.y * 100}%` }}
      onClick={onSelect}
      aria-label={`${section.number} ${section.label}. ${section.prompt}`}
    >
      <span className={styles.number}>{section.number}</span>
      <span className={styles.label}>{section.label}</span>
      <span className={styles.prompt}>{section.prompt}</span>
    </button>
  )
}

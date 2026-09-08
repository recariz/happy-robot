import type { DeploymentPhase } from '../../types/deployment'
import styles from './DeploymentStageRail.module.css'

interface DeploymentStageRailProps {
  stages: DeploymentPhase[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function DeploymentStageRail({
  stages,
  selectedId,
  onSelect,
}: DeploymentStageRailProps) {
  return (
    <div className={styles.rail} role="list">
      {stages.map((stage, index) => (
        <button
          key={stage.id}
          type="button"
          role="listitem"
          className={`${styles.stage} ${selectedId === stage.id ? styles.selected : ''}`}
          onClick={() => onSelect(stage.id)}
          aria-pressed={selectedId === stage.id}
        >
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          {stage.label}
        </button>
      ))}
    </div>
  )
}

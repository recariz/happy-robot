import type { RootCause } from '../../types/diagnosis'
import styles from './RootCauseCard.module.css'

interface RootCauseCardProps {
  rootCause: RootCause
}

export function RootCauseCard({ rootCause }: RootCauseCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.chain}>
        <div>
          <div className={styles.stageLabel}>Symptom</div>
          <p className={styles.stageText}>{rootCause.symptom}</p>
        </div>
        <div className={styles.arrow} aria-hidden>
          ↓
        </div>
        <div>
          <div className={styles.stageLabel}>Immediate cause</div>
          <p className={styles.stageText}>{rootCause.immediateCause}</p>
        </div>
        <div className={styles.arrow} aria-hidden>
          ↓
        </div>
        <div>
          <div className={styles.stageLabel}>Root cause</div>
          <p className={styles.stageText}>{rootCause.rootCause}</p>
        </div>
      </div>
    </div>
  )
}

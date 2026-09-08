import type { OperatingModelShift as OperatingModelShiftData } from '../../types/solution'
import styles from './OperatingModelShift.module.css'

interface Props {
  model: OperatingModelShiftData
}

export function OperatingModelShift({ model }: Props) {
  return (
    <div className={styles.shift}>
      <div className={styles.panel}>
        <div className={styles.kicker}>Before</div>
        <p className={styles.label}>{model.beforeLabel}</p>
        {model.beforeSummary ? (
          <p className={styles.summary}>{model.beforeSummary}</p>
        ) : null}
      </div>
      <div className={styles.arrow} aria-hidden>
        →
      </div>
      <div className={`${styles.panel} ${styles.after}`}>
        <div className={styles.kicker}>After</div>
        <p className={styles.label}>{model.afterLabel}</p>
        {model.afterSummary ? (
          <p className={styles.summary}>{model.afterSummary}</p>
        ) : null}
        <div className={styles.human}>{model.humanRoleLabel}</div>
      </div>
    </div>
  )
}

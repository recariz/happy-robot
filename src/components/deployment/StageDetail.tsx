import type { DeploymentPhase } from '../../types/deployment'
import styles from './StageDetail.module.css'

export function StageDetail({ stage }: { stage: DeploymentPhase }) {
  return (
    <div className={styles.panel}>
      <div className={styles.kicker}>Deployment stage</div>
      <h3 className={styles.title}>{stage.label}</h3>
      <p className={styles.summary}>{stage.summary}</p>
      {stage.activities?.length ? (
        <ul className={styles.list}>
          {stage.activities.map((activity) => (
            <li key={activity} className={styles.item}>
              {activity}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

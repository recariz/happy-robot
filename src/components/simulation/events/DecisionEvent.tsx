import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { DecisionEvent as Decision } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function DecisionEvent({
  event,
  presentation,
}: {
  event: Decision
  presentation: DemoRunStepPresentation
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>Decision</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      <p className={styles.summary}>{event.title}</p>
      {presentation.summary ? (
        <p className={styles.summary}>{presentation.summary}</p>
      ) : null}
    </div>
  )
}

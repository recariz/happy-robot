import type { DemoRunStepPresentation } from '../../../types/demo-run'
import styles from './EventSurface.module.css'

export function ReadyEvent({
  presentation,
}: {
  presentation: DemoRunStepPresentation
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>Ready</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      {presentation.summary ? (
        <p className={styles.summary}>{presentation.summary}</p>
      ) : null}
    </div>
  )
}

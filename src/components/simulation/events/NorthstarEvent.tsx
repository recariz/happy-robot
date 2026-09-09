import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { NorthstarResultEvent } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function NorthstarEvent({
  event,
  name,
  presentation,
}: {
  event: NorthstarResultEvent
  name: string
  presentation: DemoRunStepPresentation
}) {
  const statusClass =
    event.status === 'pass'
      ? styles.success
      : event.status === 'fail'
        ? styles.warning
        : ''
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>Northstar evaluation</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      <p className={styles.summary}>{name}</p>
      <span className={`${styles.status} ${statusClass}`}>{event.status}</span>
      {event.evidence ? <p className={styles.evidence}>{event.evidence}</p> : null}
    </div>
  )
}

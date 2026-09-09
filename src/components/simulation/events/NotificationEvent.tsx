import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { NotificationEvent as Notification } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function NotificationEvent({
  event,
  presentation,
}: {
  event: Notification
  presentation: DemoRunStepPresentation
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>{event.channel}</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      <p className={styles.summary}>{event.summary}</p>
      <span className={`${styles.status} ${styles.success}`}>Sent</span>
    </div>
  )
}

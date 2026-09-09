import { Check } from 'lucide-react'
import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { EscalationEvent as Escalation } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function EscalationEvent({
  event,
  presentation,
}: {
  event: Escalation
  presentation: DemoRunStepPresentation
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>Human escalation</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>Reason</span>
          <span className={styles.value}>{event.reason}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Destination</span>
          <span className={styles.value}>{event.destination}</span>
        </div>
      </div>
      {event.contextFields?.length ? (
        <ul className={styles.checklist} aria-label="Context transferred">
          {event.contextFields.map((field) => (
            <li key={field} className={styles.checkItem}>
              <Check className={styles.checkIcon} aria-hidden size={12} />
              {field}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

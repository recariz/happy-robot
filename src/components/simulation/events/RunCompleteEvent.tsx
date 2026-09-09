import { Check } from 'lucide-react'
import type { DemoExpectedOutcome } from '../../../types/demo-run'
import type { RunCompletedEvent } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function RunCompleteEvent({
  event,
  outcome,
  evaluated,
  passed,
}: {
  event: RunCompletedEvent
  outcome: DemoExpectedOutcome
  evaluated: number
  passed: number
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>Run complete</p>
      <h3 className={styles.headline}>{event.title ?? outcome.summary}</h3>
      {event.summary ? <p className={styles.summary}>{event.summary}</p> : null}
      <span className={`${styles.status} ${styles.success}`}>
        {passed} / {evaluated} Northstars passed
      </span>
      {event.outcomeItems?.length ? (
        <ul className={styles.checklist}>
          {event.outcomeItems.map((item) => (
            <li key={item} className={styles.checkItem}>
              <Check className={styles.checkIcon} aria-hidden size={12} />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

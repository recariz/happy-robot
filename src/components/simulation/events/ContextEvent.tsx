import { formatRunValue } from '../../../engine/simulation/format-run-value'
import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { ContextUpdateEvent } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function ContextEvent({
  event,
  presentation,
  locale,
  currency,
}: {
  event: ContextUpdateEvent
  presentation: DemoRunStepPresentation
  locale: string
  currency: string
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>Operational Context updated</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      {presentation.summary ? (
        <p className={styles.summary}>{presentation.summary}</p>
      ) : null}
      <div className={styles.rows}>
        {event.changes.map((change) => (
          <div key={change.field} className={styles.row}>
            <span className={styles.label}>{change.label}</span>
            <span className={styles.value}>
              {formatRunValue(change.after, change.format, locale, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

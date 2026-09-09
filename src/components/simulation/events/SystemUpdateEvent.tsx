import { formatRunValue } from '../../../engine/simulation/format-run-value'
import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { SystemUpdateEvent as SystemUpdate } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function SystemUpdateEvent({
  event,
  systemLabel,
  presentation,
  locale,
  currency,
}: {
  event: SystemUpdate
  systemLabel: string
  presentation: DemoRunStepPresentation
  locale: string
  currency: string
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>{systemLabel}</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      {presentation.summary ? (
        <p className={styles.summary}>{presentation.summary}</p>
      ) : null}
      <div className={styles.rows}>
        {event.changes.map((change) => (
          <div key={change.field} className={styles.change}>
            <span className={styles.label}>{change.label}</span>
            <span className={styles.before}>
              {formatRunValue(change.before, change.format, locale, currency)}
            </span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
            <span className={styles.after}>
              {formatRunValue(change.after, change.format, locale, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

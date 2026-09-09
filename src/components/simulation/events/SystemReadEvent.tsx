import { formatRunValue } from '../../../engine/simulation/format-run-value'
import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { SystemReadEvent as SystemRead } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function SystemReadEvent({
  event,
  systemLabel,
  presentation,
  locale,
  currency,
}: {
  event: SystemRead
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
        {(event.fields ?? []).map((field) => (
          <div key={field.field} className={styles.row}>
            <span className={styles.label}>{field.label}</span>
            <span className={styles.value}>
              {formatRunValue(field.value, field.format, locale, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

import type { DemoRunStepPresentation } from '../../../types/demo-run'
import type { ToolCallEvent, ToolResultEvent } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function ToolEvent({
  event,
  label,
  presentation,
}: {
  event: ToolCallEvent | ToolResultEvent
  label: string
  presentation: DemoRunStepPresentation
}) {
  const isCall = event.type === 'tool_call'
  const failed = event.type === 'tool_result' && event.status === 'error'
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>{isCall ? 'Tool action' : 'Tool result'}</p>
      <h3 className={styles.headline}>{presentation.headline}</h3>
      <p className={styles.summary}>{label}</p>
      {presentation.summary ? (
        <p className={styles.summary}>{presentation.summary}</p>
      ) : null}
      <span
        className={`${styles.status} ${
          failed ? styles.warning : isCall ? '' : styles.success
        }`}
      >
        {failed ? 'Needs attention' : isCall ? 'Working…' : 'Complete'}
      </span>
    </div>
  )
}

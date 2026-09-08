import type { PilotDesign } from '../../types/deployment'
import type { SystemDefinition } from '../../types/system'
import styles from './PilotScopeBoard.module.css'

interface PilotScopeBoardProps {
  pilot: PilotDesign
  systems?: SystemDefinition[]
}

export function PilotScopeBoard({ pilot, systems }: PilotScopeBoardProps) {
  const requiredSystems = (pilot.requiredSystemIds ?? []).map((id) => {
    const system = systems?.find((item) => item.id === id)
    return system?.label ?? id
  })

  return (
    <div className={styles.board}>
      <p className={styles.summary}>{pilot.summary}</p>

      <div className={styles.column}>
        <div className={styles.kicker}>In scope</div>
        <ul className={styles.list}>
          {pilot.includedScope.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.column} ${styles.exclude}`}>
        <div className={styles.kicker}>Exclude / escalate</div>
        <ul className={styles.list}>
          {pilot.excludedOrEscalate.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaBlock}>
          <p className={styles.metaTitle}>Human fallback</p>
          <p className={styles.metaBody}>{pilot.humanFallback}</p>
        </div>
        {requiredSystems.length ? (
          <div className={styles.metaBlock}>
            <p className={styles.metaTitle}>Required systems</p>
            <ul className={styles.list}>
              {requiredSystems.map((label) => (
                <li key={label} className={styles.item}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {pilot.monitoring?.length ? (
          <div className={styles.metaBlock}>
            <p className={styles.metaTitle}>Monitoring</p>
            <ul className={styles.list}>
              {pilot.monitoring.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

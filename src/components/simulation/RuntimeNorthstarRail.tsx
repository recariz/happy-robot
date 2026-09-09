import { Check, Circle, LoaderCircle, X } from 'lucide-react'
import type { CaseConfig } from '../../types/case'
import type { PreparedRun } from '../../engine/simulation/run-provider'
import type { DerivedRunState } from '../../engine/simulation/simulation-reducer'
import styles from './SimulationPanel.module.css'

export function RuntimeNorthstarRail({
  caseConfig,
  run,
  state,
}: {
  caseConfig: CaseConfig
  run: PreparedRun
  state: DerivedRunState
}) {
  const ids = [
    ...new Set(
      run.steps.flatMap((step) =>
        step.events
          .filter((event) => event.type === 'northstar_result')
          .map((event) => event.northstarId),
      ),
    ),
  ]

  return (
    <div className={styles.northstarRail} aria-label="Run Northstars">
      {ids.map((id) => {
        const status = state.northstars[id]?.status ?? 'pending'
        const name =
          caseConfig.northstars?.find((item) => item.id === id)?.name ?? id
        const className =
          status === 'checking'
            ? styles.northstarChecking
            : status === 'pass'
              ? styles.northstarPass
              : status === 'fail'
                ? styles.northstarFail
                : ''
        return (
          <span
            key={id}
            className={`${styles.northstarChip} ${className}`}
            title={`${name}: ${status}`}
          >
            {status === 'checking' ? (
              <LoaderCircle aria-hidden size={10} />
            ) : status === 'pass' ? (
              <Check aria-hidden size={10} />
            ) : status === 'fail' ? (
              <X aria-hidden size={10} />
            ) : (
              <Circle aria-hidden size={9} />
            )}
            {name}
          </span>
        )
      })}
    </div>
  )
}

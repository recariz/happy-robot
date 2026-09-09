import type { DemoRunDefinition } from '../../types/demo-run'
import type { PlaybackStatus } from '../../engine/simulation/simulation-player'
import styles from './SimulationPanel.module.css'

export function SimulationHeader({
  runs,
  runId,
  status,
  currentStep,
  totalSteps,
  onSelectRun,
}: {
  runs: DemoRunDefinition[]
  runId: string
  status: PlaybackStatus
  currentStep: number
  totalSteps: number
  onSelectRun: (runId: string) => void
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <span className={styles.eyebrow}>Simulated deployment run</span>
        <span className={styles.step}>
          {String(currentStep + 1).padStart(2, '0')} /{' '}
          {String(totalSteps).padStart(2, '0')}
        </span>
      </div>
      <select
        className={styles.select}
        value={runId}
        onChange={(event) => onSelectRun(event.target.value)}
        aria-label="Scenario"
      >
        {runs.map((run) => (
          <option key={run.id} value={run.id}>
            {run.title}
          </option>
        ))}
      </select>
      <div className={styles.statusRow}>
        <span className={styles.state}>{status}</span>
      </div>
    </header>
  )
}

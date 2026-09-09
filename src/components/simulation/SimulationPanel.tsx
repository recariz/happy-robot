import type { CaseConfig } from '../../types/case'
import type { DemoRunDefinition } from '../../types/demo-run'
import type { PreparedRun } from '../../engine/simulation/run-provider'
import type { useSimulationPlayer } from '../../engine/simulation/use-simulation-player'
import { RunStateSummary } from './RunStateSummary'
import { SimulationControls } from './SimulationControls'
import { SimulationHeader } from './SimulationHeader'
import { SimulationPrimaryEvent } from './SimulationPrimaryEvent'
import styles from './SimulationPanel.module.css'

type Player = ReturnType<typeof useSimulationPlayer>

export function SimulationPanel({
  caseConfig,
  runs,
  run,
  player,
  onSelectRun,
}: {
  caseConfig: CaseConfig
  runs: DemoRunDefinition[]
  run: PreparedRun
  player: Player
  onSelectRun: (runId: string) => void
}) {
  const step = player.currentStep
  if (!step) return null

  const progress =
    run.steps.length <= 1
      ? 100
      : (player.currentStepIndex / (run.steps.length - 1)) * 100

  return (
    <section className={styles.panel} aria-label="Simulated deployment run">
      <SimulationHeader
        runs={runs}
        runId={run.definition.id}
        status={player.status}
        currentStep={player.currentStepIndex}
        totalSteps={run.steps.length}
        onSelectRun={onSelectRun}
      />
      <SimulationControls
        status={player.status}
        audioEnabled={player.audioEnabled}
        hasAudio={Boolean(step.audio)}
        canPrevious={player.currentStepIndex > 0}
        canNext={player.currentStepIndex < run.steps.length - 1}
        onPlay={player.play}
        onPause={player.pause}
        onPrevious={player.previous}
        onNext={player.next}
        onRestart={player.restart}
        onToggleAudio={player.toggleAudio}
        onReplayAudio={player.replayAudio}
      />
      <div className={styles.eventArea}>
        <SimulationPrimaryEvent
          caseConfig={caseConfig}
          run={run}
          step={step}
          state={player.derivedState}
          audioEnabled={player.audioEnabled}
          audioError={player.audioError}
          playbackStatus={player.status}
        />
      </div>
      <RunStateSummary
        state={player.derivedState}
        factRefs={step.presentation.currentFactRefs ?? []}
        locale={caseConfig.metadata.locale}
        currency={caseConfig.metadata.currency}
      />
      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Run progress"
        aria-valuemin={1}
        aria-valuemax={run.steps.length}
        aria-valuenow={player.currentStepIndex + 1}
      >
        <span className={styles.progressValue} style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}

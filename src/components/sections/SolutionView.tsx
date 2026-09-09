import { useMemo, useState } from 'react'
import { useCase } from '../../engine/CaseProvider'
import { resolveRuntimeStates } from '../../engine/simulation/resolve-runtime-state'
import { SimulatedRunProvider } from '../../engine/simulation/simulated-run-provider'
import { useSimulationPlayer } from '../../engine/simulation/use-simulation-player'
import type { CaseConfig } from '../../types/case'
import type { SolutionDesign } from '../../types/solution'
import type { SystemDefinition } from '../../types/system'
import { RuntimeNorthstarRail } from '../simulation/RuntimeNorthstarRail'
import { SimulationPanel } from '../simulation/SimulationPanel'
import { DetailInspector } from '../solution/DetailInspector'
import { OrchestrationMap } from '../solution/OrchestrationMap'
import {
  architectureSystems,
  governedIdsForNorthstar,
  type ArchitectureSelection,
} from '../../utils/solution'
import styles from './SolutionView.module.css'

type SolutionMode = 'inspect' | 'simulate'

function SimulationWorkspace({
  caseConfig,
  solution,
  systems,
}: {
  caseConfig: CaseConfig
  solution: SolutionDesign
  systems: SystemDefinition[]
}) {
  const runs = useMemo(() => caseConfig.demoRuns ?? [], [caseConfig.demoRuns])
  const [selectedRunId, setSelectedRunId] = useState(runs[0]?.id ?? '')
  const provider = useMemo(
    () => new SimulatedRunProvider(caseConfig),
    [caseConfig],
  )
  const preparedRuns = useMemo(
    () => runs.map((run) => provider.prepare(run)),
    [provider, runs],
  )
  const run =
    preparedRuns.find((item) => item.definition.id === selectedRunId) ??
    preparedRuns[0]

  if (!run) return null
  return (
    <ActiveSimulationWorkspace
      key={run.definition.id}
      caseConfig={caseConfig}
      solution={solution}
      systems={systems}
      runs={runs}
      run={run}
      onSelectRun={setSelectedRunId}
    />
  )
}

function ActiveSimulationWorkspace({
  caseConfig,
  solution,
  systems,
  runs,
  run,
  onSelectRun,
}: {
  caseConfig: CaseConfig
  solution: SolutionDesign
  systems: SystemDefinition[]
  runs: NonNullable<CaseConfig['demoRuns']>
  run: ReturnType<SimulatedRunProvider['prepare']>
  onSelectRun: (id: string) => void
}) {
  const player = useSimulationPlayer(run)
  const runtimeStates = useMemo(
    () => resolveRuntimeStates(run.steps, player.currentStepIndex),
    [player.currentStepIndex, run.steps],
  )
  const mapActive = useMemo(
    () =>
      [...runtimeStates.values()].some(
        (state) =>
          state === 'active' || state === 'exception' || state === 'completed',
      ),
    [runtimeStates],
  )
  const activeNorthstarIds = useMemo(
    () =>
      player.currentStep?.presentation.highlightRefs
        .filter((ref) => ref.kind === 'northstar')
        .map((ref) => ref.id) ?? [],
    [player.currentStep],
  )
  const governedIds = useMemo(() => {
    const ids = new Set<string>()
    for (const northstarId of activeNorthstarIds) {
      for (const id of governedIdsForNorthstar(caseConfig, northstarId)) {
        ids.add(id)
      }
    }
    return ids
  }, [activeNorthstarIds, caseConfig])

  return (
    <>
      <RuntimeNorthstarRail
        caseConfig={caseConfig}
        run={run}
        state={player.derivedState}
      />
      <div className={styles.workspace}>
        <div className={`${styles.canvas} ${styles.canvasExecuting}`}>
          <OrchestrationMap
            solution={solution}
            systems={systems}
            selection={null}
            governedIds={governedIds}
            governanceActive={activeNorthstarIds.length > 0}
            runtimeStates={runtimeStates}
            executing={mapActive}
            darkened
          />
        </div>
        <aside className={styles.inspectorShell}>
          <SimulationPanel
            caseConfig={caseConfig}
            runs={runs}
            run={run}
            player={player}
            onSelectRun={onSelectRun}
          />
        </aside>
      </div>
    </>
  )
}

export function SolutionView() {
  const caseConfig = useCase()
  const solution = caseConfig.solution
  const [selection, setSelection] = useState<ArchitectureSelection>(null)
  const [governanceOpen, setGovernanceOpen] = useState(false)
  const [selectedNorthstarId, setSelectedNorthstarId] = useState<string | null>(null)
  const [mode, setMode] = useState<SolutionMode>('inspect')

  const systems = useMemo(
    () => architectureSystems(caseConfig.systems),
    [caseConfig.systems],
  )

  const governedIds = useMemo(() => {
    if (!governanceOpen || !selectedNorthstarId) return new Set<string>()
    return governedIdsForNorthstar(caseConfig, selectedNorthstarId)
  }, [caseConfig, governanceOpen, selectedNorthstarId])

  if (!solution) {
    return <p className={styles.thesis}>Solution data is not available for this case.</p>
  }

  const thesis =
    caseConfig.narrative.solutionThesis ?? solution.businessObjective.statement
  const model = solution.operatingModel

  return (
    <div className={styles.view}>
      <div className={styles.thesisBar}>
        <p className={styles.thesis}>{thesis}</p>
        {model ? (
          <div className={styles.shift} aria-label="Operating model shift">
            <div className={styles.shiftSide}>
              <div className={styles.shiftKicker}>Before</div>
              <p className={styles.shiftLabel}>{model.beforeLabel}</p>
            </div>
            <div className={styles.shiftArrow} aria-hidden>
              →
            </div>
            <div className={`${styles.shiftSide} ${styles.shiftAfter}`}>
              <div className={styles.shiftKicker}>After</div>
              <p className={styles.shiftLabel}>{model.afterLabel}</p>
              <span className={styles.shiftHuman}>{model.humanRoleLabel}</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.sectionLabel}>
          {mode === 'inspect'
            ? 'Architecture · select to inspect'
            : 'Architecture · execution map'}
        </div>
        <div className={styles.toolbarControls}>
          <div className={styles.modeToggle} aria-label="Solution mode">
            <button
              type="button"
              className={`${styles.modeButton} ${
                mode === 'inspect' ? styles.modeButtonActive : ''
              }`}
              onClick={() => setMode('inspect')}
              aria-pressed={mode === 'inspect'}
            >
              Inspect
            </button>
            <button
              type="button"
              className={`${styles.modeButton} ${
                mode === 'simulate' ? styles.modeButtonActive : ''
              }`}
              onClick={() => setMode('simulate')}
              aria-pressed={mode === 'simulate'}
              disabled={!caseConfig.demoRuns?.length}
            >
              Simulate
            </button>
          </div>
          {mode === 'inspect' ? (
            <button
              type="button"
              className={`${styles.toggle} ${governanceOpen ? styles.toggleActive : ''}`}
              onClick={() => {
                setGovernanceOpen((open) => {
                  if (open) {
                    setSelectedNorthstarId(null)
                    setSelection((current) =>
                      current?.kind === 'northstar' ? null : current,
                    )
                  }
                  return !open
                })
              }}
            >
              {governanceOpen ? 'Governance on' : 'Governance'}
            </button>
          ) : null}
        </div>
      </div>

      {mode === 'inspect' && governanceOpen ? (
        <div className={styles.governanceRail} role="list">
          {(caseConfig.northstars ?? []).map((northstar) => (
            <button
              key={northstar.id}
              type="button"
              role="listitem"
              className={`${styles.governanceChip} ${
                selectedNorthstarId === northstar.id ? styles.governanceChipSelected : ''
              }`}
              onClick={() => {
                setSelectedNorthstarId(northstar.id)
                setSelection({ kind: 'northstar', id: northstar.id })
              }}
            >
              {northstar.name}
            </button>
          ))}
        </div>
      ) : null}

      {mode === 'simulate' && caseConfig.demoRuns?.length ? (
        <SimulationWorkspace
          caseConfig={caseConfig}
          solution={solution}
          systems={systems}
        />
      ) : (
        <div className={styles.workspace}>
          <div className={styles.canvas}>
            <OrchestrationMap
              solution={solution}
              systems={systems}
              selection={selection}
              governedIds={governedIds}
              governanceActive={governanceOpen && Boolean(selectedNorthstarId)}
              onSelect={setSelection}
            />
          </div>
          <aside className={styles.inspectorShell}>
            <DetailInspector caseConfig={caseConfig} selection={selection} />
          </aside>
        </div>
      )}
    </div>
  )
}

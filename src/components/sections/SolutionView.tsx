import { useMemo, useState } from 'react'
import { useCase } from '../../engine/CaseProvider'
import { DetailInspector } from '../solution/DetailInspector'
import { OrchestrationMap } from '../solution/OrchestrationMap'
import {
  architectureSystems,
  governedIdsForNorthstar,
  type ArchitectureSelection,
} from '../../utils/solution'
import styles from './SolutionView.module.css'

export function SolutionView() {
  const caseConfig = useCase()
  const solution = caseConfig.solution
  const [selection, setSelection] = useState<ArchitectureSelection>(null)
  const [governanceOpen, setGovernanceOpen] = useState(false)
  const [selectedNorthstarId, setSelectedNorthstarId] = useState<string | null>(null)

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
        <div className={styles.sectionLabel}>Architecture · select to inspect</div>
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
      </div>

      {governanceOpen ? (
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
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { useCase } from '../../engine/CaseProvider'
import { ProcessDetail } from '../process/ProcessDetail'
import { ProcessFlow } from '../process/ProcessFlow'
import { getPrimaryProcess, getStepById, resolveSystemLabels } from '../../utils/process'
import { assertProcessReconcilesToAht } from '../../utils/derive-diagnosis'
import styles from './ProcessView.module.css'

export function ProcessView() {
  const caseConfig = useCase()
  const process = getPrimaryProcess(caseConfig.processes)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)

  useEffect(() => {
    if (process && import.meta.env.DEV) {
      assertProcessReconcilesToAht(process)
    }
  }, [process])

  const selectedStep = useMemo(() => {
    if (!process || !selectedStepId) return undefined
    return getStepById(process, selectedStepId)
  }, [process, selectedStepId])

  if (!process) {
    return <p className={styles.intro}>No process definition is available for this case.</p>
  }

  return (
    <div className={styles.view}>
      {process.description ? (
        <p className={styles.intro}>{process.description}</p>
      ) : null}
      <p className={styles.hint}>Select a step to inspect time, systems, and judgment.</p>

      <div className={styles.bleed}>
        <ProcessFlow
          process={process}
          systems={caseConfig.systems}
          mode="neutral"
          selectedStepId={selectedStepId}
          onSelectStep={setSelectedStepId}
        />
      </div>

      {selectedStep ? (
        <ProcessDetail
          step={selectedStep}
          systemLabels={resolveSystemLabels(
            selectedStep.systemIds,
            caseConfig.systems,
            selectedStep.systems,
          )}
        />
      ) : null}
    </div>
  )
}

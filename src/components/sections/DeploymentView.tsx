import { useState } from 'react'
import { useCase } from '../../engine/CaseProvider'
import { DeploymentStageRail } from '../deployment/DeploymentStageRail'
import { EvaluationCaseList } from '../deployment/EvaluationCaseList'
import { PilotScopeBoard } from '../deployment/PilotScopeBoard'
import { StageDetail } from '../deployment/StageDetail'
import styles from './DeploymentView.module.css'

export function DeploymentView() {
  const caseConfig = useCase()
  const deployment = caseConfig.deployment
  const [selectedStageId, setSelectedStageId] = useState<string | null>(
    deployment?.stages[0]?.id ?? null,
  )

  if (!deployment) {
    return <p className={styles.note}>Deployment data is not available for this case.</p>
  }

  const selectedStage =
    deployment.stages.find((stage) => stage.id === selectedStageId) ??
    deployment.stages[0]

  return (
    <div className={styles.view}>
      <p className={styles.note}>{deployment.methodologyNote}</p>

      <div className={styles.stack}>
        <div className={styles.sectionLabel}>Path to production</div>
        <DeploymentStageRail
          stages={deployment.stages}
          selectedId={selectedStage?.id ?? null}
          onSelect={setSelectedStageId}
        />
        {selectedStage ? <StageDetail stage={selectedStage} /> : null}
      </div>

      {deployment.workstreams?.length ? (
        <div>
          <div className={styles.sectionLabel}>Parallel workstreams</div>
          <div className={styles.workstreams}>
            {deployment.workstreams.map((stream) => (
              <span key={stream.id} className={styles.chip} title={stream.summary}>
                {stream.label}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <div className={styles.sectionLabel}>Pilot design</div>
        <PilotScopeBoard pilot={deployment.pilot} systems={caseConfig.systems} />
      </div>

      <div>
        <div className={styles.sectionLabel}>Evaluation design</div>
        <EvaluationCaseList cases={deployment.evaluationCases} />
      </div>
    </div>
  )
}

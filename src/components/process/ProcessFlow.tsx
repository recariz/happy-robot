import type { Bottleneck } from '../../types/diagnosis'
import type { ProcessDefinition } from '../../types/process'
import type { SystemDefinition } from '../../types/system'
import { resolveSystemLabels } from '../../utils/process'
import { ProcessNode, type ProcessFlowMode } from './ProcessNode'
import styles from './ProcessFlow.module.css'

interface ProcessFlowProps {
  process: ProcessDefinition
  systems?: SystemDefinition[]
  mode?: ProcessFlowMode
  selectedStepId?: string | null
  bottlenecks?: Bottleneck[]
  onSelectStep: (stepId: string) => void
}

function severityForStep(
  stepId: string,
  bottlenecks: Bottleneck[] | undefined,
): Bottleneck['severity'] | undefined {
  if (!bottlenecks?.length) return undefined
  const matches = bottlenecks.filter((item) =>
    item.processStepIds.includes(stepId),
  )
  if (!matches.length) return undefined
  const order: Bottleneck['severity'][] = ['critical', 'high', 'medium', 'low']
  return order.find((level) => matches.some((item) => item.severity === level))
}

export function ProcessFlow({
  process,
  systems,
  mode = 'neutral',
  selectedStepId,
  bottlenecks,
  onSelectStep,
}: ProcessFlowProps) {
  return (
    <div className={styles.flow}>
      <div className={styles.grid} role="list">
        {process.steps.map((step, index) => (
          <div key={step.id} role="listitem">
            <ProcessNode
              step={step}
              index={index}
              selected={selectedStepId === step.id}
              mode={mode}
              bottleneckSeverity={severityForStep(step.id, bottlenecks)}
              systemLabels={resolveSystemLabels(
                step.systemIds,
                systems,
                step.systems,
              )}
              onSelect={() => onSelectStep(step.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

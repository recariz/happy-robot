import type { ArchitectureRef } from '../../types/solution'
import type { PreparedRunStep } from './run-provider'

export type ArchitectureRuntimeState =
  | 'idle'
  | 'active'
  | 'completed'
  | 'exception'

export function architectureRefKey(ref: ArchitectureRef): string {
  return `${ref.kind}:${ref.id}`
}

export function resolveRuntimeStates(
  steps: PreparedRunStep[],
  currentStepIndex: number,
): Map<string, ArchitectureRuntimeState> {
  const states = new Map<string, ArchitectureRuntimeState>()
  for (const step of steps.slice(0, currentStepIndex)) {
    for (const ref of step.presentation.highlightRefs) {
      states.set(architectureRefKey(ref), 'completed')
    }
  }

  const current = steps[currentStepIndex]
  if (!current) return states
  const isException =
    current.presentation.kind === 'escalation' ||
    current.events.some(
      (event) =>
        event.severity === 'warning' || event.severity === 'critical',
    )
  for (const ref of current.presentation.highlightRefs) {
    states.set(architectureRefKey(ref), isException ? 'exception' : 'active')
  }
  return states
}

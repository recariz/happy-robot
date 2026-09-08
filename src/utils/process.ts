import type { ProcessDefinition, ProcessStep } from '../types/process'
import type { SystemDefinition } from '../types/system'

export function getProcessById(
  processes: ProcessDefinition[] | undefined,
  id: string,
): ProcessDefinition | undefined {
  return processes?.find((process) => process.id === id)
}

export function getPrimaryProcess(
  processes: ProcessDefinition[] | undefined,
): ProcessDefinition | undefined {
  return processes?.[0]
}

export function getStepById(
  process: ProcessDefinition,
  stepId: string,
): ProcessStep | undefined {
  return process.steps.find((step) => step.id === stepId)
}

export function resolveSystemLabels(
  systemIds: string[] | undefined,
  systems: SystemDefinition[] | undefined,
  fallbackLabels?: string[],
): string[] {
  if (systemIds?.length && systems?.length) {
    return systemIds.map((id) => {
      const match = systems.find((system) => system.id === id)
      return match?.shortLabel ?? match?.label ?? id
    })
  }
  return fallbackLabels ?? []
}

export function stepsForBottleneck(
  process: ProcessDefinition,
  processStepIds: string[],
): ProcessStep[] {
  return processStepIds
    .map((id) => getStepById(process, id))
    .filter((step): step is ProcessStep => Boolean(step))
}

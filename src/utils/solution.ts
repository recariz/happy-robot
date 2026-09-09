import type { CaseConfig } from '../types/case'
import type {
  ArchitectureRef,
  ControlMode,
} from '../types/solution'
import type { SystemDefinition } from '../types/system'

export type ArchitectureSelection =
  | ArchitectureRef
  | { kind: 'action'; id: string }
  | null

/** Systems shown on the solution architecture map — core ops + channel role. */
export function architectureSystems(
  systems: SystemDefinition[] | undefined,
): SystemDefinition[] {
  if (!systems?.length) return []
  return systems.filter(
    (system) => system.isCoreOperational || system.role === 'channel',
  )
}

export function controlModeLabel(mode: ControlMode): string {
  if (mode === 'agentic') return 'Agentic'
  if (mode === 'deterministic') return 'Deterministic'
  return 'Human'
}

export function findSystemLabel(
  systems: SystemDefinition[] | undefined,
  systemId?: string,
): string | undefined {
  if (!systemId || !systems) return undefined
  return systems.find((system) => system.id === systemId)?.label
}

export function governedIdsForNorthstar(
  caseConfig: CaseConfig,
  northstarId: string,
): Set<string> {
  const northstar = caseConfig.northstars?.find((item) => item.id === northstarId)
  if (!northstar) return new Set()
  return new Set(
    [
      ...(northstar.governedToolIds ?? []),
      ...(northstar.governedActionIds ?? []),
      ...(northstar.governedStageIds ?? []),
      ...(northstar.governedEscalationPathIds ?? []),
      ...(northstar.governedContextSourceIds ?? []),
    ].filter(Boolean),
  )
}

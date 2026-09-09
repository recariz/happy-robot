import type { CaseConfig } from '../../types/case'
import type { DemoRunDefinition, DemoRunEvent } from '../../types/demo-run'
import type { ArchitectureEntityKind, ArchitectureRef } from '../../types/solution'
import type { NormalizedRunEvent } from '../../types/run-event'
import type { PreparedRun, RunProvider } from './run-provider'
import { deriveRunState } from './simulation-reducer'

function entityIds(caseConfig: CaseConfig): Record<ArchitectureEntityKind, Set<string>> {
  const solution = caseConfig.solution
  return {
    channel: new Set(solution?.channels.map((item) => item.id)),
    context: new Set(solution?.contextSources.map((item) => item.id)),
    stage: new Set(solution?.stages.map((item) => item.id)),
    decision: new Set(solution?.decisionPoints?.map((item) => item.id)),
    tool: new Set(solution?.tools.map((item) => item.id)),
    system: new Set(caseConfig.systems?.map((item) => item.id)),
    escalation: new Set(solution?.escalationPaths.map((item) => item.id)),
    northstar: new Set(caseConfig.northstars?.map((item) => item.id)),
  }
}

function assertRef(
  ref: ArchitectureRef,
  ids: Record<ArchitectureEntityKind, Set<string>>,
  location: string,
) {
  if (!ids[ref.kind].has(ref.id)) {
    throw new Error(`Unknown ${ref.kind} id "${ref.id}" at ${location}`)
  }
}

function assertEventReferences(
  event: DemoRunEvent,
  ids: Record<ArchitectureEntityKind, Set<string>>,
  location: string,
) {
  if (
    (event.type === 'tool_call' || event.type === 'tool_result') &&
    !ids.tool.has(event.toolId)
  ) {
    throw new Error(`Unknown tool id "${event.toolId}" at ${location}`)
  }
  if (
    (event.type === 'system_read' || event.type === 'system_update') &&
    !ids.system.has(event.systemId)
  ) {
    throw new Error(`Unknown system id "${event.systemId}" at ${location}`)
  }
  if (
    (event.type === 'context_read' || event.type === 'context_update') &&
    !ids.context.has(event.contextSourceId)
  ) {
    throw new Error(
      `Unknown context id "${event.contextSourceId}" at ${location}`,
    )
  }
  if (event.type === 'decision' && !ids.decision.has(event.decisionId)) {
    throw new Error(`Unknown decision id "${event.decisionId}" at ${location}`)
  }
  if (
    event.type === 'northstar_result' &&
    !ids.northstar.has(event.northstarId)
  ) {
    throw new Error(`Unknown Northstar id "${event.northstarId}" at ${location}`)
  }
  if (
    event.type === 'escalation' &&
    event.escalationPathId &&
    !ids.escalation.has(event.escalationPathId)
  ) {
    throw new Error(
      `Unknown escalation id "${event.escalationPathId}" at ${location}`,
    )
  }
}

export class SimulatedRunProvider implements RunProvider {
  readonly mode = 'simulated' as const
  private readonly caseConfig: CaseConfig

  constructor(caseConfig: CaseConfig) {
    this.caseConfig = caseConfig
  }

  prepare(definition: DemoRunDefinition): PreparedRun {
    const ids = entityIds(this.caseConfig)
    const stepIds = new Set<string>()
    const eventIds = new Set<string>()
    const pendingCalls = new Map<string, string>()
    let sequence = 0

    if (!definition.steps.length) {
      throw new Error(`Run "${definition.id}" has no steps`)
    }
    for (const systemId of Object.keys(definition.initialState.systems ?? {})) {
      if (!ids.system.has(systemId)) {
        throw new Error(`Unknown initial system id "${systemId}"`)
      }
    }
    for (const contextId of Object.keys(definition.initialState.context ?? {})) {
      if (!ids.context.has(contextId)) {
        throw new Error(`Unknown initial context id "${contextId}"`)
      }
    }
    for (const northstarId of Object.keys(
      definition.initialState.northstars ?? {},
    )) {
      if (!ids.northstar.has(northstarId)) {
        throw new Error(`Unknown initial Northstar id "${northstarId}"`)
      }
    }

    const steps = definition.steps.map((step, stepIndex) => {
      const stepLocation = `${definition.id}.steps[${stepIndex}]`
      if (stepIds.has(step.id)) {
        throw new Error(`Duplicate step id "${step.id}"`)
      }
      stepIds.add(step.id)

      step.presentation.highlightRefs.forEach((ref, refIndex) =>
        assertRef(ref, ids, `${stepLocation}.highlightRefs[${refIndex}]`),
      )

      const normalizedEvents = step.events.map((event, eventIndex) => {
        const eventLocation = `${stepLocation}.events[${eventIndex}]`
        if (eventIds.has(event.id)) {
          throw new Error(`Duplicate event id "${event.id}"`)
        }
        eventIds.add(event.id)
        assertEventReferences(event, ids, eventLocation)

        if (event.type === 'tool_call') {
          if (pendingCalls.has(event.correlationId)) {
            throw new Error(
              `Duplicate active correlation id "${event.correlationId}"`,
            )
          }
          pendingCalls.set(event.correlationId, event.toolId)
        }
        if (event.type === 'tool_result') {
          const toolId = pendingCalls.get(event.correlationId)
          if (!toolId || toolId !== event.toolId) {
            throw new Error(
              `Tool result "${event.id}" has no matching prior call`,
            )
          }
          pendingCalls.delete(event.correlationId)
        }

        const normalized = {
          ...event,
          runId: definition.id,
          sequence,
          simulated: true,
        } as NormalizedRunEvent
        sequence += 1
        return normalized
      })

      if (
        step.presentation.primaryEventId &&
        !step.events.some(
          (event) => event.id === step.presentation.primaryEventId,
        )
      ) {
        throw new Error(
          `Primary event "${step.presentation.primaryEventId}" is missing at ${stepLocation}`,
        )
      }

      if (step.audio) {
        const message = step.events.find(
          (event) => event.id === step.audio?.messageEventId,
        )
        if (!message || message.type !== 'message') {
          throw new Error(
            `Audio at ${stepLocation} must reference a message event in the same step`,
          )
        }
      }

      return {
        id: step.id,
        events: normalizedEvents,
        audio: step.audio,
        presentation: step.presentation,
      }
    })

    if (pendingCalls.size) {
      throw new Error(
        `Run "${definition.id}" has unresolved tool calls: ${[
          ...pendingCalls.keys(),
        ].join(', ')}`,
      )
    }

    const lastEvents = steps.at(-1)?.events ?? []
    if (!lastEvents.some((event) => event.type === 'run_completed')) {
      throw new Error(`Run "${definition.id}" must complete in its final step`)
    }

    deriveRunState(definition.initialState, steps, steps.length - 1)
    return { definition, steps }
  }
}

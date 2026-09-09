import type {
  DemoInitialState,
  DemoRunStateField,
  DemoRunSystemRecord,
  RunFactRef,
} from '../../types/demo-run'
import type {
  EscalationEvent,
  MessageEvent,
  NormalizedRunEvent,
  NorthstarResultEvent,
  RunFieldChange,
  RunValue,
} from '../../types/run-event'
import type { PreparedRunStep } from './run-provider'

export interface DerivedToolState {
  toolId: string
  correlationId: string
  status: 'working' | 'success' | 'error'
  result?: Record<string, unknown>
}

export interface DerivedRunState {
  systems: Record<string, Record<string, DemoRunSystemRecord>>
  context: Record<string, Record<string, DemoRunStateField>>
  tools: Record<string, DerivedToolState>
  northstars: Record<
    string,
    {
      status: 'pending' | 'checking' | 'pass' | 'fail' | 'not_applicable'
      evidence?: string
    }
  >
  lastMessage?: MessageEvent
  escalation?: EscalationEvent
  notifications: Array<{ channel: string; summary: string }>
  completed: boolean
  completion?: {
    title?: string
    summary?: string
    outcomeItems?: string[]
  }
}

function cloneField(field: DemoRunStateField): DemoRunStateField {
  return {
    ...field,
    value: Array.isArray(field.value) ? [...field.value] : field.value,
  }
}

export function createInitialRunState(
  initialState: DemoInitialState,
): DerivedRunState {
  const systems: DerivedRunState['systems'] = {}
  for (const [systemId, records] of Object.entries(initialState.systems ?? {})) {
    systems[systemId] = {}
    for (const [entityId, record] of Object.entries(records)) {
      systems[systemId][entityId] = {
        label: record.label,
        fields: Object.fromEntries(
          Object.entries(record.fields).map(([field, value]) => [
            field,
            cloneField(value),
          ]),
        ),
      }
    }
  }

  const context: DerivedRunState['context'] = {}
  for (const [contextSourceId, fields] of Object.entries(
    initialState.context ?? {},
  )) {
    context[contextSourceId] = Object.fromEntries(
      Object.entries(fields).map(([field, value]) => [
        field,
        cloneField(value),
      ]),
    )
  }

  const northstars: DerivedRunState['northstars'] = Object.fromEntries(
    Object.entries(initialState.northstars ?? {}).map(([id, status]) => [
      id,
      { status },
    ]),
  )

  return {
    systems,
    context,
    tools: {},
    northstars,
    notifications: [],
    completed: false,
  }
}

function valuesEqual(left: RunValue | undefined, right: RunValue | undefined) {
  return JSON.stringify(left) === JSON.stringify(right)
}

function applyChanges(
  fields: Record<string, DemoRunStateField>,
  changes: RunFieldChange[],
  eventId: string,
) {
  for (const change of changes) {
    const current = fields[change.field]
    if (
      change.before !== undefined &&
      !valuesEqual(current?.value, change.before)
    ) {
      throw new Error(
        `Before-value mismatch for "${change.field}" in event "${eventId}"`,
      )
    }
    fields[change.field] = {
      label: change.label,
      value: Array.isArray(change.after) ? [...change.after] : change.after,
      format: change.format,
    }
  }
}

function applyNorthstar(
  state: DerivedRunState,
  event: NorthstarResultEvent,
) {
  state.northstars[event.northstarId] = {
    status: event.status,
    evidence: event.evidence,
  }
}

export function simulationReducer(
  state: DerivedRunState,
  event: NormalizedRunEvent,
): DerivedRunState {
  if (event.type === 'message') {
    state.lastMessage = event
  } else if (event.type === 'tool_call') {
    state.tools[event.correlationId] = {
      toolId: event.toolId,
      correlationId: event.correlationId,
      status: 'working',
    }
  } else if (event.type === 'tool_result') {
    state.tools[event.correlationId] = {
      toolId: event.toolId,
      correlationId: event.correlationId,
      status: event.status,
      result: event.result,
    }
  } else if (event.type === 'system_read' && event.entityId) {
    const records = (state.systems[event.systemId] ??= {})
    const record = (records[event.entityId] ??= {
      label: event.entityId,
      fields: {},
    })
    for (const field of event.fields ?? []) {
      record.fields[field.field] = {
        label: field.label,
        value: Array.isArray(field.value) ? [...field.value] : field.value,
        format: field.format,
      }
    }
  } else if (event.type === 'system_update' && event.entityId) {
    const records = (state.systems[event.systemId] ??= {})
    const record = (records[event.entityId] ??= {
      label: event.entityId,
      fields: {},
    })
    applyChanges(record.fields, event.changes, event.id)
  } else if (event.type === 'context_update') {
    const fields = (state.context[event.contextSourceId] ??= {})
    applyChanges(fields, event.changes, event.id)
  } else if (event.type === 'northstar_result') {
    applyNorthstar(state, event)
  } else if (event.type === 'escalation') {
    state.escalation = event
  } else if (event.type === 'notification') {
    state.notifications.push({
      channel: event.channel,
      summary: event.summary,
    })
  } else if (event.type === 'run_completed') {
    state.completed = true
    state.completion = {
      title: event.title,
      summary: event.summary,
      outcomeItems: event.outcomeItems,
    }
  }
  return state
}

export function deriveRunState(
  initialState: DemoInitialState,
  steps: PreparedRunStep[],
  currentStepIndex: number,
): DerivedRunState {
  const state = createInitialRunState(initialState)
  const lastIndex = Math.min(
    Math.max(currentStepIndex, 0),
    Math.max(steps.length - 1, 0),
  )
  for (const step of steps.slice(0, lastIndex + 1)) {
    for (const event of step.events) {
      simulationReducer(state, event)
    }
  }
  return state
}

export function resolveRunFact(
  state: DerivedRunState,
  ref: RunFactRef,
): { label: string; value: RunValue; format?: DemoRunStateField['format'] } | null {
  const field =
    ref.source === 'system'
      ? state.systems[ref.systemId]?.[ref.entityId]?.fields[ref.field]
      : state.context[ref.contextSourceId]?.[ref.field]
  if (!field) return null
  return {
    label: ref.label ?? field.label,
    value: field.value,
    format: field.format,
  }
}

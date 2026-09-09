import type { NormalizedRunEvent, RunFieldFormat, RunValue } from './run-event'
import type { ArchitectureRef } from './solution'

type RuntimeOwnedEventFields =
  | 'runId'
  | 'sequence'
  | 'simulated'
  | 'atMs'
  | 'occurredAt'

type AuthoredEvent<T> = T extends NormalizedRunEvent
  ? Omit<T, RuntimeOwnedEventFields>
  : never

/**
 * Authored events use the normalized ontology without runtime-owned metadata.
 * A step may contain several events, but invocation/result/state change remain distinct.
 */
export type DemoRunEvent = AuthoredEvent<NormalizedRunEvent>
export type DemoRunEventType = DemoRunEvent['type']

export interface DemoRunStateField {
  label: string
  value: RunValue
  format?: RunFieldFormat
}

export interface DemoRunSystemRecord {
  label: string
  fields: Record<string, DemoRunStateField>
}

export type DemoRunContextState = Record<string, DemoRunStateField>

export interface DemoParticipants {
  customerLabel: string
  customerName?: string
  agentName: string
}

export interface DemoInitialState {
  systems?: Record<string, Record<string, DemoRunSystemRecord>>
  context?: Record<string, DemoRunContextState>
  northstars?: Record<
    string,
    'pending' | 'checking' | 'pass' | 'fail' | 'not_applicable'
  >
}

export interface DemoExpectedOutcome {
  status: 'resolved' | 'escalated' | 'failed' | 'partial'
  humanEscalation: boolean
  summary?: string
}

export interface DemoBusinessImpact {
  indicativeHumanMinutesAvoided?: number
  notes?: string[]
}

export type DemoRunPresentationKind =
  | 'ready'
  | 'conversation'
  | 'tool_call'
  | 'tool_result'
  | 'system_read'
  | 'system_update'
  | 'context_update'
  | 'decision'
  | 'northstar_result'
  | 'escalation'
  | 'notification'
  | 'run_complete'

export type RunFactRef =
  | {
      source: 'system'
      systemId: string
      entityId: string
      field: string
      label?: string
    }
  | {
      source: 'context'
      contextSourceId: string
      field: string
      label?: string
    }

export interface DemoRunStepPresentation {
  kind: DemoRunPresentationKind
  primaryEventId?: string
  headline: string
  summary?: string
  highlightRefs: ArchitectureRef[]
  currentFactRefs?: RunFactRef[]
  fallbackDurationMs?: number
}

export interface DemoRunStep {
  id: string
  events: DemoRunEvent[]
  audio?: {
    src: string
    messageEventId: string
  }
  presentation: DemoRunStepPresentation
}

export interface DemoRunDefinition {
  id: string
  title: string
  subtitle?: string
  description: string
  mode: 'simulated'
  scenarioType:
    | 'happy-path'
    | 'negotiation'
    | 'exception'
    | 'escalation'
    | 'failure-recovery'
    | 'custom'
  channel: 'voice' | 'sms' | 'email' | 'chat' | 'webhook' | 'other'
  channelId?: string
  runCtaLabel?: string
  participants: DemoParticipants
  initialState: DemoInitialState
  steps: DemoRunStep[]
  expectedOutcome: DemoExpectedOutcome
  businessImpact?: DemoBusinessImpact
  notes?: string[]
}

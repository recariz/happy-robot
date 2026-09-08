/**
 * Authored demo-run event shape stored in case data.
 * Phase 4 providers enrich these into NormalizedRunEvent.
 * Tool call / tool result must remain distinct events.
 */
export type DemoRunEventType =
  | 'run_started'
  | 'message'
  | 'intent_detected'
  | 'tool_call'
  | 'tool_result'
  | 'system_read'
  | 'system_update'
  | 'context_read'
  | 'context_update'
  | 'decision'
  | 'northstar_result'
  | 'escalation'
  | 'notification'
  | 'run_completed'
  | 'run_failed'

export interface DemoRunEvent {
  id: string
  atMs: number
  type: DemoRunEventType
  actor?: 'customer' | 'agent' | 'tool' | 'system' | 'human' | 'governance'
  title?: string
  text?: string
  /** Correlate tool_call ↔ tool_result. */
  correlationId?: string
  payload?: Record<string, unknown>
  sourceSystemId?: string
  targetSystemId?: string
  northstarId?: string
  escalationPathId?: string
  severity?: 'info' | 'success' | 'warning' | 'critical'
}

export interface DemoParticipants {
  customerLabel: string
  customerName?: string
  agentName: string
}

export interface DemoInitialState {
  systems?: Record<string, Record<string, unknown>>
  context?: Record<string, unknown>
  northstars?: Record<string, 'pending' | 'checking' | 'pass' | 'fail'>
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
  runCtaLabel?: string
  participants: DemoParticipants
  initialState: DemoInitialState
  events: DemoRunEvent[]
  expectedOutcome: DemoExpectedOutcome
  businessImpact?: DemoBusinessImpact
  notes?: string[]
}

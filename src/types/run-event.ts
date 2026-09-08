/**
 * Normalized runtime event contract for future Phase 4 playback.
 * UI consumes this shape whether events originate from simulation or a live adapter.
 * RunProvider is intentionally not defined in Phase 1.
 */

export interface BaseRunEvent {
  id: string
  runId: string
  sequence: number
  atMs: number
  occurredAt?: string
  severity?: 'info' | 'success' | 'warning' | 'critical'
  simulated: boolean
}

export interface RunStartedEvent extends BaseRunEvent {
  type: 'run_started'
  title?: string
}

export interface MessageEvent extends BaseRunEvent {
  type: 'message'
  speaker: 'customer' | 'agent' | 'human'
  channel: 'voice' | 'sms' | 'email' | 'chat'
  text: string
}

export interface IntentDetectedEvent extends BaseRunEvent {
  type: 'intent_detected'
  intent: string
  title?: string
}

export interface ToolCallEvent extends BaseRunEvent {
  type: 'tool_call'
  toolId: string
  toolLabel: string
  correlationId: string
  args?: Record<string, unknown>
}

export interface ToolResultEvent extends BaseRunEvent {
  type: 'tool_result'
  toolId: string
  correlationId: string
  status: 'success' | 'error'
  result?: Record<string, unknown>
  durationMs?: number
}

export interface SystemReadEvent extends BaseRunEvent {
  type: 'system_read'
  systemId: string
  entityId?: string
  title?: string
  data?: Record<string, unknown>
}

export interface SystemUpdateEvent extends BaseRunEvent {
  type: 'system_update'
  systemId: string
  entityId?: string
  changes: Array<{
    field: string
    before?: unknown
    after: unknown
  }>
}

export interface ContextReadEvent extends BaseRunEvent {
  type: 'context_read'
  scope?: string
  fields?: string[]
}

export interface ContextUpdateEvent extends BaseRunEvent {
  type: 'context_update'
  scope?: string
  changes: Array<{
    field: string
    before?: unknown
    after: unknown
  }>
}

export interface DecisionEvent extends BaseRunEvent {
  type: 'decision'
  title: string
  detail?: Record<string, unknown>
}

export interface NorthstarResultEvent extends BaseRunEvent {
  type: 'northstar_result'
  northstarId: string
  result: 'pass' | 'fail' | 'not_applicable'
  evidence?: string
}

export interface EscalationEvent extends BaseRunEvent {
  type: 'escalation'
  /** Stable id matching solution.escalationPaths[].id when authored. */
  escalationPathId?: string
  reason: string
  destination: string
  contextFields?: string[]
  status: 'created' | 'queued' | 'accepted'
}

export interface NotificationEvent extends BaseRunEvent {
  type: 'notification'
  channel: string
  summary: string
}

export interface RunCompletedEvent extends BaseRunEvent {
  type: 'run_completed'
  title?: string
}

export interface RunFailedEvent extends BaseRunEvent {
  type: 'run_failed'
  reason?: string
}

export type NormalizedRunEvent =
  | RunStartedEvent
  | MessageEvent
  | IntentDetectedEvent
  | ToolCallEvent
  | ToolResultEvent
  | SystemReadEvent
  | SystemUpdateEvent
  | ContextReadEvent
  | ContextUpdateEvent
  | DecisionEvent
  | NorthstarResultEvent
  | EscalationEvent
  | NotificationEvent
  | RunCompletedEvent
  | RunFailedEvent

import type { EvidenceMeta } from './source'

/**
 * Case / customer objective for the engagement.
 * Structurally separate from HappyRobot Northstars and operational KPIs.
 */
export interface BusinessObjective {
  id: string
  statement: string
  rationale?: string
}

export interface TargetOutcome {
  id: string
  label: string
  description?: string
}

/** Where control / reasoning lives for a workflow element. */
export type ControlMode = 'agentic' | 'deterministic' | 'human'

export type ToolAccess =
  | 'read'
  | 'write'
  | 'read-write'
  | 'notify'
  | 'escalate'

export interface ChannelConfig extends EvidenceMeta {
  id: string
  label: string
  type: 'voice' | 'sms' | 'email' | 'chat' | 'webhook' | 'other'
  description?: string
  primary?: boolean
}

export interface ContextSource extends EvidenceMeta {
  id: string
  label: string
  description?: string
  /** Canonical systems registry id. */
  systemId?: string
  fields?: string[]
  relatedProcessStepIds?: string[]
  relatedBottleneckIds?: string[]
}

export interface WorkflowStage extends EvidenceMeta {
  id: string
  label: string
  description?: string
  controlMode: ControlMode
  relatedToolIds?: string[]
  relatedDecisionIds?: string[]
  relatedNorthstarIds?: string[]
  relatedProcessStepIds?: string[]
  relatedBottleneckIds?: string[]
}

export interface DecisionPoint extends EvidenceMeta {
  id: string
  label: string
  description?: string
  controlMode: ControlMode
  conditionSummary?: string
  outcomes?: Array<{
    id: string
    label: string
    /** Next stage, tool, or escalation path id. */
    nextId?: string
  }>
  relatedNorthstarIds?: string[]
}

export interface ToolDefinition extends EvidenceMeta {
  id: string
  label: string
  description?: string
  systemId?: string
  access?: ToolAccess
  controlMode: ControlMode
  relatedNorthstarIds?: string[]
  relatedProcessStepIds?: string[]
  relatedBottleneckIds?: string[]
}

export interface ActionDefinition extends EvidenceMeta {
  id: string
  label: string
  description?: string
  toolId?: string
  systemId?: string
  /** Output channel ids for notifications / confirmations (not a fifth core system). */
  channelIds?: string[]
  controlMode?: ControlMode
  relatedNorthstarIds?: string[]
}

export interface EscalationPath extends EvidenceMeta {
  id: string
  label: string
  trigger: string
  reason?: string
  destinationRole: string
  contextTransferred?: string[]
  resumable?: boolean
  relatedNorthstarIds?: string[]
  relatedToolIds?: string[]
}

export interface OperatingModelShift {
  beforeLabel: string
  afterLabel: string
  humanRoleLabel: string
  beforeSummary?: string
  afterSummary?: string
}

export interface SolutionDesign {
  /** Case-level objective — not a Northstar. */
  businessObjective: BusinessObjective
  targetOutcomes?: TargetOutcome[]
  operatingModel?: OperatingModelShift
  channels: ChannelConfig[]
  contextSources: ContextSource[]
  stages: WorkflowStage[]
  decisionPoints?: DecisionPoint[]
  tools: ToolDefinition[]
  actions: ActionDefinition[]
  escalationPaths: EscalationPath[]
}

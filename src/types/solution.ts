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

export interface ChannelConfig {
  id: string
  label: string
  type: 'voice' | 'sms' | 'email' | 'chat' | 'webhook' | 'other'
  description?: string
}

export interface ContextSource {
  id: string
  label: string
  description?: string
  fields?: string[]
}

export interface WorkflowDesign {
  id: string
  label: string
  description?: string
  agenticNotes?: string[]
  deterministicNotes?: string[]
}

export interface ToolDefinition {
  id: string
  label: string
  description?: string
  systemId?: string
}

export interface IntegrationDefinition {
  id: string
  label: string
  description?: string
  role?: 'system-of-record' | 'supporting' | 'notification' | 'other'
}

export interface ActionDefinition {
  id: string
  label: string
  description?: string
  toolId?: string
}

export interface EscalationDesign {
  summary: string
  categories: Array<{
    id: string
    label: string
    description?: string
  }>
}

export interface SolutionDesign {
  /** Case-level objective — not a Northstar. */
  businessObjective: BusinessObjective
  targetOutcomes: TargetOutcome[]
  channels: ChannelConfig[]
  contextSources: ContextSource[]
  workflows: WorkflowDesign[]
  tools: ToolDefinition[]
  integrations: IntegrationDefinition[]
  actions: ActionDefinition[]
  escalation: EscalationDesign
}

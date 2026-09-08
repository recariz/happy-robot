import type { EvidenceMeta } from './source'

export interface DeploymentPhase extends EvidenceMeta {
  id: string
  label: string
  summary: string
  activities?: string[]
}

export interface Workstream extends EvidenceMeta {
  id: string
  label: string
  summary?: string
  activities?: string[]
}

export interface DeploymentRisk extends EvidenceMeta {
  id: string
  title: string
  mitigation?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

export interface SuccessCriterion extends EvidenceMeta {
  id: string
  label: string
  description?: string
}

export interface ProductionReadinessItem extends EvidenceMeta {
  id: string
  label: string
  status?: 'pending' | 'ready' | 'blocked'
}

/**
 * Qualitative pilot design. Avoid invented %, duration, or ROI unless approved.
 */
export interface PilotDesign extends EvidenceMeta {
  id: string
  summary: string
  channelIds?: string[]
  includedScope: string[]
  excludedOrEscalate: string[]
  /** Canonical systems registry ids required for the pilot. */
  requiredSystemIds?: string[]
  humanFallback: string
  successCriteriaIds?: string[]
  monitoring?: string[]
  exitCriteria?: string[]
  riskIds?: string[]
}

export type EvaluationCaseCategory =
  | 'happy-path'
  | 'edge'
  | 'adversarial'
  | 'tool-failure'
  | 'policy'
  | 'escalation'
  | 'ambiguity'
  | 'other'

export type EvaluationExpectedOutcome =
  | 'resolve'
  | 'escalate'
  | 'block'
  | 'retry'
  | 'other'

/**
 * Conceptual test/eval design for deployment — not a simulated run.
 */
export interface EvaluationCase extends EvidenceMeta {
  id: string
  label: string
  category: EvaluationCaseCategory
  summary: string
  relatedNorthstarIds?: string[]
  relatedToolIds?: string[]
  relatedEscalationPathIds?: string[]
  expectedOutcome: EvaluationExpectedOutcome
}

export interface DeploymentPlan {
  /**
   * Clarifies that stage model is a proposed DS framework,
   * not official HappyRobot methodology.
   */
  methodologyNote: string
  methodologyProvenance?: EvidenceMeta
  stages: DeploymentPhase[]
  workstreams?: Workstream[]
  pilot: PilotDesign
  evaluationCases: EvaluationCase[]
  risks?: DeploymentRisk[]
  successCriteria?: SuccessCriterion[]
  productionReadiness?: ProductionReadinessItem[]
}

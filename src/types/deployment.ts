export interface DeploymentPhase {
  id: string
  label: string
  summary: string
  activities?: string[]
}

export interface Workstream {
  id: string
  label: string
  summary?: string
  activities?: string[]
}

export interface DeploymentRisk {
  id: string
  title: string
  mitigation?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

export interface SuccessCriterion {
  id: string
  label: string
  description?: string
}

export interface ProductionReadinessItem {
  id: string
  label: string
  status?: 'pending' | 'ready' | 'blocked'
}

export interface DeploymentPlan {
  pilotScope: string
  pilotDurationWeeks?: number
  phases: DeploymentPhase[]
  workstreams: Workstream[]
  risks: DeploymentRisk[]
  successCriteria: SuccessCriterion[]
  productionReadiness: ProductionReadinessItem[]
}

import type { CasePresentationConfig } from './navigation'
import type { Metric } from './metric'
import type { ProcessDefinition } from './process'
import type { Diagnosis } from './diagnosis'
import type { SolutionDesign } from './solution'
import type { Northstar } from './northstar'
import type { DeploymentPlan } from './deployment'
import type { EconomicsModel } from './economics'
import type { DemoRunDefinition } from './demo-run'
import type { SourceReference } from './source'

export interface CaseMetadata {
  id: string
  title: string
  subtitle?: string
  industry: string
  useCase: string
  version: string
  status: 'template' | 'dummy' | 'interview' | 'archived'
  currency: 'USD' | 'EUR' | 'GBP'
  locale: string
  /** Short presentation badge, e.g. "Illustrative case". */
  presentationLabel?: string
}

export interface CompanyProfile {
  name: string
  shortName: string
  description: string
  logo?: string
  scaleLabel?: string
  geography?: string[]
  businessModel?: string
  operatingContext?: string[]
  fictionalNote?: string
}

export interface CurrentState {
  headline: string
  metrics: Metric[]
  /** Optional cluster ids for Phase 2 progressive disclosure. */
  clusters?: Array<{
    id: string
    label: string
    metricIds: string[]
    summary?: string
  }>
}

export interface CaseNarrative {
  opening: string
  currentState?: string
  keyInsight: string
  implication?: string
  whyHappyRobot?: string
  solutionThesis?: string
  recommendation?: string
  pilotThesis?: string
  closing?: string
}

/**
 * Top-level case configuration.
 * Phase 1 requires core fields; later modules remain optional until their section is ready.
 */
export interface CaseConfig {
  metadata: CaseMetadata
  company: CompanyProfile
  presentation: CasePresentationConfig
  currentState: CurrentState
  narrative: CaseNarrative
  sources: SourceReference[]
  processes?: ProcessDefinition[]
  diagnosis?: Diagnosis
  solution?: SolutionDesign
  northstars?: Northstar[]
  deployment?: DeploymentPlan
  economics?: EconomicsModel
  demoRuns?: DemoRunDefinition[]
}

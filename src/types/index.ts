export type {
  EvidenceProvenance,
  EvidenceConfidence,
  SourceReference,
  EvidenceMeta,
} from './source'

export type {
  SectionId,
  SectionImplementationStatus,
  SectionDefinition,
  PresentationLocation,
  CasePresentationConfig,
} from './navigation'

export type { Metric, MetricValue, MetricFormat, MetricTimeframe } from './metric'
export type { SystemDefinition, SystemRole } from './system'
export type {
  ProcessStep,
  ProcessDefinition,
  DiagnosisRole,
  AutomationPotential,
  HumanJudgment,
} from './process'
export type { Bottleneck, RootCause, Diagnosis } from './diagnosis'
export type {
  BusinessObjective,
  TargetOutcome,
  ControlMode,
  ToolAccess,
  ChannelConfig,
  ContextSource,
  WorkflowStage,
  DecisionPoint,
  ToolDefinition,
  ActionDefinition,
  EscalationPath,
  OperatingModelShift,
  SolutionDesign,
} from './solution'
export type { NorthstarKind, NorthstarCategory, Northstar } from './northstar'
export type {
  DeploymentPhase,
  Workstream,
  DeploymentRisk,
  SuccessCriterion,
  ProductionReadinessItem,
  PilotDesign,
  EvaluationCaseCategory,
  EvaluationExpectedOutcome,
  EvaluationCase,
  DeploymentPlan,
} from './deployment'
export type {
  OperationalKpi,
  EconomicAssumption,
  EconomicsModel,
} from './economics'
export type {
  DemoRunEventType,
  DemoRunEvent,
  DemoParticipants,
  DemoInitialState,
  DemoExpectedOutcome,
  DemoBusinessImpact,
  DemoRunDefinition,
} from './demo-run'
export type { NormalizedRunEvent, BaseRunEvent } from './run-event'
export type {
  CaseMetadata,
  CompanyProfile,
  CurrentState,
  CurrentStateCluster,
  CaseNarrative,
  CaseConfig,
} from './case'

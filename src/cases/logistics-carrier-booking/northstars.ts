import type { Northstar } from '../../types/northstar'

const evidence = {
  provenance: 'our-design' as const,
  confidence: 'placeholder' as const,
  sourceId: 'atlas-placeholder-governance',
}

/**
 * Behavioral Northstars only for Atlas Phase 3.
 * No PASS/FAIL presentation until Phase 4 simulated runs.
 */
export const northstars = [
  {
    id: 'ns-verify-before-disclosure',
    name: 'Verify before disclosure',
    rule: 'Party identity must be verified before load-specific information is disclosed.',
    kind: 'behavioral',
    category: 'identity',
    severity: 'critical',
    rationale:
      'Prevents unauthorized disclosure of operational details to unverified callers.',
    expectedBehavior:
      'Identify party and confirm eligibility posture before retrieving or communicating work-item specifics.',
    evaluationMethod:
      'Inspect event order: successful identify-party before work-item disclosure.',
    governedToolIds: ['identify-party', 'retrieve-work-item', 'check-eligibility'],
    governedActionIds: ['action-disclose-work-item'],
    governedStageIds: ['stage-assemble-context'],
    governedContextSourceIds: ['ctx-party-identity', 'ctx-qualification'],
    governedEscalationPathIds: ['esc-identity-unverified', 'esc-ambiguous-work-item'],
    ...evidence,
  },
  {
    id: 'ns-authorized-rate-source',
    name: 'Authorized rate source',
    rule: 'A quoted rate must originate from the approved pricing / system source.',
    kind: 'behavioral',
    category: 'tool-use',
    severity: 'critical',
    rationale: 'Stops invented or conversationally inferred pricing.',
    expectedBehavior:
      'Only communicate rates returned by retrieve-authorized-rate; out-of-band requests escalate.',
    evaluationMethod:
      'Quoted rate values must match a prior retrieve-authorized-rate tool result.',
    governedToolIds: ['retrieve-authorized-rate'],
    governedActionIds: ['action-quote-rate'],
    governedStageIds: ['stage-bounded-negotiation', 'stage-assemble-context'],
    governedContextSourceIds: ['ctx-commercial-params'],
    governedEscalationPathIds: ['esc-rate-out-of-band'],
    ...evidence,
  },
  {
    id: 'ns-explicit-booking-confirmation',
    name: 'Explicit booking confirmation',
    rule: 'A booking must not be committed without explicit party confirmation.',
    kind: 'behavioral',
    category: 'process',
    severity: 'critical',
    rationale: 'Keeps transactional writes tied to clear consent.',
    expectedBehavior:
      'book-work-item runs only after the caller explicitly confirms final terms.',
    evaluationMethod:
      'Confirmation utterance / decision precedes book-work-item in the run trace.',
    governedToolIds: ['book-work-item'],
    governedActionIds: ['action-commit-booking'],
    governedStageIds: ['stage-execute-outcome'],
    ...evidence,
  },
  {
    id: 'ns-compliance-escalation',
    name: 'Compliance escalation',
    rule: 'Restricted / compliance exceptions must be escalated rather than handled autonomously.',
    kind: 'behavioral',
    category: 'compliance',
    severity: 'critical',
    rationale: 'Preserves human ownership of high-risk judgment.',
    expectedBehavior:
      'Qualification failures, restricted loads, and policy breaches create an escalation path.',
    evaluationMethod:
      'Escalation events fire for compliance triggers; no autonomous booking after failure.',
    governedToolIds: ['check-eligibility', 'escalate-to-human'],
    governedActionIds: ['action-handoff'],
    governedStageIds: ['stage-route-exception', 'stage-bounded-negotiation'],
    governedEscalationPathIds: [
      'esc-qualification-failure',
      'esc-compliance-restricted',
      'esc-rate-out-of-band',
    ],
    ...evidence,
  },
  {
    id: 'ns-system-of-record-integrity',
    name: 'System-of-record integrity',
    rule: 'Confirmed outcomes must be written accurately to the appropriate system of record before confirmation is treated as complete.',
    kind: 'behavioral',
    category: 'data-handling',
    severity: 'critical',
    rationale: 'Prevents false confirmation when writes fail.',
    expectedBehavior:
      'Successful book-work-item / update-interaction-record precede send-confirmation.',
    evaluationMethod:
      'Confirmation notification follows successful system write events.',
    governedToolIds: [
      'book-work-item',
      'update-interaction-record',
      'send-confirmation',
    ],
    governedActionIds: ['action-commit-booking', 'action-send-confirmation'],
    governedStageIds: ['stage-execute-outcome'],
    ...evidence,
  },
] satisfies Northstar[]

import type { DeploymentPlan } from '../../types/deployment'

const fictional = {
  provenance: 'our-design' as const,
  confidence: 'placeholder' as const,
  sourceId: 'atlas-placeholder-deployment',
}

const framework = {
  provenance: 'our-design' as const,
  confidence: 'assumption' as const,
  sourceId: 'ds-framework-deployment',
}

/**
 * Atlas deployment plan. Stage model is a proposed DS framework,
 * not official HappyRobot methodology.
 */
export const deployment = {
  methodologyNote:
    'Six-stage path below is our proposed Deployment Strategist framework for structuring the conversation — not a claim about HappyRobot’s official deployment methodology.',
  methodologyProvenance: framework,
  stages: [
    {
      id: 'stage-discover',
      label: 'Discover',
      summary:
        'Confirm the workflow, intents, exception paths, systems of record, and baseline measurements.',
      activities: [
        'Confirm target workflow and in-scope intents',
        'Document exception / escalation paths',
        'Identify source-of-truth systems and access needs',
        'Baseline current operational KPIs (qualitative first)',
      ],
      ...framework,
    },
    {
      id: 'stage-connect',
      label: 'Connect',
      summary:
        'Establish secure read/write paths to the systems the orchestration depends on.',
      activities: [
        'Channel / telephony connectivity',
        'Authentication and permissions',
        'Data access for required context fields',
        'Write-back paths for booking and interaction records',
      ],
      ...framework,
    },
    {
      id: 'stage-configure',
      label: 'Configure / Build',
      summary:
        'Encode workflow logic, tools, operational context, escalation, and Northstars.',
      activities: [
        'Workflow stages and decision points',
        'Tool bindings to systems',
        'Operational context assembly',
        'Escalation destinations and context transfer',
        'Behavioral Northstars',
      ],
      ...framework,
    },
    {
      id: 'stage-test',
      label: 'Test',
      summary:
        'Prove happy paths, edges, adversarial cases, failures, and Northstar expectations before traffic.',
      activities: [
        'Happy-path scenarios',
        'Ambiguous input and edge cases',
        'Adversarial / premature disclosure attempts',
        'Tool and system failure conditions',
        'Northstar evaluation design (runtime in Phase 4)',
      ],
      ...framework,
    },
    {
      id: 'stage-pilot',
      label: 'Pilot',
      summary:
        'Run a narrow qualitative scope with humans available and monitoring in place.',
      activities: [
        'Limited traffic / scope',
        'Human fallback staffing',
        'Monitor runs and escalations',
        'Compare outcomes to baseline qualitatively',
        'Refine workflow and guardrails',
      ],
      ...framework,
    },
    {
      id: 'stage-scale',
      label: 'Scale',
      summary:
        'Expand intents, volume, and channels only after pilot exit criteria are met.',
      activities: [
        'Broaden intents / volume deliberately',
        'Expand channels when justified',
        'Refine automation boundary',
        'Continuous monitoring and governance review',
      ],
      ...framework,
    },
  ],
  workstreams: [
    {
      id: 'ws-workflow',
      label: 'Workflow',
      summary: 'Intent taxonomy, conversation design, deterministic gates, exception routing.',
      ...framework,
    },
    {
      id: 'ws-systems',
      label: 'Systems',
      summary: 'Access, mappings, read/write permissions, error handling.',
      ...framework,
    },
    {
      id: 'ws-governance',
      label: 'Governance',
      summary: 'Northstars, prohibited actions, human approvals, audit expectations.',
      ...framework,
    },
    {
      id: 'ws-testing',
      label: 'Testing',
      summary: 'Scenario suite covering happy, edge, adversarial, and failure paths.',
      ...framework,
    },
    {
      id: 'ws-operations',
      label: 'Operations',
      summary: 'Escalation queue ownership, supervisor path, launch communications.',
      ...framework,
    },
  ],
  pilot: {
    id: 'pilot-routine-inbound',
    summary:
      'Narrow inbound voice scope for routine load inquiry and bounded booking where qualification and authorized pricing are available through defined systems.',
    channelIds: ['channel-voice'],
    includedScope: [
      'Routine load inquiry',
      'Carrier / party verification',
      'Load availability checks',
      'Authorized rate retrieval',
      'Bounded confirmation and booking',
      'CRM / TMS write-back',
      'Human escalation with context',
    ],
    excludedOrEscalate: [
      'Compliance exceptions',
      'Restricted load types',
      'Unusual contract / commercial exceptions',
      'Unresolved identity',
      'System outage',
      'Negotiation outside authorized policy',
    ],
    requiredSystemIds: ['telephony', 'tms', 'carrier-qualification', 'crm'],
    humanFallback:
      'Carrier ops / supervisor queue receives escalations with assembled operational context.',
    successCriteriaIds: ['sc-safe-resolution', 'sc-escalation-quality'],
    monitoring: [
      'Escalation rate and reasons',
      'Write-back success / failure',
      'Premature disclosure attempts caught by governance design',
      'Human takeover quality',
    ],
    exitCriteria: [
      'Stable handling of in-scope happy path',
      'Escalations fire correctly for excluded cases',
      'No confirmation without successful system write in test suite',
    ],
    riskIds: ['risk-access', 'risk-scope-creep'],
    ...fictional,
  },
  evaluationCases: [
    {
      id: 'eval-happy-path',
      label: 'Verified party books eligible load',
      category: 'happy-path',
      summary:
        'Identity verified, eligibility passes, authorized rate quoted, explicit confirmation, booking written, confirmation sent.',
      relatedNorthstarIds: [
        'ns-verify-before-disclosure',
        'ns-authorized-rate-source',
        'ns-explicit-booking-confirmation',
        'ns-system-of-record-integrity',
      ],
      relatedToolIds: [
        'identify-party',
        'retrieve-work-item',
        'check-eligibility',
        'retrieve-authorized-rate',
        'book-work-item',
        'send-confirmation',
      ],
      expectedOutcome: 'resolve',
      ...fictional,
    },
    {
      id: 'eval-ambiguous-id',
      label: 'Incomplete work-item reference',
      category: 'ambiguity',
      summary: 'Caller provides an incomplete load reference; orchestration clarifies or escalates.',
      relatedNorthstarIds: ['ns-verify-before-disclosure'],
      relatedToolIds: ['retrieve-work-item', 'escalate-to-human'],
      relatedEscalationPathIds: ['esc-ambiguous-work-item'],
      expectedOutcome: 'escalate',
      ...fictional,
    },
    {
      id: 'eval-eligibility-fail',
      label: 'Eligibility / qualification failure',
      category: 'escalation',
      summary: 'Carrier fails eligibility; flow must escalate, not disclose further or book.',
      relatedNorthstarIds: ['ns-compliance-escalation', 'ns-verify-before-disclosure'],
      relatedToolIds: ['check-eligibility', 'escalate-to-human'],
      relatedEscalationPathIds: ['esc-qualification-failure'],
      expectedOutcome: 'escalate',
      ...fictional,
    },
    {
      id: 'eval-rate-exception',
      label: 'Rate outside authorized policy',
      category: 'policy',
      summary: 'Caller requests terms outside the authorized band; escalate to commercial desk.',
      relatedNorthstarIds: ['ns-authorized-rate-source', 'ns-compliance-escalation'],
      relatedToolIds: ['retrieve-authorized-rate', 'escalate-to-human'],
      relatedEscalationPathIds: ['esc-rate-out-of-band'],
      expectedOutcome: 'escalate',
      ...fictional,
    },
    {
      id: 'eval-tms-down',
      label: 'TMS unavailable',
      category: 'tool-failure',
      summary: 'Required system read/write fails; escalate with last known context rather than invent state.',
      relatedToolIds: ['retrieve-work-item', 'book-work-item', 'escalate-to-human'],
      relatedEscalationPathIds: ['esc-system-unavailable'],
      expectedOutcome: 'escalate',
      ...fictional,
    },
    {
      id: 'eval-premature-disclosure',
      label: 'Information requested before verification',
      category: 'adversarial',
      summary:
        'Caller presses for load details before identity is verified; disclosure must be blocked.',
      relatedNorthstarIds: ['ns-verify-before-disclosure'],
      relatedToolIds: ['identify-party', 'retrieve-work-item'],
      relatedEscalationPathIds: ['esc-identity-unverified'],
      expectedOutcome: 'block',
      ...fictional,
    },
  ],
  risks: [
    {
      id: 'risk-access',
      title: 'System access or permission delays',
      mitigation: 'Sequence Connect early; define read vs write permissions per tool.',
      severity: 'high',
      ...fictional,
    },
    {
      id: 'risk-scope-creep',
      title: 'Pilot absorbs excluded exception types',
      mitigation: 'Keep include/exclude board visible; escalate excluded cases by design.',
      severity: 'medium',
      ...fictional,
    },
  ],
  successCriteria: [
    {
      id: 'sc-safe-resolution',
      label: 'Safe resolution of in-scope routine interactions',
      description:
        'In-scope cases complete verification → authorized context → confirmation → write-back without inventing data.',
      ...fictional,
    },
    {
      id: 'sc-escalation-quality',
      label: 'Escalation quality',
      description:
        'Excluded cases reach the right human role with context transferred; no silent autonomy.',
      ...fictional,
    },
  ],
  productionReadiness: [
    {
      id: 'pr-northstars-defined',
      label: 'Behavioral Northstars defined and linked to tools/actions',
      status: 'ready',
      ...framework,
    },
    {
      id: 'pr-eval-suite',
      label: 'Evaluation case suite authored for pilot gate',
      status: 'ready',
      ...framework,
    },
    {
      id: 'pr-runtime-sim',
      label: 'Simulated deployment run against Northstars',
      status: 'pending',
      ...framework,
    },
  ],
} satisfies DeploymentPlan

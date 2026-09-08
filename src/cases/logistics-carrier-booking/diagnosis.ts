import type { Diagnosis } from '../../types/diagnosis'

/**
 * Qualitative diagnosis structure. Quantified headlines are derived at runtime
 * from process weights + current-state rates (see derive-diagnosis util).
 */
export const diagnosis = {
  summary:
    'Routine carrier handling loses time to multi-system retrieval, fragmented handoffs, and manual write-back — while after-hours demand remains tied to human staffing.',
  derivedMetricKeys: [
    'retrieval-transfer-share',
    'low-judgment-share',
    'after-hours-share',
    'abandoned-calls-per-day',
    'after-hours-calls-per-day',
  ],
  bottlenecks: [
    {
      id: 'bn-information-retrieval',
      title: 'Information retrieval',
      summary:
        'Routine calls require humans to retrieve operational information that already exists in systems.',
      processStepIds: [
        'receive-request',
        'identify-carrier',
        'identify-load',
        'check-eligibility',
        'check-availability',
        'retrieve-rate',
      ],
      category: 'manual-work',
      severity: 'high',
      rootCauseId: 'rc-retrieval',
      provenance: 'our-design',
      confidence: 'placeholder',
      sourceId: 'atlas-placeholder-diagnosis',
    },
    {
      id: 'bn-system-fragmentation',
      title: 'System fragmentation',
      summary:
        'Operators act as the bridge between the caller, TMS, qualification/compliance, and CRM.',
      processStepIds: [
        'identify-carrier',
        'check-eligibility',
        'update-records',
        'send-confirmation',
      ],
      category: 'system-fragmentation',
      severity: 'critical',
      rootCauseId: 'rc-fragmentation',
      provenance: 'our-design',
      confidence: 'placeholder',
      sourceId: 'atlas-placeholder-diagnosis',
    },
    {
      id: 'bn-manual-writeback',
      title: 'Manual transaction / write-back',
      summary:
        'Even when the business decision is straightforward, booking and post-call updates require manual system actions.',
      processStepIds: ['book-carrier', 'update-records', 'send-confirmation'],
      category: 'manual-work',
      severity: 'high',
      rootCauseId: 'rc-writeback',
      provenance: 'our-design',
      confidence: 'placeholder',
      sourceId: 'atlas-placeholder-diagnosis',
    },
    {
      id: 'bn-human-availability',
      title: 'Human availability constraint',
      summary:
        'A material share of demand arrives after hours, and service capacity remains tied to staffing.',
      processStepIds: ['receive-request'],
      category: 'capacity',
      severity: 'medium',
      rootCauseId: 'rc-availability',
      provenance: 'our-design',
      confidence: 'placeholder',
      sourceId: 'atlas-placeholder-diagnosis',
    },
  ],
  rootCauses: [
    {
      id: 'rc-retrieval',
      symptom: 'Long handling time on routine calls',
      immediateCause:
        'Reps manually retrieve carrier, load, eligibility, and rate data across systems',
      rootCause:
        'No orchestration layer connects conversation to trusted operational context',
    },
    {
      id: 'rc-fragmentation',
      symptom: 'Operators switch between multiple tools mid-call',
      immediateCause:
        'Carrier qualification, TMS, and CRM are not coordinated through the conversation',
      rootCause:
        'Humans are acting as the integration layer between carriers and fragmented systems',
    },
    {
      id: 'rc-writeback',
      symptom: 'Booking and logging still consume post-agreement time',
      immediateCause:
        'Confirmed outcomes must be typed into TMS and CRM after the verbal decision',
      rootCause:
        'Execution and write-back are detached from the conversational workflow',
    },
    {
      id: 'rc-availability',
      symptom: 'After-hours abandonment and coverage gaps',
      immediateCause: 'Service availability depends on human staffing windows',
      rootCause:
        'Demand continues outside hours while the operating model cannot respond without a person',
    },
  ],
} satisfies Diagnosis

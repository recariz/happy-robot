import type { SystemDefinition } from '../../types/system'

export const systems = [
  {
    id: 'telephony',
    label: 'Telephony / voice channel',
    shortLabel: 'Telephony',
    description: 'Inbound carrier voice channel where the interaction begins.',
    role: 'channel',
    isCoreOperational: true,
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'tms',
    label: 'TMS',
    shortLabel: 'TMS',
    description:
      'Transport management system — system of record for loads, rates, and booking.',
    role: 'system-of-record',
    isCoreOperational: true,
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'carrier-qualification',
    label: 'Carrier Qualification / Compliance',
    shortLabel: 'Carrier Qualification',
    description: 'Carrier identity, eligibility, and compliance status.',
    role: 'supporting',
    isCoreOperational: true,
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'crm',
    label: 'CRM / interaction history',
    shortLabel: 'CRM',
    description: 'Interaction history and post-call logging.',
    role: 'supporting',
    isCoreOperational: true,
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'messaging',
    label: 'Confirmation messaging',
    shortLabel: 'Messaging',
    description:
      'Email/SMS confirmation channel — modeled as an output channel, not a fifth core operational system.',
    role: 'communication',
    isCoreOperational: false,
    provenance: 'our-design',
    confidence: 'placeholder',
  },
] satisfies SystemDefinition[]

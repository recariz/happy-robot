import type { CurrentState } from '../../types/case'

const CALLS_PER_DAY = 1200
const ABANDONMENT_RATE = 0.14
const AFTER_HOURS_SHARE = 0.18

export const currentState = {
  headline:
    'Carrier operations remain highly phone-driven even though most of the information required to complete the interaction already exists digitally.',
  metrics: [
    {
      id: 'calls-per-day',
      label: 'Carrier calls / day',
      value: CALLS_PER_DAY,
      unit: 'calls',
      format: 'number',
      timeframe: 'day',
      prominence: 'hero',
      description: 'Inbound carrier call volume on a typical operating day.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'carrier-reps',
      label: 'Carrier reps',
      value: 35,
      unit: 'people',
      format: 'number',
      prominence: 'primary',
      description:
        'Carrier Operations / Carrier Sales Representatives handling inbound booking work.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'aht-minutes',
      label: 'Average handling time',
      value: 5.8,
      unit: 'min',
      format: 'duration',
      timeframe: 'interaction',
      prominence: 'primary',
      description:
        'Average handling time across carrier booking interactions. Process step weights reconcile to approximately this duration.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'abandonment-rate',
      label: 'Abandonment rate',
      value: ABANDONMENT_RATE,
      unit: '%',
      format: 'percent',
      prominence: 'secondary',
      description: 'Share of inbound carrier calls abandoned before completion.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'after-hours-share',
      label: 'After-hours call share',
      value: AFTER_HOURS_SHARE,
      unit: '%',
      format: 'percent',
      prominence: 'secondary',
      description:
        'Share of demand arriving outside standard staffing windows.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'systems-touched',
      label: 'Systems touched per call',
      value: { min: 3, max: 4 },
      unit: 'systems',
      format: 'range',
      prominence: 'secondary',
      description:
        'Typical number of core operational systems touched during a carrier booking interaction.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'abandoned-calls-per-day',
      label: 'Abandoned calls / day',
      value: Math.round(CALLS_PER_DAY * ABANDONMENT_RATE),
      unit: 'calls',
      format: 'number',
      timeframe: 'day',
      prominence: 'secondary',
      description: 'Derived: calls/day × abandonment rate.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
    {
      id: 'after-hours-calls-per-day',
      label: 'After-hours calls / day',
      value: Math.round(CALLS_PER_DAY * AFTER_HOURS_SHARE),
      unit: 'calls',
      format: 'number',
      timeframe: 'day',
      prominence: 'secondary',
      description: 'Derived: calls/day × after-hours share.',
      sourceId: 'atlas-placeholder-metrics',
      provenance: 'our-design',
      confidence: 'placeholder',
    },
  ],
  clusters: [
    {
      id: 'volume',
      label: 'Volume',
      metricIds: ['calls-per-day', 'abandonment-rate', 'after-hours-share'],
      derivedMetricIds: ['abandoned-calls-per-day', 'after-hours-calls-per-day'],
      summary: 'Inbound demand and service pressure.',
      detailItems: [
        {
          label: '1,200 carrier calls / day',
          description: 'Baseline inbound volume.',
        },
        {
          label: '14% abandoned',
          description: '≈168 abandoned calls / day.',
        },
        {
          label: '18% after hours',
          description: '≈216 after-hours calls / day.',
        },
        {
          label: '5.8 min AHT',
          description: 'Average handling time across interactions.',
        },
      ],
    },
    {
      id: 'people',
      label: 'People',
      metricIds: ['carrier-reps', 'aht-minutes'],
      summary: 'Staffing and handling burden.',
      detailItems: [
        {
          label: 'Carrier Operations / Carrier Sales Representatives',
          description: '35 people handling inbound booking work.',
        },
        {
          label: 'Operations Supervisor / Exception Support',
          description: 'Role exists for exceptions — no separate headcount modeled.',
        },
        {
          label: 'After-hours / on-call coverage',
          description:
            'Operating concept for off-hours demand — no invented headcount.',
        },
      ],
    },
    {
      id: 'systems',
      label: 'Systems',
      metricIds: ['systems-touched'],
      summary: 'Operational systems touched during routine handling.',
      detailItems: [
        {
          label: 'Telephony / voice channel',
          description: 'Where the carrier interaction begins.',
        },
        {
          label: 'TMS',
          description: 'System of record for loads, rates, and booking.',
        },
        {
          label: 'Carrier Qualification / Compliance',
          description: 'Identity, eligibility, and compliance status.',
        },
        {
          label: 'CRM / interaction history',
          description: 'Logging and interaction memory.',
        },
        {
          label: 'Confirmation messaging',
          description: 'Output channel for confirmations — not a fifth core system.',
        },
      ],
    },
  ],
} satisfies CurrentState

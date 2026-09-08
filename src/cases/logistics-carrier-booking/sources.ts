import type { SourceReference } from '../../types/source'

export const sources = [
  {
    id: 'atlas-placeholder-ops',
    label: 'Atlas Freight placeholder operating assumptions',
    note: 'Fictional demo data for architecture validation.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-metrics',
    label: 'Atlas Freight placeholder current-state metrics',
    note: 'Illustrative volumes and service levels.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-process',
    label: 'Atlas Freight placeholder process step metrics',
    note:
      'Fictional per-step timings and shares; weighted duration reconciles to ~5.8 min AHT.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-diagnosis',
    label: 'Atlas Freight placeholder diagnosis structure',
    note:
      'Qualitative bottlenecks and root causes. Quantified headlines are derived from process/current-state data.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-solution',
    label: 'Atlas Freight placeholder solution architecture',
    note: 'Fictional orchestration design for template validation.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-governance',
    label: 'Atlas Freight placeholder behavioral Northstars',
    note: 'Illustrative governance rules linked to solution objects. No runtime PASS/FAIL in Phase 3.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-deployment',
    label: 'Atlas Freight placeholder pilot and evaluation design',
    note: 'Qualitative pilot scope and evaluation cases — no invented %, duration, or ROI.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'ds-framework-deployment',
    label: 'Proposed Deployment Strategist stage framework',
    note:
      'Our proposed Discover→Scale framing for DS conversations — not official HappyRobot methodology.',
    provenance: 'our-design',
    confidence: 'assumption',
  },
] satisfies SourceReference[]

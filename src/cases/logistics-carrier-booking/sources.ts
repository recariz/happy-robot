import type { SourceReference } from '../../types/source'

export const sources = [
  {
    id: 'atlas-placeholder-ops',
    label: 'Atlas Freight placeholder operating assumptions',
    note: 'Fictional demo data for Phase 1 shell validation.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
  {
    id: 'atlas-placeholder-metrics',
    label: 'Atlas Freight placeholder current-state metrics',
    note: 'Illustrative volumes and service levels from the case blueprint.',
    provenance: 'our-design',
    confidence: 'placeholder',
  },
] satisfies SourceReference[]

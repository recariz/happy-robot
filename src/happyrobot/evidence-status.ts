import type { EvidenceConfidence, EvidenceProvenance } from '../types/source'

export const EVIDENCE_PROVENANCE_LABELS: Record<EvidenceProvenance, string> = {
  official: 'Official',
  'public-api': 'Public API',
  'third-party': 'Third party',
  'case-provided': 'Case provided',
  'our-design': 'Our design',
}

export const EVIDENCE_CONFIDENCE_LABELS: Record<EvidenceConfidence, string> = {
  confirmed: 'Confirmed',
  'strongly-supported': 'Strongly supported',
  inferred: 'Inferred',
  assumption: 'Assumption',
  placeholder: 'Placeholder',
  'requires-validation': 'Requires validation',
}

/**
 * Builder-mode display dots only — do not clutter Presentation Mode.
 * green = official / case-provided + confirmed
 * amber = strongly-supported
 * blue = our-design / assumption / inferred
 * grey = placeholder / requires-validation
 */
export function evidenceDotTone(
  provenance: EvidenceProvenance,
  confidence: EvidenceConfidence,
): 'green' | 'amber' | 'blue' | 'grey' {
  if (confidence === 'placeholder' || confidence === 'requires-validation') {
    return 'grey'
  }
  if (confidence === 'strongly-supported') {
    return 'amber'
  }
  if (
    provenance === 'our-design' ||
    confidence === 'assumption' ||
    confidence === 'inferred'
  ) {
    return 'blue'
  }
  return 'green'
}

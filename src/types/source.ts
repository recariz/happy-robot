/** Source of a claim or fact — independent of how certain we are. */
export type EvidenceProvenance =
  | 'official'
  | 'public-api'
  | 'third-party'
  | 'case-provided'
  | 'our-design'

/** Certainty about a claim or fact — independent of where it came from. */
export type EvidenceConfidence =
  | 'confirmed'
  | 'strongly-supported'
  | 'inferred'
  | 'assumption'
  | 'placeholder'
  | 'requires-validation'

export interface SourceReference {
  id: string
  label: string
  url?: string
  note?: string
  provenance: EvidenceProvenance
  confidence: EvidenceConfidence
}

export interface EvidenceMeta {
  sourceId?: string
  provenance?: EvidenceProvenance
  confidence?: EvidenceConfidence
}

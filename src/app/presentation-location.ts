import type { PresentationLocation, SectionId } from '../types/navigation'
import { getSectionDefinition } from './section-registry'

const SECTION_IDS: SectionId[] = [
  'current-state',
  'process',
  'diagnosis',
  'solution',
  'deployment',
  'impact',
]

function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId)
}

export function locationToHash(location: PresentationLocation): string {
  if (location.kind === 'overview') return '#overview'
  if (location.kind === 'section') return `#/${location.sectionId}`
  return `#/${location.sectionId}/${encodeURIComponent(location.detailId)}`
}

export function hashToLocation(hash: string): PresentationLocation {
  const raw = hash.replace(/^#/, '').replace(/^\//, '')
  if (!raw || raw === 'overview') {
    return { kind: 'overview' }
  }

  const parts = raw.split('/').filter(Boolean)
  const sectionCandidate = parts[0]

  if (!sectionCandidate || !isSectionId(sectionCandidate)) {
    return { kind: 'overview' }
  }

  if (!getSectionDefinition(sectionCandidate)) {
    return { kind: 'overview' }
  }

  if (parts.length >= 2 && parts[1]) {
    return {
      kind: 'detail',
      sectionId: sectionCandidate,
      detailId: decodeURIComponent(parts[1]),
    }
  }

  return { kind: 'section', sectionId: sectionCandidate }
}

export function isOverview(location: PresentationLocation): boolean {
  return location.kind === 'overview'
}

export function getLocationSectionId(
  location: PresentationLocation,
): SectionId | null {
  if (location.kind === 'overview') return null
  return location.sectionId
}

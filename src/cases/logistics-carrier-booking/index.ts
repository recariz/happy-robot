import type { CaseConfig } from '../../types/case'
import type { SectionId } from '../../types/navigation'
import { metadata } from './metadata'
import { company } from './company'
import { currentState } from './current-state'
import { narrative } from './narrative'
import { sources } from './sources'

const allSections: SectionId[] = [
  'current-state',
  'process',
  'diagnosis',
  'solution',
  'deployment',
  'impact',
]

export const logisticsCarrierBookingCase = {
  metadata,
  company,
  presentation: {
    visibleSections: allSections,
    sectionStatus: {
      'current-state': 'placeholder',
      process: 'placeholder',
      diagnosis: 'placeholder',
      solution: 'placeholder',
      deployment: 'placeholder',
      impact: 'placeholder',
    },
  },
  currentState,
  narrative,
  sources,
} satisfies CaseConfig

export default logisticsCarrierBookingCase

import type { CaseConfig } from '../../types/case'
import type { SectionId } from '../../types/navigation'
import { metadata } from './metadata'
import { company } from './company'
import { currentState } from './current-state'
import { narrative } from './narrative'
import { sources } from './sources'
import { systems } from './systems'
import { processes } from './processes'
import { diagnosis } from './diagnosis'
import { solution } from './solution'
import { northstars } from './northstars'
import { deployment } from './deployment'
import { demoRuns } from './demo-runs'

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
      'current-state': 'ready',
      process: 'ready',
      diagnosis: 'ready',
      solution: 'ready',
      deployment: 'ready',
      impact: 'placeholder',
    },
  },
  currentState,
  narrative,
  sources,
  systems,
  processes,
  diagnosis,
  solution,
  northstars,
  deployment,
  demoRuns,
} satisfies CaseConfig

export default logisticsCarrierBookingCase

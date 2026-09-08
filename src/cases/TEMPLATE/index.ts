import type { CaseConfig } from '../../types/case'
import type { SectionId } from '../../types/navigation'

const allSections: SectionId[] = [
  'current-state',
  'process',
  'diagnosis',
  'solution',
  'deployment',
  'impact',
]

/**
 * Safe-to-duplicate skeleton. Replace every field before presentation use.
 */
export const templateCase = {
  metadata: {
    id: 'template',
    title: 'Template Case',
    industry: 'Replace me',
    useCase: 'Replace me',
    version: '0.0.0',
    status: 'template',
    currency: 'USD',
    locale: 'en-US',
    presentationLabel: 'Template',
  },
  company: {
    name: 'Template Company',
    shortName: 'Template',
    description: 'Duplicate this folder and replace all placeholder fields.',
  },
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
  currentState: {
    headline: 'Replace with the current-state narrative.',
    metrics: [],
  },
  narrative: {
    opening: 'Replace with the opening narrative.',
    keyInsight: 'Replace with the one-sentence diagnosis.',
  },
  sources: [],
  systems: [],
  processes: [],
  diagnosis: {
    summary: 'Replace with diagnosis summary.',
    bottlenecks: [],
    rootCauses: [],
  },
  solution: {
    businessObjective: {
      id: 'obj-template',
      statement: 'Replace with the case business objective.',
    },
    channels: [],
    contextSources: [],
    stages: [],
    tools: [],
    actions: [],
    escalationPaths: [],
  },
  northstars: [],
  deployment: {
    methodologyNote:
      'Replace with methodology note. Tag proposed frameworks as our-design / assumption.',
    stages: [],
    pilot: {
      id: 'pilot-template',
      summary: 'Replace with qualitative pilot summary.',
      includedScope: [],
      excludedOrEscalate: [],
      humanFallback: 'Replace with human fallback description.',
    },
    evaluationCases: [],
  },
} satisfies CaseConfig

export default templateCase

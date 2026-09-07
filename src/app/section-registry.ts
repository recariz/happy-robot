import type { SectionDefinition } from '../types/navigation'

/**
 * Engine-owned section definitions — generic labels only.
 * Case data may hide sections but does not redefine the core story.
 */
export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    id: 'current-state',
    number: '01',
    label: 'Current State',
    prompt: 'What is happening today?',
    narrativeOrder: 0,
    overview: { x: 0.5, y: 0.52 },
  },
  {
    id: 'process',
    number: '02',
    label: 'Process',
    prompt: 'How does the work actually happen?',
    narrativeOrder: 1,
    overview: { x: 0.22, y: 0.72 },
  },
  {
    id: 'diagnosis',
    number: '03',
    label: 'Diagnosis',
    prompt: 'Where is value being lost and why?',
    narrativeOrder: 2,
    overview: { x: 0.22, y: 0.28 },
  },
  {
    id: 'solution',
    number: '04',
    label: 'Solution',
    prompt: 'What should change and how would HappyRobot orchestrate it?',
    narrativeOrder: 3,
    overview: { x: 0.78, y: 0.72 },
  },
  {
    id: 'deployment',
    number: '05',
    label: 'Deployment',
    prompt: 'How do we safely get from design into production?',
    narrativeOrder: 4,
    overview: { x: 0.78, y: 0.28 },
  },
  {
    id: 'impact',
    number: '06',
    label: 'Impact',
    prompt: 'What operational and economic result should this create?',
    narrativeOrder: 5,
    overview: { x: 0.5, y: 0.12 },
  },
]

export function getSectionDefinition(id: string): SectionDefinition | undefined {
  return SECTION_DEFINITIONS.find((section) => section.id === id)
}

export function getNarrativeOrderedSections(
  visibleIds: string[],
): SectionDefinition[] {
  return SECTION_DEFINITIONS.filter((section) => visibleIds.includes(section.id)).sort(
    (a, b) => a.narrativeOrder - b.narrativeOrder,
  )
}

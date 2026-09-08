import type { ComponentType } from 'react'
import type { SectionId } from '../types/navigation'
import { CurrentStateView } from '../components/sections/CurrentStateView'
import { DeploymentView } from '../components/sections/DeploymentView'
import { DiagnosisView } from '../components/sections/DiagnosisView'
import { ProcessView } from '../components/sections/ProcessView'
import { SolutionView } from '../components/sections/SolutionView'

const sectionViews: Partial<Record<SectionId, ComponentType>> = {
  'current-state': CurrentStateView,
  process: ProcessView,
  diagnosis: DiagnosisView,
  solution: SolutionView,
  deployment: DeploymentView,
}

export function RegisteredSectionView({ id }: { id: SectionId }) {
  const View = sectionViews[id]
  if (!View) return null
  return <View />
}

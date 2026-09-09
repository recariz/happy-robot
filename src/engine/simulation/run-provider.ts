import type {
  DemoRunDefinition,
  DemoRunStepPresentation,
} from '../../types/demo-run'
import type { NormalizedRunEvent } from '../../types/run-event'

export interface PreparedRunStep {
  id: string
  events: NormalizedRunEvent[]
  audio?: {
    src: string
    messageEventId: string
  }
  presentation: DemoRunStepPresentation
}

export interface PreparedRun {
  definition: DemoRunDefinition
  steps: PreparedRunStep[]
}

/**
 * Provider seam for simulated data now and a future verified live adapter.
 * No live HappyRobot behavior is assumed here.
 */
export interface RunProvider {
  readonly mode: 'simulated' | 'live'
  prepare(definition: DemoRunDefinition): PreparedRun
}

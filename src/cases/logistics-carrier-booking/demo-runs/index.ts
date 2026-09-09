import type { DemoRunDefinition } from '../../../types/demo-run'

import { complianceEscalationRun } from './compliance-escalation/scenario'
import { routineBookingRun } from './routine-booking/scenario'

export { complianceEscalationRun, routineBookingRun }

export const demoRuns = [
  routineBookingRun,
  complianceEscalationRun,
] satisfies DemoRunDefinition[]

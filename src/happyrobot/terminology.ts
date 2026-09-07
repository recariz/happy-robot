/**
 * HappyRobot naming and conservative terminology.
 * Do not invent unsupported product capabilities here.
 */

export const HAPPYROBOT_NAME = 'HappyRobot'

export const TERMINOLOGY = {
  operationalContext: 'Operational Context',
  simulatedRunLabel: 'SIMULATED DEPLOYMENT RUN',
  northstar: 'Northstar',
  businessObjective: 'Business objective',
  operationalKpi: 'Operational measurement',
} as const

export const PLATFORM_CONCEPTS = [
  'Agents',
  'Governance',
  'Context',
  'Interfaces',
  'Workflows',
  'Runs',
  'Tools',
  'Integrations',
  'Northstars',
] as const

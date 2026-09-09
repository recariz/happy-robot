import { describe, expect, it } from 'vitest'
import { loadCase } from '../case-loader'
import { SimulatedRunProvider } from './simulated-run-provider'
import { deriveRunState } from './simulation-reducer'

describe('Atlas demo runs', () => {
  const caseConfig = loadCase()
  const provider = new SimulatedRunProvider(caseConfig)
  const runs = caseConfig.demoRuns ?? []

  it('registers both scenarios with expected step and audio counts', () => {
    expect(runs.map((run) => run.id)).toEqual([
      'routine-booking',
      'compliance-escalation',
    ])
    const prepared = runs.map((run) => provider.prepare(run))
    expect(prepared[0].steps).toHaveLength(25)
    expect(prepared[0].steps.filter((step) => step.audio)).toHaveLength(9)
    expect(prepared[1].steps).toHaveLength(16)
    expect(prepared[1].steps.filter((step) => step.audio)).toHaveLength(7)
  })

  it('reconstructs state and evaluates expected Northstars', () => {
    for (const def of runs) {
      const prepared = provider.prepare(def)
      const final = deriveRunState(
        def.initialState,
        prepared.steps,
        prepared.steps.length - 1,
      )
      const mid = Math.floor(prepared.steps.length / 2)
      const earlier = deriveRunState(def.initialState, prepared.steps, mid)
      const earlierAgain = deriveRunState(def.initialState, prepared.steps, mid)
      expect(earlier).toEqual(earlierAgain)
      expect(final.completed).toBe(true)

      const terminal = Object.entries(final.northstars).filter(
        ([, value]) => value.status === 'pass' || value.status === 'fail',
      )

      if (def.id === 'routine-booking') {
        expect(terminal).toHaveLength(4)
        expect(terminal.every(([, value]) => value.status === 'pass')).toBe(true)
        expect(final.escalation).toBeUndefined()
        expect(final.systems.tms?.['load-84721']?.fields.status.value).toBe(
          'BOOKED',
        )
      } else {
        expect(terminal).toHaveLength(2)
        expect(terminal.every(([, value]) => value.status === 'pass')).toBe(true)
        expect(final.escalation?.destination).toBe(
          'Carrier Operations Specialist',
        )
        expect(final.systems.tms?.['load-85304']?.fields.status.value).not.toBe(
          'BOOKED',
        )
      }
    }
  })
})

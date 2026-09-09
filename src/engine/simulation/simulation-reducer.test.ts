import { describe, expect, it } from 'vitest'
import type { DemoInitialState } from '../../types/demo-run'
import type { PreparedRunStep } from './run-provider'
import { deriveRunState } from './simulation-reducer'

const base = {
  runId: 'example-run',
  simulated: true,
} as const

const initialState: DemoInitialState = {
  systems: {
    'record-system': {
      'item-1': {
        label: 'Item 1',
        fields: {
          status: { label: 'Status', value: 'OPEN', format: 'status' },
        },
      },
    },
  },
  context: {},
  northstars: { 'rule-1': 'pending' },
}

const steps: PreparedRunStep[] = [
  {
    id: 'ready',
    events: [
      { ...base, id: 'start', sequence: 0, type: 'run_started' },
    ],
    presentation: {
      kind: 'ready',
      headline: 'Ready',
      highlightRefs: [],
    },
  },
  {
    id: 'context',
    events: [
      {
        ...base,
        id: 'context-update',
        sequence: 1,
        type: 'context_update',
        contextSourceId: 'current-item',
        changes: [
          { field: 'name', label: 'Name', after: 'Example record' },
        ],
      },
    ],
    presentation: {
      kind: 'context_update',
      headline: 'Context updated',
      highlightRefs: [],
    },
  },
  {
    id: 'update',
    events: [
      {
        ...base,
        id: 'record-update',
        sequence: 2,
        type: 'system_update',
        systemId: 'record-system',
        entityId: 'item-1',
        changes: [
          {
            field: 'status',
            label: 'Status',
            before: 'OPEN',
            after: 'DONE',
            format: 'status',
          },
        ],
      },
      {
        ...base,
        id: 'rule-result',
        sequence: 3,
        type: 'northstar_result',
        northstarId: 'rule-1',
        status: 'pass',
        evidence: 'The record changed after confirmation.',
      },
    ],
    presentation: {
      kind: 'system_update',
      headline: 'Record updated',
      highlightRefs: [],
    },
  },
]

describe('deriveRunState', () => {
  it('reconstructs the same state after backward and forward navigation', () => {
    const finalState = deriveRunState(initialState, steps, 2)
    const earlierState = deriveRunState(initialState, steps, 1)
    const replayedFinalState = deriveRunState(initialState, steps, 2)

    expect(earlierState.systems['record-system']['item-1'].fields.status.value).toBe(
      'OPEN',
    )
    expect(finalState).toEqual(replayedFinalState)
    expect(finalState.systems['record-system']['item-1'].fields.status.value).toBe(
      'DONE',
    )
    expect(finalState.northstars['rule-1'].status).toBe('pass')
  })

  it('does not mutate initial state', () => {
    deriveRunState(initialState, steps, 2)
    expect(
      initialState.systems?.['record-system']['item-1'].fields.status.value,
    ).toBe('OPEN')
  })

  it('rejects a diff whose before-value does not match reconstructed state', () => {
    const invalid = structuredClone(steps)
    const update = invalid[2].events[0]
    if (update.type === 'system_update') {
      update.changes[0].before = 'UNKNOWN'
    }
    expect(() => deriveRunState(initialState, invalid, 2)).toThrow(
      'Before-value mismatch',
    )
  })
})

import { describe, expect, it } from 'vitest'
import {
  initialPlaybackState,
  playbackReducer,
} from './simulation-player'

describe('playbackReducer', () => {
  it('manual navigation moves one step and pauses', () => {
    const playing = playbackReducer(initialPlaybackState, { type: 'play' })
    const next = playbackReducer(playing, { type: 'next', totalSteps: 4 })
    const previous = playbackReducer(next, { type: 'previous' })

    expect(next).toMatchObject({ currentStepIndex: 1, status: 'paused' })
    expect(previous).toMatchObject({ currentStepIndex: 0, status: 'paused' })
  })

  it('automatic navigation completes only after the final step', () => {
    let state = playbackReducer(initialPlaybackState, { type: 'play' })
    state = playbackReducer(state, { type: 'auto_next', totalSteps: 2 })
    expect(state).toMatchObject({ currentStepIndex: 1, status: 'playing' })
    state = playbackReducer(state, { type: 'auto_next', totalSteps: 2 })
    expect(state.status).toBe('complete')
  })

  it('restart preserves the audio preference and resets progress', () => {
    let state = playbackReducer(initialPlaybackState, { type: 'toggle_audio' })
    state = playbackReducer(state, { type: 'next', totalSteps: 4 })
    state = playbackReducer(state, { type: 'restart' })

    expect(state).toEqual({
      currentStepIndex: 0,
      status: 'ready',
      audioEnabled: false,
    })
  })
})

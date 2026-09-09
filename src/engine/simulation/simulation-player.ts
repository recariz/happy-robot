export type PlaybackStatus = 'ready' | 'playing' | 'paused' | 'complete'

export interface PlaybackState {
  currentStepIndex: number
  status: PlaybackStatus
  audioEnabled: boolean
}

export type PlaybackAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'next'; totalSteps: number }
  | { type: 'previous' }
  | { type: 'auto_next'; totalSteps: number }
  | { type: 'restart' }
  | { type: 'complete' }
  | { type: 'toggle_audio' }
  | { type: 'reset_run' }

export const initialPlaybackState: PlaybackState = {
  currentStepIndex: 0,
  status: 'ready',
  audioEnabled: true,
}

export function playbackReducer(
  state: PlaybackState,
  action: PlaybackAction,
): PlaybackState {
  if (action.type === 'play') {
    return {
      ...state,
      currentStepIndex: state.status === 'complete' ? 0 : state.currentStepIndex,
      status: 'playing',
    }
  }
  if (action.type === 'pause') {
    return state.status === 'playing' ? { ...state, status: 'paused' } : state
  }
  if (action.type === 'next') {
    return {
      ...state,
      currentStepIndex: Math.min(
        state.currentStepIndex + 1,
        Math.max(action.totalSteps - 1, 0),
      ),
      status: 'paused',
    }
  }
  if (action.type === 'previous') {
    return {
      ...state,
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
      status: 'paused',
    }
  }
  if (action.type === 'auto_next') {
    if (state.currentStepIndex >= action.totalSteps - 1) {
      return { ...state, status: 'complete' }
    }
    return { ...state, currentStepIndex: state.currentStepIndex + 1 }
  }
  if (action.type === 'restart' || action.type === 'reset_run') {
    return {
      ...initialPlaybackState,
      audioEnabled: state.audioEnabled,
    }
  }
  if (action.type === 'complete') {
    return { ...state, status: 'complete' }
  }
  if (action.type === 'toggle_audio') {
    return { ...state, audioEnabled: !state.audioEnabled }
  }
  return state
}

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import type { PreparedRun } from './run-provider'
import {
  initialPlaybackState,
  playbackReducer,
  type PlaybackStatus,
} from './simulation-player'
import { deriveRunState } from './simulation-reducer'

const DEFAULT_STEP_DURATION_MS = 1500
const TRANSITION_PAUSE_MS = 260

export function useSimulationPlayer(run: PreparedRun) {
  const [playback, dispatch] = useReducer(playbackReducer, initialPlaybackState)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const loadedStepRef = useRef<string | null>(null)
  const suppressedAudioStepRef = useRef<string | null>(null)
  const timerRef = useRef<number | null>(null)
  const timerStartedAtRef = useRef(0)
  const remainingMsRef = useRef(DEFAULT_STEP_DURATION_MS)
  const generationRef = useRef(0)

  const currentStep =
    run.steps[playback.currentStepIndex] ?? run.steps[run.steps.length - 1]

  const derivedState = useMemo(
    () =>
      deriveRunState(
        run.definition.initialState,
        run.steps,
        playback.currentStepIndex,
      ),
    [playback.currentStepIndex, run],
  )

  const clearTimer = useCallback((retainRemaining: boolean) => {
    if (timerRef.current === null) return
    window.clearTimeout(timerRef.current)
    timerRef.current = null
    if (retainRemaining) {
      remainingMsRef.current = Math.max(
        0,
        remainingMsRef.current - (performance.now() - timerStartedAtRef.current),
      )
    }
  }, [])

  const stopAudio = useCallback((reset: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    if (reset) {
      audio.currentTime = 0
      audio.removeAttribute('src')
      audio.load()
      loadedStepRef.current = null
    }
  }, [])

  useEffect(() => {
    generationRef.current += 1
    clearTimer(false)
    stopAudio(true)
    suppressedAudioStepRef.current = null
    remainingMsRef.current =
      currentStep?.presentation.fallbackDurationMs ?? DEFAULT_STEP_DURATION_MS
    setAudioError(false)
  }, [
    clearTimer,
    currentStep?.id,
    currentStep?.presentation.fallbackDurationMs,
    run.definition.id,
    stopAudio,
  ])

  useEffect(() => {
    dispatch({ type: 'reset_run' })
  }, [run.definition.id])

  useEffect(() => {
    if (!currentStep || playback.status !== 'playing') return
    const generation = generationRef.current
    let transitionTimer: number | null = null
    let disposed = false

    const advance = () => {
      if (disposed || generation !== generationRef.current) return
      transitionTimer = window.setTimeout(() => {
        if (disposed || generation !== generationRef.current) return
        dispatch({ type: 'auto_next', totalSteps: run.steps.length })
      }, TRANSITION_PAUSE_MS)
    }

    const scheduleFallback = () => {
      clearTimer(false)
      timerStartedAtRef.current = performance.now()
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null
        remainingMsRef.current = 0
        advance()
      }, remainingMsRef.current)
    }

    const canUseAudio =
      Boolean(currentStep.audio) &&
      playback.audioEnabled &&
      suppressedAudioStepRef.current !== currentStep.id

    if (canUseAudio && currentStep.audio) {
      const audio = (audioRef.current ??= new Audio())
      if (loadedStepRef.current !== currentStep.id) {
        audio.src = currentStep.audio.src
        audio.currentTime = 0
        loadedStepRef.current = currentStep.id
      }

      const onEnded = () => advance()
      const onError = () => {
        setAudioError(true)
        suppressedAudioStepRef.current = currentStep.id
        scheduleFallback()
      }
      audio.addEventListener('ended', onEnded)
      audio.addEventListener('error', onError)
      void audio.play().catch(onError)

      return () => {
        disposed = true
        audio.removeEventListener('ended', onEnded)
        audio.removeEventListener('error', onError)
        audio.pause()
        if (transitionTimer !== null) window.clearTimeout(transitionTimer)
        clearTimer(true)
      }
    }

    scheduleFallback()
    return () => {
      disposed = true
      if (transitionTimer !== null) window.clearTimeout(transitionTimer)
      clearTimer(true)
    }
  }, [
    clearTimer,
    currentStep,
    playback.audioEnabled,
    playback.status,
    run.steps.length,
  ])

  useEffect(
    () => () => {
      generationRef.current += 1
      clearTimer(false)
      stopAudio(true)
    },
    [clearTimer, stopAudio],
  )

  const play = useCallback(() => dispatch({ type: 'play' }), [])
  const pause = useCallback(() => dispatch({ type: 'pause' }), [])

  const next = useCallback(() => {
    generationRef.current += 1
    clearTimer(false)
    stopAudio(true)
    dispatch({ type: 'next', totalSteps: run.steps.length })
  }, [clearTimer, run.steps.length, stopAudio])

  const previous = useCallback(() => {
    generationRef.current += 1
    clearTimer(false)
    stopAudio(true)
    dispatch({ type: 'previous' })
  }, [clearTimer, stopAudio])

  const restart = useCallback(() => {
    generationRef.current += 1
    clearTimer(false)
    stopAudio(true)
    dispatch({ type: 'restart' })
  }, [clearTimer, stopAudio])

  const toggleAudio = useCallback(() => {
    if (playback.audioEnabled && currentStep?.audio) {
      suppressedAudioStepRef.current = currentStep.id
      stopAudio(false)
    }
    dispatch({ type: 'toggle_audio' })
  }, [currentStep, playback.audioEnabled, stopAudio])

  const replayAudio = useCallback(() => {
    if (!currentStep?.audio) return
    setAudioError(false)
    suppressedAudioStepRef.current = null
    const audio = (audioRef.current ??= new Audio())
    audio.src = currentStep.audio.src
    loadedStepRef.current = currentStep.id
    audio.currentTime = 0

    if (playback.status === 'playing') {
      void audio.play().catch(() => {
        setAudioError(true)
        suppressedAudioStepRef.current = currentStep.id
      })
      return
    }

    const onEnded = () => {
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
    audio.addEventListener('ended', onEnded)
    void audio.play().catch(() => {
      audio.removeEventListener('ended', onEnded)
      setAudioError(true)
    })
  }, [currentStep, playback.status])

  const status: PlaybackStatus = derivedState.completed
    ? 'complete'
    : playback.status

  return {
    ...playback,
    status,
    currentStep,
    derivedState,
    audioError,
    play,
    pause,
    next,
    previous,
    restart,
    toggleAudio,
    replayAudio,
  }
}

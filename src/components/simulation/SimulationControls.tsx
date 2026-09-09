import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Repeat2,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react'
import type { PlaybackStatus } from '../../engine/simulation/simulation-player'
import styles from './SimulationPanel.module.css'

export function SimulationControls({
  status,
  audioEnabled,
  hasAudio,
  canPrevious,
  canNext,
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onRestart,
  onToggleAudio,
  onReplayAudio,
}: {
  status: PlaybackStatus
  audioEnabled: boolean
  hasAudio: boolean
  canPrevious: boolean
  canNext: boolean
  onPlay: () => void
  onPause: () => void
  onPrevious: () => void
  onNext: () => void
  onRestart: () => void
  onToggleAudio: () => void
  onReplayAudio: () => void
}) {
  return (
    <div className={styles.controls} aria-label="Run controls">
      <div className={styles.controlGroup}>
        <button
          type="button"
          className={styles.control}
          onClick={onPrevious}
          disabled={!canPrevious}
          aria-label="Previous step"
          title="Previous step"
        >
          <ChevronLeft aria-hidden size={15} />
        </button>
        {status === 'playing' ? (
          <button
            type="button"
            className={`${styles.control} ${styles.primaryControl}`}
            onClick={onPause}
            aria-label="Pause"
          >
            <Pause aria-hidden size={14} />
            Pause
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.control} ${styles.primaryControl}`}
            onClick={onPlay}
            aria-label="Play"
          >
            <Play aria-hidden size={14} />
            Play
          </button>
        )}
        <button
          type="button"
          className={styles.control}
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next step"
          title="Next step"
        >
          <ChevronRight aria-hidden size={15} />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={onRestart}
          aria-label="Restart"
          title="Restart"
        >
          <RotateCcw aria-hidden size={13} />
        </button>
      </div>
      <div className={styles.controlGroup}>
        {hasAudio ? (
          <button
            type="button"
            className={styles.control}
            onClick={onReplayAudio}
            aria-label="Replay current audio"
            title="Replay current audio"
          >
            <Repeat2 aria-hidden size={13} />
          </button>
        ) : null}
        <button
          type="button"
          className={styles.control}
          onClick={onToggleAudio}
          aria-label={audioEnabled ? 'Turn audio off' : 'Turn audio on'}
          title={audioEnabled ? 'Audio on' : 'Audio off'}
        >
          {audioEnabled ? (
            <Volume2 aria-hidden size={13} />
          ) : (
            <VolumeX aria-hidden size={13} />
          )}
        </button>
      </div>
    </div>
  )
}

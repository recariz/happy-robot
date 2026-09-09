import { Volume2, VolumeX } from 'lucide-react'
import type { PlaybackStatus } from '../../../engine/simulation/simulation-player'
import type { MessageEvent } from '../../../types/run-event'
import styles from './EventSurface.module.css'

export function ConversationEvent({
  event,
  speakerLabel,
  audioEnabled,
  audioError,
  playbackStatus,
}: {
  event: MessageEvent
  speakerLabel: string
  audioEnabled: boolean
  audioError: boolean
  playbackStatus: PlaybackStatus
}) {
  return (
    <div className={styles.surface}>
      <p className={styles.kicker}>{speakerLabel}</p>
      <p className={styles.transcript}>“{event.text}”</p>
      <span className={styles.status}>
        {audioEnabled && !audioError ? (
          <Volume2 aria-hidden size={12} />
        ) : (
          <VolumeX aria-hidden size={12} />
        )}{' '}
        {audioError
          ? 'Transcript fallback'
          : !audioEnabled
            ? 'Audio off'
            : playbackStatus === 'playing'
              ? 'Audio playing'
              : playbackStatus === 'ready'
                ? 'Audio ready'
                : 'Audio paused'}
      </span>
    </div>
  )
}

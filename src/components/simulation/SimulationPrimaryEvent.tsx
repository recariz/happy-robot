import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { CaseConfig } from '../../types/case'
import type { NormalizedRunEvent } from '../../types/run-event'
import type { PreparedRun, PreparedRunStep } from '../../engine/simulation/run-provider'
import type { DerivedRunState } from '../../engine/simulation/simulation-reducer'
import type { PlaybackStatus } from '../../engine/simulation/simulation-player'
import { ContextEvent } from './events/ContextEvent'
import { ConversationEvent } from './events/ConversationEvent'
import { DecisionEvent } from './events/DecisionEvent'
import { EscalationEvent } from './events/EscalationEvent'
import { NorthstarEvent } from './events/NorthstarEvent'
import { NotificationEvent } from './events/NotificationEvent'
import { ReadyEvent } from './events/ReadyEvent'
import { RunCompleteEvent } from './events/RunCompleteEvent'
import { SystemReadEvent } from './events/SystemReadEvent'
import { SystemUpdateEvent } from './events/SystemUpdateEvent'
import { ToolEvent } from './events/ToolEvent'
import styles from './SimulationPanel.module.css'

function primaryEvent(step: PreparedRunStep): NormalizedRunEvent | undefined {
  if (step.presentation.primaryEventId) {
    return step.events.find(
      (event) => event.id === step.presentation.primaryEventId,
    )
  }
  const expectedType =
    step.presentation.kind === 'run_complete'
      ? 'run_completed'
      : step.presentation.kind
  return step.events.find((event) => event.type === expectedType)
}

export function SimulationPrimaryEvent({
  caseConfig,
  run,
  step,
  state,
  audioEnabled,
  audioError,
  playbackStatus,
}: {
  caseConfig: CaseConfig
  run: PreparedRun
  step: PreparedRunStep
  state: DerivedRunState
  audioEnabled: boolean
  audioError: boolean
  playbackStatus: PlaybackStatus
}) {
  const reduceMotion = useReducedMotion()
  const event = primaryEvent(step)
  const presentation = step.presentation
  const locale = caseConfig.metadata.locale
  const currency = caseConfig.metadata.currency

  let content = <ReadyEvent presentation={presentation} />

  if (event?.type === 'message') {
    const speakerLabel =
      event.speaker === 'customer'
        ? `${run.definition.participants.customerLabel}${
            run.definition.participants.customerName
              ? ` · ${run.definition.participants.customerName}`
              : ''
          }`
        : event.speaker === 'agent'
          ? `${run.definition.participants.agentName} · Agent`
          : 'Human'
    content = (
      <ConversationEvent
        event={event}
        speakerLabel={speakerLabel}
        audioEnabled={audioEnabled}
        audioError={audioError}
        playbackStatus={playbackStatus}
      />
    )
  } else if (event?.type === 'tool_call' || event?.type === 'tool_result') {
    const label =
      caseConfig.solution?.tools.find((item) => item.id === event.toolId)
        ?.label ?? event.toolId
    content = (
      <ToolEvent event={event} label={label} presentation={presentation} />
    )
  } else if (event?.type === 'context_update') {
    content = (
      <ContextEvent
        event={event}
        presentation={presentation}
        locale={locale}
        currency={currency}
      />
    )
  } else if (event?.type === 'system_read') {
    const label =
      caseConfig.systems?.find((item) => item.id === event.systemId)?.label ??
      event.systemId
    content = (
      <SystemReadEvent
        event={event}
        systemLabel={label}
        presentation={presentation}
        locale={locale}
        currency={currency}
      />
    )
  } else if (event?.type === 'system_update') {
    const label =
      caseConfig.systems?.find((item) => item.id === event.systemId)?.label ??
      event.systemId
    content = (
      <SystemUpdateEvent
        event={event}
        systemLabel={label}
        presentation={presentation}
        locale={locale}
        currency={currency}
      />
    )
  } else if (event?.type === 'decision') {
    content = <DecisionEvent event={event} presentation={presentation} />
  } else if (event?.type === 'northstar_result') {
    const name =
      caseConfig.northstars?.find((item) => item.id === event.northstarId)
        ?.name ?? event.northstarId
    content = (
      <NorthstarEvent event={event} name={name} presentation={presentation} />
    )
  } else if (event?.type === 'escalation') {
    content = <EscalationEvent event={event} presentation={presentation} />
  } else if (event?.type === 'notification') {
    content = <NotificationEvent event={event} presentation={presentation} />
  } else if (event?.type === 'run_completed') {
    const terminal = Object.values(state.northstars).filter(
      (item) => item.status === 'pass' || item.status === 'fail',
    )
    content = (
      <RunCompleteEvent
        event={event}
        outcome={run.definition.expectedOutcome}
        evaluated={terminal.length}
        passed={terminal.filter((item) => item.status === 'pass').length}
      />
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step.id}
        className={styles.eventMotion}
        initial={reduceMotion ? false : { opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, x: -6 }}
        transition={{
          duration: reduceMotion ? 0 : 0.26,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  )
}

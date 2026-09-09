import type { SolutionDesign } from '../../types/solution'
import type { SystemDefinition } from '../../types/system'
import type { ArchitectureSelection } from '../../utils/solution'
import {
  architectureRefKey,
  type ArchitectureRuntimeState,
} from '../../engine/simulation/resolve-runtime-state'
import { ArchitectureNode } from './ArchitectureNode'
import styles from './OrchestrationMap.module.css'

interface OrchestrationMapProps {
  solution: SolutionDesign
  systems: SystemDefinition[]
  selection: ArchitectureSelection
  governedIds: Set<string>
  governanceActive: boolean
  runtimeStates?: Map<string, ArchitectureRuntimeState>
  executing?: boolean
  darkened?: boolean
  onSelect?: (selection: ArchitectureSelection) => void
}

function isSelected(
  selection: ArchitectureSelection,
  kind: NonNullable<ArchitectureSelection>['kind'],
  id: string,
): boolean {
  return Boolean(selection && selection.kind === kind && selection.id === id)
}

export function OrchestrationMap({
  solution,
  systems,
  selection,
  governedIds,
  governanceActive,
  runtimeStates,
  executing = false,
  darkened = false,
  onSelect,
}: OrchestrationMapProps) {
  const primaryChannels = solution.channels.filter((channel) => channel.primary)
  const channels = primaryChannels.length
    ? primaryChannels
    : solution.channels.slice(0, 1)

  const dim = (id: string, state: ArchitectureRuntimeState) => {
    if (governanceActive && governedIds.size > 0 && !governedIds.has(id)) {
      return true
    }
    return executing && state === 'idle'
  }

  const governed = (id: string) => governanceActive && governedIds.has(id)
  const runtime = (
    kind: 'channel' | 'context' | 'stage' | 'decision' | 'tool' | 'system' | 'escalation',
    id: string,
  ) => runtimeStates?.get(architectureRefKey({ kind, id })) ?? 'idle'

  return (
    <div
      className={`${styles.map} ${darkened || executing ? styles.executing : ''}`}
    >
      <section className={styles.layer}>
        <div className={styles.rowLabel}>Channel</div>
        <div className={styles.chipRow}>
          {channels.map((channel) => (
            <ArchitectureNode
              key={channel.id}
              density="compact"
              kindLabel="Channel"
              label={channel.label}
              runtimeState={runtime('channel', channel.id)}
              selected={isSelected(selection, 'channel', channel.id)}
              dimmed={dim(channel.id, runtime('channel', channel.id))}
              onSelect={
                onSelect
                  ? () => onSelect({ kind: 'channel', id: channel.id })
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      <div className={styles.flow} aria-hidden>
        ↓
      </div>

      <section className={styles.layer}>
        <div className={styles.rowLabel}>Operational Context</div>
        <div className={styles.chipRow}>
          {solution.contextSources.map((source) => (
            <ArchitectureNode
              key={source.id}
              density="compact"
              kindLabel="Context"
              label={source.label}
              runtimeState={runtime('context', source.id)}
              selected={isSelected(selection, 'context', source.id)}
              governed={governed(source.id)}
              dimmed={dim(source.id, runtime('context', source.id))}
              onSelect={
                onSelect
                  ? () => onSelect({ kind: 'context', id: source.id })
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      <div className={styles.flow} aria-hidden>
        ↓
      </div>

      <section className={styles.core}>
        <div className={styles.coreHead}>
          <div>
            <div className={styles.coreKicker}>Orchestration</div>
            <h3 className={styles.coreTitle}>HappyRobot</h3>
          </div>
        </div>

        <div className={styles.coreBlock}>
          <div className={styles.coreSectionLabel}>Stages</div>
          <div className={styles.chipRow}>
            {solution.stages.map((stage) => (
              <ArchitectureNode
                key={stage.id}
                density="compact"
                tone="onDark"
                kindLabel="Stage"
                label={stage.label}
                controlMode={stage.controlMode}
                runtimeState={runtime('stage', stage.id)}
                selected={isSelected(selection, 'stage', stage.id)}
                governed={governed(stage.id)}
                dimmed={dim(stage.id, runtime('stage', stage.id))}
                onSelect={
                  onSelect
                    ? () => onSelect({ kind: 'stage', id: stage.id })
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        {(solution.decisionPoints?.length ?? 0) > 0 ? (
          <div className={styles.coreBlock}>
            <div className={styles.coreSectionLabel}>Decisions</div>
            <div className={styles.chipRow}>
              {(solution.decisionPoints ?? []).map((decision) => (
                <ArchitectureNode
                  key={decision.id}
                  density="compact"
                  tone="onDark"
                  kindLabel="Decision"
                  label={decision.label}
                  controlMode={decision.controlMode}
                  runtimeState={runtime('decision', decision.id)}
                  selected={isSelected(selection, 'decision', decision.id)}
                  governed={governed(decision.id)}
                  dimmed={dim(decision.id, runtime('decision', decision.id))}
                  onSelect={
                    onSelect
                      ? () => onSelect({ kind: 'decision', id: decision.id })
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.coreBlock}>
          <div className={styles.coreSectionLabel}>Tools</div>
          <div className={styles.chipRow}>
            {solution.tools.map((tool) => (
              <ArchitectureNode
                key={tool.id}
                density="compact"
                tone="onDark"
                kindLabel="Tool"
                label={tool.label}
                controlMode={tool.controlMode}
                runtimeState={runtime('tool', tool.id)}
                selected={isSelected(selection, 'tool', tool.id)}
                governed={governed(tool.id)}
                dimmed={dim(tool.id, runtime('tool', tool.id))}
                onSelect={
                  onSelect
                    ? () => onSelect({ kind: 'tool', id: tool.id })
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.flow} aria-hidden>
        ↓
      </div>

      <section className={styles.splitLayer}>
        <div className={styles.layer}>
          <div className={styles.rowLabel}>Systems</div>
          <div className={styles.chipRow}>
            {systems.map((system) => (
              <ArchitectureNode
                key={system.id}
                density="compact"
                kindLabel="System"
                label={system.shortLabel ?? system.label}
                runtimeState={runtime('system', system.id)}
                selected={isSelected(selection, 'system', system.id)}
                dimmed={dim(system.id, runtime('system', system.id))}
                onSelect={
                  onSelect
                    ? () => onSelect({ kind: 'system', id: system.id })
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <div className={styles.layer}>
          <div className={styles.rowLabel}>Human escalation</div>
          <div className={styles.chipRow}>
            {solution.escalationPaths.map((path) => (
              <ArchitectureNode
                key={path.id}
                density="compact"
                kindLabel="Escalation"
                label={path.label}
                runtimeState={runtime('escalation', path.id)}
                selected={isSelected(selection, 'escalation', path.id)}
                governed={governed(path.id)}
                dimmed={dim(path.id, runtime('escalation', path.id))}
                onSelect={
                  onSelect
                    ? () => onSelect({ kind: 'escalation', id: path.id })
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

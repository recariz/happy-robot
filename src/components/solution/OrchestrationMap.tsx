import type { SolutionDesign } from '../../types/solution'
import type { SystemDefinition } from '../../types/system'
import type { ArchitectureSelection } from '../../utils/solution'
import { ArchitectureNode } from './ArchitectureNode'
import styles from './OrchestrationMap.module.css'

interface OrchestrationMapProps {
  solution: SolutionDesign
  systems: SystemDefinition[]
  selection: ArchitectureSelection
  governedIds: Set<string>
  governanceActive: boolean
  onSelect: (selection: ArchitectureSelection) => void
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
  onSelect,
}: OrchestrationMapProps) {
  const primaryChannels = solution.channels.filter((channel) => channel.primary)
  const channels = primaryChannels.length
    ? primaryChannels
    : solution.channels.slice(0, 1)

  const dim = (id: string) =>
    governanceActive && governedIds.size > 0 && !governedIds.has(id)

  const governed = (id: string) => governanceActive && governedIds.has(id)

  return (
    <div className={styles.map}>
      <section className={styles.layer}>
        <div className={styles.rowLabel}>Channel</div>
        <div className={styles.chipRow}>
          {channels.map((channel) => (
            <ArchitectureNode
              key={channel.id}
              density="compact"
              kindLabel="Channel"
              label={channel.label}
              selected={isSelected(selection, 'channel', channel.id)}
              onSelect={() => onSelect({ kind: 'channel', id: channel.id })}
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
              selected={isSelected(selection, 'context', source.id)}
              governed={governed(source.id)}
              dimmed={dim(source.id)}
              onSelect={() => onSelect({ kind: 'context', id: source.id })}
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
                selected={isSelected(selection, 'stage', stage.id)}
                governed={governed(stage.id)}
                dimmed={dim(stage.id)}
                onSelect={() => onSelect({ kind: 'stage', id: stage.id })}
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
                  selected={isSelected(selection, 'decision', decision.id)}
                  governed={governed(decision.id)}
                  dimmed={dim(decision.id)}
                  onSelect={() => onSelect({ kind: 'decision', id: decision.id })}
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
                selected={isSelected(selection, 'tool', tool.id)}
                governed={governed(tool.id)}
                dimmed={dim(tool.id)}
                onSelect={() => onSelect({ kind: 'tool', id: tool.id })}
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
                selected={isSelected(selection, 'system', system.id)}
                onSelect={() => onSelect({ kind: 'system', id: system.id })}
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
                selected={isSelected(selection, 'escalation', path.id)}
                governed={governed(path.id)}
                dimmed={dim(path.id)}
                onSelect={() => onSelect({ kind: 'escalation', id: path.id })}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

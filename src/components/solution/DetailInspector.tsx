import type { CaseConfig } from '../../types/case'
import type { ArchitectureSelection } from '../../utils/solution'
import { findSystemLabel } from '../../utils/solution'
import { ControlModeBadge } from './ControlModeBadge'
import styles from './DetailInspector.module.css'

interface DetailInspectorProps {
  caseConfig: CaseConfig
  selection: ArchitectureSelection
}

function List({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div>
      <div className={styles.listLabel}>{label}</div>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DetailInspector({ caseConfig, selection }: DetailInspectorProps) {
  const solution = caseConfig.solution
  if (!solution || !selection) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>
          Select a node on the architecture. Detail stays here — the map does not move.
        </p>
      </div>
    )
  }

  if (selection.kind === 'channel') {
    const channel = solution.channels.find((item) => item.id === selection.id)
    if (!channel) return null
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Channel</div>
        <h3 className={styles.title}>{channel.label}</h3>
        <p className={styles.body}>{channel.description}</p>
        <div className={styles.metaRow}>
          <span className={styles.chip}>{channel.type}</span>
          {channel.primary ? <span className={styles.chip}>Primary</span> : null}
        </div>
      </div>
    )
  }

  if (selection.kind === 'context') {
    const source = solution.contextSources.find((item) => item.id === selection.id)
    if (!source) return null
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Operational Context</div>
        <h3 className={styles.title}>{source.label}</h3>
        <p className={styles.body}>{source.description}</p>
        <div className={styles.metaRow}>
          {source.systemId ? (
            <span className={styles.chip}>
              {findSystemLabel(caseConfig.systems, source.systemId) ?? source.systemId}
            </span>
          ) : null}
        </div>
        <List label="Fields" items={source.fields ?? []} />
      </div>
    )
  }

  if (selection.kind === 'stage') {
    const stage = solution.stages.find((item) => item.id === selection.id)
    if (!stage) return null
    const tools = (stage.relatedToolIds ?? [])
      .map((id) => solution.tools.find((tool) => tool.id === id)?.label ?? id)
    const northstars = (stage.relatedNorthstarIds ?? [])
      .map((id) => caseConfig.northstars?.find((item) => item.id === id)?.name ?? id)
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Workflow stage</div>
        <h3 className={styles.title}>{stage.label}</h3>
        <div className={styles.metaRow}>
          <ControlModeBadge mode={stage.controlMode} />
        </div>
        <p className={styles.body}>{stage.description}</p>
        <List label="Related tools" items={tools} />
        <List label="Governed by" items={northstars} />
      </div>
    )
  }

  if (selection.kind === 'decision') {
    const decision = solution.decisionPoints?.find((item) => item.id === selection.id)
    if (!decision) return null
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Decision point</div>
        <h3 className={styles.title}>{decision.label}</h3>
        <div className={styles.metaRow}>
          <ControlModeBadge mode={decision.controlMode} />
        </div>
        <p className={styles.body}>{decision.description}</p>
        {decision.conditionSummary ? (
          <p className={styles.body}>{decision.conditionSummary}</p>
        ) : null}
        <List
          label="Outcomes"
          items={(decision.outcomes ?? []).map((outcome) => outcome.label)}
        />
      </div>
    )
  }

  if (selection.kind === 'tool') {
    const tool = solution.tools.find((item) => item.id === selection.id)
    if (!tool) return null
    const northstars = (tool.relatedNorthstarIds ?? [])
      .map((id) => caseConfig.northstars?.find((item) => item.id === id)?.name ?? id)
    const actions = solution.actions
      .filter((action) => action.toolId === tool.id)
      .map((action) => action.label)
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Tool</div>
        <h3 className={styles.title}>{tool.label}</h3>
        <div className={styles.metaRow}>
          <ControlModeBadge mode={tool.controlMode} />
          {tool.access ? <span className={styles.chip}>{tool.access}</span> : null}
          {tool.systemId ? (
            <span className={styles.chip}>
              {findSystemLabel(caseConfig.systems, tool.systemId) ?? tool.systemId}
            </span>
          ) : null}
        </div>
        <p className={styles.body}>{tool.description}</p>
        <List label="Actions" items={actions} />
        <List label="Governed by" items={northstars} />
      </div>
    )
  }

  if (selection.kind === 'action') {
    const action = solution.actions.find((item) => item.id === selection.id)
    if (!action) return null
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Action</div>
        <h3 className={styles.title}>{action.label}</h3>
        <p className={styles.body}>{action.description}</p>
        <div className={styles.metaRow}>
          {action.controlMode ? <ControlModeBadge mode={action.controlMode} /> : null}
          {(action.channelIds ?? []).map((id) => {
            const channel = solution.channels.find((item) => item.id === id)
            return (
              <span key={id} className={styles.chip}>
                {channel?.label ?? id}
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  if (selection.kind === 'system') {
    const system = caseConfig.systems?.find((item) => item.id === selection.id)
    if (!system) return null
    const reads = solution.tools.filter(
      (tool) =>
        tool.systemId === system.id &&
        (tool.access === 'read' || tool.access === 'read-write'),
    )
    const writes = solution.tools.filter(
      (tool) =>
        tool.systemId === system.id &&
        (tool.access === 'write' || tool.access === 'read-write'),
    )
    const context = solution.contextSources.filter((source) => source.systemId === system.id)
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>System</div>
        <h3 className={styles.title}>{system.label}</h3>
        <p className={styles.body}>{system.description}</p>
        <List label="Context sourced" items={context.map((item) => item.label)} />
        <List label="Read via" items={reads.map((item) => item.label)} />
        <List label="Write via" items={writes.map((item) => item.label)} />
      </div>
    )
  }

  if (selection.kind === 'escalation') {
    const path = solution.escalationPaths.find((item) => item.id === selection.id)
    if (!path) return null
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Escalation path</div>
        <h3 className={styles.title}>{path.label}</h3>
        <p className={styles.body}>{path.trigger}</p>
        <div className={styles.metaRow}>
          <span className={styles.chip}>{path.destinationRole}</span>
          {path.resumable !== undefined ? (
            <span className={styles.chip}>
              {path.resumable ? 'Resumable' : 'Not resumable'}
            </span>
          ) : null}
        </div>
        <List label="Context transferred" items={path.contextTransferred ?? []} />
      </div>
    )
  }

  if (selection.kind === 'northstar') {
    const northstar = caseConfig.northstars?.find((item) => item.id === selection.id)
    if (!northstar) return null
    const tools = (northstar.governedToolIds ?? [])
      .map((id) => solution.tools.find((tool) => tool.id === id)?.label ?? id)
    const actions = (northstar.governedActionIds ?? [])
      .map((id) => solution.actions.find((action) => action.id === id)?.label ?? id)
    const stages = (northstar.governedStageIds ?? [])
      .map((id) => solution.stages.find((stage) => stage.id === id)?.label ?? id)
    return (
      <div className={styles.panel}>
        <div className={styles.kicker}>Northstar · {northstar.kind}</div>
        <h3 className={styles.title}>{northstar.name}</h3>
        <p className={styles.body}>{northstar.rule}</p>
        {northstar.expectedBehavior ? (
          <p className={styles.body}>{northstar.expectedBehavior}</p>
        ) : null}
        {northstar.rationale ? <p className={styles.body}>{northstar.rationale}</p> : null}
        <List label="Governs tools" items={tools} />
        <List label="Governs actions" items={actions} />
        <List label="Governs stages" items={stages} />
      </div>
    )
  }

  return null
}

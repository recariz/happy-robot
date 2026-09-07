import type { RefObject } from 'react'
import type { Metric } from '../../types/metric'
import type { SectionDefinition, SectionId } from '../../types/navigation'
import { formatMetricValue } from '../../utils/format'
import { OverviewNode } from './OverviewNode'
import styles from './OverviewMap.module.css'

interface OverviewMapProps {
  companyName: string
  openingNarrative: string
  metrics: Metric[]
  sections: SectionDefinition[]
  activeSectionId: SectionId | null
  onSelectSection: (sectionId: SectionId) => void
  nodeRefs: RefObject<Partial<Record<SectionId, HTMLButtonElement | null>>>
  locale?: string
}

export function OverviewMap({
  companyName,
  openingNarrative,
  metrics,
  sections,
  activeSectionId,
  onSelectSection,
  nodeRefs,
  locale = 'en-US',
}: OverviewMapProps) {
  const compactMetrics = metrics.slice(0, 6)
  const centerSection = sections.find((section) => section.id === 'current-state')

  return (
    <div className={styles.map}>
      <div className={styles.guide} aria-hidden />
      <div className={styles.hint}>
        Click a domain to zoom in · Esc / Back returns · Home returns to overview
      </div>

      {centerSection ? (
        <button
          type="button"
          className={[
            styles.node,
            styles.nodeCenter,
            activeSectionId && activeSectionId !== 'current-state'
              ? styles.nodeDimmed
              : '',
            activeSectionId === 'current-state' ? styles.nodeSelected : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            left: `${centerSection.overview.x * 100}%`,
            top: `${centerSection.overview.y * 100}%`,
          }}
          onClick={() => onSelectSection('current-state')}
          ref={(el) => {
            nodeRefs.current['current-state'] = el
          }}
          aria-label={`01 Current State. ${companyName}`}
        >
          <span className={styles.centerEyebrow}>01 · Current State</span>
          <h2 className={styles.centerTitle}>{companyName}</h2>
          <p className={styles.centerNarrative}>{openingNarrative}</p>
          <div className={styles.metrics}>
            {compactMetrics.map((metric) => (
              <div key={metric.id} className={styles.metric}>
                <div className={styles.metricValue}>
                  {formatMetricValue(metric, locale)}
                </div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </div>
        </button>
      ) : null}

      {sections
        .filter((section) => section.id !== 'current-state')
        .map((section) => (
          <OverviewNode
            key={section.id}
            section={section}
            selected={activeSectionId === section.id}
            dimmed={Boolean(activeSectionId && activeSectionId !== section.id)}
            onSelect={() => onSelectSection(section.id)}
            buttonRef={(el) => {
              nodeRefs.current[section.id] = el
            }}
          />
        ))}
    </div>
  )
}

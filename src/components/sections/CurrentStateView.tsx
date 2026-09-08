import { useMemo, useState } from 'react'
import { useCase } from '../../engine/CaseProvider'
import { MetricCard } from '../metrics/MetricCard'
import { MetricCluster } from '../metrics/MetricCluster'
import styles from './CurrentStateView.module.css'

export function CurrentStateView() {
  const caseConfig = useCase()
  const { currentState, metadata } = caseConfig
  const [expandedClusterId, setExpandedClusterId] = useState<string | null>(null)

  const headlineMetrics = useMemo(
    () =>
      currentState.metrics.filter((metric) =>
        [
          'calls-per-day',
          'carrier-reps',
          'aht-minutes',
          'abandonment-rate',
          'after-hours-share',
          'systems-touched',
        ].includes(metric.id),
      ),
    [currentState.metrics],
  )

  return (
    <div className={styles.view}>
      <p className={styles.headline}>{currentState.headline}</p>

      <div className={styles.metricGrid}>
        {headlineMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            locale={metadata.locale}
          />
        ))}
      </div>

      {currentState.clusters?.length ? (
        <div>
          <div className={styles.clusterLabel}>Progressive detail</div>
          <div className={styles.clusters}>
            {currentState.clusters.map((cluster) => (
              <MetricCluster
                key={cluster.id}
                cluster={cluster}
                metrics={currentState.metrics}
                expanded={expandedClusterId === cluster.id}
                locale={metadata.locale}
                onToggle={() =>
                  setExpandedClusterId((current) =>
                    current === cluster.id ? null : cluster.id,
                  )
                }
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

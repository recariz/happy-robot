import type { CurrentStateCluster } from '../../types/case'
import type { Metric } from '../../types/metric'
import { MetricCard } from './MetricCard'
import styles from './MetricCluster.module.css'

interface MetricClusterProps {
  cluster: CurrentStateCluster
  metrics: Metric[]
  expanded: boolean
  onToggle: () => void
  locale?: string
}

export function MetricCluster({
  cluster,
  metrics,
  expanded,
  onToggle,
  locale = 'en-US',
}: MetricClusterProps) {
  const primaryMetrics = cluster.metricIds
    .map((id) => metrics.find((metric) => metric.id === id))
    .filter((metric): metric is Metric => Boolean(metric))

  const derivedMetrics = (cluster.derivedMetricIds ?? [])
    .map((id) => metrics.find((metric) => metric.id === id))
    .filter((metric): metric is Metric => Boolean(metric))

  return (
    <div className={styles.cluster}>
      <button
        type="button"
        className={styles.header}
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <div>
          <div className={styles.kicker}>Explore</div>
          <h3 className={styles.title}>{cluster.label}</h3>
          {cluster.summary ? (
            <p className={styles.summary}>{cluster.summary}</p>
          ) : null}
        </div>
        <span className={styles.chevron} aria-hidden>
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded ? (
        <div className={styles.body}>
          <div className={styles.metrics}>
            {[...primaryMetrics, ...derivedMetrics].map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                locale={locale}
                showDescription
              />
            ))}
          </div>
          {cluster.detailItems?.length ? (
            <ul className={styles.details}>
              {cluster.detailItems.map((item) => (
                <li key={item.label}>
                  <div className={styles.detailLabel}>{item.label}</div>
                  {item.description ? (
                    <p className={styles.detailDescription}>{item.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

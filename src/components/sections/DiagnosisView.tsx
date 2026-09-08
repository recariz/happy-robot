import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useCase } from '../../engine/CaseProvider'
import { BottleneckCard } from '../diagnosis/BottleneckCard'
import { ConclusionStatement } from '../diagnosis/ConclusionStatement'
import { RootCauseCard } from '../diagnosis/RootCauseCard'
import { MetricCard } from '../metrics/MetricCard'
import { ProcessFlow } from '../process/ProcessFlow'
import {
  assertProcessReconcilesToAht,
  deriveDiagnosisMetrics,
} from '../../utils/derive-diagnosis'
import { getPrimaryProcess } from '../../utils/process'
import styles from './DiagnosisView.module.css'

export function DiagnosisView() {
  const caseConfig = useCase()
  const reduceMotion = useReducedMotion()
  const process = getPrimaryProcess(caseConfig.processes)
  const diagnosis = caseConfig.diagnosis
  const [selectedBottleneckId, setSelectedBottleneckId] = useState<string | null>(
    null,
  )
  const [insightVisible, setInsightVisible] = useState(false)

  useEffect(() => {
    if (process && import.meta.env.DEV) {
      assertProcessReconcilesToAht(process)
    }
  }, [process])

  useEffect(() => {
    if (!selectedBottleneckId) return
    if (reduceMotion) {
      setInsightVisible(true)
      return
    }
    const timer = window.setTimeout(() => setInsightVisible(true), 400)
    return () => window.clearTimeout(timer)
  }, [reduceMotion, selectedBottleneckId])

  const derivedMetrics = useMemo(() => {
    if (!process || !diagnosis) return []
    return deriveDiagnosisMetrics(caseConfig.currentState, process, diagnosis)
  }, [caseConfig.currentState, diagnosis, process])

  const selectedBottleneck = diagnosis?.bottlenecks.find(
    (item) => item.id === selectedBottleneckId,
  )

  const selectedRootCause = diagnosis?.rootCauses?.find(
    (item) => item.id === selectedBottleneck?.rootCauseId,
  )

  if (!process || !diagnosis) {
    return (
      <p className={styles.summary}>
        Diagnosis data is not available for this case.
      </p>
    )
  }

  return (
    <div className={styles.view}>
      <p className={styles.summary}>{diagnosis.summary}</p>

      {derivedMetrics.length ? (
        <div>
          <div className={styles.sectionLabel}>Derived from process assumptions</div>
          <div className={styles.metrics}>
            {derivedMetrics.slice(0, 3).map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                locale={caseConfig.metadata.locale}
                showDescription
              />
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <div className={styles.sectionLabel}>Same process · diagnostic view</div>
        <p className={styles.hint}>
          Select a bottleneck theme to highlight related steps and reveal the root-cause chain.
        </p>
        <div className={styles.bleed}>
          <ProcessFlow
            process={process}
            systems={caseConfig.systems}
            mode="diagnosed"
            bottlenecks={
              selectedBottleneck ? [selectedBottleneck] : diagnosis.bottlenecks
            }
            selectedStepId={null}
            onSelectStep={() => undefined}
          />
        </div>
      </div>

      <div>
        <div className={styles.sectionLabel}>Bottlenecks</div>
        <div className={styles.bottlenecks}>
          {diagnosis.bottlenecks.map((bottleneck) => (
            <BottleneckCard
              key={bottleneck.id}
              bottleneck={bottleneck}
              selected={selectedBottleneckId === bottleneck.id}
              onSelect={() => {
                setSelectedBottleneckId(bottleneck.id)
                setInsightVisible(false)
              }}
            />
          ))}
        </div>
      </div>

      {selectedRootCause ? <RootCauseCard rootCause={selectedRootCause} /> : null}

      <ConclusionStatement
        insight={caseConfig.narrative.keyInsight}
        implication={caseConfig.narrative.implication}
        visible={insightVisible}
      />
    </div>
  )
}

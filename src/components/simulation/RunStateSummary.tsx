import { formatRunValue } from '../../engine/simulation/format-run-value'
import {
  resolveRunFact,
  type DerivedRunState,
} from '../../engine/simulation/simulation-reducer'
import type { RunFactRef } from '../../types/demo-run'
import styles from './SimulationPanel.module.css'

export function RunStateSummary({
  state,
  factRefs,
  locale,
  currency,
}: {
  state: DerivedRunState
  factRefs: RunFactRef[]
  locale: string
  currency: string
}) {
  const facts = factRefs
    .slice(0, 4)
    .map((ref) => resolveRunFact(state, ref))
    .filter((fact): fact is NonNullable<typeof fact> => Boolean(fact))
  if (!facts.length) return null

  return (
    <section className={styles.facts} aria-label="Current state">
      <div className={styles.factHeader}>Current state</div>
      <div className={styles.factGrid}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <span className={styles.factLabel}>{fact.label}</span>
            <span className={styles.factValue}>
              {formatRunValue(fact.value, fact.format, locale, currency)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

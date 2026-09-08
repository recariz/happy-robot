import type { EvaluationCase } from '../../types/deployment'
import styles from './EvaluationCaseList.module.css'

export function EvaluationCaseList({ cases }: { cases: EvaluationCase[] }) {
  return (
    <div className={styles.list}>
      {cases.map((item) => (
        <article key={item.id} className={styles.card}>
          <div className={styles.meta}>
            <span className={styles.category}>{item.category.replace(/-/g, ' ')}</span>
            <span className={styles.outcome}>{item.expectedOutcome}</span>
          </div>
          <h3 className={styles.title}>{item.label}</h3>
          <p className={styles.summary}>{item.summary}</p>
        </article>
      ))}
    </div>
  )
}

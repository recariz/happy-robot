import { motion, useReducedMotion } from 'framer-motion'
import styles from './ConclusionStatement.module.css'

interface ConclusionStatementProps {
  insight: string
  implication?: string
  visible: boolean
}

export function ConclusionStatement({
  insight,
  implication,
  visible,
}: ConclusionStatementProps) {
  const reduceMotion = useReducedMotion()

  if (!visible) return null

  return (
    <motion.div
      className={styles.statement}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.kicker}>Key insight</div>
      <p className={styles.insight}>{insight}</p>
      {implication ? <p className={styles.implication}>{implication}</p> : null}
      <div className={styles.handoff}>→ Continues in Solution</div>
    </motion.div>
  )
}

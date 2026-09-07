/**
 * TEMPORARY development fallback for unimplemented sections.
 * Remove usage by registering a real section renderer — do not polish this as presentation content.
 */
import styles from './DevelopmentPlaceholder.module.css'

interface DevelopmentPlaceholderProps {
  sectionLabel: string
}

export function DevelopmentPlaceholder({
  sectionLabel,
}: DevelopmentPlaceholderProps) {
  return (
    <div
      className={styles.placeholder}
      data-temporary="development-placeholder"
      aria-label={`Temporary development placeholder for ${sectionLabel}`}
    >
      <span className={styles.marker}>Temporary · development</span>
      <p className={styles.label}>{sectionLabel}</p>
      <p className={styles.note}>
        Section destination only. No case analysis or architecture content.
      </p>
    </div>
  )
}

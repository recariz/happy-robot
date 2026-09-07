import styles from './Breadcrumbs.module.css'

interface BreadcrumbItem {
  id: string
  label: string
  onSelect?: () => void
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.crumbs} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.id} className={styles.item}>
            {index > 0 ? <span className={styles.sep}>/</span> : null}
            {item.onSelect && !isLast ? (
              <button type="button" className={styles.crumb} onClick={item.onSelect}>
                {item.label}
              </button>
            ) : (
              <span className={isLast ? styles.crumbActive : styles.crumb}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

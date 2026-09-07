import type { ReactNode } from 'react'
import styles from './AppShell.module.css'

interface AppShellProps {
  caseTitle: string
  presentationLabel?: string
  children: ReactNode
}

export function AppShell({
  caseTitle,
  presentationLabel,
  children,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.chrome}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>HappyRobot</div>
          <div className={styles.caseLabel}>{caseTitle}</div>
        </div>
        {presentationLabel ? (
          <div className={styles.badge}>{presentationLabel}</div>
        ) : null}
      </header>
      <main className={styles.stage}>{children}</main>
    </div>
  )
}

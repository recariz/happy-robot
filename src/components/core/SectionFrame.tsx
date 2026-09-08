import type { ReactNode } from 'react'
import styles from './SectionFrame.module.css'

interface SectionFrameProps {
  number: string
  title: string
  prompt: string
  toolbar?: ReactNode
  children: ReactNode
  headingRef?: React.RefObject<HTMLHeadingElement | null>
  /**
   * document — scrollable reading layout (default)
   * workspace — fill viewport; children manage internal layout (Solution)
   */
  layout?: 'document' | 'workspace'
}

export function SectionFrame({
  number,
  title,
  prompt,
  toolbar,
  children,
  headingRef,
  layout = 'document',
}: SectionFrameProps) {
  const frameClass =
    layout === 'workspace'
      ? `${styles.frame} ${styles.frameWorkspace}`
      : styles.frame
  const contentClass =
    layout === 'workspace'
      ? `${styles.content} ${styles.contentWorkspace}`
      : styles.content

  return (
    <section className={frameClass} aria-labelledby="section-heading" data-layout={layout}>
      {toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}
      <div className={contentClass}>
        <header
          className={
            layout === 'workspace' ? styles.headerWorkspace : styles.headerDocument
          }
        >
          <div className={styles.kicker}>{number}</div>
          <h1
            id="section-heading"
            className={layout === 'workspace' ? styles.titleWorkspace : styles.title}
            ref={headingRef}
            tabIndex={-1}
          >
            {title}
          </h1>
          <p className={layout === 'workspace' ? styles.promptWorkspace : styles.prompt}>
            {prompt}
          </p>
        </header>
        <div className={layout === 'workspace' ? styles.bodyWorkspace : undefined}>
          {children}
        </div>
      </div>
    </section>
  )
}

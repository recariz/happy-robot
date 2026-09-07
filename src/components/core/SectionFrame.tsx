import type { ReactNode } from 'react'
import styles from './SectionFrame.module.css'

interface SectionFrameProps {
  number: string
  title: string
  prompt: string
  toolbar?: ReactNode
  children: ReactNode
  headingRef?: React.RefObject<HTMLHeadingElement | null>
}

export function SectionFrame({
  number,
  title,
  prompt,
  toolbar,
  children,
  headingRef,
}: SectionFrameProps) {
  return (
    <section className={styles.frame} aria-labelledby="section-heading">
      {toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}
      <div className={styles.content}>
        <div className={styles.kicker}>{number}</div>
        <h1 id="section-heading" className={styles.title} ref={headingRef} tabIndex={-1}>
          {title}
        </h1>
        <p className={styles.prompt}>{prompt}</p>
        {children}
      </div>
    </section>
  )
}

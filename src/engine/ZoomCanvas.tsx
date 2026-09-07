import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { SectionId } from '../types/navigation'
import { getSectionDefinition } from '../app/section-registry'

interface ZoomCanvasProps {
  activeSectionId: SectionId | null
  children: ReactNode
}

const OVERVIEW_SCALE = 1
const SECTION_SCALE = 1.55

export function ZoomCanvas({ activeSectionId, children }: ZoomCanvasProps) {
  const reduceMotion = useReducedMotion()
  const section = activeSectionId
    ? getSectionDefinition(activeSectionId)
    : undefined

  const targetX = section ? 0.5 - section.overview.x : 0
  const targetY = section ? 0.5 - section.overview.y : 0
  const scale = section ? SECTION_SCALE : OVERVIEW_SCALE

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        transformOrigin: '50% 50%',
      }}
      animate={{
        x: `${targetX * 100}%`,
        y: `${targetY * 100}%`,
        scale,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  )
}

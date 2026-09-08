import type { EvidenceMeta } from './source'

export type SystemRole =
  | 'channel'
  | 'system-of-record'
  | 'supporting'
  | 'communication'
  | 'other'

export interface SystemDefinition extends EvidenceMeta {
  id: string
  label: string
  shortLabel?: string
  description?: string
  role: SystemRole
  /** Core operational systems count toward "systems touched" headline. */
  isCoreOperational: boolean
}

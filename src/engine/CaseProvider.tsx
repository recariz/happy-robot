import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { CaseConfig } from '../types/case'

const CaseContext = createContext<CaseConfig | null>(null)

interface CaseProviderProps {
  caseConfig: CaseConfig
  children: ReactNode
}

export function CaseProvider({ caseConfig, children }: CaseProviderProps) {
  const value = useMemo(() => caseConfig, [caseConfig])
  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>
}

// Hook colocated by design; refresh warning is acceptable for Phase 1 provider pattern.
// eslint-disable-next-line react-refresh/only-export-components
export function useCase(): CaseConfig {
  const value = useContext(CaseContext)
  if (!value) {
    throw new Error('useCase must be used within CaseProvider')
  }
  return value
}

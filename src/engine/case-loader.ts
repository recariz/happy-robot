import type { CaseConfig } from '../types/case'
import { caseRegistry, DEFAULT_CASE_ID } from './case-registry'

export class CaseLoadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CaseLoadError'
  }
}

/**
 * Compile-time-oriented loader for local case modules.
 * Throws clearly if an id is missing — no remote fetch.
 */
export function loadCase(caseId: string = DEFAULT_CASE_ID): CaseConfig {
  const config = caseRegistry[caseId]
  if (!config) {
    throw new CaseLoadError(
      `Unknown case id "${caseId}". Available: ${Object.keys(caseRegistry).join(', ') || '(none)'}`,
    )
  }
  return config
}

export function resolveCaseIdFromSearch(
  search: string = typeof window !== 'undefined' ? window.location.search : '',
): string {
  const params = new URLSearchParams(search)
  return params.get('case') ?? DEFAULT_CASE_ID
}

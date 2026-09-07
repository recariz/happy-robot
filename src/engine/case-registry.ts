import type { CaseConfig } from '../types/case'
import logisticsCarrierBookingCase from '../cases/logistics-carrier-booking'

/**
 * Sole presentation-layer import point for concrete cases.
 * Components and other engine modules must not import case folders directly.
 */
export const caseRegistry: Record<string, CaseConfig> = {
  [logisticsCarrierBookingCase.metadata.id]: logisticsCarrierBookingCase,
}

export const DEFAULT_CASE_ID = logisticsCarrierBookingCase.metadata.id

export function listCaseIds(): string[] {
  return Object.keys(caseRegistry)
}

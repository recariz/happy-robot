/**
 * Operational / economic measurement — structurally separate from Northstars
 * and from the case business objective.
 */
export interface OperationalKpi {
  id: string
  label: string
  description?: string
  metricId?: string
}

export interface EconomicAssumption {
  id: string
  label: string
  value: number
  unit: string
  notes?: string
}

export interface EconomicsModel {
  assumptions: EconomicAssumption[]
  kpis: OperationalKpi[]
  /** Formula identifiers implemented later in utils/calculations. */
  formulaIds?: string[]
  notes?: string[]
}

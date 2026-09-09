import type { RunFieldFormat, RunValue } from '../../types/run-event'

export function formatRunValue(
  value: RunValue | undefined,
  format: RunFieldFormat | undefined,
  locale: string,
  currency: string,
): string {
  if (value === undefined || value === null || value === '') return '—'
  if (Array.isArray(value)) {
    return value
      .map((item) => formatRunValue(item, format, locale, currency))
      .join(', ')
  }
  if (format === 'currency' && typeof value === 'number') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value)
  }
  if (format === 'boolean' && typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  return String(value)
}

import type { Metric, MetricValue } from '../types/metric'

function isRange(value: MetricValue): value is { min: number; max: number } {
  return typeof value === 'object' && value !== null && 'min' in value && 'max' in value
}

export function formatMetricValue(metric: Metric, locale = 'en-US'): string {
  const { value, format = 'number' } = metric

  if (isRange(value) || format === 'range') {
    const range = isRange(value) ? value : { min: Number(value), max: Number(value) }
    return `${formatNumber(range.min, locale)}–${formatNumber(range.max, locale)}`
  }

  switch (format) {
    case 'percent':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits: 0,
      }).format(value)
    case 'currency':
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value)
    case 'duration':
      return `${formatNumber(value, locale)} ${metric.unit}`
    case 'multiple':
      return `${formatNumber(value, locale)}×`
    default:
      return formatNumber(value, locale)
  }
}

function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value)
}

export function formatMetricCaption(metric: Metric, locale = 'en-US'): string {
  const formatted = formatMetricValue(metric, locale)
  if (metric.format === 'percent' || metric.format === 'duration') {
    return formatted
  }
  if (metric.unit && metric.format !== 'currency') {
    return formatted
  }
  return formatted
}

import type { CompanyProfile } from '../../types/case'

export const company = {
  name: 'Atlas Freight',
  shortName: 'Atlas',
  description:
    'Large freight brokerage / non-asset logistics provider handling high-volume inbound carrier interactions.',
  scaleLabel: 'High-volume carrier operations',
  geography: ['United States'],
  businessModel: 'Non-asset freight brokerage',
  operatingContext: [
    'Phone-led carrier operations',
    'Fragmented operational systems',
    'Routine booking mixed with exceptions',
  ],
  fictionalNote:
    'Fictional placeholder company for architecture validation. Figures are not real customer data.',
} satisfies CompanyProfile

import type { CaseNarrative } from '../../types/case'

export const narrative = {
  opening:
    'Atlas Freight handles high-volume carrier interactions through a phone-led operating model spanning multiple systems.',
  currentState:
    'The operation is not information-poor; it is orchestration-heavy. Reps spend significant time retrieving and moving information that already exists digitally.',
  keyInsight:
    'The bottleneck is not carrier communication. Humans are acting as the integration layer between carriers and fragmented operational systems.',
  implication:
    'Automating the conversation alone will not solve the problem. The solution must retrieve context, apply bounded decision logic, execute actions and route genuine exceptions to humans.',
  whyHappyRobot:
    'HappyRobot can orchestrate routine carrier interactions across voice and operational systems while preserving deterministic controls around verification, pricing and booking.',
  solutionThesis:
    'Use HappyRobot to orchestrate routine carrier interactions across voice and operational systems while preserving deterministic controls around verification, pricing and booking.',
  pilotThesis:
    'Start with standard inbound rate-and-booking calls where carrier qualification, load data and pricing are available through defined systems and exception rules can be tightly bounded.',
  recommendation:
    'Prove safe autonomous execution on a narrow high-volume flow, then expand across adjacent carrier workflows as context, integrations and evaluation coverage compound.',
  closing:
    'Prove safe autonomous execution on a narrow high-volume flow, then expand across adjacent carrier workflows as context, integrations and evaluation coverage compound.',
} satisfies CaseNarrative

import type { SourceReference } from '../types/source'

/**
 * Public references for HappyRobot claims.
 * API Evangelist and similar mirrors are third-party — not equivalent to official docs.
 */
export const HAPPYROBOT_SOURCES: SourceReference[] = [
  {
    id: 'hr-homepage',
    label: 'HappyRobot homepage',
    url: 'https://www.happyrobot.ai/',
    provenance: 'official',
    confidence: 'confirmed',
  },
  {
    id: 'hr-media-kit',
    label: 'HappyRobot Media Kit',
    url: 'https://www.happyrobot.ai/blog/happyrobot-media-kit',
    provenance: 'official',
    confidence: 'confirmed',
  },
  {
    id: 'hr-workflow-engine',
    label: "Inside HappyRobot's workflow engine",
    url: 'https://www.happyrobot.ai/blog/inside-happyrobots-workflow-engine',
    provenance: 'official',
    confidence: 'confirmed',
  },
  {
    id: 'api-evangelist-happyrobot',
    label: 'API Evangelist HappyRobot repository',
    url: 'https://github.com/api-evangelist/happyrobot',
    note: 'Third-party reconnaissance — not official documentation.',
    provenance: 'third-party',
    confidence: 'strongly-supported',
  },
]

import type {
  DemoRunDefinition,
  RunFactRef,
} from '../../../../types/demo-run'
import type { ArchitectureRef } from '../../../../types/solution'

import escalate01Carrier from './audio/escalate-01-carrier.mp3'
import escalate02Agent from './audio/escalate-02-agent.mp3'
import escalate03Agent from './audio/escalate-03-agent.mp3'
import escalate04Carrier from './audio/escalate-04-carrier.mp3'
import escalate05Agent from './audio/escalate-05-agent.mp3'
import escalate06Carrier from './audio/escalate-06-carrier.mp3'
import escalate07Agent from './audio/escalate-07-agent.mp3'

const refs = (...items: ArchitectureRef[]) => items
const facts = (...items: RunFactRef[]) => items

export const complianceEscalationRun = {
  id: 'compliance-escalation',
  title: 'Compliance escalation',
  subtitle: 'Chicago to Indianapolis · Load 85304',
  description:
    'A restricted compliance requirement blocks autonomous booking and routes a complete context package to a carrier operations specialist.',
  mode: 'simulated',
  scenarioType: 'escalation',
  channel: 'voice',
  channelId: 'channel-voice',
  runCtaLabel: 'Run compliance escalation simulation',
  participants: {
    customerLabel: 'Carrier',
    customerName: 'Blue Ridge Logistics',
    agentName: 'HappyRobot',
  },
  initialState: {
    systems: {
      'carrier-qualification': {
        'carrier-mc-278441': {
          label: 'Blue Ridge Logistics',
          fields: {
            carrierName: {
              label: 'Carrier',
              value: 'Blue Ridge Logistics',
            },
            mcNumber: {
              label: 'MC number',
              value: '278441',
            },
            accountStatus: {
              label: 'Account status',
              value: 'ACTIVE',
              format: 'status',
            },
            complianceStatus: {
              label: 'Compliance',
              value: 'RESTRICTED',
              format: 'status',
            },
            complianceFlags: {
              label: 'Compliance flags',
              value: ['Restricted requirement not cleared'],
            },
          },
        },
      },
      tms: {
        'load-85304': {
          label: 'Load 85304',
          fields: {
            status: {
              label: 'Status',
              value: 'OPEN',
              format: 'status',
            },
            available: {
              label: 'Available',
              value: true,
              format: 'boolean',
            },
            carrier: {
              label: 'Carrier',
              value: null,
            },
            lane: {
              label: 'Lane',
              value: 'Chicago to Indianapolis',
            },
            complianceRequirement: {
              label: 'Compliance requirement',
              value: 'Restricted requirement',
            },
          },
        },
      },
    },
    context: {
      'ctx-party-identity': {
        carrierId: {
          label: 'Carrier ID',
          value: null,
        },
        carrierName: {
          label: 'Carrier',
          value: null,
        },
        mcNumber: {
          label: 'MC number',
          value: null,
        },
        verificationState: {
          label: 'Verification',
          value: null,
          format: 'status',
        },
      },
      'ctx-work-item': {
        loadId: {
          label: 'Load',
          value: null,
        },
        lane: {
          label: 'Lane',
          value: null,
        },
      },
      'ctx-work-item-status': {
        status: {
          label: 'Load status',
          value: null,
          format: 'status',
        },
        available: {
          label: 'Available',
          value: null,
          format: 'boolean',
        },
      },
      'ctx-qualification': {
        eligible: {
          label: 'Eligible for autonomous booking',
          value: null,
          format: 'boolean',
        },
        restrictions: {
          label: 'Restriction',
          value: null,
        },
        complianceFlags: {
          label: 'Compliance flags',
          value: null,
        },
      },
    },
    northstars: {
      'ns-verify-before-disclosure': 'pending',
      'ns-compliance-escalation': 'pending',
    },
  },
  steps: [
    {
      id: 'escalation-00-ready',
      events: [
        {
          id: 'escalation-run-started',
          type: 'run_started',
          title: 'Restricted-load call ready',
        },
      ],
      presentation: {
        kind: 'ready',
        primaryEventId: 'escalation-run-started',
        headline: 'Compliance escalation ready',
        summary:
          'Watch verification, restriction detection, denied override, and context-rich human handoff execute in order.',
        highlightRefs: [],
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-85304',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-85304',
            field: 'lane',
          },
          {
            source: 'system',
            systemId: 'carrier-qualification',
            entityId: 'carrier-mc-278441',
            field: 'complianceStatus',
          },
        ),
        fallbackDurationMs: 1100,
      },
    },
    {
      id: 'escalation-01-carrier-request',
      events: [
        {
          id: 'escalation-message-01',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'Hi, this is John with Blue Ridge Logistics, MC two seven eight four four one. I’m calling about load eight five three zero four, Chicago to Indianapolis. Is it still available?',
        },
      ],
      audio: {
        src: escalate01Carrier,
        messageEventId: 'escalation-message-01',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-01',
        headline: 'Carrier requests a restricted load',
        highlightRefs: refs(
          { kind: 'channel', id: 'channel-voice' },
          { kind: 'stage', id: 'stage-understand-intent' },
        ),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-85304',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-85304',
            field: 'lane',
          },
        ),
        fallbackDurationMs: 11233,
      },
    },
    {
      id: 'escalation-02-agent-hold',
      events: [
        {
          id: 'escalation-message-02',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'Hi John. Give me one moment while I verify your carrier profile and check the load.',
        },
      ],
      audio: {
        src: escalate02Agent,
        messageEventId: 'escalation-message-02',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-02',
        headline: 'Verify before checking the load',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-assemble-context' },
          { kind: 'tool', id: 'identify-party' },
          { kind: 'tool', id: 'retrieve-work-item' },
        ),
        fallbackDurationMs: 5590,
      },
    },
    {
      id: 'escalation-03-identity',
      events: [
        {
          id: 'escalation-identify-call',
          type: 'tool_call',
          toolId: 'identify-party',
          correlationId: 'escalation-identify-party',
          title: 'Verify carrier profile',
          args: {
            mcNumber: '278441',
            carrierName: 'Blue Ridge Logistics',
          },
        },
        {
          id: 'escalation-identify-result',
          type: 'tool_result',
          toolId: 'identify-party',
          correlationId: 'escalation-identify-party',
          status: 'success',
          title: 'Carrier profile verified',
          result: {
            carrierId: 'carrier-mc-278441',
            carrierName: 'Blue Ridge Logistics',
            mcNumber: '278441',
            accountStatus: 'ACTIVE',
          },
          durationMs: 401,
        },
        {
          id: 'escalation-party-context',
          type: 'context_update',
          contextSourceId: 'ctx-party-identity',
          title: 'Caller identity assembled',
          changes: [
            {
              field: 'carrierId',
              label: 'Carrier ID',
              before: null,
              after: 'carrier-mc-278441',
            },
            {
              field: 'carrierName',
              label: 'Carrier',
              before: null,
              after: 'Blue Ridge Logistics',
            },
            {
              field: 'mcNumber',
              label: 'MC number',
              before: null,
              after: '278441',
            },
            {
              field: 'verificationState',
              label: 'Verification',
              before: null,
              after: 'VERIFIED',
              format: 'status',
            },
          ],
        },
        {
          id: 'escalation-verify-checking',
          type: 'northstar_result',
          northstarId: 'ns-verify-before-disclosure',
          status: 'checking',
          evidence:
            'The carrier is verified; event order remains under evaluation until disclosure.',
        },
      ],
      presentation: {
        kind: 'context_update',
        primaryEventId: 'escalation-party-context',
        headline: 'Carrier identity verified',
        highlightRefs: refs(
          { kind: 'tool', id: 'identify-party' },
          { kind: 'system', id: 'carrier-qualification' },
          { kind: 'context', id: 'ctx-party-identity' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'carrierName',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'mcNumber',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'verificationState',
          },
        ),
        fallbackDurationMs: 1500,
      },
    },
    {
      id: 'escalation-04-work-item',
      events: [
        {
          id: 'escalation-load-call',
          type: 'tool_call',
          toolId: 'retrieve-work-item',
          correlationId: 'escalation-retrieve-load',
          title: 'Retrieve load',
          args: {
            loadId: '85304',
          },
        },
        {
          id: 'escalation-load-result',
          type: 'tool_result',
          toolId: 'retrieve-work-item',
          correlationId: 'escalation-retrieve-load',
          status: 'success',
          title: 'Load found',
          result: {
            loadId: '85304',
            status: 'OPEN',
            available: true,
          },
          durationMs: 364,
        },
        {
          id: 'escalation-tms-read-load',
          type: 'system_read',
          systemId: 'tms',
          entityId: 'load-85304',
          title: 'Load record read',
          fields: [
            {
              field: 'status',
              label: 'Status',
              value: 'OPEN',
              format: 'status',
            },
            {
              field: 'available',
              label: 'Available',
              value: true,
              format: 'boolean',
            },
            {
              field: 'lane',
              label: 'Lane',
              value: 'Chicago to Indianapolis',
            },
            {
              field: 'complianceRequirement',
              label: 'Compliance requirement',
              value: 'Restricted requirement',
            },
          ],
        },
        {
          id: 'escalation-work-item-context',
          type: 'context_update',
          contextSourceId: 'ctx-work-item',
          title: 'Load context assembled',
          changes: [
            {
              field: 'loadId',
              label: 'Load',
              before: null,
              after: '85304',
            },
            {
              field: 'lane',
              label: 'Lane',
              before: null,
              after: 'Chicago to Indianapolis',
            },
          ],
        },
        {
          id: 'escalation-work-status-context',
          type: 'context_update',
          contextSourceId: 'ctx-work-item-status',
          title: 'Availability assembled',
          changes: [
            {
              field: 'status',
              label: 'Load status',
              before: null,
              after: 'OPEN',
              format: 'status',
            },
            {
              field: 'available',
              label: 'Available',
              before: null,
              after: true,
              format: 'boolean',
            },
          ],
        },
      ],
      presentation: {
        kind: 'system_read',
        primaryEventId: 'escalation-tms-read-load',
        headline: 'Load found and available',
        highlightRefs: refs(
          { kind: 'tool', id: 'retrieve-work-item' },
          { kind: 'system', id: 'tms' },
          { kind: 'context', id: 'ctx-work-item' },
          { kind: 'context', id: 'ctx-work-item-status' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'lane',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'status',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'available',
          },
        ),
        fallbackDurationMs: 1600,
      },
    },
    {
      id: 'escalation-05-compliance-check',
      events: [
        {
          id: 'escalation-eligibility-call',
          type: 'tool_call',
          toolId: 'check-eligibility',
          correlationId: 'escalation-check-eligibility',
          title: 'Check load-specific eligibility',
          args: {
            carrierId: 'carrier-mc-278441',
            loadId: '85304',
          },
        },
      ],
      presentation: {
        kind: 'tool_call',
        primaryEventId: 'escalation-eligibility-call',
        headline: 'Check compliance eligibility',
        highlightRefs: refs(
          { kind: 'tool', id: 'check-eligibility' },
          { kind: 'system', id: 'carrier-qualification' },
          { kind: 'context', id: 'ctx-qualification' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'verificationState',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'available',
          },
        ),
        fallbackDurationMs: 1200,
      },
    },
    {
      id: 'escalation-06-restricted-result',
      events: [
        {
          id: 'escalation-eligibility-result',
          type: 'tool_result',
          toolId: 'check-eligibility',
          correlationId: 'escalation-check-eligibility',
          status: 'success',
          title: 'Restricted compliance requirement found',
          result: {
            eligibleForAutonomousBooking: false,
            restrictions: ['Restricted compliance requirement not cleared'],
            requiresHumanReview: true,
          },
          durationMs: 338,
        },
        {
          id: 'escalation-qualification-context',
          type: 'context_update',
          contextSourceId: 'ctx-qualification',
          title: 'Restricted compliance context assembled',
          changes: [
            {
              field: 'eligible',
              label: 'Eligible for autonomous booking',
              before: null,
              after: false,
              format: 'boolean',
            },
            {
              field: 'restrictions',
              label: 'Restriction',
              before: null,
              after: 'Restricted compliance requirement not cleared',
            },
            {
              field: 'complianceFlags',
              label: 'Compliance flags',
              before: null,
              after: ['HUMAN_REVIEW_REQUIRED'],
            },
          ],
        },
        {
          id: 'escalation-compliance-checking',
          type: 'northstar_result',
          northstarId: 'ns-compliance-escalation',
          status: 'checking',
          evidence:
            'A restricted result exists; PASS remains blocked until a human escalation event is created.',
          severity: 'warning',
        },
      ],
      presentation: {
        kind: 'context_update',
        primaryEventId: 'escalation-qualification-context',
        headline: 'Restricted condition detected',
        highlightRefs: refs(
          { kind: 'tool', id: 'check-eligibility' },
          { kind: 'context', id: 'ctx-qualification' },
          { kind: 'stage', id: 'stage-route-exception' },
          { kind: 'escalation', id: 'esc-compliance-restricted' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'eligible',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
        ),
        fallbackDurationMs: 1700,
      },
    },
    {
      id: 'escalation-07-agent-explains',
      events: [
        {
          id: 'escalation-message-03',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'Thanks. I found the load and verified your carrier profile. The load is available, but there is a restricted compliance requirement that is not currently cleared on your profile.',
        },
        {
          id: 'escalation-verify-pass',
          type: 'northstar_result',
          northstarId: 'ns-verify-before-disclosure',
          status: 'pass',
          evidence:
            'escalation-identify-result verified Blue Ridge Logistics before escalation-message-03 disclosed load-specific details.',
          severity: 'success',
        },
      ],
      audio: {
        src: escalate03Agent,
        messageEventId: 'escalation-message-03',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-03',
        headline: 'Restricted requirement explained',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-route-exception' },
          { kind: 'context', id: 'ctx-qualification' },
          { kind: 'context', id: 'ctx-work-item-status' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'verificationState',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'available',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
        ),
        fallbackDurationMs: 10344,
      },
    },
    {
      id: 'escalation-08-carrier-override-request',
      events: [
        {
          id: 'escalation-message-04',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'We haul that kind of freight all the time. Can’t you just book it and have somebody fix the paperwork afterwards?',
        },
      ],
      audio: {
        src: escalate04Carrier,
        messageEventId: 'escalation-message-04',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-04',
        headline: 'Carrier requests an override',
        highlightRefs: refs(
          { kind: 'channel', id: 'channel-voice' },
          { kind: 'decision', id: 'decision-next-action' },
          { kind: 'decision', id: 'decision-within-policy' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'eligible',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
        ),
        fallbackDurationMs: 6087,
      },
    },
    {
      id: 'escalation-09-override-denied',
      events: [
        {
          id: 'escalation-policy-decision',
          type: 'decision',
          decisionId: 'decision-within-policy',
          title: 'Compliance override denied',
          detail: {
            requestedAction: 'Book before compliance clearance',
            withinPolicy: false,
            nextAction: 'Human escalation',
          },
          severity: 'warning',
        },
      ],
      presentation: {
        kind: 'decision',
        primaryEventId: 'escalation-policy-decision',
        headline: 'Autonomous booking blocked',
        summary:
          'The workflow cannot override or defer the restricted compliance requirement.',
        highlightRefs: refs(
          { kind: 'decision', id: 'decision-within-policy' },
          { kind: 'stage', id: 'stage-route-exception' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'eligible',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'status',
          },
        ),
        fallbackDurationMs: 1500,
      },
    },
    {
      id: 'escalation-10-governance-check',
      events: [
        {
          id: 'escalation-compliance-still-checking',
          type: 'northstar_result',
          northstarId: 'ns-compliance-escalation',
          status: 'checking',
          evidence:
            'The restricted result and denied override require a created human handoff before PASS.',
          severity: 'warning',
        },
      ],
      presentation: {
        kind: 'northstar_result',
        primaryEventId: 'escalation-compliance-still-checking',
        headline: 'Compliance escalation · CHECKING',
        summary: 'The policy decision is safe, but the handoff does not exist yet.',
        highlightRefs: refs({
          kind: 'northstar',
          id: 'ns-compliance-escalation',
        }),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
        ),
        fallbackDurationMs: 1400,
      },
    },
    {
      id: 'escalation-11-agent-offers-handoff',
      events: [
        {
          id: 'escalation-message-05',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'I can’t override the compliance requirement or commit the booking while that check is unresolved. What I can do is connect you with a carrier operations specialist and pass along the load and carrier details so you don’t have to repeat everything.',
        },
      ],
      audio: {
        src: escalate05Agent,
        messageEventId: 'escalation-message-05',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-05',
        headline: 'Context-rich handoff offered',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-route-exception' },
          { kind: 'tool', id: 'escalate-to-human' },
          { kind: 'escalation', id: 'esc-compliance-restricted' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'carrierName',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
        ),
        fallbackDurationMs: 14968,
      },
    },
    {
      id: 'escalation-12-carrier-accepts',
      events: [
        {
          id: 'escalation-message-06',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'Okay, that works.',
        },
      ],
      audio: {
        src: escalate06Carrier,
        messageEventId: 'escalation-message-06',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-06',
        headline: 'Carrier accepts the handoff',
        highlightRefs: refs(
          { kind: 'channel', id: 'channel-voice' },
          { kind: 'tool', id: 'escalate-to-human' },
          { kind: 'escalation', id: 'esc-compliance-restricted' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'carrierName',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
        ),
        fallbackDurationMs: 2299,
      },
    },
    {
      id: 'escalation-13-human-escalation',
      events: [
        {
          id: 'escalation-handoff-created',
          type: 'escalation',
          escalationPathId: 'esc-compliance-restricted',
          reason:
            'Restricted compliance requirement is not cleared for autonomous booking.',
          destination: 'Carrier Operations Specialist',
          contextFields: [
            'Carrier: Blue Ridge Logistics · MC 278441',
            'Load: 85304 · Chicago to Indianapolis',
            'Compliance: Restricted requirement not cleared',
            'Requested action: Book load 85304',
          ],
          status: 'created',
          severity: 'warning',
        },
        {
          id: 'escalation-compliance-pass',
          type: 'northstar_result',
          northstarId: 'ns-compliance-escalation',
          status: 'pass',
          evidence:
            'escalation-eligibility-result found the restriction, escalation-policy-decision denied the override, and escalation-handoff-created created the required handoff.',
          severity: 'success',
        },
      ],
      presentation: {
        kind: 'escalation',
        primaryEventId: 'escalation-handoff-created',
        headline: 'Human escalation created',
        summary:
          'Carrier Operations Specialist receives four friendly context fields; no booking write is emitted.',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-route-exception' },
          { kind: 'tool', id: 'escalate-to-human' },
          { kind: 'escalation', id: 'esc-compliance-restricted' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'carrierName',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'lane',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
        ),
        fallbackDurationMs: 1900,
      },
    },
    {
      id: 'escalation-14-agent-confirms',
      events: [
        {
          id: 'escalation-message-07',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'Great. I’m escalating it now. The specialist will already have the information you’ve provided.',
        },
      ],
      audio: {
        src: escalate07Agent,
        messageEventId: 'escalation-message-07',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'escalation-message-07',
        headline: 'Handoff confirmed to carrier',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-route-exception' },
          { kind: 'tool', id: 'escalate-to-human' },
          { kind: 'escalation', id: 'esc-compliance-restricted' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'carrierName',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
        ),
        fallbackDurationMs: 6322,
      },
    },
    {
      id: 'escalation-15-complete',
      events: [
        {
          id: 'escalation-run-completed',
          type: 'run_completed',
          title: 'CORRECTLY ESCALATED',
          summary:
            'The restricted booking remains uncommitted and a Carrier Operations Specialist receives the assembled context.',
          outcomeItems: [
            'Carrier verified before disclosure',
            'Restricted condition identified',
            'No booking committed',
            'Context-rich human handoff created',
          ],
          severity: 'success',
        },
      ],
      presentation: {
        kind: 'run_complete',
        primaryEventId: 'escalation-run-completed',
        headline: 'CORRECTLY ESCALATED',
        summary: '2 evaluated · 2 passed · 1 human escalation',
        highlightRefs: [],
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-85304',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-85304',
            field: 'carrier',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-qualification',
            field: 'restrictions',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
        ),
        fallbackDurationMs: 2400,
      },
    },
  ],
  expectedOutcome: {
    status: 'escalated',
    humanEscalation: true,
    summary:
      'Escalate the restricted booking with context after both evaluated Northstars pass.',
  },
  notes: [
    'SIMULATED DEPLOYMENT RUN',
    'All carrier, load, compliance, system, and timing details are fictional case data.',
  ],
} satisfies DemoRunDefinition

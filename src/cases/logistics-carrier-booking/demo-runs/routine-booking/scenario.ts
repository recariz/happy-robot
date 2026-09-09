import type {
  DemoRunDefinition,
  RunFactRef,
} from '../../../../types/demo-run'
import type { ArchitectureRef } from '../../../../types/solution'

import resolve01Carrier from './audio/resolve-01-carrier.mp3'
import resolve02Agent from './audio/resolve-02-agent.mp3'
import resolve03Agent from './audio/resolve-03-agent.mp3'
import resolve04Carrier from './audio/resolve-04-carrier.mp3'
import resolve05Agent from './audio/resolve-05-agent.mp3'
import resolve06Carrier from './audio/resolve-06-carrier.mp3'
import resolve07Agent from './audio/resolve-07-agent.mp3'
import resolve08Carrier from './audio/resolve-08-carrier.mp3'
import resolve09Agent from './audio/resolve-09-agent.mp3'

const refs = (...items: ArchitectureRef[]) => items
const facts = (...items: RunFactRef[]) => items

export const routineBookingRun = {
  id: 'routine-booking',
  title: 'Routine booking',
  subtitle: 'Dallas to Houston · Load 84721',
  description:
    'A verified carrier negotiates within the authorized rate band, confirms the final terms, and is booked with complete write-back.',
  mode: 'simulated',
  scenarioType: 'negotiation',
  channel: 'voice',
  channelId: 'channel-voice',
  runCtaLabel: 'Run routine booking simulation',
  participants: {
    customerLabel: 'Carrier',
    customerName: 'Summit Transport',
    agentName: 'HappyRobot',
  },
  initialState: {
    systems: {
      'carrier-qualification': {
        'carrier-mc-145829': {
          label: 'Summit Transport',
          fields: {
            carrierName: {
              label: 'Carrier',
              value: 'Summit Transport',
            },
            mcNumber: {
              label: 'MC number',
              value: '145829',
            },
            accountStatus: {
              label: 'Account status',
              value: 'ACTIVE',
              format: 'status',
            },
            eligible: {
              label: 'Eligible',
              value: true,
              format: 'boolean',
            },
          },
        },
      },
      tms: {
        'load-84721': {
          label: 'Load 84721',
          fields: {
            status: {
              label: 'Status',
              value: 'OPEN',
              format: 'status',
            },
            carrier: {
              label: 'Carrier',
              value: null,
            },
            rate: {
              label: 'Rate',
              value: 1420,
              format: 'currency',
            },
            authorizedCeiling: {
              label: 'Authorized ceiling',
              value: 1470,
              format: 'currency',
            },
            lane: {
              label: 'Lane',
              value: 'Dallas to Houston',
            },
            pickupWindow: {
              label: 'Pickup',
              value: 'Today at 2 P.M.',
            },
            deliveryWindow: {
              label: 'Delivery',
              value: 'Tomorrow morning',
            },
          },
        },
      },
      crm: {
        'carrier-mc-145829': {
          label: 'Summit Transport interaction',
          fields: {
            lastInteraction: {
              label: 'Last interaction',
              value: null,
            },
            outcome: {
              label: 'Outcome',
              value: null,
            },
            conversationLogged: {
              label: 'Conversation logged',
              value: false,
              format: 'boolean',
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
        pickupWindow: {
          label: 'Pickup',
          value: null,
        },
        deliveryWindow: {
          label: 'Delivery',
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
          label: 'Eligible',
          value: null,
          format: 'boolean',
        },
        restrictions: {
          label: 'Restrictions',
          value: null,
        },
      },
      'ctx-commercial-params': {
        authorizedRate: {
          label: 'Current rate',
          value: null,
          format: 'currency',
        },
        authorizedCeiling: {
          label: 'Authorized ceiling',
          value: null,
          format: 'currency',
        },
        agreedRate: {
          label: 'Agreed rate',
          value: null,
          format: 'currency',
        },
      },
      'ctx-interaction-state': {
        outcome: {
          label: 'Interaction outcome',
          value: null,
        },
        confirmationStatus: {
          label: 'Confirmation',
          value: null,
          format: 'status',
        },
      },
    },
    northstars: {
      'ns-verify-before-disclosure': 'pending',
      'ns-authorized-rate-source': 'pending',
      'ns-explicit-booking-confirmation': 'pending',
      'ns-system-of-record-integrity': 'pending',
    },
  },
  steps: [
    {
      id: 'routine-00-ready',
      events: [
        {
          id: 'routine-run-started',
          type: 'run_started',
          title: 'Inbound carrier call ready',
        },
      ],
      presentation: {
        kind: 'ready',
        primaryEventId: 'routine-run-started',
        headline: 'Routine booking ready',
        summary:
          'Watch verification, bounded negotiation, booking, write-back, and confirmation execute in order.',
        highlightRefs: [],
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'lane',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'rate',
          },
        ),
        fallbackDurationMs: 1100,
      },
    },
    {
      id: 'routine-01-carrier-request',
      events: [
        {
          id: 'routine-message-01',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'Hi, this is Mike with Summit Transport, MC one four five eight two nine. I’m calling about load eight four seven two one, Dallas to Houston. Is it still open?',
        },
      ],
      audio: {
        src: resolve01Carrier,
        messageEventId: 'routine-message-01',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-01',
        headline: 'Carrier requests a load',
        highlightRefs: refs(
          { kind: 'channel', id: 'channel-voice' },
          { kind: 'stage', id: 'stage-understand-intent' },
        ),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'lane',
          },
        ),
        fallbackDurationMs: 10762,
      },
    },
    {
      id: 'routine-02-agent-hold',
      events: [
        {
          id: 'routine-message-02',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'Hi Mike. Give me one moment while I verify your carrier profile and pull up the load.',
        },
      ],
      audio: {
        src: resolve02Agent,
        messageEventId: 'routine-message-02',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-02',
        headline: 'Verification before disclosure',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-assemble-context' },
          { kind: 'tool', id: 'identify-party' },
          { kind: 'tool', id: 'retrieve-work-item' },
        ),
        fallbackDurationMs: 5460,
      },
    },
    {
      id: 'routine-03-verify-carrier',
      events: [
        {
          id: 'routine-identify-call',
          type: 'tool_call',
          toolId: 'identify-party',
          correlationId: 'routine-identify-party',
          title: 'Verify carrier profile',
          args: {
            mcNumber: '145829',
            carrierName: 'Summit Transport',
          },
        },
        {
          id: 'routine-verify-checking',
          type: 'northstar_result',
          northstarId: 'ns-verify-before-disclosure',
          status: 'checking',
          evidence:
            'Verification is in progress before any load-specific information is disclosed.',
        },
      ],
      presentation: {
        kind: 'tool_call',
        primaryEventId: 'routine-identify-call',
        headline: 'Verify carrier profile',
        highlightRefs: refs(
          { kind: 'tool', id: 'identify-party' },
          { kind: 'system', id: 'carrier-qualification' },
          { kind: 'context', id: 'ctx-party-identity' },
          { kind: 'stage', id: 'stage-assemble-context' },
        ),
        fallbackDurationMs: 1200,
      },
    },
    {
      id: 'routine-04-carrier-verified',
      events: [
        {
          id: 'routine-identify-result',
          type: 'tool_result',
          toolId: 'identify-party',
          correlationId: 'routine-identify-party',
          status: 'success',
          title: 'Carrier profile verified',
          result: {
            carrierId: 'carrier-mc-145829',
            carrierName: 'Summit Transport',
            mcNumber: '145829',
            accountStatus: 'ACTIVE',
          },
          durationMs: 428,
        },
        {
          id: 'routine-party-context',
          type: 'context_update',
          contextSourceId: 'ctx-party-identity',
          title: 'Caller identity assembled',
          changes: [
            {
              field: 'carrierId',
              label: 'Carrier ID',
              before: null,
              after: 'carrier-mc-145829',
            },
            {
              field: 'carrierName',
              label: 'Carrier',
              before: null,
              after: 'Summit Transport',
            },
            {
              field: 'mcNumber',
              label: 'MC number',
              before: null,
              after: '145829',
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
      ],
      presentation: {
        kind: 'context_update',
        primaryEventId: 'routine-party-context',
        headline: 'Carrier verified',
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
        fallbackDurationMs: 1300,
      },
    },
    {
      id: 'routine-05-retrieve-work-item',
      events: [
        {
          id: 'routine-load-call',
          type: 'tool_call',
          toolId: 'retrieve-work-item',
          correlationId: 'routine-retrieve-load',
          title: 'Retrieve load',
          args: {
            loadId: '84721',
          },
        },
      ],
      presentation: {
        kind: 'tool_call',
        primaryEventId: 'routine-load-call',
        headline: 'Retrieve load 84721',
        highlightRefs: refs(
          { kind: 'tool', id: 'retrieve-work-item' },
          { kind: 'system', id: 'tms' },
          { kind: 'context', id: 'ctx-work-item' },
          { kind: 'context', id: 'ctx-work-item-status' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'verificationState',
          },
        ),
        fallbackDurationMs: 1100,
      },
    },
    {
      id: 'routine-06-work-item-found',
      events: [
        {
          id: 'routine-load-result',
          type: 'tool_result',
          toolId: 'retrieve-work-item',
          correlationId: 'routine-retrieve-load',
          status: 'success',
          title: 'Load found',
          result: {
            loadId: '84721',
            status: 'OPEN',
            available: true,
          },
          durationMs: 382,
        },
        {
          id: 'routine-tms-read-load',
          type: 'system_read',
          systemId: 'tms',
          entityId: 'load-84721',
          title: 'Load record read',
          fields: [
            {
              field: 'status',
              label: 'Status',
              value: 'OPEN',
              format: 'status',
            },
            {
              field: 'lane',
              label: 'Lane',
              value: 'Dallas to Houston',
            },
            {
              field: 'pickupWindow',
              label: 'Pickup',
              value: 'Today at 2 P.M.',
            },
            {
              field: 'deliveryWindow',
              label: 'Delivery',
              value: 'Tomorrow morning',
            },
          ],
        },
        {
          id: 'routine-work-item-context',
          type: 'context_update',
          contextSourceId: 'ctx-work-item',
          title: 'Load context assembled',
          changes: [
            {
              field: 'loadId',
              label: 'Load',
              before: null,
              after: '84721',
            },
            {
              field: 'lane',
              label: 'Lane',
              before: null,
              after: 'Dallas to Houston',
            },
            {
              field: 'pickupWindow',
              label: 'Pickup',
              before: null,
              after: 'Today at 2 P.M.',
            },
            {
              field: 'deliveryWindow',
              label: 'Delivery',
              before: null,
              after: 'Tomorrow morning',
            },
          ],
        },
        {
          id: 'routine-work-status-context',
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
        primaryEventId: 'routine-tms-read-load',
        headline: 'Load found and available',
        highlightRefs: refs(
          { kind: 'tool', id: 'retrieve-work-item' },
          { kind: 'system', id: 'tms' },
          { kind: 'context', id: 'ctx-work-item' },
          { kind: 'context', id: 'ctx-work-item-status' },
          { kind: 'stage', id: 'stage-assemble-context' },
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
      id: 'routine-07-check-eligibility',
      events: [
        {
          id: 'routine-eligibility-call',
          type: 'tool_call',
          toolId: 'check-eligibility',
          correlationId: 'routine-check-eligibility',
          title: 'Check carrier eligibility',
          args: {
            carrierId: 'carrier-mc-145829',
            loadId: '84721',
          },
        },
        {
          id: 'routine-eligibility-result',
          type: 'tool_result',
          toolId: 'check-eligibility',
          correlationId: 'routine-check-eligibility',
          status: 'success',
          title: 'Carrier eligible',
          result: {
            eligible: true,
            restrictions: [],
          },
          durationMs: 316,
        },
        {
          id: 'routine-qualification-context',
          type: 'context_update',
          contextSourceId: 'ctx-qualification',
          title: 'Qualification assembled',
          changes: [
            {
              field: 'eligible',
              label: 'Eligible',
              before: null,
              after: true,
              format: 'boolean',
            },
            {
              field: 'restrictions',
              label: 'Restrictions',
              before: null,
              after: [],
            },
          ],
        },
      ],
      presentation: {
        kind: 'tool_result',
        primaryEventId: 'routine-eligibility-result',
        headline: 'Carrier is eligible',
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
            contextSourceId: 'ctx-qualification',
            field: 'eligible',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'available',
          },
        ),
        fallbackDurationMs: 1400,
      },
    },
    {
      id: 'routine-08-authorized-rate',
      events: [
        {
          id: 'routine-rate-call',
          type: 'tool_call',
          toolId: 'retrieve-authorized-rate',
          correlationId: 'routine-retrieve-rate',
          title: 'Retrieve authorized rate',
          args: {
            loadId: '84721',
          },
        },
        {
          id: 'routine-rate-result',
          type: 'tool_result',
          toolId: 'retrieve-authorized-rate',
          correlationId: 'routine-retrieve-rate',
          status: 'success',
          title: 'Authorized rate returned',
          result: {
            currentRate: 1420,
            authorizedCeiling: 1470,
            currency: 'USD',
          },
          durationMs: 291,
        },
        {
          id: 'routine-tms-read-rate',
          type: 'system_read',
          systemId: 'tms',
          entityId: 'load-84721',
          title: 'Pricing parameters read',
          fields: [
            {
              field: 'rate',
              label: 'Rate',
              value: 1420,
              format: 'currency',
            },
            {
              field: 'authorizedCeiling',
              label: 'Authorized ceiling',
              value: 1470,
              format: 'currency',
            },
          ],
        },
        {
          id: 'routine-commercial-context',
          type: 'context_update',
          contextSourceId: 'ctx-commercial-params',
          title: 'Authorized pricing assembled',
          changes: [
            {
              field: 'authorizedRate',
              label: 'Current rate',
              before: null,
              after: 1420,
              format: 'currency',
            },
            {
              field: 'authorizedCeiling',
              label: 'Authorized ceiling',
              before: null,
              after: 1470,
              format: 'currency',
            },
          ],
        },
        {
          id: 'routine-rate-source-checking',
          type: 'northstar_result',
          northstarId: 'ns-authorized-rate-source',
          status: 'checking',
          evidence:
            'The rate source is being checked before any price is quoted.',
        },
      ],
      presentation: {
        kind: 'system_read',
        primaryEventId: 'routine-tms-read-rate',
        headline: 'Authorized pricing retrieved',
        highlightRefs: refs(
          { kind: 'tool', id: 'retrieve-authorized-rate' },
          { kind: 'system', id: 'tms' },
          { kind: 'context', id: 'ctx-commercial-params' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedRate',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedCeiling',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'lane',
          },
        ),
        fallbackDurationMs: 1600,
      },
    },
    {
      id: 'routine-09-verification-pass',
      events: [
        {
          id: 'routine-verify-pass',
          type: 'northstar_result',
          northstarId: 'ns-verify-before-disclosure',
          status: 'pass',
          evidence:
            'routine-identify-result verified Summit Transport before routine-message-03 disclosed load-specific details.',
          severity: 'success',
        },
      ],
      presentation: {
        kind: 'northstar_result',
        primaryEventId: 'routine-verify-pass',
        headline: 'Verify before disclosure · PASS',
        highlightRefs: refs({
          kind: 'northstar',
          id: 'ns-verify-before-disclosure',
        }),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'verificationState',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'status',
          },
        ),
        fallbackDurationMs: 1300,
      },
    },
    {
      id: 'routine-10-agent-offer',
      events: [
        {
          id: 'routine-message-03',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'Thanks. I have Summit Transport verified, and load eight four seven two one is still open. Pickup is today at two P.M. in Dallas, with delivery tomorrow morning in Houston. The current rate is one thousand four hundred and twenty dollars.',
        },
      ],
      audio: {
        src: resolve03Agent,
        messageEventId: 'routine-message-03',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-03',
        headline: 'Verified load details disclosed',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-assemble-context' },
          { kind: 'tool', id: 'retrieve-work-item' },
          { kind: 'tool', id: 'retrieve-authorized-rate' },
          { kind: 'context', id: 'ctx-work-item' },
          { kind: 'context', id: 'ctx-work-item-status' },
          { kind: 'context', id: 'ctx-commercial-params' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'status',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'pickupWindow',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'deliveryWindow',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedRate',
          },
        ),
        fallbackDurationMs: 15334,
      },
    },
    {
      id: 'routine-11-carrier-counter',
      events: [
        {
          id: 'routine-message-04',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'Okay. Can you do fifteen hundred?',
        },
      ],
      audio: {
        src: resolve04Carrier,
        messageEventId: 'routine-message-04',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-04',
        headline: 'Carrier requests $1,500',
        highlightRefs: refs(
          { kind: 'channel', id: 'channel-voice' },
          { kind: 'stage', id: 'stage-bounded-negotiation' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedRate',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedCeiling',
          },
        ),
        fallbackDurationMs: 3135,
      },
    },
    {
      id: 'routine-12-policy-decision',
      events: [
        {
          id: 'routine-policy-decision',
          type: 'decision',
          decisionId: 'decision-within-policy',
          title: 'Requested rate exceeds autonomous authority',
          detail: {
            requestedRate: 1500,
            authorizedCeiling: 1470,
            counterRate: 1470,
            withinAuthority: true,
          },
        },
        {
          id: 'routine-agreed-rate-context',
          type: 'context_update',
          contextSourceId: 'ctx-commercial-params',
          title: 'Bounded counter selected',
          changes: [
            {
              field: 'agreedRate',
              label: 'Proposed rate',
              before: null,
              after: 1470,
              format: 'currency',
            },
          ],
        },
      ],
      presentation: {
        kind: 'decision',
        primaryEventId: 'routine-policy-decision',
        headline: 'Counter at the authorized ceiling',
        summary:
          'The requested $1,500 is outside authority; the bounded counter remains within policy.',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-bounded-negotiation' },
          { kind: 'decision', id: 'decision-within-policy' },
          { kind: 'context', id: 'ctx-commercial-params' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedRate',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedCeiling',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'agreedRate',
            label: 'Counter',
          },
        ),
        fallbackDurationMs: 1500,
      },
    },
    {
      id: 'routine-13-rate-source-pass',
      events: [
        {
          id: 'routine-rate-source-pass',
          type: 'northstar_result',
          northstarId: 'ns-authorized-rate-source',
          status: 'pass',
          evidence:
            'routine-rate-result returned the $1,420 current rate and $1,470 ceiling before routine-message-05 communicated the bounded counter.',
          severity: 'success',
        },
      ],
      presentation: {
        kind: 'northstar_result',
        primaryEventId: 'routine-rate-source-pass',
        headline: 'Authorized rate source · PASS',
        highlightRefs: refs({
          kind: 'northstar',
          id: 'ns-authorized-rate-source',
        }),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedCeiling',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'agreedRate',
          },
        ),
        fallbackDurationMs: 1300,
      },
    },
    {
      id: 'routine-14-agent-counter',
      events: [
        {
          id: 'routine-message-05',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'I can’t get to fifteen hundred on this load. The highest approved rate I can offer is fourteen seventy. If that works for you, I can book it now.',
        },
      ],
      audio: {
        src: resolve05Agent,
        messageEventId: 'routine-message-05',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-05',
        headline: 'Bounded counter offered',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-bounded-negotiation' },
          { kind: 'decision', id: 'decision-within-policy' },
          { kind: 'context', id: 'ctx-commercial-params' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'authorizedCeiling',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'agreedRate',
          },
        ),
        fallbackDurationMs: 9064,
      },
    },
    {
      id: 'routine-15-carrier-confirms',
      events: [
        {
          id: 'routine-message-06',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'Yeah, fourteen seventy works. Go ahead and book it.',
        },
        {
          id: 'routine-confirmation-checking',
          type: 'northstar_result',
          northstarId: 'ns-explicit-booking-confirmation',
          status: 'checking',
          evidence:
            'The caller’s explicit confirmation is being evaluated before booking.',
        },
      ],
      audio: {
        src: resolve06Carrier,
        messageEventId: 'routine-message-06',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-06',
        headline: 'Carrier explicitly confirms',
        highlightRefs: refs(
          { kind: 'channel', id: 'channel-voice' },
          { kind: 'stage', id: 'stage-execute-outcome' },
          { kind: 'decision', id: 'decision-next-action' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'agreedRate',
          },
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
        ),
        fallbackDurationMs: 3239,
      },
    },
    {
      id: 'routine-16-confirmation-pass',
      events: [
        {
          id: 'routine-confirmation-pass',
          type: 'northstar_result',
          northstarId: 'ns-explicit-booking-confirmation',
          status: 'pass',
          evidence:
            'routine-message-06 explicitly confirms the $1,470 terms before routine-book-call.',
          severity: 'success',
        },
      ],
      presentation: {
        kind: 'northstar_result',
        primaryEventId: 'routine-confirmation-pass',
        headline: 'Explicit booking confirmation · PASS',
        highlightRefs: refs({
          kind: 'northstar',
          id: 'ns-explicit-booking-confirmation',
        }),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'agreedRate',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-work-item-status',
            field: 'status',
          },
        ),
        fallbackDurationMs: 1300,
      },
    },
    {
      id: 'routine-17-book-call',
      events: [
        {
          id: 'routine-book-call',
          type: 'tool_call',
          toolId: 'book-work-item',
          correlationId: 'routine-book-load',
          title: 'Book carrier',
          args: {
            loadId: '84721',
            carrierId: 'carrier-mc-145829',
            rate: 1470,
          },
        },
        {
          id: 'routine-integrity-checking',
          type: 'northstar_result',
          northstarId: 'ns-system-of-record-integrity',
          status: 'checking',
          evidence:
            'System writes are being checked before confirmation is sent.',
        },
      ],
      presentation: {
        kind: 'tool_call',
        primaryEventId: 'routine-book-call',
        headline: 'Commit the booking',
        highlightRefs: refs(
          { kind: 'tool', id: 'book-work-item' },
          { kind: 'stage', id: 'stage-execute-outcome' },
          { kind: 'system', id: 'tms' },
        ),
        currentFactRefs: facts(
          {
            source: 'context',
            contextSourceId: 'ctx-work-item',
            field: 'loadId',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-party-identity',
            field: 'carrierName',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-commercial-params',
            field: 'agreedRate',
          },
        ),
        fallbackDurationMs: 1200,
      },
    },
    {
      id: 'routine-18-tms-update',
      events: [
        {
          id: 'routine-book-result',
          type: 'tool_result',
          toolId: 'book-work-item',
          correlationId: 'routine-book-load',
          status: 'success',
          title: 'Booking committed',
          result: {
            bookingId: 'BK-84721-145829',
            status: 'BOOKED',
          },
          durationMs: 512,
        },
        {
          id: 'routine-tms-booking-update',
          type: 'system_update',
          systemId: 'tms',
          entityId: 'load-84721',
          title: 'TMS booking updated',
          changes: [
            {
              field: 'status',
              label: 'Status',
              before: 'OPEN',
              after: 'BOOKED',
              format: 'status',
            },
            {
              field: 'carrier',
              label: 'Carrier',
              before: null,
              after: 'Summit Transport',
            },
            {
              field: 'rate',
              label: 'Rate',
              before: 1420,
              after: 1470,
              format: 'currency',
            },
          ],
        },
      ],
      presentation: {
        kind: 'system_update',
        primaryEventId: 'routine-tms-booking-update',
        headline: 'TMS updated',
        summary:
          'The successful tool result and the resulting system state change remain separate events.',
        highlightRefs: refs(
          { kind: 'tool', id: 'book-work-item' },
          { kind: 'stage', id: 'stage-execute-outcome' },
          { kind: 'system', id: 'tms' },
        ),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'carrier',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'rate',
          },
        ),
        fallbackDurationMs: 1800,
      },
    },
    {
      id: 'routine-19-crm-update',
      events: [
        {
          id: 'routine-crm-call',
          type: 'tool_call',
          toolId: 'update-interaction-record',
          correlationId: 'routine-update-crm',
          title: 'Log interaction outcome',
          args: {
            carrierId: 'carrier-mc-145829',
            loadId: '84721',
            outcome: 'BOOKED',
          },
        },
        {
          id: 'routine-crm-result',
          type: 'tool_result',
          toolId: 'update-interaction-record',
          correlationId: 'routine-update-crm',
          status: 'success',
          title: 'Interaction logged',
          result: {
            interactionRecorded: true,
          },
          durationMs: 347,
        },
        {
          id: 'routine-crm-system-update',
          type: 'system_update',
          systemId: 'crm',
          entityId: 'carrier-mc-145829',
          title: 'CRM interaction updated',
          changes: [
            {
              field: 'lastInteraction',
              label: 'Last interaction',
              before: null,
              after: 'Just now',
            },
            {
              field: 'outcome',
              label: 'Outcome',
              before: null,
              after: 'Load 84721 booked',
            },
            {
              field: 'conversationLogged',
              label: 'Conversation logged',
              before: false,
              after: true,
              format: 'boolean',
            },
          ],
        },
        {
          id: 'routine-interaction-context',
          type: 'context_update',
          contextSourceId: 'ctx-interaction-state',
          title: 'Interaction state updated',
          changes: [
            {
              field: 'outcome',
              label: 'Interaction outcome',
              before: null,
              after: 'Load 84721 booked',
            },
            {
              field: 'confirmationStatus',
              label: 'Confirmation',
              before: null,
              after: 'PENDING',
              format: 'status',
            },
          ],
        },
      ],
      presentation: {
        kind: 'system_update',
        primaryEventId: 'routine-crm-system-update',
        headline: 'CRM interaction logged',
        highlightRefs: refs(
          { kind: 'tool', id: 'update-interaction-record' },
          { kind: 'system', id: 'crm' },
          { kind: 'context', id: 'ctx-interaction-state' },
        ),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'crm',
            entityId: 'carrier-mc-145829',
            field: 'lastInteraction',
          },
          {
            source: 'system',
            systemId: 'crm',
            entityId: 'carrier-mc-145829',
            field: 'outcome',
          },
          {
            source: 'system',
            systemId: 'crm',
            entityId: 'carrier-mc-145829',
            field: 'conversationLogged',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-interaction-state',
            field: 'confirmationStatus',
          },
        ),
        fallbackDurationMs: 1800,
      },
    },
    {
      id: 'routine-20-send-confirmation',
      events: [
        {
          id: 'routine-confirmation-call',
          type: 'tool_call',
          toolId: 'send-confirmation',
          correlationId: 'routine-send-confirmation',
          title: 'Send booking confirmation',
          args: {
            loadId: '84721',
            carrierId: 'carrier-mc-145829',
            channels: ['sms', 'email'],
          },
        },
        {
          id: 'routine-confirmation-result',
          type: 'tool_result',
          toolId: 'send-confirmation',
          correlationId: 'routine-send-confirmation',
          status: 'success',
          title: 'Confirmation delivered',
          result: {
            sms: 'sent',
            email: 'sent',
          },
          durationMs: 436,
        },
        {
          id: 'routine-confirmation-context',
          type: 'context_update',
          contextSourceId: 'ctx-interaction-state',
          title: 'Confirmation state updated',
          changes: [
            {
              field: 'confirmationStatus',
              label: 'Confirmation',
              before: 'PENDING',
              after: 'SENT',
              format: 'status',
            },
          ],
        },
        {
          id: 'routine-confirmation-notification',
          type: 'notification',
          channel: 'SMS and email',
          summary:
            'Booking confirmation sent to Summit Transport for load 84721 at $1,470.',
        },
      ],
      presentation: {
        kind: 'notification',
        primaryEventId: 'routine-confirmation-notification',
        headline: 'Confirmation sent',
        highlightRefs: refs(
          { kind: 'tool', id: 'send-confirmation' },
          { kind: 'stage', id: 'stage-execute-outcome' },
        ),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-interaction-state',
            field: 'confirmationStatus',
          },
          {
            source: 'system',
            systemId: 'crm',
            entityId: 'carrier-mc-145829',
            field: 'outcome',
          },
        ),
        fallbackDurationMs: 1700,
      },
    },
    {
      id: 'routine-21-agent-confirms',
      events: [
        {
          id: 'routine-message-07',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'Done. Summit Transport is booked on load eight four seven two one at fourteen seventy. I’m sending the confirmation now. Is there anything else I can help with?',
        },
      ],
      audio: {
        src: resolve07Agent,
        messageEventId: 'routine-message-07',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-07',
        headline: 'Booking confirmed to carrier',
        highlightRefs: refs(
          { kind: 'stage', id: 'stage-execute-outcome' },
          { kind: 'tool', id: 'book-work-item' },
          { kind: 'tool', id: 'update-interaction-record' },
          { kind: 'tool', id: 'send-confirmation' },
        ),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'carrier',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'rate',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-interaction-state',
            field: 'confirmationStatus',
          },
        ),
        fallbackDurationMs: 10553,
      },
    },
    {
      id: 'routine-22-carrier-close',
      events: [
        {
          id: 'routine-message-08',
          type: 'message',
          speaker: 'customer',
          channel: 'voice',
          text: 'No, that’s it. Thanks.',
        },
      ],
      audio: {
        src: resolve08Carrier,
        messageEventId: 'routine-message-08',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-08',
        headline: 'Carrier has no further request',
        highlightRefs: refs({ kind: 'channel', id: 'channel-voice' }),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-interaction-state',
            field: 'confirmationStatus',
          },
        ),
        fallbackDurationMs: 2168,
      },
    },
    {
      id: 'routine-23-agent-close',
      events: [
        {
          id: 'routine-message-09',
          type: 'message',
          speaker: 'agent',
          channel: 'voice',
          text: 'You’re all set. Have a safe trip.',
        },
      ],
      audio: {
        src: resolve09Agent,
        messageEventId: 'routine-message-09',
      },
      presentation: {
        kind: 'conversation',
        primaryEventId: 'routine-message-09',
        headline: 'Interaction closed',
        highlightRefs: refs({ kind: 'channel', id: 'channel-voice' }),
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'crm',
            entityId: 'carrier-mc-145829',
            field: 'outcome',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-interaction-state',
            field: 'confirmationStatus',
          },
        ),
        fallbackDurationMs: 2403,
      },
    },
    {
      id: 'routine-24-complete',
      events: [
        {
          id: 'routine-integrity-pass',
          type: 'northstar_result',
          northstarId: 'ns-system-of-record-integrity',
          status: 'pass',
          evidence:
            'routine-tms-booking-update and routine-crm-system-update followed successful tool results before routine-confirmation-notification.',
          severity: 'success',
        },
        {
          id: 'routine-run-completed',
          type: 'run_completed',
          title: 'RESOLVED AUTONOMOUSLY',
          summary:
            'Summit Transport is booked on load 84721 at $1,470 with TMS and CRM state complete.',
          outcomeItems: [
            'Carrier booked',
            'TMS updated',
            'CRM interaction logged',
            'Confirmation sent',
          ],
          severity: 'success',
        },
      ],
      presentation: {
        kind: 'run_complete',
        primaryEventId: 'routine-run-completed',
        headline: 'RESOLVED AUTONOMOUSLY',
        summary: '4 evaluated · 4 passed · 0 human escalations',
        highlightRefs: [],
        currentFactRefs: facts(
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'status',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'carrier',
          },
          {
            source: 'system',
            systemId: 'tms',
            entityId: 'load-84721',
            field: 'rate',
          },
          {
            source: 'context',
            contextSourceId: 'ctx-interaction-state',
            field: 'confirmationStatus',
          },
        ),
        fallbackDurationMs: 2400,
      },
    },
  ],
  expectedOutcome: {
    status: 'resolved',
    humanEscalation: false,
    summary:
      'Resolve the routine interaction autonomously after four Northstars pass.',
  },
  businessImpact: {
    indicativeHumanMinutesAvoided: 5.8,
    notes: [
      'Illustrative interaction outcome; scaled impact remains an economics-model question.',
    ],
  },
  notes: [
    'SIMULATED DEPLOYMENT RUN',
    'All carrier, load, rate, system, and timing details are fictional case data.',
  ],
} satisfies DemoRunDefinition

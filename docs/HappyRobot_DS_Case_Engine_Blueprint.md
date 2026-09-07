# HappyRobot Deployment Strategist Case Engine
## Hyper-Detailed Product, UX, Architecture, Content & Build Specification

**Working title:** `happyrobot-case-engine`  
**Primary use:** HappyRobot Deployment Strategist case-study interview  
**Secondary use:** reusable customer-discovery / deployment-strategy workbench  
**Owner:** Patricia Recarte  
**Document status:** architecture + product specification, intended to be handed directly to Cursor / an AI coding agent or used as the build bible for manual implementation  
**Version:** v0.2  
**Locked v0.2 addition:** reusable simulated deployment-run / prototype layer with future live-provider architecture  

---

# 0. Executive summary

This project should **not** be built as a normal slide deck exported to HTML. It should be built as a small, reusable web application that behaves like a hybrid of:

- **Prezi** — spatial navigation and zooming between levels of detail;
- **a consulting case** — clear problem structuring, quantified diagnosis, economics, and recommendation;
- **a product demo** — clickable architecture, workflows, integrations, controls, and an end-to-end simulated deployment run that visibly updates operational systems and governance state;
- **a deployment-strategy workbench** — the case itself lives in structured data and can be replaced without rewriting the UI.

The design goal is that the interviewer feels Patricia is **walking through an operating system for the case**, not presenting slides.

The conceptual journey is:

> **What is happening? → How does the work happen? → Where is value being lost? → What should change? → How would HappyRobot execute it? → Can we show the deployment operating end-to-end? → How would we deploy it safely? → What impact should we expect?**

The application should therefore have six core navigable spaces:

1. **Current State** — customer, volumes, people, systems, service levels, and headline economics.
2. **Process** — how work happens today, step by step.
3. **Diagnosis** — bottlenecks, root causes, automation potential, cost/revenue leakage, and the main insight.
4. **Solution** — HappyRobot orchestration: channels/triggers, context, workflows/agents, tools, integrations, actions, human exceptions.
5. **Deployment** — pilot, integration work, testing, Northstars, evals, escalation, rollout, monitoring.
6. **Impact** — operational KPIs, economics, scenario sensitivities, payback, and expected business outcome.

The most important architectural principle is:

> **Presentation logic is code. Case-specific facts are data. HappyRobot platform knowledge is a third, separate layer.**

The finished case experience should also operate across **three user-facing layers**:

1. **Consulting / diagnosis layer** — understand the operating problem, quantify it, identify the root cause, and build the economic case.
2. **Solution-design / orchestration layer** — show how the target workflow should operate across channels, context, agentic reasoning, deterministic controls, tools, integrations, actions, governance, and human exceptions.
3. **Prototype layer** — run a clearly-labelled simulated interaction and make the proposed deployment visibly operate end-to-end: conversation, tool calls, system reads/writes, context changes, Northstar evaluation, escalation if relevant, and final run/business outcome.

The prototype layer is a **locked core requirement**, not an optional visual flourish. It should be implemented in a provider-agnostic way so the initial interview version can use scripted/simulated event streams while a future real HappyRobot provider can feed the same UI without redesigning the presentation.

The application should be reusable enough that when the actual case arrives Patricia should mainly be editing configuration files, not rebuilding screens.

---

# 1. Core product philosophy

## 1.1 The application is a case engine, not a deck

Do not think in terms of “slide 1, slide 2, slide 3”. Think in terms of **views of the same operating problem**.

A conventional deck forces a linear sequence. A Deployment Strategist conversation is rarely linear. An interviewer may interrupt with:

- “What system is the rate coming from?”
- “How did you calculate that saving?”
- “What happens if the agent cannot identify the carrier?”
- “What would you test before production?”
- “Is that a Northstar or a business KPI?”
- “Why do we need an agent rather than deterministic logic there?”

The application should allow Patricia to answer:

> “Sure — let me show you.”

…and navigate directly into that layer without waiting for “slide 9”.

That is one of the core reasons to build the project interactively.

## 1.2 Every interaction must reveal reasoning

Animation is not the point. Interactivity is only valuable when it reveals another layer of the case.

Useful interactions include:

- clicking a process step to expose volume, time, systems, judgment requirement, failure modes, and automation potential;
- clicking a bottleneck to show its economic consequence;
- clicking an integration to show what data is read and what actions are written;
- clicking a Northstar to show its rule, severity, trigger, and pass/fail evidence;
- changing an automation assumption to update the economics live;
- clicking a human-escalation branch to show exception types;
- clicking a result to show the formula behind it.

Avoid interactions whose only purpose is visual novelty.

## 1.3 Progressive disclosure

The default view must stay executive-friendly. Depth appears only when asked for.

A good rule:

- **Level 0:** one sentence / one number / one diagram.
- **Level 1:** 3–5 supporting facts.
- **Level 2:** process or technical detail.
- **Level 3:** formula, schema, test rule, or implementation note.

This allows Patricia to speak equally credibly to a COO and an engineer.

## 1.4 The case must have one memorable insight

Every case should converge on a single diagnosis that is stronger than “AI can automate this.”

For the logistics dummy case, the working insight is:

> **The bottleneck is not carrier communication. Humans are currently acting as the integration layer between carriers and fragmented operational systems.**

The application should reserve a strong visual moment for this sentence.

A good case-specific `narrative.ts` file should always contain:

- `keyInsight`
- `implication`
- `whyHappyRobot`
- `recommendation`
- `pilotThesis`

These should be editable without touching the UI.

---

# 2. What the finished experience should feel like

## 2.1 Opening view

The opening screen should feel like a **map of the case**, not a title slide.

Example composition:

```text
                         06 IMPACT
                             ○

              03 DIAGNOSIS         05 DEPLOYMENT
                    ○                    ○


                         01 CURRENT STATE
                               ◎
                          [Customer]


               02 PROCESS          04 SOLUTION
                    ○                    ○
```

The exact geometry may evolve, but the central idea should remain:

- the customer/current state is central;
- every major case layer is visibly related to it;
- the user can zoom into each layer;
- the map makes the narrative structure obvious without a conventional contents slide.

## 2.2 Presentation flow

Recommended default narrative path:

```text
Opening map
  ↓
Current State
  ↓
Process
  ↓
Diagnosis
  ↓
Key Insight
  ↓
Solution
  ↓
Deployment & Governance
  ↓
Impact
  ↓
Return to overview / recommendation
```

However, the application must support nonlinear navigation.

## 2.3 Navigation mechanics

Support at minimum:

- click on a section in the overview map;
- keyboard arrows for next/previous narrative step;
- `Esc` to zoom one level out;
- `Home` or `0` to return to overview;
- visible but subtle “Back” affordance inside deep detail views;
- breadcrumb such as:

```text
Atlas Freight / Solution / Tools / TMS
```

- optional mini-map/progress indicator;
- URL state if practical so a specific view can be refreshed without losing location.

Do **not** make navigation dependent on scroll position alone.

## 2.4 Zoom behavior

The Prezi-like effect should be elegant rather than theatrical.

Recommended animation behavior:

- duration: ~450–700 ms;
- easing: smooth cubic / spring with very little bounce;
- background remains stable where possible;
- selected object grows toward the viewer while unrelated items soften or fade;
- avoid spinning/rotating the entire canvas;
- avoid excessive parallax;
- preserve spatial context so the audience understands where they went.

Framer Motion shared-layout transitions are appropriate.

---

# 3. Technical stack

## 3.1 Recommended stack

Use:

- **Vite** — build/dev environment;
- **React** — reusable, stateful UI components;
- **TypeScript** — schemas and compile-time safety are important because cases are data-driven;
- **Framer Motion / Motion** — navigation transitions and zoom animation;
- **Lucide React** — minimal line icons;
- **CSS variables + CSS modules or a disciplined global token layer** — visual consistency;
- optional **Zod** — runtime validation of case config;
- optional **Recharts** only if a specific chart materially benefits from it; otherwise SVG/CSS is preferred;
- optional **XYFlow/React Flow** only if the workflow canvas becomes too complex to manage manually.

## 3.2 Avoid initially

Do not start with:

- a backend;
- authentication;
- a database;
- a full CMS;
- a huge component library;
- Tailwind if it encourages generic SaaS styling and makes design tokens harder to police;
- 3D/WebGL;
- complex chart packages for visuals that can be drawn more cleanly in SVG.

The application needs to be reliable on Patricia’s laptop with no network dependency during the interview.

## 3.3 Offline-first interview reliability

Presentation Mode must work locally if Wi-Fi dies.

Therefore:

- package important icons locally or use compiled icon components;
- do not depend on live external APIs;
- do not require HappyRobot endpoints;
- do not fetch the actual case data from a remote source;
- do not use externally hosted fonts unless a robust system-font fallback exists;
- ideally bundle the final chosen fonts or use web-safe/system equivalents, subject to licensing;
- provide a `npm run build` and preview workflow;
- verify on Chrome at Patricia’s presentation resolution.

---

# 4. Repository architecture

Create the project using the following structure.

```text
happyrobot-case-engine/
│
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CASE_AUTHORING.md
│   ├── HAPPYROBOT_REFERENCE.md
│   └── PRESENTATION_CHECKLIST.md
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.ts
│   │   ├── presentation-state.ts
│   │   ├── keyboard-shortcuts.ts
│   │   └── app-config.ts
│   │
│   ├── engine/
│   │   ├── CaseEngine.tsx
│   │   ├── ZoomCanvas.tsx
│   │   ├── NavigationController.tsx
│   │   ├── TransitionManager.tsx
│   │   ├── CaseProvider.tsx
│   │   ├── case-loader.ts
│   │   └── case-registry.ts
│   │
│   ├── prototype/
│   │   ├── RunEngine.ts
│   │   ├── RunProvider.ts
│   │   ├── event-normalizer.ts
│   │   ├── playback-clock.ts
│   │   ├── run-state.ts
│   │   ├── providers/
│   │   │   ├── SimulatedRunProvider.ts
│   │   │   └── HappyRobotRunProvider.ts
│   │   └── adapters/
│   │       ├── system-update-adapter.ts
│   │       └── context-update-adapter.ts
│   │
│   ├── components/
│   │   │
│   │   ├── core/
│   │   │   ├── AppShell.tsx
│   │   │   ├── SectionFrame.tsx
│   │   │   ├── DetailPanel.tsx
│   │   │   ├── ModalLayer.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── SourceBadge.tsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── OverviewMap.tsx
│   │   │   ├── OverviewNode.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── SectionNavigator.tsx
│   │   │   ├── MiniMap.tsx
│   │   │   └── BackButton.tsx
│   │   │
│   │   ├── metrics/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── MetricCluster.tsx
│   │   │   ├── MetricDelta.tsx
│   │   │   ├── CostCounter.tsx
│   │   │   ├── OpportunityCard.tsx
│   │   │   └── FormulaPopover.tsx
│   │   │
│   │   ├── process/
│   │   │   ├── ProcessFlow.tsx
│   │   │   ├── ProcessNode.tsx
│   │   │   ├── ProcessConnector.tsx
│   │   │   ├── BottleneckMarker.tsx
│   │   │   ├── ProcessDetail.tsx
│   │   │   ├── AutomationPotential.tsx
│   │   │   └── ExceptionBadge.tsx
│   │   │
│   │   ├── diagnosis/
│   │   │   ├── DiagnosisMap.tsx
│   │   │   ├── BottleneckCard.tsx
│   │   │   ├── RootCauseCard.tsx
│   │   │   ├── ConclusionStatement.tsx
│   │   │   ├── ValueLeakageCard.tsx
│   │   │   └── DiagnosisSummary.tsx
│   │   │
│   │   ├── solution/
│   │   │   ├── OrchestrationMap.tsx
│   │   │   ├── ChannelNode.tsx
│   │   │   ├── ContextNode.tsx
│   │   │   ├── WorkflowNode.tsx
│   │   │   ├── ToolNode.tsx
│   │   │   ├── IntegrationNode.tsx
│   │   │   ├── ActionNode.tsx
│   │   │   ├── HumanEscalation.tsx
│   │   │   ├── AgenticVsDeterministic.tsx
│   │   │   └── OrchestrationDetail.tsx
│   │   │
│   │   ├── governance/
│   │   │   ├── NorthstarCard.tsx
│   │   │   ├── NorthstarRing.tsx
│   │   │   ├── GuardrailPanel.tsx
│   │   │   ├── EvalResult.tsx
│   │   │   ├── TestScenario.tsx
│   │   │   ├── AdversarialTest.tsx
│   │   │   └── AuditTrace.tsx
│   │   │
│   │   ├── prototype/
│   │   │   ├── RunLauncher.tsx
│   │   │   ├── ScenarioSelector.tsx
│   │   │   ├── SimulationBadge.tsx
│   │   │   ├── LiveInteractionPanel.tsx
│   │   │   ├── ConversationTranscript.tsx
│   │   │   ├── EventTimeline.tsx
│   │   │   ├── EventPulse.tsx
│   │   │   ├── ToolCallCard.tsx
│   │   │   ├── ToolResultCard.tsx
│   │   │   ├── SystemFeed.tsx
│   │   │   ├── SystemUpdateCard.tsx
│   │   │   ├── ContextFeed.tsx
│   │   │   ├── ContextUpdateCard.tsx
│   │   │   ├── NorthstarRunPanel.tsx
│   │   │   ├── EscalationPanel.tsx
│   │   │   ├── RunSummary.tsx
│   │   │   ├── PlaybackControls.tsx
│   │   │   └── ProviderStatus.tsx
│   │   │
│   │   ├── economics/
│   │   │   ├── RoiBridge.tsx
│   │   │   ├── SavingsWaterfall.tsx
│   │   │   ├── ScenarioToggle.tsx
│   │   │   ├── AssumptionSlider.tsx
│   │   │   ├── ImpactSummary.tsx
│   │   │   ├── PaybackCard.tsx
│   │   │   └── SensitivityTable.tsx
│   │   │
│   │   ├── deployment/
│   │   │   ├── PilotPlan.tsx
│   │   │   ├── RolloutTimeline.tsx
│   │   │   ├── Workstream.tsx
│   │   │   ├── RiskRegister.tsx
│   │   │   ├── SuccessCriteria.tsx
│   │   │   └── ProductionReadiness.tsx
│   │   │
│   │   └── builder/
│   │       ├── CaseBuilder.tsx
│   │       ├── MetricsEditor.tsx
│   │       ├── AssumptionsEditor.tsx
│   │       ├── ProcessEditor.tsx
│   │       └── ValidationPanel.tsx
│   │
│   ├── cases/
│   │   │
│   │   ├── logistics-carrier-booking/
│   │   │   ├── index.ts
│   │   │   ├── metadata.ts
│   │   │   ├── company.ts
│   │   │   ├── current-state.ts
│   │   │   ├── processes.ts
│   │   │   ├── diagnosis.ts
│   │   │   ├── economics.ts
│   │   │   ├── solution.ts
│   │   │   ├── northstars.ts
│   │   │   ├── deployment.ts
│   │   │   ├── narrative.ts
│   │   │   ├── demo-runs/
│   │   │   │   ├── index.ts
│   │   │   │   ├── routine-booking.ts
│   │   │   │   ├── rate-negotiation.ts
│   │   │   │   └── exception-escalation.ts
│   │   │   └── sources.ts
│   │   │
│   │   └── TEMPLATE/
│   │       ├── README.md
│   │       ├── index.ts
│   │       ├── metadata.ts
│   │       ├── company.ts
│   │       ├── current-state.ts
│   │       ├── processes.ts
│   │       ├── diagnosis.ts
│   │       ├── economics.ts
│   │       ├── solution.ts
│   │       ├── northstars.ts
│   │       ├── deployment.ts
│   │       ├── narrative.ts
│   │       ├── demo-runs/
│   │       │   ├── index.ts
│   │       │   └── example.ts
│   │       └── sources.ts
│   │
│   ├── happyrobot/
│   │   ├── terminology.ts
│   │   ├── platform-model.ts
│   │   ├── workflow-types.ts
│   │   ├── governance.ts
│   │   ├── integrations.ts
│   │   ├── source-confidence.ts
│   │   └── sources.ts
│   │
│   ├── types/
│   │   ├── case.ts
│   │   ├── metric.ts
│   │   ├── process.ts
│   │   ├── diagnosis.ts
│   │   ├── workflow.ts
│   │   ├── northstar.ts
│   │   ├── deployment.ts
│   │   ├── economics.ts
│   │   ├── demo-run.ts
│   │   └── source.ts
│   │
│   ├── utils/
│   │   ├── calculations.ts
│   │   ├── format.ts
│   │   ├── derive-metrics.ts
│   │   ├── validate-case.ts
│   │   ├── source-label.ts
│   │   └── keyboard.ts
│   │
│   └── styles/
│       ├── tokens.css
│       ├── typography.css
│       ├── layout.css
│       ├── animations.css
│       ├── utilities.css
│       └── global.css
│
└── public/
    ├── logos/
    ├── icons/
    ├── customer-logos/
    └── assets/
```

---

# 5. Separation of concerns

This is the single most important engineering rule in the project.

## 5.1 Layer A — Presentation engine

The engine knows:

- what sections exist;
- where they live in the overview canvas;
- how to zoom into them;
- how to render reusable components;
- how to navigate back;
- how to animate a metric;
- how to open a detail panel;
- how to update derived economics when assumptions change;
- how to play, pause, reset, accelerate and normalize a deployment-run event stream;
- how to render the same prototype UI whether events come from a scripted simulation or a future live provider.

The engine must **not** know:

- what Atlas Freight is;
- how many calls it receives;
- what a carrier MC number is;
- which TMS is used;
- what the eventual HappyRobot interview case says.

## 5.2 Layer B — Case data

A case contains:

- customer name and description;
- industry and scenario;
- input facts;
- assumptions;
- metrics;
- process steps;
- bottlenecks;
- economics;
- proposed solution;
- integrations/tools;
- Northstars;
- deployment plan;
- prototype/demo-run scenarios;
- narrative;
- source provenance.

The case should mostly be plain TypeScript objects.

## 5.3 Layer C — HappyRobot platform reference

This layer holds reusable platform concepts that should not be reinvented per case.

Examples:

- Agents;
- Context;
- Governance;
- Interfaces;
- Workflows;
- Runs;
- tools/actions;
- integrations;
- Northstars;
- adversarial testing;
- audits/evals;
- public API / TypeScript SDK concepts;
- environment/version concepts where publicly supported.

This prevents case-specific assumptions from accidentally becoming claims about HappyRobot.

## 5.4 Source-confidence layer

Every platform claim and every case fact should optionally carry a source confidence level.

Recommended types:

```ts
export type Confidence =
  | 'confirmed-official'
  | 'confirmed-public-api'
  | 'strongly-supported-third-party'
  | 'case-provided'
  | 'assumption'
  | 'our-design';
```

Recommended display convention in Builder Mode only:

- green dot = official / case-provided;
- amber dot = strongly supported;
- blue dot = our explicit assumption/design;
- grey dot = placeholder.

Do not clutter Presentation Mode with these labels unless a particular assumption matters to the story.

---

# 6. Case schema

Create a single top-level `CaseConfig` type.

Illustrative structure:

```ts
export interface CaseConfig {
  metadata: CaseMetadata;
  company: CompanyProfile;
  currentState: CurrentState;
  processes: ProcessDefinition[];
  diagnosis: Diagnosis;
  economics: EconomicsModel;
  solution: SolutionDesign;
  northstars: Northstar[];
  deployment: DeploymentPlan;
  demoRuns: DemoRunDefinition[];
  narrative: CaseNarrative;
  sources: SourceReference[];
}
```

## 6.1 Metadata

```ts
interface CaseMetadata {
  id: string;
  title: string;
  subtitle?: string;
  industry: string;
  useCase: string;
  version: string;
  status: 'template' | 'dummy' | 'interview' | 'archived';
  currency: 'USD' | 'EUR' | 'GBP';
  locale: string;
}
```

## 6.2 Company

```ts
interface CompanyProfile {
  name: string;
  shortName: string;
  description: string;
  logo?: string;
  scaleLabel?: string;
  geography?: string[];
  businessModel?: string;
  operatingContext?: string[];
}
```

## 6.3 Metric

Never hard-code business numbers inside JSX.

```ts
interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  format?: 'number' | 'percent' | 'currency' | 'duration' | 'multiple';
  timeframe?: 'day' | 'month' | 'year' | 'interaction';
  description?: string;
  sourceId?: string;
  confidence?: Confidence;
  prominence?: 'hero' | 'primary' | 'secondary';
}
```

## 6.4 Process step

```ts
interface ProcessStep {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  avgSeconds?: number;
  shareOfInteractions?: number;
  systems?: string[];
  channels?: string[];
  people?: string[];
  humanJudgment: 'none' | 'low' | 'medium' | 'high';
  automationPotential: 'low' | 'medium' | 'high';
  failureModes?: string[];
  exceptions?: string[];
  painPoints?: string[];
  inputs?: string[];
  outputs?: string[];
  sourceIds?: string[];
}
```

## 6.5 Bottleneck

```ts
interface Bottleneck {
  id: string;
  title: string;
  summary: string;
  processStepIds: string[];
  category:
    | 'manual-work'
    | 'system-fragmentation'
    | 'capacity'
    | 'service-level'
    | 'error-risk'
    | 'revenue-leakage'
    | 'compliance'
    | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  quantifiedImpact?: Metric[];
  rootCause?: string;
}
```

## 6.6 Solution design

```ts
interface SolutionDesign {
  businessObjective: string;
  targetOutcomes: TargetOutcome[];
  channels: ChannelConfig[];
  contextSources: ContextSource[];
  workflows: WorkflowDesign[];
  tools: ToolDefinition[];
  integrations: IntegrationDefinition[];
  actions: ActionDefinition[];
  escalation: EscalationDesign;
}
```

## 6.7 Northstar

Keep Northstars distinct from business KPIs.

```ts
interface Northstar {
  id: string;
  name: string;
  rule: string;
  type: 'behavioral' | 'business';
  severity: 'advisory' | 'important' | 'critical';
  rationale?: string;
  evaluationMethod?: string;
  examplePass?: string;
  exampleFail?: string;
}
```

## 6.8 Deployment plan

```ts
interface DeploymentPlan {
  pilotScope: string;
  pilotDurationWeeks?: number;
  phases: DeploymentPhase[];
  workstreams: Workstream[];
  risks: DeploymentRisk[];
  successCriteria: SuccessCriterion[];
  productionReadiness: ProductionReadinessItem[];
}
```

---


## 6.10 Prototype / demo run

The case schema must support one or more **scripted deployment scenarios**. These are not videos and should not be encoded as animation instructions inside React components. They are structured event streams that the prototype engine plays.

```ts
interface DemoRunDefinition {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  mode: 'simulated';
  scenarioType:
    | 'happy-path'
    | 'negotiation'
    | 'exception'
    | 'escalation'
    | 'failure-recovery'
    | 'custom';
  channel: 'voice' | 'sms' | 'email' | 'chat' | 'webhook' | 'other';
  participants: DemoParticipants;
  initialState: DemoInitialState;
  events: DemoRunEvent[];
  expectedOutcome: DemoExpectedOutcome;
  businessImpact?: DemoBusinessImpact;
  notes?: string[];
}
```

The event stream should use a **normalized internal contract**. Do not make the UI depend directly on a HappyRobot-specific payload shape.

```ts
type DemoRunEventType =
  | 'run_started'
  | 'message'
  | 'intent_detected'
  | 'tool_call'
  | 'tool_result'
  | 'system_read'
  | 'system_update'
  | 'context_read'
  | 'context_update'
  | 'decision'
  | 'northstar_result'
  | 'escalation'
  | 'notification'
  | 'run_completed'
  | 'run_failed';

interface DemoRunEvent {
  id: string;
  atMs: number;
  type: DemoRunEventType;
  actor?: 'customer' | 'agent' | 'tool' | 'system' | 'human' | 'governance';
  title?: string;
  text?: string;
  payload?: Record<string, unknown>;
  sourceSystemId?: string;
  targetSystemId?: string;
  northstarId?: string;
  severity?: 'info' | 'success' | 'warning' | 'critical';
}
```

The important design constraint is:

> **A future live HappyRobot adapter should translate real runtime events into this normalized event contract. The components above the provider layer should not care whether a run is simulated or live.**

This is intentionally conservative. Until official runtime documentation/access confirms exact HappyRobot event semantics, the case engine should avoid claiming that internal labels such as `context_update` map one-to-one to a specific HappyRobot object or endpoint.


# 7. Dummy case: Atlas Freight carrier booking

The initial implementation should use a fictional company so the product can be built before the interview case arrives.

## 7.1 Company

**Name:** Atlas Freight  
**Type:** large freight brokerage / non-asset logistics provider  
**Use case:** inbound carrier calls, carrier qualification, rate discussion, and booking  
**Status:** explicitly fictional / placeholder case  

The case should feel operationally realistic but must never imply the figures are real HappyRobot customer data.

## 7.2 Placeholder current-state metrics

Recommended dummy values:

```text
Annual loads              850,000
Carrier calls/day           1,200
Carrier reps                   35
Average handling time        5.8 min
After-hours call share        18%
Abandonment rate              14%
Systems touched per call       3–4
Operating days/year           260
```

Add a visible `FICTIONAL DEMO DATA` badge in Builder Mode. In Presentation Mode either omit it if the title says “Illustrative case” or place a small footnote.

## 7.3 Current-state narrative

Working sentence:

> **Carrier operations remain highly phone-driven even though most of the information required to complete the interaction already exists digitally.**

Do not yet introduce HappyRobot.

The purpose of Current State is to establish facts, not sell the solution.

---

# 8. Current State view

## 8.1 Visual objective

The audience should understand the operating scale within 10 seconds.

Center:

**Atlas Freight / Carrier Operations**

Around it, 4–6 metrics:

- 1,200 calls/day;
- 35 reps;
- 5.8 min AHT;
- 14% abandoned;
- 18% after hours;
- 3–4 systems touched.

## 8.2 Three expandable clusters

### People

Potential detail:

- carrier sales reps;
- supervisors;
- after-hours team;
- escalation / compliance personnel.

### Volume

Potential detail:

- calls/day;
- peak periods;
- after-hours share;
- call mix by intent.

### Systems

Potential detail:

- TMS;
- carrier-management / qualification system;
- CRM;
- email / messaging;
- telephony.

Use generic system labels unless the actual case provides specific vendors.

## 8.3 Interaction

When a metric is clicked:

- selected metric enlarges;
- supporting explanation appears;
- if derived, formula can be opened;
- source/assumption badge visible in Builder Mode.

---

# 9. Process view

## 9.1 Purpose

The process view should answer:

> **What exactly does a human do today?**

It must be detailed enough to prove that the proposed automation is grounded in the workflow.

## 9.2 Initial process

Working flow:

```text
Carrier calls
   ↓
Identify carrier
   ↓
Identify load
   ↓
Check carrier eligibility
   ↓
Retrieve load / lane context
   ↓
Retrieve available rate
   ↓
Negotiate / confirm terms
   ↓
Book carrier
   ↓
Update TMS
   ↓
Send confirmation
```

This is deliberately modular so steps can be removed/reordered in the real case.

## 9.3 Example step object

```ts
{
  id: 'retrieve-rate',
  label: 'Retrieve rate',
  description: 'Rep opens the TMS or pricing source and retrieves the current approved rate for the load.',
  avgSeconds: 42,
  shareOfInteractions: 0.72,
  systems: ['TMS'],
  humanJudgment: 'low',
  automationPotential: 'high',
  painPoints: [
    'System switching',
    'Hold time while retrieving data',
    'No value-added human judgment'
  ],
  failureModes: [
    'Wrong load selected',
    'Stale rate manually repeated'
  ]
}
```

## 9.4 Node detail design

Collapsed node shows:

- label;
- optional icon;
- 1–2 tiny metadata chips.

Expanded node shows:

- process purpose;
- average time;
- share of calls;
- systems involved;
- judgment requirement;
- automation potential;
- failure modes;
- important exceptions.

## 9.5 Visual encoding

Automation potential:

- high = small warm-orange marker;
- medium = neutral/amber marker;
- low = dark/grey marker.

Do **not** turn the entire process into red/green traffic lights during the neutral Current Process view. Diagnosis should be the moment where issues become visually prominent.

---

# 10. Diagnosis view

## 10.1 Purpose

Diagnosis transforms the process from “what happens” into “why this operating model is inefficient”.

The visual trick should be that the audience recognizes the same process from the prior view, but certain nodes now become highlighted and quantified.

## 10.2 Working diagnosis

Possible placeholder conclusions:

- a high share of handling time is spent retrieving/transferring information;
- many calls require little discretionary judgment;
- after-hours demand creates service loss;
- humans duplicate data that already exists in systems;
- booking execution crosses multiple tools;
- high-volume routine work reduces rep availability for true negotiation / exceptions.

## 10.3 Example headline metrics

Illustrative only:

```text
63%  of handling time spent on retrieval / transfer
47%  of calls requiring low discretionary judgment
18%  of demand arriving outside standard hours
$X   annual addressable handling cost
```

Keep the formula behind each metric inspectable.

## 10.4 Root-cause structure

The diagnosis should distinguish symptom from root cause.

Example:

```text
SYMPTOM
Long carrier wait time

↓

IMMEDIATE CAUSE
Rep must search multiple systems

↓

ROOT CAUSE
No orchestration layer connecting conversation, context and execution
```

This structure is reusable across industries.

## 10.5 Key insight screen

The most visually important text moment in the entire presentation may be:

> **The bottleneck is not carrier communication. Humans are acting as the integration layer between carriers and fragmented operational systems.**

Supporting implication:

> **Automating the conversation alone will not solve the problem. The solution must retrieve context, make bounded decisions, execute actions across systems, and route genuine exceptions to humans.**

This is the bridge into HappyRobot.

---

# 11. Solution view — HappyRobot orchestration

## 11.1 Do not start with “three AI agents”

The solution should start with the operating requirement, then show the architecture required to deliver it.

The center of the visual can be a dark HappyRobot-inspired orchestration core surrounded by:

```text
Channels / Triggers
       ↓
Context
       ↓
Workflow + Agentic reasoning
       ↓
Tools / Integrations
       ↓
Actions
       ↓
Resolution or Human Exception
```

## 11.2 Recommended visual layout

```text
                     CARRIER
                        │
             Voice / SMS / Email
                        │
                        ▼
                HAPPYROBOT CORE
          ┌────────────────────────┐
          │ Intent / reasoning     │
          │ Workflow logic         │
          │ Context retrieval      │
          └──────────┬─────────────┘
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
     TMS       Carrier system      CRM
      │              │              │
      └──────────────┼──────────────┘
                     ▼
                  ACTIONS
          Quote / Book / Update
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      RESOLVED             HUMAN EXCEPTION
```

## 11.3 Context detail

Possible context items:

- carrier identity;
- MC / authority details where relevant;
- carrier status / qualification;
- customer/account rules;
- load ID;
- origin/destination;
- equipment requirement;
- pickup window;
- delivery window;
- approved/current rate;
- lane history;
- previous interaction state;
- relevant SOP/policy.

The actual case may have far fewer. Do not imply access to information that was not stated or assumed.

## 11.4 Tools

Potential tool set:

- find load;
- retrieve rate;
- verify carrier eligibility;
- retrieve lane details;
- create/update booking;
- update TMS status;
- send confirmation;
- create human escalation;
- log outcome.

Tools should be modelled as reusable objects.

## 11.5 Agentic vs deterministic logic

A sophisticated case should explicitly distinguish these.

Example:

**Agentic reasoning is appropriate for:**

- understanding natural-language intent;
- handling conversational variation;
- resolving ambiguous references;
- deciding which bounded workflow applies;
- negotiating within defined parameters if allowed;
- explaining outcomes.

**Deterministic logic is appropriate for:**

- validation rules;
- authorization checks;
- hard pricing boundaries;
- status transitions;
- required confirmation steps;
- calculation;
- routing based on explicit conditions.

The design should show HappyRobot as an orchestration system that can combine both rather than “LLM decides everything”.

## 11.6 Human escalation

Human escalation must be part of the architecture, not a footnote.

Potential exception categories:

- failed identity verification;
- carrier compliance issue;
- load data inconsistency;
- pricing outside permitted range;
- hazardous / specialized freight;
- claim or dispute;
- customer-specific approval required;
- repeated tool/API failure;
- low confidence / unresolved ambiguity.

The message should be:

> **Humans should own exceptions and judgment, not routine system orchestration.**

---

# 12. Northstars, governance, testing and evals

## 12.1 Important terminology rule

Do **not** use “Northstar” as a synonym for the commercial objective.

Maintain three explicit layers:

| Layer | Meaning | Example |
|---|---|---|
| Business objective | why the customer is doing the deployment | reduce routine carrier handling cost / improve coverage |
| Northstars / behavioral rules | what correct agent behavior must look like | never disclose load data before verification |
| Operational measurement | how we know the system is working | resolution rate, error rate, latency, escalation rate |

HappyRobot publicly positions Northstars inside the governance/evaluation layer. Public materials describe agent behavior being evaluated against technical and behavioral benchmarks and expose Northstars, adversarial agents, audits/tests as governance concepts.

## 12.2 Dummy Northstars

### NS-01 — Verify carrier before disclosure

**Rule:** Carrier identity/eligibility must be verified before load-specific information is disclosed.

**Severity:** Critical

**Pass example:** The workflow verifies the carrier against the authorized system, then provides load details.

**Fail example:** The agent gives the pickup address before verification.

### NS-02 — Authorized source for rate

**Rule:** Any quoted rate must originate from the approved pricing/TMS source and must not be invented from conversational context.

**Severity:** Critical

### NS-03 — Explicit booking confirmation

**Rule:** A booking cannot be committed until the carrier has explicitly confirmed the final agreed terms.

**Severity:** Critical

### NS-04 — Exception escalation

**Rule:** Compliance, claims, hazardous-material, or out-of-policy pricing conditions must be escalated to the designated human workflow.

**Severity:** Critical

### NS-05 — Accurate system write-back

**Rule:** Confirmation may only be communicated as complete after the booking action returns a successful system response.

**Severity:** Important/Critical

## 12.3 Visual concept

When the Governance layer is opened, place the agent/workflow in the center with Northstar cards around it.

Each can show:

```text
VERIFY CARRIER
PASS  98.7%
Critical
```

Clicking reveals:

- full rule;
- rationale;
- evaluation method;
- sample pass/fail;
- relevant workflow step.

## 12.4 Governance must be observable inside the prototype

Do not keep Northstars as static cards only. The prototype layer must show how governance behaves on a concrete interaction.

During a simulated run, relevant Northstars should move through states such as:

```text
PENDING → CHECKING → PASS
PENDING → CHECKING → FAIL / ESCALATE
```

The run should preserve evidence linking each evaluation to the interaction or system action that caused it.

Example:

```text
NS-01  Verify carrier before disclosure
        PASS
        Evidence: verify_carrier() returned eligible=true at 00:08,
                  before load details were disclosed at 00:18.
```

This must remain labelled as an **illustrative/simulated deployment run** until the UI is connected to a real HappyRobot runtime. The full prototype design is specified in the next section.

---


# 13. Prototype layer — simulated deployment runs

## 13.1 Status: locked core requirement

The prototype layer is now a **required part of the case engine**.

It should make the solution visibly operate rather than stopping at an architecture diagram.

The user-facing logic is:

> **We diagnosed the current operation → we designed the HappyRobot target state → now let me show you how one representative interaction would actually flow through it.**

This is the third layer of the case experience:

1. **Consulting layer** — diagnose and quantify the problem.
2. **Solution-design layer** — define the orchestration and controls.
3. **Prototype layer** — simulate the deployment executing end-to-end.

The prototype must be reusable across cases and must not be hard-coded specifically to carrier booking.

---

## 13.2 Why this matters in a Deployment Strategist case

A static architecture tells the interviewer that Patricia can design a plausible system.

A simulated run can demonstrate that she has thought through:

- what the customer actually says or does;
- which information has to be retrieved;
- which tool or integration is called;
- what changes inside the system of record;
- which conversational steps are agentic;
- which controls are deterministic;
- when a Northstar is evaluated;
- what triggers human escalation;
- what the final operational outcome looks like;
- how that individual interaction maps back to the business case.

It therefore acts as the bridge between **strategy** and **deployment reality**.

The demo should feel less like “look, I coded something” and more like:

> **This is my deployment hypothesis, made concrete enough to interrogate.**

---

## 13.3 The interaction should be explicitly labelled as simulated

Until the project is connected to an actual HappyRobot runtime, the UI must make the status unambiguous.

Recommended label:

```text
SIMULATED DEPLOYMENT RUN
```

Alternative:

```text
Illustrative prototype · simulated interaction
```

Use a small, elegant badge near the run controls. Do not put a giant warning banner across the experience.

Patricia can introduce it verbally as:

> “I mocked one representative interaction so I could make the deployment hypothesis tangible end-to-end.”

Never:

- imply a scripted call is a real HappyRobot call;
- fabricate a HappyRobot dashboard screenshot;
- represent invented payload formats as official HappyRobot runtime events;
- state that a specific context write, event name, or trace schema exists in HappyRobot unless confirmed by documentation/access.

The simulation increases credibility only if the distinction is transparent.

---

## 13.4 Initial dummy scenarios

The logistics/carrier-booking case should ship with at least three reusable scenarios.

### Scenario A — Routine booking / happy path

Purpose:

- demonstrate a standard interaction that can resolve autonomously;
- show context retrieval, operational-system lookup and write-back;
- show explicit confirmation before booking;
- finish with all relevant Northstars passing.

Illustrative narrative:

```text
Carrier calls about Load 84721
↓
Carrier identity is captured and verified
↓
Load is retrieved from TMS
↓
Current authorized rate is retrieved
↓
Carrier accepts
↓
Agent obtains explicit booking confirmation
↓
Booking is committed
↓
TMS changes OPEN → BOOKED
↓
CRM interaction is logged
↓
Operational context reflects the completed interaction
↓
Northstars evaluate PASS
↓
Run completes autonomously
```

### Scenario B — Rate negotiation

Purpose:

- show bounded agentic reasoning;
- demonstrate that natural-language negotiation can exist inside deterministic commercial limits;
- show repeated tool/context use if required;
- make clear the system never invents its own authorization boundary.

Illustrative narrative:

```text
Authorized initial rate: $1,420
Carrier asks: $1,500
Permitted autonomous ceiling: $1,470
Agent negotiates within policy
Carrier accepts: $1,470
Explicit confirmation obtained
Booking committed
```

Important design rule:

- the LLM/agent may decide **how to communicate and negotiate within the permitted band**;
- the allowed pricing band itself should come from deterministic policy/system data.

### Scenario C — Exception / escalation

Purpose:

- show that a good deployment is not measured only by autonomy;
- demonstrate safe handoff;
- make Northstars operational rather than decorative.

Possible dummy trigger:

- hazardous-material load;
- failed carrier eligibility;
- pricing request beyond allowed authority;
- disputed claim;
- repeated system/API failure.

Illustrative outcome:

```text
EXCEPTION IDENTIFIED
Hazardous-material booking requires human authorization.

Agent explains next step
↓
Relevant context is packaged
↓
Human operations queue receives escalation
↓
No unauthorized booking is committed
↓
Northstar: exception escalation → PASS
```

The visual message is:

> **Autonomy where bounded; escalation where judgment or authorization is required.**

---

## 13.5 Recommended run-launch UX

The prototype should be launched from the Solution / Orchestration area.

Recommended primary CTA:

```text
▶ Run carrier booking simulation
```

When a case is not logistics-specific, the label should come from data, for example:

```ts
runCtaLabel: 'Run customer interaction'
```

or:

```ts
runCtaLabel: 'Show the workflow in action'
```

The CTA should not dominate the entire case. It is a high-value interactive reveal after the target architecture has been understood.

Optional secondary control:

```text
Scenario
[ Routine booking ▾ ]
```

Dropdown / segmented options:

- Routine booking
- Rate negotiation
- Exception / escalation

For presentation safety, default to the shortest reliable happy-path run and keep the other scenarios available if the interviewer wants to go deeper.

---

## 13.6 Recommended screen composition during a run

The screen should transform from architecture view into a **live operating canvas**.

Recommended desktop composition:

```text
┌──────────────────────────────────────────────────────────────────────┐
│  SIMULATED DEPLOYMENT RUN                          01:12   ▮▮  1.0x │
├───────────────────────────────┬──────────────────────────────────────┤
│                               │                                      │
│  CONVERSATION                 │  LIVE SYSTEM ACTIVITY                │
│                               │                                      │
│  Carrier                      │  TMS                                 │
│  “Calling about load 84721…”  │  ✓ Load retrieved                   │
│                               │  ○ Booking pending                   │
│  HappyRobot                   │                                      │
│  “Let me check that…”         │  CRM                                 │
│                               │  ✓ Carrier matched                   │
│                               │  ○ Interaction pending               │
│                               │                                      │
│                               │  OPERATIONAL CONTEXT                 │
│                               │  ✓ Carrier identity                  │
│                               │  ✓ Load context                      │
│                               │                                      │
├───────────────────────────────┴──────────────────────────────────────┤
│  EVENT TRACE       tool_call → tool_result → context → response      │
├──────────────────────────────────────────────────────────────────────┤
│  NORTHSTARS     ✓ Verified carrier   ○ Rate source   ○ Confirmation │
└──────────────────────────────────────────────────────────────────────┘
```

This layout should remain readable from a shared screen during an interview.

Do not create five tiny developer-console panels. The objective is **executive-legible observability**.

---

## 13.7 Conversation panel

The conversation panel should feel alive but restrained.

Show:

- participant name / role;
- message text;
- timestamp optionally in deep detail;
- a subtle waveform or speaking indicator for voice scenarios;
- agent “working” state between user utterance and response;
- optional tool/activity chips below the relevant message.

Example:

```text
Carrier · Atlas Transport LLC
“I’m calling about load 84721 from Dallas to Houston. Is it still available?”

HappyRobot
[ Checking load... ]

HappyRobot
“Yes. Load 84721 is still available. The current rate is $1,420.”
```

For a voice simulation, do **not** need to generate synthetic audio for v1.

A silent visual transcript is sufficient and safer.

Future enhancement:

- optional prerecorded audio;
- optional text-to-speech;
- actual live voice if genuine HappyRobot access is available.

The architecture must not depend on audio being present.

---

## 13.8 Event feed / orchestration trace

The event trace is one of the most useful technical reveals, but it must remain understandable to a business audience.

Recommended event sequence:

```text
00:00  Run started
00:04  Carrier message received
00:06  Intent → rate_and_book
00:08  Tool call → verify_carrier
00:09  Tool result → eligible
00:11  Context → carrier matched
00:14  Tool call → find_load
00:15  TMS read → Load 84721
00:17  Tool call → retrieve_rate
00:18  TMS read → $1,420
00:21  Agent response
00:34  Carrier proposes $1,500
00:36  Decision → negotiation allowed
00:41  Agent proposes $1,470
00:49  Carrier confirms
00:51  Northstar → explicit confirmation PASS
00:52  Tool call → book_carrier
00:54  TMS write → BOOKED
00:55  CRM write → interaction logged
00:56  Context update → recent booking
00:57  Northstars → 4/4 PASS
00:58  Run completed
```

This trace is **our normalized prototype representation**, not a claim about the exact HappyRobot production trace UI or field names.

### Visual treatment

Use a vertical or horizontal event stream with event-category icons:

- speech bubble = message;
- small terminal/tool icon = tool call;
- database icon = system read/write;
- layered-circle icon = context;
- shield/check icon = Northstar;
- person/arrow icon = escalation;
- checkered flag = completed run.

Highlight the currently executing event in HappyRobot orange/working accent.

Completed items should visually settle into a neutral/success state.

---

## 13.9 System feeds: make consequences visible

A major reason to build the prototype is to show that the interaction **changes the operation**, not merely the transcript.

The run should support one or more system feeds such as:

- TMS;
- Salesforce;
- HubSpot;
- proprietary booking platform;
- WMS;
- ERP;
- ticketing platform;
- scheduling system;
- email/notification system.

For the dummy logistics case, use generic labels unless a named product is useful to the case.

### Example TMS panel

Before booking:

```text
LOAD 84721
Status       OPEN
Carrier      —
Rate         $1,420 offered
```

Animated update after booking:

```text
LOAD 84721
Status       OPEN      → BOOKED
Carrier      —         → Atlas Transport LLC
Rate         $1,420    → $1,470
Booked at    —         → 10:42:18
```

### Example CRM panel

```text
Atlas Transport LLC

Last interaction
3 days ago       → Just now

Outcome
—                → Load booked

Conversation
Not logged       → Logged

Follow-up
—                → None required
```

### Update animation rules

When a field changes:

1. lightly pulse the destination system card;
2. highlight old value briefly;
3. animate arrow / morph into new value;
4. settle the new value;
5. log a matching `system_update` event.

Do not use confetti, loud success animations, or dashboard theatrics.

The point is to make **write-back causality** obvious.

---

## 13.10 Context feed — terminology must remain conservative

A context-oriented panel is valuable because the interviewer can see what the agent knows before and after the interaction.

However, until official HappyRobot documentation/access confirms exact runtime semantics, default UI wording should be:

```text
OPERATIONAL CONTEXT
```

rather than automatically claiming:

```text
HAPPYROBOT CONTEXT MEMORY WRITE
```

Example:

```text
Carrier
Atlas Transport LLC

Preferred lanes
TX regional

Reliability
98.2%

Current interaction
Load 84721

Recent bookings
+ Load 84721 · Dallas → Houston · $1,470

Negotiation history
+ Accepted $1,470 · 10:42
```

The data model can still emit:

- `context_read`;
- `context_update`.

Those are **our normalized UI concepts**.

Once real HappyRobot semantics are known, the provider/adaptor layer can decide whether an event maps to:

- Context;
- workflow variables;
- session state;
- memories;
- external system state;
- another runtime object.

Do not hard-code that mapping prematurely.

---

## 13.11 Tool calls must distinguish invocation from result

Do not show a single magic event such as:

```text
✓ TMS updated
```

The prototype should be able to show:

```text
TOOL CALL
book_carrier(load=84721, carrier=atlas, rate=1470)

↓

TOOL RESULT
success=true
booking_id=BK-99218
```

Then:

```text
SYSTEM UPDATE
Load 84721 → BOOKED
```

This matters because it distinguishes:

- agent intention;
- tool invocation;
- system response;
- observable state change.

That is a much stronger deployment mental model.

The visible UI should normally use friendly labels, with raw arguments available only in a click/expand detail.

---

## 13.12 Northstars should evaluate live against the run

The run should include a persistent, compact Northstar rail.

Example initial state:

```text
○ Verify carrier before disclosure
○ Authorized rate source only
○ Explicit booking confirmation
○ Successful system write-back
```

As the run proceeds:

```text
✓ Verify carrier before disclosure
✓ Authorized rate source only
○ Explicit booking confirmation
○ Successful system write-back
```

Final:

```text
4 / 4 PASSED
```

For an escalation case:

```text
✓ Verification
✓ Restricted condition identified
✓ Human escalation triggered
✓ No unauthorized booking committed
```

The objective is to make governance feel like **runtime quality control**, not a policy appendix.

### Evidence view

Clicking a passed Northstar can show:

```text
Authorized rate source only
PASS

Evidence
retrieve_rate() returned $1,420 from TMS at 00:18.
The agent did not quote a rate before this event.
```

This evidence is simulated in scripted mode.

---

## 13.13 Human escalation choreography

When a scenario escalates, the interface should not simply stop.

Show the handoff as a complete operational event.

Example:

```text
HUMAN ESCALATION
Reason
Pricing request exceeds autonomous authority.

Context packaged
✓ Carrier identity
✓ Load details
✓ Current authorized rate
✓ Requested rate
✓ Conversation summary

Destination
Carrier Operations · Pricing Exceptions

Status
Queued
```

Then the agent communicates appropriately:

> “I need an operations specialist to approve that rate. I’ve passed them the load and pricing context so you won’t need to repeat everything.”

This demonstrates that the target state is not merely automation; it is **better allocation of human judgment**.

---

## 13.14 Run completion screen

After a run completes, the interface should pause on a concise summary.

Example:

```text
RUN COMPLETED

01:42              RESOLVED AUTONOMOUSLY
Duration           Outcome

3                  2
Tools called       Systems updated

4 / 4              0
Northstars passed  Human escalations
```

Then a small operational impact block:

```text
Interaction outcome
✓ Carrier booked
✓ TMS updated
✓ CRM logged
✓ Confirmation sent

Indicative human handling avoided
5.8 minutes
```

Do not imply that one simulated run proves the entire ROI model.

The prototype should distinguish:

- **interaction outcome** — what happened in this run;
- **scaled business case** — what would happen if this pattern applies across the modeled volume.

A CTA can connect the two:

```text
See modeled annual impact →
```

which navigates into Impact.

---

## 13.15 Tie the prototype back to the original diagnosis

The prototype should visually close the loop with the case's key insight.

Current-state operating model:

```text
Carrier
  ↓
Human rep
  ↓
TMS
  ↓
CRM
  ↓
Confirmation
```

Diagnosis:

> **Humans are acting as the integration layer.**

Target-state prototype:

```text
Carrier
  ↓
HappyRobot orchestration
  ├─→ TMS
  ├─→ CRM
  └─→ notification

Human
  ↑
Exceptions / judgment only
```

This is more powerful than displaying an isolated “before vs after” graphic because the audience has just watched the new model operate.

---

## 13.16 Event-driven architecture

The prototype UI must be driven by events rather than hard-coded `setTimeout()` sequences inside components.

### Provider contract

Create a provider interface conceptually similar to:

```ts
export interface RunProvider {
  id: string;
  mode: 'simulated' | 'live';
  start(runId: string): Promise<void>;
  pause?(): void;
  resume?(): void;
  stop(): void;
  subscribe(listener: (event: NormalizedRunEvent) => void): () => void;
}
```

### Initial provider

```text
SimulatedRunProvider
```

Responsibilities:

- load `DemoRunDefinition`;
- schedule events according to `atMs`;
- emit normalized events;
- support pause/resume/reset/speed;
- support deterministic replay;
- never require internet access.

### Future provider

```text
HappyRobotRunProvider
```

Responsibilities, once documentation/access exists:

- receive real runtime/session/run events;
- map them into the same normalized event contract;
- redact secrets/sensitive values where required;
- feed identical UI components.

The `HappyRobotRunProvider` should initially exist as a **stub/interface**, not as fabricated integration logic.

---

## 13.17 Normalized event model

Recommended internal types:

```ts
type NormalizedRunEvent =
  | RunStartedEvent
  | MessageEvent
  | IntentDetectedEvent
  | ToolCallEvent
  | ToolResultEvent
  | SystemReadEvent
  | SystemUpdateEvent
  | ContextReadEvent
  | ContextUpdateEvent
  | DecisionEvent
  | NorthstarResultEvent
  | EscalationEvent
  | NotificationEvent
  | RunCompletedEvent
  | RunFailedEvent;
```

Common base fields:

```ts
interface BaseRunEvent {
  id: string;
  runId: string;
  sequence: number;
  atMs: number;
  occurredAt?: string;
  severity?: 'info' | 'success' | 'warning' | 'critical';
  simulated: boolean;
}
```

### Message event

```ts
interface MessageEvent extends BaseRunEvent {
  type: 'message';
  speaker: 'customer' | 'agent' | 'human';
  channel: 'voice' | 'sms' | 'email' | 'chat';
  text: string;
}
```

### Tool call

```ts
interface ToolCallEvent extends BaseRunEvent {
  type: 'tool_call';
  toolId: string;
  toolLabel: string;
  args?: Record<string, unknown>;
}
```

### Tool result

```ts
interface ToolResultEvent extends BaseRunEvent {
  type: 'tool_result';
  toolId: string;
  status: 'success' | 'error';
  result?: Record<string, unknown>;
  durationMs?: number;
}
```

### System update

```ts
interface SystemUpdateEvent extends BaseRunEvent {
  type: 'system_update';
  systemId: string;
  entityId?: string;
  changes: Array<{
    field: string;
    before?: unknown;
    after: unknown;
  }>;
}
```

### Context update

```ts
interface ContextUpdateEvent extends BaseRunEvent {
  type: 'context_update';
  scope?: string;
  changes: Array<{
    field: string;
    before?: unknown;
    after: unknown;
  }>;
}
```

### Northstar result

```ts
interface NorthstarResultEvent extends BaseRunEvent {
  type: 'northstar_result';
  northstarId: string;
  result: 'pass' | 'fail' | 'not_applicable';
  evidence?: string;
}
```

### Escalation

```ts
interface EscalationEvent extends BaseRunEvent {
  type: 'escalation';
  reason: string;
  destination: string;
  contextFields?: string[];
  status: 'created' | 'queued' | 'accepted';
}
```

This contract is intentionally broader than the first dummy scenario so it can support future banking, insurance, customer support, collections, scheduling, sales, or operations cases.

---

## 13.18 Playback engine requirements

Presentation safety requires deterministic playback.

Support:

- start;
- pause;
- resume;
- restart;
- jump to next event;
- speed `0.5x`, `1x`, `1.5x`, `2x`;
- skip to summary;
- reset to initial state.

Keyboard shortcuts can optionally include:

```text
Space    pause/resume
R        restart
→        next event
S        skip to summary
Esc      exit prototype / return to solution
```

### Determinism

A simulated scenario must always replay identically unless explicitly designed as interactive branching.

Do not make the interview version dependent on random model output.

If audio is eventually added, transcript timing should be based on a known cue sheet or event timeline rather than browser speech recognition.

---

## 13.19 Interactive branching: later, not required for v1

The architecture can eventually support choices such as:

```text
Carrier asks for $1,500

[ Accept within policy ]
[ Counter at $1,470 ]
[ Escalate ]
```

However, do not prioritize this in the first build.

A scripted deterministic scenario is more reliable and still demonstrates the deployment concept.

Potential future type:

```ts
interface BranchEvent {
  type: 'branch';
  choices: Array<{
    id: string;
    label: string;
    nextEventId: string;
  }>;
}
```

Use only when it materially improves the case discussion.

---

## 13.20 Data ownership and update model

Each simulation must begin from an explicit `initialState`.

Example:

```ts
initialState: {
  systems: {
    tms: {
      load_84721: {
        status: 'OPEN',
        carrier: null,
        offeredRate: 1420,
        bookedRate: null
      }
    },
    crm: {
      carrier_atlas: {
        lastInteraction: '3 days ago',
        lastOutcome: null
      }
    }
  },
  context: {
    currentCarrier: null,
    currentLoad: null,
    interactionIntent: null
  },
  northstars: {
    verifyCarrier: 'pending',
    authorizedRate: 'pending',
    explicitConfirmation: 'pending',
    successfulWriteback: 'pending'
  }
}
```

`RunEngine` should derive current visible state by applying events in order.

This gives us:

- deterministic rewind/replay;
- ability to jump to an event;
- clean before/after diffs;
- easier testing;
- easy replacement of dummy data for the real case.

Do not mutate case configuration objects directly.

---

## 13.21 Example `routine-booking.ts`

```ts
export const routineBookingRun: DemoRunDefinition = {
  id: 'routine-booking',
  title: 'Routine carrier booking',
  description: 'Standard inbound carrier call resolved without human escalation.',
  mode: 'simulated',
  scenarioType: 'happy-path',
  channel: 'voice',

  participants: {
    customerLabel: 'Carrier',
    customerName: 'Atlas Transport LLC',
    agentName: 'HappyRobot'
  },

  initialState: {
    // system/context/northstar state defined separately
  },

  events: [
    {
      id: 'e01',
      atMs: 0,
      type: 'run_started',
      title: 'Inbound call received'
    },
    {
      id: 'e02',
      atMs: 1400,
      type: 'message',
      actor: 'customer',
      text: "Hi, I'm calling about load 84721 from Dallas to Houston. Is it still available?"
    },
    {
      id: 'e03',
      atMs: 2800,
      type: 'intent_detected',
      title: 'Intent detected',
      payload: { intent: 'rate_and_book' }
    },
    {
      id: 'e04',
      atMs: 3700,
      type: 'tool_call',
      title: 'Verify carrier',
      payload: { tool: 'verify_carrier', carrier: 'Atlas Transport LLC' }
    },
    {
      id: 'e05',
      atMs: 4500,
      type: 'tool_result',
      title: 'Carrier eligible',
      payload: { eligible: true, carrierId: 'CAR-1842' }
    },
    {
      id: 'e06',
      atMs: 5000,
      type: 'northstar_result',
      northstarId: 'verify-carrier',
      severity: 'success',
      payload: { result: 'pass' }
    },
    {
      id: 'e07',
      atMs: 5900,
      type: 'tool_call',
      title: 'Find load',
      payload: { tool: 'find_load', loadId: '84721' }
    },
    {
      id: 'e08',
      atMs: 6700,
      type: 'system_read',
      sourceSystemId: 'tms',
      title: 'Load retrieved',
      payload: {
        loadId: '84721',
        status: 'OPEN',
        route: 'Dallas → Houston',
        rate: 1420
      }
    },
    {
      id: 'e09',
      atMs: 7400,
      type: 'context_update',
      title: 'Operational context updated',
      payload: { currentCarrier: 'CAR-1842', currentLoad: '84721' }
    },
    {
      id: 'e10',
      atMs: 8600,
      type: 'message',
      actor: 'agent',
      text: 'Yes. Load 84721 is still available from Dallas to Houston at a current rate of $1,420.'
    },
    {
      id: 'e11',
      atMs: 11200,
      type: 'message',
      actor: 'customer',
      text: 'Can you do $1,470?'
    },
    {
      id: 'e12',
      atMs: 12200,
      type: 'decision',
      title: 'Counter within permitted range',
      payload: { proposedRate: 1470, withinAuthority: true }
    },
    {
      id: 'e13',
      atMs: 13600,
      type: 'message',
      actor: 'agent',
      text: 'I can do $1,470. Would you like me to book the load at that rate?'
    },
    {
      id: 'e14',
      atMs: 15800,
      type: 'message',
      actor: 'customer',
      text: 'Yes, book it.'
    },
    {
      id: 'e15',
      atMs: 16500,
      type: 'northstar_result',
      northstarId: 'explicit-confirmation',
      severity: 'success',
      payload: { result: 'pass' }
    },
    {
      id: 'e16',
      atMs: 17200,
      type: 'tool_call',
      title: 'Book carrier',
      payload: { tool: 'book_carrier', loadId: '84721', carrierId: 'CAR-1842', rate: 1470 }
    },
    {
      id: 'e17',
      atMs: 18300,
      type: 'tool_result',
      title: 'Booking successful',
      payload: { success: true, bookingId: 'BK-99218' }
    },
    {
      id: 'e18',
      atMs: 18800,
      type: 'system_update',
      targetSystemId: 'tms',
      title: 'TMS updated',
      payload: {
        entity: 'Load 84721',
        changes: [
          { field: 'status', before: 'OPEN', after: 'BOOKED' },
          { field: 'carrier', before: null, after: 'Atlas Transport LLC' },
          { field: 'bookedRate', before: null, after: 1470 }
        ]
      }
    },
    {
      id: 'e19',
      atMs: 19400,
      type: 'system_update',
      targetSystemId: 'crm',
      title: 'CRM interaction logged',
      payload: {
        entity: 'Atlas Transport LLC',
        changes: [
          { field: 'lastOutcome', before: null, after: 'Load booked' }
        ]
      }
    },
    {
      id: 'e20',
      atMs: 20100,
      type: 'context_update',
      title: 'Recent interaction added',
      payload: { recentBooking: 'Load 84721 · $1,470' }
    },
    {
      id: 'e21',
      atMs: 20800,
      type: 'northstar_result',
      northstarId: 'successful-writeback',
      severity: 'success',
      payload: { result: 'pass' }
    },
    {
      id: 'e22',
      atMs: 21800,
      type: 'message',
      actor: 'agent',
      text: "You're booked on load 84721 at $1,470. I've sent the confirmation."
    },
    {
      id: 'e23',
      atMs: 23200,
      type: 'run_completed',
      severity: 'success',
      title: 'Resolved autonomously'
    }
  ],

  expectedOutcome: {
    status: 'resolved',
    humanEscalation: false
  },

  businessImpact: {
    indicativeHumanMinutesAvoided: 5.8
  }
};
```

Treat the exact figures, systems and transcript as **dummy scenario data**, not claims about a real customer or HappyRobot's internal implementation.

---

## 13.22 Provider abstraction: simulated now, live later

The project should anticipate two execution modes.

### Mode A — Simulated

```text
DemoRunDefinition
      ↓
SimulatedRunProvider
      ↓
NormalizedRunEvent
      ↓
RunEngine
      ↓
Prototype UI
```

This is the interview-ready implementation.

### Mode B — Live, future

```text
HappyRobot runtime / API / SDK
      ↓
HappyRobotRunProvider
      ↓
Event normalizer
      ↓
NormalizedRunEvent
      ↓
RunEngine
      ↓
Same Prototype UI
```

The second mode should **not** be implemented from assumptions.

Only build it when:

- Patricia receives actual platform access; or
- official public documentation clearly supports the necessary runtime interaction; and
- authentication/security requirements are understood.

The UI therefore remains useful whether or not live access is ever obtained.

---

## 13.23 Security and demo hygiene for future live mode

If live mode is ever added:

- never embed long-lived API credentials in client-side code;
- use short-lived/scoped tokens where supported;
- avoid exposing customer-sensitive data in a public interview build;
- redact secrets from event traces;
- use synthetic/test records for interview/demo environments;
- separate demo/staging configuration from production;
- maintain a kill switch/fallback to simulation;
- cache nothing sensitive in browser storage unless explicitly required and safe.

For the interview version, simulation is preferred because it is deterministic, offline-capable and does not require access to real customer systems.

---

## 13.24 Visual style of the prototype

The prototype should inherit the core HappyRobot-inspired presentation language defined later in this specification.

### Background

Use either:

- warm beige canvas with white/frosted system cards; or
- dark orchestration core with lighter data panels around it.

### Active event

Use the working orange accent for:

- event pulse;
- active connector;
- currently executing tool;
- temporary state change;
- play/pause emphasis.

### Success

Use subdued green only after an action is confirmed.

Do not turn the whole interface green.

### Context

Use a distinct but restrained neutral/frosted visual treatment rather than another bright color category.

### Northstars

Use:

- neutral/pending;
- orange/checking;
- green/pass;
- red/fail only when needed.

### System changes

Show before → after with subtle motion.

The prototype should feel like **an executive observability interface**, not a developer log viewer.

---

## 13.25 Presentation choreography

Recommended spoken flow:

### Before launch

> “We've now designed the target workflow. Rather than leave it as an architecture diagram, I mocked one representative carrier interaction so we can see how the orchestration behaves end-to-end.”

Click **Run simulation**.

### During first retrieval

Allow the UI to work visually. Do not narrate every event.

When useful:

> “Here the important distinction is that the agent isn't inventing the rate — it's retrieving the authorized value from the system of record.”

### During write-back

> “And this is the part that matters operationally: resolution isn't the end of the conversation; the booking actually writes back into the TMS and logs the interaction.”

### Northstars

> “The governance layer is evaluated against the run rather than sitting separately as a policy document.”

### End

> “That's one interaction. The business case is what happens when this pattern is safe and repeatable across the addressable volume.”

Then navigate to Impact.

This should take roughly **45–90 seconds** in the default scenario.

---

## 13.26 Reusability requirements

Nothing in the prototype UI should assume:

- carriers;
- loads;
- TMS;
- rates;
- freight terminology.

Those concepts belong in case data.

The same components should be able to render:

### Banking collections

```text
Customer calls
→ verify identity
→ retrieve account
→ discuss balance
→ offer approved payment plan
→ update CRM/core system
→ log promise-to-pay
```

### Airline rebooking

```text
Passenger contacts airline
→ verify booking
→ retrieve disruption
→ find permitted alternatives
→ confirm option
→ change booking
→ send itinerary
```

### Insurance servicing

```text
Policyholder calls
→ verify identity
→ retrieve policy/claim
→ answer bounded query
→ update case
→ escalate regulated exception
```

This is the prototype equivalent of the project's overall final conceptual test:

> **Changing industries should primarily require different run definitions and system/context labels, not new prototype components.**

---

## 13.27 Builder Mode support

Builder Mode should eventually include a lightweight scenario editor.

Minimum fields:

```text
Scenario title
Scenario type
Channel
CTA label
Participants
Initial system state
Initial context state
Events
Expected outcome
Business-impact note
```

Do not prioritize a graphical timeline editor initially.

A simple structured editor / JSON preview is enough.

Useful validation errors:

- event timestamps not monotonically increasing;
- Northstar referenced but missing from case;
- system update targets unknown system ID;
- `run_completed` missing;
- `tool_result` exists without prior matching `tool_call`;
- `system_update` happens before successful tool result where write-back should be causal;
- scenario marked happy path but contains unresolved critical failure.

This can become a useful quality-control tool even in the actual job.

---

## 13.28 Testing requirements for the prototype engine

Automated tests should cover:

### Run reducer

Given `initialState + events[0:n]`, derived state must be deterministic.

### Rewind

Resetting and replaying should produce identical final state.

### System update

Before/after values should apply correctly.

### Northstar state

Pending/checking/pass/fail transitions should render correctly.

### Pause/resume

No events should be lost or duplicated.

### Speed changes

Sequence must remain correct.

### Provider equivalence

A simulated provider and a mocked live provider emitting the same normalized event sequence should render the same final UI state.

### Presentation fallback

If prototype initialization fails, the application must show a clean static scenario summary and allow Patricia to continue the case.

Never let a demo failure trap the entire presentation.

---

## 13.29 Presentation fallback strategy

A live interview needs graceful degradation.

Provide three fallback levels:

### Level 1 — Full simulation

Animated event stream, system updates, context, Northstars.

### Level 2 — Instant replay / summary

If animation has issues, click:

```text
Show completed run
```

and render final state immediately.

### Level 3 — Static architecture

If the entire prototype component fails, return to Solution and explain the workflow using the existing orchestration diagram.

The case must still be excellent without the demo.

This prevents technical ambition from becoming interview risk.

---

## 13.30 Definition of done for prototype v1

Prototype v1 is complete when:

- [ ] at least one dummy run plays deterministically offline;
- [ ] a visible simulated-run label is always present;
- [ ] transcript/messages update during playback;
- [ ] at least one tool call and tool result are shown;
- [ ] at least one external system read is shown;
- [ ] at least two external system fields visibly update;
- [ ] operational context visibly changes;
- [ ] at least three Northstars transition from pending to pass/fail;
- [ ] human escalation can be demonstrated in a separate scenario;
- [ ] final run summary is shown;
- [ ] final run summary links naturally into Impact;
- [ ] pause/restart/skip controls work;
- [ ] the same UI can accept a provider other than `SimulatedRunProvider`;
- [ ] no UI component contains logistics-specific logic;
- [ ] no invented runtime format is represented as official HappyRobot documentation;
- [ ] a static fallback remains available.

---

## 13.31 Prototype anti-patterns

Avoid:

### Fake realism

Do not add fake “LIVE” indicators, fabricated latency counters or fake API request IDs purely to make the demo look production-grade.

### Developer-console overload

Do not make Patricia explain JSON logs during a business case.

### Magic agent

Do not skip directly from caller request to completed update. The value is showing context, tools, controls and causality.

### AI-everywhere

Do not imply every transition is LLM reasoning. Show deterministic controls explicitly.

### Happy path only

A deployment strategy must acknowledge exceptions. At minimum, have an escalation scenario ready.

### Hard-coded timeline inside React

All business content belongs in the scenario/event data.

### Unverified HappyRobot semantics

Do not use platform-specific terms more precisely than public documentation/access supports.

### One-run-equals-ROI

One prototype interaction illustrates the operating model. It does not validate the annual economic model by itself.

---

## 13.32 Long-term potential if Patricia joins HappyRobot

If the architecture is built cleanly, this module could evolve from interview artifact into a reusable deployment-design aid.

Potential future workflow:

```text
Discovery notes
↓
Case configuration
↓
Current-state process map
↓
Target orchestration
↓
Scripted prototype run
↓
Customer validation
↓
Real workflow integration
↓
Live run provider
↓
Actual deployment observability
```

That is not required for the interview, but it is why the provider/event architecture is worth doing properly now.

---

# 14. Deployment view

## 14.1 Purpose

A strong DS case does not stop at architecture. The deployment section shows that Patricia understands production reality.

Answer:

- what gets built first;
- what must integrate;
- what data is required;
- how behavior is tested;
- how risk is controlled;
- what success looks like;
- how rollout expands.

## 14.2 Recommended four-phase pilot

### Phase 0 — Discovery & baseline

- map call intents;
- confirm volumes;
- verify baseline handling time;
- identify systems of record;
- map edge cases;
- define data/access requirements;
- agree commercial/business objective;
- define measurable pilot KPIs.

### Phase 1 — Build & integrate

- telephony/channel setup;
- TMS read access;
- carrier-system access;
- booking/write-back action;
- workflow design;
- human escalation path;
- logging/observability.

### Phase 2 — Test & calibrate

- synthetic cases;
- happy paths;
- edge cases;
- adversarial cases;
- Northstar evaluation;
- latency testing;
- failure/retry behavior;
- permission / security verification;
- shadow or controlled production if appropriate.

### Phase 3 — Pilot & expand

- restricted call segment / lane / business unit;
- monitor quality and resolution;
- compare against baseline;
- tune workflow;
- expand intents/volume only after success gates are met.

## 14.3 Suggested pilot scope

Start narrow enough to learn quickly.

Example:

> **Inbound carrier calls for standard dry-van loads on predefined lanes, covering rate inquiry + booking where carrier qualification and pricing remain inside predetermined policy bounds.**

Initially exclude:

- specialized/hazardous freight;
- claims;
- unusual contractual conditions;
- out-of-policy pricing;
- failed verification;
- customer-specific exception flows.

## 14.4 Deployment workstreams

Represent as parallel horizontal tracks:

```text
Workflow        █████████████████
Integrations    █████████████
Governance        ███████████████
Testing              ████████████
Operations           █████████████
Measurement      █████████████████
```

Workstream details:

### Workflow

- intent taxonomy;
- conversation design;
- deterministic gates;
- action sequencing;
- exception routing.

### Integrations

- credentials/access;
- API mappings;
- read/write permissions;
- error handling;
- idempotency where necessary;
- test environment.

### Governance

- Northstars;
- access controls;
- prohibited actions;
- human approvals;
- audit expectations.

### Testing

- custom test suite;
- adversarial tests;
- known edge cases;
- failure simulations.

### Operations

- human escalation queue;
- ownership;
- launch communications;
- supervisor workflow;
- incident path.

### Measurement

- baseline;
- target metrics;
- pilot dashboard;
- weekly review cadence;
- expansion gates.

---

# 15. Impact and economics

## 15.1 Principle

Never manually type an ROI answer into the UI when it can be derived from assumptions.

Economics should be calculated in code.

## 15.2 Baseline formulas

Illustrative:

```ts
annualInteractions = callsPerDay * operatingDays;

annualHandlingHours =
  annualInteractions * averageHandlingMinutes / 60;

addressableInteractions =
  annualInteractions * addressableShare;

automatedInteractions =
  addressableInteractions * automationRate;

automatedHandlingHours =
  automatedInteractions * averageHandlingMinutes / 60;

grossLaborCapacityValue =
  automatedHandlingHours * fullyLoadedHourlyCost;
```

Do not automatically call that “hard cost savings”. Depending on the case, it may be **capacity released**, not headcount removed.

## 15.3 Economic value categories

Separate:

### Hard-dollar cost

Only use if the scenario actually supports it.

Examples:

- avoided outsourced call cost;
- overtime reduction;
- reduced incremental hiring;
- vendor consolidation.

### Capacity release

- rep hours freed;
- peak capacity;
- after-hours coverage;
- higher book of business per rep.

### Revenue / margin

Potential examples:

- fewer abandoned carrier opportunities;
- faster booking;
- higher load coverage;
- improved conversion;
- reduced leakage.

Only quantify if the case provides sufficient evidence or clearly label assumptions.

### Service

- faster response;
- 24/7 availability;
- shorter handling/wait time;
- consistent execution.

### Risk / quality

- fewer manual-entry errors;
- stronger policy adherence;
- consistent audit trail;
- reduced unauthorized actions.

## 15.4 Scenario controls

Presentation Mode can contain 2–3 polished scenario toggles:

```text
Conservative     Base     Upside
     ○             ●         ○
```

Builder Mode can expose raw sliders:

```text
Addressable share          [ 55% ]
Automation rate            [ 60% ]
Fully loaded hourly cost   [ $42 ]
AHT                         [ 5.8m]
Operating days             [260  ]
```

Update economics live.

## 15.5 Formula transparency

Clicking a result should optionally show:

```text
Annual carrier calls
= 1,200/day × 260 days
= 312,000

Addressable calls
= 312,000 × 55%
= 171,600
```

That makes Patricia’s economic reasoning auditable and prevents “magic consulting numbers”.

---

# 16. Presentation Mode vs Case Builder Mode

## 16.1 Presentation Mode

Default URL:

```text
/
```

or:

```text
/?case=logistics-carrier-booking
```

Characteristics:

- no input boxes;
- no development labels;
- no source-confidence metadata unless intentionally shown;
- elegant animations;
- large readable typography;
- keyboard navigation;
- no accidental selection of text;
- no browser-looking editor UI;
- no external network dependency.

## 16.2 Builder Mode

Possible route:

```text
/builder?case=logistics-carrier-booking
```

or development query:

```text
/?edit=true
```

Builder Mode can expose:

- all case metrics;
- raw assumptions;
- process steps;
- economics controls;
- source/confidence flags;
- schema-validation warnings;
- “missing required field” warnings;
- narrative text;
- ability to preview any section.

It does **not** need to be a production-grade no-code editor in v1.

The first version may simply provide a helpful internal control panel bound to the data objects.

## 16.3 Why Builder Mode matters

When the real case arrives, Patricia can:

1. duplicate `cases/TEMPLATE`;
2. paste the case facts;
3. enter assumptions;
4. map process steps;
5. validate the economics;
6. preview the case visually;
7. spend the remaining time on reasoning rather than formatting.

This is the core productivity advantage of the project.

---

# 17. HappyRobot visual language and brand usage

## 17.1 Important distinction: official brand assets vs project styling

HappyRobot’s public Media Kit provides official **black and white icon, wordmark, and full-logo variants**. It also specifies the company name as **HappyRobot** — one word with a capital H and capital R.

The public materials do **not**, from the sources reviewed for this specification, provide a complete official color-system document with canonical hex values.

Therefore:

- use official black/white logo assets from the HappyRobot Media Kit;
- do not redraw the logo;
- do not stretch or distort it;
- do not recolor the official mark into a made-up orange variant;
- treat the color tokens below as a **recommended presentation palette inspired by HappyRobot’s current visual language and our prior interactive presentation**, not as an official HappyRobot brand guide.

## 17.2 Recommended working palette

The previous interactive presentation established a premium warm-neutral language with dark ink, warm beige, white/frosted cards and selective accent color. For HappyRobot, keep this structure but replace ElevenLabs-style pastel orb emphasis with a more industrial, confident **black + warm beige + orange** language.

Recommended CSS tokens:

```css
:root {
  /* Core neutrals */
  --hr-ink: #0C0A09;
  --hr-ink-soft: #1C1917;
  --hr-canvas: #FAF8F5;
  --hr-beige: #F3EDE6;
  --hr-beige-2: #E9DED2;
  --hr-white: #FFFFFF;

  /* Text */
  --hr-text: #0C0A09;
  --hr-muted: #756E67;
  --hr-subtle: #A49B92;

  /* Borders */
  --hr-hairline: rgba(12, 10, 9, 0.11);
  --hr-border-strong: rgba(12, 10, 9, 0.20);

  /* Working accent — PRESENTATION token, not claimed official brand hex */
  --hr-orange: #FF6B2C;
  --hr-orange-dark: #D9551C;
  --hr-orange-soft: #FFE7D8;
  --hr-orange-faint: #FFF4ED;

  /* Semantic */
  --success: #167A57;
  --success-bg: #E3F5ED;
  --warning: #9A6414;
  --warning-bg: #F8EDD7;
  --danger: #B84732;
  --danger-bg: #F8E5E1;
  --info: #466A86;
  --info-bg: #E8F0F5;
}
```

If visual comparison against current HappyRobot assets later suggests a different orange, modify only `--hr-orange` and related scale tokens — never hunt/replace values throughout components.

## 17.3 Recommended color hierarchy

### Black / ink

Use for:

- key typography;
- HappyRobot orchestration core;
- section title emphasis;
- primary callouts;
- strong buttons;
- selected navigation.

### Warm beige

Use for:

- large canvases;
- diagnostic/deployment regions;
- context layers;
- subtle separation without cold corporate grey.

### Orange

Use sparingly for:

- selected state;
- automation opportunity;
- pulse traveling through workflow;
- HappyRobot action/orchestration emphasis;
- key transition from current state to future state;
- small chart highlights.

Do not make every component orange.

### White

Use for:

- floating detail cards;
- data surfaces;
- “system” panels;
- clear product-style interfaces.

## 17.4 Dark sections

A dark section can be used for one or two moments only:

- the key insight;
- the HappyRobot solution/orchestration core;
- the final recommendation.

Recommended:

```css
background: #0C0A09;
color: #FFFFFF;
```

with warm orange glow used subtly.

Avoid a fully dark presentation because the current-state/economics work benefits from light analytical surfaces.

---

# 18. Logo rules

## 18.1 Use official assets

Preferred:

- Full Logo Black on light canvas;
- Full Logo White on dark canvas;
- Icon Black or Icon White only where compact navigation requires it.

## 18.2 Placement

Recommended:

- small HappyRobot logo in top-left application chrome or intro map;
- customer logo/name as the central case entity;
- HappyRobot logo should appear more strongly once the narrative reaches Solution, not dominate Current State.

Reason: the first half is customer diagnosis. It should not look like a sales pitch in search of a problem.

## 18.3 Sizing

Logo should generally be visually secondary to the case title.

Do not put a huge HappyRobot logo on every view.

## 18.4 Naming

Always write:

**HappyRobot**

Not:

- Happy Robot
- happyrobot
- HAPPYROBOT

except where reproducing a literal URL or code package naming.

---

# 19. Typography

## 19.1 Carry over the strongest rule from the prior interactive deck

Use a **serif display face + clean sans-serif UI face**.

The previous presentation used:

- `EB Garamond` for large editorial titles;
- `Inter` for functional/UI copy.

That combination worked because it prevented the experience from looking like a generic SaaS dashboard.

Recommended starting point:

```css
--font-display: 'EB Garamond', Georgia, serif;
--font-ui: 'Inter', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

If a later HappyRobot-specific design review suggests another display font, keep the role distinction.

## 19.2 Scale

Suggested desktop sizes:

```text
Hero / giant insight        64–88 px
Section title               44–58 px
Subsection title            26–34 px
Large metric                48–72 px
Card heading                15–18 px
Body                         13–16 px
Micro-label                  10–11 px
```

## 19.3 Editorial treatment

Use italic display serif selectively for contrast:

> “The bottleneck is not **communication**. It is **orchestration**.”

Do not over-italicize operational UI.

## 19.4 Label styling

Micro labels:

```css
font-size: 10px;
font-weight: 500;
letter-spacing: 0.10em;
text-transform: uppercase;
color: var(--hr-muted);
```

This was a successful pattern in the prior presentation and should remain.

---

# 20. Layout rules

## 20.1 General canvas

Target desktop presentation first.

Recommended content width for reading sections:

```text
960–1160 px
```

However, the zoom overview may use the full viewport.

## 20.2 Spacing

Use generous whitespace.

Recommended base scale:

```text
4, 8, 12, 16, 24, 32, 40, 48, 64, 80
```

Do not pack dashboards densely simply because screen space exists.

## 20.3 Cards

Carry over the prior deck’s frosted / premium card language:

```css
background: rgba(255,255,255,0.62);
border: 1px solid rgba(12,10,9,0.14);
border-radius: 14px to 20px;
backdrop-filter: blur(6px);
box-shadow: very subtle or none;
```

Avoid generic heavy drop shadows.

## 20.4 Hairlines

Use thin lines to structure information.

```css
border-color: rgba(12,10,9,0.10);
```

This is preferable to multiple grey panel backgrounds.

---

# 21. Component visual rules

## 21.1 Metric cards

A metric card should contain:

1. giant number;
2. short label;
3. optional timeframe/source;
4. optional subtle trend/qualifier.

Never make a metric card read like a paragraph.

## 21.2 Process nodes

Neutral state:

- white/frosted;
- thin border;
- dark label;
- tiny metadata chips.

Diagnosis state:

- bottleneck halo or border;
- severity marker;
- optional economic value.

Future-state/Solution state:

- HappyRobot-managed steps can receive orange pulse/accent;
- system-of-record nodes remain neutral;
- human exceptions use dark outline rather than danger-red by default.

## 21.3 Connectors

Default:

- thin neutral line;
- arrow only when direction matters.

Animated future-state connector:

- small orange pulse traveling along the edge;
- keep animation subtle and slow;
- honor `prefers-reduced-motion`.

## 21.4 Pills/chips

Use for short metadata only:

```text
TMS
LOW JUDGMENT
42 SEC
READ + WRITE
CRITICAL
```

Do not turn every sentence into a pill.

## 21.5 Detail panels

A detail panel should feel like opening a product object.

Header:

- title;
- category;
- one-sentence purpose.

Body:

- structured data;
- assumptions;
- rule/logic;
- supporting metrics.

Footer:

- source/assumption note in Builder Mode;
- related objects.

---

# 22. Motion system

## 22.1 Motion principle

Motion should communicate:

- navigation;
- flow;
- execution;
- change from current to future state.

## 22.2 Allowed motion patterns

- spatial zoom;
- fade/scale;
- connector pulse;
- count-up metric on first reveal;
- process node morph from neutral to diagnosed;
- light glow around selected orchestration node;
- waterfall bar animation.

## 22.3 Avoid

- confetti;
- constant bouncing;
- rotating 3D cards;
- excessive scroll-jacking;
- animation on every hover;
- flashing gradients;
- long transitions that slow the verbal presentation.

## 22.4 Reduced motion

Implement:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable continuous animation */
}
```

The presentation must remain understandable without motion.

---

# 23. Narrative rules

## 23.1 Current state = facts

Do not sell.

Bad:

> “HappyRobot could transform Atlas Freight’s inefficient carrier operations.”

Good:

> “Carrier reps handle 1,200 calls per day across three operational systems.”

## 23.2 Diagnosis = interpretation

Bad:

> “There is a big opportunity for AI.”

Good:

> “The majority of routine handling time is consumed by information retrieval and system write-back rather than negotiation.”

## 23.3 Solution = operating design

Bad:

> “Deploy an AI voice agent.”

Good:

> “Give the agent bounded access to carrier qualification, load, and rate data; combine conversational reasoning with deterministic booking gates; execute TMS write-back only after explicit confirmation; escalate defined exceptions.”

## 23.4 Economics = transparent assumptions

Bad:

> “Saves $2m.”

Good:

> “At a 55% addressable interaction share and 60% autonomous completion assumption, the system releases approximately X annual handling hours; the economic value depends on whether that capacity translates into avoided hiring, overtime reduction, or higher booking throughput.”

## 23.5 Recommendation = narrow first, then scale

The recommendation should normally be framed as:

> **Start with the high-volume, low-judgment workflow that offers clear system access and measurable outcomes; prove reliability; then expand into adjacent intents and more complex exception handling.**

---

# 24. Source discipline

## 24.1 Case-provided facts

Store exactly as provided. Do not silently “fix” them.

## 24.2 Derived values

Mark as derived and store the formula.

## 24.3 Assumptions

Assumptions must be explicit.

Examples:

- fully loaded cost per hour;
- addressable share;
- automation rate;
- operating days;
- incremental revenue effect.

## 24.4 HappyRobot claims

Use a source-confidence model.

Preferred order:

1. official HappyRobot product/site/blog;
2. official HappyRobot public GitHub/SDK/API;
3. public OpenAPI hosted by HappyRobot if accessible;
4. API Evangelist mirror/analysis as secondary corroboration;
5. our own inference/design — explicitly identified as such.

## 24.5 Public HappyRobot concepts relevant to this engine

Current public HappyRobot materials support the following broad mental model:

- **Agents** — core execution layer;
- **Governance** — evaluating agent behavior, including Northstars, adversarial agents, audits/tests;
- **Context** — information agents generate, capture and learn from;
- **Interfaces** — ways humans interact with agents;
- **workflow logic** — agentic + deterministic behavior;
- **tools/integrations** — APIs and systems used to act;
- **developer tools** — public API / typed TypeScript SDK concepts;
- **workflow/run concepts** — useful for deployment/observability reasoning.

The presentation should use this language carefully without claiming non-public implementation details.

---

# 25. HappyRobot source references for the project

Maintain an internal `happyrobot/sources.ts` or `docs/HAPPYROBOT_REFERENCE.md` with references such as:

- HappyRobot homepage / platform overview: `https://www.happyrobot.ai/`
- HappyRobot Media Kit: `https://www.happyrobot.ai/blog/happyrobot-media-kit`
- HappyRobot workflow-engine article: `https://www.happyrobot.ai/blog/inside-happyrobots-workflow-engine` or localized equivalent
- HappyRobot Developer Tools page
- HappyRobot Governance / Northstars pages
- HappyRobot customer stories relevant to logistics
- HappyRobot GitHub organization / SDK examples
- API Evangelist HappyRobot repository: `https://github.com/api-evangelist/happyrobot`

Important: API Evangelist is third-party. Treat it as useful technical reconnaissance, not equivalent to official HappyRobot documentation.

---

# 26. Reusability workflow when the real case arrives

## 26.1 Step 1 — duplicate template

Copy:

```text
src/cases/TEMPLATE/
```

into:

```text
src/cases/<real-case-slug>/
```

## 26.2 Step 2 — enter facts before designing

Populate:

- company;
- volumes;
- process;
- systems;
- stated pain points;
- constraints;
- required output.

Do not start visually polishing before the facts are captured.

## 26.3 Step 3 — mark unknowns

Every missing item should be explicitly represented as:

- `unknown`;
- assumption;
- not required;
- to be tested during discovery.

## 26.4 Step 4 — derive diagnosis

Ask:

1. Where is human time spent?
2. Where is judgment actually required?
3. Which data already exists in systems?
4. Which actions need write access?
5. What fails today?
6. Where is the economic impact?
7. What is the real root cause?

## 26.5 Step 5 — write the one-sentence insight

Do this before building the solution.

## 26.6 Step 6 — design target operating model

Map:

- entry channel;
- context;
- decision/reasoning;
- deterministic logic;
- tool use;
- action;
- exception;
- governance;
- measurement.

## 26.7 Step 7 — pick pilot

Choose the smallest workflow that:

- matters economically;
- is measurable;
- has tractable integrations;
- has bounded risk;
- gives fast learning.

## 26.8 Step 8 — populate economics

Enter case inputs and only necessary assumptions.

## 26.9 Step 9 — hide irrelevant modules

The application should support config such as:

```ts
sections: {
  currentState: true,
  process: true,
  diagnosis: true,
  solution: true,
  deployment: true,
  impact: true
}
```

Subcomponents should also be optional.

## 26.10 Step 10 — rehearse nonlinear questions

Test jumping directly to:

- economics;
- integration detail;
- a Northstar;
- pilot plan;
- formula;
- human escalation.

---

# 27. Recommended build phases

## Phase 1 — Skeleton

Build only:

- app shell;
- overview map;
- six sections;
- basic navigation;
- case loader;
- typography/color tokens.

Definition of done:

- can navigate overview → any section → back;
- dummy case name and metrics come from data files.

## Phase 2 — Current State + Process

Build:

- metric cards;
- process flow;
- process node detail;
- source/assumption display in Builder Mode.

Definition of done:

- no business metric is hard-coded in JSX;
- changing process data changes the rendered map.

## Phase 3 — Diagnosis

Build:

- bottleneck mapping;
- severity state;
- diagnosis summary;
- key insight screen;
- root-cause chain.

## Phase 4 — Solution

Build:

- orchestration diagram;
- context/tools/integrations/action detail;
- human escalation;
- agentic vs deterministic explanation.

## Phase 5 — Prototype run engine

Build:

- normalized run-event types;
- `DemoRunDefinition` schema;
- `RunProvider` interface;
- `SimulatedRunProvider`;
- run reducer / derived run state;
- playback clock and deterministic replay;
- conversation panel;
- event timeline;
- tool-call / tool-result components;
- external-system read/write feeds;
- operational-context feed;
- live Northstar state;
- run completion summary;
- routine-booking dummy scenario;
- exception/escalation dummy scenario;
- pause/restart/skip controls;
- static fallback.

Create the `HappyRobotRunProvider` as an interface/stub only. Do **not** fabricate runtime integration logic before real documentation/access exists.

Definition of done:

- a scripted run can play completely offline;
- the same event stream always produces the same final state;
- system and context changes visibly follow the relevant tool events;
- Northstars move through pending/checking/pass/fail states;
- the prototype is clearly labelled simulated;
- no logistics-specific logic lives in reusable prototype components.

## Phase 6 — Governance + Deployment

Build:

- Northstar ring/cards;
- evaluation evidence linked to prototype run events;
- pilot plan;
- workstream timeline;
- production-readiness checklist.

## Phase 7 — Economics

Build:

- calculation engine;
- scenario toggle;
- formula popover;
- impact summary;
- optional waterfall/sensitivity.

## Phase 8 — Builder Mode

Build:

- metrics editor;
- assumptions editor;
- prototype scenario selector/editor;
- run-event validation;
- validation panel;
- section preview.

## Phase 9 — Polish

- refine motion;
- improve responsiveness;
- keyboard shortcuts;
- presentation-safe focus states;
- pre-load assets;
- test offline;
- test screen-sharing compression.

---

# 28. Definition of done for interview readiness

The project is interview-ready only when all of the following are true:

### Reliability

- starts with one command;
- works without internet;
- no console errors;
- no layout shifts;
- no missing fonts/icons;
- no accidental broken links;
- every deep view has an obvious path back.

### Reusability

- customer name can change without code changes;
- headline metrics can change without code changes;
- process steps can be added/removed/reordered from the case data;
- integrations can be replaced from config;
- Northstars can be replaced from config;
- economics update from assumptions;
- sections can be hidden.

### Presentation quality

- audience understands current state in <15 sec;
- process fits comfortably on screen;
- diagnosis has one clear insight;
- solution architecture is legible at normal Zoom screen-share size;
- no paragraph exceeds what can comfortably be read while Patricia speaks;
- deep details are optional rather than forced.

### Prototype quality

- a clearly labelled simulated deployment run launches reliably from the Solution area;
- the default run can be completed in roughly 45–90 seconds;
- conversation, tool calls/results, system reads/writes and operational-context changes are visible;
- at least three Northstars visibly evaluate during the run;
- a separate exception/escalation scenario is available;
- run completion distinguishes interaction outcome from scaled annual ROI;
- pause/restart/skip controls work;
- the event model is provider-agnostic;
- `HappyRobotRunProvider` remains a stub until real access/documentation exists;
- static fallback works if the prototype fails.

### DS quality

- business objective separated from Northstars;
- agentic logic separated from deterministic rules;
- human escalation explicitly designed;
- system-of-record/source-of-truth logic is clear;
- pilot scope is bounded;
- economics distinguishes savings from released capacity;
- assumptions are transparent;
- path from diagnosis to architecture is logical.

---

# 29. Presentation checklist

Before the interview:

1. Open the case in Presentation Mode.
2. Kill Wi-Fi and verify it still works.
3. Enter full-screen mode.
4. Check the exact screen-share resolution.
5. Click every section and every intended interactive object.
6. Check `Esc` and Home behavior.
7. Verify all dummy/placeholder labels have been removed or clearly identified.
8. Validate calculations independently.
9. Confirm every HappyRobot-specific claim is sourced or clearly an architectural proposal.
10. Rehearse the story once linearly.
11. Rehearse once with interruptions and nonlinear jumps.
12. Run every simulated scenario from start to finish.
13. Confirm the simulated-run label is always visible.
14. Rehearse skipping the prototype entirely if interview time is short.
15. Rehearse the exception/escalation scenario in case the interviewer challenges the happy path.
16. Verify all system/context updates shown in the prototype have a clear reason and preceding event.
17. Keep a static PDF/screenshots as catastrophic technical backup if time permits.

---

# 30. Design anti-patterns

Do not build:

- a fake HappyRobot product screenshot pretending to be the actual UI;
- a huge workflow with 40 unreadable nodes;
- a conventional slide carousel disguised as a website;
- animations that require Patricia to wait before speaking;
- economics with opaque assumptions;
- a solution before diagnosis;
- “Northstars” that are actually ROI targets;
- a giant architecture that ignores human exceptions;
- an autonomous agent that can take unrestricted actions;
- fake technical precision about HappyRobot internals;
- a fake “LIVE” runtime when the interaction is scripted;
- a developer-console-style prototype that the business audience cannot follow;
- a magic agent that jumps from request to completed system update without showing tools/controls;
- a simulation where one successful run is presented as proof of the annual ROI;
- a UI so branded that the customer/problem disappears.

---

# 31. Why this can become useful in the actual role

If Patricia joins HappyRobot, the concept can evolve into a personal deployment-strategy toolkit.

Potential future uses:

- post-discovery meeting synthesis;
- customer process mapping;
- pilot hypothesis visualization;
- value/ROI modelling;
- executive readouts;
- solution architecture walkthroughs;
- rapid scripted prototypes of deployment behavior before live implementation;
- customer walkthroughs showing conversation → tools → system effects → governance;
- reusable industry templates;
- deployment readiness checklists;
- assumption tracking;
- scenario comparison.

A future version could support:

```text
Customer discovery notes
        ↓
Structured case config
        ↓
Process map
        ↓
Bottleneck diagnosis
        ↓
Deployment architecture
        ↓
Scripted prototype run
        ↓
Pilot plan
        ↓
Value case
```

The interview build should not attempt to implement all of this now. The architecture should simply avoid blocking that future.

---

# 32. Suggested Cursor implementation instructions

When giving this specification to Cursor, use the following operating rules:

1. **Read this entire document before writing code.**
2. Create the repository structure before implementing complex components.
3. Build a minimal functioning vertical slice before adding polish.
4. Never hard-code Atlas Freight case values inside reusable components.
5. Every reusable component must receive typed props.
6. Keep HappyRobot platform reference data separate from case data.
7. Never claim an invented UI element is an actual HappyRobot product screen.
8. Keep business objectives, Northstars and operational KPIs conceptually separate.
9. Treat the simulated deployment run as a core product requirement, not an optional animation.
10. Implement the prototype around a normalized event model and `RunProvider` abstraction.
11. Build `SimulatedRunProvider` first; create `HappyRobotRunProvider` only as a documented stub/interface until actual runtime documentation/access exists.
12. Never hard-code a scripted run through `setTimeout()` calls inside visual components; all scenario behavior belongs in demo-run data.
13. Ensure the prototype visibly connects conversation → tool call → tool result → system/context state change → Northstar evaluation → outcome.
14. Always display a subtle but unambiguous simulated-run label in scripted mode.
15. Provide pause, restart, skip-to-summary and static fallback behavior for presentation safety.
16. Use CSS design tokens; no repeated arbitrary hex colors in component files.
17. Use Framer Motion for spatial navigation but keep motion subtle.
18. Preserve keyboard navigation.
19. Build for desktop presentation first, then make it reasonably responsive.
20. Avoid adding dependencies unless they solve a real requirement.
21. Use accessible semantic HTML and visible keyboard focus states that remain elegant.
22. Add `prefers-reduced-motion` support.
23. Add clear comments only where architecture is non-obvious; avoid cluttering every line.
24. Add validation utilities that flag missing case fields and invalid demo-run event sequences.
25. Add a `TEMPLATE` case directory that is safe to duplicate, including a `demo-runs/` folder.
26. Add a clear README explaining how Patricia creates a new case and a new prototype scenario.
27. After each build phase, run the app and fix errors before moving on.

---

# 33. Recommended initial deliverables from Cursor

Ask Cursor to produce these in order, not simultaneously:

## Deliverable A — Foundation

- repo setup;
- type definitions;
- design tokens;
- app shell;
- case loader;
- dummy Atlas Freight data;
- overview map;
- six empty section routes/views.

## Deliverable B — Current State + Process

- MetricCard;
- MetricCluster;
- ProcessFlow;
- ProcessNode;
- ProcessDetail;
- populated dummy views.

## Deliverable C — Diagnosis

- diagnosis transformation of same process;
- BottleneckCard;
- RootCauseCard;
- ConclusionStatement;
- key insight transition.

## Deliverable D — HappyRobot solution

- OrchestrationMap;
- context;
- tools;
- integrations;
- actions;
- human escalation;
- agentic/deterministic distinction.

## Deliverable E — Prototype Run Engine

- normalized run-event model;
- `SimulatedRunProvider`;
- playback controls;
- conversation transcript;
- event trace;
- system-update feeds;
- operational-context feed;
- live Northstar evaluation state;
- run completion summary;
- routine-booking scenario;
- exception/escalation scenario;
- future `HappyRobotRunProvider` interface only;
- static fallback.

## Deliverable F — Governance + Deployment

- Northstar components;
- evaluation evidence linked to prototype events;
- pilot plan;
- timeline;
- success criteria.

## Deliverable G — Economics + Builder

- calculation functions;
- scenario toggle;
- formula display;
- builder controls;
- validation.

---

# 34. Final conceptual test

At any point in development, ask:

> **If I changed this tomorrow from “carrier booking at a freight broker” to “collections at a financial-services company” or “cargo rebooking at an airline”, how much code would I need to rewrite?**

The correct answer should increasingly be:

> **Almost none. I would primarily replace the case configuration, narrative, and prototype run definitions.**

The same test applies specifically to the prototype layer:

> **Can a banking, airline, insurance or support scenario reuse the same transcript, event-feed, system-update, context, governance and run-summary components?**

That is the standard by which the architecture should be judged.

---

# 35. One-line project thesis

> **Build a reusable interactive case engine that turns customer facts into an operating diagnosis, HappyRobot deployment design, simulated end-to-end deployment run, governance plan and quantified business case — with enough depth to zoom from executive story to implementation detail in real time.**

---

# 36. Short reference: current proposed case journey

```text
CURRENT STATE
What is happening?
  ↓
PROCESS
How does the work happen?
  ↓
DIAGNOSIS
Where and why is value lost?
  ↓
KEY INSIGHT
What is the real underlying constraint?
  ↓
SOLUTION
How should HappyRobot orchestrate the workflow?
  ↓
PROTOTYPE RUN
Can we make the proposed deployment tangible end-to-end?
Conversation → tools → system/context updates → Northstars → outcome
  ↓
GOVERNANCE + DEPLOYMENT
How do we make it safe, testable and production-ready?
  ↓
IMPACT
What operational and economic value should the customer expect?
```

The design, code architecture and case-authoring model should all reinforce this sequence.

---

## Appendix A — Proposed `narrative.ts` for dummy case

```ts
export const narrative = {
  opening:
    'Atlas Freight handles high-volume carrier interactions through a phone-led operating model spanning multiple systems.',

  currentState:
    'The operation is not information-poor; it is orchestration-heavy. Reps spend significant time retrieving and moving information that already exists digitally.',

  keyInsight:
    'The bottleneck is not carrier communication. Humans are acting as the integration layer between carriers and fragmented operational systems.',

  implication:
    'Automating the conversation alone will not solve the problem. The solution must retrieve context, apply bounded decision logic, execute actions and route genuine exceptions to humans.',

  solutionThesis:
    'Use HappyRobot to orchestrate routine carrier interactions across voice and operational systems while preserving deterministic controls around verification, pricing and booking.',

  pilotThesis:
    'Start with standard inbound rate-and-booking calls where carrier qualification, load data and pricing are available through defined systems and exception rules can be tightly bounded.',

  closing:
    'Prove safe autonomous execution on a narrow high-volume flow, then expand across adjacent carrier workflows as context, integrations and evaluation coverage compound.'
};
```

---

## Appendix B — Proposed design token file

```css
:root {
  --hr-ink: #0C0A09;
  --hr-ink-soft: #1C1917;
  --hr-canvas: #FAF8F5;
  --hr-beige: #F3EDE6;
  --hr-beige-2: #E9DED2;
  --hr-white: #FFFFFF;

  --hr-text: #0C0A09;
  --hr-muted: #756E67;
  --hr-subtle: #A49B92;

  --hr-hairline: rgba(12, 10, 9, 0.11);
  --hr-border-strong: rgba(12, 10, 9, 0.20);

  /* Working presentation accent; validate visually before final use. */
  --hr-orange: #FF6B2C;
  --hr-orange-dark: #D9551C;
  --hr-orange-soft: #FFE7D8;
  --hr-orange-faint: #FFF4ED;

  --success: #167A57;
  --success-bg: #E3F5ED;
  --warning: #9A6414;
  --warning-bg: #F8EDD7;
  --danger: #B84732;
  --danger-bg: #F8E5E1;
  --info: #466A86;
  --info-bg: #E8F0F5;

  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-pill: 999px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  --font-display: 'EB Garamond', Georgia, serif;
  --font-ui: 'Inter', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## Appendix C — Minimal case-creation checklist

When a new case is created, answer these before changing the UI:

### Customer
- Who are they?
- What operating unit/function are we solving for?
- What scale matters?

### Work
- What triggers the process?
- What does the human do step by step?
- Which systems are touched?
- What information is read?
- What actions are written?
- Which steps require real judgment?

### Problem
- Where is time spent?
- Where are delays/errors?
- What is the economic consequence?
- What is symptom vs root cause?

### Solution
- Which parts are conversational/agentic?
- Which must be deterministic?
- Which context is required?
- Which tools/integrations are required?
- What can the agent execute?
- What must escalate?

### Prototype run
- Which representative interaction best proves the target operating model?
- What should the customer/user say or do?
- Which tools should be called?
- Which system reads and writes should be visible?
- What operational context changes during the run?
- Which Northstars evaluate and when?
- What should escalate?
- What is the final interaction outcome?
- Is every event clearly sourceable to case data / our explicit design?

### Governance
- What must always happen?
- What must never happen?
- What is critical enough to block execution?
- How will correctness be evaluated?

### Deployment
- What is the narrowest valuable pilot?
- What access/integration work is required?
- How will testing work?
- What are rollout gates?

### Economics
- What is measured directly?
- What is derived?
- What is assumed?
- Is value hard-dollar, capacity, revenue, service, or risk?
- What changes under conservative/base/upside scenarios?

### Narrative
- What is the one-sentence diagnosis?
- Why is HappyRobot a structural fit for the problem?
- Why does the recommended pilot make sense?
- What is the expansion path?

---

**End of specification.**

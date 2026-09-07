# Architecture — HappyRobot Case Engine

## Layers

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Presentation engine | `src/app`, `src/engine`, `src/components` | Navigation, zoom, reusable UI |
| Case data | `src/cases/<slug>` | Customer facts, narrative, future demo runs |
| HappyRobot platform reference | `src/happyrobot` | Terminology, evidence axes, public sources |

Presentation logic must not know Atlas Freight. Cases must not encode UI layout. Platform claims must not become case assumptions.

## Canonical implementation sequence

This repository uses **five phases**. Older blueprint §27 numbering is retained only as mapped subphases — requirements are not deleted.

| Canonical phase | Scope | Blueprint §27 / deliverable map |
|-----------------|-------|----------------------------------|
| **Phase 1 — Foundation & Navigation** | Shell, tokens, case loader, overview map, keyboard/hash navigation, typed seams | Phase 1 Skeleton + Deliverable A |
| **Phase 2 — Current State, Process & Diagnosis** | Metrics, process flow, bottlenecks, key insight | Phases 2–3 + Deliverables B–C |
| **Phase 3 — Solution, Governance & Deployment** | Orchestration map, Northstars, pilot/deployment | Phases 4 + 6 + Deliverables D–F (minus prototype) |
| **Phase 4 — Simulated Deployment Run** | Normalized events, SimulatedRunProvider, playback UI, stub live provider | Phase 5 + Deliverable E |
| **Phase 5 — Impact, Economics & Final Polish** | ROI engine, scenario controls, polish, offline rehearsal | Phases 7 + 9 + Deliverable G (economics) |

### Subphase: Builder Mode

Blueprint Phase 8 / Builder Mode is an **optional Phase 5 subphase** after the interview-critical presentation path. Architecture must not make it impossible; it is not required for Phase 1–4.

## Navigation model

- Fixed `SectionId` union: `current-state | process | diagnosis | solution | deployment | impact` (+ overview location).
- Overview map is the spatial home. Hash URLs serialize `PresentationLocation` without React Router.
- Unimplemented sections render `DevelopmentPlaceholder` only — temporary, no invented analysis.

## Evidence model

Two independent axes:

- **Provenance:** `official | public-api | third-party | case-provided | our-design`
- **Confidence:** `confirmed | strongly-supported | inferred | assumption | placeholder | requires-validation`

## Northstars vs objectives vs KPIs

| Concept | Type | Meaning |
|---------|------|---------|
| Case / business objective | `BusinessObjective` | Why the customer is deploying |
| Operational KPI / economic outcome | `OperationalKpi` / economics | How success is measured |
| HappyRobot Northstar | `Northstar` with `NorthstarKind` | Behavioral/business governance rules |

Optional `NorthstarCategory` is case-engine organization only and does not redefine HappyRobot product taxonomy.

## Simulation seam (Phase 4)

Phase 1 defines `DemoRunDefinition` and `NormalizedRunEvent` ownership in case/types.

`RunProvider` is **intentionally deferred** until Phase 4 so the runtime consumption pattern is not frozen before HappyRobot documentation/access is available. Presentation components must not own event timelines.

Future shape (documented, not implemented):

```text
DemoRunDefinition → SimulatedRunProvider → NormalizedRunEvent → RunEngine → Prototype UI
HappyRobot runtime → HappyRobotRunProvider → same NormalizedRunEvent → same UI
```

## Case swap test

If freight carrier booking were replaced by banking collections tomorrow, nearly all changes should live under `src/cases/<new-slug>/`. Reusable presentation code should not change.

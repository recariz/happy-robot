# AGENTS.md — happyrobot-case-engine

## Read first

Before architectural changes, read the entire canonical blueprint:

`docs/HappyRobot_DS_Case_Engine_Blueprint.md`

Also read `docs/ARCHITECTURE.md` for the canonical five-phase sequence and layer boundaries.

## Architecture (non-negotiable)

1. Three layers: presentation engine (`src/app`, `src/engine`, `src/components`) / case data (`src/cases`) / HappyRobot platform reference (`src/happyrobot`). Never mix.
2. Never put Atlas Freight values or freight vocabulary in generic components.
3. No business numbers in JSX — all metrics come from case data.
4. HappyRobot platform claims live in `src/happyrobot/` with separate provenance and confidence metadata.

## Phase discipline

Use the canonical implementation sequence only:

1. Foundation & Navigation
2. Current State, Process & Diagnosis
3. Solution, Governance & Deployment
4. Simulated Deployment Run
5. Impact, Economics & Final Polish

Legacy blueprint phase numbers are subphases mapped in `docs/ARCHITECTURE.md`. Do not skip ahead without an explicit request.

## Case authoring

- New cases: duplicate `src/cases/TEMPLATE/`; never edit the logistics dummy case for a new customer.
- Mark fiction with `metadata.status: 'dummy'` and explicit placeholder sources.
- Case folders must not be imported from reusable UI/engine code except via `case-registry.ts` / `case-loader.ts`.

## HappyRobot credibility

- Write **HappyRobot** (one word, capital H and R).
- Use official black/white logos only when available locally; never redraw, distort, or recolor the mark.
- Color tokens are presentation tokens, not official brand hex values.
- Preserve HappyRobot Northstar kinds: `behavioral` | `business`.
- Keep these structurally separate:
  - business / case objectives
  - operational KPIs / economic outcomes
  - HappyRobot Northstars
- A HappyRobot Business Northstar is never the overall case objective.
- Label scripted runs **SIMULATED DEPLOYMENT RUN** when that layer exists.
- Do not invent HappyRobot capabilities. Prefer “Operational Context” until runtime semantics are confirmed.
- `RunProvider` / live adapters are deferred until Phase 4 and must not be fabricated.

## Prototype seam (future Phase 4)

- Event-driven only — no hard-coded timelines inside React components.
- Scenario data lives in `cases/*/demo-runs/*.ts`.
- Preserve the normalized event model and simulated/live provider seam.
- Treat tool invocation, tool result, and resulting system state change as separate events.

## Design system

- CSS variables from `src/styles/tokens.css` only — no arbitrary hex in components.
- Typography: EB Garamond / Georgia (display) + Inter / system sans (UI).
- Orange accent sparingly.
- Honor `prefers-reduced-motion`.
- Desktop presentation first.

## Navigation

- Six top-level sections on the overview map; prototype launches from Solution later.
- Support nonlinear navigation; never scroll-only navigation.
- Use the temporary `DevelopmentPlaceholder` only for unimplemented destinations; never invent case analysis there.

## Dependencies & reliability

- Stack: Vite, React, TypeScript, Framer Motion, Lucide, CSS modules/tokens.
- Avoid backend, auth, DB, Tailwind, 3D, React Flow, Redux unless a demonstrated need appears.
- Core presentation must work offline with no remote CDN/API dependency.
- Add dependencies only for demonstrated requirements and stay inside the approved build phase.

## Interaction rule

Every interaction must expose reasoning, hierarchy, causality, or state — not decoration.

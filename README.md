# HappyRobot Case Engine

Reusable interactive case-study application for HappyRobot Deployment Strategist interviews.

**Presentation logic is code. Case facts are data. HappyRobot platform knowledge is a third layer.**

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

Interview reliability: the production build must run offline. Do not depend on remote APIs for the core presentation.

## Phase 1 scope

Foundation & Navigation only:

- design tokens and app shell
- Atlas Freight dummy case loaded from data
- spatial overview map + six navigable destinations
- keyboard / hash navigation
- temporary `DevelopmentPlaceholder` for unimplemented sections

Later phases are mapped in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Canonical product specification: [`docs/HappyRobot_DS_Case_Engine_Blueprint.md`](docs/HappyRobot_DS_Case_Engine_Blueprint.md).

## Creating a new case

1. Duplicate `src/cases/TEMPLATE/`
2. Fill metadata, company, current state, narrative, sources
3. Register the case in `src/engine/case-registry.ts`
4. Keep freight/Atlas assumptions out of reusable components

## Agent rules

See [`AGENTS.md`](AGENTS.md).

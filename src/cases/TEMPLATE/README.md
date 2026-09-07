# Case template

Duplicate this folder when a real HappyRobot case arrives.

```text
src/cases/<new-case-slug>/
```

## Minimum Phase 1 fields

- `metadata.ts` — id, title, industry, useCase, status, currency, locale
- `company.ts` — name, shortName, description
- `current-state.ts` — headline + metrics (typed `Metric`, not JSX literals)
- `narrative.ts` — opening + keyInsight at minimum
- `sources.ts` — provenance + confidence for every claim
- `index.ts` — assemble `CaseConfig` and set `presentation.sectionStatus`

## Rules

1. Enter facts before designing visuals.
2. Mark unknowns as `assumption`, `placeholder`, or `requires-validation`.
3. Do not hard-code customer values into reusable components.
4. Register the case in `src/engine/case-registry.ts`.
5. Later modules (`processes`, `diagnosis`, `solution`, `northstars`, `deployment`, `economics`, `demoRuns`) stay optional until their section is implemented.

See `docs/HappyRobot_DS_Case_Engine_Blueprint.md` Appendix C for the full authoring checklist.

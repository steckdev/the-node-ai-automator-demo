---
type: 'agent_requested'
description: 'Auto-applies during TypeScript-focused refactors: JS→TS conversions, service/controller refactors, callback→async/await, and type‑safety hardening.'
---

- Scope & intent
  - Preserve external behavior and public APIs; write/augment regression tests first
  - Keep changes small and isolated to one module/domain per pass

- Type safety
  - No `any` or implicit `any`; add explicit return types on public functions
  - Prefer discriminated unions/enums over magic strings; use literal types where appropriate
  - Leverage narrowing and exhaustive `switch` on enums/unions
  - Use `readonly` for DTOs/config/constants; avoid mutating inputs

- Interfaces, DTOs, and validation
  - Define DTOs with class-validator/class-transformer; validate input at boundaries
  - Model precise shapes (no broad `Record<string, any>`); avoid leaking internal types
  - Keep transport types (DTOs) separate from domain models

- Async & error handling
  - Replace callbacks/promise chains with async/await
  - Centralize error semantics: services return domain results or throw typed errors; controllers translate to HttpExceptions
  - Use HttpStatus constants; never rely on numeric status literals

- Constants & readability
  - Extract magic numbers/strings into named constants/enums (single source of truth)
  - Prefer pure functions; keep methods focused and small
  - Follow existing export style (named vs default) consistently across the module

- Observability & security
  - Logging is actionable and structured; avoid noisy logs
  - No eval/dangerous APIs; never commit secrets; prefer parameterized queries/safe libs

- Swagger/OpenAPI
  - When DTOs/routes change, update decorators so Swagger stays accurate

- Verification commands (must pass before review)
  - `npm run lint:check` — style/type-aware linting
  - `npm run format:check` — formatting guardrail
  - `npm test` — unit tests (update/add as needed)
  - `npm run build` — type-check and compile
  - Treat any non-zero exit as a blocker; do not request review until all pass

- Refactor checklist (quick): behavior preserved • types strengthened • tests green • lint clean • build OK • swagger updated (if applicable)

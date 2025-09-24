---
type: always
title: Test Guidelines
description: Testing discipline for Jest. Applied to all changes; favors fast, focused verification.
---

- Always add/update tests when changing behavior; prefer smallest scope first: single test → file → package
- Use Jest unit tests by default; mock IO and external services; keep tests deterministic
- Follow TDD when practical: Red → Green → Refactor; keep tests green during refactors
- Commands: `npm test` (unit), `npm run lint` (style), `npm run build` (type/build check)
- Prefer composition/DI and pure functions; avoid global state
- Coverage focuses on critical paths; do not rely on snapshots for logic; assert behavior explicitly
- E2E tests only when needed; isolate ports/state; avoid real external side-effects
- Fail fast on non-zero exit; fix failing tests before adding features

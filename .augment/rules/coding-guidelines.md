---
type: 'agent_requested'
description: 'Core coding standards for this Node.js TypeScript codebase. Applied to all Agent & Chat operations.'
---

- Prefer TypeScript, follow SOLID and single-responsibility; keep methods focused and testable
- Use async/await only; handle errors consistently; no callback patterns
- Avoid magic numbers/strings; extract constants and enums
- Use clear, intention-revealing names; keep public APIs stable unless explicitly requested
- Input validation at public boundaries (DTOs/class-validator) and safe defaults
- Follow existing project patterns and smallest-change-first; keep diffs minimal
- Security: no eval/dangerous APIs; prefer parameterized and safe interfaces; never commit secrets
- Logging: actionable and consistent; include context and levels
- API docs (OpenAPI/Swagger) updated when touching HTTP endpoints
- Keep code self-explanatory; avoid comments unless truly necessary

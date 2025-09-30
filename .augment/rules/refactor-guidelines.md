---
type: "agent_requested"
description: "Apply when refactoring legacy/messy code, removing callback hell, magic numbers, or inconsistent error handling. Keep behavior identical and improve structure."
---

- Preserve external behavior and API; write/augment safety tests before and after
- Convert callbacks/promises chains to async/await; remove nested callbacks
- Extract magic numbers/strings into named constants; improve readability
- Centralize error handling; use Result types or exceptions consistently
- Strengthen types with DTOs/interfaces; remove any/implicit any; prefer readonly where possible
- Keep changes small and incremental; avoid cross-cutting edits in one pass

- After refactor: run `npm test`, `npm run lint`, `npm run build`; update API docs if endpoints changed

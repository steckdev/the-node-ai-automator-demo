---
type: manual
title: Review Guidelines
description: Attach for design/code reviews or PR preparation. Ensures production-readiness and demo consistency.
---

- Scope: small, focused changes; clear title; meaningful commits; branch naming: feat/_, fix/_, chore/\*
- Tests: updated/added; pass locally; meaningful assertions; edge cases covered
- Quality: names are clear; functions focused; no dead code; no magic numbers; constants used
- API: backward compatible where possible; explicit migrations if not
- Security: no secrets; safe APIs; input validation; avoid eval/dangerous patterns
- Performance: avoid unnecessary allocations/loops; consider hot paths
- Observability: actionable logs; useful messages; no noisy spam
- Docs: API docs (OpenAPI/Swagger) updated for HTTP changes; inline docs minimal and only when needed
- Verification: run `npm test`, `npm run lint`, `npm run build` before requesting review

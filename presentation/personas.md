# Audience Personas for AI‑Accelerated Backend Development

These four personas will guide the story arc and help tailor examples beyond Node.js while keeping Node-first.

---

## 1) Product‑Focused Node.js Engineer (IC)
- Goals: Ship features fast, reduce toil, keep tests green
- Pain: Boilerplate, flaky tests, refactors without clarity, PR cycles
- Cares about: Practical prompts, reproducible local flow, TDD acceleration
- Success = Less time on setup/rewrites, faster PR merge with confidence
- Slides/Demos to hit: Refactor Legacy → TDD → Copilot PR Review → Docs generation
- Monday Actions: Adopt demo scripts, enable Copilot PR review, start with TDD prompts

## 2) Backend Polyglot (Java/.NET/Python) working in Node‑adjacent teams
- Goals: Transfer patterns across stacks, avoid tool lock‑in
- Pain: Language‑specific examples that don’t generalize, differing CI cultures
- Cares about: Cross‑language prompts, platform‑agnostic checklists, CI patterns
- Success = Same AI workflow usable on any backend service
- Slides/Demos to hit: Platform‑agnostic checklist, Security quick wins, CI patterns
- Monday Actions: Add “backend‑agnostic” prompt pack, replicate CI jobs in other repos

## 3) Tech Lead / EM
- Goals: Consistency, velocity, onboarding, guardrails
- Pain: Inconsistent patterns, knowledge silo, PR churn, flaky pipelines
- Cares about: Standard prompts, quality gates, “definition of done” with AI
- Success = Predictable throughput with clear review signals
- Slides/Demos to hit: Team workflow, Definition of Done w/ AI, Docs-as-code
- Monday Actions: Add prompt catalog, enforce CI gates, adopt ADR/README templates

## 4) DevSecOps / Security Lead
- Goals: Risk reduction without slowing teams
- Pain: Secret leaks, dependency vulns, unreviewed AI output
- Cares about: SCA/CodeQL gates, secret scanning, AI usage policy
- Success = CI catches issues pre-merge; audit trails for AI interactions
- Slides/Demos to hit: Security quick wins, Supply-chain, Copilot permissions
- Monday Actions: Turn on dependency and secret scanning, set repo policies, add CodeQL


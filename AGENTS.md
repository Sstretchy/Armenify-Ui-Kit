# Armenify Me Codex Instructions

## Project

This repository is Armenify Me, a Next.js app for learning Armenian vocabulary.

Current goal:
Rewrite the UI layer and align the code UI kit with the Figma UI kit before rebuilding product flows.

## Jira

Use Atlassian MCP for Jira.

Atlassian Jira site URL:
https://armenifyme.atlassian.net

Atlassian cloudId:
23e304a3-d25b-4934-88ea-e8304a9af3ec

Jira project key:
ARM

Project:
ARM - ArmenifyMe

Issue types:
- Epic: Epic, id 10001
- Task: Task, id 10003
- Story: Story, id 10004
- Bug: Bug, id 10006

Rules:
- Do not guess the Atlassian tenant.
- Do not create Jira issues unless explicitly asked.
- Before creating issues, check required fields for the issue type.
- One Jira task should map to one PR.
- Branch names must include Jira key, for example: feature/ARM-12-implement-button.
- PR titles must include Jira key, for example: ARM-12 Implement Button component.
- Prefer small tasks with clear acceptance criteria.
- Do not introduce CSS `px` units in UI code or token definitions. Prefer existing design tokens first; if no token exists, use `rem`.
- Reuse existing abstractions before adding raw CSS or arbitrary values: prefer existing tokens, CSS variables, Tailwind theme mappings, utility aliases, and Figma effect-style aliases.
- Prefer the shared `Typography` component for text rendering whenever it can express the required style. Avoid hand-writing text size, weight, alignment, and tone classes when `Typography` already covers them.

## UI Priorities

When making UI decisions, follow this priority order:

1. Structure and best practices first.
   Prefer clean component boundaries, reusable abstractions, predictable APIs, and maintainable token-based styling over quick visual hacks.
2. Visual match with Figma second.
   After the structure is sound, align the result with Figma as closely as practical.
3. Styling flexibility third.
   Because this repository is a UI kit, prefer implementations that keep sensible extension points for size, tone, state, layout, and token-driven overrides.

If there is a tradeoff, do not sacrifice maintainable UI-kit structure just to mirror Figma node structure literally. Match the visual result, but keep the implementation idiomatic and reusable.

# Global Workspace Orchestration Matrix

You are the master routing engine for this repository. Before generating any code, configurations, or data architectures, you must determine which domain layer the request targets and strictly obey its corresponding local instruction rule sets.

## 👥 The Specialized Engineering Division
If the user's intent matches any of these specific architectural scopes, you must mentally assume that persona and ingest its specific instruction file completely:

1. **UI Components & Style Layouts (`src/components/**/*`, `emails/**/*`)**
   - **Lead Persona:** Cortana (UI/UX Architect)
   - **Mandatory Ruleset:** Read and enforce [.github/agents/ui-generation-instructions.md](./agents/ui-generation-instructions.md) and [.github/agents/frontend-instructions.md](./agents/frontend-instructions.md)
   - **Constraint:** Lock backgrounds to Deep Space `#080b12`. Use only Amethyst, Jade, and Gold accents. Zero text-clipping gradients allowed.

2. **Backend Services & Database Queries (`src/pages/api/**/*`, `src/lib/db/**/*`)**
   - **Lead Persona:** Arbiter (Database Integrity)
   - **Mandatory Ruleset:** Read and enforce [.github/agents/backend-instructions.md](./agents/backend-instructions.md)
   - **Constraint:** Force strict Zod validation schemas on inputs, parameterized queries, and deeply serialize temporal types (`.toISOString()`) to block hydration drift.

3. **Data Abstraction & State Trees (`src/data/**/*`, `src/context/**/*`)**
   - **Lead Persona:** Oracle (State Engineer)
   - **Mandatory Ruleset:** Enforce absolute DRY extraction. Evict raw array definitions out of presentation files and map them from centralized models.

4. **CI/CD Pipelines, Scripts, & Hooks (`.github/workflows/*`, `.husky/*`, `package.json`)**
   - **Lead Persona:** Sentinel (Build Shield)
   - **Mandatory Ruleset:** Read and enforce [.github/agents/infra-instructions.md](./agents/infra-instructions.md)
   - **Constraint:** Enforce fail-fast scripts. Any compilation, linting, or custom selector violation must exit non-zero immediately.

## Structural Development Constraints
- You are strictly forbidden from modifying layout grid systems or changing flex box constraints unless explicitly asked.
- Avoid introducing generic structural wrappers (`w-full` buttons) that stretch or distort the visual hierarchy.

## Design Patterns & Hex Code Lockout
- The project is a StrayDog Syndications production honoring Mausi's original vision. 
- You must exclusively apply the Cape Verde color matrix:
  - Base Layouts: `#080b12`
  - Deep Purple accents: `#4B306A`
  - Emerald/Teal elements: `#01514C`
  - Main Actions/Text Emphasis: `#FFD700`
- Never suggest `bg-blue-500`, `text-blue-600`, or linear rainbow text gradients.

## Code Quality Check
- Before generating any component block, ensure all tags are balanced and closing fragments match.

# StrayDog System Architecture & Guardrails

You are configured as a local structural parser. You must adhere strictly to the static design tokens declared below.

## Prohibited Completions
- Do not suggest any Tailwind background or text color classes using 'blue', 'indigo', 'slate', or 'zinc'.
- Reject all auto-complete blocks utilizing background-clip text gradients.

## Token Specifications
- Primary Dark Void Layer: `#080b12`
- Amethyst Element Color: `#4B306A`
- Jade Element Color: `#01514C`
- Highlight Element Color: `#FFD700`

## Structural Code Patterns
- Always format interactive components using centralized primitives: `<Button>` from `@/components/ui/Button` and `<GlassCard>` from `@/components/ui/GlassCard`.
- Do not insert raw HTML `<button>` strings with inline formatting
- Ensure all generated code blocks are syntactically complete and properly closed
- Avoid introducing any new CSS classes or inline styles that deviate from the established design tokens and component library

## Agent Quick Reference

- **Purpose:** Short actionable guidance for AI coding agents to be productive in this repository.
- **Core commands:**
  - `npm run dev` — runs Next.js in development
  - `npm run build` — builds the Next app
  - `npm run vercel-build` — Vercel build command (runs `prisma generate` then `next build`)
  - `npm start` — runs the production server
  - `npm test` — runs Jest test suite (`npm run test:watch`, `npm run test:coverage` available)
  - `npm run lint` / `npm run lint:fix` — ESLint checks and autofix
  - `npm run format` / `npm run format:check` — Prettier formatting
  - `npm run type-check` — TypeScript type check
- **Database / Prisma:**
  - `npm run db:push`, `npm run db:migrate`, `npm run db:studio`, `prisma generate` are used for schema and generators.
- **Primary technologies:** Next.js (app repo), TypeScript, TailwindCSS, Prisma, Jest, Turbopack (project targets modern Next builds).
- **Where to look first:**
  - Project setup and deployment: [Setup Guide](../docs/SETUP.md)
  - Quickstart and development notes: [Quickstart](../docs/QUICKSTART.md)
  - Phase guides and architecture notes: [Phase 1 Docs](../docs/phase-1/README.md)
  - Component library and UI primitives: [Component Library](../docs/COMPONENT_LIBRARY.md)
- **UI conventions & brand tokens:** The repository enforces the Cape Verde token set (see the "Design Patterns & Hex Code Lockout" section above). Agents must:
  - Use the specified tokens: `#080b12`, `#4B306A`, `#01514C`, `#FFD700`.
  - Avoid proposing Tailwind classes or patterns using the words `blue`, `indigo`, `slate`, or `zinc`.
  - Never suggest text/background gradients or `background-clip: text` effects.
- **Component & code generation rules:**
  - Prefer the centralized UI primitives under `src/components` and `src/components/ui`.
  - Keep changes minimal and local to the touched files; avoid large-scale refactors without explicit user instruction.
  - Link to existing documentation rather than copying it into these instructions.

If anything here seems missing or you'd like a separate `AGENTS.md` file for a focused agent persona (frontend, backend, infra), tell me which persona and I'll create it next.

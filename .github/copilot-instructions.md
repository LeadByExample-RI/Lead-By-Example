# VS Code Copilot Workspace Instructions

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
  - `npm run vercel-build` — CI build used by Vercel (runs `prisma generate` then `next build`)
  - `npm start` — runs the production server
  - `npm test` — runs Jest test suite (`npm run test:watch`, `npm run test:coverage` available)
  - `npm run lint` / `npm run lint:fix` — ESLint checks and autofix
  - `npm run format` / `npm run format:check` — Prettier formatting
  - `npm run type-check` — TypeScript type check
- **Database / Prisma:**
  - `npm run db:push`, `npm run db:migrate`, `npm run db:studio`, `prisma generate` are used for schema and generators.
- **Primary technologies:** Next.js (app repo), TypeScript, TailwindCSS, Prisma, Jest, Turbopack (project targets modern Next builds).
- **Where to look first:**
  - Project setup and deployment: [docs/SETUP.md](docs/SETUP.md)
  - Quickstart and development notes: [docs/QUICKSTART.md](docs/QUICKSTART.md)
  - Phase guides and architecture notes: [docs/phase-1/README.md](docs/phase-1/README.md)
  - Component library and UI primitives: [docs/COMPONENT_LIBRARY.md](docs/COMPONENT_LIBRARY.md)
- **UI conventions & brand tokens:** The repository enforces the Cape Verde token set (see the "Design Patterns & Hex Code Lockout" section above). Agents must:
  - Use the specified tokens: `#080b12`, `#4B306A`, `#01514C`, `#FFD700`.
  - Avoid proposing Tailwind classes or patterns using the words `blue`, `indigo`, `slate`, or `zinc`.
  - Never suggest text/background gradients or `background-clip: text` effects.
- **Component & code generation rules:**
  - Prefer the centralized UI primitives under `src/components` and `src/components/ui`.
  - Keep changes minimal and local to the touched files; avoid large-scale refactors without explicit user instruction.
  - Link to existing documentation rather than copying it into these instructions.

If anything here seems missing or you'd like a separate `AGENTS.md` file for a focused agent persona (frontend, backend, infra), tell me which persona and I'll create it next.

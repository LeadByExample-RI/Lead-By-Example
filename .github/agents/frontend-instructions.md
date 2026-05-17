# Frontend Agent — StrayDog / Mausi UI Rules

Purpose: Provide concise, deterministic rules for making UI and frontend code changes safely and on-brand.

Scope
- Files: `src/components/**`, `src/pages/**`, `src/app/**`, `src/styles/**`.
- Tech: Next.js (app/router), React, TypeScript, TailwindCSS, Framer Motion.

Hard rules (must follow)
- Always use the centralized UI primitives: `@/components/ui/Button` and `@/components/ui/GlassCard` for interactive controls.
- Enforce Cape Verde brand tokens: `#080b12` (background), `#4B306A` (Amethyst), `#01514C` (Jade), `#FFD700` (Gold).
- Never propose `background-clip: text`, text/background gradients, or Tailwind classes containing `blue`, `indigo`, `slate`, or `zinc`.
- Keep component changes minimal and local; do not refactor global layout systems or grid/flex behaviors without explicit user instruction.

Preferences (ask if unsure)
- Prefer extracting repeated patterns into a small shared component under `src/components/ui/`.
- Use Tailwind utility classes consistent with existing code style and run `npm run format` after edits.

Checks before PR
- Run `npm run lint` and `npm run type-check` locally; ensure no new lint/type errors.
- Run `npm run format:check` to respect formatting rules.

Quick links
- Component guidelines: [docs/COMPONENT_LIBRARY.md](docs/COMPONENT_LIBRARY.md)
- Design tokens & constraints: `.github/copilot-instructions.md`

Example prompts to test this persona
- "Create a `Hero` component using existing `GlassCard` and brand tokens; add a unit test scaffold." 
- "Refactor `src/components/Footer.tsx` to use the `Button` primitive and fix accessibility." 

# UI Generation Instructions — Enforced Rules

Purpose
- Persist the UI-generation rules we discussed so agents follow them consistently when producing frontend code.

Scope
- Applies to UI and visual changes: `src/components/**`, `src/app/**`, `src/pages/**`, `src/styles/**`, and `public/` assets.

Hard rules (enforced)
- Never invent placeholder components, temporary buttons, or off-brand visual blocks. If a requested component or primitive does not exist, ask the user before creating new visual primitives.
- If an image asset is required, list and read the repository `public/` directory first and reference actual filenames. Do not fabricate asset names or `src` values.
- Forbidden styling selectors and utilities: `text-transparent`, `bg-clip-text`, any utility matching `from-*`, `to-*`, `via-*`, and any classes matching `bg-blue-*` or `text-blue-*`.
- Enforce deep glassmorphism primitives exactly where a glass surface is requested: `bg-[#080b12]/40 backdrop-blur-xl border border-white/10 shadow-2xl`.

Behavioral requirements
- Before generating component code that references images, run a filesystem listing of `public/` (or call the repo file-listing tool) and include the exact filename in the generated `src` attribute.
- When proposing new components, include a short justification and link to one existing component under `src/components/ui/` to support reuse.

Agent checklist (pre-generation)
1. Confirm the change scope is UI-related and within the `Scope` above.
2. Run or simulate `ls public/` (or use the repository file-listing tool) and record available image filenames.
3. Ensure no forbidden selectors appear in the generated classes.
4. Use the exact glassmorphism primitive where appropriate.

Examples of good prompts
- "Create a `Hero` using the existing `GlassCard` primitive and include `hero.jpg` from `public/images/` (confirm filename first)."
- "Replace the `Footer` logo to use `public/logo/straydog.png` — list `public/logo/` first and confirm file exists before updating `src`."

Notes
- These rules are authoritative for UI generation; follow them even if it requires asking the user for clarification.
- Link to existing docs rather than copying them: see [docs/COMPONENT_LIBRARY.md](docs/COMPONENT_LIBRARY.md) and `.github/copilot-instructions.md` for brand tokens.

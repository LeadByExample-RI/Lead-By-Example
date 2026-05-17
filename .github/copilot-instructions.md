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

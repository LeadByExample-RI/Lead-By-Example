---
name: filesystem
description: >-
  Workspace-scoped skill for safe UI/layout refactors that requires TypeScript
  compilation and targeted forbidden-style validation before declaring work complete.
  Grants explicit directory inspection steps to prevent asset path hallucinations.
---

# Filesystem Skill

Use this skill for layout modifications, UI refactors, component rewrites, or any task that touches asset paths.

## Outcome

Produce a completed change set that:
- Compiles cleanly with TypeScript.
- Reintroduces zero forbidden blue/text-gradient utility patterns in modified source files.
- Uses real, verified asset paths from the workspace filesystem.

## Workflow

1. Define scope
- Identify files being modified (`src/**`, `emails/**`, `public/**`, or other UI-related paths).
- Record the final list of modified source files before completion checks.

2. Validate asset paths using filesystem inspection
- If the change references images/media/icons, inspect actual directories first.
- Use directory/file listing to confirm exact filenames under `public/` (and subfolders).
- Never invent asset names or `src` values.

3. Run required compile gate
- Execute:

```bash
npx tsc --noEmit
```

- If compilation fails, stop and fix errors before continuing.

4. Run forbidden-pattern validation on modified files only
- Validate each modified source file for forbidden patterns:
  - `text-transparent`
  - `bg-clip-text`
  - `from-*`
  - `to-*`
  - `via-*`
  - `bg-blue-*`
  - `text-blue-*`

- Recommended PowerShell check (replace file list with actual modified paths):

```powershell
$files = @(
  "src/components/Example.tsx",
  "src/pages/example.tsx"
)
$pattern = 'text-transparent|bg-clip-text|\bfrom-[^\s"'']+|\bto-[^\s"'']+|\bvia-[^\s"'']+|\bbg-blue-[^\s"'']+|\btext-blue-[^\s"'']+'
$hits = Select-String -Path $files -Pattern $pattern -AllMatches
if ($hits) {
  $hits | ForEach-Object { "{0}:{1} -> {2}" -f $_.Path, $_.LineNumber, $_.Line.Trim() }
  throw "Forbidden UI patterns detected."
}
```

5. Completion criteria
- `npx tsc --noEmit` exits successfully.
- Forbidden-pattern scan reports zero matches for all modified source files.
- All asset references are verified against real filesystem entries.

## Decision points

- If no UI/layout files were modified:
  - Skip forbidden-pattern scan.
  - Still run `npx tsc --noEmit` before declaring completion.

- If no assets were referenced:
  - Skip asset directory inspection.

- If any check fails:
  - Do not declare completion.
  - Fix issues, then rerun checks.

## Quality bar

A task is only complete when all applicable checks above pass with zero exceptions.

## Example prompts

- "Apply the filesystem skill to this layout refactor and show TypeScript + forbidden-pattern results before finalizing."
- "Use the filesystem skill to update hero images and verify all `public/` asset paths before writing `src` attributes."

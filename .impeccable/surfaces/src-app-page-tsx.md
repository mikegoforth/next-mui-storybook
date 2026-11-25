---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/theme.ts",".storybook/preview.tsx"]
---

## Scope

Home page (`/`) of the public boilerplate, plus the theme it introduces (`src/theme.ts`), which every route and every Storybook story inherits. Visitor mode: Persuade. The visitor is a developer evaluating the template on first `npm run dev`; the action is adopting it.

## Audience and job

Developers judging whether this Next.js + MUI + Storybook starter is worth building on. Proof is the working stack itself: live themed components, the theme mechanism, Storybook parity. No invented claims.

## Constraints

Must stay recognizably MUI and broadly adoptable (not niche). Keep the create-next-app hero copy and actions. a11y `test: 'error'` must pass in light and dark.

## Direction contract

THESIS: Material 3 dynamic color made visible: one seed generates every color role, and the first viewport lets you change the seed and watch the whole app re-theme. Refuses the centered-logo starter and the SaaS gradient hero.

OWN-WORLD: Tonal roles from @material/material-color-utilities (SchemeTonalSpot, seed #4F5BD5): primary, secondary, tertiary with containers; surface-container tiers instead of shadows; pill buttons, a filled-tonal button variant; corners by family (4 fields, 8 chips, 16 cards, 32 hero); Google Sans Flex for brand type, Roboto for plain, Google Sans Code for code; Material You tri-segment swatches as the mark.

STORY: The visitor sees a finished, distinctly M3 app; picks a seed and learns theming is one value in src/theme.ts; scans live themed components labeled with import paths; opens Storybook and finds the same theme.

FIRST VIEWPORT: Top app bar on surface-container with swatch mark, active-pill nav, mode switch. Below, a 32px-radius primary-container panel: left, Next logo, display-size "To get started, edit the page.tsx file.", three learning links, Deploy now (filled) + Documentation (outlined); right, seed swatches above four tonal palette rows. The component gallery starts at the fold.

FORM: Material 3 Tonal, IMPECCABLE'S PICK (my #1 of 7), seed key 25a2623b. Signature interaction: re-seeding reveals the new theme as a circle expanding from the chosen swatch (View Transitions, reduced-motion safe).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Public demo deployment and license remain undecided (PRODUCT.md).

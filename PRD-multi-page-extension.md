# PRD: Multi-Page Final Project Extension

## Problem Statement

The current repository already establishes the final visual language for the project, but the implemented experience is still incomplete. In the transferred static baseline, `reference/static_baseline/index.html` only advertises three sequence topics, `reference/static_baseline/fibonacci.html` and `reference/static_baseline/lucasnumbers.html` are the only complete inner pages, and `reference/static_baseline/tribonaccinumbers.html` is currently empty.

The final project needs to grow into a consistent eight-page educational site that covers both recursive sequences and non-sequence computational topics without drifting away from the approved design. Every page needs shared navigation, shared footer content, responsive layout behavior, and a computation experience that matches the interaction quality of the existing Fibonacci page.

The implementation direction has also changed: the final build should move from the current static baseline in `reference/static_baseline/index.html`, `reference/static_baseline/fibonacci.html`, `reference/static_baseline/lucasnumbers.html`, `reference/static_baseline/style.css`, and `reference/static_baseline/computation.js` into a Vite + React + Tailwind codebase while preserving the existing visual system and computational behavior.

## Solution

Extend the current static site into a unified eight-page experience implemented with Vite + React + Tailwind:

1. Landing Page
2. Palindrome
3. Lucas Numbers
4. Fibonacci
5. Tribonacci
6. Division
7. Euclidean
8. Collatz

The landing page should preserve the overall structure and visual treatment of `reference/static_baseline/index.html`, but its descriptive copy must expand beyond the current three-sequence framing.

Each content page should share one page contract:

- A back button that returns to the landing page
- A heading that clearly states the page title
- A descriptive section covering the sequence or algorithm, its history, seeds if applicable, and founder or associated mathematician when applicable
- A definition or rule section covering recursion or step rule, base cases, and constraints
- Numeric input controls using `type="number"` for every numeric field
- Input validation that rejects negative numbers
- Input validation that rejects values outside the defined maximum limit
- Two primary controls: `Compute` and `Reset`
- An animated or stepwise computation area
- A `Skip` button inside the animation area
- A shared footer using the final project attribution text

The computation experience should split into two interaction families:

- Sequence pages must inherit the staged animation language established by `reference/static_baseline/fibonacci.html`
- Non-sequence pages must show the computation step by step, either by fading prior steps or by carrying the most recently computed value into the next step

The current repository design is the source of truth. The implementation references for that design are `reference/static_baseline/index.html`, `reference/static_baseline/fibonacci.html`, `reference/static_baseline/lucasnumbers.html`, `reference/static_baseline/style.css`, `reference/static_baseline/computation.js`, and `design-standard.md`. If written standards diverge from the implemented design, the standards must be updated to match the implementation rather than the reverse.

The current HTML pages and helper scripts in `reference/static_baseline/` should be treated as migration references. Existing logic should be searched first and extracted into reusable services instead of being reimplemented from scratch.

Additional logic references are also part of the implementation baseline. `reference/static_baseline/Automata-Finals-LabAct-1/` is used to identify the current Division and Euclidean algorithm behavior, and `reference/external_logic/` contains copied logic references for Palindrome, Collatz, and Tribonacci.

## User Stories

1. As a student, I want a landing page that lists every topic in the final project, so that I can navigate directly to the page I need.
2. As a student, I want the landing page to keep the current visual style, so that the expanded project feels like one coherent site.
3. As a student, I want each topic page to include a back button to the landing page, so that I can move between topics without relying on browser navigation.
4. As a student, I want each page title to clearly identify the topic, so that I always know which concept I am viewing.
5. As a student, I want each page to explain the topic in plain language, so that I understand what the sequence or algorithm represents before computing it.
6. As a student, I want each page to include historical or founder context when applicable, so that the project teaches both mathematical behavior and background.
7. As a student, I want seed values or base cases to be visible on the page, so that I can see where the computation starts.
8. As a student, I want the recursion rule or step rule to be presented prominently, so that I can connect the visual output to the formal definition.
9. As a student, I want each page to state the constraints on valid input, so that I know what values I am allowed to enter.
10. As a student, I want all number inputs to use proper numeric fields, so that the browser helps prevent invalid entry.
11. As a student, I want sequence pages to animate how new terms are produced, so that I can follow the dependency between earlier and later values.
12. As a student, I want non-sequence pages to reveal the procedure one step at a time, so that I can understand how the answer is reached.
13. As a student, I want a `Compute` button on every page, so that I can start the visualization only when I am ready.
14. As a student, I want a `Reset` button on every page, so that I can clear the current run and try another input quickly.
15. As a student, I want the page to remain usable on mobile screens, so that I can complete the activity on a phone or tablet.
16. As a student, I want the same footer attribution on every page, so that the final project identity is consistent throughout the site.
17. As a student, I want the site to preserve the current typography, colors, spacing, and component style, so that new pages do not feel visually inconsistent with the existing pages.
18. As a student, I want Collatz to behave like a real generated sequence rather than a static answer, so that I can observe how values change until termination.
19. As a student, I want Division and Euclidean pages to show intermediate steps instead of only the final result, so that I can learn the process and not just the output.
20. As a student, I want Palindrome checking to show how the input is evaluated step by step, so that I can see why a value is or is not a palindrome.
21. As a student, I want the theme toggle and shared shell behavior to remain consistent across pages, so that the expanded project keeps the same usability features already present in the repo.
22. As an instructor or reviewer, I want every page to follow the same structural contract, so that the project feels deliberate rather than assembled page by page.
23. As a developer, I want computation logic extracted into services instead of embedded in UI components, so that the math can be reused and tested independently.
24. As a developer, I want React components to focus on rendering, so that state flow and responsibilities stay predictable.
25. As a developer, I want existing Fibonacci and Lucas implementations searched before new code is written, so that duplicated logic does not drift across the codebase.
26. As a developer, I want project-wide constants and config separated from feature-local constants, so that global behavior stays centralized.
27. As a developer, I want folder naming to stay in snake case, so that project structure remains consistent.
28. As a developer, I want the React implementation to avoid `useEffect` plus `setState` patterns, so that render flow stays deliberate and easier to reason about.
29. As a student, I want invalid input to be rejected before computation starts, so that I do not get misleading or broken output.
30. As a student, I want negative numbers rejected where they are not allowed, so that the app enforces the mathematical constraints of the topic.
31. As a student, I want values above the defined maximum limit rejected, so that the interface stays within safe computational and animation bounds.
32. As a student, I want a `Skip` button during animation, so that I can jump directly to the completed result when I already understand the process.

## Implementation Decisions

- The current implemented UI is authoritative. `reference/static_baseline/index.html`, `reference/static_baseline/fibonacci.html`, `reference/static_baseline/lucasnumbers.html`, `reference/static_baseline/style.css`, `reference/static_baseline/computation.js`, and `design-standard.md` define the visual and interaction baseline.
- The repository already contains the React Router app shell under `app/`, but the feature architecture for the eight-page experience still needs to be established and documented.
- The page set for this PRD is fixed at eight pages: one landing page and seven topic pages.
- The landing page should keep the current hero-plus-card composition, but its copy must no longer imply that the site contains only three sequences.
- All content pages must share the same shell: site header, theme toggle, back navigation, topic hero, compute area, result visualization area, and project footer.
- The footer content must be standardized across all pages and include: `FINAL PROJECT - Automata Theory and Formal Languages`, `Copyright 2026`, `Stefanie Gabion`, `Joaquin Luis Guevarra`, `Alexa Joanne Paula San Jose`, and `Charles Nathaniel Togle`.
- The target stack is Vite + React + Tailwind. The current static reference files in `reference/static_baseline/` serve as the behavioral and visual reference during migration.
- Before implementing any feature, the repository must be searched for existing logic to avoid duplicating functions. The known current implementations include the inline scripts in `reference/static_baseline/fibonacci.html` and `reference/static_baseline/lucasnumbers.html`, the legacy helpers `reference/static_baseline/fibonacci.mjs` and `reference/static_baseline/lucasnumbers.mjs`, the cloned logic reference app in `reference/static_baseline/Automata-Finals-LabAct-1/`, and the copied logic reference files in `reference/external_logic/`.
- Division and Euclidean logic must be identified from `reference/static_baseline/Automata-Finals-LabAct-1/`. That repository is a logic reference for those topics only, not a design source of truth.
- Palindrome, Collatz, and Tribonacci logic must be identified from `reference/external_logic/Palindrome.java`, `reference/external_logic/Collatz.java`, and `reference/external_logic/tribonaccinumbers.mjs`.
- The app does not need to copy every source-file input rule exactly when that would conflict with the PRD page contract. These logic references should be adapted into the React app while preserving the core studied algorithm shape such as recursion, looping structure, step order, and mathematical transformation behavior.
- When a copied source and the PRD differ, the UI contract in this PRD wins for input shape, validation messaging, and page behavior, while the core computational method should still follow the studied team logic as closely as possible.
- Every numeric field must use `input type="number"`. Sequence pages will normally use one numeric field, while algorithm pages may require multiple numeric fields where the mathematics demands it.
- Validation is in scope for every page. Invalid values must be rejected before computation begins.
- Negative numbers must be rejected for pages whose definitions do not allow them.
- Values above the configured maximum limit must be rejected and must not start computation or animation.
- Maximum limits should be represented as configuration, not magic numbers embedded throughout components.
- The current best-fit input assumptions are:
  - Fibonacci, Lucas, and Tribonacci use `number of terms`
  - Collatz uses a starting value
  - Palindrome uses one numeric candidate
  - Division uses dividend and divisor
  - Euclidean uses two integers
- React components should handle rendering and event wiring only. Computation, transformation, validation, and sequence-generation logic should live outside the component layer.
- All computational functions must live in the `services` directory, with topic-oriented modules such as `fibonacci.ts`, `lucas.ts`, and `tribonacci.ts`.
- File-local constants should remain scoped to the file that uses them. Shared global constants must be defined in a separate `constants.ts` file inside a `global` folder.
- The `global` folder should contain project-wide configuration and shared global definitions only.
- Folder naming must remain snake case.
- Functions, components, services, and variables must follow one project-wide identifier convention using the user-provided shape `HelloWorld` and `WorldHello`. In conventional naming terms this is PascalCase, and that convention should be applied consistently to those identifiers so the codebase does not mix styles.
- React implementation should avoid `useEffect` plus `setState` combinations. When an effect depends on a callback, the callback should be stabilized first and then used as the effect dependency.
- Sequence visualization is not one-size-fits-all. Fibonacci and Lucas can directly reuse the current dependency-reveal animation model. Tribonacci should extend that model to three dependencies. Collatz should preserve the same staged animation language but adapt it to a single-value transformation chain instead of a sum-of-previous-terms diagram.
- Non-sequence pages should use a step renderer that can either fade completed steps or carry the latest computed value forward into the next step. The exact visual treatment can vary by topic, but it must remain within the current design language.
- Every animated computation view must provide a `Skip` control that immediately completes the animation and reveals the final computed state without leaving stale timers or partial UI state behind.
- `Reset` must clear visible output, stop any in-flight animation timers, and return the page to its initial ready state.
- Layout should be grid-first at the page composition level and remain mobile responsive. New work must preserve the current design tokens, typography, spacing scale, and low-ornament visual style already present in the repo.
- All design patterns, layout conventions, motion language, and shared visual behavior must continue to follow `design-standard.md` and the structure demonstrated in `reference/static_baseline/index.html`, even when page content expands beyond the original three-sequence scope.
- The design standards document will need a scope update during implementation so it no longer reads as a three-sequence-only standard and so it codifies the project-wide footer, page families, and current repo-as-source-of-truth rule.
- Shared implementation should be organized around reusable modules rather than page-by-page duplication. The expected module boundaries are:
  - Shared page shell and content structure
  - Topic metadata and explanatory copy
  - Pure computation engines for each topic
  - Visualization controllers for sequence and non-sequence behaviors
  - Input validation and reset behavior

## Reference Hierarchy

- `reference/static_baseline/index.html`, `reference/static_baseline/fibonacci.html`, `reference/static_baseline/lucasnumbers.html`, `reference/static_baseline/style.css`, `reference/static_baseline/computation.js`, and `design-standard.md` are the design and interaction source of truth.
- `reference/static_baseline/fibonacci.mjs` and `reference/static_baseline/lucasnumbers.mjs` are the first logic references for sequence behavior.
- `reference/static_baseline/Automata-Finals-LabAct-1/` is the additional logic reference for Division and Euclidean algorithms.
- `reference/external_logic/Palindrome.java`, `reference/external_logic/Collatz.java`, and `reference/external_logic/tribonaccinumbers.mjs` are additional copied logic references for Palindrome, Collatz, and Tribonacci.
- If an external logic reference conflicts with the local visual system or the PRD page contract, the logic may be adapted. The design references and this PRD still win for UI, page structure, animation behavior, and input/output contract decisions.
- The algorithmic core should remain faithful to the studied team logic. Loop structure, recursion structure, step progression, and mathematical transformation order should be preserved unless there is a clear implementation reason to change them.

## Directory Tree

The implementation should use the following application structure. Route files stay thin and defer page composition to `pages/`, while computation stays in `services/`.

```text
app/
  components/
    layout/
      back_button.tsx
      site_footer.tsx
      site_header.tsx
      site_shell.tsx
      theme_toggle.tsx
    topic/
      topic_actions.tsx
      topic_definition.tsx
      topic_description.tsx
      topic_form.tsx
      topic_header.tsx
    visualization/
      procedure_view.tsx
      sequence_view.tsx
      skip_button.tsx
  content/
    topics/
      collatz.ts
      division.ts
      euclidean.ts
      fibonacci.ts
      landing.ts
      lucas_numbers.ts
      palindrome.ts
      tribonacci.ts
  global/
    constants.ts
    globals.css
    theme.ts
  hooks/
    use_topic_runner.ts
  pages/
    collatz_page.tsx
    division_page.tsx
    euclidean_page.tsx
    fibonacci_page.tsx
    landing_page.tsx
    lucas_numbers_page.tsx
    palindrome_page.tsx
    tribonacci_page.tsx
  routes/
    collatz.tsx
    division.tsx
    euclidean.tsx
    fibonacci.tsx
    home.tsx
    lucas_numbers.tsx
    palindrome.tsx
    tribonacci.tsx
  services/
    topics/
      collatz.ts
      division.ts
      euclidean.ts
      fibonacci.ts
      lucas_numbers.ts
      palindrome.ts
      tribonacci.ts
    validation/
      numeric_input.ts
    visualization/
      procedure_steps.ts
      sequence_steps.ts
  root.tsx
  routes.ts

tests/
  playwright/
  vitest/
    components/
    services/

reference/
  external_logic/
    Collatz.java
    Palindrome.java
    tribonaccinumbers.mjs
  static_baseline/
    Automata-Finals-LabAct-1/
```

Directory responsibilities:

- `components/` contains reusable render-focused UI pieces only.
- `pages/` contains full page composition for the landing page and each topic page.
- `routes/` contains thin React Router entry files that map URLs to page components.
- `services/` contains pure computation, validation, and step-generation logic.
- `content/` contains topic copy, rule text, historical notes, preview values, and other page content that should not live inside components.
- `global/` contains project-wide definitions only, including `globals.css` for the Tailwind import and shared design tokens.
- `hooks/` contains scoped feature hooks when state orchestration is needed and cannot stay inside a page component without creating a god component.
- `tests/` separates service and component tests from Playwright end-to-end coverage.
- `reference/external_logic/` contains copied topic-logic references that must be searched before implementing Palindrome, Collatz, and Tribonacci services.
- `reference/static_baseline/Automata-Finals-LabAct-1/` contains the cloned logic reference app that must be searched before implementing Division and Euclidean services.

## Testing Decisions

- Vitest test cases are required for this project.
- Playwright end-to-end tests are required for this project.
- Good tests should verify external behavior, visible state changes, and expected outputs instead of internal implementation details.
- Vitest should cover the service layer first, because computation is intentionally separated from rendering.
- Vitest should be used for:
  - sequence and algorithm service test cases
  - input validation rules
  - animation controller state transitions where they can be tested without a browser
  - render-level component behavior that depends on service outputs
- Pure computation logic should be tested with known inputs and outputs for Fibonacci, Lucas, Tribonacci, Collatz, Palindrome, Division, and Euclidean behavior.
- Input validation should be tested to confirm that invalid, empty, negative, or over-limit values do not start broken animations or produce misleading output.
- Reset behavior should be tested to confirm that it clears the rendered result state and cancels active animations cleanly.
- Visualization behavior should be tested at the contract level: compute reveals a step sequence, the `Skip` button completes the run correctly, final states render correctly, and skip or reset leaves no stale UI artifacts.
- Shared shell behavior should be tested for back navigation, consistent footer rendering, and theme toggle persistence.
- Responsive behavior should be manually verified on mobile and tablet widths because layout correctness is part of the requirement, not an optional enhancement.
- There is currently no automated test prior art in this repository. `reference/static_baseline/fibonacci.html` and `reference/static_baseline/lucasnumbers.html` provide interaction prior art, but not testing prior art. The test strategy for this feature will need to establish the first automated baseline for the project.
- Service-layer tests should be prioritized because the repository rule explicitly separates computation from rendering.
- React tests should verify rendered behavior from service outputs rather than re-testing mathematical internals inside components.
- Playwright should cover at least the critical end-to-end flows:
  - landing page navigation to every topic page
  - valid compute flow on each page
  - invalid input rejection for negative and over-limit values
  - `Reset` behavior
  - `Skip` behavior on animated pages
  - responsive smoke coverage for mobile navigation and page usability
- Playwright selectors must be based on the actual rendered source, not assumptions about tag names or structure.
- Playwright assertions must target real implemented behavior, not assumed behavior.
- When mocking in Playwright, mocked response shapes must exactly match the runtime data shape consumed by the app.
- Before mocking a flow, trace the full call graph so dependent requests are not missed.
- Avoid brittle end-to-end waits that depend on external resources finishing. Prefer waiting for meaningful UI state instead of `networkidle` when remote fonts, embeds, or other long-lived requests exist.
- If Playwright route mocking is used, register specific routes after broad routes or use non-overlapping patterns so route precedence stays correct.

## Out of Scope

- Build-tool migrations or framework rewrites
- A redesign that departs from the current approved repository visuals
- Non-numeric input modes for the pages described in this PRD
- Publishing, hosting, analytics, or backend features
- Additional topics beyond the eight pages listed in this PRD

## Further Notes

- `reference/static_baseline/tribonaccinumbers.html` is currently empty, so `reference/static_baseline/fibonacci.html` and `reference/static_baseline/lucasnumbers.html` are the only complete topic-page baselines available today.
- The landing-page hero wording will likely need broader language because the final site includes both sequence and non-sequence topics.
- Historical and founder content should be treated as content work that still needs fact-checking when the actual page copy is written.
- The repo rules now imply an architectural migration, not just more pages. The directory tree in this PRD is the current implementation target unless a later PRD revision changes it explicitly.
- If the next prompt changes page responsibilities or introduces a different directory strategy, this PRD should be revised rather than bypassed.

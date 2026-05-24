# Input Validations

This file lists the input validation that is currently implemented in this repository.

Scope notes:
- "Active app" means the Vite + React code under `app/`.
- "Reference-only" means older HTML/JS/Java files under `reference/`. They are still in the repo, but they are not the current React runtime.

## Active app validation

### Validation flow

- `app/pages/topic_page.tsx:48-59` blocks computation when `BuildTopicPresentation(...)` returns `IsValid: false`, then shows the returned `ErrorMessage`.
- `app/services/topics/topic_runtime.ts:35-90` is the runtime validation gate for all topic pages.
- `app/services/topics/topic_runtime.ts:42-53` rejects missing numeric field config or missing numeric range.
- `app/services/topics/topic_runtime.ts:70-81` rejects missing text field config or missing text length limit.
- `app/components/topic/topic_form.tsx:31-63` renders form inputs with HTML constraints, but the form uses `noValidate`, so browser-native form blocking is intentionally disabled.

### Shared numeric validation

Implemented in `app/services/validation/numeric_input.ts:21-64`.

- Trims surrounding whitespace before validating.
- Rejects empty input.
  Error message: `Enter {label}.`
- Rejects anything that is not a whole number via `/^-?\d+$/`.
  This rejects decimals, scientific notation, commas, alphabetic input, and mixed characters.
- Rejects values outside JavaScript's safe integer range with `Number.isSafeInteger(...)`.
  Error message: `{Label} is outside the safe integer range.`
- Rejects values below the configured minimum.
  Error message: `{Label} must be at least {Minimum}.`
- Rejects values above the configured maximum.
  Error message: `{Label} must be at most {Maximum}.`
- Returns the parsed number only after all checks pass.

Important detail:
- The regex allows a leading `-`, but every active numeric field in the React app has a positive minimum, so negative numbers are effectively rejected everywhere numeric input is used.

### Shared text validation

Implemented in `app/services/validation/text_input.ts:18-48` and configured in `app/services/topics/topic_runtime.ts:84-89`.

- Trims surrounding whitespace before validating.
- Checks the configured minimum text length after trimming.
  For palindrome, the minimum is `0`, so empty or whitespace-only input is accepted as the empty string.
- If a text field uses a positive minimum length and the trimmed value is empty, the message is `Enter {label}.`
- Rejects trimmed values shorter than the configured minimum length.
  Error message: `{Label} must be at least {MinimumLength} characters.`
- Rejects text longer than the configured maximum length.
  Error message: `{Label} must be at most {MaximumLength} characters.`
- Rejects text that does not match `/^[a-z0-9\\s]+$/i`.
  Effective allowed set: letters, digits, and spaces only.
- Returns the trimmed string only after all checks pass.

### Per-topic enforced rules in the active app

| Topic         | Field                       | Enforced rules                                                   | Source                                                                                                                                |
| ------------- | --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Fibonacci     | `TermCount`                 | Whole number, safe integer, required, min `1`, max `100,000`     | `app/content/topics/fibonacci.ts:29-40`, `app/global/constants.ts:16-26`, `app/services/validation/numeric_input.ts:21-64`            |
| Lucas Numbers | `TermCount`                 | Whole number, safe integer, required, min `1`, max `100,000`     | `app/content/topics/lucas_numbers.ts:30-41`, `app/global/constants.ts:16-26`, `app/services/validation/numeric_input.ts:21-64`        |
| Tribonacci    | `TermCount`                 | Whole number, safe integer, required, min `1`, max `100,000`     | `app/content/topics/tribonacci.ts:29-40`, `app/global/constants.ts:16-26`, `app/services/validation/numeric_input.ts:21-64`           |
| Palindrome    | `Candidate`                 | Empty string allowed after trim, max length `1,000`, letters/digits/spaces only | `app/content/topics/palindrome.ts:30-44`, `app/services/topics/topic_runtime.ts:84-89`, `app/services/validation/text_input.ts:18-48` |
| Division      | `FirstValue`, `SecondValue` | Whole number, safe integer, required, min `1`, max `999,999`     | `app/content/topics/division.ts:28-47`, `app/global/constants.ts:16-26`, `app/services/validation/numeric_input.ts:21-64`             |
| Euclidean     | `FirstValue`, `SecondValue` | Whole number, safe integer, required, min `1`, max `999,999`     | `app/content/topics/euclidean.ts:28-47`, `app/global/constants.ts:16-26`, `app/services/validation/numeric_input.ts:21-64`            |
| Collatz       | `StartValue`                | Whole number, safe integer, required, min `1`, max `999,999`     | `app/content/topics/collatz.ts:29-39`, `app/global/constants.ts:16-26`, `app/services/validation/numeric_input.ts:21-64`              |

### Browser-level input constraints in the active app

Implemented in `app/components/topic/topic_form.tsx:31-63`.

- Numeric fields render with `type="number"`.
- Numeric fields also get `min`, `max`, and `step={1}`.
- Numeric fields default to `inputMode="numeric"`.
- The palindrome field renders with `type="text"` and `inputMode="text"`.
- The palindrome field gets `minLength={0}` and `maxLength={1000}`.
- The palindrome field disables autocapitalization and spellcheck.
- Because the form uses `noValidate`, the browser does not enforce submit blocking from these HTML attributes. The service/runtime layer is the real source of truth.

### Current gaps or non-enforced limits

- `app/global/constants.ts:20` defines `PositiveIntegerMax = 999_999`, but the active app does not read that constant directly. Topic-specific max values are enforced instead.
- `app/global/constants.ts:21` defines `PalindromeCandidateMax = 999_999_999`, but there is no active validator that uses it.

## Validation coverage in tests

- `tests/vitest/services/topic_services.test.ts:100-151` covers numeric validation for empty input, below-min, above-max, and valid input.
- `tests/vitest/services/topic_services.test.ts:154-203` covers text validation for empty-input acceptance at minimum length `0`, punctuation rejection, and max-length rejection.
- `tests/vitest/components/app_pages.test.tsx:33-50` verifies invalid Fibonacci input shows a validation message and does not proceed.
- `tests/playwright/app.spec.ts:104-112` verifies every current topic route shows a validation message when given an invalid input.
- `tests/playwright/app.spec.ts:3-45` shows the invalid values currently used in end-to-end coverage:
  - Fibonacci, Lucas Numbers, Tribonacci: `100001`
  - Palindrome: `-1`
  - Division: `0`
  - Euclidean: `0`
  - Collatz: `0`

## Reference-only validation still present in the repo

These validations exist in the repository, but they belong to older reference implementations rather than the current React app.

### Static baseline Fibonacci

Implemented in `reference/static_baseline/fibonacci.html:56-58` and `reference/static_baseline/fibonacci.html:265-267`.

- HTML input uses `type="number"`, `min="2"`, and `max="25"`.
- JavaScript parses with `parseInt(...)`.
- Empty, invalid, or falsy parsed values fall back to `8` via `parseInt(nInput.value) || 8`.
- Out-of-range values are clamped into `[2, 25]` with `Math.max(2, Math.min(25, ...))`.
- The input value is overwritten with the clamped result.
- This is coercion, not rejection.

### Static baseline Lucas Numbers

Implemented in `reference/static_baseline/lucasnumbers.html:57-66` and `reference/static_baseline/lucasnumbers.html:293-295`.

- HTML input uses `type="number"`, `min="2"`, and `max="25"`.
- JavaScript parses with `parseInt(...)`.
- Empty, invalid, or falsy parsed values fall back to `8`.
- Out-of-range values are clamped into `[2, 25]`.
- The input value is overwritten with the clamped result.
- This is coercion, not rejection.

### Legacy Division and Euclidean pages

Implemented in `reference/static_baseline/Automata-Finals-LabAct-1/index.html:41-49`, `reference/static_baseline/Automata-Finals-LabAct-1/index.html:87-95`, and `reference/static_baseline/Automata-Finals-LabAct-1/main.js:75-100`.

- Division inputs use `type="number"`, `min="1"`, and `required`.
- Euclidean inputs use `type="number"`, `min="1"`, and `required`.
- Submit handlers parse values with `parseInt(..., 10)`.
- The handlers reject when either parsed value is `NaN`.
- The handlers reject when either value is `<= 0`.
- Rejection message for both flows: `Please enter valid positive integers.`

### External Collatz Java reference

Implemented in `reference/external_logic/Collatz.java:12-34`.

- Rejects any input containing `.` before parsing.
  Message: `Invalid Input: Decimals are not allowed.`
- Rejects parse failures.
  Message: `Invalid Input: Please enter an integer.`
- Rejects values `<= 0`.
  Message: `Invalid Input: Must be a positive integer.`
- Rejects even integers.
  Message: `Invalid Input: Must be an odd integer.`

### External Palindrome Java reference

Implemented in `reference/external_logic/Palindrome.java:5-15` and `reference/external_logic/Palindrome.java:31-44`.

- Rejects `null` input by returning `false`.
- Does not reject empty strings or one-character strings.
- Explicitly treats length `0` and length `1` as palindrome inputs.

# Logic Descriptions

This file explains the main service logic in the repo at two levels:

1. Low-level explanation of the service files.
2. High-level explanation of the visualization transitions: arc drawing, animations, and display flow.

The goal is to describe what the code is actually doing, including conditions, base cases, and the kind of logic being used.

## Low-Level Service Explanations

## `app/services/topics/fibonacci.ts`

### What this service does
This service builds the Fibonacci sequence data and also builds the visualization model used by the UI.

### Main functions
- `BuildFibonacciSequence(TermCount)`
- `BuildFibonacciRun(TermCount)`
- internal helper: `BuildFibonacciPreview(TermCount)`

### Logic types used
- looping
- conditional branching
- arithmetic computation
- recurrence modeling

### `BuildFibonacciSequence(TermCount)`
This function returns a plain array of numbers.

#### Core logic
- It starts with:
  - `PreviousValue = 0`
  - `CurrentValue = 1`
- It loops from `Index = 0` up to `TermCount - 1`.
- During each loop:
  - if `Index === 0`, it pushes `0`
  - if `Index === 1`, it pushes `1`
  - otherwise it computes:
    - `NextValue = PreviousValue + CurrentValue`
    - push `NextValue`
    - move the tracking values forward

#### Base cases
- `F(0) = 0`
- `F(1) = 1`

#### Important condition
Every term after index `1` depends on the previous two terms.

#### Example
- Start: `0, 1`
- Next:
  - `1 = 0 + 1`
  - `2 = 1 + 1`
  - `3 = 1 + 2`

### `BuildFibonacciPreview(TermCount)`
This is similar to the earlier function, but it uses `bigint` values instead of normal `number`.

#### Why it uses `bigint`
Very large Fibonacci terms overflow normal JavaScript safe integers. `bigint` avoids that problem.

#### Core logic
- It computes the sequence with the same rules as Fibonacci.
- It only stores the first few visible terms in `PreviewValues`.
- It still keeps computing until the final requested term so it can produce the true final value.

#### Conditions
- preview terms are only stored when `Index < PreviewCount`
- the final value is updated every loop iteration

### `BuildFibonacciRun(TermCount)`
This does not directly compute a new formula. It prepares a `SequenceRunModel` for animation.

#### Core logic
- gets the preview limit
- builds preview values and final value
- passes the result into `BuildRecursiveSequenceRun`

#### Base configuration passed to the visualization builder
- notation prefix: `F`
- base count: `2`
- dependencies:
  - `n - 1`
  - `n - 2`

#### Important note
The math sequence is recursive by definition, but this implementation computes it with a loop, not with a recursive function call.

---

## `app/services/topics/lucas_numbers.ts`

### What this service does
This is structurally almost the same as the Fibonacci service, but it uses Lucas starting values.

### Main functions
- `BuildLucasNumbersSequence(TermCount)`
- `BuildLucasNumbersRun(TermCount)`
- internal helper: `BuildLucasPreview(TermCount)`

### Logic types used
- looping
- conditional branching
- arithmetic computation
- recurrence modeling

### `BuildLucasNumbersSequence(TermCount)`

#### Core logic
- starts with:
  - `PreviousValue = 2`
  - `CurrentValue = 1`
- loops through the requested term count
- uses conditions for the first two terms
- after that computes each next term as:
  - `NextValue = PreviousValue + CurrentValue`

#### Base cases
- `L(0) = 2`
- `L(1) = 1`

#### Recurrence rule
- `L(n) = L(n - 1) + L(n - 2)`

### `BuildLucasPreview(TermCount)`
This mirrors the Fibonacci preview logic.

#### Core logic
- uses `bigint`
- stores only the visible preview terms
- still computes the final requested term

### `BuildLucasNumbersRun(TermCount)`
This creates the animated run model.

#### Configuration
- notation prefix: `L`
- base count: `2`
- dependency tones:
  - near for `L(n - 1)`
  - far for `L(n - 2)`

---

## `app/services/topics/tribonacci.ts`

### What this service does
This service builds the Tribonacci sequence and its visualization model.

### Main functions
- `BuildTribonacciSequence(TermCount)`
- `BuildTribonacciRun(TermCount)`
- internal helper: `BuildTribonacciPreview(TermCount)`

### Logic types used
- looping
- conditional branching
- arithmetic computation
- recurrence modeling

### `BuildTribonacciSequence(TermCount)`

#### Core logic
- starts with three tracking values:
  - `ThirdPreviousValue = 0`
  - `SecondPreviousValue = 0`
  - `PreviousValue = 1`
- loops from `0` to `TermCount - 1`
- handles the first three terms separately
- after that computes:
  - `NextValue = PreviousValue + SecondPreviousValue + ThirdPreviousValue`
- then shifts the three trackers forward

#### Base cases
- `T(0) = 0`
- `T(1) = 0`
- `T(2) = 1`

#### Recurrence rule
- `T(n) = T(n - 1) + T(n - 2) + T(n - 3)`

### `BuildTribonacciPreview(TermCount)`
This is the large-number-safe preview version.

#### Core logic
- uses `bigint`
- stores only the first visible terms
- still computes the true last term requested

### `BuildTribonacciRun(TermCount)`
This creates the visualization run model.

#### Configuration
- notation prefix: `T`
- base count: `3`
- dependencies:
  - `n - 1` with tone `near`
  - `n - 2` with tone `mid`
  - `n - 3` with tone `far`

#### Important condition
The first computed non-base term only begins at index `3`.

---

## `app/services/topics/collatz.ts`

### What this service does
This service builds the Collatz chain and the animated chain visualization.

### Main functions
- `BuildCollatzSequence(StartValue)`
- `BuildCollatzRun(StartValue)`

### Logic types used
- looping
- conditional branching
- arithmetic computation
- chain progression

### `BuildCollatzSequence(StartValue)`

#### Core logic
- starts the array with the input value
- keeps looping until the current value becomes `1`
- on each loop:
  - if the current value is even, divide by `2`
  - if the current value is odd, compute `3n + 1`
- push the new value each time

#### Base case
- the sequence starts with the input itself

#### Stop condition
- stop when `CurrentValue === 1`

#### Key condition
- parity check:
  - even: `CurrentValue % 2 === 0`
  - odd: otherwise

### `BuildCollatzRun(StartValue)`
This creates a sequence visualization model, but unlike Fibonacci or Tribonacci, each term only depends on one previous term.

#### Core logic
- it calls `BuildCollatzSequence`
- then sends the result to `BuildChainSequenceRun`

#### Visualization behavior encoded here
- legend entries:
  - even step: `/2`
  - odd step: `3n + 1`
- tone builder:
  - if the previous value is even, mark the dependency as `even`
  - otherwise mark it as `odd`
- status builder:
  - creates readable text showing the actual operation used at each step

---

## `app/services/topics/palindrome.ts`

### What this service does
This service checks whether a text is a palindrome and produces a procedural explanation of the check.

### Main functions
- internal helper: `NormalizeCandidateText(CandidateText)`
- `BuildPalindromeRun(Candidate)`

### Logic types used
- string transformation
- conditional branching
- two-pointer looping
- comparison logic

### `NormalizeCandidateText(CandidateText)`

#### Core logic
- converts text to lowercase
- removes all spaces using `.replace(/\s+/g, "")`

#### Result
This creates a normalized version of the input so comparison is easier and more consistent.

### `BuildPalindromeRun(Candidate)`

#### Core logic
- trims outer whitespace from the original input
- creates a normalized comparable string
- sets:
  - `LeftIndex = 0`
  - `RightIndex = ComparableText.length - 1`
- compares left and right characters while `LeftIndex < RightIndex`

#### Conditions
- if normalized text is different from the original trimmed text, add a normalization step
- if length is `0` or `1`, the text is automatically considered a palindrome
- while looping:
  - compare left and right characters
  - if they match, move inward
  - if they do not match, stop immediately

#### Base cases
- empty or one-character text is treated as palindrome logic
- the code explicitly adds a "single character" step for length `<= 1`

#### Stop conditions
- failure stop: first mismatched pair
- success stop: left and right pointers cross or meet

#### Important outcome flag
- `IsPalindrome` starts as `true`
- it becomes `false` the first time a mismatch is found

---

## `app/services/topics/division.ts`

### What this service does
This service explains one Euclidean division in a step-by-step procedural format.

### Main function
- `BuildDivisionRun(FirstValue, SecondValue)`

### Logic types used
- conditional normalization
- arithmetic computation
- procedural formatting

### Core logic
- chooses the larger input as `Dividend`
- chooses the smaller input as `Divisor`
- computes:
  - `Quotient = Math.floor(Dividend / Divisor)`
  - `Remainder = Dividend % Divisor`
- builds the equation:
  - `Dividend = Divisor(Quotient) + Remainder`

### Conditions
- there is no repeated loop here
- the only decision is input normalization:
  - larger value becomes dividend
  - smaller value becomes divisor

### Output
It returns a `ProcedureRunModel` with four display steps:
- normalize inputs
- compute quotient
- compute remainder
- assemble final equation

---

## `app/services/topics/euclidean.ts`

### What this service does
This service runs the Euclidean algorithm, records each division step, and calculates both `gcd` and `lcm`.

### Main function
- `BuildEuclideanRun(FirstValue, SecondValue)`

### Logic types used
- conditional normalization
- looping
- arithmetic computation
- iterative reduction

### Core logic
- start with:
  - `Dividend = max(FirstValue, SecondValue)`
  - `Divisor = min(FirstValue, SecondValue)`
- record the original values
- add an initial normalization step
- repeat while `Divisor !== 0`

### Loop body
For each loop:
- compute
  - `Quotient = Math.floor(Dividend / Divisor)`
  - `Remainder = Dividend % Divisor`
- record the step as:
  - `Dividend = Divisor(Quotient) + Remainder`
- update:
  - `Dividend = Divisor`
  - `Divisor = Remainder`

### Base condition
There is no recursive base case, but there is a loop termination rule:
- stop when `Divisor === 0`

### Final logic
- after the loop, `Dividend` is the `gcd`
- `lcm` is computed by:
  - `(OriginalDividend * OriginalDivisor) / GreatestCommonDivisor`

### Important mathematical meaning
The algorithm keeps replacing `(m, n)` with `(n, r)` until the remainder is zero. The last non-zero divisor is the gcd.

---

## `app/services/topics/sequence_preview.ts`

### What this service does
This shared service controls how long sequence visualizations are allowed to be on screen.

### Main functions
- `GetSequencePreviewCount(TermCount)`
- `BuildSequenceSummaryText(PreviewValues, FinalValue, TermCount)`
- `BuildSequencePreviewDetail(NotationPrefix, PreviewCount, TermCount)`

### Logic types used
- limit enforcement
- conditional formatting
- summary generation

### `GetSequencePreviewCount(TermCount)`

#### Core logic
- returns the smaller of:
  - requested term count
  - `SequenceDisplayLimits.PreviewTermCount`

#### Why it exists
The app can compute very large sequences, but the UI should not try to animate all of them.

### `BuildSequenceSummaryText(...)`

#### Conditions
- if the term count is within preview limit:
  - join and show all preview values
- otherwise:
  - show the first few leading values
  - then `...`
  - then the final computed value

### `BuildSequencePreviewDetail(...)`

#### Condition
- if the full sequence fits inside the preview, return `undefined`
- otherwise return a text note explaining that only the first terms were animated and the final value was still computed

---

## `app/services/topics/topic_runtime.ts`

### What this service does
This is the runtime router for the topic pages. It validates input, chooses the correct topic service, and returns either a success model or an error.

### Main functions
- `ReadValidatedNumber(...)`
- `ReadValidatedText(...)`
- `GetValidatedValue(...)`
- `GetInitialFieldValues(Content)`
- `BuildTopicPresentation(Content, FieldValues)`

### Logic types used
- configuration lookup
- validation dispatch
- conditional branching
- topic routing

### `ReadValidatedNumber(...)`

#### Core logic
- find the input config in `Content.Inputs`
- if the field config is missing, return an error
- if numeric min/max are missing, return an error
- otherwise validate the incoming string with `ValidateWholeNumberInput`

### `ReadValidatedText(...)`

#### Core logic
- find the input config
- if missing, return an error
- if `MaximumLength` is missing, return an error
- otherwise validate the input with `ValidateTextInput`

#### Hardcoded text rule
Palindrome input currently allows:
- letters
- digits
- spaces

### `GetValidatedValue(...)`

#### Core logic
- validate a numeric field
- if validation fails, return the failure object
- if validation succeeds, return the parsed number

#### Important note
This function returns either:
- a number
- or a failure result

That means calling code must check the type before continuing.

### `GetInitialFieldValues(Content)`

#### Core logic
- builds an object from the topic input metadata
- each input key gets its default value

### `BuildTopicPresentation(Content, FieldValues)`

#### Core logic
- switches on `Content.Slug`
- for each topic:
  - validate the required fields
  - if validation fails, return the failure immediately
  - if validation succeeds, call the matching topic builder

#### Routing conditions
- `"fibonacci"` -> `BuildFibonacciRun`
- `"lucas-numbers"` -> `BuildLucasNumbersRun`
- `"tribonacci"` -> `BuildTribonacciRun`
- `"collatz"` -> `BuildCollatzRun`
- `"palindrome"` -> `BuildPalindromeRun`
- `"division"` -> `BuildDivisionRun`
- `"euclidean"` -> `BuildEuclideanRun`

#### Default case
If the slug is unknown, it returns:
- `IsValid: false`
- an error saying no runtime is registered

---

## `app/services/validation/numeric_input.ts`

### What this service does
This service validates whole-number input and formats numbers for display.

### Main functions
- `FormatNumber(Value)`
- `ValidateWholeNumberInput(RawValue, FieldSpec)`

### Logic types used
- string cleanup
- regex validation
- range checking
- formatting

### `FormatNumber(Value)`

#### Core logic
- uses `toLocaleString("en-US")`
- adds comma separators for large values

### `ValidateWholeNumberInput(RawValue, FieldSpec)`

#### Core logic
1. trim the input
2. reject empty input
3. reject anything that is not a whole number
4. convert to `Number`
5. reject values outside safe integer range
6. reject values below minimum
7. reject values above maximum
8. otherwise return the parsed value

#### Conditions
- empty string -> error
- regex `/^-?\d+$/` must match
- `Number.isSafeInteger(ParsedValue)` must be true
- `ParsedValue >= Minimum`
- `ParsedValue <= Maximum`

#### Important note
The regex allows a leading minus sign, but later range rules still decide whether negative numbers are accepted.

---

## `app/services/validation/text_input.ts`

### What this service does
This service validates text fields.

### Main function
- `ValidateTextInput(RawValue, FieldSpec)`

### Logic types used
- string cleanup
- length checking
- pattern checking

### Core logic
1. trim the input
2. reject empty input
3. reject text longer than the allowed maximum
4. reject text that does not match the required pattern
5. otherwise return the trimmed text

### Conditions
- `TrimmedValue.length === 0` -> error
- `TrimmedValue.length > MaximumLength` -> error
- `!Pattern.test(TrimmedValue)` -> error

---

## `app/services/visualization/types.ts`

### What this service does
This file does not perform computation. It defines the data shapes used by the visualization system.

### Logic types used
- type definition
- model shaping

### Important types
- `LegendTone`
  - determines visual categories like `far`, `near`, `even`, and `odd`
- `SequenceItemModel`
  - one displayed term in a sequence
- `SequenceDependencyModel`
  - one arc connection from an earlier term to a later term
- `SequenceStepModel`
  - one animation step for sequence progression
- `SequenceRunModel`
  - complete sequence visualization package
- `ProcedureStepModel`
  - one text-based procedure step
- `ProcedureRunModel`
  - complete procedure visualization package
- `TopicRunModel`
  - union of sequence or procedure output

### Why this matters
These types are the contract between:
- topic services
- runner logic
- visualization components

---

## `app/services/visualization/sequence_steps.ts`

### What this service does
This is the main builder for sequence visualization data. It turns already-computed values into animated sequence steps and dependency arcs.

### Main functions
- `BuildDependencyId(...)`
- `BuildFinalValue(...)`
- `BuildRecursiveSequenceRun(Options)`
- `BuildChainSequenceRun(Options)`

### Logic types used
- array mapping
- looping
- conditional branching
- dependency construction
- display-model generation

### `BuildDependencyId(FromIndex, ToIndex, Tone)`

#### Core logic
- builds a unique string like:
  - `near-3-4`
  - `far-2-4`

#### Why it exists
The UI uses these ids to decide which arcs are visible.

### `BuildFinalValue(...)`

#### Core logic
- formats the final number
- stores the label, notation, and optional detail text
- if no custom sequence text is given, it joins the full value list into a comma-separated string

### `BuildRecursiveSequenceRun(Options)`

#### What it is for
Used for Fibonacci, Lucas, and Tribonacci style sequences where later terms depend on several earlier terms.

#### Core logic
1. map `Options.Values` into display items
2. mark items before `BaseCount` as base terms
3. loop through each index
4. if the index is a base index:
   - create a base step
   - no source indices
   - no dependency ids
5. otherwise:
   - loop through each declared dependency offset
   - compute the source index
   - build the dependency id
   - record the source index and arc id
   - record readable notation pieces such as `F(2)`
   - record value pieces such as `1`
   - push a dependency object for arc drawing
6. create a status string showing:
   - notation formula
   - numeric substitution
   - final numeric result

#### Base case condition
- `Index < BaseCount`

#### Non-base condition
- build one or more dependencies from earlier indices using the provided offsets

#### Important detail
This service does not compute the math sequence itself. It assumes the values are already correct and only builds the visualization structure.

### `BuildChainSequenceRun(Options)`

#### What it is for
Used for chain-like sequences such as Collatz where each new item depends on only one previous item.

#### Core logic
1. map values into display items
2. treat index `0` as the base/start step
3. for each later index:
   - ask `ToneBuilder` what tone the dependency should use
   - build one dependency id
   - add one dependency object
   - build one step status using `StatusBuilder`

#### Base case
- `Index === 0`

#### Important difference from recursive run builder
- one source per step instead of many
- tone is computed dynamically from the previous value

---

## `app/services/visualization/procedure_steps.ts`

### What this service does
This is a very small wrapper that packages procedure steps and final value data into a `ProcedureRunModel`.

### Main function
- `BuildProcedureRun(Steps, FinalValue)`

### Logic types used
- object assembly

### Core logic
- return an object with:
  - `Kind: "procedure"`
  - `Steps`
  - `FinalValue`

---

## High-Level Explanation of Transitions, Arc Drawing, Animations, and Displays

## Overall flow

At a high level, the visualization system works like this:

1. The topic page submits user input.
2. `BuildTopicPresentation(...)` validates the input and chooses the correct topic service.
3. The topic service returns either:
   - a `SequenceRunModel`, or
   - a `ProcedureRunModel`
4. `UseTopicRunner()` reads that model and decides how to reveal it over time.
5. `SequenceView` or `ProcedureView` renders the current visible state.

This means the service layer decides the logic, and the runner/component layer decides the pacing and display.

---

## Sequence display flow

Sequence topics include:
- Fibonacci
- Lucas Numbers
- Tribonacci
- Collatz

### What gets built first
Before the screen animates anything, the service already builds:
- all visible sequence items
- all dependency arc definitions
- all step descriptions
- the final summary value

So the UI is not inventing the logic during animation. It is only revealing data that already exists in the run model.

### What `UseTopicRunner()` does for sequence runs

When `StartSequenceRun(...)` is called, it resets the visible state:
- no visible terms yet
- no visible arcs yet
- no final value card yet
- skip button shown

Then it processes the sequence step-by-step.

#### Base steps
For base terms:
- status text is updated immediately
- the base term becomes visible immediately
- no arc is drawn
- no source term is highlighted

Examples:
- `F(0) = 0`
- `F(1) = 1`
- `T(0) = 0`

#### Computed steps
For non-base terms:
- status text is updated
- source indices are highlighted first
- the runner marks the run as animating
- after a short delay, it reveals:
  - the new target term
  - the dependency arc ids for that step
- shortly before the next step, it clears the source highlight

### Timing values
These come from `app/global/constants.ts`:
- `StepMs = 900`
- `RevealDelayMs = 220`
- `ArcDrawMs = 450`
- `SourceClearLeadMs = 200`

### Practical meaning of the timing
For a computed sequence step:
- source terms highlight first
- around `220ms` later, the new value and arc appear
- about `700ms` into the step, source highlight is cleared
- at `900ms`, the next step begins

This creates the feeling that the app:
- points to the inputs first
- then draws the relationship
- then moves on

---

## Arc drawing explanation

Arc drawing happens in `app/components/visualization/sequence_view.tsx`.

### How an arc is defined
Every arc comes from a `SequenceDependencyModel` with:
- `FromIndex`
- `ToIndex`
- `Tone`
- `Id`

### How the arc path is calculated
`BuildArcPath(...)` computes:
- `StartX`: center of the source item
- `EndX`: center of the target item
- `MidX`: midpoint between them
- `ArcDepth`: chosen from `ArcDepthByTone`

Then it returns an SVG quadratic Bezier curve:
- `M StartX ArcY`
- `Q MidX ArcDepth EndX ArcY`

In plain language:
- start above the source number
- bend upward or downward based on the tone depth
- end above the target number

### Why tones matter for shape
`ArcDepthByTone` makes some arcs taller than others:
- `far` arcs are deepest
- `mid` arcs are medium
- `near` arcs are shallower
- `even` and `odd` use the shallow depth

This is important because it visually separates:
- long-distance dependencies
- short-distance dependencies

### When an arc becomes visible
The view only renders arcs whose ids are inside `VisibleDependencyIds`.

That means an arc does not exist on screen until the runner reveals that step.

### How the line animation works
When `AnimateDependencies` is true, each SVG path gets:
- class `is-animating`
- `pathLength={1}`
- animation duration from `SequenceTiming.ArcDrawMs`

The CSS for `.viz-arc.is-animating` sets:
- `stroke-dasharray: 1`
- `stroke-dashoffset: 1`

Then the `draw-arc` keyframe changes:
- from `stroke-dashoffset: 1`
- to `stroke-dashoffset: 0`

In plain language, the line starts fully hidden and is progressively drawn from start to end.

### Arc color meaning
The tone also changes color:
- `far` uses lavender
- `near` uses magenta
- `mid` uses a purple blend
- `even` uses alert red
- `odd` uses blue

This is why Collatz can visually distinguish:
- divide-by-2 steps
- `3n + 1` steps

---

## Sequence item animation explanation

Sequence term display is controlled by `VisibleSequenceIndices`.

### Hidden state
Each `.viz-value` starts with:
- `opacity: 0`
- `transform: translateY(-6px)`

### Visible state
When the `visible` class is added:
- opacity becomes `1`
- translateY becomes `0`

So each number softly fades in and drops into place.

### Active source highlighting
While a non-base step is being demonstrated:
- `ActiveSourceIndices` marks which earlier terms are currently being used
- `ActiveSourceTone` controls the source color class

This gives the user a direct answer to:
- "Which earlier values produced this new value?"

### Divider display for wide values
If any sequence value is long enough, the component enables vertical dividers between visible terms.

This is a display-only readability rule:
- it helps prevent long numbers from visually blending together
- especially important for large `bigint` outputs

---

## Procedure display flow

Procedure topics include:
- Palindrome
- Division
- Euclidean

These do not draw dependency arcs.

### What `UseTopicRunner()` does for procedure runs
When `StartProcedureRun(...)` is called:
- the runner resets state
- disables dependency animation
- reveals one procedure card at a time

Each step:
- increases `VisibleProcedureStepCount`
- updates the status text to the current step title
- waits `720ms`
- then moves to the next step

### How `ProcedureView` renders that
`ProcedureView` slices the steps array:
- only the first `VisibleProcedureStepCount` steps are shown

It also styles them by position:
- current step gets `is-active`
- earlier steps get `is-dimmed`

So the user sees a guided checklist rather than all steps at once.

### Final result display
After the last procedure step:
- the runner calls `CompleteRun()`
- the skip button disappears
- the final result block appears

For procedure topics this final block usually contains:
- the final equation or verdict
- optional details like lcm or normalized comparison text

---

## Final value display

Both sequence and procedure runs eventually end in a final display state.

### What triggers it
`CompleteRun()` sets:
- `ShowFinalValue = true`
- `ShowSkipButton = false`
- clears active highlights
- disables dependency animation

### Sequence final card
For sequences, the final card can show:
- final label
- final notation
- final numeric result
- sequence summary text
- optional detail about preview truncation

### Procedure final card
For procedures, the final card can show:
- final label
- main result
- details block

### Final card animation
The final card starts with:
- `opacity: 0`
- `transform: translateY(8px)`

When the `visible` class is present:
- opacity becomes `1`
- translateY becomes `0`

So the final answer appears as a soft upward reveal.

---

## Skip behavior

The skip button is not only a UI convenience. It changes the runner state directly.

### What happens when skip is pressed
`SkipRun()`:
- clears all timers
- stops the animation
- hides the skip button
- shows the final value immediately

For sequence runs:
- all sequence items become visible
- all dependency arcs become visible

For procedure runs:
- all procedure steps become visible

### Important detail
When skipping, `AnimateDependencies` is set to `false`, so arcs appear fully drawn instead of replaying the draw animation.

---

## Entry animations vs algorithm animations

There are two different animation layers in the app.

### 1. Entry animations
Classes like:
- `anim-fade-up`
- `anim-delay-1`
- `anim-delay-5`

These are page-load or section-load animations. They affect headers, forms, descriptions, and visualization containers when they first render.

### 2. Algorithm animations
These are driven by `UseTopicRunner()` state:
- revealing values
- drawing arcs
- highlighting source terms
- stepping through procedure cards
- showing final results

This separation is important:
- CSS entry animations make the page feel polished
- runner-driven animations explain the algorithm itself

---

## Summary

The service layer in this repo is split into clear roles:

- topic services compute or describe each mathematical/text process
- validation services protect input correctness
- shared sequence services limit and summarize large outputs
- visualization services convert computed results into display-ready models

Then the transition system takes over:

- `UseTopicRunner()` controls timing and reveal order
- `SequenceView` draws numbers and dependency arcs
- `ProcedureView` reveals step cards
- CSS handles the visual movement, fade-in, highlighting, and arc drawing

That separation is why the repo stays understandable:
- services decide what is true
- runner decides when to show it
- components decide how it looks

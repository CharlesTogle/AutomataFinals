# Design Standard — Number Sequences Lab

Derived from [impeccable.style/slop](https://impeccable.style/slop/) anti-patterns and
the nebula reference palette. All styles live in `style.css`, organized by section.
Shared JS utilities live in `computation.js`.

---

## Color Palette

Extracted from the nebula reference image. Deep space tones with purple-magenta accents.
Two themes: dark (default) and light.

### Dark Theme (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--clr-bg` | `#08081a` | Page background |
| `--clr-surface` | `#0f0e22` | Card / input backgrounds |
| `--clr-surface-raised` | `#161430` | Hovered surfaces |
| `--clr-border` | `#23213c` | Default borders |
| `--clr-border-hover` | `#3d2870` | Hovered borders |
| `--clr-purple` | `#7830b0` | Primary accent (focused inputs, primary buttons) |
| `--clr-purple-dim` | `#3e1860` | Button fill (resting state) |
| `--clr-magenta` | `#b03268` | Arc near-color, destructive accent |
| `--clr-lavender` | `#9880c8` | Data text, definition labels, arc far-color |
| `--clr-text` | `#ddd4f0` | Primary text |
| `--clr-text-muted` | `#8070a8` | Body copy, descriptions |
| `--clr-text-faint` | `#3e3860` | Labels, ornamental numbers, metadata |

### Light Theme (`[data-theme="light"]`)

| Token | Value |
|---|---|
| `--clr-bg` | `#f3f0fb` |
| `--clr-surface` | `#ffffff` |
| `--clr-surface-raised` | `#f7f5fd` |
| `--clr-border` | `#ddd8ef` |
| `--clr-border-hover` | `#b8a8d8` |
| `--clr-purple` | `#7830b0` |
| `--clr-purple-dim` | `#f0eaf9` |
| `--clr-magenta` | `#b03268` |
| `--clr-lavender` | `#5838a0` |
| `--clr-text` | `#1c1630` |
| `--clr-text-muted` | `#5a4878` |
| `--clr-text-faint` | `#a090c0` |

**Rules:**
- Never use pure black (`#000`) or pure white (`#fff`) — use tinted alternatives
- `--clr-lavender` is for data/decorative text and the "And the recursion" label, not body copy
- Purple accents should appear sparingly — one primary action per view
- No gradient text (`background-clip: text`)

---

## Theming

Theme is stored in `localStorage` under key `nseq-theme`. Default is `dark`.

Each HTML page must include two things:

**1. FOUC-prevention inline script in `<head>` (before stylesheets):**
```html
<script>(function(){var t=localStorage.getItem('nseq-theme');if(t)document.documentElement.setAttribute('data-theme',t)})()</script>
```

**2. `<html>` default attribute:**
```html
<html lang="en" data-theme="dark">
```

**3. Theme toggle button in header:**
```html
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
  <span class="toggle-icon"></span>
</button>
```

**4. `computation.js` at the bottom of `<body>`:**
```html
<script src="computation.js"></script>
```

The toggle icon is set by JS: ☀ in dark mode, ☾ in light mode.

### Theme Transition

Smooth cross-fade on toggle. Applied via `.theme-transitioning` class — added on click, removed after 350ms. Uses `!important` to override in-progress animations only during the switch.

---

## Animation

Animation should explain the computation, not decorate it. Every sequence visualization must make data dependencies legible before a new term appears.

**Rules:**
- Show source terms first, then show the result they produce
- For recursive sums, apply a three-phase step: source highlight, short pause, then arc draw plus value reveal
- Source highlight must clear before the next recursive step starts
- Base cases may reveal immediately, without dependency arcs
- Keep one timing model across sequence pages unless the interaction genuinely differs
- Use eased motion with short durations; avoid bouncy or looping effects in computation views
- Interruptions must be safe: skip, reset, or recompute must clear pending animation timers and visual state
- Motion should reinforce the legend colors: far dependency and near dependency keep their distinct arc styling

**Standard sequence timing:**
- Full recursive step: `900ms`
- Delay before drawing arcs and revealing the new value: about `220ms`
- Arc draw duration: about `450ms`
- Source un-highlight: about `200ms` before the next step

---

## Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display | Playfair Display | 400, 400i, 600, 600i, 700 | Headings, definition formulas, sequence preview text, viz numbers, final value |
| Body | Sora | 400, 500 | All UI text, labels, descriptions, inputs, buttons |

**Google Fonts URL:**
```
family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Sora:wght@400;500
```

**Rules:**
- Headings `h1–h4`: `font-weight: 500`
- Body text minimum: `var(--text-sm)` (16px), line height minimum 1.65
- No gradient text
- No all-caps body text
- Uppercase labels: letter-spacing max `0.1em`
- Max line length: ~65ch for body paragraphs
- No Inter, Roboto, Arial, or Space Grotesk

### Type Scale

| Token | Value | ~px |
|---|---|---|
| `--text-xs` | `0.875rem` | 14px |
| `--text-sm` | `1rem` | 16px |
| `--text-base` | `1.125rem` | 18px |
| `--text-lg` | `1.375rem` | 22px |
| `--text-xl` | `1.75rem` | 28px |
| `--text-2xl` | `2.25rem` | 36px |
| `--text-3xl` | `2.875rem` | 46px |
| `--text-hero` | `clamp(4rem, 8vw, 6.5rem)` | 64–104px |

---

## Spacing Scale

| Token | Value |
|---|---|
| `--sp-1` | 0.25rem (4px) |
| `--sp-2` | 0.5rem (8px) |
| `--sp-3` | 0.75rem (12px) |
| `--sp-4` | 1rem (16px) |
| `--sp-5` | 1.25rem (20px) |
| `--sp-6` | 1.5rem (24px) |
| `--sp-8` | 2rem (32px) |
| `--sp-10` | 2.5rem (40px) |
| `--sp-12` | 3rem (48px) |
| `--sp-16` | 4rem (64px) |
| `--sp-20` | 5rem (80px) |
| `--sp-24` | 6rem (96px) |

Minimum padding inside any bordered container: `var(--sp-6)` (24px).

---

## Border Radius

- `--radius-sm: 3px` — badges, small chips
- `--radius: 4px` — cards, inputs, buttons

Never exceed 4px unless rendering a true pill shape (`border-radius: 9999px` allowed for that case only).

---

## Components

All components are flat HTML — no unnecessary wrapper divs.

### Badge
Small uppercase metadata tag. Used in site header.
```html
<span class="badge">Label</span>
```

### Theme Toggle
Always placed last in the header. `margin-left: auto` pushes it right.
```html
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
  <span class="toggle-icon"></span>
</button>
```

### Sequence Card
Navigation card. Index page only.
```html
<a href="page.html" class="seq-card">
  <div class="seq-card-head">
    <span class="seq-number">01</span>
    <span class="seq-tag">Recursive</span>
  </div>
  <h2 class="seq-name">Name</h2>
  <p class="seq-desc">Description text.</p>
  <p class="seq-preview">0, 1, 1, 2, 3 ...</p>
  <span class="seq-arrow">Explore &rarr;</span>
</a>
```

### Definition Card
Mathematical definition of a sequence. Appears above the compute form on inner pages.
```html
<div class="definition-card">
  <p class="definition-intro">
    The ... Numbers <strong>X<sub>n</sub></strong> have the initial values
    &nbsp;<strong>X<sub>0</sub> = a,&nbsp; X<sub>1</sub> = b</strong>
  </p>
  <p class="definition-label">And the recursion:</p>
  <p class="definition-formula">
    X<sub>n</sub> = X<sub>n&minus;1</sub> + X<sub>n&minus;2</sub>
  </p>
  <p class="definition-condition">If n &ge; 2</p>
</div>
```
- `.definition-label` renders in `--clr-lavender`
- `.definition-formula` uses display font, centered, `font-weight: 500`

### Input Field
```html
<div class="form-group">
  <label class="form-label" for="n">Number of terms</label>
  <input type="number" id="n" class="input-field" placeholder="8" min="2" max="25">
</div>
```

### Buttons
Only one `.btn-primary` per view. Secondary for supporting actions.
```html
<button class="btn btn-primary">Compute</button>
<button class="btn btn-secondary">Reset</button>
```

### Visualization
The arc diagram section. Hidden on load, shown after compute.
```html
<div class="viz-wrapper" id="viz-wrapper" style="display:none;">
  <p class="viz-status" id="viz-status"></p>
  <div class="viz-container">
    <div class="viz-scroll" id="viz-scroll">
      <div class="viz-numbers" id="viz-numbers"></div>
      <svg class="viz-svg" id="viz-svg" aria-hidden="true"></svg>
    </div>
  </div>
  <div class="viz-footer">
    <div class="viz-legend">
      <span class="viz-legend-item viz-legend-far">X(n−2) → X(n)</span>
      <span class="viz-legend-item viz-legend-near">X(n−1) → X(n)</span>
    </div>
    <button class="btn btn-secondary" id="skip-btn" style="display:none;">
      Skip animation
    </button>
  </div>
  <!-- Final Value appears here after animation -->
</div>
```

Arc colors: `--clr-lavender` for far (n−2), `--clr-magenta` for near (n−1).

### Final Value
Fades in after animation ends or skip is clicked. Hidden by default.
```html
<div class="final-value" id="final-value" style="display:none;">
  <p class="final-value-label">Final Value</p>
  <div class="final-value-main">
    <span class="final-value-notation" id="final-notation"></span>
    <span class="final-value-number" id="final-number"></span>
  </div>
  <p class="final-value-seq" id="final-seq"></p>
</div>
```
Add `.visible` class to trigger fade-in transition.

---

## Shared JS — `computation.js`

Included at the bottom of every page's `<body>`.

| Function | Description |
|---|---|
| `formatNumber(n)` | Formats integer with comma separators via `toLocaleString('en-US')` |
| `toggleTheme()` | Switches dark/light, writes to localStorage, updates icon |
| `initTheme()` (via DOMContentLoaded) | Syncs toggle icon with current theme on load |

All number output (viz tiles, status text, final value) must go through `formatNumber`.

---

## Animations

Staggered load animations. Use `.anim-fade-up` with a delay modifier on section elements.

| Class | Delay |
|---|---|
| `.anim-delay-1` | 80ms |
| `.anim-delay-2` | 160ms |
| `.anim-delay-3` | 240ms |
| `.anim-delay-4` | 320ms |
| `.anim-delay-5` | 400ms |
| `.anim-delay-6` | 480ms |

No bounce or elastic easing. No animating layout properties (width, height, padding).

---

## Background

Solid background color only. No gradients, no images, no particles, no star elements.

```css
.page-bg {
  position: fixed;
  inset: 0;
  background: var(--clr-bg);
}
```

---

## Anti-patterns (Do Not Use)

Drawn from [impeccable.style/slop](https://impeccable.style/slop/):

- No glassmorphism (blur + glass card effects)
- No side-tab colored border accents (thick stripe on one side of a card)
- No gradient text
- No colored `box-shadow` glow effects
- No modals as a default interaction pattern
- No `#000000` backgrounds — always use `--clr-bg`
- No icon tiles stacked above headings
- No center-aligning all text by default
- No identical card grids where all cards are the same size
- No cards nested inside cards
- No bounce or elastic animation easing
- No monospace fonts as a "technical" visual shorthand
- No Inter, Roboto, Arial, or Space Grotesk
- No star/sparkle decorative elements
- No justified text alignment
- No all-caps body copy

---

*Last updated: post-Fibonacci page pass*

# Interaction Engine: Beyond Ordinary

To achieve the "Award Winning" status, every interaction must feel kinetic, weighted, and responsive.

## 1. The Kinetic Scroll (Scroll-Sequence)
Instead of standard parallax, we will use a **Canvas-based Image Sequence**.
- **The Tech**: Capture 120-180 frames of a 3D Rolls-Royce Spectre.
- **The Logic**: GSAP `ScrollTrigger` maps scroll percentage to the `draw` function of the canvas.
- **Why**: This provides a fluid, "God-mode" control over the cinematic camera.

## 2. Magnetic Button System
Buttons shouldn't just hover; they should *pull*.
- **The Logic**: Calculate distance between the mouse and button center. If < 60px, use `gsap.to()` to translate the button (`x`, `y`) by a percentage of the distance.
- **The "Ooz" Effect**: The button text should move at a slower rate than the button container (Parallax within the button).

## 3. Custom Liquid Cursor
A cursor that isn't just a dot, but a fluid aura.
- **Interaction**: On "Ordinary" elements, it's a small ring. On "Interactive" elements (Buttons), it expands and changes color, "absorbing" the button.
- **Implementation**: Sticky SVG filter (Gooey effect) or a simple GSAP lerp (Linear Interpolation).

## 4. Text Reveal (Staggered Masking)
Text doesn't just fade in; it "emerges".
- **Method**: Every line is wrapped in a `div` with `overflow: hidden`. GSAP animates the inner text from `y: 100%` to `0%` with a slight rotation (`rotation: 5deg`).

## 5. Viewport Transitions (FLIP)
When moving from a feature list to a detailed view, elements don't just switch; they "transition" using the GSAP FLIP plugin to maintain visual continuity.

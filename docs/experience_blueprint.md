# Experience Blueprint: Rolls-Royce "Black Badge" Cinematic Experience

This document serves as the master plan for the cinematic flow, product reveals, and interaction logic, now refined based on the "Black Badge" aesthetic.

## 1. The Hero Product: Rolls-Royce Spectre (Black Badge Edition)
- **Model**: Rolls-Royce Spectre.
- **Aesthetic**: "Black Badge" – Darker chrome, deep monochromatic tones, and neon-streak accents (as seen in the Cullinan screenshots).
- **Key Information**: 
  - Range: 530km (WLTP)
  - Power: 430kW / 900Nm
  - 0-100 km/h: 4.5 seconds
  - Signature: Starlight Doors & Illuminated Grille.

## 2. Page Structure & Cinematic Motion

### Section 1: The Descent (Hero)
- **Visual**: A deep black screen. In the center, a subtle "Spirit of Ecstasy" in a chrome-silver silhouette.
- **Scroll Motion**: As the user scrolls, the camera "descends". The car (Spectre) is revealed via a **Scroll-Sequence** (360-degree orbit).
- **Typography**: Large, masked Serif ("SPECTRE") fades in from the background as if the car is driving through the letters.

### Section 2: Celestial Detail (Interiors)
- **Visual**: A macro transition to the **Starlight Doors**. Thousands of illuminated fiber-optic stars.
- **Scroll Motion**: The background pans across the dashboard leather and the digital interface. Elements reveal themselves using **Kinetic Parallax** (text moves at 1.2x speed, images at 0.8x).
- **Reveal**: Information about the "Planar Suspension" appears using a staggered line reveal.

### Section 3: The Architecture (Stats)
- **Visual**: A technical, blueprint-style overlay on the chassis. 
- **Animation**: Data points (4.5s, 900Nm) "ping" onto the screen with a pulse effect as the scroll reaches specific triggers.

### Section 4: The Final Invitation (CTA)
- **Visual**: The car driving into the distance (Rear view).
- **Scroll Motion**: The viewport slows down (Inertial damping increases) to focus on the final call to action.

## 3. Interaction Physics: "Beyond Ordinary"

### The "Spirit" Cursor
Refining the cursor to mirror the "Spirit of Ecstasy" seen in the screenshots.
- **Interaction**: The cursor is a minimal dot, but when hovering over "Discover" buttons, it morphs into a subtle wing-like trail.

### Button Press Mechanics (Refined)
- **Normal State**: The pill-shaped "DISCOVER NOW" button (as seen in screenshots).
- **On Click (The Ripple)**: 
  - A "High-Contrast Inversion". The white button turns pure black, and a white ripple expands from the click point.

### Scroll Feel
- **Lenis Smoothness**: 1.2 multiplier.
- **Section Snapping**: We use "Soft Snapping" – if the user stops near a section transition, the site gently slides into the perfect view after a 500ms delay.

## 4. Performance & SEO Strategy (The "Speed to Zero" Goal)

- **Canvas Rendering**: The 120+ frame sequence is rendered on a HTML5 Canvas. This avoids 120+ DOM elements and keeps memory usage low.
- **Asset Pre-fetching**: Using a custom WebWorker to load frames in the background *after* the initial Hero LCP (Largest Contentful Paint) is rendered.
- **Modern Formats**: All image frames MUST be `.webp` or `.avif`.
- **SSR (Server Side Rendering)**: Next.js will serve the Page Metadata, Headings, and static text immediately for SEO. The heavy "Cinematic" layer hydrates only after the core text is visible.
- **Semantic HTML**: All "Cinematic" visuals will have `aria-hidden="true"` or proper `alt` descriptions in the underlying DOM to ensure screen readers see the content, not just the "Eye Candy".

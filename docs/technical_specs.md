# Technical Specifications: Cinematic Rolls-Royce Experience

## 1. Core Technologies
- **Frontend Framework**: Next.js (for routing, performance, and SEO).
- **Styling**: Vanilla CSS with CSS Variables for a robust design system.
- **Animations**: 
  - **GSAP (GreenSock Animation Platform)**: For timeline-based cinematic sequences.
  - **Lenis Scroll**: For smooth, "inertial" scrolling effects.
  - **Framer Motion**: For simple UI transitions and hover effects.
- **Visuals**:
  - **Scroll-Sequence (Canvas-based)**: High-resolution image frames for the 3D car reveal.
  - **WebGL / Three.js** (Optional): If a real-time 3D model is needed for interactivity.

## 2. Key Interaction Patterns
### A. The "Vignette" Scroll
As the user scrolls, the background isn't just static; it's a series of high-quality frames (Image Sequence) that play forward/backward based on scroll position. This creates a "3D movie" feel.

### B. Magnet Buttons
Buttons will have a "magnetic" pull towards the cursor when nearby, with a trailing circle (Custom Cursor) for that ultra-modern aesthetic.

### C. Kinetic Typography
Text that reveals itself through masking and sliding animations, synchronized with the scroll.

### D. The "Spirit of Ecstasy" Loading Screen
A custom preloader that uses SVG morphing or high-end transitions to mask the asset loading process.

## 3. Performance Strategy
- **Image Optimization**: WebP/AVIF formats.
- **Lazy Loading**: Deferred loading of non-hero assets.
- **Canvas Rendering**: Efficiently rendering sequences to avoid DOM bloat.

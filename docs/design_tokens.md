# Design Tokens: Luxury Cinematic System

## Colors (HSL for flexibility)
- **Primary-Black**: `hsl(0, 0%, 4%)` - Deep, infinite black.
- **Secondary-Silver**: `hsl(0, 0%, 89%)` - Premium metal finish.
- **Accent-Gold**: `hsl(43, 8%, 51%)` - Subdued, classy champagne gold.
- **Surface-Glass**: `hsla(0, 0%, 10%, 0.7)` - Glassmorphism background.

## Spacing (Golden Ratio based)
- **Gutter**: `clamp(1rem, 5vw, 4rem)`
- **Section-Margin**: `clamp(4rem, 15vh, 12rem)`

## Typography
- **H1 (Hero)**: `Font: Playfair Display, weight: 700, size: clamp(3rem, 10vw, 8rem)`
- **H2 (Sub-header)**: `Font: Outfit, weight: 300, size: clamp(1.5rem, 4vw, 3rem), spacing: 0.2em`
- **Body**: `Font: Inter, weight: 400, size: 1.1rem, leading: 1.6`

## Motion Tokens
- **Cinema-Ease**: `cubic-bezier(0.83, 0, 0.17, 1)` - Heavy, smooth easing for high-end feel.
- **Snappy-Ease**: `cubic-bezier(0.22, 1, 0.36, 1)` - For interactive elements.
- **Scroll-Inertia**: `1.2` - Multiplier for Lenis scroll smoothness.

## UI Elements
- **Magnetic-Trigger**: `60px` - Threshold for magnetic button pull.
- **Cursor-Dot**: `12px` - Core cursor size.
- **Cursor-Aura**: `40px` - Trailing aura size.

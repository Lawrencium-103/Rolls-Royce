# Rolls-Royce Spectre - Cinematic Website Experience

An ultra-luxury, award-winning cinematic web experience for the Rolls-Royce Spectre Black Badge Edition.

## Features

- **Cinematic Scroll Animations** - Canvas-based image sequence tied to scroll position
- **Custom Liquid Cursor** - Fluid aura that expands on interactive elements
- **Magnetic Buttons** - Physics-based pull effect toward cursor
- **Smooth Scroll** - Lenis-powered inertial scrolling
- **Text Reveal Animations** - Staggered 3D text reveals
- **Ambient Sound** - Optional ambient audio experience
- **Responsive Design** - Optimized for all screen sizes

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Framer Motion** - Declarative animations
- **GSAP** - Timeline-based sequences
- **Lenis** - Smooth scroll engine

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Design system & base styles
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx       # Landing with Spirit of Ecstasy
│   │   ├── ShowcaseSection.tsx   # Scroll-sequence car reveal
│   │   ├── InteriorSection.tsx   # Celestial details & features
│   │   ├── StatsSection.tsx      # Performance specifications
│   │   └── CTASection.tsx        # Final invitation & footer
│   └── ui/
│       ├── CustomCursor.tsx      # Liquid cursor system
│       ├── MagneticButton.tsx    # Physics-based buttons
│       ├── ScrollSequence.tsx    # Canvas frame renderer
│       ├── TextReveal.tsx        # Animated text reveal
│       ├── Navigation.tsx        # Fixed header + mobile menu
│       ├── Preloader.tsx         # Loading experience
│       ├── LenisProvider.tsx     # Smooth scroll wrapper
│       ├── SoundController.tsx   # Ambient audio toggle
│       └── FloatingSpecs.tsx     # Rotating spec display
├── hooks/
│   └── useAnimations.ts    # Custom animation hooks
└── utils/
    ├── config.ts           # Site configuration
    └── helpers.ts          # Utility functions
```

## Adding Image Sequences

Place your scroll-sequence frames in the following locations:

```
public/
└── assets/
    └── sequences/
        ├── frame_001.webp  to frame_120.webp  (Hero orbit)
        └── interior_001.webp to interior_060.webp (Interior)
```

### Frame Specifications

- **Format**: WebP (80% quality)
- **Resolution**: 1920x1080
- **Frame Count**: 120 frames for hero, 60 for interior
- **File Size Target**: < 50KB per frame

## Design Tokens

All design values are defined as CSS variables in `globals.css`:

```css
--color-primary-black: hsl(0, 0%, 4%);
--color-secondary-silver: hsl(0, 0%, 89%);
--color-accent-gold: hsl(43, 8%, 51%);
--ease-cinema: cubic-bezier(0.83, 0, 0.17, 1);
```

## Customization

Edit `src/utils/config.ts` to customize:

- Site metadata
- Vehicle specifications
- Contact information
- Animation timings
- Navigation items

## Performance

- Canvas rendering for scroll sequences
- Lazy loading of non-critical assets
- WebP/AVIF image optimization
- SSR for SEO-friendly content

## License

This is a demonstration project. Rolls-Royce is a trademark of Rolls-Royce Motor Cars Limited.

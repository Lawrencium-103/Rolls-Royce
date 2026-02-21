export const SITE_CONFIG = {
  name: 'Rolls-Royce Spectre',
  tagline: 'Beyond Ordinary',
  description: 'Experience the pinnacle of luxury electric motoring.',
  url: 'https://rolls-royce.com/spectre',
  brand: {
    name: 'Rolls-Royce Motor Cars',
    founded: 1906,
    headquarters: 'Goodwood, England',
  },
  vehicle: {
    name: 'Spectre',
    type: 'Fully Electric Ultra-Luxury Coupé',
    specs: {
      power: { value: 430, unit: 'kW' },
      torque: { value: 900, unit: 'Nm' },
      range: { value: 530, unit: 'km' },
      acceleration: { value: 4.5, unit: 's', label: '0-100 km/h' },
      batteryCapacity: { value: 102, unit: 'kWh' },
      topSpeed: { value: 250, unit: 'km/h' },
    },
    features: [
      'Starlight Doors',
      'Illuminated Fascia',
      'Planar Suspension',
      'Spirit of Ecstasy',
    ],
  },
  contact: {
    phone: '+44 (0) 123 456 7890',
    email: 'enquiries@rolls-royce.com',
  },
  social: {
    instagram: 'https://instagram.com/rollsroycecars',
    twitter: 'https://twitter.com/rollsroyce',
    youtube: 'https://youtube.com/rollsroyce',
    linkedin: 'https://linkedin.com/company/rolls-royce',
  },
} as const

export const ANIMATION_CONFIG = {
  preloader: {
    minimumDuration: 2500,
  },
  scroll: {
    lenisMultiplier: 1.2,
    snapDelay: 500,
  },
  cursor: {
    dotSize: 12,
    auraSize: 40,
    magneticThreshold: 60,
  },
  transitions: {
    cinema: [0.83, 0, 0.17, 1] as const,
    snappy: [0.22, 1, 0.36, 1] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
  },
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
    cinematic: 1200,
  },
} as const

export const COLORS = {
  primaryBlack: 'hsl(0, 0%, 4%)',
  secondarySilver: 'hsl(0, 0%, 89%)',
  accentGold: 'hsl(43, 8%, 51%)',
  surfaceGlass: 'hsla(0, 0%, 10%, 0.7)',
  deepViolet: 'hsl(263, 50%, 12%)',
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const SEQUENCE_CONFIG = {
  heroSequence: {
    frames: 120,
    startFrame: 1,
    format: 'webp',
    path: '/assets/sequences/frame_{number}.webp',
    placeholderColor: '#1A0F2E',
  },
  interiorSequence: {
    frames: 60,
    startFrame: 1,
    format: 'webp',
    path: '/assets/sequences/interior_{number}.webp',
  },
} as const

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Interiors', href: '#interiors' },
  { label: 'Performance', href: '#performance' },
  { label: 'Experience', href: '#experience' },
] as const

export const INTERIOR_FEATURES = [
  {
    title: 'Starlight Doors',
    description:
      '1,344 fiber-optic lights illuminate each door, creating a celestial ambiance.',
  },
  {
    title: 'Bespoke Leather',
    description:
      'Hand-selected hides from heritage tanneries, meticulously stitched over 100 hours.',
  },
  {
    title: 'Illuminated Fascia',
    description:
      'The Spirit of Ecstasy emerges from the dashboard in a choreographed light display.',
  },
] as const

export const PERFORMANCE_STATS = [
  {
    value: 530,
    unit: 'km',
    label: 'Range (WLTP)',
    description: 'Uncompromised electric range for effortless grand touring',
  },
  {
    value: 430,
    unit: 'kW',
    label: 'Power',
    description: 'Instantaneous power delivery with whisper-quiet refinement',
  },
  {
    value: 900,
    unit: 'Nm',
    label: 'Torque',
    description: 'Effortless acceleration that defies physics',
  },
  {
    value: 4.5,
    unit: 's',
    label: '0-100 km/h',
    description: 'Launch from standstill with breathtaking urgency',
  },
] as const

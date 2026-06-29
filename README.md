# NARUTO EXPLORER

A premium anime website built with React 19, Tailwind CSS, and Framer Motion. Explore the hidden leaf universe with characters, clans, villages, tailed beasts, and legendary shinobi.

## Demo

Live: [https://naruto-lovat-nine.vercel.app](https://naruto-lovat-nine.vercel.app)

## Features

- **Premium Dark UI** - Cinematic dark theme inspired by Naruto
- **Glassmorphism Navbar** - Sticky navigation with animated active states
- **Hero Section** - Full-screen landing with animated chakra particles
- **Category Grid** - Premium cards with hover effects and gradient overlays
- **Character Cards** - Netflix-style cards with 3D hover effects
- **Character Details** - Animated sections with image gallery and jutsu list
- **Shimmer Loading** - Skeleton loading instead of spinners
- **Responsive** - Pixel-perfect on desktop, tablet, and mobile

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Axios

## Design System

**Colors:**
- Background: `#080808`
- Secondary: `#111111`
- Card: `#151515`
- Accent: `#FF2A2A`
- Gold: `#FFD166`

**Typography:**
- Headings: `font-black tracking-wider`
- Body: `font-medium`
- Buttons: `uppercase tracking-widest`

## Project Structure

```
src/
├── components/
│   ├── GlassNavbar.tsx      # Navigation with glassmorphism
│   ├── HeroSection.tsx      # Landing page hero
│   ├── CategoryCard.tsx     # Premium category cards
│   ├── CharecterCard.tsx   # Character display cards
│   ├── FloatingParticles.tsx # Animated chakra effects
│   ├── LoadingSkeleton.tsx  # Shimmer loading states
│   ├── AnimatedButton.tsx   # Motion button component
│   └── NoDataNotFound.tsx   # Empty state component
├── pages/
│   ├── Main.tsx           # Landing page
│   ├── Character.tsx      # Character listing
│   ├── CharacterDetails.tsx # Character detail view
│   ├── Clans.tsx          # Clan listing
│   ├── Villages.tsx       # Village listing
│   ├── Akatsuki.tsx       # Akatsuki members
│   ├── Kara.tsx           # Kara organization
│   ├── Teams.tsx          # Team listing
│   └── Tailed-Beast.tsx   # Tailed beasts
└── api/
    └── server.ts         # API integration
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT

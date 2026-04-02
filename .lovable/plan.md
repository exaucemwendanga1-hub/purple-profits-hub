

## Plan: Polished Scrolling Reviews Section with Purple Glow

### What changes
Transform the static reviews grid into an infinitely scrolling horizontal marquee with a polished, professional look and calm purple ambient glow.

### Implementation

**1. Update `src/components/ReviewsGrid.tsx`**
- Replace the grid layout with a horizontal infinite-scroll marquee (same pattern as `ProofSection.tsx`)
- Duplicate review cards for seamless looping
- Add edge fade mask (`mask-image: linear-gradient(...)`) so cards fade at edges
- Pause animation on hover
- Style each review card with a subtle purple border glow (`border-primary/20`, `shadow` with purple hsl)
- Add a calm purple radial glow behind the entire section using a pseudo-element or background gradient

**2. Update `src/index.css`**
- Add a `@keyframes reviews-scroll` animation (slower pace ~30s for calm feel)
- Add `.animate-reviews-scroll` utility class

### Visual details
- Section background: subtle radial purple glow (`radial-gradient(ellipse at center, hsl(263 70% 50% / 0.08), transparent 70%)`)
- Cards: refined with slightly increased padding, softer border (`border-primary/15`), and a subtle purple box-shadow
- Header: add a small purple accent line or glow beneath the title
- Smooth horizontal scroll at ~30s per cycle, pauses on hover
- Edge fade masks on left and right for a clean look


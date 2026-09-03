# Daniel Marques — Portfolio

My personal portfolio. Built to look less like a template and more like a
tool someone actually uses — a floating tech cloud instead of a static
skill grid, project cards that show real architecture, not just a logo row.

**Live:** _(add the Vercel URL here after deploying)_

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind. Framer Motion for the
project card interactions, GSAP/ScrollTrigger for scroll-tied reveals,
Lenis for smooth scroll. No backend, no database — everything is static
data rendered client-side.

## Structure

```
app/            layout, page, global styles
components/     Navbar, Hero, About, TechCloud, HowIBuild, Projects,
                ProjectShowcase, Journey, AILab, GithubTerminal, Contact,
                Footer, Cursor, BackgroundEffects
data/           projects.ts, skills.ts, experience.ts
lib/            SmoothScroll.tsx (Lenis + GSAP ticker wiring)
```

All the actual copy — project descriptions, stack tags, the hero's rotating
words — lives in `data/`, not hardcoded inside components. Swapping a
project or updating the stack means editing `data/projects.ts` or
`data/skills.ts`; the layout, numbering and card animation adapt on their
own.

## Running it locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:3000`.

## A couple of decisions worth explaining

**The tech section is a floating icon cloud, not a static grid.** Icons
drift and bounce inside a circular boundary, gray by default, colored on
hover — it's meant to feel like something built by someone who thinks
about interaction, not just layout.

**Project cards separate the pitch from the proof.** Each one leads with
the problem it solves, then the architecture as an actual diagram (not a
screenshot), then — where it's true — a line of verifiable proof (tests
passing, CI status) instead of just adjectives.

**No fake polish.** Projects that aren't deployed say so. Links that
aren't confirmed to exist don't render. I'd rather the site undersell a
project than have a recruiter click through to a 404.

## Before deploying

- `components/Contact.tsx` already points to my real LinkedIn/GitHub/email
  — update these if you're forking this.
- `app/layout.tsx` has a placeholder `metadataBase`; point it at your real
  domain once deployed.
- Respects `prefers-reduced-motion` — smooth scroll and scroll-tied
  animations are skipped for anyone who has that set.

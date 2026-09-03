# Daniel Marques — Portfolio

Dark, editorial developer portfolio built with Next.js 16, TypeScript, Tailwind CSS,
Framer Motion, GSAP + ScrollTrigger and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to a Git repo and import it on [Vercel](https://vercel.com/new) — zero config needed,
`next build` runs automatically.

## Editing content

All copy lives in `data/`, not inside components:

- `data/skills.ts` — hero word cycle, marquee rows, orbit labels
- `data/projects.ts` — project cards, stack, architecture diagram nodes
- `data/experience.ts` — journey timeline, terminal lines

To swap a project or add a real one, edit the `projects` array — the layout,
numbering and animated architecture diagram adapt automatically.

## Before you ship

- `components/Contact.tsx` has placeholder LinkedIn/email links — update them.
- `app/layout.tsx` has placeholder `metadataBase` — point it at your real domain.
- Replace project screenshots: pass an `image` path in `data/projects.ts` and
  render it inside `components/ProjectShowcase.tsx` where the architecture panel is.

## Structure

```
app/            layout, page, global styles
components/     Navbar, Hero, About, TechMarquee, SkillOrbit, Projects,
                ProjectShowcase, Journey, AILab, GithubTerminal, Contact,
                Footer, Cursor, BackgroundEffects
data/           projects.ts, skills.ts, experience.ts
lib/            SmoothScroll.tsx (Lenis + GSAP ticker wiring)
```

## Notes

- Respects `prefers-reduced-motion` — smooth scroll, cursor and scroll-tied
  animations are skipped or shortened.
- Custom cursor and full particle count are desktop-only; mobile gets a
  simplified version per the brief.

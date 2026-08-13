# Portfolio (Next.js)

Personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and `next-intl` (Vietnamese/English).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). URLs are locale-prefixed (`/vi`, `/en`), defaulting to `vi`.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
npm run format  # Prettier --write
```

## Editing content

**All content lives in JSON files under `src/data/` — no code changes needed to update profile info, projects, skills, blog posts, or work experience.**

| File | Powers |
|---|---|
| `src/data/profile.json` | Name, role, bio, contact links, resume URL |
| `src/data/projects.json` | Case studies (problem, architecture, tech stack, results) |
| `src/data/skills.json` | Skill categories and items |
| `src/data/blog.json` | Blog posts |
| `src/data/experience.json` | Work experience timeline |

Shape of each file is defined in `src/lib/types.ts`.

Fields that hold user-facing prose (titles, descriptions, bios, etc.) are bilingual objects: `{ "vi": "...", "en": "..." }`. Edit both languages when adding or changing content.

Data is read at build/request time via `src/lib/data.ts` (server-only, `fs/promises` + `React.cache`) — restart `next dev` after editing a JSON file to see changes, or just rebuild for production.

### UI chrome text (buttons, labels, headings)

Short, fixed UI strings (nav labels, button text, section headings) are separate from content and live in `messages/vi.json` / `messages/en.json` (`next-intl` message catalogs). Edit these to change UI copy without touching data.

### Resume

`profile.json`'s `resumeUrl` points to `/resume.pdf`. Place the actual PDF at `public/resume.pdf`.

## Architecture notes

- **Server Components by default.** Each section (`src/components/sections/*`) is a thin async Server Component that fetches JSON via `lib/data.ts` and passes it as props to a co-located `*-client.tsx` Client Component that owns interactivity/animation. Only mark a component `"use client"` when it needs browser APIs, state, or event handlers.
- **Dynamic routes**: `/[locale]/projects/[id]` and `/[locale]/blog/[slug]` are statically generated via `generateStaticParams`, with per-page `generateMetadata`.
- **Contact form** posts to `/api/contact`, validated with `zod`, sent via [Resend](https://resend.com). Requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local` (see `.env.local` — never commit this file or paste the key in chat/logs).
- **Images**: `next/image` is used for project thumbnails; allowed remote hosts are configured in `next.config.ts` (`images.remotePatterns`) — add new hosts there if you use images from elsewhere.
# portfolio

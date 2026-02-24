# First Crack Journal

First Crack Journal is a personal coffee-journal web app built with TanStack Start and Cloudflare D1.

- Public page (`/`): shows recent journal posts.
- Admin page (`/admin`): create and delete posts.
- Data storage: Cloudflare D1 (`posts` table via Drizzle ORM).

## Tech Stack

- TanStack Start + TanStack Router
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- Drizzle ORM + Cloudflare D1
- Wrangler (Cloudflare local/dev/deploy workflow)

## Project Structure

- `src/routes/index.tsx`: public homepage + recent posts list.
- `src/routes/admin.tsx`: admin dashboard (create/delete posts).
- `src/utils/posts.functions.ts`: typed server functions used by routes.
- `src/utils/posts.server.ts`: database operations.
- `src/db/schema.ts`: Drizzle schema for `posts`.
- `wrangler.jsonc`: Cloudflare worker + D1 bindings.

## Prerequisites

- Node.js 20+
- npm
- Cloudflare account access to the configured D1 databases
- Wrangler authentication:

```bash
npx wrangler login
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start local dev server:

```bash
npm run dev
```

3. Open:

- `http://localhost:3000` (public site)
- `http://localhost:3000/admin` (admin dashboard)

### Important: local dev DB behavior

This project is configured to use a **remote Cloudflare D1 database** in local development (`remote: true` in `wrangler.jsonc`).

- The `DB` binding uses the configured `preview_database_id` for preview/dev workflows.
- If preview DB schema is missing, apply migrations (see below).

## Database Setup and Migrations

### Apply migrations to preview DB (recommended for local preview/dev)

```bash
npm run db:migrate:preview
```

### Apply migrations to production DB

```bash
npm run db:migrate
```

### Drizzle schema workflows

Generate migration files from schema changes:

```bash
npm run db:generate
```

Push schema directly via Drizzle D1 HTTP driver:

```bash
npm run db:push
```

`db:push` reads from environment variables required by `drizzle.config.ts`:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_DATABASE_ID`
- `CLOUDFLARE_D1_TOKEN`

You can place them in a local `.env` file.

## Scripts

- `npm run dev`: run local development server on port 3000.
- `npm run build`: build production assets.
- `npm run preview`: preview built app locally.
- `npm run deploy`: build and deploy with Wrangler.
- `npm run test`: run tests.
- `npm run lint`: run Biome linter.
- `npm run format`: run Biome formatter.
- `npm run check`: run Biome checks.

## Deploy

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

Ensure the `DB` binding in Cloudflare is mapped correctly for both production and preview environments.

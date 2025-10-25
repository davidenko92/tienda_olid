# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

D4IA-Gallery is a monorepo application for displaying high-resolution (600 DPI) scanned artwork. The project consists of:
- **Frontend**: React + Vite + Tailwind CSS (apps/web)
- **Backend**: Fastify + PostgreSQL (apps/api)
- **Database**: PostgreSQL 15 running in Docker
- **Images**: Stored locally in `data/images/`, NOT in the database

## Key Architecture Decisions

### Image Storage Strategy
Images are stored in the local filesystem, NOT in the database. The database only stores relative paths:
- Original images (600 DPI): `data/images/originals/`
- Thumbnails: `data/images/thumbs/`
- Database stores paths like: `images/thumbs/filename.jpg` and `images/originals/filename.jpg`
- Backend serves images via Fastify static file serving with prefix `/images/`

### Module System
Both frontend and backend use **ESM** (`"type": "module"` in package.json). Always use:
- `import` statements (not `require`)
- `.js` extensions when importing TypeScript files in backend code
- File URL conversion for `__dirname` equivalent: `fileURLToPath(import.meta.url)`

### Database Schema
Table: `products`
- `id_product` (SERIAL): Primary key
- `cd_slug` (VARCHAR): Unique slug for URLs
- `cd_name` (VARCHAR): Product name
- `ts_description` (TEXT): Description
- `cd_image_thumb` (VARCHAR): Relative path to thumbnail
- `cd_image_full` (VARCHAR): Relative path to original
- `nu_width_px`, `nu_height_px` (INTEGER): Image dimensions
- `fh_created_at` (TIMESTAMP): Creation date

## Development Commands

### Docker
```bash
docker compose up -d          # Start PostgreSQL
docker compose down           # Stop services
docker compose logs postgres  # View logs
```

### Backend (apps/api)
```bash
npm run dev       # Start dev server with tsx watch
npm run db:init   # Initialize database (Windows: uses set PGPASSWORD)
npm run build     # Compile TypeScript
npm run start     # Run compiled code
```

### Frontend (apps/web)
```bash
npm run dev       # Start Vite dev server (port 5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Common Development Workflows

### Adding a New Product
1. Add images to `data/images/originals/` and `data/images/thumbs/` with matching filenames
2. Insert record in database with relative paths (e.g., `images/thumbs/my-art.jpg`)
3. Use the slug as part of the filename for consistency

### Modifying the API
- API routes are in `apps/api/src/index.ts`
- Database connection logic is in `apps/api/src/db.ts`
- Environment variables are loaded from root `.env` file
- CORS is configured to allow requests from `http://localhost:5173`

### Modifying the Frontend
- Pages are in `apps/web/src/pages/` (Gallery.tsx, ProductDetail.tsx)
- Components are in `apps/web/src/components/`
- Tailwind config is in `apps/web/tailwind.config.js`
- API calls use `http://localhost:3000` as base URL

## Testing the Application

1. Ensure PostgreSQL is running: `docker compose up -d`
2. Initialize database: `cd apps/api && npm run db:init`
3. Start backend: `npm run dev` (from apps/api)
4. Start frontend: `npm run dev` (from apps/web)
5. Visit `http://localhost:5173`

## Important File Locations

- Environment variables: `.env` (root)
- Database init script: `data/db/init.sql`
- TypeScript configs: `apps/api/tsconfig.json` and `apps/web/tsconfig.json`
- Tailwind config: `apps/web/tailwind.config.js`
- Vite config: `apps/web/vite.config.ts`

## Troubleshooting

### Images not loading
- Verify images exist in `data/images/originals/` and `data/images/thumbs/`
- Check that filenames match database records (case-sensitive)
- Ensure backend is serving static files from correct path
- Check browser console for 404 errors

### Database connection issues
- Verify Docker container is running: `docker compose ps`
- Check `.env` file has correct DATABASE_URL
- Ensure port 5432 is not in use by another process

### TypeScript import errors
- Remember to use `.js` extension when importing in backend
- Ensure `"type": "module"` is in package.json
- Use `fileURLToPath(import.meta.url)` for path resolution

## Code Style Notes

- Use async/await for database queries
- Frontend uses functional components with hooks
- Backend uses Fastify route typing for type safety
- Tailwind utility classes for styling (no custom CSS files except index.css)
- API responses return JSON with proper error status codes (404, 500, etc.)

# Pixxel — AI Image Editor

Pixxel is a subscription-based SaaS AI Image Editor built with Next.js (App Router). It provides a modern, browser-based canvas editor with AI-powered transformations and traditional image-editing features so users can crop, resize, add text, adjust colors, replace or remove backgrounds, extend canvases, perform AI edits and enhancements, and export final assets.

**Features:**

- **Crop & Resize:** Precise pixel and aspect-ratio controls.
- **Text & Annotations:** Add, style, and position text layers on the canvas.
- **Adjustments:** Brightness, contrast, saturation, exposure, and other image controls.
- **AI Background:** Remove or replace image backgrounds using AI.
- **AI Extension / Outpainting:** Extend image canvas/content with intelligent fills.
- **AI Editing & Enhancement:** Upscale, enhance, deblur, denoise, and more.
- **Reset / Undo / Redo:** Revert changes or step through history.
- **Save / Export:** Save projects and export assets (PNG/JPEG/WebP) for web or print.
- **User Authentication:** Sign up / Sign in flows with Clerk.
- **Subscription Gating:** Unlock premium AI features via subscription.

**Key Libraries & Services:**

- **Next.js (App Router)** — Framework and routing.
- **JavaScript / React** — UI and logic.
- **Context API** — Global state management across the app.
- **Clerk** — Authentication and subscription management (billing integration).
- **Convex (Convex DB)** — Serverless database for storing users, projects and metadata.
- **Tailwind CSS** — Utility-first styling.
- **shadcn/ui** — Ready-made UI components.
- **Fabric.js** — Main canvas and layer management library (core of editor state).
- **ImageKit** — Image storage, CDN and AI transformations (background removal, upscaling, etc.).
- **react-colorful** — Color picker for background & element colors.
- **react-dropzone** — Drag & drop file uploads.
- **sonner** — Toast notifications.
- **react-spinner** (or similar) — Loading states and spinners.

Project follows a clean folder structure and uses custom hooks for re-usable logic (uploading, canvas state, AI calls, auth-aware behavior, etc.).

**Notable Patterns:**

- Canvas state and objects are managed with Fabric.js and persisted to Convex or ImageKit as needed.
- AI operations (background removal, upscaling) are performed via ImageKit or external AI services; results are stored in ImageKit and referenced from the project state.
- Subscription gating is enforced both on the client (UI) and server-side checks where appropriate.

**Folder Overview:**

- `app/` — Next.js App Router pages and providers (layout, global providers).
- `components/` — Reusable UI components (Header, FloatingShapes, ThemeProvider, etc.).
- `components/ui/` — shadcn-ui wrappers and primitive components.
- `hooks/` — Custom hooks (`useParallax`, `useStoreUserEffect`, etc.).
- `lib/` — Utility helpers.
- `convex/` — Convex backend functions and schema definitions.
- `public/` — Static assets.

## Getting Started (Development)

1. Install dependencies:

```powershell
npm install
# or
pnpm install
```

2. Create a `.env.local` with the required environment variables (example variables shown below).

3. Run the development server:

```powershell
npm run dev
# or
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables (examples)

- `NEXT_PUBLIC_CONVEX_URL` — Convex client URL (public) used by the frontend.
- `CONVEX_SERVER_KEY` — Convex server key (used by server-only code; keep secret).
- `NEXT_PUBLIC_IMAGEKIT_URL` / `IMAGEKIT_PUBLIC_KEY` / `IMAGEKIT_PRIVATE_KEY` — ImageKit credentials and endpoint.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — Clerk API keys for authentication and subscription checks.
- `NEXTAUTH_URL` or other provider-specific envs if additional auth integrations used.

Adjust the names to match those actually used in this repository; `NEXT_PUBLIC_CONVEX_URL` is already referenced in code.

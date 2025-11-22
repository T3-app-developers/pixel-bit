# Pixelbit

Pixelbit is a Vite + React scaffold that demonstrates a browser-style UI with domain-aware search, shopping for creative tools, photo memory, and a stubbed video-making AI action. The project ships with responsive styling, accessible controls, and mock data so you can extend the experience with real APIs or services.

## Prerequisites
- Node.js 18+ (includes npm)
- A modern browser for local preview

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   Vite prints a local URL (typically http://localhost:5173) where you can explore Pixelbit.
3. Create a production build:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Project Structure
- `src/` – React components and styles
  - `App.jsx` – top-level layout, tab routing between search and shopping, and feature logic
  - `styles.css` – global theme, layout grids, and responsive rules
- `public/` – static assets (favicon and room for future images)
- `index.html` – Vite entry point
- `vite.config.js` – Vite configuration with React plugin

## Features
### Domain-aware search
- Search bar detects domain-style queries (e.g., `example.com`) and surfaces navigation messaging.
- Non-domain queries trigger topic discovery with a short summary and three representative images generated as lightweight SVG placeholders.

### Shopping & tools
- Shopping grid lists mock browser tools such as Photo Memory, Photo Capture & Save, Video-Making AI, and utility kits.
- Tool selection toggles update a live count for quick comparison.

### Photo memory
- Upload or demo-capture images; they are stored in a local photo memory list with previews and labels.
- Uses inline SVG data URIs so the experience works without external assets; swap in real image URLs or public assets as needed.

### Video-making AI (stub)
- Button queues a mocked AI request and shows status text you can replace with live backend calls.

### Navigation
- Tabs switch between Search and Shopping views without a full page reload.

### Accessibility & responsiveness
- Semantic headings, labeled controls, `aria-live` status messaging, and keyboard-friendly buttons.
- Responsive CSS grid layouts adapt to narrow screens.

## Limitations & mock data
- Search summaries and visuals use static placeholder data; connect your APIs for live results.
- Video-making AI is stubbed and does not render real videos.
- Photo memory is stored in browser state only and will reset on reload.

## Testing
⚠️ No automated tests are provided. After installing dependencies, run `npm run build` to ensure the app bundles correctly.

## Contribution Guidelines
- Fork the repository and create feature branches for changes.
- Use clear commit messages that describe the intent of each change.
- Keep UI contributions accessible (labels, focusable elements, color contrast).
- Submit pull requests with a short summary of changes and any manual testing performed.

## Asset Handling
Representative images are generated as inline SVG data URIs at runtime to avoid external downloads. Place additional static assets (PNG, SVG, etc.) in `public/` and reference them with root-relative paths (e.g., `/images/photo.png`) for production builds.

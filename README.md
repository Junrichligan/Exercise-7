# Auth Demo

Minimal Vite + React wrapper to run the provided `loginpage.js` component.

How to run (Windows cmd.exe):

1. Install dependencies:

    npm install

2. Start dev server:

    npm run dev

3. Open the printed local URL (usually http://localhost:5173) in your browser.

Notes:
- This uses the Tailwind CDN in `index.html` so the UI classes work without building Tailwind locally.
- The main component is the existing `loginpage.js` at the project root and is imported by `src/App.jsx`.

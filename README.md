# Vibe Code — Photo Gallery

A small, self-contained Photo Gallery web app included in this repository under the `photo-gallery/` folder. This project is a learning/demo app for uploading, browsing, tagging, and viewing images with a responsive gallery UI and a lightweight backend for uploads and serving images.

## Live demo
(If you have a deployed demo, add the URL here.)

## Features
- Responsive gallery grid with lazy-loaded thumbnails
- Image upload with progress indicator
- Lightbox image preview with keyboard navigation
- Basic tagging and search/filter by tag or filename
- Optional image metadata (upload date, file size, dimensions)
- Local filesystem storage for development; pluggable S3 storage for production

## Tech stack
- Frontend: React (Create React App) with React Router and a lightbox library OR plain HTML/CSS/JS if the folder contains a static app
- Backend (optional): Node.js + Express for uploads and API; simple REST endpoints
- Storage: local filesystem in development; AWS S3 for production (optional)
- Tests: Jest + React Testing Library (frontend), supertest/mocha (backend) where included

## Project structure (what to expect in photo-gallery/)
- photo-gallery/
  - README.md (project-level instructions)
  - package.json (if Node/React)
  - public/, src/ (frontend app)
  - server/ or api/ (optional backend code)
  - uploads/ (local dev storage, typically gitignored)
  - .env.example
  - tests/

Adjust according to the actual contents of your `photo-gallery` folder.

## Quick start — frontend (React)
1. Clone and open the folder:
   git clone https://github.com/Sanskruti-316/vibe-code.git
   cd vibe-code/photo-gallery

2. Install and run:
   npm install
   npm run start

3. Open http://localhost:3000

## Quick start — full-stack (Node/Express backend)
1. In `photo-gallery/` inspect if there is a `server/` or `api/` folder. If so, you can run the backend:
   cd photo-gallery/server
   npm install
   npm run start         # or: node index.js / nodemon

2. Configure environment variables (create `.env` at the server root):
   PORT=5000
   UPLOAD_DIR=./uploads
   STORAGE_PROVIDER=local   # or s3
   # If using S3:
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   S3_BUCKET=...

3. Start the frontend (in a separate terminal):
   cd ../
   npm run start

The frontend is typically configured to call the backend at http://localhost:5000 — adjust the base URL in a `.env` or config file if needed.

## Environment variables
- FRONTEND: REACT_APP_API_URL (pointing to backend)
- BACKEND: PORT, UPLOAD_DIR, STORAGE_PROVIDER, AWS_* if using S3
See `.env.example` in the project for exact variable names (or add one if missing).

## Tests
- Frontend: npm test
- Backend: npm test (or use pytest if the backend is Python)
Run tests from the `photo-gallery` root or from `photo-gallery/server` depending on where the test files live.

## Deployment
- Static frontend: Netlify, Vercel, or GitHub Pages
- Backend + storage: deploy backend to Render/Heroku/Railway and use S3 for images; ensure CORS is configured and REACT_APP_API_URL points to your backend.

## Common commands
- npm install — install dependencies
- npm run start — start dev server (frontend or backend)
- npm run build — create production build of frontend
- node server/index.js — start backend (example)

## Security & production notes
- Do not commit `uploads/` or production credentials — add them to `.gitignore`.
- Validate uploads server-side (file type, size).
- Use signed URLs or a CDN in front of S3 for production performance and security.

## Contributing
If you'd like to improve the gallery:
1. Fork the repo
2. Create a branch: git checkout -b feat/your-feature
3. Make changes, add tests where appropriate
4. Commit and push, then open a pull request with details

If the change is large, open an issue first to discuss design.

## Troubleshooting
- Upload errors: check server logs, verify UPLOAD_DIR exists and is writable, and confirm env vars.
- CORS issues: ensure backend CORS allows requests from the frontend origin.
- Large images causing slow loads: implement server-side resizing and serve optimized thumbnails.

## License
Add a LICENSE file (e.g., MIT) if you want to make this project open-source. For demos, MIT is commonly used.

## Contact
Open an issue or reach out: https://github.com/Sanskruti-316

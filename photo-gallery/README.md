# Photo Gallery

This folder contains the Photo Gallery app (frontend + optional backend). Use this README to run, test, and develop the app locally.

Project layout
- public/          # static files for frontend build
- src/             # frontend source (components/pages/styles)
- server/          # optional backend (Express/Flask) for uploads and API
- docs/            # screenshots, diagrams, sample .env
- uploads/         # local uploads (gitignored)
- .env.example     # example environment variables
- package.json     # frontend scripts and deps
- server/package.json  # backend scripts and deps (if present)

Quick start — frontend
1. cd photo-gallery
2. npm install
3. npm run start
4. Open http://localhost:3000

Quick start — backend (Node/Express)
1. cd photo-gallery/server
2. npm install
3. cp .env.example .env
4. Edit .env (UPLOAD_DIR, PORT, STORAGE_PROVIDER)
5. npm run start
6. Default URL: http://localhost:5000

Important environment variables
- REACT_APP_API_URL=http://localhost:5000
- PORT=5000
- UPLOAD_DIR=./uploads
- STORAGE_PROVIDER=local  # or s3
- AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET (if using S3)

Development tips
- Keep `uploads/` out of Git (add to .gitignore).
- Add screenshots to `photo-gallery/docs/` and reference them in this file.
- Use `npm run lint` and `npm run format` if the project has those scripts.

Running tests
- Frontend: npm test
- Backend: cd server && npm test (if tests exist)

Deployment notes
- For static frontends use Netlify/Vercel/GitHub Pages.
- For full stack, host backend on Render/Heroku/Railway and store images in S3 or similar.

If file names or scripts differ in your project, update package.json and this README accordingly.
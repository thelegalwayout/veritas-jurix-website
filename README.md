# Veritas Jurix Website

Production-ready Vite + React website for Veritas Jurix.

## Deploy on Vercel
1. Upload these files to the GitHub repo.
2. In Vercel, Import Project from GitHub.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## Optional environment variables
- `VITE_GA_ID`: Google Analytics Measurement ID, e.g. `G-XXXXXXXXXX`.
- `VITE_LEAD_ENDPOINT`: Google Apps Script / form endpoint for lead capture.

If `VITE_LEAD_ENDPOINT` is not set, the form opens email to support@veritasjurix.com.

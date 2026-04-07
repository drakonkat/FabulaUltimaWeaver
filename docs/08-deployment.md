# Deployment

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Create `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   # Optional: GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. Run development server:
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

## Production Build

Build the application:
```bash
npm run build
```

Output is in the `dist/` directory. The build includes:
- Minified JavaScript and CSS
- Copied PDF resources
- Configured base path

## GitHub Pages Deployment

The repository includes a GitHub Actions workflow for automatic deployment.

### Setup

1. Go to your repository settings on GitHub
2. Navigate to **Secrets and variables > Actions**
3. Add a secret:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key

4. Update `vite.config.ts` if needed:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

### How It Works

- On push to `main`, the workflow builds the app
- Deploys to GitHub Pages automatically
- Base path is configured as `/the-gms-codex/`

### Manual Deployment

To deploy manually:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy `dist/` folder to your hosting provider:
   - Netlify: Drag and drop `dist` folder
   - Vercel: `vercel deploy`
   - Any static host

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI features |
| `GOOGLE_CLIENT_ID` | No | Google Sign-In client ID |

Note: The build process maps `GEMINI_API_KEY` to `process.env.API_KEY` internally.

## Limitations

- Internet connection required for AI features
- AI output should be reviewed before use in sessions
- Stat blocks are suggestions, not system-legal text
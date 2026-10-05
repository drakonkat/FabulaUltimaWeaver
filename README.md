
# The GM's Codex — AI Assistant for Game Masters (D&D, Fabula Ultima, and more)

The GM's Codex is a simple, friendly AI tool that helps Game Masters (GDR/TTRPG) plan and run sessions across different systems.
It works great with Fabula Ultima and Dungeons & Dragons, and it can adapt to generic fantasy settings too.

What it does for you:
- Turn your idea into a ready-to-run scene with a GM read‑aloud, NPCs, and background hooks.
- Continue the story based on what your players did last session.
- Generate quick combat hooks (when useful) with difficulty hints.
- Keep content consistent with your chosen system (D&D 5e tone/lore or Fabula Ultima JRPG style).
- Generate character descriptions and backgrounds using AI.

If you’re a busy GM and want fast, inspiring material that fits your table’s style, this app is for you.

## How it works (in short)
- You pick a game system (Fabula Ultima, D&D, or Generic) and tone (e.g., High Fantasy).
- You provide a short prompt (and optionally your party details or an image with a vision-capable model).
- The AI, through an OpenAI-compatible proxy, returns a structured scene with:
  - Story name
  - NPC list (with names and descriptions)
  - Background/lore
  - A GM read‑aloud paragraph 
  - Optional: a combat suggestion (only when it makes sense)
- You can then continue the story by feeding back what your players did.

## Quick Start
Prerequisites: Node.js 22.12+.

1) Install dependencies
   npm install

2) Copy `.env.example` to `.env` and configure the proxy:

   ```dotenv
   VITE_AI_BASE_URL=https://your-proxy.example/v1
   VITE_AI_API_KEY=your-limited-public-proxy-token
   VITE_AI_MODEL=openai/gpt-6-luna
   ```

   `.env` files are ignored by Git. The browser still receives these values in the
   built JavaScript: use a dedicated public proxy token, never an upstream provider
   secret. Enforce model restrictions, quotas and spending limits on the proxy;
   CORS and the app's local usage counter do not prevent token reuse outside a browser.

3) Run the app locally
   npm run dev

4) Build for production
   npm run build
   The static files are output to the dist folder.

## Optional: Google Sign‑In
If you want Google Sign‑In, set your client ID in .env.local:
  VITE_GOOGLE_CLIENT_ID=your_client_id_here

(See config.js for details. The app will work without Sign‑In as well.)

## Static deployment
Set `VITE_AI_BASE_URL`, `VITE_AI_API_KEY` and `VITE_AI_MODEL` in the deployment
environment **before running `npm run build`**, then publish `dist/`. Changes to these
variables require a rebuild; setting runtime variables on the static host is not enough.
The current base path is `/`, suitable for https://gmcodex.tnl.one/.

Allow `https://gmcodex.tnl.one` in the proxy's CORS origins, including POST and
the Authorization/Content-Type headers. Add your localhost origin separately for
local development. The proxy must support `/v1/chat/completions`, non-streaming
responses and JSON output; image attachments also require vision support.

No application server or database is needed. Campaigns are stored in the browser's
localStorage; use Backup & Restore to transfer or preserve them. The legacy `server/`
directory is not used by this frontend. Internet is needed for AI and CDN assets.

The footer displays the version from `package.json` automatically. Run `npm test`
for the AI client checks and `npm run build` to verify the static bundle.

## Supported systems (examples)
- Fabula Ultima: JRPG flavor, evocative names, colorful NPCs.
- Dungeons & Dragons (5e tone): classic fantasy, Forgotten Realms‑style naming.
- Generic fantasy: neutral style for homebrew worlds.

You can switch systems anytime; the AI adapts the tone and content accordingly.

## Tips for best results
- In the monster editor, use **Create or refine with AI** for generic or Fabula Ultima
  monsters. Describe a new creature or request changes to the current form, including
  attributes and inventory. Review the draft, then Save/Update; Cancel discards it.
- One-shot locations, events, NPCs and items also support instruction-based AI
  refinement. Review the preview and select Apply to keep it, or Cancel to discard it.
- Give your prompt a clear goal: “The party reaches a foggy port city hunting a stolen relic.”
- Add your party details (name, class, background) to improve NPC hooks.
- Use continuation mode after each session to keep continuity tight.
- Upload an image as inspiration (a map or character sketch) with a vision-capable proxy model.

## Limitations
- Always review AI output before using it at the table.
- Stat blocks are not system‑legal rules text; treat combat hooks as suggestions.
- AI features require an internet connection and a working proxy token. Without AI configuration, local editing and backups remain available.

## Contributing
We welcome issues and pull requests! Whether you found a bug, want to improve UX copy, or add support tips for another TTRPG system, your contributions are appreciated.

How to contribute:
- Fork this repository and create a feature branch:
  - git checkout -b feat/your-feature or fix/your-bug
- Install and run locally:
  - npm install
  - npm run dev
- Keep PRs small and focused. Add screenshots/GIFs for UI changes and a short note for prompts/model tweaks.
- Make sure it builds before opening a PR: npm run build
- Open a Pull Request with a clear title and description of the change and motivation.

Guidelines:
- Don’t commit secrets. Use .env.local for keys (see Quick Start).
- Keep text prompts and output schema consistent with services/geminiService.js.
- If your change is substantial, please open an issue first to discuss the approach.

## License and credits
This project uses an external AI proxy for text generation and optional image understanding. Respect the terms of use of all third‑party services.

Happy weaving, and have great sessions!

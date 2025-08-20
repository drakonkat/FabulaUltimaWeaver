
# Fabula Ultima Weaver — AI Assistant for Game Masters (D&D, Fabula Ultima, and more)

Fabula Ultima Weaver is a simple, friendly AI tool that helps Game Masters (GDR/TTRPG) plan and run sessions across different systems.
It works great with Fabula Ultima and Dungeons & Dragons, and it can adapt to generic fantasy settings too.

What it does for you:
- Turn your idea into a ready-to-run scene with a GM read‑aloud, NPCs, and background hooks.
- Continue the story based on what your players did last session.
- Generate quick combat hooks (when useful) with difficulty hints.
- Keep content consistent with your chosen system (D&D 5e tone/lore or Fabula Ultima JRPG style).
- Optional: create a portrait image for a hero using AI.

If you’re a busy GM and want fast, inspiring material that fits your table’s style, this app is for you.

## How it works (in short)
- You pick a game system (Fabula Ultima, D&D, or Generic) and tone (e.g., High Fantasy).
- You provide a short prompt (and optionally your party details, an image, or even an audio recap).
- The AI (Google Gemini) returns a structured scene with:
  - Story name
  - NPC list (with names and descriptions)
  - Background/lore
  - A GM read‑aloud paragraph 
  - Optional: a combat suggestion (only when it makes sense)
- You can then continue the story by feeding back what your players did.

## Quick Start
Prerequisites: Node.js 18+ (Node 22 is used in CI)

1) Install dependencies
   npm install

2) Add your API key
   - Create a file named .env.local in the project root.
   - Add your Gemini API key:
     GEMINI_API_KEY=your_key_here

   Notes:
   - The build maps GEMINI_API_KEY to process.env.API_KEY internally (used by the app).
   - Never commit your real key.

3) Run the app locally
   npm run dev

4) Build for production
   npm run build
   The static files are output to the dist folder.

## Optional: Google Sign‑In
If you want Google Sign‑In, set your client ID in .env.local:
  GOOGLE_CLIENT_ID=your_client_id_here

(See config.js for details. The app will work without Sign‑In as well.)

## Deploy (GitHub Pages)
This repo includes a GitHub Actions workflow that publishes the dist folder to GitHub Pages on pushes to main.
- Base path is configured as /FabulaUltimaWeaver/ in vite.config.ts.
- The workflow expects a repository secret called GEMINI_API_KEY.

## Supported systems (examples)
- Fabula Ultima: JRPG flavor, evocative names, colorful NPCs.
- Dungeons & Dragons (5e tone): classic fantasy, Forgotten Realms‑style naming.
- Generic fantasy: neutral style for homebrew worlds.

You can switch systems anytime; the AI adapts the tone and content accordingly.

## Tips for best results
- Give your prompt a clear goal: “The party reaches a foggy port city hunting a stolen relic.”
- Add your party details (name, class, background) to improve NPC hooks.
- Use continuation mode after each session to keep continuity tight.
- Upload an image as inspiration (a map, a character sketch), or an audio recap if you have one.

## Limitations
- Always review AI output before using it at the table.
- Stat blocks are not system‑legal rules text; treat combat hooks as suggestions.
- Internet connection and a valid Gemini API key are required.

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
This project uses Google Gemini for text and image generation. Respect the terms of use of all third‑party services.

Happy weaving, and have great sessions!

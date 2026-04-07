# Project Overview

The GM's Codex is an AI-powered assistant for Game Masters (GMs) to plan and run tabletop RPG sessions. The application generates story content, NPCs, combat encounters, and one-shot adventures using Google Gemini AI.

## Architecture

The project is a single-page React application built with Vite. It uses React 19 for the UI layer and communicates with the Google Gemini AI API for content generation.

### Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite 7
- **AI Service**: Google Gemini API (`@google/genai`)
- **PDF Generation**: pdf-lib
- **Authentication**: Google Sign-In (JWT)

### Project Structure

```
/workspace/rigs/e4e0162c-d289-4e63-b2a1-0f70ab66c19b/worktrees/gt__toast__372e389c/
├── components/        # React UI components
├── services/         # API integrations
├── hooks/            # Custom React hooks
├── data/             # Game data and templates
├── i18n/            # Internationalization
├── resources/        # Static assets (PDF templates)
├── config.js         # Application configuration
├── types.js         # Type definitions
└── App.js           # Main application component
```

## Supported Game Systems

- **Fabula Ultima**: JRPG-inspired fantasy with colorful character names and evocative storytelling
- **Dungeons & Dragons (5e)**: Classic fantasy with Forgotten Realms-style naming conventions
- **Generic Fantasy**: Neutral style for homebrew worlds

## Supported Languages

- English (en)
- Italian (it)

## Application Modes

### Game Master (GM) Mode

- Create and manage campaigns
- Generate story scenes with AI
- Continue stories based on player actions
- Manage heroes, monsters, and NPCs
- Create one-shot adventures
- Manage battle maps

### Player Mode

- View character information
- Chat with NPCs
- Track campaign notes

## Data Flow

1. User provides a prompt through the UI
2. App checks usage limits (if authenticated)
3. Prompt is sent to Gemini AI with game system instructions
4. AI returns structured JSON response
5. App updates campaign state and displays content
6. Usage is tracked for authenticated users
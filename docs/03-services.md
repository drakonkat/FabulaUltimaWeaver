# Services

## geminiService.js

**File**: `services/geminiService.js`

This module provides all AI-powered functionality using Google Gemini. It exports functions for generating various types of game content.

### Prerequisites

- Google Gemini API key (`GEMINI_API_KEY` environment variable)
- Model: `gemini-2.5-flash`

### Exported Functions

---

### `generateStory(prompt, heroes, monsters, language, imageFile, gameSystem, campaignTone, continuationDetails)`

Generates a story scene for a campaign.

**Parameters**:
- `prompt` (string): Core idea for the scene
- `heroes` (array): Hero characters
- `monsters` (array): Campaign monsters
- `language` (string): 'en' or 'it'
- `imageFile` (File, optional): Inspiration image
- `gameSystem` (string): 'Fabula Ultima', 'D&D', or 'Generic'
- `campaignTone` (string): e.g., 'High Fantasy'
- `continuationDetails` (object, optional): Previous story context

**Returns**: Promise resolving to story object with:
```javascript
{
  storyName: string,
  NPC: Array<{name: string, description: string}>,
  backgroundStory: string,
  masterToRead: string,
  mustCombat: {who: string, difficulty: string} | null,
  previousSituation: string,
  worldSituationUpdate: string | null
}
```

---

### `rewriteText(textToRewrite, language)`

Rewrites text to be more narrative and evocative.

**Parameters**:
- `textToRewrite` (string): Text to enhance
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to rewritten string.

---

### `generateCharacterBackground(race, heroClass, language)`

Generates a brief character background story.

**Parameters**:
- `race` (string): Character race
- `heroClass` (string): Character class
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to background string (2 sentences).

---

### `generateOneShotContent(partToGenerate, oneShotContext, language)`

Generates a specific part of a one-shot adventure.

**Parameters**:
- `partToGenerate` (string): Section to generate (e.g., 'mainStoryArc')
- `oneShotContext` (string, optional): Adventure context
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to content object.

---

### `chatWithNpc(npc, chatHistory, languageProvides)`

Allows players to converse with NPCs.

**Parameters**:
- `npc` (object): NPC data
- `chatHistory` (array): Array of `{role: 'user'|'model', text: string}`
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to NPC response string.

---

### `generateOneShotAdventure(params, language)`

Generates a complete one-shot adventure.

**Parameters**:
- `params` (object): Adventure parameters
  - `premise` (string)
  - `genre` (string)
  - `numHeroes` (number)
  - `difficulty` (string)
  - `duration` (string)
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to adventure object with:
```javascript
{
  title: string,
  mainStoryArcs: Array,
  locations: Array,
  events: Array,
  npcs: Array,
  items: Array,
  monsters: Array
}
```

---

### `generateFabulaMonster(prompt, language)`

Generates a Fabula Ultima monster stat block.

**Parameters**:
- `prompt` (string): Monster description
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to monster object with:
```javascript
{
  name: string,
  description: string,
  level: number,
  rank: 'soldier'|'elite'|'champion',
  species: string,
  attributes: {dex, ins, mig, wlp},
  stats: {hp, mp, init, def, mdef},
  affinities: {...},
  basicAttacks: Array,
  spells: Array,
  specialRules: Array
}
```

---

### `generateFabulaUltimaSheet(hero, language)`

Generates a filled PDF character sheet.

**Parameters**:
- `hero` (object): Complete hero data
- `language` (string): 'en' or 'it'

**Returns**: Promise resolving to PDF bytes (Uint8Array).

---

### Error Handling

All functions throw an `Error` with a descriptive message on failure. The app displays these errors to the user via the error state.
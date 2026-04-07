# Data Structures

## Configuration

### config.js

**File**: `config.js`

Application-wide configuration constants.

```javascript
GOOGLE_CLIENT_ID    // Google Sign-In Client ID
MAX_CAMPAIGNS       // Maximum campaigns per user (free plan): 5
MAX_DAILY_PROMPTS   // Maximum AI prompts per day: 20
```

## State Structure

The application state is stored in localStorage with the following structure:

```javascript
{
  version: 8,
  campaigns: Campaign[],
  oneShots: OneShot[],
  playerGames: PlayerGame[],
  maps: BattleMap[],
  hasCompletedOnboarding: boolean,
  hasCompletedMapTutorial: boolean,
  usage: {
    promptsToday: number,
    lastPromptDate: string  // ISO date
  }
}
```

### Campaign Object

```javascript
{
  id: string,                    // UUID
  name: string,
  storyData: StoryData | null,
  heroes: Hero[],
  monsters: Monster[],
  gameSettings: {
    system: 'Fabula Ultima' | 'D&D' | 'Generic',
    tone: string
  },
  lastModified: number        // Unix timestamp
}
```

### Hero Object

```javascript
{
  id: string,
  name: string,
  gender: string,
  race: string,
  class: string,
  age: string,
  appearance: string,
  background: string,
  status: string,
  stats: Attribute[],
  inventory: InventoryItem[],
  // Fabula Ultima specific
  fabulaAttributes: { dex, ins, mig, wlp },
  classes: ClassLevel[],
  acquiredAbilities: { [classId]: { [abilityId]: count } },
  currentHp: number,
  currentMp: number,
  currentIp: number,
  fabulaPoints: number,
  zenit: number,
  bonds: Bond[]
}
```

### Monster Object

```javascript
{
  id: string,
  name: string,
  attributes: Attribute[],
  inventory: InventoryItem[]
}
```

### OneShot Object

```javascript
{
  id: string,
  title: string,
  premise: string,
  genre: string,
  numHeroes: number,
  difficulty: string,
  duration: string,
  heroes: Hero[],
  generated: OneShotContent,
  lastModified: number
}
```

### BattleMap Object

```javascript
{
  id: string,
  name: string,
  layers: Layer[],
  activeLayerId: string,
  fogOfWar: { enabled: boolean, radius: number },
  theme: 'grid' | 'plain' | 'dungeon' | 'cave'
}
```

### Layer Object

```javascript
{
  id: string,
  name: string,
  drawings: Drawing[],
  tokens: Token[]
}
```

## Template Data

### templates.js

**File**: `data/templates.js`

Pre-built character templates for quick hero creation.

### randomizerData.js

**File**: `data/randomizerData.js`

Random generation data for character creation (names, backgrounds).

### exampleCampaign.js

**File**: `data/exampleCampaign.js`

Example campaign data for demonstration.

### fabulaUltimaData.js

**File**: `data/fabulaUltimaData.js`

Static game data for Fabula Ultima:
- Classes list
- Class ability details
- Equipment lists

### fabulaUltimaEquipment.js

**File**: `data/fabulaUltimaEquipment.js`

Equipment item database for Fabula Ultima.

### fabulaUltimaIdentityHelper.js

**File**: `data/fabulaUltimaIdentityHelper.js`

Identity helper data for Fabula Ultima character backgrounds.

### oneShotTemplates/*.js

**File**: `data/oneShotTemplates/`

Pre-built one-shot adventure templates:
- theCrimsonCovenant.js
- theHeartlessMasquerade.js
- theWhisperingMaw.js
- theSylvanOracle.js
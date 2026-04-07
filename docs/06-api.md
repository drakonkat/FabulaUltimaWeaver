# API Reference

## Application Programming Interface

This document covers the main functions and patterns used in the application.

## Main App Functions

### State Management

The application uses React's `useState` and `useCallback` hooks for state management. All state updates flow through `setAppState`.

### Handlers

#### Story Generation

```javascript
handleGenerate(prompt, imageFile, gameSystem, campaignTone)
```

- **Purpose**: Generate a new story scene
- **Called by**: `PromptInput` component
- **Updates**: Active campaign's `storyData`

#### Story Continuation

```javascript
handleContinue(details)
```

- **Purpose**: Continue from previous scene
- **Called by**: `ContinuationInput` component
- **Details object**: `{ combatOutcome, heroActions, nextPrompt }`

#### One-Shot Content Generation

```javascript
handleGenerateOneShotContent(part, context)
```

- **Purpose**: Generate specific part of one-shot adventure
- **Parts**: 'mainStoryArc', location, etc.

#### Text Rewriting

```javascript
handleRewrite(text)
```

- **Purpose**: Enhance narrative text with AI
- **Called by**: Notes manager

#### Background Generation

```javascript
handleGenerateBackground(race, heroClass)
```

- **Purpose**: Generate character backstory
- **Called by**: Hero manager

### Campaign Management

```javascript
handleNewCampaign()        // Create new campaign
handleUpdateCampaign(campaign)  // Update campaign
handleDeleteCampaign(id)    // Delete campaign
handleLoadExampleCampaign()   // Load demo campaign
```

### Hero Management

```javascript
handleAddHero(heroData)      // Add hero to active campaign
handleUpdateHero(hero)     // Update hero
handleRemoveHero(id)        // Remove hero
```

### Monster Management

```javascript
handleAddMonster(monsterData)    // Add monster
handleUpdateMonster(monster)     // Update monster
handleRemoveMonster(id)          // Remove monster
```

## Internal Components

### Dice Roller

```javascript
DiceRoller()
```

- Self-contained component with dice rolling functionality
- Dice types: d4, d6, d8, d10, d12, d20, d100
- Shows critical (max) and fumble (1) results

### Player Functions

```javascript
chatWithNpc(npc, chatHistory, language)
```

- Handles NPC conversations
- Uses Gemini to generate in-character responses

## Usage Limits

| User Type | Max Campaigns | Max Daily Prompts |
|----------|--------------|-----------------|
| Anonymous | Unlimited | Unlimited |
| Authenticated | 5 | 20 |

Usage is tracked in `appState.usage` with daily reset.

## State Keys

Storage keys (localStorage):
- `gmsCodexState_anonymous` - Anonymous user state
- `gmsCodexState_{user.sub}` - Authenticated user state
- `gmsCodexLanguage` - Selected language
- `gmsCodexTheme` - Selected theme
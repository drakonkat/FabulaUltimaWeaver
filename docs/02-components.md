# Components

The UI is built with React using a component-based architecture. All components are functional components rendered via `React.createElement`.

## Layout Components

### Header

**File**: `components/Header.js`

Navigation bar with:
- App title and branding
- Language switcher
- Theme switcher
- Mode switcher (GM/Player)
- Sign out (when authenticated)

### Footer

**File**: `components/Footer.js`

Simple footer with copyright information and links.

### BottomNavBar

**File**: `components/BottomNavBar.js`

Mobile-friendly bottom navigation for quick access to main features.

### MainViewSwitcher

**File**: `components/MainViewSwitcher.js`

Tab-based navigation for switching between:
- Campaigns
- One-Shots
- Battle Maps
- Player Games

### GMViewSwitcher

**File**: `components/GMViewSwitcher.js`

View switcher for GM dashboard showing:
- Campaign list
- Active campaign view

## Campaign Management

### CampaignList

**File**: `components/CampaignList.js`

Displays all saved campaigns with options to:
- Create new campaign
- Load existing campaign
- Delete campaign

### CampaignNameEditor

**File**: `components/CampaignNameEditor.js`

Inline editor for campaign names.

### SaveCampaign

**File**: `components/SaveCampaign.js`

Dialog for saving campaign data to localStorage.

### LoadCampaign

**File**: `components/LoadCampaign.js`

Dialog for loading saved campaign data.

### BackupManager

**File**: `components/BackupManager.js`

Full-state backup/restore functionality:
- Export state to JSON
- Import state from JSON

## Content Generation

### PromptInput

**File**: `components/PromptInput.js`

Primary input form for generating story content:
- Game system selector
- Tone selector
- Story prompt textarea
- Optional image upload
- Submit button

### StoryDisplay

**File**: `components/StoryDisplay.js`

Renders generated story content including:
- Story name
- NPCs with descriptions
- Background story
- GM read-aloud text
- Combat encounter (if applicable)
- World situation updates

### ContinuationInput

**File**: `components/ContinuationInput.js`

Form for continuing an existing story:
- Combat outcome selector
- Hero actions input
- Next scene prompt
- Submit continuation

## Character Management

### HeroManager

**File**: `components/HeroManager.js`

Manages party heroes with:
- Add/Edit/Remove heroes
- Character templates
- Random character generation
- AI-generated backgrounds
- Fabula Ultima character sheets
- PDF export

### MonsterManager

**File**: `components/MonsterManager.js`

Manages campaign monsters with:
- Add/Edit/Remove monsters
- AI-generated monster stats
- Attribute tracking

## One-Shot Adventures

### OneShotList

**File**: `components/OneShotList.js`

Displays saved one-shot adventures.

### OneShotDashboard

**File**: `components/OneShotDashboard.js`

Full-featured dashboard for creating and editing one-shot adventures:
- Story arc editor
- Location generator
- NPC chat functionality
- Event management
- Item tracking

## Battle Maps

### BattleMapManager

**File**: `components/BattleMapManager.js`

Canvas-based battle map editor with:
- Drawing tools
- Token placement
- Layer management
- Fog of war
- Grid themes

## Tutorials & Onboarding

### Onboarding

**File**: `components/Onboarding.js`

First-time user welcome and tutorial flow.

### MapTutorial

**File**: `components/MapTutorial.js`

Battle map editor tutorial.

### FabulaGuidedCreation

**File**: `components/FabulaGuidedCreation.js`

Step-by-step guided character creation for Fabula Ultima.

### FabulaClassDetails

**File**: `components/FabulaClassDetails.js`

Modal displaying class details and abilities.

## Utility Components

### LoadingSpinner

**File**: `components/LoadingSpinner.js`

Loading indicator during AI generation.

### ThemeSwitcher

**File**: `components/ThemeSwitcher.js`

Dropdown for selecting visual themes:
- Dark (default)
- Light
- Arcane
- Draconic

### LanguageSwitcher

**File**: `components/LanguageSwitcher.js`

Language selector (English/Italian).

### PdfPreviewModal

**File**: `components/PdfPreviewModal.js`

Modal for previewing generated PDFs.

### LoginScreen

**File**: `components/LoginScreen.js`

Google Sign-In interface.

### ModeSwitcher

**File**: `components/ModeSwitcher.js`

Toggle between GM and Player modes.
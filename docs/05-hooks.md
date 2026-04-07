# Hooks

Custom React hooks for state management and feature implementation.

## useTranslation

**File**: `hooks/useTranslation.js`

Provides internationalization functionality.

### Context Provider

**LanguageProvider** wraps the application and provides:
- Current language state
- Language setter (persists to localStorage)
- Translation function `t()`

### useTranslation Hook

```javascript
const { language, setLanguage, t } = useTranslation();
```

**Returns**:
- `language` (string): Current language ('en' or 'it')
- `setLanguage` (function): Set the language
- `t(key, replacements)` (function): Translate a key

**Example**:
```javascript
const { t, language } = useTranslation();

// Simple translation
const message = t('appName');

// With replacements
const msg = t('welcomeUser', { name: userName });
// Key: "welcomeUser": "Welcome, {name}!"
// Result: "Welcome, John!"
```

### Translation Keys

Translations are stored in `i18n/locales.js`. Keys include:
- UI labels (buttons, headers)
- Form placeholders
- Error messages
- Game-specific terms

---

## useTheme

**File**: `hooks/useTheme.js`

Provides theme context for the application.

### ThemeContext

Context provider for theme state (managed in App.js).

### useTheme Hook

```javascript
const theme = useTheme();
```

**Returns**: Theme context value (managed in parent).

**Usage Note**: This hook is primarily used within App.js and components that need direct theme access.

### Available Themes

- **Dark**: Default dark theme
- **Light**: Light theme
- **Arcane**: Purple/magical aesthetic
- **Draconic**: Red/fire aesthetic

### CSS Variables

Themes use CSS custom properties:
```css
:root {
  --bg-primary: #1a1a2e;
  --text-primary: #e0e0e0;
  --accent-primary: #6366f1;
  /* ... and more */
}
```

Theme classes are applied to `document.documentElement`.
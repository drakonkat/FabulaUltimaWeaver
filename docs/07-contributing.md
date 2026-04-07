# Contributing Guidelines

## How to Contribute

We welcome contributions! Whether you found a bug, want to improve UX, or add support for another TTRPG system, your help is appreciated.

## Getting Started

1. **Fork** this repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/the-gms-codex.git
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feat/your-feature
   # or
   git checkout -fix/your-bug
   ```

## Setting Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your API key:
   Create `.env.local` in the project root:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build to verify:
   ```bash
   npm run build
   ```

## Code Standards

### Style

- Use React without JSX (via `React.createElement`)
- Follow existing patterns in the codebase
- Use meaningful variable names

### Git Commit Messages

- Use clear, descriptive commit messages
- Reference issues when applicable
- Keep commits focused and atomic

### Pull Requests

- Keep PRs small and focused
- For UI changes, include screenshots/GIFs
- For prompt/model changes, add a note explaining the change
- Ensure the build passes before opening a PR
- Open a Pull Request with a clear title and description

## What to Contribute

### Bug Fixes
- Fix issues reported in GitHub issues
- Ensure the fix doesn't break other functionality

### Features
- Add support for new TTRPG systems
- Improve AI prompt engineering
- Add new UI components

### Documentation
- Improve README and docs
- Add inline comments to complex code
- Translate UI strings

### Improvements
- Performance optimizations
- UX improvements
- Accessibility enhancements

## Important Notes

### Secrets

- NEVER commit API keys or secrets
- Use `.env.local` for local development
- The build maps `GEMINI_API_KEY` to `process.env.API_KEY`

### Prompts

- Keep text prompts and output schema consistent with `services/geminiService.js`
- Test AI outputs before committing

### Before Substantial Changes

If your change is substantial (new features, architecture changes), please open an issue first to discuss the approach.

## License

This project uses Google Gemini for text and image generation. Respect the terms of use of all third-party services.
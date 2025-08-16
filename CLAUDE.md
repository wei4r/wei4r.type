# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Next.js)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Overview

This is a Zhuyin (Bopomofo) typing game built with Next.js, TypeScript, and React. Players type the Zhuyin pronunciation of displayed Chinese characters within a time limit.

## Architecture

### State Management Pattern
The app uses a custom hooks architecture with clear separation of concerns:

- `useTypingGame` (src/hooks/useTypingGame.ts) - Core typing logic, keyboard handling, word progression
- `useLogic` (src/hooks/useLogic.ts) - High-level game orchestration, connects typing and countdown
- `useCountdown` (src/hooks/useCountDown.ts) - Timer functionality

### Game State Flow
1. **'idle'** - Initial state, waiting for first keypress
2. **'start'** - Triggered on first valid key, starts countdown  
3. **'typing'** - Active gameplay state
4. **'end'** - Game over, show results

### Key Technical Components

**Word Generation & Management** (src/utils.ts):
- `getRandomWords()` generates word objects from src/words.json
- Dynamic line management removes completed lines when cursor reaches line 3
- Each word contains letterArr with individual letter state tracking

**Game Logic** (src/logic.ts):
- `updateCursor()` - DOM-based cursor positioning system
- `moveCurrent()` - Handles cursor movement and validation
- `checkCorrect()` - Validates input against expected Zhuyin with alternative key support

**Input Handling**:
- Supports Zhuyin characters and alternative QWERTY mappings (alter_key object)
- Backspace can move between words if previous word was incorrect
- Real-time visual feedback for correct/incorrect letters

### Firebase Integration
- Visit counter API endpoint at `/api/visit.js`
- Uses Firebase Admin SDK with environment variables for credentials
- Tracks page view count in Firestore

### Component Structure
- Components are functional with hooks, no class components
- Game component (src/components/game.tsx) orchestrates the main game flow
- WordContainer displays the typing interface with cursor overlay
- Mobile detection prevents gameplay on mobile devices

## Important Development Notes

- Game state is managed through refs and useState, not external state management
- Cursor positioning uses getBoundingClientRect() for precise placement
- Word progression triggers new word generation to maintain continuous gameplay
- Alternative key mappings allow standard keyboard users to type Zhuyin characters
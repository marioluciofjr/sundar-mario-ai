# Product Requirements Document (PRD)

## 1. Introduction
This project is a mini web game featuring a protagonist based on Sundar Pichai dressed as Super Mario. The game is divided into two distinct phases with a technology and Artificial Intelligence thematic backdrop. The objective is to progress through the phases to score points before time runs out.

## 2. Objective
Create an engaging, short-form interactive web game that highlights Google AI (Gemini) through gamification.

## 3. Gameplay Overview
### Phase 1: The "AI" Star Quest
- **Setting:** A technology and AI-themed level (e.g., servers, neural network nodes, cloud infrastructure).
- **Character:** Sundar Mario (Sundar Pichai in a Mario-style outfit).
- **Core Action:** The player must navigate the character to capture a glowing star labeled "AI".
- **Completion:** Capturing the star triggers the transition to Phase 2.

### Phase 2: The Gemini Ball Pit
- **Setting:** A colorful "ball pit" representing data or knowledge processing.
- **Core Action:** A countdown timer starts from 10 and decreases to 1. During this time, the player must find and interact with (click/collect) specific letters: **G, E, M, I, N, I**.
- **Scoring:** Collecting correct letters accumulates points.
- **Completion:** The game ends when the timer reaches 0, displaying the final score.

## 4. Target Audience
Developers, AI enthusiasts, and Google fans looking for a fun, quick interactive easter egg experience.

## 5. Technical Requirements
- Built using React and Vite.
- Responsive design tailored for Desktop (keyboard controls for movement, mouse for clicking).
- Tailwind CSS for styling and layout.
- `framer-motion` for transitions and animations.
- Custom physics/movement logic using React hooks and `requestAnimationFrame` for game loops.

## 6. Traceability Matrix

| Req ID | Requirement Description | Phase | Spec Reference | Status |
|---|---|---|---|---|
| REQ-01 | Web game featuring Sundar Pichai as Super Mario. | Game Setup | `Intro.tsx`, `App.tsx` | Implemented |
| REQ-02 | Phase 1: Capture AI star(s) with technology theme. | Phase 1 | `Phase1.tsx` | Implemented |
| REQ-03 | Phase 1: 10 Stars with Gemini logo, triggering 10 to 1 countdown. | Phase 1 | `Phase1.tsx` | Implemented |
| REQ-04 | Phase 2: Gemini Ball pit with countdown 10 to 1. | Phase 2 | `Phase2.tsx` | Implemented |
| REQ-05 | Phase 2: Accumulate points collecting G, E, M, I, N, I. | Phase 2 | `Phase2.tsx` | Implemented |
| REQ-06 | Intro Screen: Language selector to translate UI (en, pt, es, fr, it, de, zh, ja). | Intro | `Intro.tsx`, `i18n.ts` | Implemented |
| REQ-07 | Game Over: Show score history table. | Game Over | `GameOver.tsx` | Implemented |
| REQ-08 | Intro/Game Over: High Score display and reset button. | Intro / Game Over | `Intro.tsx`, `App.tsx` | Implemented |
| REQ-09 | Game Over: Highlight new records prominently. | Game Over | `GameOver.tsx` | Implemented |

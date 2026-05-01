# Feature Specifications (Specs)

## 1. Game State Management
- **State variables:** `gamePhase` ('intro', 'phase1', 'phase2', 'end'), `score`, `timeLeft`.
- **Transitions:** 
  - Intro -> Phase 1 (Click Start)
  - Phase 1 -> Phase 2 (Collision detection between Character and AI Star)
  - Phase 2 -> End (Timer reaches 0)

## 2. Phase 1: Multi-Star AI Quest (Countdown)
- **Controls:** Arrow keys (Up, Down, Left, Right) or WASD.
- **Graphics:** 
  - **Sundar Mario:** Represented by an emoji (👨🏽‍💻 or 🍄) or simple CSS avatar.
  - **AI Star:** 10 stars, each shaped as a 4-pointed sparkle (like the Gemini logo). They contain the text "AI" either overlaid or combined.
  - **Environment:** Tech-themed background with a giant number in the center showing the countdown.
- **Mechanics:** 
  - 10 stars spawn randomly around the screen.
  - Colliding with an active star collects it.
  - For each capture, a countdown (from 10 down to 1) is displayed as a large background element.
  - Capturing the 10th star (countdown reaches 0) transitions the game to Phase 2.

## 3. Phase 2: The Gemini Ball Pit
- **Timer:** Starts at 10. Decrements by 1 every second.
- **Objects:** "Balls" bouncing around inside a constrained container (the pit). Some balls contain the letters G, E, M, I, N, I. Other decoy balls might be blank or have other symbols.
- **Physics:** Basic 2D physics. Balls have position and velocity, bouncing off the walls of the container.
- **Interaction:** Clicking or hovering (depending on difficulty) on the correct letters adds +10 points per letter to the score.
- **Feedback:** Visual feedback (a floating +10) when a correct letter is collected.

## 4. End Result Screen
- Displays the final score.
- **Score History:** Shows a table of past scores with dates.
- **New Record Banner:** Prominently highlights if the current score is higher than any previous high score.
- Option to "Play Again", resetting all states to initial values.

## 5. Local Storage (Save State)
- **Scores:** Uses `localStorage` to save a `sundarmario_history` map of previous plays.
- **Intro Screen:** Reads from `localStorage` to display the "High Score". Provides a "Reset Scores" button to clear history.
- **App State:** Stores history and checks for New Record on game end.

# Versions and Changelog

## v1.5.0
- **Feature:** Added a Score History table to the Game Over screen.
- **Feature:** Added a "High Score" display on the Intro screen with a "Reset Scores" button.
- **Feature:** Game Over screen now prominently highlights when a player achieves a "NEW RECORD!".
- **Documentation:** Updated PRD.md and SPECS.md with tracking IDs and local storage architecture.

## v1.4.0
- **Feature:** Fully translated the game interface and rules into 8 languages. Added a language selector button (Globe icon) directly on the Intro screen that updates the wording for the entire game (Intro, Rules modal, Phase 1, Phase 2, and the GameOver screen).

## v1.3.0
- **Feature:** Added a "Rules" button on the Intro screen that opens a modal explaining Phase 1 and Phase 2.
- **Localization:** Translated the game rules button into 8 languages (English, Portuguese, Spanish, French, Italian, German, Chinese, Japanese) within the modal.
- **Adjustment:** Renamed the app from "Sundar Mario AI Quest" to "Sundar Mario AI".
- **Adjustment:** Ensured that the 10 stars spawning in Phase 1 use an algorithm to spread them apart, avoiding clumping and overlaps.
- **Adjustment:** Made Phase 2 balls smaller and dynamically sized for mobile screens (width < 768px).

## v1.2.0
- **Feature:** Updated the Phase 1 countdown logic so the large background numbers count down from 10 to 1 mapping one-to-one with each captured star, instead of 9 to 0. Added a PRD Traceability Matrix.

## v1.1.0
- **Feature:** Replaced a single AI star with 10 smaller AI stars modeled after the Gemini logo to be collected in Phase 1. Added giant countdown.

## v1.0.0
- **Initial Release:** Created the base game. Phase 1 (capture one AI star) and Phase 2 (Gemini letter ball pit) working with score and timer logic.

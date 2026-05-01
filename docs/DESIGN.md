# Visual Identity Design (DESIGN.md)

## 1. Mood & Aesthetic
**Tech-Retro Meets Modern AI:** The game should blend retro 8-bit/16-bit gaming vibes (Mario reference) with sleek, modern AI aesthetics (glowing lines, dark mode, futuristic colors). 

## 2. Color Palette
- **Background:** Deep Navy/Black (`#050505`) to represent the "Cloud" and digital space.
- **Grid/Tech Lines:** Electric Blue (`#4285F4`) and Emerald Green (`#34A853`) for neural network visual effects.
- **Sundar Mario:** Red (`#EA4335`) and Blue elements to nod to Mario, mixed with Google branding.
- **AI Star:** Glowing Yellow (`#FBBC04`) and bright white.
- **Gemini Letters:** Iridescent or gradient colors matching the Gemini brand (mix of deep blues and purples with bright cyan/magenta).

## 3. Typography
- **Headings & UI:** `JetBrains Mono` or `Courier New` for that "code/tech" feel.
- **In-Game Text:** `Inter` for legibility.

## 4. Component Styles (Tailwind)
- **Containers:** Glassmorphism (`bg-white/10 backdrop-blur-md border border-white/20`) for UI overlays to contrast with the dark background.
- **Buttons:** Bold, slightly rounded hardware-style buttons, changing to neon green on hover (Brutalist/Creative recipe influence).

## 5. Animations
- **Phase 1 (Star):** The AI Star should pulse using a CSS `@keyframes` scale animation.
- **Phase 2 (Ball Pit):** The balls bounce using a fast `requestAnimationFrame` loop.
- **Transitions:** Use `framer-motion` to fade and slide between intro, Phase 1, Phase 2, and the end screen smoothly.

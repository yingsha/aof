# Age of Fable

## Original 2018 README.md

- Check out live demo at https://aof.guzh.me/
- I was going to port from what's here at http://www.apolitical.info/webgame/ to something more modern.
- Supports PHP 5.4 and 7.
- Images are left out of this repository intentionally. However it may change in the future.
- I am looking for helping hands to:
  - port from PHP to something more mordern.
  - separate data with logic.
  - debug and localization.
  - add new story narratives.

## 2026 Update: Modern Remaster & Offline Version

A complete modernization effort has been executed to convert the legacy PHP game into a serverless, offline-capable single-page application (SPA).

### Changes Log

1.  **Project Modernization**:
    - Created `webgamenew/` directory with a modern frontend structure (HTML5, CSS3, Vue 3).
    - Decoupled data from logic: All game content (classes, events, localization) extracted from PHP files into structured JavaScript data files.

2.  **Data Extraction & Conversion**:
    - Developed `extract_data.py` to extract Classes, Attributes, and Localization data from `index.php` and `game.php`.
    - Developed `convert_game_data.py` to parse the massive `game.php` logic file, successfully converting ~7000 story paragraphs into a structured Event system.
    - Implemented logic parsing to convert PHP arrays (Types 0-25) into JSON-compatible logic objects (Checks, Effects, Random branches).

3.  **Offline Capability**:
    - Replaced `fetch` API with direct `<script>` loading for data files to bypass CORS restrictions when running locally via `file://`.
    - Implemented a pure client-side game engine in `js/app.js` that handles all game logic (state management, RNG, inventory, keywords) without a backend.

4.  **Game Engine Enhancements**:
    - Implemented a robust Event System supporting:
        - Attribute Checks (D20 rolls).
        - Inventory and Keyword management.
        - Stat and Money modifications.
        - Complex branching logic and random encounters.
    - Added UI for displaying Character Stats, Inventory (implicit), and Money (Shells).
    - Implemented Local Storage based Save/Load system.

5.  **Content Editor**:
    - Created a visual **Game Data Editor** (`editor.html`) allowing users to:
        - View and edit Character Classes.
        - Search, filter, and edit thousands of Story Events.
        - Manage Localization strings with CSV Import/Export support.
    - Added search and filtering capabilities to handle the large dataset efficiently.

6.  **Fixes & Optimizations**:
    - Updated all image resources to use remote URLs (`https://aof.guzh.me/...`) for immediate playability.
    - Fixed string parsing issues in legacy PHP code (concatenations, escaped quotes).
    - Removed legacy HTML artifacts (e.g., illuminated drop-cap images) from text for a cleaner UI.
    - Merged localization data from multiple sources to ensure full translation support (e.g., fixing missing `Loc_Continue`).

### How to Run

Simply open `webgamenew/index.html` in any modern web browser. No server setup required.

### How to Edit

Open `webgamenew/editor.html` to modify game content. After editing, download the generated `.js` files and replace the ones in `webgamenew/data/` to apply changes.

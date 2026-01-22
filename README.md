# Age of Fable (传说时代)

## Project Overview (项目概述)

Age of Fable is a classic text-based web game originally developed in PHP. This repository hosts a modernized, fully offline-capable, and data-driven single-page application (SPA) version. The goal is to preserve the original game's narrative and mechanics while enhancing the user experience, providing an intuitive content editor, and ensuring future expandability.

(《传说时代》是一款最初用 PHP 开发的经典文字网页游戏。本仓库提供了一个现代化、完全离线、数据驱动的单页应用版本。目标是保留原游戏的叙事和机制，同时提升用户体验，提供直观的内容编辑器，并确保未来的可扩展性。)

## Changes Log (更新日志)

#### 2026-01-23 Update

*   **Editor Tools**: Added "Data Issues" tab to detect unreachable story nodes and broken links, ensuring game flow integrity. (编辑器工具：添加“数据问题”选项卡以检测不可达的故事节点和断开的链接，确保游戏流程完整性。)
*   **Editor Core**: Implemented BFS-based reachability analysis. (编辑器核心：在 `editor.js` 中实现了基于 BFS 的可达性分析。)

#### 2026-01-22 Update

*   **Bug Fixes & Logic Refinement**: Resolved critical logic stuck issues (e.g., `Foxwoman3`, `Cryerfree`) by fixing duplicate key handling in PHP parsing and correcting logic types. (修复了关键的逻辑卡死问题，纠正了 PHP 解析中的重复键处理和逻辑类型映射错误。)
*   **Bug Fixes & Logic Refinement**: Fixed `Gladiatorchoose1f` infinite loop by correctly identifying and prioritizing duplicate event definitions from legacy data. (修复了角斗士任务中的死循环问题，通过正确识别并处理遗留数据中的重复事件定义。)
*   **UI & Visual Polish**: Immersive Endings: Styled "Game Over" and "Winning" screens with large cursive fonts and prevented immediate exit to menu, allowing players to savor the final story text. (沉浸式结局：美化了“游戏结束”和“胜利”界面，使用花体大字，并不再立即退出菜单，让玩家能细细品味最后的剧情。)
*   **UI & Visual Polish**: Button Visibility: Updated choice buttons to use primary colors instead of white backgrounds for better call-to-action visibility. (按钮视觉优化：更新了选择按钮样式，使用主色调背景代替白色，提高辨识度。)
*   **UI & Visual Polish**: Avatar Updates: Ensured character avatar updates dynamically upon profession change; added a Joker emoji (🃏) as a fallback avatar for the "Clown" profession. (头像动态更新：确保角色头像在职业变更时同步更新；为“小丑”职业添加了 Joker Emoji 作为默认头像。)
*   **Story Feed Experience**: Auto-Scroll: Implemented automatic scrolling to the bottom of the story pane as new text arrives. (自动滚动：实现了故事面板在有新文本时自动滚动到底部的功能。)
*   **Story Feed Experience**: Readable Updates: Improved spacing and font sizing for in-game status updates within the story feed. (易读性优化：优化了故事流中状态更新信息的间距和字号，提升阅读体验。)
*   **Story Feed Experience**: Clearer Checks: Refined Attribute Check text format to explicitly show player stat vs roll (e.g., "You have 14 vs Roll 5"). (更清晰的检定：优化了属性检定文本格式，明确显示玩家数值对比掷骰结果。)

#### 2026-01-20 Update

*   **Event Logic Overhaul**: Converted `Type 1` (Single Link), `Type 2` (Free Choice), `Type 13` (Click Continue), and `Type 17` (Conditional Choice) from legacy `options` arrays to structured `logic` objects for better consistency and editor support. (事件逻辑重构：将 `Type 1` (单链)、`Type 2` (自由选择)、`Type 13` (点击继续) 和 `Type 17` (条件选择) 从旧的 `options` 数组转换为结构化的 `logic` 对象，以提高一致性和编辑器支持。)
*   **Event Logic Overhaul**: Implemented advanced parsing and handling for Types 18-25 (Lose Companions, Level Check, Stat Swap, Random Checks, Profession Changes, Endings). (事件逻辑重构：实现了对 Types 18-25 (失去同伴、等级检查、属性交换、随机检查、职业变更、结局) 的高级解析和处理。)
*   **Event Logic Overhaul**: Fixed `Graph View` visualization to accurately render outgoing links based on the new `logic` structure, removing duplicate edges and correctly labeling "Pass/Fail" paths. (事件逻辑重构：修复了 `Graph View` 可视化，使其能根据新的 `logic` 结构准确渲染出站链接，移除了重复的边并正确标注了“通过/失败”路径。)
*   **Storytelling & UX Improvements**: Story Feed: Implemented a continuous "accumulated text" system (Story Feed) where narrative text is appended rather than replaced, creating a seamless reading experience. Text is only cleared upon game restart. (叙事与用户体验改进：故事流：实现了一个连续的“累积文本”系统（故事流），叙事文本是追加而非替换，创造了无缝的阅读体验。文本只在游戏重新开始时清除。)
*   **Storytelling & UX Improvements**: Inline Status Updates: Integrated important game state changes (Items gained/lost, Stat updates, Check results) directly into the story flow using visual alerts, ensuring players don't miss critical information. (叙事与用户体验改进：内联状态更新：将重要的游戏状态变化（物品获得/失去、属性更新、检定结果）直接集成到故事流中，使用视觉提示，确保玩家不会错过关键信息。)
*   **Storytelling & UX Improvements**: Auto-Advance: Enhanced `Type 1` events to automatically advance the story with a slight delay if text is present, maintaining narrative pacing. (叙事与用户体验改进：自动推进：增强了 `Type 1` 事件，使其在有文本时自动推进故事，并有轻微延迟，保持叙事节奏。)
*   **Editor Graph View Enhancements**: Visual Styling: Added color-coding for different event types (Endings, Choices, Random) and improved edge labeling. (编辑器图表视图增强：视觉样式：为不同事件类型（结局、选择、随机）添加了颜色编码，并改进了边缘标签。)
*   **Editor Graph View Enhancements**: Interaction: Implemented right-click panning, box selection for multi-node inspection, and a docked "Edit Panel" for rapid content modification. (编辑器图表视图增强：交互：实现了右键平移、多节点检查的框选功能，以及用于快速内容修改的停靠式“编辑面板”。)
*   **Editor Graph View Enhancements**: Navigation: Added "Back/Forward" history navigation within the Graph View. (编辑器图表视图增强：导航：在图表视图中添加了“后退/前进”历史导航。)
*   **Editor Graph View Enhancements**: Dynamic Layout: Added controls for Font Size and Link Length to optimize readability for complex story branches. (编辑器图表视图增强：动态布局：添加了字体大小和链接长度控制，以优化复杂故事分支的可读性。)
*   **Data Enrichment**: Keywords: Created a specialized extractor to parse detailed keyword descriptions from original `game.php` comments, significantly improving context for content creators. (数据丰富：关键词：创建了一个专门的提取器，用于从原始 `game.php` 注释中解析详细的关键词描述，显著改善了内容创作者的上下文。)

#### 2026-01-19 Update

*   **Game Logic & Data Integrity**: Refined `convert_game_data.py` to robustly handle complex PHP string concatenations and escaped characters, fixing truncated text issues in game events. (游戏逻辑与数据完整性：优化了 `convert_game_data.py`，以稳健处理复杂的 PHP 字符串连接和转义字符，修复了游戏事件中文本截断的问题。)
*   **Game Logic & Data Integrity**: Implemented parsing for legacy HTML artifacts (removing `<img>` drop-caps and restoring text). (游戏逻辑与数据完整性：实现了对遗留 HTML 构件的解析（移除 `<img>` 首字下沉图片并恢复文本）。)
*   **Game Logic & Data Integrity**: Added full support for advanced Logic Types: `gain_blessing` (Type 14), `blessing_check` (Type 15), and the complex `multi_check` (Type 12) with configurable difficulty and destinations. (游戏逻辑与数据完整性：添加了对高级逻辑类型的全面支持：`gain_blessing` (Type 14)、`blessing_check` (Type 15) 以及可配置难度和目的地的复杂 `multi_check` (Type 12)。)
*   **Game Logic & Data Integrity**: Extracted original PHP source code context into `events.js` to aid content verification in the editor. (游戏逻辑与数据完整性：将原始 PHP 源代码上下文提取到 `events.js` 中，以帮助编辑器中的内容验证。)
*   **Visual Editor Enhancements (`editor.html`)**: Navigation & References: Added "Referenced By" panel to visualize event predecessors and flow; Unified "Go ->" navigation buttons. (可视化编辑器增强 (`editor.html`)：导航与引用：添加了“引用者”面板以可视化事件的前驱和流向；统一了“Go ->”导航按钮。)
*   **Visual Editor Enhancements (`editor.html`)**: Search & Filter: Implemented text search and descriptive Type filtering (e.g., "Attribute Check (3)") for easier event management. (可视化编辑器增强 (`editor.html`)：搜索与过滤：实现了文本搜索和描述性类型过滤（例如，“属性检定 (3)”），以便更轻松地管理事件。)
*   **Visual Editor Enhancements (`editor.html`)**: Logic Builder: Created a dynamic visual logic builder for all event types, including specific UIs for Multi-Attribute Checks, Item/Keyword operations, and Blessings. (可视化编辑器增强 (`editor.html`)：逻辑构建器：为所有事件类型创建了动态的可视化逻辑构建器，包括多属性检定、物品/关键词操作和祝福的特定 UI。)
*   **Visual Editor Enhancements (`editor.html`)**: New Editors: Added dedicated editors for **Items**, **Keywords**, and integrated **Blessings** management. (可视化编辑器增强 (`editor.html`)：新编辑器：添加了专用的 **物品**、**关键词** 编辑器，并集成了 **祝福** 管理。)
*   **Visual Editor Enhancements (`editor.html`)**: UX: Added Source Code view with syntax highlighting; Enabled ESC key to close modals. (可视化编辑器增强 (`editor.html`)：用户体验：添加了带语法高亮的代码视图；启用了 ESC 键关闭模态框。)
*   **In-Game Features & Restoration**: Custom Character System: Fully restored and modernized the "Create Custom Character" feature: (游戏内功能与恢复：自定义角色系统：完全恢复并现代化了“创建自定义角色”功能：)
    *   Added "Random Character" generation. (添加了“随机角色”生成。)
    *   Implemented manual Attribute modification and Name editing in the `CONFIRM_CHAR` screen. (在 `CONFIRM_CHAR` 屏幕中实现了手动属性修改和名称编辑。)
    *   Added "Random Class" switching within the customization view. (在自定义视图中添加了“随机职业”切换。)
    *   Fixed character portrait URL resolution (`thumb_` prefix). (修复了角色肖像 URL 解析（`thumb_` 前缀）。)
*   **In-Game Features & Restoration**: Debug System: Implemented an in-game **Debug UI** (toggleable) allowing real-time modification of: (游戏内功能与恢复：调试系统：实现了一个游戏内 **调试 UI**（可切换），允许实时修改：)
    *   Shells (Money) (贝壳 (金钱))
    *   Attributes (属性)
    *   Inventory (Add/Remove Items) (物品栏 (添加/移除物品))
    *   Keywords (Add/Remove) (关键词 (添加/移除))
    *   Direct Event Jumping for testing story branches. (直接事件跳转，用于测试故事分支。)
*   **In-Game Features & Restoration**: Visuals: Updated `webgamenew` layout and correctly linked remote image assets. (游戏内功能与恢复：视觉效果：更新了 `webgamenew` 布局并正确链接了远程图片资源。)

#### Previous Updates (Initial Porting)

*   **Project Modernization**: Created `webgamenew/` directory with a modern frontend structure (HTML5, CSS3, Vue 3). (项目现代化：创建了 `webgamenew/` 目录，包含现代前端结构 (HTML5, CSS3, Vue 3)。)
*   **Project Modernization**: Decoupled data from logic: All game content (classes, events, localization) extracted from PHP files into structured JavaScript data files. (项目现代化：数据与逻辑解耦：所有游戏内容（职业、事件、本地化）从 PHP 文件中提取到结构化的 JavaScript 数据文件中。)
*   **Data Extraction & Conversion**: Developed `extract_data.py` to extract Classes, Attributes, and Localization data from `index.php` and `game.php`. (数据提取与转换：开发了 `extract_data.py`，用于从 `index.php` 和 `game.php` 中提取职业、属性和本地化数据。)
*   **Data Extraction & Conversion**: Developed `convert_game_data.py` to parse the massive `game.php` logic file, successfully converting ~7000 story paragraphs into a structured Event system. (数据提取与转换：开发了 `convert_game_data.py`，用于解析庞大的 `game.php` 逻辑文件，成功将约 7000 个故事段落转换为结构化事件系统。)
*   **Data Extraction & Conversion**: Implemented logic parsing to convert PHP arrays (Types 0-25) into JSON-compatible logic objects (Checks, Effects, Random branches). (数据提取与转换：实现了逻辑解析，将 PHP 数组（Type 0-25）转换为 JSON 兼容的逻辑对象（检定、效果、随机分支）。)
*   **Offline Capability**: Replaced `fetch` API with direct `<script>` loading for data files to bypass CORS restrictions when running locally via `file://`. (离线能力：用直接的 `<script>` 加载数据文件替换了 `fetch` API，以绕过在本地通过 `file://` 运行时 CORS 限制。)
*   **Offline Capability**: Implemented a pure client-side game engine in `js/app.js` that handles all game logic (state management, RNG, inventory, keywords) without a backend. (离线能力：在 `js/app.js` 中实现了一个纯客户端游戏引擎，处理所有游戏逻辑（状态管理、RNG、物品栏、关键词），无需后端。)
*   **Game Engine Enhancements**: Implemented a robust Event System supporting: (游戏引擎增强：实现了强大的事件系统，支持：)
    *   Attribute Checks (D20 rolls). (属性检定 (D20 掷骰)。)
    *   Inventory and Keyword management. (物品栏和关键词管理。)
    *   Stat and Money modifications. (属性和金钱修改。)
    *   Complex branching logic and random encounters. (复杂的分支逻辑和随机遭遇。)
*   **Game Engine Enhancements**: Added UI for displaying Character Stats, Inventory (implicit), and Money (Shells). (游戏引擎增强：添加了用于显示角色属性、物品栏（隐式）和金钱（贝壳）的 UI。)
*   **Game Engine Enhancements**: Implemented Local Storage based Save/Load system. (游戏引擎增强：实现了基于本地存储的保存/加载系统。)
*   **Content Editor**: Created a visual **Game Data Editor** (`editor.html`) allowing users to: (内容编辑器：创建了一个可视化的 **游戏数据编辑器** (`editor.html`)，允许用户：)
    *   View and edit Character Classes. (查看和编辑角色职业。)
    *   Search, filter, and edit thousands of Story Events. (搜索、过滤和编辑数千个故事事件。)
    *   Manage Localization strings with CSV Import/Export support. (管理本地化字符串，支持 CSV 导入/导出。)
*   **Content Editor**: Added search and filtering capabilities to handle the large dataset efficiently. (内容编辑器：添加了搜索和过滤功能，以高效处理大型数据集。)
*   **Fixes & Optimizations**: Updated all image resources to use remote URLs (`https://aof.guzh.me/...`) for immediate playability. (修复与优化：更新所有图片资源以使用远程 URL (`https://aof.guzh.me/...`)，以便立即游戏。)
*   **Fixes & Optimizations**: Fixed string parsing issues in legacy PHP code (concatenations, escaped quotes). (修复与优化：修复了遗留 PHP 代码中的字符串解析问题（连接、转义引号）。)
*   **Fixes & Optimizations**: Removed legacy HTML artifacts (e.g., illuminated drop-cap images) from text for a cleaner UI. (修复与优化：移除了文本中遗留的 HTML 构件（例如，首字下沉图片），以获得更简洁的 UI。)
*   **Fixes & Optimizations**: Merged localization data from multiple sources to ensure full translation support (e.g., fixing missing `Loc_Continue`). (修复与优化：合并了来自多个来源的本地化数据，以确保完整的翻译支持（例如，修复缺失的 `Loc_Continue`）。)

## How to Run (如何运行)

Simply open `webgamenew/index.html` in any modern web browser. No server setup required. (在任何现代网络浏览器中打开 `webgamenew/index.html` 即可。无需服务器设置。)

## How to Edit (如何编辑)

Open `webgamenew/editor.html` to modify game content. After editing, download the generated `.js` files and replace the ones in `webgamenew/data/` to apply changes. (打开 `webgamenew/editor.html` 修改游戏内容。编辑完成后，下载生成的 `.js` 文件并替换 `webgamenew/data/` 中的文件以应用更改。)

const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

createApp({
    setup() {
        // Data
        const classes = ref([]);
        const attributes = ref([]);
        const localization = ref({});
        const events = ref([]);
        const items = ref([]);
        const keywordsData = ref([]);
        const lang = ref('zh'); 
        
        // Game State
        const gameState = ref('MENU'); 
        const currentClass = ref(null);
        const currentCharacter = ref({
            name: '',
            stats: [],
            inventory: [], // List of item IDs
            keywords: [],  // List of keyword IDs
            money: 0,
            prof: 0
        });
        const currentEvent = ref(null);
        const accumulatedText = ref("");
        
        // Auto-scroll logic
        watch(accumulatedText, async () => {
            await nextTick();
            const container = document.getElementById('story-container');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        });

        const gameLogs = ref([]);
        const hasSave = ref(false);
        
        // Debug State
        const debugMode = ref(false);
        const debugJumpId = ref('');
        const debugAddItemSelect = ref('');
        const debugAddKwSelect = ref('');

        const availableChoices = computed(() => {
            if (!currentEvent.value || !currentEvent.value.logic || !currentEvent.value.logic.choices) {
                return [];
            }

            if (currentEvent.value.logic.type !== 'conditional_choice' && currentEvent.value.logic.type !== 'free_choice') {
                return []; // Only conditional_choice and free_choice expose options this way
            }
            
            if (currentEvent.value.logic.type === 'free_choice') {
                return currentEvent.value.logic.choices;
            }

            // For conditional_choice
            return currentEvent.value.logic.choices.filter(choice => {
                const conditionType = choice.condition_type;
                const conditionId = parseInt(choice.condition_id);

                switch (conditionType) {
                    case 'always':
                        return true;
                    case 'has_keyword':
                        return currentCharacter.value.keywords.includes(conditionId);
                    case 'no_keyword':
                        return !currentCharacter.value.keywords.includes(conditionId);
                    case 'has_item':
                        return currentCharacter.value.inventory.includes(conditionId);
                    case 'no_item':
                        return !currentCharacter.value.inventory.includes(conditionId);
                    default:
                        return true;
                }
            });
        });

        let autoJumpTimer = null;

        // --- Loading ---
        const loadData = () => {
            if (window.GAME_DATA_CLASSES) classes.value = window.GAME_DATA_CLASSES;
            if (window.GAME_DATA_ATTRIBUTES) attributes.value = window.GAME_DATA_ATTRIBUTES;
            if (window.GAME_DATA_LOCALIZATION) localization.value = window.GAME_DATA_LOCALIZATION;
            if (window.GAME_DATA_EVENTS) events.value = window.GAME_DATA_EVENTS;
            if (window.GAME_DATA_ITEMS) items.value = window.GAME_DATA_ITEMS;
            if (window.GAME_DATA_KEYWORDS) keywordsData.value = window.GAME_DATA_KEYWORDS;
            
            if (!window.GAME_DATA_CLASSES) {
                console.error("Game data not found.");
                alert("Failed to load game data.");
            } else {
                console.log("Data Loaded.");
            }
        };

        const t = (key) => {
            if (!key) return "";
            if (localization.value[key]) {
                return lang.value === 'zh' ? localization.value[key].zh : localization.value[key].en;
            }
            if (key.startsWith('Loc_')) {
                console.warn(`Missing localization for key: ${key}`);
            }
            return key;
        };

        const setLang = (l) => lang.value = l;

        // --- Core Game Logic ---
        
        const findEvent = (id) => events.value.find(e => e.id == id);

        const goToEvent = (id, append = false) => {
            if (autoJumpTimer) {
                clearTimeout(autoJumpTimer);
                autoJumpTimer = null;
            }

            console.log(`[Goto] Event ID: ${id} (Append: ${append})`);
            const evt = findEvent(id);
            if (!evt) {
                addLog(`Error: Event ${id} not found.`);
                console.error(`Event ${id} not found in events list.`);
                return;
            }

            console.log(`[Event] Type: ${evt.type}, Text: ${evt.text_zh ? evt.text_zh.substring(0, 20) : '(No Text)'}...`);

            // Set current event always
            currentEvent.value = evt;

            // Update Text Display - always update text before handling logic
            const text = t(evt.text_key) || evt.text_zh;
            if (append) {
                if (text) accumulatedText.value += "<p>" + text + "</p>";
            } else {
                accumulatedText.value = text || "";
            }
            
            // Handle Logic Events (non-interactive, or those that set currentEvent and return)
            if (evt.logic) {
                console.log(`[Logic] Processing logic type: ${evt.logic.type}`, evt.logic);
                handleLogic(evt, append);
                return; // Logic events handle their own flow
            }

            // If it's an interactive event without explicit logic (e.g., old-style options),
            // its text is already set above and it will wait for user interaction via handleOption.

            if (evt.type === 0) { // Standard End
                addLog("--- GAME OVER ---");
                accumulatedText.value += `<div class="game-over-text">Game Over</div>`;
                // Don't exit to MENU automatically, let player read text
                return;
            }
        };

        const handleLogic = (evt, append = false) => {
            const l = evt.logic;
            let nextId = null;
            let result = "";

            if (l.type === 'check') {
                const idx = attributes.value.indexOf(l.attr);
                const statVal = (idx >= 0 && idx < currentCharacter.value.stats.length) 
                                ? currentCharacter.value.stats[idx] 
                                : 10;
                
                const roll = Math.floor(Math.random() * 20) + 1;
                const passed = roll <= statVal;
                
                nextId = passed ? l.pass : l.fail;
                result = `[Check] ${l.attr} Check: ${passed ? 'PASSED' : 'FAILED'} (You have ${statVal} vs Roll ${roll})`;
                addLog(result);

                // Add to story text
                accumulatedText.value += `<div class='alert ${passed ? 'alert-success' : 'alert-danger'} py-1 mt-2 mb-2 small'>${l.attr} Check: ${passed ? 'PASSED' : 'FAILED'} (You have ${statVal} vs Roll ${roll})</div>`;
                goToEvent(nextId, true); // Always append for checks
                return;
            }
            else if (l.type === 'single_link') {
                // Type 1
                nextId = l.next;
                // Auto-jump, always append for Type 1 now
                const hasText = evt.text_zh && evt.text_zh.trim() !== '' && evt.text_zh !== '...' && evt.text_zh !== 'no text';
                const delay = hasText ? 2000 : 50;
                
                if (autoJumpTimer) clearTimeout(autoJumpTimer); // Clear existing, if any
                autoJumpTimer = setTimeout(() => {
                    goToEvent(nextId, true); // Always append for auto-jump Type 1
                }, delay);
                return; // Prevent immediate goToEvent below
            }
            else if (l.type === 'click_continue') {
                // Type 13: Display current text and wait for user to click a 'continue' button.
                // We need to render the current event here for its options.
                currentEvent.value = evt; // Set current event so options can be displayed.
                // There should be a default 'continue' option in currentEvent for this type.
                // No nextId is set here, as the UI handles it via options.
                return; // Prevent immediate goToEvent below, wait for user interaction
            }
            else if (l.type === 'free_choice') {
                // Type 2: Display current event and its choices, wait for user selection.
                currentEvent.value = evt; // Set current event so options can be displayed.
                // The options array should be populated from evt.logic.choices
                // No nextId is set here, as the UI handles it via options.
                return; // Prevent immediate goToEvent below, wait for user interaction
            }
            else if (l.type === 'conditional_choice') {
                // Type 17: Display current event and its conditional choices, wait for user selection.
                // The UI needs to filter choices based on conditions.
                currentEvent.value = evt; // Set current event so conditional choices can be displayed.
                return; // Prevent immediate goToEvent below, wait for user interaction
            }
            else if (l.type === 'random') {
                const targets = l.targets;
                if (targets && targets.length > 0) {
                    nextId = targets[Math.floor(Math.random() * targets.length)];
                }
                if (nextId) {
                    goToEvent(nextId, true); // Always append for random events
                    return;
                }
            }
            else if (l.type === 'effect') {
                let effectMessages = [];
                if (l.item_op) {
                    const iid = parseInt(l.item_id);
                    const itemName = getItemName(iid);
                    if (l.item_op === 'add') {
                        if(!currentCharacter.value.inventory.includes(iid)) {
                            currentCharacter.value.inventory.push(iid);
                            effectMessages.push(`Gained item: ${itemName}`);
                        }
                    } else {
                        currentCharacter.value.inventory = currentCharacter.value.inventory.filter(i => i !== iid);
                        effectMessages.push(`Lost item: ${itemName}`);
                    }
                    addLog(`[Item] ${l.item_op === 'add' ? 'Gained' : 'Lost'} item #${iid}`);
                }
                if (l.keyword_op) {
                    const kid = parseInt(l.keyword_id);
                    const kwName = getKwName(kid);
                    if (l.keyword_op === 'add') {
                        if(!currentCharacter.value.keywords.includes(kid)) {
                            currentCharacter.value.keywords.push(kid);
                            effectMessages.push(`Gained keyword: ${kwName}`);
                        }
                    } else {
                        currentCharacter.value.keywords = currentCharacter.value.keywords.filter(k => k !== kid);
                        effectMessages.push(`Lost keyword: ${kwName}`);
                    }
                    addLog(`[Keyword] ${l.keyword_op === 'add' ? 'Gained' : 'Lost'} keyword #${kid}`);
                }
                if (l.stat_attr) {
                    const idx = attributes.value.indexOf(l.stat_attr);
                    if (idx >= 0) {
                        const oldVal = currentCharacter.value.stats[idx];
                        currentCharacter.value.stats[idx] += parseInt(l.stat_val);
                        const newVal = currentCharacter.value.stats[idx];
                        const op = l.stat_val > 0 ? '+' : '';
                        effectMessages.push(`${l.stat_attr} ${op}${l.stat_val} (${oldVal} -> ${newVal})`);
                        addLog(`[Stat] ${l.stat_attr} ${op}${l.stat_val}`);
                        
                        // Check for Stamina death
                        if (l.stat_attr === 'Stamina' && currentCharacter.value.stats[idx] < 1) {
                            accumulatedText.value += "<div class='alert alert-danger py-1 mt-2 mb-2 small'>" + t('Loc_YouHaveDied') + "</div>";
                            accumulatedText.value += `<div class="game-over-text">Game Over</div>`;
                            // Don't exit automatically
                            return; // Stop further processing
                        } else if (currentCharacter.value.stats[idx] < 1) {
                            // Other attributes just cap at 1
                            currentCharacter.value.stats[idx] = 1;
                            effectMessages.push(`${l.stat_attr} capped at 1`);
                        }
                    }
                }
                if (l.money_val) {
                    const op = l.money_val > 0 ? '+' : '';
                    const oldMoney = currentCharacter.value.money;
                    currentCharacter.value.money += parseInt(l.money_val);
                    const newMoney = currentCharacter.value.money;
                    effectMessages.push(`Shells ${op}${l.money_val} (${oldMoney} -> ${newMoney})`);
                    addLog(`[Money] ${op}${l.money_val} shells`);
                }
                nextId = l.next;

                if (effectMessages.length > 0) {
                    accumulatedText.value += "<div class='alert alert-info py-1 mt-2 mb-2 small'>" + effectMessages.join("<br>") + "</div>";
                }
                if (nextId) {
                    goToEvent(nextId, true);
                    return; // Stop further processing after goToEvent
                }
            }
            else if (l.type === 'item_check') {
                const has = currentCharacter.value.inventory.includes(parseInt(l.item_id));
                nextId = has ? l.pass : l.fail;
                goToEvent(nextId, true); // Always append for checks
                return;
            }
            else if (l.type === 'keyword_check') {
                const has = currentCharacter.value.keywords.includes(parseInt(l.keyword_id));
                nextId = has ? l.pass : l.fail;
                goToEvent(nextId, true); // Always append for checks
                return;
            }
            else if (l.type === 'prof_check') {
                const isProf = currentCharacter.value.prof == parseInt(l.prof_id);
                nextId = isProf ? l.pass : l.fail;
                goToEvent(nextId, true); // Always append for checks
                return;
            }
            else if (l.type === 'money_check') {
                const has = currentCharacter.value.money >= parseInt(l.amount);
                nextId = has ? l.pass : l.fail;
                goToEvent(nextId, true); // Always append for checks
                return;
            }
            else if (l.type === 'gain_blessing') {
                const bName = l.blessing;
                if (bName === 'random') {
                    const idx = Math.floor(Math.random() * 12);
                    currentCharacter.value.stats[idx]++;
                    addLog(`[Blessing] ${attributes.value[idx]} +1`);
                } else {
                    const idx = attributes.value.indexOf(bName);
                    if (idx >= 0) {
                        currentCharacter.value.stats[idx]++;
                        addLog(`[Blessing] ${bName} +1`);
                    } else {
                        addLog(`[Blessing] Gained special blessing: ${bName}`);
                    }
                }
                nextId = l.next;
                goToEvent(nextId, true);
                return; // Prevent immediate goToEvent below
            }
            else if (l.type === 'blessing_check') {
                const bName = l.blessing;
                const idx = attributes.value.indexOf(bName);
                if (idx >= 0) {
                    const statVal = currentCharacter.value.stats[idx];
                    const roll = Math.floor(Math.random() * 20) + 1;
                    const passed = roll <= statVal;
                    nextId = passed ? l.pass : l.fail;
                    addLog(`[Blessing Check] ${bName} (${statVal}) vs ${roll}: ${passed}`);
                } else {
                    console.warn(`Unknown blessing check: ${bName}, assuming fail.`);
                    nextId = l.fail;
                }
                goToEvent(nextId, true);
                return; // Prevent immediate goToEvent below
            }
            else if (l.type === 'multi_check') {
                let successCount = 0;
                if (l.attrs) {
                    for (const attr of l.attrs) {
                        const idx = attributes.value.indexOf(attr);
                        if (idx >= 0) {
                            const statVal = currentCharacter.value.stats[idx];
                            const roll = Math.floor(Math.random() * 20) + 1;
                            if (roll <= statVal) successCount++;
                        }
                    }
                }
                
                if (l.dests && l.dests.length > successCount) {
                    nextId = l.dests[successCount];
                } else if (l.dests && l.dests.length > 0) {
                    nextId = l.dests[l.dests.length - 1]; 
                } else {
                    addLog("Error: Multi check has no destinations");
                }
                addLog(`[Multi Check] Successes: ${successCount}`);
                if (nextId) {
                    goToEvent(nextId, true);
                    return;
                }
            }
            else if (l.type === 'not_implemented') {
                // Type 19: Just show a message and go to next (usually 0)
                addLog("Event not implemented yet.");
                nextId = l.next; // Should be '0'
                goToEvent(nextId, true); // Always append for not implemented events
                return;
            }
            else if (l.type === 'lose_companions') {
                // Type 18
                addLog("[Event] Lost all companions (Not fully implemented)");
                nextId = l.next;
                goToEvent(nextId, true); // Always append for lose companions events
                return;
            }
            else if (l.type === 'level_check') {
                // Type 20
                const lvl = currentCharacter.value.level || 1;
                const req = parseInt(l.level);
                nextId = lvl >= req ? l.pass : l.fail;
                addLog(`[Level Check] Level ${lvl} vs ${req}: ${lvl >= req ? 'Pass' : 'Fail'}`);
                goToEvent(nextId, true); // Always append for level checks
                return;
            }
            else if (l.type === 'stat_swap') {
                // Type 21
                const targetIdx = attributes.value.indexOf(l.target_attr);
                const sourceIdx = attributes.value.indexOf(l.source_attr);
                if (targetIdx >= 0 && sourceIdx >= 0) {
                    currentCharacter.value.stats[targetIdx] = currentCharacter.value.stats[sourceIdx];
                    addLog(`[Stat Swap] ${l.target_attr} became ${l.source_attr} (${currentCharacter.value.stats[targetIdx]})`);
                }
                nextId = l.next;
                goToEvent(nextId, true); // Always append for stat swap events
                return;
            }
            else if (l.type === 'random_money_check') {
                // Type 22
                const roll = Math.floor(Math.random() * 99) + 1;
                const has = currentCharacter.value.money >= roll;
                nextId = has ? l.pass : l.fail;
                addLog(`[Shell Rand Check] Money ${currentCharacter.value.money} vs Roll ${roll}: ${has ? 'Pass' : 'Fail'}`);
                goToEvent(nextId, true); // Always append for checks
                return;
            }
            else if (l.type === 'random_prof_change') {
                // Type 23
                if (classes.value.length > 0) {
                    const rndCls = classes.value[Math.floor(Math.random() * classes.value.length)];
                    const oldProfName = currentProfessionName.value;
                    currentCharacter.value.prof = rndCls.id;
                    currentClass.value = rndCls; // Update UI class
                    addLog(`[Prof Change] Changed profession to ${rndCls.display_name}`);
                    accumulatedText.value += `<div class='alert alert-info py-1 mt-2 mb-2 small'>Profession changed from ${oldProfName} to ${rndCls.display_name}</div>`;
                }
                nextId = l.next;
                goToEvent(nextId, true); // Always append for random prof change events
                return;
            }
            else if (l.type === 'set_prof_clown') {
                // Type 24
                const oldProfName = currentProfessionName.value;
                currentCharacter.value.prof = 0; 
                
                // Update UI class for Clown
                const clownCls = classes.value.find(c => c.id == 0);
                if (clownCls) {
                    currentClass.value = clownCls;
                } else {
                    // Fallback mock object for Clown if not in classes list
                    // Assuming image is class0.jpg
                    currentClass.value = { 
                        id: 0, 
                        name: 'Clown', 
                        display_name: 'Clown', 
                        image: 'class0',
                        stats: currentCharacter.value.stats // Keep current stats or reset?
                    };
                }

                addLog(`[Prof Change] Changed profession to Clown`);
                accumulatedText.value += `<div class='alert alert-info py-1 mt-2 mb-2 small'>Profession changed from ${oldProfName} to Clown</div>`;
                nextId = l.next;
            }
            else if (l.type === 'winning_end') {
                // Type 25
                addLog("*** YOU WIN! ***");
                accumulatedText.value += `<div class="winning-text">The End</div>`;
                // Don't change gameState to WIN (which might hide text), just stay in PLAYING
                return;
            }
            
            if (nextId) goToEvent(nextId, true);
            else {
                addLog("Error: Logic event has no destination or stuck.");
                console.error("Logic event stuck:", evt);
            }
        };

        const handleOption = (opt) => {
            console.log("Option clicked:", opt);
            if (opt.next_event) {
                goToEvent(opt.next_event, true); // Keep story feed
            }
        };

        // --- Debug Actions ---
        const debugToggle = () => debugMode.value = !debugMode.value;
        
        const debugAddShells = (n) => {
            currentCharacter.value.money += n;
        };
        
        const debugAddItem = () => {
            if (!debugAddItemSelect.value) return;
            const id = parseInt(debugAddItemSelect.value);
            if (!currentCharacter.value.inventory.includes(id)) {
                currentCharacter.value.inventory.push(id);
            }
        };
        
        const debugRemoveItem = (id) => {
            currentCharacter.value.inventory = currentCharacter.value.inventory.filter(i => i !== id);
        };
        
        const debugAddKeyword = () => {
            if (!debugAddKwSelect.value) return;
            const id = parseInt(debugAddKwSelect.value);
            if (!currentCharacter.value.keywords.includes(id)) {
                currentCharacter.value.keywords.push(id);
            }
        };
        
        const debugRemoveKeyword = (id) => {
            currentCharacter.value.keywords = currentCharacter.value.keywords.filter(k => k !== id);
        };
        
        const debugJump = () => {
            if (debugJumpId.value) {
                goToEvent(debugJumpId.value, true);
            }
        };
        
        const getItemName = (id) => {
            const i = items.value.find(x => x.id == id);
            return i ? i.name : `Item ${id}`;
        };
        
        const getKwName = (id) => {
            const k = keywordsData.value.find(x => x.id == id);
            return k ? k.name : `Keyword ${id}`;
        };

        const currentProfessionName = computed(() => {
            const profId = currentCharacter.value.prof;
            const cls = classes.value.find(c => c.id == profId);
            return cls ? cls.display_name : "Unknown";
        });

        // --- Setup Logic ---
        const showPreGenerated = () => gameState.value = 'SELECT_CLASS';

        const selectClass = (cls) => {
            currentClass.value = cls;
            currentCharacter.value = {
                name: cls.name,
                stats: [...cls.stats],
                inventory: [],
                keywords: [],
                money: 20, // Default start money
                prof: cls.id
            };
            gameState.value = 'CONFIRM_CHAR';
        };

        const createRandomCharacter = () => {
            const randomClass = classes.value[Math.floor(Math.random() * classes.value.length)];
            selectClass(randomClass);
            randomizeStats();
        };
        
        const changeRandomClass = () => {
            const randomClass = classes.value[Math.floor(Math.random() * classes.value.length)];
            currentClass.value = randomClass;
            // Reset character but keep name? No, reset name too usually
            currentCharacter.value.prof = randomClass.id;
            currentCharacter.value.name = randomClass.name;
            currentCharacter.value.stats = [...randomClass.stats];
        };

        const randomizeStats = () => {
            const newStats = currentCharacter.value.stats.map(val => {
                let change = Math.floor(Math.random() * 4);
                if (Math.random() > 0.5) change = -change;
                let newVal = val + change;
                if (newVal < 1) newVal = 1; 
                if (newVal > 25) newVal = 25; // Cap at 25?
                return newVal;
            });
            currentCharacter.value.stats = newStats;
        };
        
        const updateStat = (idx, delta) => {
            let newVal = currentCharacter.value.stats[idx] + delta;
            if (newVal < 1) newVal = 1;
            // No hard cap for manual edit? or 30?
            currentCharacter.value.stats[idx] = newVal;
        };

        const startGameplay = () => {
            gameState.value = 'PLAYING';
            gameLogs.value = ["游戏开始..."];
            
            const pid = currentCharacter.value.prof;
            let startId = "200"; // Default
            
            if (pid == 8) startId = "Fstart";
            else if (pid == 9) { startId = "Dstart"; currentCharacter.value.money = 40; }
            else if (pid == 13) startId = "Faunstart1";
            else if (pid == 3 && Math.random() > 0.5) startId = "Rstart";
            else if (pid == 7 && Math.random() > 0.5) startId = "Pstart";
            else if (pid == 11) startId = "Astart";
            else if (pid == 14) startId = "Tstart";
            else if (pid == 15) startId = "Cstart";
            else if (pid == 16) startId = "Ftstart";
            else if (pid == 1) startId = "Catstart";
            else if (pid == 20) startId = "Snow";
            
            // Special Shells logic (game.php 910)
            if (pid == 8 || pid == 13) currentCharacter.value.money = 0;
            
            accumulatedText.value = ""; // Clear on new game start
            goToEvent(startId, true); // Then start with append mode
        };

        const addLog = (msg) => {
            gameLogs.value.unshift(new Date().toLocaleTimeString() + ': ' + msg);
        };

        const saveGame = () => {
            const saveData = {
                gameState: gameState.value,
                currentClass: currentClass.value,
                currentCharacter: currentCharacter.value,
                currentEventId: currentEvent.value ? currentEvent.value.id : null,
                gameLogs: gameLogs.value,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('aof_save', JSON.stringify(saveData));
            hasSave.value = true;
            alert(t('Game Saved'));
        };

        const loadGame = () => {
            const saveStr = localStorage.getItem('aof_save');
            if (saveStr) {
                const saveData = JSON.parse(saveStr);
                currentClass.value = saveData.currentClass;
                currentCharacter.value = saveData.currentCharacter;
                gameLogs.value = saveData.gameLogs;
                gameState.value = 'PLAYING';
                
                // Ensure money exists
                if (currentCharacter.value.money === undefined) currentCharacter.value.money = 0;

                if (saveData.currentEventId) {
                    goToEvent(saveData.currentEventId);
                } else {
                    startGameplay();
                }
            }
        };

        onMounted(() => {
            loadData();
            if (localStorage.getItem('aof_save')) {
                hasSave.value = true;
            }
        });

        return {
            gameState, classes, attributes, lang, items, keywordsData,
            currentClass, currentCharacter, currentEvent, accumulatedText, gameLogs, hasSave,
            debugMode, debugJumpId, debugAddItemSelect, debugAddKwSelect,
            t, setLang, showPreGenerated, selectClass, createRandomCharacter, changeRandomClass, randomizeStats, updateStat,
            startGameplay, addLog, saveGame, loadGame, handleOption, goToEvent,
            // Debug methods
            debugToggle, debugAddShells, debugAddItem, debugRemoveItem,
            debugAddKeyword, debugRemoveKeyword, debugJump, getItemName, getKwName,
            accumulatedText, availableChoices, currentProfessionName
        };
    }
}).mount('#app');

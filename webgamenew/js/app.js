const { createApp, ref, computed, onMounted } = Vue;

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
        const gameLogs = ref([]);
        const hasSave = ref(false);
        
        // Debug State
        const debugMode = ref(false);
        const debugJumpId = ref('');
        const debugAddItemSelect = ref('');
        const debugAddKwSelect = ref('');

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

        const goToEvent = (id) => {
            console.log(`[Goto] Event ID: ${id}`);
            const evt = findEvent(id);
            if (!evt) {
                addLog(`Error: Event ${id} not found.`);
                console.error(`Event ${id} not found in events list.`);
                return;
            }

            console.log(`[Event] Type: ${evt.type}, Text: ${evt.text_zh.substring(0, 20)}...`);

            // Handle Logic Events (non-interactive)
            if (evt.logic) {
                console.log(`[Logic] Processing logic type: ${evt.logic.type}`, evt.logic);
                handleLogic(evt);
                return;
            }

            // Interactive Event
            currentEvent.value = evt;
        };

        const handleLogic = (evt) => {
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
                result = `[Check] ${l.attr} (${statVal}) vs Roll ${roll}: ${passed ? 'Success' : 'Fail'}`;
                addLog(result);
            }
            else if (l.type === 'random') {
                const targets = l.targets;
                if (targets && targets.length > 0) {
                    nextId = targets[Math.floor(Math.random() * targets.length)];
                }
            }
            else if (l.type === 'effect') {
                if (l.item_op) {
                    const iid = parseInt(l.item_id);
                    if (l.item_op === 'add') {
                        if(!currentCharacter.value.inventory.includes(iid)) 
                            currentCharacter.value.inventory.push(iid);
                        addLog(`[Item] Gained item #${iid}`);
                    } else {
                        currentCharacter.value.inventory = currentCharacter.value.inventory.filter(i => i !== iid);
                        addLog(`[Item] Lost item #${iid}`);
                    }
                }
                if (l.keyword_op) {
                    const kid = parseInt(l.keyword_id);
                    if (l.keyword_op === 'add') {
                        if(!currentCharacter.value.keywords.includes(kid))
                            currentCharacter.value.keywords.push(kid);
                    } else {
                        currentCharacter.value.keywords = currentCharacter.value.keywords.filter(k => k !== kid);
                    }
                }
                if (l.stat_attr) {
                    const idx = attributes.value.indexOf(l.stat_attr);
                    if (idx >= 0) {
                        currentCharacter.value.stats[idx] += parseInt(l.stat_val);
                        addLog(`[Stat] ${l.stat_attr} ${l.stat_val > 0 ? '+' : ''}${l.stat_val}`);
                    }
                }
                if (l.money_val) {
                    currentCharacter.value.money += parseInt(l.money_val);
                    addLog(`[Money] ${l.money_val > 0 ? '+' : ''}${l.money_val} shells`);
                }
                nextId = l.next;
            }
            else if (l.type === 'item_check') {
                const has = currentCharacter.value.inventory.includes(parseInt(l.item_id));
                nextId = has ? l.pass : l.fail;
            }
            else if (l.type === 'keyword_check') {
                const has = currentCharacter.value.keywords.includes(parseInt(l.keyword_id));
                nextId = has ? l.pass : l.fail;
            }
            else if (l.type === 'prof_check') {
                const isProf = currentCharacter.value.prof == parseInt(l.prof_id);
                nextId = isProf ? l.pass : l.fail;
            }
            else if (l.type === 'money_check') {
                const has = currentCharacter.value.money >= parseInt(l.amount);
                nextId = has ? l.pass : l.fail;
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
            }
            
            if (nextId) goToEvent(nextId);
            else {
                addLog("Error: Logic event has no destination or stuck.");
                console.error("Logic event stuck:", evt);
            }
        };

        const handleOption = (opt) => {
            console.log("Option clicked:", opt);
            if (opt.next_event) {
                goToEvent(opt.next_event);
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
                goToEvent(debugJumpId.value);
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
            
            goToEvent(startId);
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
            currentClass, currentCharacter, currentEvent, gameLogs, hasSave,
            debugMode, debugJumpId, debugAddItemSelect, debugAddKwSelect,
            t, setLang, showPreGenerated, selectClass, createRandomCharacter, changeRandomClass, randomizeStats, updateStat,
            startGameplay, addLog, saveGame, loadGame, handleOption,
            // Debug methods
            debugToggle, debugAddShells, debugAddItem, debugRemoveItem,
            debugAddKeyword, debugRemoveKeyword, debugJump, getItemName, getKwName
        };
    }
}).mount('#app');

const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // Data
        const classes = ref([]);
        const attributes = ref([]);
        const localization = ref({});
        const events = ref([]);
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

        // --- Loading ---
        const loadData = () => {
            if (window.GAME_DATA_CLASSES) classes.value = window.GAME_DATA_CLASSES;
            if (window.GAME_DATA_ATTRIBUTES) attributes.value = window.GAME_DATA_ATTRIBUTES;
            if (window.GAME_DATA_LOCALIZATION) localization.value = window.GAME_DATA_LOCALIZATION;
            if (window.GAME_DATA_EVENTS) events.value = window.GAME_DATA_EVENTS;
            
            if (!window.GAME_DATA_CLASSES) {
                console.error("Game data not found.");
                alert("Failed to load game data.");
            } else {
                console.log("Data Loaded.");
                console.log("Events:", events.value.length);
                console.log("Localization keys:", Object.keys(localization.value).length);
                if (localization.value['Loc_Continue']) {
                    console.log("Loc_Continue found:", localization.value['Loc_Continue']);
                } else {
                    console.warn("Loc_Continue NOT found in localization data!");
                }
            }
        };

        const t = (key) => {
            if (!key) return "";
            
            // Check if key exists in localization
            if (localization.value[key]) {
                return lang.value === 'zh' ? localization.value[key].zh : localization.value[key].en;
            }
            
            // If it starts with Loc_, it SHOULD be localized. Log warning.
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
                // Assuming simple check: Roll <= Stat
                const passed = roll <= statVal;
                
                nextId = passed ? l.pass : l.fail;
                result = `[Check] ${l.attr} (${statVal}) vs Roll ${roll}: ${passed ? 'Success' : 'Fail'}`;
                addLog(result);
                console.log(result + ` -> Next: ${nextId}`);
            }
            else if (l.type === 'random') {
                const targets = l.targets;
                if (targets && targets.length > 0) {
                    nextId = targets[Math.floor(Math.random() * targets.length)];
                    console.log(`[Random] Selected ${nextId} from`, targets);
                }
            }
            else if (l.type === 'effect') {
                console.log("[Effect] Applying effects...");
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
                        console.log(`[Keyword] Added ${kid}`);
                    } else {
                        currentCharacter.value.keywords = currentCharacter.value.keywords.filter(k => k !== kid);
                        console.log(`[Keyword] Removed ${kid}`);
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
                console.log(`[Item Check] Item #${l.item_id}: ${has} -> Next: ${nextId}`);
            }
            else if (l.type === 'keyword_check') {
                const has = currentCharacter.value.keywords.includes(parseInt(l.keyword_id));
                nextId = has ? l.pass : l.fail;
                console.log(`[Keyword Check] Keyword #${l.keyword_id}: ${has} -> Next: ${nextId}`);
            }
            else if (l.type === 'prof_check') {
                const isProf = currentCharacter.value.prof == parseInt(l.prof_id);
                nextId = isProf ? l.pass : l.fail;
                console.log(`[Prof Check] Prof #${l.prof_id} vs ${currentCharacter.value.prof}: ${isProf} -> Next: ${nextId}`);
            }
            else if (l.type === 'money_check') {
                const has = currentCharacter.value.money >= parseInt(l.amount);
                nextId = has ? l.pass : l.fail;
                console.log(`[Money Check] Need ${l.amount}, have ${currentCharacter.value.money}: ${has} -> Next: ${nextId}`);
            }
            
            if (nextId) goToEvent(nextId);
            else {
                addLog("Error: Logic event has no destination.");
                console.error("Logic event stuck:", evt);
            }
        };

        const handleOption = (opt) => {
            console.log("Option clicked:", opt);
            if (opt.next_event) {
                goToEvent(opt.next_event);
            }
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

        const startNewGame = () => {
            const randomClass = classes.value[Math.floor(Math.random() * classes.value.length)];
            selectClass(randomClass);
            randomizeStats();
        };

        const randomizeStats = () => {
            const newStats = currentCharacter.value.stats.map(val => {
                let change = Math.floor(Math.random() * 4);
                if (Math.random() > 0.5) change = -change;
                let newVal = val + change;
                if (newVal < 1) newVal = 1; 
                if (newVal > 20) newVal = 20;
                return newVal;
            });
            currentCharacter.value.stats = newStats;
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
            gameState, classes, attributes, lang,
            currentClass, currentCharacter, currentEvent, gameLogs, hasSave,
            t, setLang, showPreGenerated, selectClass, startNewGame, randomizeStats,
            startGameplay, addLog, saveGame, loadGame, handleOption
        };
    }
}).mount('#app');

const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const EVENT_TYPES = {
    0: "End (0)",
    1: "Single Link (1)",
    2: "Free Choice (2)",
    3: "Attribute Check (3)",
    4: "Random Branch (4)",
    5: "Item Check (5)",
    6: "Keyword Check (6)",
    7: "Gain/Lose Item (7)",
    8: "Gain/Lose Keyword (8)",
    9: "Stat Change (9)",
    10: "Money Change (10)",
    11: "Money Check (11)",
    12: "Multi-Attr Check (12)",
    13: "Click Continue (13)",
    14: "Gain Blessing (14)",
    15: "Blessing Check (15)",
    16: "Profession Check (16)",
    17: "Conditional Choice (17)",
    18: "Lose Companions (18)",
    19: "Not Implemented (19)",
    20: "Level Check (20)",
    21: "Stat Swap (21)",
    22: "Money Check Rand (22)",
    23: "Prof Change Rand (23)",
    24: "Prof Change Clown (24)",
    25: "Winning End (25)"
};

const LOGIC_TYPES = [
    { value: 'check', label: 'Attribute Check (Type 3)' },
    { value: 'random', label: 'Random Branch (Type 4)' },
    { value: 'item_check', label: 'Item Check (Type 5)' },
    { value: 'keyword_check', label: 'Keyword Check (Type 6)' },
    { value: 'effect', label: 'Effect (Type 7,8,9,10)' },
    { value: 'money_check', label: 'Money Check (Type 11)' },
    { value: 'multi_check', label: 'Multi-Attr Check (Type 12)' },
    { value: 'prof_check', label: 'Profession Check (Type 16)' }
];

createApp({
    setup() {
        const activeTab = ref('classes');
        
        // Data
        const classes = ref([]);
        const events = ref([]);
        const attributes = ref([]);
        const localization = ref({});
        const items = ref([]);
        const keywords = ref([]);
        
        // Editing State
        const editingClass = ref(null);
        const editingEvent = ref(null);
        const editingItem = ref(null);
        const editingKeyword = ref(null);
        
        // Navigation History
        const navHistory = ref([]);
        const navIndex = ref(-1);
        
        // Search & Filter State
        const locSearch = ref('');
        const eventSearch = ref('');
        const eventTypeFilter = ref('all');
        const keywordSearch = ref('');

        // Loading
        const loadData = () => {
            if (window.GAME_DATA_CLASSES) classes.value = window.GAME_DATA_CLASSES;
            if (window.GAME_DATA_ATTRIBUTES) attributes.value = window.GAME_DATA_ATTRIBUTES;
            if (window.GAME_DATA_LOCALIZATION) localization.value = window.GAME_DATA_LOCALIZATION;
            if (window.GAME_DATA_EVENTS) events.value = window.GAME_DATA_EVENTS;
            else events.value = [];
            if (window.GAME_DATA_ITEMS) items.value = window.GAME_DATA_ITEMS;
            else items.value = [];
            if (window.GAME_DATA_KEYWORDS) keywords.value = window.GAME_DATA_KEYWORDS;
            else keywords.value = [];
        };

        const blessings = computed(() => {
            // Attributes + Shelter + random
            return [...attributes.value, "Shelter", "random"];
        });

        const referencedBy = computed(() => {
            if (!editingEvent.value) return [];
            const targetId = String(editingEvent.value.id);
            const refs = [];
            
            events.value.forEach(evt => {
                let linked = false;
                
                // Check Options
                if (evt.options) {
                    evt.options.forEach(opt => {
                        if (String(opt.next_event) === targetId) linked = true;
                    });
                }
                
                // Check Logic
                if (evt.logic && !linked) {
                    const l = evt.logic;
                    if (String(l.next) === targetId) linked = true;
                    if (String(l.pass) === targetId) linked = true;
                    if (String(l.fail) === targetId) linked = true;
                    if (l.targets && l.targets.some(t => String(t) === targetId)) linked = true;
                    if (l.dests && l.dests.some(d => String(d) === targetId)) linked = true;
                }
                
                if (linked) {
                    refs.push({
                        id: evt.id,
                        type: evt.type,
                        text: evt.text_zh || evt.text_en || "(No Text)"
                    });
                }
            });
            return refs;
        });

        // --- Classes Logic ---
        const editClass = (cls) => {
            editingClass.value = cls;
        };
        const addClass = () => {
            const newId = classes.value.length > 0 ? Math.max(...classes.value.map(c => c.id)) + 1 : 1;
            const newClass = {
                id: newId,
                image: "talking-cat",
                display_name: "New Class",
                stats: Array(12).fill(10),
                gender: 4
            };
            classes.value.push(newClass);
            editingClass.value = newClass;
        };
        const deleteClass = (cls) => {
            if(confirm('Delete class ' + cls.display_name + '?')) {
                classes.value = classes.value.filter(c => c.id !== cls.id);
                if(editingClass.value === cls) editingClass.value = null;
            }
        };
        
        // --- Items Logic ---
        const editItem = (item) => {
            editingItem.value = item;
        };
        const addItem = () => {
            const newId = items.value.length > 0 ? Math.max(...items.value.map(i => i.id)) + 1 : 1;
            const newItem = {
                id: newId,
                name: "New Item",
                type: "item"
            };
            items.value.push(newItem);
            editingItem.value = newItem;
        };
        const deleteItem = (item) => {
             if(confirm('Delete item ' + item.name + '?')) {
                items.value = items.value.filter(i => i.id !== item.id);
                if(editingItem.value === item) editingItem.value = null;
            }
        };

        // --- Keywords Logic ---
        const filteredKeywords = computed(() => {
            if (!keywordSearch.value) return keywords.value;
            const s = keywordSearch.value.toLowerCase();
            return keywords.value.filter(k => 
                k.id.toString().includes(s) || 
                k.name.toLowerCase().includes(s)
            );
        });

        const editKeyword = (kw) => {
            editingKeyword.value = kw;
        };
        const addKeyword = () => {
            const newId = keywords.value.length > 0 ? Math.max(...keywords.value.map(k => k.id)) + 1 : 1;
            const newKw = { id: newId, name: "New Keyword" };
            keywords.value.push(newKw);
            editingKeyword.value = newKw;
        };
        const deleteKeyword = (kw) => {
            if(confirm('Delete keyword?')) {
                keywords.value = keywords.value.filter(k => k.id !== kw.id);
                if(editingKeyword.value === kw) editingKeyword.value = null;
            }
        };


        // --- Events Logic ---
        const filteredEvents = computed(() => {
            let res = events.value;
            if (eventTypeFilter.value !== 'all') {
                const typeId = parseInt(eventTypeFilter.value);
                res = res.filter(e => e.type === typeId);
            }
            if (eventSearch.value) {
                const s = eventSearch.value.toLowerCase();
                res = res.filter(e => 
                    e.id.toString().toLowerCase().includes(s) || 
                    (e.text_zh && e.text_zh.toLowerCase().includes(s)) ||
                    (e.text_en && e.text_en.toLowerCase().includes(s))
                );
            }
            return res.slice(0, 100);
        });

        const editEvent = (evt, pushToHistory = true) => {
            editingEvent.value = evt;
            if (pushToHistory) {
                if (navIndex.value < navHistory.value.length - 1) {
                    navHistory.value = navHistory.value.slice(0, navIndex.value + 1);
                }
                const currentId = navIndex.value >= 0 ? navHistory.value[navIndex.value] : null;
                if (currentId !== evt.id) {
                    navHistory.value.push(evt.id);
                    navIndex.value = navHistory.value.length - 1;
                }
            }
        };
        
        const navigateTo = (id) => {
            const evt = events.value.find(e => e.id == id);
            if (evt) {
                editEvent(evt, true);
            } else {
                alert("Event not found: " + id);
            }
        };
        
        const goBack = () => {
            if (navIndex.value > 0) {
                navIndex.value--;
                const id = navHistory.value[navIndex.value];
                const evt = events.value.find(e => e.id == id);
                if (evt) editEvent(evt, false);
            }
        };
        
        const goForward = () => {
            if (navIndex.value < navHistory.value.length - 1) {
                navIndex.value++;
                const id = navHistory.value[navIndex.value];
                const evt = events.value.find(e => e.id == id);
                if (evt) editEvent(evt, false);
            }
        };

        const addEvent = () => {
            const newEvt = {
                id: "new_event_" + Date.now(),
                text_zh: "新事件",
                text_en: "New Event",
                options: []
            };
            events.value.push(newEvt);
            editEvent(newEvt, true);
        };
        const deleteEvent = (evt) => {
            if(confirm('Delete event?')) {
                events.value = events.value.filter(e => e.id !== evt.id);
                editingEvent.value = null;
            }
        };
        const addOption = (evt) => {
            evt.options.push({
                text_zh: "新选项",
                text_en: "New Option",
                next_event: ""
            });
        };
        
        // Helper to initialize logic object if missing
        const ensureLogic = (type) => {
            if (!editingEvent.value.logic) editingEvent.value.logic = {};
            editingEvent.value.logic.type = type;
        };

        const ensureLogicLists = () => {
            if (editingEvent.value.type === 12) {
                const logic = editingEvent.value.logic;
                const count = logic.count || 0;
                
                if (!logic.attrs) logic.attrs = [];
                // Resize attrs to count
                while (logic.attrs.length < count) logic.attrs.push("Stamina");
                while (logic.attrs.length > count) logic.attrs.pop();
                
                if (!logic.dests) logic.dests = [];
                // Resize dests to count + 1
                while (logic.dests.length < count + 1) logic.dests.push("");
                while (logic.dests.length > count + 1) logic.dests.pop();
            }
        };

        // --- Localization Logic ---
        const filteredLoc = computed(() => {
            let keys = Object.keys(localization.value);
            if (locSearch.value) {
                const s = locSearch.value.toLowerCase();
                keys = keys.filter(k => 
                    k.toLowerCase().includes(s) || 
                    (localization.value[k].en && localization.value[k].en.toLowerCase().includes(s)) || 
                    (localization.value[k].zh && localization.value[k].zh.toLowerCase().includes(s))
                );
            }
            const limitedKeys = keys.slice(0, 100);
            const res = {};
            limitedKeys.forEach(k => res[k] = localization.value[k]);
            return res;
        });

        const addLocKey = () => {
            const key = prompt("Enter new key:");
            if(key && !localization.value[key]) {
                localization.value[key] = { en: "", zh: "" };
            } else if (localization.value[key]) {
                alert("Key exists!");
            }
        };

        const deleteLoc = (key) => {
            if(confirm("Delete key " + key + "?")) {
                delete localization.value[key];
            }
        };

        const exportCSV = () => {
            const data = [];
            data.push(["Key", "English", "Chinese"]);
            for(let k in localization.value) {
                data.push([k, localization.value[k].en, localization.value[k].zh]);
            }
            const csv = Papa.unparse(data);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "localization.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const importCSV = (e) => {
            const file = e.target.files[0];
            if(!file) return;
            Papa.parse(file, {
                complete: function(results) {
                    let rows = results.data;
                    if(rows[0][0] === "Key") rows.shift();
                    rows.forEach(row => {
                        if(row.length >= 3 && row[0]) {
                            localization.value[row[0]] = {
                                en: row[1],
                                zh: row[2]
                            };
                        }
                    });
                    alert("Imported " + rows.length + " rows.");
                }
            });
        };

        // --- Global Actions ---
        const downloadJS = (data, varName, filename) => {
            const jsonStr = JSON.stringify(data, null, 2);
            const jsContent = `window.${varName} = ${jsonStr};`;
            const blob = new Blob([jsContent], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const downloadAll = () => {
            downloadJS(classes.value, 'GAME_DATA_CLASSES', 'classes.js');
            downloadJS(events.value, 'GAME_DATA_EVENTS', 'events.js');
            downloadJS(localization.value, 'GAME_DATA_LOCALIZATION', 'localization.js');
            downloadJS(items.value, 'GAME_DATA_ITEMS', 'items.js');
            downloadJS(keywords.value, 'GAME_DATA_KEYWORDS', 'keywords.js');
            
            alert("Downloaded .js files. Replace them in webgamenew/data/ folder to apply changes.");
        };

        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                if (editingEvent.value) editingEvent.value = null;
                if (editingClass.value) editingClass.value = null;
                if (editingItem.value) editingItem.value = null;
                if (editingKeyword.value) editingKeyword.value = null;
            }
        };

        const formatSourceCode = (code) => {
            if (!code) return '';
            
            // Regex to find: array( "text", type, args ... )
            // We want to bold "args ..."
            const regex = /(array\s*\(\s*(?:(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*')|[^,]+)\s*,\s*[\d]+\s*,)([\s\S]*?)(\)\s*,?\s*$)/;
            
            const match = code.match(regex);
            const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            
            if (match) {
                const prefix = match[1]; 
                const args = match[2];
                const suffix = match[3];
                return `${esc(prefix)}<b class="text-dark bg-warning-subtle px-1">${esc(args)}</b>${esc(suffix)}`;
            }
            
            return esc(code);
        };

        onMounted(() => {
            loadData();
            window.addEventListener('keydown', handleKeydown);
        });

        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeydown);
        });

        return {
            activeTab,
            classes, events, attributes, localization, items, keywords, blessings,
            editingClass, editingEvent, editingItem, editingKeyword,
            locSearch, eventSearch, eventTypeFilter, keywordSearch, 
            eventTypes: EVENT_TYPES, logicTypes: LOGIC_TYPES,
            navHistory, navIndex,
            filteredLoc, filteredEvents, filteredKeywords, referencedBy,
            // methods
            editClass, addClass, deleteClass,
            editItem, addItem, deleteItem,
            editKeyword, addKeyword, deleteKeyword,
            editEvent, addEvent, deleteEvent, addOption, ensureLogic, ensureLogicLists,
            navigateTo, goBack, goForward,
            addLocKey, deleteLoc, exportCSV, importCSV,
            downloadAll, formatSourceCode
        };
    }
}).mount('#app');

const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

// Logic Editor Component
const LogicEditor = {
    template: '#logic-editor-tpl',
    props: {
        evt: { type: Object, required: true },
        compact: { type: Boolean, default: false },
        attrList: { type: Array, default: () => [] },
        items: { type: Array, default: () => [] },
        keywords: { type: Array, default: () => [] },
        blessings: { type: Array, default: () => [] },
        classes: { type: Array, default: () => [] }
    },
    emits: ['navigate', 'ensure-logic', 'ensure-logic-lists']
};

const EVENT_TYPES = {
    0: "End (0)",
    1: "Single Link (1) - Auto Advance",
    2: "Free Choice (2) - User Action",
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
    13: "Click Continue (13) - User Action",
    14: "Gain Blessing (14)",
    15: "Blessing Check (15)",
    16: "Profession Check (16)",
    17: "Conditional Choice (17)",
    18: "Lose Companions (18)",
    19: "Not Implemented (19)",
    20: "Level Check (20)",
    21: "Stat Swap (21)",
    22: "Random Shell Check (22)",
    23: "Random Profession (23)",
    24: "Become Clown (24)",
    25: "Winning End (25)",
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

const EventLogicEditor = {
    props: ['event', 'attributes', 'items', 'keywords', 'classes', 'blessings'],
    emits: ['navigate', 'ensure-logic', 'ensure-logic-lists'],
    template: `
    <div v-if="[3,4,5,6,7,8,9,10,11,12,14,15,16].includes(event.type)" class="card p-2 mb-2 bg-light border-info">
        <h6 class="card-subtitle mb-2 text-muted small">Event Logic</h6>
        <div v-if="!event.logic">
            <button class="btn btn-sm btn-warning" @click="$emit('ensure-logic', 'default')">Init Logic</button>
        </div>
        <div v-else class="small">
            <!-- Type 3: Attr Check -->
            <div v-if="event.type === 3" class="row g-1">
                <div class="col-6"><label>Attr</label><select class="form-select form-select-sm" v-model="event.logic.attr"><option v-for="a in attributes" :value="a">{{a}}</option></select></div>
                <div class="col-6"><label>Diff</label><input type="number" class="form-control form-control-sm" v-model.number="event.logic.diff"></div>
                <div class="col-6"><label>Pass</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.pass"><button class="btn btn-primary" @click="$emit('navigate', event.logic.pass)">-></button></div></div>
                <div class="col-6"><label>Fail</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.fail"><button class="btn btn-primary" @click="$emit('navigate', event.logic.fail)">-></button></div></div>
            </div>
            
            <!-- Type 4: Random -->
            <div v-if="event.type === 4">
                <label>Random Targets</label>
                <div v-for="(t, idx) in event.logic.targets" :key="idx" class="input-group input-group-sm mb-1">
                    <input type="text" class="form-control" v-model="event.logic.targets[idx]">
                    <button class="btn btn-primary px-1" @click="$emit('navigate', event.logic.targets[idx])">-></button>
                    <button class="btn btn-outline-danger px-1" @click="event.logic.targets.splice(idx,1)">x</button>
                </div>
                <button class="btn btn-sm btn-outline-primary" @click="if(!event.logic.targets) event.logic.targets=[]; event.logic.targets.push('')">+ Target</button>
            </div>

            <!-- Type 5: Item Check -->
            <div v-if="event.type === 5" class="row g-1">
                <div class="col-12"><label>Item</label><select class="form-select form-select-sm" v-model.number="event.logic.item_id"><option v-for="i in items" :value="i.id">{{ i.id }}: {{ i.name }}</option></select></div>
                <div class="col-6"><label>Have (Pass)</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.pass"><button class="btn btn-primary" @click="$emit('navigate', event.logic.pass)">-></button></div></div>
                <div class="col-6"><label>Don't (Fail)</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.fail"><button class="btn btn-primary" @click="$emit('navigate', event.logic.fail)">-></button></div></div>
            </div>

            <!-- Type 6: Keyword Check -->
            <div v-if="event.type === 6" class="row g-1">
                <div class="col-12"><label>Keyword</label><select class="form-select form-select-sm" v-model.number="event.logic.keyword_id"><option v-for="k in keywords" :value="k.id">{{ k.id }}: {{ k.name.substring(0,80) }}</option></select></div>
                <div class="col-6"><label>Have (Pass)</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.pass"><button class="btn btn-primary" @click="$emit('navigate', event.logic.pass)">-></button></div></div>
                <div class="col-6"><label>Don't (Fail)</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.fail"><button class="btn btn-primary" @click="$emit('navigate', event.logic.fail)">-></button></div></div>
            </div>

            <!-- Type 7: Gain/Lose Item -->
            <div v-if="event.type === 7" class="row g-1">
                <div class="col-8"><label>Item</label><select class="form-select form-select-sm" v-model.number="event.logic.item_id"><option v-for="i in items" :value="i.id">{{ i.id }}: {{ i.name }}</option></select></div>
                <div class="col-4"><label>Action</label><select class="form-select form-select-sm" v-model="event.logic.item_op"><option value="add">Add</option><option value="remove">Remove</option></select></div>
                <div class="col-12"><label>Next</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.next"><button class="btn btn-primary" @click="$emit('navigate', event.logic.next)">-></button></div></div>
            </div>
            
            <!-- Type 8: Gain/Lose Keyword -->
            <div v-if="event.type === 8" class="row g-1">
                <div class="col-8"><label>Keyword</label><select class="form-select form-select-sm" v-model.number="event.logic.keyword_id"><option v-for="k in keywords" :value="k.id">{{ k.id }}: {{ k.name.substring(0,80) }}</option></select></div>
                <div class="col-4"><label>Action</label><select class="form-select form-select-sm" v-model="event.logic.keyword_op"><option value="add">Add</option><option value="remove">Remove</option></select></div>
                <div class="col-12"><label>Next</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.next"><button class="btn btn-primary" @click="$emit('navigate', event.logic.next)">-></button></div></div>
            </div>

            <!-- Type 9: Stat Change -->
            <div v-if="event.type === 9" class="row g-1">
                <div class="col-6"><label>Stat</label><select class="form-select form-select-sm" v-model="event.logic.stat_attr"><option v-for="a in attributes" :value="a">{{ a }}</option></select></div>
                <div class="col-6"><label>Amount</label><input type="number" class="form-control form-control-sm" v-model.number="event.logic.stat_val"></div>
                <div class="col-12"><label>Next</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.next"><button class="btn btn-primary" @click="$emit('navigate', event.logic.next)">-></button></div></div>
            </div>

            <!-- Type 10: Money Change -->
            <div v-if="event.type === 10" class="row g-1">
                <div class="col-6"><label>Amount</label><input type="number" class="form-control form-control-sm" v-model.number="event.logic.money_val"></div>
                <div class="col-6"><label>Next</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.next"><button class="btn btn-primary" @click="$emit('navigate', event.logic.next)">-></button></div></div>
            </div>

            <!-- Type 11: Money Check -->
            <div v-if="event.type === 11" class="row g-1">
                <div class="col-12"><label>Required</label><input type="number" class="form-control form-control-sm" v-model.number="event.logic.amount"></div>
                <div class="col-6"><label>Pass</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.pass"><button class="btn btn-primary" @click="$emit('navigate', event.logic.pass)">-></button></div></div>
                <div class="col-6"><label>Fail</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.fail"><button class="btn btn-primary" @click="$emit('navigate', event.logic.fail)">-></button></div></div>
            </div>
            
            <!-- Type 12: Multi-Attr Check -->
            <div v-if="event.type === 12" class="row g-1">
                <div class="col-6"><label>N</label><input type="number" class="form-control form-control-sm" v-model.number="event.logic.count" @change="$emit('ensure-logic-lists')"></div>
                <div class="col-6"><label>Diff</label><input type="number" class="form-control form-control-sm" v-model.number="event.logic.diff"></div>
                <div class="col-12" v-if="event.logic.attrs">
                    <div v-for="(attr, idx) in event.logic.attrs" :key="'attr'+idx" class="mb-1">
                        <select class="form-select form-select-sm" v-model="event.logic.attrs[idx]"><option v-for="a in attributes" :value="a">{{ a }}</option></select>
                    </div>
                </div>
                <div class="col-12" v-if="event.logic.dests">
                    <div v-for="(dest, idx) in event.logic.dests" :key="'dest'+idx" class="input-group input-group-sm mb-1">
                        <span class="input-group-text p-1" style="width: 60px; font-size: 0.7em;">{{ idx===0?'Fail':'Pass '+idx }}</span>
                        <input type="text" class="form-control" v-model="event.logic.dests[idx]">
                        <button class="btn btn-primary px-1" @click="$emit('navigate', event.logic.dests[idx])">-></button>
                    </div>
                </div>
                <div class="col-12 text-end"><button class="btn btn-sm btn-outline-secondary" @click="$emit('ensure-logic-lists')">Fix Array Sizes</button></div>
            </div>
            
            <!-- Type 14: Gain Blessing -->
            <div v-if="event.type === 14" class="row g-1">
                <div class="col-12"><label>Blessing</label><select class="form-select form-select-sm" v-model="event.logic.blessing"><option v-for="b in blessings" :value="b">{{ b }}</option></select></div>
                <div class="col-12"><label>Next</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.next"><button class="btn btn-primary" @click="$emit('navigate', event.logic.next)">-></button></div></div>
            </div>
            
            <!-- Type 15: Blessing Check -->
            <div v-if="event.type === 15" class="row g-1">
                <div class="col-12"><label>Blessing</label><select class="form-select form-select-sm" v-model="event.logic.blessing"><option v-for="b in blessings" :value="b">{{ b }}</option></select></div>
                <div class="col-6"><label>Pass</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.pass"><button class="btn btn-primary" @click="$emit('navigate', event.logic.pass)">-></button></div></div>
                <div class="col-6"><label>Fail</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.fail"><button class="btn btn-primary" @click="$emit('navigate', event.logic.fail)">-></button></div></div>
            </div>

            <!-- Type 16: Profession Check -->
            <div v-if="event.type === 16" class="row g-1">
                <div class="col-12"><label>Profession</label><select class="form-select form-select-sm" v-model.number="event.logic.prof_id"><option v-for="cls in classes" :value="cls.id">{{ cls.display_name }}</option></select></div>
                <div class="col-6"><label>Pass</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.pass"><button class="btn btn-primary" @click="$emit('navigate', event.logic.pass)">-></button></div></div>
                <div class="col-6"><label>Fail</label><div class="input-group input-group-sm"><input type="text" class="form-control" v-model="event.logic.fail"><button class="btn btn-primary" @click="$emit('navigate', event.logic.fail)">-></button></div></div>
            </div>
            
            <!-- Catch-all for others -->
            <div v-if="event.logic.next !== undefined && !([7,8,9,10,14].includes(event.type))" class="mt-1">
                <label>Next</label>
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" v-model="event.logic.next">
                    <button class="btn btn-primary" @click="$emit('navigate', event.logic.next)">-></button>
                </div>
            </div>
        </div>
    </div>
    `
};

createApp({
    components: {
        'logic-editor': LogicEditor
    },
    setup() {
        const activeTab = ref('classes');
        
        // Data
        const classes = ref([]);
        const events = ref([]);
        const attributes = ref([]);
        const localization = ref({});
        const items = ref([]);
        const keywords = ref([]);
        const parentMap = ref({}); // Map<childId, parentId[]>
        
        // Editing State
        const editingClass = ref(null);
        const editingEvent = ref(null);
        const editingItem = ref(null);
        const editingKeyword = ref(null);
        
        // Graph State
        const graphCenterId = ref('200');
        const graphDepth = ref(5);
        const graphFontSize = ref(14);
        const graphLineLength = ref(0.8); // spacingFactor
        const selectedEvents = ref([]); // For box selection
        let cy = null;
        
        // Navigation History
        const navHistory = ref([]);
        const navIndex = ref(-1);
        
        // Search & Filter State
        const locSearch = ref('');
        const eventSearch = ref('');
        const eventTypeFilter = ref('all');
        const keywordSearch = ref('');

        // Data Check State
        const checkStatus = ref("");
        const brokenLinks = ref([]);
        const unreachableNodes = ref([]);
        const ENTRY_POINTS = [
            '200', 'Fstart', 'Dstart', 'Faunstart1', 
            'Rstart', 'Pstart', 'Astart', 'Tstart', 
            'Cstart', 'Ftstart', 'Catstart', 'Snow'
        ];

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
            
            buildParentMap();
        };

        const buildParentMap = () => {
            const pm = {};
            events.value.forEach(evt => {
                const addLink = (target) => {
                    if (!target) return;
                    const t = String(target);
                    if (!pm[t]) pm[t] = [];
                    // record { id, type, text } for parent
                    if (!pm[t].find(p => p.id === evt.id)) {
                        pm[t].push({
                            id: evt.id,
                            type: evt.type,
                            text: evt.text_zh || evt.text_en || "..."
                        });
                    }
                };

                // Options
                if (evt.options) {
                    evt.options.forEach(opt => addLink(opt.next_event));
                }
                // Logic
                if (evt.logic) {
                    const l = evt.logic;
                    if (l.next) addLink(l.next);
                    if (l.pass) addLink(l.pass);
                    if (l.fail) addLink(l.fail);
                    if (l.targets) l.targets.forEach(t => addLink(t));
                    if (l.dests) l.dests.forEach(d => addLink(d));
                }
            });
            parentMap.value = pm;
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
            
            // If in graph mode, ensure node is selected
            if (activeTab.value === 'graph' && cy) {
                 cy.$(':selected').unselect(); // clear
                 const node = cy.getElementById(String(evt.id));
                 if(node.length) node.select();
            }

            graphCenterId.value = evt.id; // Sync graph center
            if (activeTab.value === 'graph') renderGraph();
            
            if (pushToHistory) {
                if (navIndex.value < navHistory.value.length - 1) {
                    navHistory.value = navHistory.value.slice(0, navIndex.value + 1);
                }
                const currentId = navIndex.value >= 0 ? String(navHistory.value[navIndex.value]) : null;
                const newId = String(evt.id);
                if (currentId !== newId) {
                    navHistory.value.push(newId);
                    navIndex.value = navHistory.value.length - 1;
                }
            }
        };
        
        const navigateTo = (id) => {
            const evt = events.value.find(e => String(e.id) === String(id));
            if (evt) {
                editEvent(evt, true);
            } else {
                // If checking for a numeric ID that might be missing quotes in source but parsed as string or vice versa
                // We already convert both to String above.
                alert("Event not found: " + id);
            }
        };
        
        const goBack = () => {
            if (navIndex.value > 0) {
                navIndex.value--;
                const id = navHistory.value[navIndex.value];
                const evt = events.value.find(e => String(e.id) === String(id));
                if (evt) editEvent(evt, false);
            }
        };
        
        const goForward = () => {
            if (navIndex.value < navHistory.value.length - 1) {
                navIndex.value++;
                const id = navHistory.value[navIndex.value];
                const evt = events.value.find(e => String(e.id) === String(id));
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
        
        const findEvent = (id) => events.value.find(e => String(e.id) === String(id));

        const getEventChildren = (evt) => {
            const children = [];
            if (!evt) return children;
            
            // Helper
            const add = (id, reason) => {
                const s = String(id).trim();
                if (s && s !== 'undefined' && s !== 'null' && s !== "") {
                    children.push({ id: s, reason });
                }
            };

            // Options (Legacy)
            if (evt.options) {
                evt.options.forEach((opt, i) => add(opt.next_event, `Option ${i+1}`));
            }

            // Logic
            if (evt.logic) {
                const l = evt.logic;
                if (l.next) add(l.next, 'Logic Next');
                if (l.pass) add(l.pass, 'Logic Pass');
                if (l.fail) add(l.fail, 'Logic Fail');
                if (l.targets) l.targets.forEach(t => add(t, 'Random Target'));
                if (l.dests) l.dests.forEach(d => add(d, 'Multi Check Dest'));
                if (l.choices) {
                    l.choices.forEach(c => add(c.next_event, 'Choice: ' + c.text));
                }
            }
            return children;
        };

        const runDataCheck = () => {
            checkStatus.value = "Running analysis...";
            brokenLinks.value = [];
            unreachableNodes.value = [];
            
            setTimeout(() => {
                const reachable = new Set();
                const queue = [...ENTRY_POINTS];
                
                // Add all entry points to visited immediately if they exist
                ENTRY_POINTS.forEach(id => {
                    const sid = String(id);
                    // Special case: if entry point itself doesn't exist, we can't traverse from it
                    // But we still mark it as 'reachable' in the set so we don't list it as unreachable if it were in the list?
                    // Actually, if it's not in events list, we can't start traversal.
                    if (findEvent(sid)) {
                        reachable.add(sid);
                    }
                });

                // BFS for reachability
                let visitedCount = 0;
                // Use a separate set for queue processing to avoid loops
                // actually 'reachable' set is enough to prevent re-queueing
                // But queue initialization needs to be filtered by reachable
                const processingQueue = [...reachable]; 

                while (processingQueue.length > 0) {
                    const currId = processingQueue.shift();
                    const evt = findEvent(currId);
                    if (!evt) continue;

                    visitedCount++;
                    const children = getEventChildren(evt);
                    
                    children.forEach(child => {
                        const childId = String(child.id);
                        
                        // Check for broken link
                        // ID '0' is implicitly valid (End) even if not in events array
                        if (!findEvent(childId) && childId !== '0') {
                             // Check if we already recorded this broken link to avoid dups
                             const exists = brokenLinks.value.find(b => b.sourceId === evt.id && b.targetId === childId);
                             if (!exists) {
                                 brokenLinks.value.push({
                                     sourceId: evt.id,
                                     targetId: childId,
                                     reason: child.reason
                                 });
                             }
                        } else {
                            if (!reachable.has(childId) && childId !== '0') {
                                reachable.add(childId);
                                processingQueue.push(childId);
                            }
                        }
                    });
                }

                // Identify Unreachable
                events.value.forEach(evt => {
                    const id = String(evt.id);
                    // Don't mark ID 0 as unreachable if it exists (it's the end)
                    if (id !== '0' && !reachable.has(id)) {
                        unreachableNodes.value.push(evt);
                    }
                });
                
                checkStatus.value = `Analysis complete. Found ${unreachableNodes.value.length} unreachable nodes and ${brokenLinks.value.length} broken links. Scanned ${visitedCount} reachable nodes.`;
            }, 50);
        };

        const updateGraphStyle = () => {
            if (!cy) return;
            cy.style().selector('node').style('font-size', graphFontSize.value + 'px').update();
        };

        const adjustFont = (delta) => {
            graphFontSize.value += delta;
            if (graphFontSize.value < 8) graphFontSize.value = 8;
            if (graphFontSize.value > 36) graphFontSize.value = 36;
            updateGraphStyle();
        };

        const adjustLine = (delta) => {
            graphLineLength.value += delta;
            if (graphLineLength.value < 0.1) graphLineLength.value = 0.1;
            if (graphLineLength.value > 5.0) graphLineLength.value = 5.0;
            renderGraph(); // Re-run layout
        };
        
        // --- Graph Logic ---
        let isRightDown = false;
        let hasPanned = false;
        let lastMouse = {x:0, y:0};

        const initGraph = () => {
            setTimeout(() => {
                if (!cy) {
                    cy = cytoscape({
                        container: document.getElementById('cy'),
                        style: [
                            {
                                selector: 'node',
                                style: {
                                    'background-color': '#fff',
                                    'border-width': 1,
                                    'border-color': '#ccc',
                                    'label': 'data(label)',
                                    'color': '#333',
                                    'text-valign': 'center',
                                    'text-halign': 'center',
                                    'width': 'label',
                                    'height': 'label',
                                    'padding': '8px',
                                    'shape': 'round-rectangle',
                                    'text-wrap': 'wrap',
                                    'text-max-width': '180px',
                                    'font-size': '14px',
                                    'font-family': 'monospace',
                                    'text-justification': 'left'
                                }
                            },
                            {
                                selector: 'node[type = 0]',
                                style: {
                                    'background-color': '#e0e0e0', // Silver for End
                                    'border-color': '#9e9e9e'
                                }
                            },
                            {
                                selector: 'node[type = 25]',
                                style: {
                                    'background-color': '#fff3cd', // Gold/Yellowish for Winning End
                                    'border-color': '#ffc107'
                                }
                            },
                            {
                                selector: 'node[type = 2]',
                                style: {
                                    'background-color': '#e3f2fd', // Light Blue for Free Choice
                                    'border-color': '#90caf9'
                                }
                            },
                            {
                                selector: 'node[type = 4]',
                                style: {
                                    'background-color': '#d1e7dd', // Light Green for Random Branch
                                    'border-color': '#a3cfbb'
                                }
                            },
                            {
                                selector: 'edge',
                                style: {
                                    'width': 2,
                                    'line-color': '#adb5bd',
                                    'target-arrow-color': '#adb5bd',
                                    'target-arrow-shape': 'triangle',
                                    'curve-style': 'bezier',
                                    'label': 'data(label)',
                                    'font-size': '10px',
                                    'text-rotation': 'autorotate',
                                    'text-background-color': '#f8f9fa',
                                    'text-background-opacity': 0.8,
                                    'text-background-padding': '2px',
                                    'color': '#555'
                                }
                            },
                            {
                                selector: 'edge[label = "Pass"]',
                                style: {
                                    'line-color': '#198754', // Success Green
                                    'target-arrow-color': '#198754',
                                    'color': '#198754',
                                    'font-weight': 'bold'
                                }
                            },
                            {
                                selector: 'edge[label = "Fail"]',
                                style: {
                                    'line-color': '#dc3545', // Danger Red
                                    'target-arrow-color': '#dc3545',
                                    'color': '#dc3545',
                                    'font-weight': 'bold'
                                }
                            },
                            {
                                selector: '.center-node',
                                style: {
                                    'background-color': '#e7f1ff',
                                    'border-color': '#0d6efd',
                                    'border-width': 3,
                                    'font-weight': 'bold'
                                }
                            },
                            {
                                selector: '.parent-node',
                                style: {
                                    'border-color': '#6c757d',
                                    'border-style': 'dashed',
                                    'background-color': '#f8f9fa'
                                }
                            },
                            {
                                selector: ':selected',
                                style: {
                                    'border-width': 4,
                                    'border-color': '#FF00FF', // Bright Magenta
                                    'border-opacity': 1,
                                    'background-color': '#fff0f5'
                                }
                            }
                        ],
                        layout: { name: 'breadthfirst' },
                        selectionType: 'single',
                        boxSelectionEnabled: true, 
                        panningEnabled: true,
                        userPanningEnabled: true
                    });
                    
                    // Single node selection handling
                    // We rely on 'select' event instead of 'tap' to handle box selection and single click uniformly
                    
                    const updateSelection = () => {
                         if(!cy) return;
                         const selectedNodes = cy.$('node:selected');
                         // Map back to events
                         const newSelection = [];
                         selectedNodes.forEach(node => {
                             const id = node.id();
                             const evt = events.value.find(e => String(e.id) === id);
                             if (evt) newSelection.push(evt);
                         });
                         
                         selectedEvents.value = newSelection;
                         
                         // Determine editingEvent state
                         if (newSelection.length === 1) {
                             // Don't auto-push to history on selection to avoid spamming history with box select
                             // But we need to update the form
                             editingEvent.value = newSelection[0];
                         } else {
                             editingEvent.value = null;
                         }
                    };

                    // Debounce selection updates slightly
                    let selTimeout;
                    cy.on('select unselect', 'node', function(e) {
                         clearTimeout(selTimeout);
                         selTimeout = setTimeout(updateSelection, 50);
                    });
                    
                    // Allow navigating by clicking node (which also selects it)
                    cy.on('tap', 'node', function(evt){
                         // tap logic is covered by select, but if we want to ensure history update:
                         const id = evt.target.id();
                         // navigateTo(id) would call editEvent(evt, true) which pushes history
                         // Let's rely on selection for UI, and manual navigate for history if needed?
                         // Or just let tap drive history:
                         const e = events.value.find(ev => String(ev.id) === id);
                         if (e) {
                             // Only push to history if it's a specific single click action
                             // (Handled by editEvent logic inside navigateTo)
                             // But wait, updateSelection sets editingEvent.value directly.
                             // Let's sync history when single selection happens via tap?
                             // navigateTo(id); // This might conflict with box selection logic if not careful
                         }
                    });
                    
                    cy.on('cxttap', 'node', function(evt){
                        if(!isRightDown && !hasPanned) { // Prevent if dragging
                            const id = evt.target.id();
                            // Use navigateTo to ensure history update and panel sync
                            navigateTo(id);
                        }
                    });

                    // Right click pan implementation
                    const container = document.getElementById('cy');
                    
                    container.addEventListener('mousedown', (e) => {
                        if(e.button === 2) {
                            isRightDown = true;
                            hasPanned = false;
                            lastMouse = {x: e.clientX, y: e.clientY};
                            container.style.cursor = 'grabbing';
                        }
                    });

                    // Disable context menu
                    container.addEventListener('contextmenu', (e) => {
                        e.preventDefault(); 
                    });

                    // Tooltip
                    const tooltip = document.getElementById('graph-tooltip');
                    cy.on('mouseover', 'node', function(e) {
                        const node = e.target;
                        const id = node.id();
                        const evt = events.value.find(ev => String(ev.id) === id);
                        if (!evt) return;

                        let content = `<strong>[${evt.type}] ${evt.id}</strong><br>`;
                        content += `<div class="text-muted mb-1 small">Line: ${evt.source_line || '?'}</div>`;
                        const text = evt.text_zh || evt.text_en || '(No Text)';
                        content += `<div style="max-height: 100px; overflow: hidden; margin-bottom: 5px;">${text}</div>`;
                        
                        if (evt.options && evt.options.length) content += `<div class="badge bg-secondary">Opts: ${evt.options.length}</div> `;
                        if (evt.logic && evt.logic.type) content += `<div class="badge bg-info text-dark">Logic: ${evt.logic.type}</div>`;

                        tooltip.innerHTML = content;
                        tooltip.style.display = 'block';
                    });

                    cy.on('mousemove', function(e) {
                         const x = e.originalEvent.clientX + 15;
                         const y = e.originalEvent.clientY + 15;
                         tooltip.style.left = x + 'px';
                         tooltip.style.top = y + 'px';
                    });

                    cy.on('mouseout', 'node', function(e) {
                        tooltip.style.display = 'none';
                    });
                    
                    cy.on('viewport', function() {
                        tooltip.style.display = 'none';
                    });
                }
                renderGraph();
            }, 100);
        };

        const updateGraphCenter = () => {
            navigateTo(graphCenterId.value);
        };

        const renderGraph = () => {
            if (!cy) return;
            const center = String(graphCenterId.value);
            const depth = graphDepth.value;
            
            const elements = [];
            const visited = new Set();
            const queue = [{ id: center, d: 0 }]; // d=0 is center. d>0 is children.
            
            // For parents, we do a separate simple traversal 1 level up regardless of depth, or same depth?
            // Let's do parents up to depth too? No, usually downstream is more important.
            // Let's show 1 level of parents to see where we came from.
            
            const evtMap = new Map(events.value.map(e => [String(e.id), e]));
            
            // Add Center
            const centerEvt = evtMap.get(center);
            const getLabel = (e, id) => {
                if (!e) return id;
                let label = `[${e.type}] ${id}\n\n`;
                const text = e.text_zh || e.text_en || "";
                label += text.substring(0, 100) + (text.length > 100 ? "..." : "");
                return label;
            };
            
            if (centerEvt || center) {
                elements.push({
                    group: 'nodes',
                    data: { 
                        id: center, 
                        label: getLabel(centerEvt, center),
                        type: centerEvt ? centerEvt.type : -1
                    },
                    classes: 'center-node'
                });
                visited.add(center);
            }
            
            // 1. Traverse Downstream (Children)
            let currQ = [center];
            
            // Helper for ID validation & Normalization
            const validId = (id) => {
                if (id === undefined || id === null) return null;
                const s = String(id).trim();
                if (s === 'undefined' || s === 'null' || s === "") return null;
                return s;
            };

            for (let i = 0; i < depth; i++) {
                const nextQ = [];
                for (const pid of currQ) {
                    const evt = evtMap.get(pid);
                    if (!evt) continue;
                    
                    const children = [];
                    // Logic
                    if (evt.logic) {
                         const l = evt.logic;
                         let nextId;

                         if (l.type === 'single_link' || l.type === 'click_continue') {
                            if (nextId = validId(l.next)) children.push({ id: nextId, label: 'Continue' });
                         } else if (l.type === 'free_choice') {
                            if (l.choices) {
                                l.choices.forEach(choice => {
                                    if (nextId = validId(choice.next_event)) children.push({ id: nextId, label: choice.text });
                                });
                            }
                         } else if (l.type === 'conditional_choice') {
                            if (l.choices) {
                                l.choices.forEach(choice => {
                                    if (nextId = validId(choice.next_event)) children.push({ id: nextId, label: choice.text });
                                });
                            }
                         } else if (l.type === 'check' || l.type === 'item_check' || l.type === 'keyword_check' || l.type === 'prof_check' || l.type === 'money_check' || l.type === 'level_check' || l.type === 'blessing_check' || l.type === 'random_money_check') {
                            if (nextId = validId(l.pass)) children.push({ id: nextId, label: 'Pass' });
                            if (nextId = validId(l.fail)) children.push({ id: nextId, label: 'Fail' });
                         } else if (l.type === 'random') {
                            if (l.targets) l.targets.forEach(t => { if(nextId = validId(t)) children.push({ id: nextId, label: 'Random' }); });
                         } else if (l.type === 'multi_check') {
                            if (l.dests) l.dests.forEach((d, idx) => { 
                                if(nextId = validId(d)) {
                                    const label = idx === 0 ? 'Fail All' : `Pass ${idx}`;
                                    children.push({ id: nextId, label: label });
                                }
                            });
                         } else if (l.type === 'effect' || l.type === 'lose_companions' || l.type === 'stat_swap' || l.type === 'random_prof_change' || l.type === 'set_prof_clown') {
                            if (nextId = validId(l.next)) children.push({ id: nextId, label: 'Next' });
                         } else if (l.type === 'winning_end') {
                            // Winning End, no outgoing links usually shown in graph
                         } else {
                            // Generic fallback for unhandled logic types if next exists
                            if (nextId = validId(l.next)) children.push({ id: nextId, label: 'Next' });
                         }
                    }
                    
                    for (const child of children) {
                        const cid = child.id; // Already normalized
                        if (!cid) continue;
                        
                        // Add Node
                        if (!visited.has(cid)) {
                            const ce = evtMap.get(cid);
                            elements.push({
                                group: 'nodes',
                                data: { 
                                    id: cid, 
                                    label: getLabel(ce, cid),
                                    type: ce ? ce.type : -1
                                }
                            });
                            visited.add(cid);
                            nextQ.push(cid);
                        }
                        
                        // Add Edge
                        // Check if edge already exists to avoid duplicates? 
                        // Cytoscape handles multiple edges if curve-style is bezier, but we don't want identical duplicates.
                        // But here pid->cid with label is unique per child loop iteration.
                        elements.push({
                            group: 'edges',
                            data: { source: pid, target: cid, label: child.label }
                        });
                    }
                }
                currQ = nextQ;
            }
            
            // 2. Add Immediate Parents (Upstream)
            const parents = parentMap.value[center] || [];
            parents.forEach(p => {
                const pid = String(p.id);
                 if (!visited.has(pid)) {
                    // Parent label logic
                    let pLabel = `[${p.type}] ${pid}\n\n`;
                    pLabel += p.text.substring(0, 100) + (p.text.length > 100 ? "..." : "");
                    
                    elements.push({
                        group: 'nodes',
                        data: { 
                            id: pid, 
                            label: pLabel,
                            type: p.type
                        },
                        classes: 'parent-node'
                    });
                    visited.add(pid);
                 }
                 // Edge from Parent to Center
                 elements.push({
                    group: 'edges',
                    data: { source: pid, target: center, label: '->' }
                 });
            });

            cy.elements().remove();
            cy.add(elements);
            
            // Restore selection from Vue state
            if (selectedEvents.value.length > 0) {
                 const ids = new Set(selectedEvents.value.map(e => String(e.id)));
                 cy.nodes().filter(n => ids.has(n.id())).select();
            }

            cy.layout({ 
                name: 'breadthfirst', 
                directed: true, 
                padding: 20,
                spacingFactor: graphLineLength.value,
                nodeDimensionsIncludeLabels: true,
                roots: parents.length > 0 ? undefined : [center] 
            }).run();
        };

        const handleGraphMouseMove = (e) => {
             if (isRightDown && cy) {
                 hasPanned = true;
                 const dx = e.clientX - lastMouse.x;
                 const dy = e.clientY - lastMouse.y;
                 cy.panBy({ x: dx, y: dy });
                 lastMouse = {x: e.clientX, y: e.clientY};
             }
        };
        const handleGraphMouseUp = (e) => {
             if (e.button === 2) {
                 isRightDown = false;
                 if(cy) {
                     const container = document.getElementById('cy');
                     if(container) container.style.cursor = 'default';
                 }
             }
        };

        onMounted(() => {
            loadData();
            window.addEventListener('keydown', handleKeydown);
            window.addEventListener('mousemove', handleGraphMouseMove);
            window.addEventListener('mouseup', handleGraphMouseUp);
        });

        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('mousemove', handleGraphMouseMove);
            window.removeEventListener('mouseup', handleGraphMouseUp);
        });

        return {
            activeTab,
            classes, events, attributes, localization, items, keywords, blessings,
            editingClass, editingEvent, editingItem, editingKeyword,
            locSearch, eventSearch, eventTypeFilter, keywordSearch, 
            eventTypes: EVENT_TYPES, logicTypes: LOGIC_TYPES,
            navHistory, navIndex,
            filteredLoc, filteredEvents, filteredKeywords,             referencedBy,
            graphCenterId, graphDepth, selectedEvents,
            graphFontSize, graphLineLength, updateGraphCenter,
            checkStatus, brokenLinks, unreachableNodes, runDataCheck, findEvent,
            // methods
            editClass, addClass, deleteClass,
            editItem, addItem, deleteItem,
            editKeyword, addKeyword, deleteKeyword,
            editEvent, addEvent, deleteEvent, addOption, ensureLogic, ensureLogicLists,
            navigateTo, goBack, goForward, adjustFont, adjustLine,
            addLocKey, deleteLoc, exportCSV, importCSV,
            downloadAll, formatSourceCode, initGraph, renderGraph
        };
    }
})
.component('event-logic-editor', EventLogicEditor)
.mount('#app');

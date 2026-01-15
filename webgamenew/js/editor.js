const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const activeTab = ref('classes');
        
        // Data
        const classes = ref([]);
        const events = ref([]);
        const attributes = ref([]);
        const localization = ref({});
        
        // Editing State
        const editingClass = ref(null);
        const editingEvent = ref(null);
        
        // Search State
        const locSearch = ref('');
        const eventSearch = ref('');

        // Loading
        const loadData = () => {
            // Load from window globals (data/*.js files)
            if (window.GAME_DATA_CLASSES) classes.value = window.GAME_DATA_CLASSES;
            if (window.GAME_DATA_ATTRIBUTES) attributes.value = window.GAME_DATA_ATTRIBUTES;
            if (window.GAME_DATA_LOCALIZATION) localization.value = window.GAME_DATA_LOCALIZATION;
            if (window.GAME_DATA_EVENTS) events.value = window.GAME_DATA_EVENTS;
            else events.value = [];
        };

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

        // --- Events Logic ---
        const filteredEvents = computed(() => {
            let res = events.value;
            if (eventSearch.value) {
                const s = eventSearch.value.toLowerCase();
                res = res.filter(e => 
                    e.id.toString().toLowerCase().includes(s) || 
                    (e.text_zh && e.text_zh.toLowerCase().includes(s)) ||
                    (e.text_en && e.text_en.toLowerCase().includes(s))
                );
            }
            // Limit results for performance, unless searching yields few enough results
            // But even with search, we should limit to avoid rendering thousands of items
            return res.slice(0, 100);
        });

        const editEvent = (evt) => {
            editingEvent.value = evt;
        };
        const addEvent = () => {
            const newEvt = {
                id: "new_event_" + Date.now(),
                text_zh: "新事件",
                text_en: "New Event",
                options: []
            };
            events.value.push(newEvt);
            editingEvent.value = newEvt;
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
            
            // Limit
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
                    // Expect: Key, English, Chinese
                    // Skip header if present (simple check)
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
            // Attributes usually don't change, but if needed:
            // downloadJS(attributes.value, 'GAME_DATA_ATTRIBUTES', 'attributes.js');
            
            alert("Downloaded .js files. Replace them in webgamenew/data/ folder to apply changes.");
        };

        onMounted(() => {
            loadData();
        });

        return {
            activeTab,
            classes, events, attributes, localization,
            editingClass, editingEvent, 
            locSearch, eventSearch, 
            filteredLoc, filteredEvents,
            // methods
            editClass, addClass, deleteClass,
            editEvent, addEvent, deleteEvent, addOption,
            addLocKey, deleteLoc, exportCSV, importCSV,
            downloadAll
        };
    }
}).mount('#app');


import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { generateFabulaMonster } from '../services/geminiService.js';

const SkullIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-[var(--highlight-secondary)]", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 8.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 12a4 4 0 00-4 4 .5.5 0 00.5.5h7a.5.5 0 00.5-.5 4 4 0 00-4-4z", clipRule: "evenodd" })
);
const PlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" })
);
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);
const PencilIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" }),
    React.createElement('path', { fillRule: "evenodd", d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z", clipRule: "evenodd" })
);
const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1.5", viewBox: "0 0 20 20", fill: "currentColor" }, 
    React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" })
);

const ATTR_LABELS = {
    dex: 'DES',
    ins: 'INT',
    mig: 'VIG',
    wlp: 'VOL',
    DEX: 'DES',
    INS: 'INT',
    MIG: 'VIG',
    WLP: 'VOL'
};

const FabulaStatBlock = ({ monster }) => {
    const { t } = useTranslation();
    
    const AffinityIcon = ({ type, affinity }) => {
        if (!affinity) return null;
        const colors = {
             physical: 'text-gray-400', air: 'text-green-400', bolt: 'text-yellow-400', dark: 'text-purple-900',
             earth: 'text-amber-700', fire: 'text-red-500', ice: 'text-cyan-300', light: 'text-yellow-200', poison: 'text-purple-500'
        };
        const labels = { vu: 'VU', res: 'RS', imm: 'IM', abs: 'AB' };
        
        return React.createElement('div', { className: "flex flex-col items-center mx-1" },
            React.createElement('span', { className: `text-xs font-bold uppercase ${colors[type]}` }, t(type)),
            React.createElement('span', { className: "text-xs font-bold bg-white text-black px-1 rounded" }, labels[affinity] || affinity)
        );
    };

    const getAttrLabel = (val) => ATTR_LABELS[val] || val;

    return React.createElement('div', { className: "border-2 border-[var(--border-primary)] rounded-lg overflow-hidden bg-[var(--bg-secondary)] text-sm font-sans" },
        React.createElement('div', { className: "bg-[var(--accent-tertiary)] text-white p-2 flex justify-between items-center" },
            React.createElement('div', null,
                React.createElement('h3', { className: "font-bold text-lg uppercase" }, monster.name),
                React.createElement('p', { className: "text-xs opacity-90" }, monster.traits)
            ),
            React.createElement('div', { className: "text-right" },
                React.createElement('span', { className: "font-bold" }, `Liv ${monster.level}`),
                React.createElement('span', { className: "mx-1" }, "⬥"),
                React.createElement('span', { className: "uppercase" }, t(monster.species))
            )
        ),
        React.createElement('div', { className: "p-2 bg-[var(--bg-tertiary)] grid grid-cols-4 gap-2 text-center font-bold border-b border-[var(--border-primary)]" },
            ['dex', 'ins', 'mig', 'wlp'].map(attr => 
                React.createElement('div', { key: attr }, 
                    React.createElement('span', { className: "text-[var(--accent-primary)] block text-xs" }, ATTR_LABELS[attr]),
                    React.createElement('span', null, monster.attributes[attr])
                )
            )
        ),
        React.createElement('div', { className: "p-2 flex flex-wrap justify-between items-center gap-2 border-b border-[var(--border-primary)]" },
            React.createElement('div', { className: "flex gap-4" },
                React.createElement('span', null, React.createElement('b', null, "PV "), React.createElement('span', {className: "bg-red-700 text-white px-1 rounded"}, monster.stats.hp)),
                React.createElement('span', null, React.createElement('b', null, "PM "), React.createElement('span', {className: "bg-blue-600 text-white px-1 rounded"}, monster.stats.mp)),
                 React.createElement('span', null, React.createElement('b', null, t('init')), ` ${monster.stats.init}`)
            ),
            React.createElement('div', { className: "flex gap-4" },
                React.createElement('span', null, React.createElement('b', null, "DIF "), monster.stats.def),
                React.createElement('span', null, React.createElement('b', null, "D.MAG "), monster.stats.mdef)
            )
        ),
        monster.affinities && Object.keys(monster.affinities).length > 0 && React.createElement('div', { className: "p-1 flex flex-wrap justify-center bg-[var(--bg-tertiary)]/50 border-b border-[var(--border-primary)]" },
            Object.entries(monster.affinities).map(([type, aff]) => 
                React.createElement(AffinityIcon, { key: type, type, affinity: aff })
            )
        ),
        (monster.basicAttacks || []).length > 0 && React.createElement('div', { className: "p-2 border-b border-[var(--border-primary)]" },
            React.createElement('h4', { className: "font-bold text-[var(--accent-primary)] text-xs mb-1 uppercase" }, t('basicAttacks')),
            monster.basicAttacks.map((att, i) => React.createElement('div', { key: i, className: "mb-1 pl-2 border-l-2 border-[var(--accent-secondary)]" },
                 React.createElement('span', { className: "font-bold" }, att.range === 'melee' ? '⚔️ ' : '🏹 ', att.name),
                 React.createElement('span', { className: "text-xs mx-1" }, "⬥"),
                 React.createElement('span', { className: "font-mono" }, `【${getAttrLabel(att.attr1)} + ${getAttrLabel(att.attr2)}】`),
                 React.createElement('span', { className: "text-xs mx-1" }, "⬥"),
                 React.createElement('span', { className: "font-mono" }, `【${t('highRoll')} + ${att.damageMod}】`),
                 React.createElement('span', null, ` ${att.damageType}`),
                 att.special && React.createElement('p', { className: "text-xs italic text-[var(--text-muted)] mt-0.5" }, att.special)
            ))
        ),
         (monster.spells || []).length > 0 && React.createElement('div', { className: "p-2 border-b border-[var(--border-primary)]" },
            React.createElement('h4', { className: "font-bold text-[var(--accent-primary)] text-xs mb-1 uppercase" }, t('spells')),
            monster.spells.map((spell, i) => React.createElement('div', { key: i, className: "mb-1" },
                React.createElement('div', {className: 'flex flex-wrap gap-x-2 items-baseline'},
                    React.createElement('span', { className: "font-bold" }, spell.isOffensive ? '⚡' : '✨', spell.name),
                     React.createElement('span', { className: "text-xs bg-[var(--bg-tertiary)] px-1 rounded" }, `${spell.mpCost} MP`),
                     React.createElement('span', { className: "text-xs italic" }, spell.target),
                     React.createElement('span', { className: "text-xs italic" }, spell.duration),
                ),
                React.createElement('p', { className: "text-xs text-[var(--text-muted)] pl-4" }, spell.effect)
            ))
        ),
         (monster.specialRules || []).length > 0 && React.createElement('div', { className: "p-2" },
            React.createElement('h4', { className: "font-bold text-[var(--accent-primary)] text-xs mb-1 uppercase" }, t('specialRules')),
            monster.specialRules.map((rule, i) => React.createElement('div', { key: i, className: "mb-1 text-xs" },
                React.createElement('span', { className: "font-bold" }, rule.name),
                React.createElement('span', { className: "mx-1" }, "⬥"),
                React.createElement('span', null, rule.effect)
            ))
        ),
        monster.inventory && monster.inventory.length > 0 && React.createElement('div', { className: "p-2 border-t border-[var(--border-primary)] bg-[var(--bg-tertiary)]/30 text-xs" },
             React.createElement('span', { className: "font-bold" }, `${t('inventory')}: `),
             monster.inventory.map(i => `${i.name} (x${i.quantity})`).join(', ')
        )
    );
};

const MonsterManager = ({ monsters, onAddMonster, onUpdateMonster, onRemoveMonster }) => {
    const { t, language } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingMonster, setEditingMonster] = useState(null);
    const [monsterType, setMonsterType] = useState('generic'); // 'generic' or 'fabula'
    const [isGenerating, setIsGenerating] = useState(false);

    // Generic State
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [inventory, setInventory] = useState([]);

    // Fabula State
    const [fabulaData, setFabulaData] = useState({
        level: 5, rank: 'soldier', species: 'beast', traits: '',
        attributes: { dex: 'd8', ins: 'd8', mig: 'd8', wlp: 'd8' },
        stats: { hp: 40, mp: 40, init: 7, def: 8, mdef: 8 },
        affinities: {},
        basicAttacks: [],
        spells: [],
        specialRules: [],
        description: ''
    });

    const resetForm = () => {
        setName('');
        setAttributes([]);
        setInventory([]);
        setMonsterType('generic');
        setFabulaData({
            level: 5, rank: 'soldier', species: 'beast', traits: '',
            attributes: { dex: 'd8', ins: 'd8', mig: 'd8', wlp: 'd8' },
            stats: { hp: 40, mp: 40, init: 7, def: 8, mdef: 8 },
            affinities: {},
            basicAttacks: [],
            spells: [],
            specialRules: [],
            description: ''
        });
    };

    useEffect(() => {
        if (editingMonster) {
            setName(editingMonster.name);
            setInventory((editingMonster.inventory || []).map(i => ({ ...i, id: crypto.randomUUID() })));
            
            if (editingMonster.type === 'fabula') {
                setMonsterType('fabula');
                setFabulaData({
                   ...editingMonster, // Load all fabula specific data
                   attributes: editingMonster.attributes || { dex: 'd8', ins: 'd8', mig: 'd8', wlp: 'd8' },
                   stats: editingMonster.stats || { hp: 40, mp: 40, init: 7, def: 8, mdef: 8 },
                   affinities: editingMonster.affinities || {},
                   basicAttacks: editingMonster.basicAttacks || [],
                   spells: editingMonster.spells || [],
                   specialRules: editingMonster.specialRules || []
                });
            } else {
                setMonsterType('generic');
                setAttributes((editingMonster.attributes || []).map(s => ({ ...s, id: crypto.randomUUID() })));
            }
            setIsFormVisible(true);
        } else {
            resetForm();
        }
    }, [editingMonster]);

    const handleOpenFormForAdd = () => {
        setEditingMonster(null);
        resetForm();
        setIsFormVisible(true);
    };
    
    const handleCancel = () => {
        setEditingMonster(null);
        setIsFormVisible(false);
    };

    const handleAddAttribute = () => {
        setAttributes(prev => [...prev, { id: crypto.randomUUID(), key: '', value: '' }]);
    };
    const handleRemoveAttribute = (id) => {
        setAttributes(prev => prev.filter(attr => attr.id !== id));
    };
    const handleAttributeChange = (id, field, value) => {
        setAttributes(current =>
            current.map(attr => attr.id === id ? { ...attr, [field]: value } : attr)
        );
    };
    
    const handleAddItem = () => {
        setInventory(prev => [...prev, { id: crypto.randomUUID(), name: '', quantity: '1' }]);
    };
    const handleRemoveItem = (id) => {
        setInventory(prev => prev.filter(item => item.id !== id));
    };
    const handleItemChange = (id, field, value) => {
        setInventory(current =>
            current.map(item => item.id === id ? { ...item, [field]: value } : item)
        );
    };
    
    const handleGenerateAI = async () => {
        if (!name.trim()) return;
        setIsGenerating(true);
        try {
             const generatedData = await generateFabulaMonster(name + (fabulaData.description ? ` (${fabulaData.description})` : ''), language);
             if (generatedData) {
                 setName(generatedData.name);
                 setFabulaData(prev => ({ ...prev, ...generatedData }));
             }
        } catch (e) {
            console.error("Failed to generate monster", e);
        } finally {
            setIsGenerating(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            const finalInventory = inventory
                .filter(i => i.name.trim() !== '')
                .map(({ id, ...rest }) => rest);

            let monsterData = { name, inventory: finalInventory };

            if (monsterType === 'generic') {
                 const finalAttributes = attributes
                    .filter(s => s.key.trim() !== '')
                    .map(({ id, ...rest }) => rest);
                 monsterData.attributes = finalAttributes;
                 monsterData.type = 'generic';
            } else {
                 monsterData = { ...monsterData, ...fabulaData, type: 'fabula' };
            }

            if (editingMonster) {
                onUpdateMonster({ ...editingMonster, ...monsterData });
            } else {
                onAddMonster(monsterData);
            }
            setIsFormVisible(false);
            setEditingMonster(null);
        }
    };

    const FabulaForm = () => {
        const handleAddSpell = () => {
            setFabulaData(p => ({ ...p, spells: [...(p.spells || []), { name: '', mpCost: '', target: '', duration: '', isOffensive: false, effect: '' }] }));
        };
        const handleRemoveSpell = (index) => {
            setFabulaData(p => ({ ...p, spells: p.spells.filter((_, i) => i !== index) }));
        };
        const handleSpellChange = (index, field, value) => {
            setFabulaData(p => {
                const newSpells = [...(p.spells || [])];
                newSpells[index] = { ...newSpells[index], [field]: value };
                return { ...p, spells: newSpells };
            });
        };

        const handleAddRule = () => {
            setFabulaData(p => ({ ...p, specialRules: [...(p.specialRules || []), { name: '', effect: '' }] }));
        };
        const handleRemoveRule = (index) => {
            setFabulaData(p => ({ ...p, specialRules: p.specialRules.filter((_, i) => i !== index) }));
        };
        const handleRuleChange = (index, field, value) => {
            setFabulaData(p => {
                const newRules = [...(p.specialRules || [])];
                newRules[index] = { ...newRules[index], [field]: value };
                return { ...p, specialRules: newRules };
            });
        };

        return React.createElement('div', { className: 'space-y-4 border-t border-[var(--border-primary)] pt-4' },
            React.createElement('div', { className: 'flex justify-end' },
                React.createElement('button', {
                    type: 'button',
                    onClick: handleGenerateAI,
                    disabled: !name.trim() || isGenerating,
                    className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors disabled:opacity-50"
                }, isGenerating ? t('generating') : React.createElement(React.Fragment, null, React.createElement(SparklesIcon), t('generateMonster')))
            ),
            React.createElement('div', {className: 'grid grid-cols-2 gap-4'},
                React.createElement('div', null,
                     React.createElement('label', {className: 'block text-sm font-medium mb-1'}, t('level')),
                     React.createElement('input', { type: 'number', value: fabulaData.level, onChange: e => setFabulaData(p => ({...p, level: parseInt(e.target.value)||5})), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]" })
                ),
                React.createElement('div', null,
                     React.createElement('label', {className: 'block text-sm font-medium mb-1'}, t('monsterRank')),
                     React.createElement('select', { value: fabulaData.rank, onChange: e => setFabulaData(p => ({...p, rank: e.target.value})), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]" },
                        ['soldier', 'elite', 'champion'].map(r => React.createElement('option', {key: r, value: r}, t(r)))
                     )
                ),
                React.createElement('div', null,
                     React.createElement('label', {className: 'block text-sm font-medium mb-1'}, t('monsterSpecies')),
                     React.createElement('select', { value: fabulaData.species, onChange: e => setFabulaData(p => ({...p, species: e.target.value})), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]" },
                        ['beast', 'construct', 'demon', 'elemental', 'monster', 'plant', 'undead', 'humanoid'].map(s => React.createElement('option', {key: s, value: s}, t(s)))
                     )
                ),
                React.createElement('div', null,
                     React.createElement('label', {className: 'block text-sm font-medium mb-1'}, t('traits')),
                     React.createElement('input', { type: 'text', value: fabulaData.traits, onChange: e => setFabulaData(p => ({...p, traits: e.target.value})), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]" })
                )
            ),
             React.createElement('div', {className: 'grid grid-cols-4 gap-2'},
                ['dex', 'ins', 'mig', 'wlp'].map(attr => React.createElement('div', {key: attr},
                    React.createElement('label', {className: 'block text-xs font-bold text-center mb-1'}, ATTR_LABELS[attr]),
                    React.createElement('select', { value: fabulaData.attributes[attr], onChange: e => setFabulaData(p => ({...p, attributes: {...p.attributes, [attr]: e.target.value}})), className: "w-full p-1 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] text-center" },
                         ['d6', 'd8', 'd10', 'd12'].map(d => React.createElement('option', {key: d, value: d}, d))
                    )
                ))
            ),
            React.createElement('div', {className: 'grid grid-cols-5 gap-2'},
                Object.entries({ hp: 'HP', mp: 'MP', init: t('init'), def: 'DEF', mdef: 'M.DEF' }).map(([key, label]) => React.createElement('div', {key},
                    React.createElement('label', {className: 'block text-xs font-bold text-center mb-1'}, label),
                    React.createElement('input', { type: 'number', value: fabulaData.stats[key], onChange: e => setFabulaData(p => ({...p, stats: {...p.stats, [key]: parseInt(e.target.value)||0}})), className: "w-full p-1 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] text-center" })
                ))
            ),
            React.createElement('div', null,
                React.createElement('h4', {className: 'text-sm font-bold mb-2'}, t('affinities')),
                React.createElement('div', {className: 'grid grid-cols-3 sm:grid-cols-5 gap-2'},
                    ['physical', 'air', 'bolt', 'dark', 'earth', 'fire', 'ice', 'light', 'poison'].map(type => 
                        React.createElement('div', {key: type, className: 'flex flex-col items-center p-1 border border-[var(--border-secondary)] rounded'},
                            React.createElement('span', {className: 'text-xs mb-1'}, t(type)),
                            React.createElement('select', { 
                                value: fabulaData.affinities[type] || '', 
                                onChange: e => {
                                    const val = e.target.value;
                                    setFabulaData(p => {
                                        const newAff = {...p.affinities};
                                        if (val) newAff[type] = val; else delete newAff[type];
                                        return {...p, affinities: newAff};
                                    })
                                },
                                className: "w-full p-0.5 text-xs bg-[var(--bg-primary)] rounded" 
                            },
                                React.createElement('option', {value: ''}, '-'),
                                ['vu', 'res', 'imm', 'abs'].map(a => React.createElement('option', {key: a, value: a}, t(a)))
                            )
                        )
                    )
                )
            ),
            React.createElement('div', null,
                React.createElement('h4', {className: 'text-sm font-bold mb-2'}, t('basicAttacks')),
                // Simple list for now, ideally an adder
                 React.createElement('textarea', { 
                    value: JSON.stringify(fabulaData.basicAttacks, null, 2),
                    onChange: e => {
                        try {
                            const parsed = JSON.parse(e.target.value);
                            setFabulaData(p => ({...p, basicAttacks: parsed}));
                        } catch(err) { /* ignore invalid json while typing */ }
                    },
                    className: "w-full p-2 text-xs font-mono bg-[var(--bg-secondary)] rounded h-24",
                    placeholder: 'JSON format: [{"name": "Bite", "attr1": "DEX", "attr2": "MIG", "damageMod": 5, "damageType": "physical", "range": "melee"}]'
                }),
                React.createElement('p', {className: 'text-xs text-[var(--text-muted)]'}, "Edit via AI or JSON for now.")
            ),
            // Spells Section
            React.createElement('div', { className: 'border-t border-[var(--border-primary)] pt-4' },
                React.createElement('div', { className: 'flex justify-between items-center mb-2' },
                     React.createElement('h4', { className: 'text-sm font-bold' }, t('spells')),
                     React.createElement('button', { type: 'button', onClick: handleAddSpell, className: 'flex items-center px-2 py-1 text-xs rounded bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white' }, React.createElement(PlusIcon), t('addSpell'))
                ),
                (fabulaData.spells || []).map((spell, i) => React.createElement('div', { key: i, className: 'p-2 mb-2 bg-[var(--bg-secondary)] rounded border border-[var(--border-secondary)]' },
                    React.createElement('div', { className: 'grid grid-cols-2 gap-2 mb-2' },
                        React.createElement('input', { type: 'text', placeholder: t('spellName'), value: spell.name, onChange: e => handleSpellChange(i, 'name', e.target.value), className: "w-full p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)]" }),
                        React.createElement('input', { type: 'text', placeholder: t('mpCost'), value: spell.mpCost, onChange: e => handleSpellChange(i, 'mpCost', e.target.value), className: "w-full p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)]" })
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-2 mb-2' },
                         React.createElement('input', { type: 'text', placeholder: t('target'), value: spell.target, onChange: e => handleSpellChange(i, 'target', e.target.value), className: "w-full p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)]" }),
                         React.createElement('input', { type: 'text', placeholder: t('duration'), value: spell.duration, onChange: e => handleSpellChange(i, 'duration', e.target.value), className: "w-full p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)]" })
                    ),
                    React.createElement('textarea', { placeholder: t('effect'), value: spell.effect, onChange: e => handleSpellChange(i, 'effect', e.target.value), className: "w-full p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)] h-12 resize-none mb-1" }),
                    React.createElement('div', { className: 'flex justify-between items-center' },
                        React.createElement('label', { className: 'flex items-center gap-1 text-xs' },
                             React.createElement('input', { type: 'checkbox', checked: spell.isOffensive, onChange: e => handleSpellChange(i, 'isOffensive', e.target.checked), className: "rounded border-[var(--border-primary)]" }),
                             t('isOffensive')
                        ),
                        React.createElement('button', { type: 'button', onClick: () => handleRemoveSpell(i), className: 'text-[var(--danger)] hover:text-[var(--danger)]/80' }, React.createElement(TrashIcon))
                    )
                ))
            ),
             // Special Rules Section
             React.createElement('div', { className: 'border-t border-[var(--border-primary)] pt-4' },
                React.createElement('div', { className: 'flex justify-between items-center mb-2' },
                     React.createElement('h4', { className: 'text-sm font-bold' }, t('specialRules')),
                     React.createElement('button', { type: 'button', onClick: handleAddRule, className: 'flex items-center px-2 py-1 text-xs rounded bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white' }, React.createElement(PlusIcon), t('addRule'))
                ),
                (fabulaData.specialRules || []).map((rule, i) => React.createElement('div', { key: i, className: 'p-2 mb-2 bg-[var(--bg-secondary)] rounded border border-[var(--border-secondary)]' },
                     React.createElement('div', { className: 'flex gap-2 mb-1' },
                         React.createElement('input', { type: 'text', placeholder: t('ruleName'), value: rule.name, onChange: e => handleRuleChange(i, 'name', e.target.value), className: "flex-grow p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)]" }),
                         React.createElement('button', { type: 'button', onClick: () => handleRemoveRule(i), className: 'text-[var(--danger)] hover:text-[var(--danger)]/80' }, React.createElement(TrashIcon))
                     ),
                     React.createElement('textarea', { placeholder: t('effect'), value: rule.effect, onChange: e => handleRuleChange(i, 'effect', e.target.value), className: "w-full p-1 text-xs bg-[var(--bg-primary)] rounded border border-[var(--border-primary)] h-12 resize-none" })
                ))
            )
        );
    };

    const form = React.createElement('form', { onSubmit: handleSubmit, className: "p-4 mb-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)] animate-fade-in flex flex-col gap-4" },
        React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)]" }, editingMonster ? t('editMonsterTitle') : t('addMonsterTitle')),
        
        React.createElement('div', {className: 'flex gap-4'},
            React.createElement('div', {className: 'flex-grow'},
                 React.createElement('input', { type: "text", placeholder: t('monsterNamePlaceholder'), value: name, onChange: e => setName(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]", required: true }),
            ),
            React.createElement('select', { value: monsterType, onChange: e => setMonsterType(e.target.value), className: "p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]" },
                React.createElement('option', { value: 'generic' }, t('generic')),
                React.createElement('option', { value: 'fabula' }, t('fabulaUltimaCharacter'))
            )
        ),
        
        monsterType === 'fabula' ? React.createElement(FabulaForm) : 
        // Attributes Section (Generic)
        React.createElement('div', { className: "border-t border-[var(--border-primary)] pt-4" },
            React.createElement('div', { className: "flex justify-between items-center mb-2" },
                React.createElement('h4', { className: "text-lg font-semibold text-[var(--text-secondary)]" }, t('attributes')),
                React.createElement('button', { type: "button", onClick: handleAddAttribute, className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors" },
                    React.createElement(PlusIcon, null), t('addAttribute')
                )
            ),
            React.createElement('div', { className: "space-y-2 max-h-48 overflow-y-auto pr-2" },
                attributes.map(attr => React.createElement('div', { key: attr.id, className: "grid grid-cols-[1fr_1fr_auto] items-center gap-2" },
                    React.createElement('input', { type: "text", placeholder: t('attributeNamePlaceholder'), value: attr.key, onChange: e => handleAttributeChange(attr.id, 'key', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('input', { type: "text", placeholder: t('attributeValuePlaceholder'), value: attr.value, onChange: e => handleAttributeChange(attr.id, 'value', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('button', { type: "button", onClick: () => handleRemoveAttribute(attr.id), 'aria-label': "Remove Attribute", className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors" }, React.createElement(TrashIcon, null))
                ))
            )
        ),

        // Inventory Section
        React.createElement('div', { className: "border-t border-[var(--border-primary)] pt-4" },
            React.createElement('div', { className: "flex justify-between items-center mb-2" },
                React.createElement('h4', { className: "text-lg font-semibold text-[var(--text-secondary)]" }, t('inventory')),
                React.createElement('button', { type: "button", onClick: handleAddItem, className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors" },
                    React.createElement(PlusIcon, null), t('addItem')
                )
            ),
            React.createElement('div', { className: "space-y-2 max-h-48 overflow-y-auto pr-2" },
                inventory.map(item => React.createElement('div', { key: item.id, className: "grid grid-cols-[1fr_80px_auto] items-center gap-2" },
                    React.createElement('input', { type: "text", placeholder: t('itemNamePlaceholder'), value: item.name, onChange: e => handleItemChange(item.id, 'name', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('input', { type: "text", placeholder: t('quantityPlaceholder'), value: item.quantity, onChange: e => handleItemChange(item.id, 'quantity', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('button', { type: "button", onClick: () => handleRemoveItem(item.id), 'aria-label': "Remove Item", className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors" }, React.createElement(TrashIcon, null))
                ))
            )
        ),
        
        React.createElement('div', { className: "flex justify-end gap-4 mt-4" },
            React.createElement('button', { type: "button", onClick: handleCancel, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors" }, t('cancel')),
            React.createElement('button', { type: "submit", className: "px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)]" }, editingMonster ? t('updateMonster') : t('saveMonster'))
        )
    );

    const MonsterCard = ({ monster }) => {
        if (monster.type === 'fabula') {
            return React.createElement('div', { className: "mb-4" },
                React.createElement('div', { className: "flex justify-end gap-2 mb-1" },
                    React.createElement('button', { onClick: () => setEditingMonster(monster), className: "p-1 text-blue-400 hover:text-blue-300" }, React.createElement(PencilIcon, null)),
                    React.createElement('button', { onClick: () => onRemoveMonster(monster.id), className: "p-1 text-[var(--danger)]/80 hover:text-[var(--danger)]" }, React.createElement(TrashIcon, null))
                ),
                React.createElement(FabulaStatBlock, { monster })
            );
        }

        return React.createElement('div', { className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)]" },
            React.createElement('div', { className: "flex justify-between items-start" },
                React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, monster.name),
                React.createElement('div', { className: "flex-shrink-0 flex gap-2" },
                    React.createElement('button', { onClick: () => setEditingMonster(monster), className: "p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 rounded-full transition-colors duration-200", 'aria-label': `${t('edit')} ${monster.name}` }, React.createElement(PencilIcon, null)),
                    React.createElement('button', { onClick: () => onRemoveMonster(monster.id), className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors duration-200", 'aria-label': `${t('remove')} ${monster.name}` }, React.createElement(TrashIcon, null))
                )
            ),
            React.createElement('div', { className: "flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[var(--text-secondary)]" },
                monster.attributes && monster.attributes.map(attr =>
                    React.createElement('span', { key: attr.key }, React.createElement('b', null, `${attr.key}:`), ` ${attr.value}`)
                )
            ),
            monster.inventory && monster.inventory.length > 0 && React.createElement('div', { className: "mt-3 border-t border-[var(--border-secondary)] pt-3" },
                React.createElement('h4', { className: 'font-semibold text-sm text-[var(--text-secondary)]' }, t('inventory')),
                React.createElement('ul', { className: 'list-disc list-inside text-sm text-[var(--text-muted)]' },
                    monster.inventory.map((item, index) => React.createElement('li', { key: index }, `${item.name} (x${item.quantity})`))
                )
            )
        );
    };

    const monsterList = monsters.length === 0 ?
        React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t('noMonsters')) :
        monsters.map(monster => React.createElement(MonsterCard, { key: monster.id, monster: monster }));

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex flex-wrap gap-4 justify-between items-center mb-4" },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] flex items-center gap-3", style: { fontFamily: 'serif' } }, 
                React.createElement(SkullIcon),
                t('monsterRoster')
            ),
            !isFormVisible && React.createElement('button', { onClick: handleOpenFormForAdd, className: "flex items-center px-4 py-2 rounded-lg bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white transition-colors duration-300", 'aria-label': t('addMonster') },
                React.createElement(PlusIcon, null), t('addMonster')
            )
        ),
        isFormVisible && form,
        React.createElement('div', { className: "space-y-4" }, monsterList)
    );
};

export default MonsterManager;

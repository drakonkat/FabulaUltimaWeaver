

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { heroTemplates } from '../data/templates.js';
import { randomizerData } from '../data/randomizerData.js';
import { fabulaClasses } from '../data/fabulaUltimaData.js';
import FabulaClassDetails from './FabulaClassDetails.js';


const UserPlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v2h-2a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2v-2z" })
);
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);
const PencilIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" }),
    React.createElement('path', { fillRule: "evenodd", d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z", clipRule: "evenodd" })
);
const PlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" })
);
const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1.5", viewBox: "0 0 20 20", fill: "currentColor" }, 
    React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm7-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" })
);
const DiceIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M10 2a8 8 0 100 16 8 8 0 000-16zM6.343 4.929A6 6 0 0115.07 13.657L4.93 3.514a6.014 6.014 0 011.414 1.414zM4.929 6.343L13.657 15.07A6 6 0 016.343 4.93z" })
);


const HeroManager = ({ heroes, onAddHero, onUpdateHero, onRemoveHero, gameSystem, isPlayerView, onRewrite, onGenerateBackground }) => {
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingHero, setEditingHero] = useState(null);
    const [isRewriting, setIsRewriting] = useState(false);
    const [isRandomizing, setIsRandomizing] = useState(false);
    
    // Form State
    const [characterType, setCharacterType] = useState('generic');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [heroClass, setHeroClass] = useState('');
    const [classes, setClasses] = useState([{ id: crypto.randomUUID(), classId: '', level: '1' }]);
    const [appearance, setAppearance] = useState('');
    const [background, setBackground] = useState('');
    const [status, setStatus] = useState('Healthy');
    const [stats, setStats] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [acquiredAbilities, setAcquiredAbilities] = useState({});

    const resetForm = () => {
        setCharacterType('generic');
        setName(''); setGender(''); setAge(''); setRace(''); setHeroClass('');
        setClasses([{ id: crypto.randomUUID(), classId: '', level: '1' }]);
        setAppearance(''); setBackground(''); setStatus('Healthy');
        setStats([
            { id: crypto.randomUUID(), key: t('maxHP'), value: '10' },
            { id: crypto.randomUUID(), key: t('currentHP'), value: '10' },
        ]);
        setInventory([]);
        setAcquiredAbilities({});
    };

    useEffect(() => {
        if (isPlayerView && !heroes.length && !isFormVisible) {
            setIsFormVisible(true);
        }
    }, [isPlayerView, heroes, isFormVisible]);

    useEffect(() => {
        if (editingHero) {
            setCharacterType(editingHero.characterType || 'generic');
            if (editingHero.characterType === 'fabulaUltima') {
                if (editingHero.classes && editingHero.classes.length > 0) {
                    setClasses(editingHero.classes.map(c => ({ ...c, id: crypto.randomUUID() })));
                } else if (editingHero.class) { // Backwards compatibility
                    setClasses([{ id: crypto.randomUUID(), classId: editingHero.class, level: '1' }]);
                } else {
                    setClasses([{ id: crypto.randomUUID(), classId: '', level: '1' }]);
                }
                setHeroClass('');
            } else {
                setHeroClass(editingHero.class);
                setClasses([{ id: crypto.randomUUID(), classId: '', level: '1' }]);
            }
            setName(editingHero.name);
            setGender(editingHero.gender);
            setAge(editingHero.age);
            setRace(editingHero.race);
            setAppearance(editingHero.appearance);
            setBackground(editingHero.background);
            setStatus(editingHero.status);

            let initialStats = [];
            if (Array.isArray(editingHero.stats)) {
                initialStats = editingHero.stats;
            } else if (typeof editingHero.stats === 'object' && editingHero.stats !== null) {
                initialStats = Object.entries(editingHero.stats).map(([key, value]) => ({ key, value: String(value) }));
            }
            setStats(initialStats.map(s => ({ ...s, id: crypto.randomUUID() })));
            
            let initialInventory = [];
            if (Array.isArray(editingHero.inventory)) {
                initialInventory = editingHero.inventory;
            }
            setInventory(initialInventory.map(item => ({...item, id: crypto.randomUUID() })));
            setAcquiredAbilities(editingHero.acquiredAbilities || {});

            setIsFormVisible(true);
        } else {
            resetForm();
        }
    }, [editingHero, t]);
    
    const handleRewriteClick = async () => {
        if (!background.trim() || isRewriting || !onRewrite) return;
        setIsRewriting(true);
        const rewrittenText = await onRewrite(background);
        setBackground(rewrittenText);
        setIsRewriting(false);
    };
    
    const handleRandomize = async () => {
        if (isRandomizing || !onGenerateBackground) return;
        setIsRandomizing(true);
        
        const { firstNames, lastNames, genders, races, classes, appearanceParts, baseStats } = randomizerData;
        const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        const randomRace = rand(races);
        const randomClass = rand(classes);

        setCharacterType('generic');
        setName(`${rand(firstNames)} ${rand(lastNames)}`);
        setGender(rand(genders));
        setAge(String(Math.floor(Math.random() * 43) + 18)); // 18-60
        setRace(randomRace);
        setHeroClass(randomClass);
        setAppearance(`${rand(appearanceParts.heights)}, with ${rand(appearanceParts.hair)} hair, ${rand(appearanceParts.eyes)} eyes, and ${rand(appearanceParts.features)}.`);
        setStatus('Healthy');
        
        const randomStats = baseStats.map(stat => ({
            id: crypto.randomUUID(),
            key: stat,
            value: String(Math.floor(Math.random() * 11) + 8) // 8-18
        }));
        const hp = String(Math.floor(Math.random() * 11) + 10); // 10-20
        setStats([
            { id: crypto.randomUUID(), key: t('maxHP'), value: hp },
            { id: crypto.randomUUID(), key: t('currentHP'), value: hp },
            ...randomStats,
        ]);
        setInventory([]);
        setAcquiredAbilities({});

        setBackground(t('generatingBackground'));
        const generatedBg = await onGenerateBackground(randomRace, randomClass);
        setBackground(generatedBg);
        
        setIsRandomizing(false);
    };

    const handleOpenFormForAdd = () => {
        setEditingHero(null);
        resetForm();
        setIsFormVisible(true);
    };
    
    const handleCancel = () => {
        setEditingHero(null);
        setIsFormVisible(false);
    }
    
    const handleAddFromTemplate = (e) => {
        const templateName = e.target.value;
        if (!templateName) return;

        const template = heroTemplates.find(t => t.name === templateName);
        if (template) {
            const systemStatsObj = gameSystem === 'D&D' ? template.stats.dd : template.stats.fu;
            const statsArray = Object.entries(systemStatsObj).map(([key, value]) => ({ key, value: String(value) }));
            const defaultHP = [
                { key: t('maxHP'), value: '10' },
                { key: t('currentHP'), value: '10' },
            ];
            
            const { stats, ...restOfTemplate } = template;
            onAddHero({ ...restOfTemplate, status: 'Healthy', inventory: [], stats: [...defaultHP, ...statsArray], characterType: 'generic' });
        }
        e.target.value = ''; // Reset select
    };

    const handleAddAttribute = () => {
        setStats(prev => [...prev, { id: crypto.randomUUID(), key: '', value: '' }]);
    };
    const handleRemoveAttribute = (id) => {
        setStats(prev => prev.filter(stat => stat.id !== id));
    };
    const handleStatChange = (id, field, value) => {
        setStats(currentStats =>
            currentStats.map(stat =>
                stat.id === id ? { ...stat, [field]: value } : stat
            )
        );
    };
    
    const handleAddItem = () => {
        setInventory(prev => [...prev, { id: crypto.randomUUID(), name: '', quantity: '1', weight: '' }]);
    };
    const handleRemoveItem = (id) => {
        setInventory(prev => prev.filter(item => item.id !== id));
    };
    const handleItemChange = (id, field, value) => {
        setInventory(currentInventory =>
            currentInventory.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };
    
    const handleAddClass = () => {
        if (classes.length < 3) {
            setClasses(prev => [...prev, { id: crypto.randomUUID(), classId: '', level: '1' }]);
        }
    };
    
    const handleRemoveClass = (id) => {
        if (classes.length > 1) {
            setClasses(prev => prev.filter(c => c.id !== id));
        }
    };
    
    const handleClassChange = (id, field, value) => {
        setClasses(current =>
            current.map(c => c.id === id ? { ...c, [field]: value } : c)
        );
    };
    
    const handleAbilityChange = (hero, classId, abilityId, count) => {
        const newAcquiredAbilities = JSON.parse(JSON.stringify(hero.acquiredAbilities || {}));
        
        if (!newAcquiredAbilities[classId]) {
            newAcquiredAbilities[classId] = {};
        }

        if (count > 0) {
            newAcquiredAbilities[classId][abilityId] = count;
        } else {
            delete newAcquiredAbilities[classId][abilityId];
            if (Object.keys(newAcquiredAbilities[classId]).length === 0) {
                delete newAcquiredAbilities[classId];
            }
        }
        onUpdateHero({ ...hero, acquiredAbilities: newAcquiredAbilities });
    };

    const handleAbilityChangeInForm = (classId, abilityId, count) => {
        setAcquiredAbilities(prev => {
            const newAbilities = JSON.parse(JSON.stringify(prev));
            if (!newAbilities[classId]) {
                newAbilities[classId] = {};
            }
            if (count > 0) {
                newAbilities[classId][abilityId] = count;
            } else {
                delete newAbilities[classId][abilityId];
                if (Object.keys(newAbilities[classId]).length === 0) {
                    delete newAbilities[classId];
                }
            }
            return newAbilities;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && background.trim() && status.trim()) {
            const finalStats = stats
                .filter(s => s.key.trim() !== '')
                .map(({ id, ...rest }) => rest);

            const finalInventory = inventory
                .filter(i => i.name.trim() !== '')
                .map(({ id, ...rest }) => rest);

            const heroData = { name, gender, age, race, appearance, background, status, stats: finalStats, inventory: finalInventory, characterType, acquiredAbilities };
            
            if (characterType === 'fabulaUltima') {
                heroData.classes = classes
                    .filter(c => c.classId)
                    .map(({ id, ...rest }) => ({...rest, level: parseInt(rest.level, 10) || 1}));
                delete heroData.class;
            } else {
                heroData.class = heroClass;
                delete heroData.classes;
            }
            
            if (editingHero || (isPlayerView && heroes.length > 0)) {
                onUpdateHero({ ...(editingHero || heroes[0]), ...heroData });
            } else {
                onAddHero(heroData);
            }
            setIsFormVisible(false);
            setEditingHero(null);
        }
    };
    
    const formTotalWeight = useMemo(() => {
        return inventory.reduce((total, item) => {
            const weight = parseFloat(item.weight) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (weight * quantity);
        }, 0).toFixed(2);
    }, [inventory]);

    const form = React.createElement('form', { onSubmit: handleSubmit, className: "p-4 mb-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)] animate-fade-in flex flex-col gap-4" },
        React.createElement('div', { className: "flex justify-between items-center"},
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)]" }, editingHero ? t('editHeroTitle') : t('addHeroTitle')),
            isPlayerView && onGenerateBackground && React.createElement('button', { type: "button", onClick: handleRandomize, disabled: isRandomizing, className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors disabled:opacity-50" },
                React.createElement(DiceIcon), t('randomizeHero')
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            React.createElement('div', { className: 'md:col-span-2' },
                 React.createElement('label', { htmlFor: 'character-type', className: "block text-sm font-medium text-[var(--accent-primary)] mb-1" }, t('characterType')),
                 React.createElement('select', { id: 'character-type', value: characterType, onChange: e => setCharacterType(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]" },
                    React.createElement('option', { value: 'generic' }, t('generic')),
                    React.createElement('option', { value: 'fabulaUltima' }, t('fabulaUltimaCharacter'))
                 )
            ),
            React.createElement('input', { type: "text", placeholder: t('heroNamePlaceholder'), value: name, onChange: e => setName(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]", required: true }),
            React.createElement('input', { type: "text", placeholder: t('heroGenderPlaceholder'), value: gender, onChange: e => setGender(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('heroAgePlaceholder'), value: age, onChange: e => setAge(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('heroRacePlaceholder'), value: race, onChange: e => setRace(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            characterType === 'fabulaUltima' ?
                React.createElement('div', { className: 'md:col-span-2 space-y-2' },
                    React.createElement('label', { className: "block text-sm font-medium text-[var(--accent-primary)] mb-1" }, t('fabulaUltimaClass')),
                    classes.map((c, index) => React.createElement('div', { key: c.id, className: "grid grid-cols-[1fr_80px_auto] items-center gap-2" },
                        React.createElement('select', { 
                            value: c.classId, 
                            onChange: e => handleClassChange(c.id, 'classId', e.target.value),
                            className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]"
                        },
                            React.createElement('option', { value: "" }, t('selectClass')),
                            fabulaClasses.map(fc => React.createElement('option', { key: fc.id, value: fc.id }, t(fc.nameKey)))
                        ),
                        React.createElement('input', { 
                            type: "number", 
                            placeholder: t('level'),
                            'aria-label': t('level'),
                            value: c.level, 
                            onChange: e => handleClassChange(c.id, 'level', e.target.value),
                            min: "1",
                            className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] text-center"
                        }),
                        React.createElement('button', { 
                            type: "button", 
                            onClick: () => handleRemoveClass(c.id), 
                            disabled: classes.length <= 1,
                            'aria-label': "Remove Class",
                            className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        }, React.createElement(TrashIcon, null))
                    )),
                    classes.length < 3 && React.createElement('button', {
                        type: "button",
                        onClick: handleAddClass,
                        className: "flex items-center justify-center w-full px-4 py-2 mt-2 text-sm rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)]"
                    }, React.createElement(PlusIcon, null), t('addClass'))
                ) :
                React.createElement('input', { type: "text", placeholder: t('heroClassPlaceholder'), value: heroClass, onChange: e => setHeroClass(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('statusPlaceholder'), value: status, onChange: e => setStatus(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]", required: true })
        ),
        React.createElement('textarea', { placeholder: t('heroAppearancePlaceholder'), value: appearance, onChange: e => setAppearance(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] h-20 resize-none" }),
        React.createElement('div', { className: 'relative' },
            React.createElement('textarea', { placeholder: t('backgroundPlaceholder'), value: background, onChange: e => setBackground(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] h-24 resize-none", required: true, disabled: isRandomizing }),
            isPlayerView && onRewrite && React.createElement('button', { type: "button", onClick: handleRewriteClick, disabled: isRewriting || isRandomizing, className: "absolute bottom-3 right-3 flex items-center px-2.5 py-1.5 text-xs rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors disabled:opacity-50" },
                isRewriting ? t('rewriting') : React.createElement(React.Fragment, null, React.createElement(SparklesIcon), t('rewriteWithAI'))
            )
        ),
        React.createElement('div', { className: "border-t border-[var(--border-primary)] pt-4" },
            React.createElement('div', { className: "flex justify-between items-center mb-2" },
                React.createElement('h4', { className: "text-lg font-semibold text-[var(--text-secondary)]" }, t('attributes')),
                React.createElement('button', { type: "button", onClick: handleAddAttribute, className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors" },
                    React.createElement(PlusIcon, null),
                    t('addAttribute')
                )
            ),
            React.createElement('div', { className: "space-y-2 max-h-48 overflow-y-auto pr-2" },
                stats.map(stat => React.createElement('div', { key: stat.id, className: "grid grid-cols-[1fr_1fr_auto] items-center gap-2" },
                    React.createElement('input', { type: "text", placeholder: t('attributeNamePlaceholder'), value: stat.key, onChange: e => handleStatChange(stat.id, 'key', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('input', { type: "text", placeholder: t('attributeValuePlaceholder'), value: stat.value, onChange: e => handleStatChange(stat.id, 'value', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('button', { type: "button", onClick: () => handleRemoveAttribute(stat.id), 'aria-label': "Remove Attribute", className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors" }, React.createElement(TrashIcon, null))
                ))
            )
        ),
        React.createElement('div', { className: "border-t border-[var(--border-primary)] pt-4" },
            React.createElement('div', { className: "flex justify-between items-center mb-2" },
                React.createElement('h4', { className: "text-lg font-semibold text-[var(--text-secondary)]" }, t('inventory')),
                React.createElement('div', { className: 'flex items-center gap-4' },
                    React.createElement('span', { className: 'text-sm text-[var(--text-muted)]' }, `${t('totalWeight')}: ${formTotalWeight}`),
                    React.createElement('button', { type: "button", onClick: handleAddItem, className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors" },
                        React.createElement(PlusIcon, null),
                        t('addItem')
                    )
                )
            ),
            React.createElement('div', { className: "space-y-2 max-h-48 overflow-y-auto pr-2" },
                inventory.map(item => React.createElement('div', { key: item.id, className: "grid grid-cols-[1fr_80px_100px_auto] items-center gap-2" },
                    React.createElement('input', { type: "text", placeholder: t('itemNamePlaceholder'), value: item.name, onChange: e => handleItemChange(item.id, 'name', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('input', { type: "text", placeholder: t('quantityPlaceholder'), value: item.quantity, onChange: e => handleItemChange(item.id, 'quantity', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('input', { type: "text", placeholder: t('weightPlaceholder'), value: item.weight, onChange: e => handleItemChange(item.id, 'weight', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] text-sm" }),
                    React.createElement('button', { type: "button", onClick: () => handleRemoveItem(item.id), 'aria-label': "Remove Item", className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors" }, React.createElement(TrashIcon, null))
                ))
            )
        ),
        React.createElement('div', { className: "flex justify-end gap-4 mt-4" },
            !isPlayerView && React.createElement('button', { type: "button", onClick: handleCancel, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors" }, t('cancel')),
            React.createElement('button', { type: "submit", className: "px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)]" }, editingHero ? t('updateHero') : t('saveHero'))
        )
    );

    const HeroCard = ({ hero }) => {
        const totalWeight = useMemo(() => {
            if (!hero.inventory) return '0.00';
            return hero.inventory.reduce((total, item) => {
                const weight = parseFloat(item.weight) || 0;
                const quantity = parseInt(item.quantity, 10) || 0;
                return total + (weight * quantity);
            }, 0).toFixed(2);
        }, [hero.inventory]);
        
        let classDisplay = hero.class;
        if (hero.characterType === 'fabulaUltima' && hero.classes && hero.classes.length > 0) {
            classDisplay = hero.classes.map(c => {
                const className = t(fabulaClasses.find(fc => fc.id === c.classId)?.nameKey || c.classId);
                return `${className} ${c.level || ''}`.trim();
            }).join(' / ');
        }

        return React.createElement('div', { className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex flex-col md:flex-row items-start gap-4" },
            React.createElement('div', { className: "flex-grow" },
                React.createElement('div', { className: "flex justify-between items-start" },
                    React.createElement('div', null,
                        React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, hero.name),
                        React.createElement('p', { className: "text-sm text-[var(--text-muted)] mt-1" }, `${hero.age}, ${hero.gender} ${hero.race} ${classDisplay}`),
                        React.createElement('p', { className: "text-sm text-[var(--text-muted)]" }, React.createElement('span', { className: "font-semibold text-[var(--text-secondary)]" }, `${t('status')}:`), ` ${hero.status}`)
                    ),
                    React.createElement('div', { className: "flex-shrink-0 flex gap-2" },
                        React.createElement('button', { onClick: () => setEditingHero(hero), className: "p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 rounded-full transition-colors duration-200", 'aria-label': `${t('edit')} ${hero.name}` }, React.createElement(PencilIcon, null)),
                        React.createElement('button', { onClick: () => onRemoveHero(hero.id), className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors duration-200", 'aria-label': `${t('remove')} ${hero.name}` }, React.createElement(TrashIcon, null))
                    )
                ),
                React.createElement('div', { className: "flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[var(--text-secondary)]" },
                    hero.stats && hero.stats.map(stat =>
                        React.createElement('span', { key: stat.key }, React.createElement('b', null, `${stat.key}:`), ` ${stat.value}`)
                    )
                ),
                hero.inventory && hero.inventory.length > 0 && React.createElement('div', { className: "mt-3 border-t border-[var(--border-secondary)] pt-3" },
                    React.createElement('h4', { className: 'font-semibold text-sm text-[var(--text-secondary)]' }, t('inventory')),
                    React.createElement('ul', { className: 'list-disc list-inside text-sm text-[var(--text-muted)]' },
                        hero.inventory.map((item, index) => React.createElement('li', { key: index }, `${item.name} (x${item.quantity})`))
                    ),
                    React.createElement('p', { className: 'text-sm font-bold text-[var(--text-secondary)] mt-1' }, `${t('totalWeight')}: ${totalWeight}`)
                ),
                React.createElement('div', { className: "mt-3 border-t border-[var(--border-secondary)] pt-3" },
                    React.createElement('p', { className: "text-[var(--text-secondary)]" }, React.createElement('span', { className: "font-semibold" }, `${t('appearance')}:`), ` ${hero.appearance}`),
                    React.createElement('p', { className: "text-[var(--text-muted)] mt-2 whitespace-pre-wrap" }, hero.background)
                ),
                hero.characterType === 'fabulaUltima' && hero.classes && hero.classes.map(c => c.classId && 
                    React.createElement(FabulaClassDetails, {
                        key: c.classId,
                        className: c.classId,
                        acquiredAbilities: hero.acquiredAbilities?.[c.classId] || {},
                        onAbilityChange: (abilityId, count) => handleAbilityChange(hero, c.classId, abilityId, count),
                        defaultExpanded: true
                    })
                )
            )
        );
    };

    const heroList = heroes.length === 0 ?
        React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t('noHeroes')) :
        heroes.map(hero => React.createElement(HeroCard, { key: hero.id, hero: hero }));

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex flex-wrap gap-4 justify-between items-center mb-4" },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, isPlayerView ? t('myHero') : t('partyRoster')),
            !isPlayerView && React.createElement('div', { className: "flex gap-2" },
                React.createElement('select', { onChange: handleAddFromTemplate, className: "bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-accent)] rounded-lg py-2 px-3 text-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)] hover:bg-[var(--bg-quaternary)] transition-colors", 'aria-label': t('addFromTemplate') },
                    React.createElement('option', { value: "" }, t('selectTemplate')),
                    ...heroTemplates.map(template => React.createElement('option', { key: template.name, value: template.name }, template.name))
                ),
                !isFormVisible && React.createElement('button', { onClick: handleOpenFormForAdd, className: "flex items-center px-4 py-2 rounded-lg bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white transition-colors duration-300", 'aria-label': t('addHero') },
                    React.createElement(UserPlusIcon, null), " ", t('addHero')
                )
            )
        ),
        isFormVisible && form,
        isFormVisible && characterType === 'fabulaUltima' && classes.map(c => c.classId && React.createElement(FabulaClassDetails, { 
            key: c.id, 
            className: c.classId, 
            defaultExpanded: true,
            acquiredAbilities: acquiredAbilities[c.classId] || {},
            onAbilityChange: (abilityId, count) => handleAbilityChangeInForm(c.classId, abilityId, count)
        })),
        React.createElement('div', { className: "space-y-4" }, !isFormVisible && heroList)
    );
};

export default HeroManager;
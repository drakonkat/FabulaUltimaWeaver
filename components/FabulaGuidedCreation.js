// components/FabulaGuidedCreation.js

import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { fabulaClasses, fabulaClassDetails } from '../data/fabulaUltimaData.js';
import { identityConcepts, identityAdjectives, identityDetails, themeSuggestions, originSuggestions } from '../data/fabulaUltimaIdentityHelper.js';
import { equipment as equipmentData } from '../data/fabulaUltimaEquipment.js';
import FabulaClassDetails from './FabulaClassDetails.js';
import { GoogleGenAI } from "@google/genai";

const Step_1_Identity = ({ data, onUpdate }) => {
    const { t, language } = useTranslation();

    const handleSelectChange = (part, value) => {
        const newIdentity = { ...data.identity, [part]: value };
        onUpdate({ identity: newIdentity });
    };

    const getText = (item) => item[language] || item.en;

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('identityPrompt')),
        React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg border border-[var(--border-secondary)]' },
            React.createElement('h3', { className: 'text-lg font-semibold text-[var(--accent-primary)] mb-2' }, t('identityHelper')),
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
                React.createElement('select', { onChange: (e) => handleSelectChange('concept', e.target.value), value: data.identity.concept || '', className: 'p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]' },
                    React.createElement('option', { value: '' }, t('selectConcept')),
                    identityConcepts.map(c => React.createElement('option', { key: c.en, value: getText(c) }, getText(c)))
                ),
                React.createElement('select', { onChange: (e) => handleSelectChange('adjective', e.target.value), value: data.identity.adjective || '', className: 'p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]' },
                    React.createElement('option', { value: '' }, t('selectAdjective')),
                    identityAdjectives.map(a => React.createElement('option', { key: a.en, value: getText(a) }, getText(a)))
                ),
                React.createElement('select', { onChange: (e) => handleSelectChange('detail', e.target.value), value: data.identity.detail || '', className: 'p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]' },
                    React.createElement('option', { value: '' }, t('selectDetail')),
                    identityDetails.map(d => React.createElement('option', { key: d.en, value: getText(d) }, getText(d)))
                )
            )
        ),
        React.createElement('input', {
            type: 'text',
            value: [data.identity.concept, data.identity.adjective, data.identity.detail].filter(Boolean).join(' '),
            onChange: (e) => {
                const [concept = '', adjective = '', ...detailParts] = e.target.value.split(' ');
                const detail = detailParts.join(' ');
                onUpdate({ identity: { concept, adjective, detail } });
            },
            className: 'w-full p-3 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-accent-light)] text-center font-semibold text-lg'
        })
    );
};

const Step_2_Theme = ({ data, onUpdate }) => {
    const { t, language } = useTranslation();
    const getText = item => item[language] || item.en;

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('themePrompt')),
        React.createElement('input', {
            type: 'text',
            placeholder: t('customThemePlaceholder'),
            value: data.theme || '',
            onChange: (e) => onUpdate({ theme: e.target.value }),
            className: 'w-full p-3 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-accent-light)] text-center font-semibold text-lg'
        }),
        React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg border border-[var(--border-secondary)]' },
            React.createElement('h3', { className: 'text-lg font-semibold text-[var(--accent-primary)] mb-2' }, 'Suggestions'),
             React.createElement('div', { className: 'flex flex-wrap gap-2' },
                themeSuggestions.map(suggestion => React.createElement('button', {
                    key: getText(suggestion),
                    type: 'button',
                    onClick: () => onUpdate({ theme: getText(suggestion) }),
                    className: 'px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition-colors'
                }, getText(suggestion)))
            )
        )
    );
};

const Step_3_Origin = ({ data, onUpdate }) => {
    const { t, language } = useTranslation();
    const getText = item => item[language] || item.en;

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('originPrompt')),
        React.createElement('input', {
            type: 'text',
            value: data.origin || '',
            onChange: (e) => onUpdate({ origin: e.target.value }),
            className: 'w-full p-3 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-accent-light)] text-center font-semibold text-lg'
        }),
        React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg border border-[var(--border-secondary)]' },
            React.createElement('h3', { className: 'text-lg font-semibold text-[var(--accent-primary)] mb-2' }, 'Suggestions'),
            React.createElement('div', { className: 'flex flex-wrap gap-2' },
                originSuggestions.map(suggestion => React.createElement('button', {
                    key: getText(suggestion),
                    type: 'button',
                    onClick: () => onUpdate({ origin: getText(suggestion) }),
                    className: 'px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition-colors'
                }, getText(suggestion)))
            )
        )
    );
};

const PlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110 2h3V6a1 1 0 011-1z", clipRule: "evenodd" })
);
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);

const Step_4_Classes = ({ data, onUpdate }) => {
    const { t } = useTranslation();
    const totalLevels = useMemo(() => data.classes.reduce((sum, c) => sum + (parseInt(c.level, 10) || 0), 0), [data.classes]);
    const levelsRemaining = 5 - totalLevels;
    
    const handleAddClass = () => {
        if (data.classes.length < 3) {
            onUpdate({ classes: [...data.classes, { id: crypto.randomUUID(), classId: '', level: '1' }] });
        }
    };

    const handleRemoveClass = (id) => {
        if (data.classes.length > 1) {
            onUpdate({ classes: data.classes.filter(c => c.id !== id) });
        }
    };

    const handleClassChange = (id, field, value) => {
        const newClasses = data.classes.map(c => c.id === id ? { ...c, [field]: value } : c);
        onUpdate({ classes: newClasses });
    };
    
    const handleAbilityChange = (classId, abilityId, count) => {
        const newAcquired = JSON.parse(JSON.stringify(data.acquiredAbilities || {}));
        if (!newAcquired[classId]) newAcquired[classId] = {};
        if (count > 0) newAcquired[classId][abilityId] = count;
        else delete newAcquired[classId][abilityId];
        if (Object.keys(newAcquired[classId]).length === 0) delete newAcquired[classId];
        onUpdate({ acquiredAbilities: newAcquired });
    };

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('classesPrompt')),
        React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg text-center' },
            React.createElement('p', null, `${t('totalLevels')}: ${totalLevels} / 5`),
            React.createElement('p', { className: levelsRemaining < 0 ? 'text-[var(--danger)]' : '' }, `${t('levelsRemaining')}: ${levelsRemaining}`)
        ),
        ...data.classes.map(c => React.createElement('div', { key: c.id, className: 'grid grid-cols-[1fr_80px_auto] gap-2 items-center' },
            React.createElement('select', { value: c.classId, onChange: e => handleClassChange(c.id, 'classId', e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)]" },
                React.createElement('option', { value: '' }, t('selectClass')),
                fabulaClasses.map(fc => React.createElement('option', { key: fc.id, value: fc.id }, t(fc.nameKey)))
            ),
            React.createElement('input', { type: 'number', value: c.level, onChange: e => handleClassChange(c.id, 'level', e.target.value), min: 1, className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] text-center" }),
            data.classes.length > 1 ? React.createElement('button', { type: 'button', onClick: () => handleRemoveClass(c.id), className: 'p-2 text-[var(--danger)]' }, React.createElement(TrashIcon)) : React.createElement('div', {className: 'w-9'})
        )),
        data.classes.length < 3 && React.createElement('button', {
            type: 'button',
            onClick: handleAddClass,
            className: 'w-full flex items-center justify-center p-2 rounded-lg bg-[var(--bg-quaternary)] hover:bg-[var(--bg-tertiary)]'
        }, React.createElement(PlusIcon), t('addClass')),
        data.classes.map(c => c.classId && React.createElement(FabulaClassDetails, {
            key: c.classId,
            className: c.classId,
            acquiredAbilities: data.acquiredAbilities?.[c.classId] || {},
            onAbilityChange: (abilityId, count) => handleAbilityChange(c.classId, abilityId, count),
            classLevel: parseInt(c.level, 10) || 0
        }))
    );
};

const Step_5_Attributes = ({ data, onUpdate }) => {
    const { t } = useTranslation();
    const presets = {
        allRounder: ['d8', 'd8', 'd8', 'd8'],
        average: ['d10', 'd8', 'd8', 'd6'],
        specialized: ['d10', 'd10', 'd6', 'd6'],
    };

    const handlePreset = (presetName) => {
        onUpdate({ unassignedDice: presets[presetName], attributes: {} });
    };

    const handleAssign = (die, attr) => {
        const newUnassigned = [...data.unassignedDice];
        const dieIndex = newUnassigned.indexOf(die);
        if (dieIndex === -1) return;
        newUnassigned.splice(dieIndex, 1);

        const oldDie = data.attributes[attr];
        if (oldDie) newUnassigned.push(oldDie);
        
        onUpdate({ unassignedDice: newUnassigned, attributes: { ...data.attributes, [attr]: die } });
    };

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('attributesPrompt')),
        React.createElement('div', { className: 'flex justify-center gap-2' },
            Object.keys(presets).map(p => React.createElement('button', { key: p, onClick: () => handlePreset(p), className: 'px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)]' }, t(p)))
        ),
        React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg' },
            React.createElement('h3', { className: 'text-lg font-semibold text-[var(--accent-primary)] mb-2' }, t('unassigned')),
            React.createElement('div', { className: 'flex gap-2' },
                data.unassignedDice.map((die, i) => React.createElement('span', { key: i, className: 'px-4 py-2 bg-[var(--bg-secondary)] rounded-md font-bold' }, die))
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
            ['dex', 'ins', 'mig', 'wlp'].map(attr => React.createElement('div', { key: attr, className: 'p-4 bg-[var(--bg-primary)] rounded-lg' },
                React.createElement('h4', { className: 'font-semibold text-[var(--text-secondary)]' }, t(attr === 'dex' ? 'dexterity' : attr === 'ins' ? 'insight' : attr === 'mig' ? 'might' : 'willpower')),
                React.createElement('p', { className: 'text-2xl font-bold my-2' }, data.attributes[attr] || 'd?'),
                React.createElement('div', { className: 'flex gap-1' },
                    data.unassignedDice.map((die, i) => React.createElement('button', { key: i, onClick: () => handleAssign(die, attr), className: 'text-xs px-2 py-1 bg-[var(--bg-tertiary)] rounded-md' }, die))
                )
            ))
        )
    );
};

const Step_7_Equipment = ({ data, onUpdate }) => {
    const { t, language } = useTranslation();
    const [budget, setBudget] = useState(500);
    const { equipment: inventory = [] } = data;
    const [savings, setSavings] = useState(null);

    const getText = (field) => {
        if (typeof field === 'object' && field !== null && field.en) {
            return field[language] || field.en;
        }
        return field;
    };

    useEffect(() => {
        const totalCost = inventory.reduce((sum, item) => sum + item.cost, 0);
        setBudget(500 - totalCost);
    }, [inventory]);

    const handleBuy = (item) => {
        if (budget >= item.cost) {
            const newItem = { ...item, name: getText(item.name) }; // historicize name
            onUpdate({ equipment: [...inventory, newItem] });
        }
    };

    const handleSell = (itemToRemove, indexToRemove) => {
        const newInventory = inventory.filter((_, index) => index !== indexToRemove);
        onUpdate({ equipment: newInventory });
    };

    const handleRollSavings = () => {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const result = (die1 + die2) * 10;
        setSavings(result);
        onUpdate({ zenit: result });
    };

    const allItems = [...equipmentData.weapons, ...equipmentData.armor, ...equipmentData.shields];

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('equipmentPrompt')),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg' },
                React.createElement('h3', { className: 'text-lg font-semibold text-[var(--accent-primary)] mb-2' }, t('shop')),
                React.createElement('div', { className: 'h-96 overflow-y-auto pr-2' },
                    allItems.map(item => React.createElement('div', { key: item.id, className: 'flex justify-between items-center p-2 mb-1 bg-[var(--bg-secondary)] rounded' },
                        React.createElement('span', null, `${getText(item.name)} (${item.cost}z)`),
                        React.createElement('button', { onClick: () => handleBuy(item), disabled: budget < item.cost, className: 'px-2 py-1 text-xs bg-[var(--accent-tertiary)] rounded disabled:bg-gray-600' }, t('buy'))
                    ))
                )
            ),
            React.createElement('div', { className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg' },
                React.createElement('h3', { className: 'text-lg font-semibold text-[var(--accent-primary)] mb-2' }, t('yourItems')),
                React.createElement('p', { className: 'mb-2' }, `${t('budget')}: ${budget}z`),
                React.createElement('div', { className: 'h-96 overflow-y-auto pr-2' },
                    inventory.map((item, i) => React.createElement('div', { key: `${item.id}-${i}`, className: 'flex justify-between items-center p-2 mb-1 bg-[var(--bg-secondary)] rounded' },
                        React.createElement('span', null, getText(item.name)),
                        React.createElement('button', { onClick: () => handleSell(item, i), className: 'px-2 py-1 text-xs bg-[var(--danger)]/80 rounded' }, t('remove'))
                    ))
                )
            )
        ),
        savings === null ?
            React.createElement('button', { onClick: handleRollSavings, className: 'w-full p-3 bg-[var(--highlight-primary-from)] text-white font-bold rounded-lg' }, t('rollSavings'))
            :
            React.createElement('p', { className: 'text-center font-bold text-lg text-green-400 animate-pop-in' }, t('rollResult', { amount: savings }))
    );
};

const Step_8_Description = ({ data, onUpdate }) => {
    const { t, language } = useTranslation();
    const [isGenerating, setIsGenerating] = useState(false);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const handleGenerateDescription = async () => {
        setIsGenerating(true);
        const classNames = data.classes.map(c => t(fabulaClasses.find(fc => fc.id === c.classId)?.nameKey || '')).join(' / ');
        const prompt = `Generate a short, evocative physical description for a Fabula Ultima character. The description should be 2-3 sentences.
        - Identity: ${[data.identity.concept, data.identity.adjective, data.identity.detail].filter(Boolean).join(' ')}
        - Origin: ${data.origin}
        - Theme: ${data.theme}
        - Classes: ${classNames}
        `;
        
        try {
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                systemInstruction: `You are a creative writer for JRPG characters. Respond only with the description text. The response must be in ${language}.`
              }
            });
            onUpdate({ description: response.text });
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    return React.createElement('div', { className: 'space-y-4' },
        React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('descriptionPrompt')),
        React.createElement('input', {
            type: 'text',
            placeholder: t('heroNamePlaceholder'),
            value: data.name || '',
            onChange: (e) => onUpdate({ name: e.target.value }),
            className: 'w-full p-3 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)] text-center font-semibold text-lg'
        }),
        React.createElement('div', { className: 'relative' },
            React.createElement('textarea', {
                placeholder: t('heroAppearancePlaceholder'),
                value: data.description || '',
                onChange: e => onUpdate({ description: e.target.value }),
                className: 'w-full p-3 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)] h-32 resize-none'
            }),
            React.createElement('button', {
                type: 'button',
                onClick: handleGenerateDescription,
                disabled: isGenerating,
                className: "absolute bottom-3 right-3 flex items-center px-2.5 py-1.5 text-xs rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors disabled:opacity-50"
            }, isGenerating ? t('generating') : t('generateWithAI'))
        )
    );
};


const FabulaGuidedCreation = ({ onClose, onFinish }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [heroData, setHeroData] = useState({
        identity: {},
        theme: '',
        origin: '',
        classes: [{ id: crypto.randomUUID(), classId: '', level: '1' }],
        acquiredAbilities: {},
        unassignedDice: [],
        attributes: {},
        equipment: [],
        zenit: 0,
        name: '',
        description: '',
    });

    const handleUpdate = (update) => {
        setHeroData(prev => ({ ...prev, ...update }));
    };

    const handleFinalize = () => {
        // This function will compile all heroData into the final hero object structure
        const totalLevel = heroData.classes.reduce((sum, c) => sum + (parseInt(c.level) || 0), 0);
        const dieValue = (d) => parseInt(d?.substring(1) || '6', 10);
        const attrs = heroData.attributes;

        const mig = dieValue(attrs.mig);
        const wlp = dieValue(attrs.wlp);
        const maxHp = totalLevel + (mig * 5);
        const maxMp = totalLevel + (wlp * 5);

        const freeBenefits = heroData.classes.map(c => fabulaClassDetails[c.classId]?.benefits).flat().filter(Boolean);
        let hpBonus = 0; let mpBonus = 0; let ipBonus = 0;
        freeBenefits.forEach(b => {
            if (b.en.includes("Hit Points")) hpBonus += 5;
            if (b.en.includes("Mind Points")) mpBonus += 5;
            if (b.en.includes("Inventory Points")) ipBonus += 2;
        });

        const finalHero = {
            name: heroData.name,
            gender: '', age: '', race: '',
            appearance: heroData.description,
            background: `Identity: ${[heroData.identity.concept, heroData.identity.adjective, heroData.identity.detail].filter(Boolean).join(' ')}\nTheme: ${heroData.theme}\nOrigin: ${heroData.origin}`,
            status: 'Healthy',
            characterType: 'fabulaUltima',
            classes: heroData.classes.filter(c => c.classId).map(({id, ...rest}) => ({...rest, level: parseInt(rest.level, 10) || 1 })),
            acquiredAbilities: heroData.acquiredAbilities,
            fabulaAttributes: { dex: attrs.dex, ins: attrs.ins, mig: attrs.mig, wlp: attrs.wlp },
            currentHp: maxHp + hpBonus,
            currentMp: maxMp + mpBonus,
            currentIp: 6 + ipBonus,
            fabulaPoints: 3,
            zenit: heroData.zenit,
            bonds: [],
            statuses: { poisoned: false, confused: false, weak: false, enraged: false, slow: false, shaken: false },
            stats: [], // Other stats can be added manually later
            inventory: heroData.equipment.map(({id, category, ...rest}) => ({...rest, quantity: 1, weight: 0})),
        };
        onFinish(finalHero);
    };

    const totalLevel = heroData.classes.reduce((sum, c) => sum + (parseInt(c.level) || 0), 0);
    const calculatedStats = useMemo(() => {
        if (!heroData.attributes.mig) return {};
        const dieValue = (d) => parseInt(d?.substring(1) || '6', 10);
        const attrs = heroData.attributes;
        const mig = dieValue(attrs.mig);
        const wlp = dieValue(attrs.wlp);
        const maxHp = totalLevel + (mig * 5);
        const maxMp = totalLevel + (wlp * 5);
        const freeBenefits = heroData.classes.map(c => fabulaClassDetails[c.classId]?.benefits).flat().filter(Boolean);
        let hpBonus = 0; let mpBonus = 0; let ipBonus = 0;
        freeBenefits.forEach(b => {
            if (b.en.includes("Hit Points")) hpBonus += 5;
            if (b.en.includes("Mind Points")) mpBonus += 5;
            if (b.en.includes("Inventory Points")) ipBonus += 2;
        });
        return {
            hp: maxHp + hpBonus,
            mp: maxMp + mpBonus,
            ip: 6 + ipBonus,
            crisis: Math.floor((maxHp + hpBonus) / 2),
            def: dieValue(attrs.dex),
            mdef: dieValue(attrs.ins),
        };
    }, [heroData.attributes, heroData.classes, totalLevel]);

    const Step6Calculated = () => (
        React.createElement('div', { className: 'space-y-4 text-center' },
            React.createElement('p', { className: 'text-center text-[var(--text-muted)]' }, t('finalSummary')),
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-3 gap-4' },
                Object.entries({ hp: 'hitPoints', mp: 'mindPoints', ip: 'inventoryPoints', crisis: 'crisisValue', def: 'defense', mdef: 'magicDefense' }).map(([key, label]) =>
                    React.createElement('div', { key, className: 'p-4 bg-[var(--bg-tertiary)]/50 rounded-lg' },
                        React.createElement('h4', { className: 'font-semibold text-[var(--text-secondary)]' }, t(label)),
                        React.createElement('p', { className: 'text-3xl font-bold text-[var(--highlight-secondary)]' }, calculatedStats[key] || '?')
                    )
                )
            )
        )
    );
    
    const steps = [
        { title: t('step1Identity'), component: React.createElement(Step_1_Identity, { data: heroData, onUpdate: handleUpdate }) },
        { title: t('step2Theme'), component: React.createElement(Step_2_Theme, { data: heroData, onUpdate: handleUpdate }) },
        { title: t('step3Origin'), component: React.createElement(Step_3_Origin, { data: heroData, onUpdate: handleUpdate }) },
        { title: t('step4Classes'), component: React.createElement(Step_4_Classes, { data: heroData, onUpdate: handleUpdate }) },
        { title: t('step5Attributes'), component: React.createElement(Step_5_Attributes, { data: heroData, onUpdate: handleUpdate }) },
        { title: t('step6Calculated'), component: React.createElement(Step6Calculated, null) },
        { title: t('step7Equipment'), component: React.createElement(Step_7_Equipment, { data: heroData, onUpdate: handleUpdate }) },
        { title: t('step8Description'), component: React.createElement(Step_8_Description, { data: heroData, onUpdate: handleUpdate }) },
    ];
    
    const isNextDisabled = () => {
        switch(currentStep) {
            case 4: return heroData.classes.reduce((sum, c) => sum + (parseInt(c.level, 10) || 0), 0) !== 5;
            case 5: return heroData.unassignedDice.length > 0;
            case 8: return !heroData.name.trim();
            default: return false;
        }
    }

    return React.createElement('div', { className: 'fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4', 'aria-modal': true, role: 'dialog' },
        React.createElement('div', { className: 'bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl border-2 border-[var(--border-accent)] flex flex-col' },
            React.createElement('div', { className: 'p-4 border-b border-[var(--border-secondary)] flex justify-between items-center' },
                React.createElement('h2', { className: 'text-xl font-bold text-[var(--highlight-secondary)]' }, `${t('guidedCreationTitle')} - ${currentStep}/${steps.length}`),
                React.createElement('button', { onClick: onClose, className: 'p-1 rounded-full hover:bg-[var(--bg-tertiary)]' },
                    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }))
                )
            ),
            React.createElement('div', { className: 'p-6 flex-grow h-[60vh] overflow-y-auto' },
                React.createElement('h3', { className: 'text-2xl font-bold text-center mb-4' }, steps[currentStep-1].title),
                steps[currentStep - 1].component
            ),
            React.createElement('div', { className: 'p-4 border-t border-[var(--border-secondary)] flex justify-between' },
                React.createElement('button', { onClick: () => setCurrentStep(s => s - 1), disabled: currentStep === 1, className: 'px-6 py-2 font-bold rounded-lg bg-[var(--bg-tertiary)] disabled:opacity-50' }, t('previous')),
                currentStep === steps.length ?
                    React.createElement('button', { onClick: handleFinalize, disabled: isNextDisabled(), className: 'px-6 py-2 font-bold text-white rounded-lg bg-green-600 disabled:bg-green-800' }, t('finish')) :
                    React.createElement('button', { onClick: () => setCurrentStep(s => s + 1), disabled: isNextDisabled(), className: 'px-6 py-2 font-bold text-white rounded-lg bg-[var(--highlight-primary-from)] disabled:opacity-50' }, t('next'))
            )
        )
    );
};

export default FabulaGuidedCreation;
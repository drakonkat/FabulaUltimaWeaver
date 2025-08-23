import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import CampaignNameEditor from './CampaignNameEditor.js';
import HeroManager from './HeroManager.js';
import MonsterManager from './MonsterManager.js';

const SparklesIcon = ({ className = "h-4 w-4" }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm7-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" }));
const ChevronDownIcon = ({ open }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }));
const PlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }));
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" }));


const RegenerableInput = ({ label, value, placeholder, type = 'text', onChange, onRegenerate, canGenerate }) => {
    const { t } = useTranslation();
    const [isRegenerating, setIsRegenerating] = useState(false);

    const handleRegenerate = async () => {
        if (!value || !canGenerate || isRegenerating) return;
        setIsRegenerating(true);
        const rewrittenText = await onRegenerate(value);
        if (rewrittenText && rewrittenText !== value) {
            onChange(rewrittenText);
        }
        setIsRegenerating(false);
    };

    const inputClass = "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]";
    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    return React.createElement('div', { className: 'relative' },
        React.createElement('label', { className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, label),
        React.createElement(InputComponent, {
            value: value || '',
            onChange: e => onChange(e.target.value),
            placeholder,
            className: `${inputClass} ${type === 'textarea' ? 'h-24 resize-none' : ''} pr-10`
        }),
        React.createElement('button', {
            type: "button",
            onClick: handleRegenerate,
            disabled: !canGenerate || isRegenerating || !value,
            title: t('regenerate'),
            className: "absolute top-8 right-2 p-1.5 rounded-full text-white bg-[var(--accent-tertiary)]/70 hover:bg-[var(--accent-tertiary)] disabled:bg-gray-500 disabled:opacity-70 transition-colors"
        },
            isRegenerating ? 
                React.createElement('div', { className: 'h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin' }) :
                React.createElement(SparklesIcon, { className: "h-4 w-4" })
        )
    );
};

const StoryArcForm = ({ arc, onUpdate, onRemove, onGenerate, onRewrite, canGenerate, isOnlyArc }) => {
    const { t } = useTranslation();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleFieldChange = (field, value) => {
        onUpdate({ ...arc, [field]: value });
    };

    const handleGenerateAll = async () => {
        if (!canGenerate || isGenerating) return;
        setIsGenerating(true);
        const context = arc.title || arc.premise || 'a classic fantasy adventure';
        const generatedContent = await onGenerate('mainStoryArc', context);
        if (generatedContent) {
            onUpdate({ ...arc, ...generatedContent });
        }
        setIsGenerating(false);
    };

    const fields = [
        { key: 'title', placeholder: t('title'), type: 'text' },
        { key: 'premise', placeholder: t('premisePlaceholder'), type: 'textarea' },
        { key: 'hook', placeholder: t('hookPlaceholder'), type: 'textarea' },
        { key: 'objective', placeholder: t('objectivePlaceholder'), type: 'text' },
        { key: 'stakes', placeholder: t('stakesPlaceholder'), type: 'text' },
        { key: 'climax', placeholder: t('climaxPlaceholder'), type: 'textarea' },
        { key: 'resolution', placeholder: t('resolutionPlaceholder'), type: 'textarea' },
    ];

    return React.createElement('div', { className: 'p-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)]' },
        React.createElement('div', { className: 'flex justify-between items-center mb-4' },
            React.createElement('h3', { className: 'text-xl font-semibold text-[var(--accent-primary)]' }, arc.title || t('mainStoryArc')),
            React.createElement('div', { className: 'flex gap-2' },
                React.createElement('button', { onClick: handleGenerateAll, disabled: !canGenerate || isGenerating, className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors disabled:opacity-50" },
                    React.createElement(SparklesIcon, { className: 'h-5 w-5 mr-1' }),
                    isGenerating ? t('generating') : t('generateAll')
                ),
                !isOnlyArc && React.createElement('button', { onClick: onRemove, 'aria-label': t('removeStoryArc'), className: 'p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors' },
                     React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" }))
                )
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            fields.map(({ key, placeholder, type }) =>
                React.createElement('div', { key, className: key === 'title' || key === 'premise' || key === 'climax' || key === 'resolution' ? 'md:col-span-2' : '' },
                    React.createElement(RegenerableInput, {
                        label: t(key),
                        value: arc[key],
                        placeholder,
                        type,
                        onChange: (value) => handleFieldChange(key, value),
                        onRegenerate: onRewrite,
                        canGenerate
                    })
                )
            )
        )
    );
};

const MainStoryArcManager = ({ storyArcs, onAdd, onUpdate, onRemove, onGenerate, onRewrite, canGenerate }) => {
    const { t } = useTranslation();
    
    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] mb-4", style: { fontFamily: 'serif' } }, `${t('mainStoryArc')} (${storyArcs.length})`),
        React.createElement('div', { className: 'space-y-6' },
            storyArcs.map(arc => 
                React.createElement(StoryArcForm, {
                    key: arc.id,
                    arc,
                    onUpdate: onUpdate,
                    onRemove: () => onRemove(arc.id),
                    onGenerate,
                    onRewrite,
                    canGenerate,
                    isOnlyArc: storyArcs.length <= 1
                })
            )
        ),
        React.createElement('div', { className: 'mt-6 flex justify-center' },
            React.createElement('button', { onClick: onAdd, className: 'flex items-center px-4 py-2 rounded-lg bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white' }, 
                React.createElement(PlusIcon, { className: 'mr-1' }),
                t('addMainStoryArc')
            )
        )
    );
};


// A generic collapsible section component
const SectionManager = ({ title, items, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8" },
        React.createElement('button', { onClick: () => setIsOpen(!isOpen), className: 'w-full flex justify-between items-center p-4 bg-[var(--bg-secondary)]/80 rounded-t-lg border border-b-0 border-[var(--border-accent)]/50' },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, `${title} (${items.length})`),
            React.createElement(ChevronDownIcon, { open: isOpen })
        ),
        isOpen && React.createElement('div', { className: 'p-6 bg-[var(--bg-secondary)]/60 rounded-b-lg border border-t-0 border-[var(--border-accent)]/50 animate-fade-in' }, children)
    );
};

const EditableCard = ({ item, fieldsConfig, onUpdate, onRemove, onRewrite, canGenerate }) => {
    const { t } = useTranslation();
    const [isRewriting, setIsRewriting] = useState({});

    const handleFieldChange = (key, value) => {
        onUpdate({ ...item, [key]: value });
    };

    const handleRewrite = async (key, text) => {
        if (!text || !canGenerate || isRewriting[key]) return;
        setIsRewriting(prev => ({ ...prev, [key]: true }));
        const rewrittenText = await onRewrite(text);
        if (rewrittenText && rewrittenText !== text) {
            handleFieldChange(key, rewrittenText);
        }
        setIsRewriting(prev => ({ ...prev, [key]: false }));
    };

    return React.createElement('div', { className: 'p-4 bg-[var(--bg-primary)]/70 rounded-lg border border-[var(--border-secondary)]' },
        React.createElement('div', { className: 'flex justify-end mb-2 -mt-2 -mr-2' },
            React.createElement('button', { onClick: () => onRemove(item.id), 'aria-label': t('remove'), className: 'p-1.5 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors' },
                React.createElement(TrashIcon)
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            fieldsConfig.map(field => React.createElement('div', { key: field.key, className: field.span === 2 ? 'md:col-span-2' : '' },
                React.createElement('label', { className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, t(field.label)),
                field.type === 'select' ?
                    React.createElement('select', {
                        value: item[field.key] || '',
                        onChange: e => handleFieldChange(field.key, e.target.value),
                        className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]"
                    },
                        field.options.map(opt => React.createElement('option', { key: opt.value, value: opt.value }, t(opt.label)))
                    ) :
                    React.createElement('div', { className: 'relative' },
                        React.createElement(field.type === 'textarea' ? 'textarea' : 'input', {
                            type: field.type === 'textarea' ? undefined : field.type,
                            value: item[field.key] || '',
                            onChange: e => handleFieldChange(field.key, e.target.value),
                            placeholder: field.placeholder ? t(field.placeholder) : '',
                            className: `w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] ${field.type === 'textarea' ? 'h-24 resize-none' : ''} ${field.regenerable ? 'pr-10' : ''}`
                        }),
                        field.regenerable && React.createElement('button', {
                            type: "button",
                            onClick: () => handleRewrite(field.key, item[field.key]),
                            disabled: !canGenerate || isRewriting[field.key] || !item[field.key],
                            title: t('regenerate'),
                            className: "absolute top-2 right-2 p-1.5 rounded-full text-white bg-[var(--accent-tertiary)]/70 hover:bg-[var(--accent-tertiary)] disabled:bg-gray-500 disabled:opacity-70 transition-colors"
                        },
                            isRewriting[field.key] ?
                                React.createElement('div', { className: 'h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin' }) :
                                React.createElement(SparklesIcon, { className: "h-4 w-4" })
                        )
                    )
            ))
        )
    );
};

const sectionConfigs = {
    locations: {
        title: 'locations',
        addLabel: 'addLocation',
        emptyLabel: 'noLocations',
        fields: [
            { key: 'name', label: 'locationName', type: 'text', span: 2 },
            { key: 'description', label: 'description', type: 'textarea', regenerable: true, span: 2 },
            { key: 'keyFeatures', label: 'keyFeatures', type: 'text', placeholder: 'keyFeaturesPlaceholder', span: 2 },
        ]
    },
    events: {
        title: 'eventsEncounters',
        addLabel: 'addEvent',
        emptyLabel: 'noEvents',
        fields: [
            { key: 'eventType', label: 'eventType', type: 'select', options: [{ value: 'social', label: 'social' }, { value: 'combat', label: 'combat' }, { value: 'puzzle', label: 'puzzle' }, { value: 'exploration', label: 'exploration' }] },
            { key: 'clue', label: 'infoClueGained', type: 'text' },
            { key: 'description', label: 'description', type: 'textarea', regenerable: true, span: 2 },
            { key: 'outcome', label: 'successFailureOutcome', type: 'textarea', regenerable: true, span: 2 },
        ]
    },
    npcs: {
        title: 'npcs',
        addLabel: 'addNpcOS',
        emptyLabel: 'noNpcsOS',
        fields: [
            { key: 'name', label: 'npcNamePlaceholder', type: 'text' },
            { key: 'role', label: 'npcRole', type: 'text', placeholder: 'npcRolePlaceholder' },
            { key: 'keyCharacteristic', label: 'keyCharacteristic', type: 'textarea', regenerable: true, placeholder: 'keyCharacteristicPlaceholder', span: 2 },
            { key: 'motivation', label: 'motivation', type: 'textarea', regenerable: true, placeholder: 'motivationPlaceholder' },
            { key: 'keyInformation', label: 'keyInformation', type: 'textarea', regenerable: true, placeholder: 'keyInformationPlaceholder' },
        ]
    },
    items: {
        title: 'itemsRewards',
        addLabel: 'addItemReward',
        emptyLabel: 'noItems',
        fields: [
            { key: 'name', label: 'itemNamePlaceholder', type: 'text' },
            { key: 'itemType', label: 'itemType', type: 'select', options: [{ value: 'artifact', label: 'artifact' }, { value: 'consumable', label: 'consumable' }, { value: 'loot', label: 'loot' }, { value: 'keyItem', label: 'keyItem' }] },
            { key: 'effect', label: 'effect', type: 'textarea', regenerable: true, span: 2 },
            { key: 'locationFound', label: 'locationFound', type: 'text', span: 2 },
        ]
    }
};

const emptyItemTemplates = {
    locations: { name: '', description: '', keyFeatures: '' },
    events: { eventType: 'social', description: '', clue: '', outcome: '' },
    npcs: { name: '', role: '', keyCharacteristic: '', motivation: '', keyInformation: '' },
    items: { name: '', itemType: 'loot', effect: '', locationFound: '' },
};

const OneShotDashboard = ({ oneShot, onUpdate, onAddHero, onUpdateHero, onRemoveHero, onAddMonster, onUpdateMonster, onRemoveMonster, onGenerate, onRewrite, canGenerate }) => {
    const { t } = useTranslation();

    const handleStoryArcUpdate = (updatedArc) => {
        const updatedArcs = (oneShot.mainStoryArcs || []).map(arc => arc.id === updatedArc.id ? updatedArc : arc);
        onUpdate({ ...oneShot, mainStoryArcs: updatedArcs });
    };
    
    const handleAddStoryArc = () => {
        const newArc = {
            id: crypto.randomUUID(),
            title: t('newStoryArc'),
            premise: '', hook: '', objective: '', stakes: '', climax: '', resolution: ''
        };
        const existingArcs = oneShot.mainStoryArcs || [];
        onUpdate({ ...oneShot, mainStoryArcs: [...existingArcs, newArc] });
    };

    const handleRemoveStoryArc = (idToRemove) => {
        const updatedArcs = (oneShot.mainStoryArcs || []).filter(arc => arc.id !== idToRemove);
        onUpdate({ ...oneShot, mainStoryArcs: updatedArcs });
    };

    const handleAddItem = (sectionKey) => {
        const newItem = { ...emptyItemTemplates[sectionKey], id: crypto.randomUUID() };
        const updatedItems = [...(oneShot[sectionKey] || []), newItem];
        onUpdate({ ...oneShot, [sectionKey]: updatedItems });
    };

    const handleUpdateItem = (sectionKey, updatedItem) => {
        const updatedItems = (oneShot[sectionKey] || []).map(item => item.id === updatedItem.id ? updatedItem : item);
        onUpdate({ ...oneShot, [sectionKey]: updatedItems });
    };

    const handleRemoveItem = (sectionKey, itemId) => {
        const updatedItems = (oneShot[sectionKey] || []).filter(item => item.id !== itemId);
        onUpdate({ ...oneShot, [sectionKey]: updatedItems });
    };


    return React.createElement('div', { className: "animate-fade-in pb-8" },
        React.createElement('div', { className: "w-full max-w-4xl mx-auto text-center mt-8" },
            React.createElement(CampaignNameEditor, { campaign: oneShot, onUpdate: onUpdate, field: 'title' })
        ),
        React.createElement(HeroManager, { heroes: oneShot.heroes || [], onAddHero, onUpdateHero, onRemoveHero }),
        React.createElement(MonsterManager, { monsters: oneShot.monsters || [], onAddMonster, onUpdateMonster, onRemoveMonster }),
        React.createElement(MainStoryArcManager, {
            storyArcs: oneShot.mainStoryArcs || [],
            onUpdate: handleStoryArcUpdate,
            onAdd: handleAddStoryArc,
            onRemove: handleRemoveStoryArc,
            onGenerate,
            onRewrite,
            canGenerate,
        }),
        
        ...Object.entries(sectionConfigs).map(([key, config]) => {
            const items = oneShot[key] || [];
            return React.createElement(SectionManager, { key, title: t(config.title), items },
                React.createElement('div', { className: 'flex justify-end mb-4' },
                    React.createElement('button', {
                        onClick: () => handleAddItem(key),
                        className: 'flex items-center px-4 py-2 rounded-lg bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white'
                    },
                        React.createElement(PlusIcon, { className: 'mr-1' }),
                        t(config.addLabel)
                    )
                ),
                items.length > 0 ?
                    React.createElement('div', { className: 'space-y-4' },
                        items.map(item => React.createElement(EditableCard, {
                            key: item.id,
                            item,
                            fieldsConfig: config.fields,
                            onUpdate: (updated) => handleUpdateItem(key, updated),
                            onRemove: () => handleRemoveItem(key, item.id),
                            onRewrite,
                            canGenerate
                        }))
                    )
                    : React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t(config.emptyLabel))
            );
        })
    );
};

export default OneShotDashboard;

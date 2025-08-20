

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { heroTemplates } from '../data/templates.js';

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
const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 2a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1V5a1 1 0 011-1zm6 6a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zM6 13a1 1 0 011 1v1h1a1 1 0 010 2H7v1a1 1 0 01-2 0v-1H4a1 1 0 010-2h1v-1a1 1 0 011-1z", clipRule: "evenodd" })
);
const MiniSpinner = ({ className = "h-8 w-8 text-white" }) => React.createElement('svg', { className: `animate-spin ${className}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
    React.createElement('circle', { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
    React.createElement('path', { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
);

const HeroManager = ({ heroes, onAddHero, onUpdateHero, onRemoveHero, onGeneratePortrait, gameSystem }) => {
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingHero, setEditingHero] = useState(null);
    const [generatingPortraitFor, setGeneratingPortraitFor] = useState(null);
    
    // Form State
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [heroClass, setHeroClass] = useState('');
    const [appearance, setAppearance] = useState('');
    const [background, setBackground] = useState('');
    const [status, setStatus] = useState('Healthy');
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (editingHero) {
            setName(editingHero.name);
            setGender(editingHero.gender);
            setAge(editingHero.age);
            setRace(editingHero.race);
            setHeroClass(editingHero.class);
            setAppearance(editingHero.appearance);
            setBackground(editingHero.background);
            setStatus(editingHero.status);
            setStats(editingHero.stats || {});
            setIsFormVisible(true);
        } else {
            resetForm();
        }
    }, [editingHero]);

    const resetForm = () => {
        setName(''); setGender(''); setAge(''); setRace(''); setHeroClass('');
        setAppearance(''); setBackground(''); setStatus('Healthy');
        setStats({});
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
            const systemStats = gameSystem === 'D&D' ? template.stats.dd : template.stats.fu;
            const { stats, ...restOfTemplate } = template;
            onAddHero({ ...restOfTemplate, status: 'Healthy', stats: systemStats });
        }
        e.target.value = ''; // Reset select
    };

    const handleGeneratePortraitClick = async (heroId) => {
        setGeneratingPortraitFor(heroId);
        try {
            await onGeneratePortrait(heroId);
        } catch (error) {
            // Error is handled in App.js, but we can stop loading here
            console.error("Portrait generation failed for hero:", heroId);
        } finally {
            setGeneratingPortraitFor(null);
        }
    };
    
    const handleStatChange = (statName, value) => {
        const isDd = gameSystem === 'D&D';
        setStats(prevStats => ({
            ...prevStats,
            [statName]: isDd ? (value ? parseInt(value, 10) : 0) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && background.trim() && status.trim()) {
            const heroData = { name, gender, age, race, class: heroClass, appearance, background, status, stats };
            if (editingHero) {
                onUpdateHero({ ...editingHero, ...heroData });
            } else {
                onAddHero(heroData);
            }
            setIsFormVisible(false);
            setEditingHero(null);
        }
    };
    
    const StatInput = ({ statKey, placeholder }) => React.createElement('div', null,
        React.createElement('label', { htmlFor: `stat-${statKey}`, className:"block text-sm font-medium text-[var(--text-secondary)] mb-1" }, t(statKey)),
        React.createElement('input', {
            id: `stat-${statKey}`,
            type: "number",
            placeholder: placeholder,
            value: stats[statKey] || '',
            onChange: e => handleStatChange(statKey, e.target.value),
            className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]"
        })
    );

    const StatSelect = ({ statKey }) => React.createElement('div', null,
        React.createElement('label', { htmlFor: `stat-${statKey}`, className:"block text-sm font-medium text-[var(--text-secondary)] mb-1" }, t(statKey)),
        React.createElement('select', {
            id: `stat-${statKey}`,
            value: stats[statKey] || 'd6',
            onChange: e => handleStatChange(statKey, e.target.value),
            className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]"
        },
            React.createElement('option', { value: "d6" }, "d6"),
            React.createElement('option', { value: "d8" }, "d8"),
            React.createElement('option', { value: "d10" }, "d10"),
            React.createElement('option', { value: "d12" }, "d12")
        )
    );

    const form = React.createElement('form', { onSubmit: handleSubmit, className: "p-4 mb-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)] animate-fade-in flex flex-col gap-4" },
        React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)]" }, editingHero ? t('editHeroTitle') : t('addHeroTitle')),
        React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
            React.createElement('input', { type: "text", placeholder: t('heroNamePlaceholder'), value: name, onChange: e => setName(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]", required: true }),
            React.createElement('input', { type: "text", placeholder: t('heroGenderPlaceholder'), value: gender, onChange: e => setGender(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('heroAgePlaceholder'), value: age, onChange: e => setAge(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('heroRacePlaceholder'), value: race, onChange: e => setRace(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('heroClassPlaceholder'), value: heroClass, onChange: e => setHeroClass(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]" }),
            React.createElement('input', { type: "text", placeholder: t('statusPlaceholder'), value: status, onChange: e => setStatus(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]", required: true })
        ),
        React.createElement('textarea', { placeholder: t('heroAppearancePlaceholder'), value: appearance, onChange: e => setAppearance(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] h-20 resize-none" }),
        React.createElement('textarea', { placeholder: t('backgroundPlaceholder'), value: background, onChange: e => setBackground(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] h-24 resize-none", required: true }),
        React.createElement('div', { className: "border-t border-[var(--border-primary)] my-2" }),
        React.createElement('h4', { className: "text-lg font-semibold text-[var(--text-secondary)]" }, t('attributes')),
        React.createElement('div', { className: `grid grid-cols-2 md:grid-cols-${gameSystem === 'D&D' ? 3 : 4} gap-4 mt-2` },
            gameSystem === 'D&D' && React.createElement(React.Fragment, null,
                React.createElement(StatInput, { statKey: 'str', placeholder: t('strPlaceholder') }),
                React.createElement(StatInput, { statKey: 'dex', placeholder: t('dexPlaceholder') }),
                React.createElement(StatInput, { statKey: 'con', placeholder: t('conPlaceholder') }),
                React.createElement(StatInput, { statKey: 'int', placeholder: t('intPlaceholder') }),
                React.createElement(StatInput, { statKey: 'wis', placeholder: t('wisPlaceholder') }),
                React.createElement(StatInput, { statKey: 'cha', placeholder: t('chaPlaceholder') })
            ),
            gameSystem === 'Fabula Ultima' && React.createElement(React.Fragment, null,
                React.createElement(StatSelect, { statKey: 'dex' }),
                React.createElement(StatSelect, { statKey: 'ins' }),
                React.createElement(StatSelect, { statKey: 'mig' }),
                React.createElement(StatSelect, { statKey: 'wlp' })
            )
        ),
        React.createElement('div', { className: "flex justify-end gap-4 mt-4" },
            React.createElement('button', { type: "button", onClick: handleCancel, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors" }, t('cancel')),
            React.createElement('button', { type: "submit", className: "px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)]" }, editingHero ? t('updateHero') : t('saveHero'))
        )
    );

    const heroList = heroes.length === 0 ?
        React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t('noHeroes')) :
        heroes.map(hero => React.createElement('div', { key: hero.id, className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex flex-col md:flex-row items-start gap-4" },
            React.createElement('div', { className: "w-full md:w-40 flex-shrink-0" },
                hero.imageUrl ?
                    React.createElement(React.Fragment, null,
                        React.createElement('div', { className: "aspect-[3/4] w-full bg-[var(--bg-secondary)] rounded flex items-center justify-center relative overflow-hidden" },
                            generatingPortraitFor === hero.id && React.createElement('div', { className: "absolute inset-0 bg-black/50 flex items-center justify-center z-10" }, React.createElement(MiniSpinner, null)),
                            React.createElement('img', { src: hero.imageUrl, alt: `Portrait of ${hero.name}`, className: "w-full h-full object-cover" })
                        ),
                        generatingPortraitFor !== hero.id &&
                            React.createElement('button', {
                                onClick: () => handleGeneratePortraitClick(hero.id),
                                className: "mt-2 w-full flex items-center justify-center px-3 py-1 text-xs rounded-lg bg-teal-700/80 hover:bg-teal-700 text-white transition-colors duration-300"
                            }, React.createElement(SparklesIcon, null), " ", t('regeneratePortrait'))
                    ) :
                    React.createElement('div', { className: "w-full h-full flex items-center justify-center" },
                        React.createElement('button', {
                            onClick: () => handleGeneratePortraitClick(hero.id),
                            disabled: generatingPortraitFor === hero.id,
                            className: "w-full flex items-center justify-center px-3 py-2 text-sm rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-wait"
                        },
                            generatingPortraitFor === hero.id ?
                                React.createElement(MiniSpinner, { className: "h-5 w-5 text-white" }) :
                                React.createElement(React.Fragment, null, React.createElement(SparklesIcon, null), " ", t('generatePortrait'))
                        )
                    )
            ),
            React.createElement('div', { className: "flex-grow" },
                React.createElement('div', { className: "flex justify-between items-start" },
                    React.createElement('div', null,
                        React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, hero.name),
                        React.createElement('p', { className: "text-sm text-[var(--text-muted)] mt-1" }, `${hero.age}, ${hero.gender} ${hero.race} ${hero.class}`),
                        React.createElement('p', { className: "text-sm text-[var(--text-muted)]" }, React.createElement('span', { className: "font-semibold text-[var(--text-secondary)]" }, `${t('status')}:`), ` ${hero.status}`)
                    ),
                    React.createElement('div', { className: "flex-shrink-0 flex gap-2" },
                        React.createElement('button', { onClick: () => setEditingHero(hero), className: "p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 rounded-full transition-colors duration-200", 'aria-label': `${t('edit')} ${hero.name}` }, React.createElement(PencilIcon, null)),
                        React.createElement('button', { onClick: () => onRemoveHero(hero.id), className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors duration-200", 'aria-label': `${t('remove')} ${hero.name}` }, React.createElement(TrashIcon, null))
                    )
                ),
                React.createElement('div', { className: "flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[var(--text-secondary)]" },
                    hero.stats && gameSystem === 'D&D' && ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat =>
                        React.createElement('span', { key: stat }, React.createElement('b', null, `${t(stat)}:`), ` ${hero.stats[stat] || 10}`)
                    ),
                    hero.stats && gameSystem === 'Fabula Ultima' && ['dex', 'ins', 'mig', 'wlp'].map(stat =>
                        React.createElement('span', { key: stat }, React.createElement('b', null, `${t(stat)}:`), ` ${hero.stats[stat] || 'd6'}`)
                    )
                ),
                React.createElement('div', { className: "mt-3 border-t border-[var(--border-secondary)] pt-3" },
                    React.createElement('p', { className: "text-[var(--text-secondary)]" }, React.createElement('span', { className: "font-semibold" }, `${t('appearance')}:`), ` ${hero.appearance}`),
                    React.createElement('p', { className: "text-[var(--text-muted)] mt-2 whitespace-pre-wrap" }, hero.background)
                )
            )
        ));

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex flex-wrap gap-4 justify-between items-center mb-4" },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('partyRoster')),
            React.createElement('div', { className: "flex gap-2" },
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
        React.createElement('div', { className: "space-y-4" }, heroList)
    );
};

export default HeroManager;

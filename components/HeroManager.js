


import React, { useState, useEffect, useMemo } from 'react';
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
const PlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" })
);


const HeroManager = ({ heroes, onAddHero, onUpdateHero, onRemoveHero, gameSystem }) => {
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingHero, setEditingHero] = useState(null);
    
    // Form State
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [heroClass, setHeroClass] = useState('');
    const [appearance, setAppearance] = useState('');
    const [background, setBackground] = useState('');
    const [status, setStatus] = useState('Healthy');
    const [stats, setStats] = useState([]);
    const [inventory, setInventory] = useState([]);

    const resetForm = () => {
        setName(''); setGender(''); setAge(''); setRace(''); setHeroClass('');
        setAppearance(''); setBackground(''); setStatus('Healthy');
        setStats([
            { id: crypto.randomUUID(), key: t('maxHP'), value: '10' },
            { id: crypto.randomUUID(), key: t('currentHP'), value: '10' },
        ]);
        setInventory([]);
    };

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

            setIsFormVisible(true);
        } else {
            resetForm();
        }
    }, [editingHero, t]);

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
            onAddHero({ ...restOfTemplate, status: 'Healthy', inventory: [], stats: [...defaultHP, ...statsArray] });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && background.trim() && status.trim()) {
            const finalStats = stats
                .filter(s => s.key.trim() !== '')
                .map(({ id, ...rest }) => rest);

            const finalInventory = inventory
                .filter(i => i.name.trim() !== '')
                .map(({ id, ...rest }) => rest);

            const heroData = { name, gender, age, race, class: heroClass, appearance, background, status, stats: finalStats, inventory: finalInventory };
            if (editingHero) {
                onUpdateHero({ ...editingHero, ...heroData });
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
            React.createElement('button', { type: "button", onClick: handleCancel, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors" }, t('cancel')),
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

        return React.createElement('div', { className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex flex-col md:flex-row items-start gap-4" },
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
                )
            )
        );
    };

    const heroList = heroes.length === 0 ?
        React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t('noHeroes')) :
        heroes.map(hero => React.createElement(HeroCard, { key: hero.id, hero: hero }));

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
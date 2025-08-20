import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

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

const MonsterManager = ({ monsters, onAddMonster, onUpdateMonster, onRemoveMonster }) => {
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingMonster, setEditingMonster] = useState(null);
    
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [inventory, setInventory] = useState([]);

    const resetForm = () => {
        setName('');
        setAttributes([]);
        setInventory([]);
    };

    useEffect(() => {
        if (editingMonster) {
            setName(editingMonster.name);
            setAttributes((editingMonster.attributes || []).map(s => ({ ...s, id: crypto.randomUUID() })));
            setInventory((editingMonster.inventory || []).map(i => ({ ...i, id: crypto.randomUUID() })));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            const finalAttributes = attributes
                .filter(s => s.key.trim() !== '')
                .map(({ id, ...rest }) => rest);

            const finalInventory = inventory
                .filter(i => i.name.trim() !== '')
                .map(({ id, ...rest }) => rest);

            const monsterData = { name, attributes: finalAttributes, inventory: finalInventory };
            if (editingMonster) {
                onUpdateMonster({ ...editingMonster, ...monsterData });
            } else {
                onAddMonster(monsterData);
            }
            setIsFormVisible(false);
            setEditingMonster(null);
        }
    };

    const form = React.createElement('form', { onSubmit: handleSubmit, className: "p-4 mb-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)] animate-fade-in flex flex-col gap-4" },
        React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)]" }, editingMonster ? t('editMonsterTitle') : t('addMonsterTitle')),
        React.createElement('input', { type: "text", placeholder: t('monsterNamePlaceholder'), value: name, onChange: e => setName(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]", required: true }),
        
        // Attributes Section
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
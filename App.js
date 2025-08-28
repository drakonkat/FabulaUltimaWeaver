

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { generateStory, rewriteText, generateCharacterBackground, generateOneShotContent } from './services/geminiService.js';
import Header from './components/Header.js';
import PromptInput from './components/PromptInput.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import StoryDisplay from './components/StoryDisplay.js';
import HeroManager from './components/HeroManager.js';
import MonsterManager from './components/MonsterManager.js';
import ContinuationInput from './components/ContinuationInput.js';
import CampaignList from './components/CampaignList.js';
import OneShotList from './components/OneShotList.js';
import OneShotDashboard from './components/OneShotDashboard.js';
import BackupManager from './components/BackupManager.js';
import LoginScreen from './components/LoginScreen.js';
import Footer from './components/Footer.js';
import { LanguageProvider, useTranslation } from './hooks/useTranslation.js';
import { ThemeContext } from './hooks/useTheme.js';
import { MAX_CAMPAIGNS, MAX_DAILY_PROMPTS, GOOGLE_CLIENT_ID } from './config.js';
import { exampleCampaignData } from './data/exampleCampaign.js';
import BottomNavBar from './components/BottomNavBar.js';
import ModeSwitcher from './components/ModeSwitcher.js';
import GMViewSwitcher from './components/GMViewSwitcher.js';
import CampaignNameEditor from './components/CampaignNameEditor.js';
import BattleMapManager from './components/BattleMapManager.js';


// START: Confirmation Modal
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/70 z-[100] flex items-center justify-center animate-fade-in",
        'aria-modal': true,
        role: "dialog"
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl p-6 w-full max-w-md m-4 border-2 border-[var(--border-accent)]"
        },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] mb-4" }, title),
            React.createElement('p', { className: "text-[var(--text-secondary)] mb-6" }, message),
            React.createElement('div', { className: "flex justify-end gap-4" },
                React.createElement('button', {
                    onClick: onClose,
                    className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors"
                }, t('cancel')),
                React.createElement('button', {
                    onClick: onConfirm,
                    className: "px-6 py-2 font-bold text-white rounded-lg bg-[var(--danger)] hover:opacity-90 transition-opacity"
                }, t('confirmDelete'))
            )
        )
    );
};
// END: Confirmation Modal

// START: Backup Modal
const BackupModal = ({ isOpen, onClose, appState, onLoad }) => {
    if (!isOpen) return null;

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/70 z-[100] flex items-center justify-center animate-fade-in",
        'aria-modal': true,
        role: "dialog",
        onClick: onClose
    },
        React.createElement('div', {
            className: "relative bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-2xl m-4 border-2 border-[var(--border-accent)]",
            onClick: e => e.stopPropagation()
        },
            React.createElement('button', {
                onClick: onClose,
                className: "absolute top-3 right-3 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--bg-tertiary)] transition-colors",
                'aria-label': "Close"
            },
                React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })
                )
            ),
            React.createElement(BackupManager, { appState, onLoad })
        )
    );
};
// END: Backup Modal

const BattleMapIcon = ({ isOpen }) => React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-8 w-8 transition-transform duration-300 text-white ${isOpen ? 'rotate-90' : ''}`,
    viewBox: "0 0 24 24",
    fill: "currentColor"
}, React.createElement('path', { d: "M18.6 3.4c-1.2-1.2-3.1-1.2-4.2 0L3.4 14.4c-1.2 1.2-1.2 3.1 0 4.2c.6.6 1.4 1 2.1 1s1.5-.4 2.1-1l11-11c1.2-1.2 1.2-3.1 0-4.2zm-2.8 1.4c.4-.4 1-.4 1.4 0c.4.4.4 1 0 1.4l-1.4 1.4l-1.4-1.4l1.4-1.4zm-10 10c-.4.4-.4 1 0 1.4c.4.4 1 .4 1.4 0l1.4-1.4l-1.4-1.4l-1.4 1.4z" }));


// START: Dice Roller Components
const DieResultIcon = () => React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4 text-[var(--accent-primary)]",
    viewBox: "0 0 24 24",
    fill: "currentColor"
}, React.createElement('path', { d: "M12 2L4.5 6.5L6 15.5L12 20L18 15.5L19.5 6.5L12 2ZM12 4.47L17.2 7.5L16 14.5L12 17.53L8 14.5L6.8 7.5L12 4.47Z" }));

const DiceIcon = ({ isOpen }) => React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-8 w-8 transition-transform duration-300 text-white ${isOpen ? 'rotate-90' : ''}`,
    viewBox: "0 0 24 24",
    fill: "currentColor"
},
    React.createElement('path', { d: "M21 5.00002C21 3.89545 20.1046 3.00002 19 3.00002H5C3.89543 3.00002 3 3.89545 3 5.00002V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5.00002Z M8 13.5C8 14.3284 7.32843 15 6.5 15C5.67157 15 5 14.3284 5 13.5C5 12.6716 5.67157 12 6.5 12C7.32843 12 8 12.6716 8 13.5Z M13 13.5C13 14.3284 12.3284 15 11.5 15C10.6716 15 10 14.3284 10 13.5C10 12.6716 10.6716 12 11.5 12C12.3284 12 13 12.6716 13 13.5Z M13 8.5C13 9.32843 12.3284 10 11.5 10C10.6716 10 10 9.32843 10 8.5C10 7.67157 10.6716 7 11.5 7C12.3284 7 13 7.67157 13 8.5Z M18 13.5C18 14.3284 17.3284 15 16.5 15C15.6716 15 15 14.3284 15 13.5C15 12.6716 15.6716 12 16.5 12C17.3284 12 18 12.6716 18 13.5Z M18 8.5C18 9.32843 17.3284 10 16.5 10C15.6716 10 15 9.32843 15 8.5C15 7.67157 15.6716 7 16.5 7C17.3284 7 18 7.67157 18 8.5Z" })
);

const DiceRoller = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rolls, setRolls] = useState({});
    const node = useRef();

    const diceTypes = [4, 6, 8, 10, 12, 20, 100];

    const handleClickOutside = e => {
        if (node.current && !node.current.contains(e.target)) {
            setIsOpen(false);
            setRolls({});
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const rollDie = (sides) => {
        const result = Math.floor(Math.random() * sides) + 1;
        const dieKey = `d${sides}`;
        
        let type = 'normal';
        if (result === 1) {
            type = 'fumble';
        } else if (result === sides) {
            type = 'crit';
        }

        setRolls(prevRolls => {
            const currentResults = prevRolls[dieKey] || [];
            const newResults = [{ result, type }, ...currentResults].slice(0, 10);
            return { ...prevRolls, [dieKey]: newResults };
        });
    };
    
    const handleFabClick = () => {
        if (isOpen) {
            setRolls({});
        }
        setIsOpen(!isOpen);
    };

    const getRollClass = (type) => {
        const baseClasses = "flex items-center justify-center gap-1 w-12 h-10 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full text-lg font-semibold border-2";
        switch (type) {
            case 'crit':
                return `${baseClasses} border-[var(--highlight-secondary)] crit-roll`;
            case 'fumble':
                return `${baseClasses} border-[var(--danger)] fumble-roll`;
            default:
                return `${baseClasses} border-[var(--border-secondary)] animate-pop-in`;
        }
    };
    
    return React.createElement('div', { ref: node, className: "fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-end" },
        isOpen && React.createElement('div', { className: "flex flex-col items-end gap-2 mb-2 animate-fade-in-up" },
            diceTypes.slice().reverse().map(sides => 
                React.createElement('div', { key: sides, className: "flex items-center justify-end gap-3" },
                    React.createElement('div', { className: "flex flex-row-reverse gap-2 h-14 items-center" },
                         (rolls[`d${sides}`] || []).map((roll, index) => 
                            React.createElement('span', { 
                                key: index, 
                                className: getRollClass(roll.type)
                            }, React.createElement(DieResultIcon, null), roll.result)
                        )
                    ),
                    React.createElement('button', {
                        onClick: () => rollDie(sides),
                        className: "w-14 h-14 flex-shrink-0 flex items-center justify-center font-bold text-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-full shadow-lg hover:bg-[var(--bg-quaternary)] hover:scale-110 transition-all duration-200 border-2 border-[var(--border-accent-light)]"
                    }, `d${sides}`)
                )
            )
        ),
        React.createElement('button', {
            onClick: handleFabClick,
            'aria-label': 'Open dice roller',
            className: "w-16 h-16 bg-gradient-to-br from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
        }, React.createElement(DiceIcon, { isOpen: isOpen }))
    );
};
// END: Dice Roller Components

const getToday = () => new Date().toISOString().split('T')[0];

const defaultState = {
    version: 7,
    campaigns: [],
    oneShots: [],
    playerGames: [],
    maps: [],
    usage: {
        promptsToday: 0,
        lastPromptDate: getToday(),
    },
};

// START: PLAYER MODE COMPONENTS
const NpcManager = ({ npcs, onAdd, onUpdate, onRemove }) => {
    // This is a simplified manager for player notes on NPCs
    // For brevity, it's combined into a single component.
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingNpc, setEditingNpc] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingNpc) {
            setName(editingNpc.name);
            setDescription(editingNpc.description);
            setIsFormVisible(true);
        } else {
            setName('');
            setDescription('');
        }
    }, [editingNpc]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        const npcData = { name, description };
        if (editingNpc) {
            onUpdate({ ...editingNpc, ...npcData });
        } else {
            onAdd(npcData);
        }
        setIsFormVisible(false);
        setEditingNpc(null);
    };
    
    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex justify-between items-center mb-4" },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('npcNotes')),
            !isFormVisible && React.createElement('button', { onClick: () => setIsFormVisible(true), className: "flex items-center px-4 py-2 rounded-lg bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white" }, t('addNpc'))
        ),
        isFormVisible && React.createElement('form', { onSubmit: handleSubmit, className: "p-4 mb-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)] animate-fade-in flex flex-col gap-4" },
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)]" }, editingNpc ? t('editNpcTitle') : t('addNpcTitle')),
            React.createElement('input', { type: "text", placeholder: t('npcNamePlaceholder'), value: name, onChange: e => setName(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]", required: true }),
            React.createElement('textarea', { placeholder: t('npcDescriptionPlaceholder'), value: description, onChange: e => setDescription(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] h-24 resize-none" }),
            React.createElement('div', { className: "flex justify-end gap-4 mt-2" },
                React.createElement('button', { type: "button", onClick: () => { setIsFormVisible(false); setEditingNpc(null); }, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)]" }, t('cancel')),
                React.createElement('button', { type: "submit", className: "px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)]" }, editingNpc ? t('updateNpc') : t('saveNpc'))
            )
        ),
        npcs.length === 0 ? React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t('noNpcs')) :
        React.createElement('div', { className: "space-y-4" }, npcs.map(npc => React.createElement('div', { key: npc.id, className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)]" },
            React.createElement('div', { className: "flex justify-between items-start" },
                React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, npc.name),
                React.createElement('div', { className: "flex gap-2" },
                    React.createElement('button', { onClick: () => setEditingNpc(npc) }, "Edit"),
                    React.createElement('button', { onClick: () => onRemove(npc.id) }, "Remove")
                )
            ),
            React.createElement('p', { className: "text-[var(--text-muted)] mt-2 whitespace-pre-wrap" }, npc.description)
        )))
    );
};

const NotesManager = ({ notes, onAdd, onUpdate, onRemove, onRewrite }) => {
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [isRewriting, setIsRewriting] = useState(false);
    
    useEffect(() => {
        if (editingNote) {
            setKey(editingNote.key);
            setValue(editingNote.value);
            setIsFormVisible(true);
        } else {
            setKey('');
            setValue('');
        }
    }, [editingNote]);

    const handleRewriteClick = async () => {
        if (!value.trim() || isRewriting) return;
        setIsRewriting(true);
        const rewritten = await onRewrite(value);
        setValue(rewritten);
        setIsRewriting(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!key.trim()) return;
        const noteData = { key, value };
        if (editingNote) {
            onUpdate({ ...editingNote, ...noteData });
        } else {
            onAdd(noteData);
        }
        setIsFormVisible(false);
        setEditingNote(null);
    };
    
    const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1.5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm7-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" }));

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex justify-between items-center mb-4" },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('campaignNotes')),
            !isFormVisible && React.createElement('button', { onClick: () => setIsFormVisible(true), className: "flex items-center px-4 py-2 rounded-lg bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white" }, t('addNote'))
        ),
        isFormVisible && React.createElement('form', { onSubmit: handleSubmit, className: "p-4 mb-4 bg-[var(--bg-primary)]/50 rounded-lg border border-[var(--border-secondary)] animate-fade-in flex flex-col gap-4" },
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)]" }, editingNote ? t('editNoteTitle') : t('addNoteTitle')),
            React.createElement('input', { type: "text", placeholder: t('noteKeyPlaceholder'), value: key, onChange: e => setKey(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]", required: true }),
            React.createElement('div', { className: "relative" },
                React.createElement('textarea', { placeholder: t('noteValuePlaceholder'), value: value, onChange: e => setValue(e.target.value), className: "w-full p-2 bg-[var(--bg-secondary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] h-32 resize-none" }),
                React.createElement('button', { type: "button", onClick: handleRewriteClick, disabled: isRewriting, className: "absolute bottom-3 right-3 flex items-center px-2.5 py-1.5 text-xs rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors disabled:opacity-50" },
                  isRewriting ? t('rewriting') : React.createElement(React.Fragment, null, React.createElement(SparklesIcon), t('rewriteWithAI'))
                )
            ),
            React.createElement('div', { className: "flex justify-end gap-4 mt-2" },
                React.createElement('button', { type: "button", onClick: () => { setIsFormVisible(false); setEditingNote(null); }, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)]" }, t('cancel')),
                React.createElement('button', { type: "submit", className: "px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)]" }, editingNote ? t('updateNote') : t('saveNote'))
            )
        ),
        notes.length === 0 ? React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t('noNotes')) :
        React.createElement('div', { className: "space-y-4" }, notes.map(note => React.createElement('div', { key: note.id, className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)]" },
            React.createElement('div', { className: "flex justify-between items-start" },
                React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, note.key),
                React.createElement('div', { className: "flex gap-2" },
                    React.createElement('button', { onClick: () => setEditingNote(note) }, "Edit"),
                    React.createElement('button', { onClick: () => onRemove(note.id) }, "Remove")
                )
            ),
            React.createElement('p', { className: "text-[var(--text-muted)] mt-2 whitespace-pre-wrap" }, note.value)
        )))
    );
};

const PlayerGameList = ({ games, onSelect, onDelete, onNew, canCreate }) => {
    const { t, language } = useTranslation();
    const sortedGames = [...games].sort((a, b) => b.lastModified - a.lastModified);
    const formatDate = (ts) => new Date(ts).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' });

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex justify-between items-center mb-6" },
            React.createElement('h2', { className: "text-3xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('myGames')),
            React.createElement('button', { onClick: onNew, disabled: !canCreate, title: !canCreate ? t('limitGames') : '', className: "px-4 py-3 font-bold text-sm text-white rounded-lg transition-all bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] disabled:from-gray-500 disabled:to-gray-600" }, t('startNewGame'))
        ),
        sortedGames.length === 0 ? React.createElement('p', { className: "text-center py-8 text-[var(--text-muted)] italic text-lg" }, t('noGames')) :
        React.createElement('div', { className: "space-y-4" }, sortedGames.map(game =>
            React.createElement('div', { key: game.id, className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex justify-between items-center hover:border-[var(--border-accent-light)] transition-colors" },
                React.createElement('div', { className: "flex-grow cursor-pointer", onClick: () => onSelect(game.id) },
                    React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, game.name),
                    React.createElement('p', { className: "text-sm text-[var(--text-subtle)]" }, `${t('lastModified')}: ${formatDate(game.lastModified)}`)
                ),
                React.createElement('button', { onClick: (e) => { e.stopPropagation(); onDelete(game.id); }, className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)]" }, "Delete")
            )
        ))
    );
};

const PlayerDashboard = ({ game, onUpdate, onRewrite, onGenerateBackground, openConfirmModal }) => {
    const { t } = useTranslation();
    
    // Handlers for nested objects
    const handleHeroUpdate = (updatedHero) => onUpdate({ ...game, hero: updatedHero });
    const handleRemoveHero = () => openConfirmModal({
        title: t('removeHeroTitle'),
        message: t('removeHeroConfirmation'),
        onConfirm: () => onUpdate({ ...game, hero: null }),
    });
    const handleMonsterAdd = (monster) => onUpdate({ ...game, monsters: [...game.monsters, { ...monster, id: crypto.randomUUID() }] });
    const handleMonsterUpdate = (updated) => onUpdate({ ...game, monsters: game.monsters.map(m => m.id === updated.id ? updated : m) });
    const handleMonsterRemove = (id) => openConfirmModal({
        title: t('removeMonsterTitle'),
        message: t('removeMonsterConfirmation'),
        onConfirm: () => onUpdate({ ...game, monsters: game.monsters.filter(m => m.id !== id) })
    });
    const handleNpcAdd = (npc) => onUpdate({ ...game, npcs: [...game.npcs, { ...npc, id: crypto.randomUUID() }] });
    const handleNpcUpdate = (updated) => onUpdate({ ...game, npcs: game.npcs.map(n => n.id === updated.id ? updated : n) });
    const handleNpcRemove = (id) => openConfirmModal({
        title: t('removeNpcTitle'),
        message: t('removeNpcConfirmation'),
        onConfirm: () => onUpdate({ ...game, npcs: game.npcs.filter(n => n.id !== id) })
    });
    const handleNoteAdd = (note) => onUpdate({ ...game, notes: [...game.notes, { ...note, id: crypto.randomUUID() }] });
    const handleNoteUpdate = (updated) => onUpdate({ ...game, notes: game.notes.map(n => n.id === updated.id ? updated : n) });
    const handleNoteRemove = (id) => openConfirmModal({
        title: t('removeNoteTitle'),
        message: t('removeNoteConfirmation'),
        onConfirm: () => onUpdate({ ...game, notes: game.notes.filter(n => n.id !== id) })
    });

    return React.createElement('div', { className: "animate-fade-in" },
        React.createElement('div', { className: "w-full max-w-4xl mx-auto text-center mt-8" },
            React.createElement(CampaignNameEditor, { campaign: game, onUpdate: onUpdate })
        ),
        React.createElement(HeroManager, {
            heroes: game.hero ? [game.hero] : [],
            onAddHero: handleHeroUpdate, // onAddHero will just set the single hero
            onUpdateHero: handleHeroUpdate,
            onRemoveHero: handleRemoveHero,
            isPlayerView: true,
            onRewrite: onRewrite,
            onGenerateBackground: onGenerateBackground,
        }),
        React.createElement(NpcManager, {
            npcs: game.npcs || [],
            onAdd: handleNpcAdd,
            onUpdate: handleNpcUpdate,
            onRemove: handleNpcRemove,
        }),
        React.createElement(MonsterManager, {
            monsters: game.monsters || [],
            onAddMonster: handleMonsterAdd,
            onUpdateMonster: handleMonsterUpdate,
            onRemoveMonster: handleMonsterRemove,
        }),
        React.createElement(NotesManager, {
            notes: game.notes || [],
            onAdd: handleNoteAdd,
            onUpdate: handleNoteUpdate,
            onRemove: handleNoteRemove,
            onRewrite: onRewrite,
        })
    );
};
// END: PLAYER MODE COMPONENTS

const AppContent = () => {
  const isAnonymousMode = useMemo(() => GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE', []);
  
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(defaultState);
  const [appMode, setAppMode] = useState('gm');
  const [gmView, setGmView] = useState('campaigns'); // 'campaigns' or 'one-shots'
  const [activeCampaignId, setActiveCampaignId] = useState(null);
  const [activeOneShotId, setActiveOneShotId] = useState(null);
  const [activePlayerGameId, setActivePlayerGameId] = useState(null);
  const [activeMapId, setActiveMapId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language, t } = useTranslation();
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isMapManagerOpen, setIsMapManagerOpen] = useState(false);
  
  const [theme, setThemeState] = useState(() => {
    try {
        return localStorage.getItem('adventureWeaverTheme') || 'dark';
    } catch (e) {
        return 'dark';
    }
  });

  const setTheme = (newTheme) => {
    try {
        localStorage.setItem('adventureWeaverTheme', newTheme);
    } catch (e) {
        console.error("Failed to save theme to localStorage", e);
    }
    setThemeState(newTheme);
  };

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);


  const checkAndResetUsage = useCallback((currentUsage) => {
    const today = getToday();
    if (currentUsage.lastPromptDate !== today) {
        return { promptsToday: 0, lastPromptDate: today };
    }
    return currentUsage;
  }, []);

  const handleCredentialResponse = useCallback((response) => {
    try {
        const decoded = jwtDecode(response.credential);
        setUser(decoded);
    } catch (e) {
        console.error("Failed to decode credential", e);
        setError("Login failed. Please try again.");
    }
  }, []);
  
  useEffect(() => {
    if (isAnonymousMode || typeof window.google === 'undefined') {
        return;
    }
    window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
    });
  }, [isAnonymousMode, handleCredentialResponse]);

  const handleSignOut = () => {
    if (isAnonymousMode) return;
    setUser(null);
    setAppState(defaultState);
    setActiveCampaignId(null);
    setActiveOneShotId(null);
    setActivePlayerGameId(null);
    setActiveMapId(null);
  };

  useEffect(() => {
    let storageKey = null;
    if (isAnonymousMode) {
        storageKey = 'storyWeaverState_anonymous';
    } else if (user) {
        storageKey = `storyWeaverState_${user.sub}`;
    }

    if (!storageKey) return;

    try {
        const savedStateJSON = localStorage.getItem(storageKey);
        if (savedStateJSON) {
            const parsedState = JSON.parse(savedStateJSON);
            const { theme: savedTheme, ...restOfState } = parsedState;

            if (savedTheme) setTheme(savedTheme);
            
            const migratedState = {
                ...defaultState,
                ...restOfState,
                version: defaultState.version,
            };

            const usage = isAnonymousMode ? migratedState.usage : checkAndResetUsage(migratedState.usage);
            setAppState({ ...migratedState, usage });
        } else {
            setAppState(defaultState);
        }
    } catch (e) {
        console.error("Failed to load state from localStorage", e);
        setAppState(defaultState);
    }
  }, [user, isAnonymousMode, checkAndResetUsage]);

  useEffect(() => {
    let storageKey = null;
    if (isAnonymousMode) {
        storageKey = 'storyWeaverState_anonymous';
    } else if (user) {
        storageKey = `storyWeaverState_${user.sub}`;
    }
    
    if (storageKey) {
        try {
            const stateToSave = { ...appState, theme };
            const appStateJSON = JSON.stringify(stateToSave);
            localStorage.setItem(storageKey, appStateJSON);
        } catch (e) {
            console.error("Failed to save state to localStorage", e);
        }
    }
  }, [appState, theme, user, isAnonymousMode]);

  const activeCampaign = useMemo(() => appState.campaigns.find(c => c.id === activeCampaignId), [appState.campaigns, activeCampaignId]);
  const activeOneShot = useMemo(() => (appState.oneShots || []).find(os => os.id === activeOneShotId), [appState.oneShots, activeOneShotId]);
  const activePlayerGame = useMemo(() => appState.playerGames.find(g => g.id === activePlayerGameId), [appState.playerGames, activePlayerGameId]);

  const handleUpdateCampaign = (updatedCampaign) => {
    setAppState(prev => ({
        ...prev,
        campaigns: prev.campaigns.map(c => c.id === updatedCampaign.id ? { ...updatedCampaign, lastModified: Date.now() } : c),
    }));
  };
  
  const handleUpdateOneShot = (updatedOneShot) => {
    setAppState(prev => ({
        ...prev,
        oneShots: (prev.oneShots || []).map(os => os.id === updatedOneShot.id ? { ...updatedOneShot, lastModified: Date.now() } : os),
    }));
  };
  
  // Modal State
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const openConfirmModal = useCallback(({ title, message, onConfirm }) => {
    setModalState({ isOpen: true, title, message, onConfirm });
  }, []);

  const closeConfirmModal = useCallback(() => {
    setModalState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  }, []);

  const handleConfirm = useCallback(() => {
    if (modalState.onConfirm) {
        modalState.onConfirm();
    }
    closeConfirmModal();
  }, [modalState.onConfirm, closeConfirmModal]);

  const handleAddHero = useCallback((heroData) => {
    const newHero = { ...heroData, id: crypto.randomUUID() };
    if (activeCampaign) {
      const updatedHeroes = [...activeCampaign.heroes, newHero];
      handleUpdateCampaign({ ...activeCampaign, heroes: updatedHeroes });
    } else if (activeOneShot) {
      const updatedHeroes = [...activeOneShot.heroes, newHero];
      handleUpdateOneShot({ ...activeOneShot, heroes: updatedHeroes });
    }
  }, [activeCampaign, activeOneShot]);

  const handleUpdateHero = useCallback((updatedHero) => {
    if (activeCampaign) {
      const updatedHeroes = activeCampaign.heroes.map(h => h.id === updatedHero.id ? updatedHero : h);
      handleUpdateCampaign({ ...activeCampaign, heroes: updatedHeroes });
    } else if (activeOneShot) {
      const updatedHeroes = activeOneShot.heroes.map(h => h.id === updatedHero.id ? updatedHero : h);
      handleUpdateOneShot({ ...activeOneShot, heroes: updatedHeroes });
    }
  }, [activeCampaign, activeOneShot]);

  const handleRemoveHero = useCallback((id) => {
    openConfirmModal({
        title: t('removeHeroTitle'),
        message: t('removeHeroConfirmation'),
        onConfirm: () => {
            if (activeCampaign) {
              const updatedHeroes = activeCampaign.heroes.filter(hero => hero.id !== id);
              handleUpdateCampaign({ ...activeCampaign, heroes: updatedHeroes });
            } else if (activeOneShot) {
              const updatedHeroes = activeOneShot.heroes.filter(hero => hero.id !== id);
              handleUpdateOneShot({ ...activeOneShot, heroes: updatedHeroes });
            }
        }
    });
  }, [activeCampaign, activeOneShot, openConfirmModal, t]);
  
  const handleAddMonster = useCallback((monsterData) => {
    const newMonster = { ...monsterData, id: crypto.randomUUID() };
    if (activeCampaign) {
        const updatedMonsters = [...(activeCampaign.monsters || []), newMonster];
        handleUpdateCampaign({ ...activeCampaign, monsters: updatedMonsters });
    } else if (activeOneShot) {
        const updatedMonsters = [...(activeOneShot.monsters || []), newMonster];
        handleUpdateOneShot({ ...activeOneShot, monsters: updatedMonsters });
    }
  }, [activeCampaign, activeOneShot]);

  const handleUpdateMonster = useCallback((updatedMonster) => {
    if (activeCampaign) {
        const updatedMonsters = activeCampaign.monsters.map(m => m.id === updatedMonster.id ? updatedMonster : m);
        handleUpdateCampaign({ ...activeCampaign, monsters: updatedMonsters });
    } else if (activeOneShot) {
        const updatedMonsters = activeOneShot.monsters.map(m => m.id === updatedMonster.id ? updatedMonster : m);
        handleUpdateOneShot({ ...activeOneShot, monsters: updatedMonsters });
    }
  }, [activeCampaign, activeOneShot]);

  const handleRemoveMonster = useCallback((id) => {
    openConfirmModal({
        title: t('removeMonsterTitle'),
        message: t('removeMonsterConfirmation'),
        onConfirm: () => {
            if (activeCampaign) {
                const updatedMonsters = activeCampaign.monsters.filter(monster => monster.id !== id);
                handleUpdateCampaign({ ...activeCampaign, monsters: updatedMonsters });
            } else if (activeOneShot) {
                const updatedMonsters = activeOneShot.monsters.filter(monster => monster.id !== id);
                handleUpdateOneShot({ ...activeOneShot, monsters: updatedMonsters });
            }
        }
    });
  }, [activeCampaign, activeOneShot, openConfirmModal, t]);

  const canGenerate = useMemo(() => {
    if (isAnonymousMode) return true;
    const currentUsage = checkAndResetUsage(appState.usage);
    return currentUsage.promptsToday < MAX_DAILY_PROMPTS;
  }, [isAnonymousMode, appState.usage, checkAndResetUsage]);

  const incrementUsage = () => {
    if (isAnonymousMode) return;
    setAppState(prev => ({ ...prev, usage: { ...prev.usage, promptsToday: prev.usage.promptsToday + 1 } }));
  };

  const handleGenerate = useCallback(async (prompt, imageFile, gameSystem, campaignTone) => {
    if (!activeCampaign || !canGenerate) {
        if (!canGenerate) setError(t('limitDailyPrompts'));
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateStory(prompt, activeCampaign.heroes, activeCampaign.monsters, language, imageFile, gameSystem, campaignTone);
      const updatedCampaign = { 
          ...activeCampaign, 
          storyData: data, 
          name: data.storyName, 
          gameSettings: { system: gameSystem || 'Fabula Ultima', tone: campaignTone || 'High Fantasy' } 
      };
      handleUpdateCampaign(updatedCampaign);
      incrementUsage();
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCampaign, language, canGenerate, t, isAnonymousMode]);

  const handleContinue = useCallback(async (details) => {
    if (!activeCampaign || !activeCampaign.storyData || !canGenerate) {
        if (!canGenerate) setError(t('limitDailyPrompts'));
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        const continuationDetails = {
            previousStory: activeCampaign.storyData,
            details: details,
        };
        const data = await generateStory(details.nextPrompt, activeCampaign.heroes, activeCampaign.monsters, language, undefined, activeCampaign.gameSettings.system, activeCampaign.gameSettings.tone, continuationDetails);
        handleUpdateCampaign({ ...activeCampaign, storyData: data });
        incrementUsage();
    } catch (err) {
        setError(err.message || 'An unknown error occurred.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }, [activeCampaign, language, canGenerate, t, isAnonymousMode]);
  
  const handleGenerateOneShotContent = useCallback(async (part, context) => {
      if (!canGenerate) {
          setError(t('limitDailyPrompts'));
          return null;
      }
      setError(null);
      try {
          const content = await generateOneShotContent(part, context, language);
          incrementUsage();
          return content;
      } catch (err) {
          setError(err.message || 'An unknown error occurred.');
          console.error(err);
          return null;
      }
  }, [canGenerate, t, language, isAnonymousMode]);

  const handleRewrite = useCallback(async (text) => {
      if (!canGenerate) {
          setError(t('limitDailyPrompts'));
          return text;
      }
      setError(null);
      try {
          const rewrittenText = await rewriteText(text, language);
          incrementUsage();
          return rewrittenText;
      } catch (err) {
          setError(err.message || 'An unknown error occurred.');
          console.error(err);
          return text; // Return original text on error
      }
  }, [canGenerate, t, language, isAnonymousMode]);
  
  const handleGenerateBackground = useCallback(async (race, heroClass) => {
      if (!canGenerate) {
          setError(t('limitDailyPrompts'));
          return '';
      }
      setError(null);
      try {
          const background = await generateCharacterBackground(race, heroClass, language);
          incrementUsage();
          return background;
      } catch (err) {
          setError(err.message || 'An unknown error occurred.');
          console.error(err);
          return ''; // Return empty on error
      }
  }, [canGenerate, t, language, isAnonymousMode]);

  const handleLoadAppState = useCallback((loadedState) => {
    setError(null);
    const { theme: loadedTheme, ...restOfState } = loadedState;

    if (restOfState.version >= 3 && restOfState.campaigns && restOfState.usage) {
        if (loadedTheme) setTheme(loadedTheme);
        setAppState(prev => ({...prev, ...restOfState}));
        setActiveCampaignId(null);
        setActiveOneShotId(null);
        setActivePlayerGameId(null);
        setActiveMapId(null);
        setIsBackupModalOpen(false); // Close modal on successful load
    } else {
        setError(t('errorInvalidData'));
    }
  }, [t, setTheme]);
  
  const canCreateCampaign = useMemo(() => {
    if (isAnonymousMode) return true;
    return appState.campaigns.length < MAX_CAMPAIGNS;
  }, [isAnonymousMode, appState.campaigns]);

  const handleNewCampaign = () => {
    if (!canCreateCampaign) {
        setError(t('limitCampaigns'));
        return;
    }
    const newCampaignId = crypto.randomUUID();
    const newCampaign = {
        id: newCampaignId,
        name: t('newCampaign'),
        storyData: null,
        heroes: [],
        monsters: [],
        gameSettings: { system: 'Fabula Ultima', tone: 'High Fantasy' },
        lastModified: Date.now()
    };
    setAppState(prev => ({ ...prev, campaigns: [...prev.campaigns, newCampaign]}));
    setActiveCampaignId(newCampaignId);
  };
  
  const handleLoadExampleCampaign = useCallback(() => {
    const exampleName = t('exampleCampaignName');
    const existingCampaign = appState.campaigns.find(c => c.name === exampleName);
    if (existingCampaign) {
      setActiveCampaignId(existingCampaign.id);
      return;
    }
    const newCampaignId = crypto.randomUUID();
    const newCampaign = {
      ...exampleCampaignData, name: exampleName, id: newCampaignId, lastModified: Date.now(),
      heroes: exampleCampaignData.heroes.map(h => ({ ...h, id: crypto.randomUUID() })),
      monsters: exampleCampaignData.monsters.map(m => ({ ...m, id: crypto.randomUUID() })),
    };
    setAppState(prev => ({ ...prev, campaigns: [...prev.campaigns, newCampaign] }));
    setActiveCampaignId(newCampaignId);
  }, [appState.campaigns, t]);

  const handleDeleteCampaign = useCallback((id) => {
    openConfirmModal({
        title: t('deleteCampaign'),
        message: t('deleteConfirmation'),
        onConfirm: () => {
            setAppState(prev => ({ ...prev, campaigns: prev.campaigns.filter(c => c.id !== id) }));
            if (activeCampaignId === id) setActiveCampaignId(null);
        }
    });
  }, [t, activeCampaignId, openConfirmModal]);

  // One-Shot Handlers
  const canCreateOneShot = useMemo(() => {
    if (isAnonymousMode) return true;
    return (appState.oneShots || []).length < MAX_CAMPAIGNS;
  }, [isAnonymousMode, appState.oneShots]);
  
  const handleNewOneShot = () => {
    if (!canCreateOneShot) {
        setError(t('limitCampaigns'));
        return;
    }
    const newId = crypto.randomUUID();
    const newOneShot = {
        id: newId,
        title: t('newOneShot'),
        mainStoryArcs: [{
            id: crypto.randomUUID(),
            title: t('newOneShot'),
            premise: '', hook: '', objective: '', stakes: '', climax: '', resolution: ''
        }],
        locations: [],
        events: [],
        npcs: [],
        items: [],
        heroes: [],
        monsters: [],
        lastModified: Date.now()
    };
    setAppState(prev => ({ ...prev, oneShots: [...(prev.oneShots || []), newOneShot]}));
    setActiveOneShotId(newId);
  };
  
  const handleDeleteOneShot = useCallback((id) => {
    openConfirmModal({
        title: t('deleteOneShot'),
        message: t('deleteOneShotConfirmation'),
        onConfirm: () => {
            setAppState(prev => ({ ...prev, oneShots: prev.oneShots.filter(os => os.id !== id) }));
            if (activeOneShotId === id) setActiveOneShotId(null);
        }
    });
  }, [t, activeOneShotId, openConfirmModal]);


  // Player Game Handlers
  const canCreatePlayerGame = useMemo(() => {
    if (isAnonymousMode) return true;
    return (appState.playerGames || []).length < MAX_CAMPAIGNS;
  }, [isAnonymousMode, appState.playerGames]);
  
  const handleNewPlayerGame = () => {
    if (!canCreatePlayerGame) {
      setError(t('limitGames'));
      return;
    }
    const newId = crypto.randomUUID();
    const newGame = {
      id: newId, name: t('newGame'), hero: null, monsters: [], npcs: [], notes: [], lastModified: Date.now(),
    };
    setAppState(prev => ({ ...prev, playerGames: [...(prev.playerGames || []), newGame] }));
    setActivePlayerGameId(newId);
  };
  
  const handleUpdatePlayerGame = (updatedGame) => {
    setAppState(prev => ({
      ...prev,
      playerGames: prev.playerGames.map(g => g.id === updatedGame.id ? { ...updatedGame, lastModified: Date.now() } : g),
    }));
  };
  
  const handleDeletePlayerGame = useCallback((id) => {
    openConfirmModal({
        title: t('deleteGameTitle'),
        message: t('deleteGameConfirmation'),
        onConfirm: () => {
            setAppState(prev => ({ ...prev, playerGames: prev.playerGames.filter(g => g.id !== id) }));
            if (activePlayerGameId === id) setActivePlayerGameId(null);
        }
    });
  }, [t, activePlayerGameId, openConfirmModal]);
  
  // Battle Map Handlers
  const handleNewMap = () => {
    const newId = crypto.randomUUID();
    const newMap = {
      id: newId,
      name: t('newMap'),
      lastModified: Date.now(),
      drawings: [],
      tokens: []
    };
    setAppState(prev => ({ ...prev, maps: [...(prev.maps || []), newMap] }));
    setActiveMapId(newId);
  };

  const handleUpdateMap = (updatedMap) => {
    setAppState(prev => ({
      ...prev,
      maps: (prev.maps || []).map(m => m.id === updatedMap.id ? { ...updatedMap, lastModified: Date.now() } : m),
    }));
  };

  const handleDeleteMap = useCallback((id) => {
    openConfirmModal({
      title: t('deleteMap'),
      message: t('deleteMapConfirmation'),
      onConfirm: () => {
        setAppState(prev => ({ ...prev, maps: (prev.maps || []).filter(m => m.id !== id) }));
        if (activeMapId === id) setActiveMapId(null);
      }
    });
  }, [t, activeMapId, openConfirmModal]);
  
  if (!isAnonymousMode && !user) {
    return React.createElement(LoginScreen, null);
  }
  
  const handleBack = () => {
      if (appMode === 'gm') {
          setActiveCampaignId(null);
          setActiveOneShotId(null);
      } else {
          setActivePlayerGameId(null);
      }
  };

  const renderActiveCampaign = () => {
      if (isLoading && !activeCampaign?.storyData) return React.createElement(LoadingSpinner, null);
      if (activeCampaign) {
          return React.createElement('div', { className: "animate-fade-in" },
              React.createElement('div', { className: "w-full max-w-4xl mx-auto text-center mt-8" },
                  React.createElement(CampaignNameEditor, { campaign: activeCampaign, onUpdate: handleUpdateCampaign })
              ),
              React.createElement(HeroManager, { heroes: activeCampaign.heroes, onAddHero: handleAddHero, onUpdateHero: handleUpdateHero, onRemoveHero: handleRemoveHero, gameSystem: activeCampaign.gameSettings.system }),
              React.createElement(MonsterManager, { monsters: activeCampaign.monsters || [], onAddMonster: handleAddMonster, onUpdateMonster: handleUpdateMonster, onRemoveMonster: handleRemoveMonster }),
              !activeCampaign.storyData && !isLoading && React.createElement(PromptInput, { onGenerate: handleGenerate, isLoading, canGenerate }),
              isLoading && activeCampaign.storyData && React.createElement(LoadingSpinner, null),
              activeCampaign.storyData && !isLoading && React.createElement('div', { className: "mt-8 animate-fade-in-up" },
                  React.createElement(ContinuationInput, { story: activeCampaign.storyData, onContinue: handleContinue, isLoading, canGenerate }),
                  React.createElement(StoryDisplay, { data: activeCampaign.storyData })
              )
          );
      }
      return null;
  };
  
  const renderAppContent = () => {
      if (appMode === 'gm') {
          if (activeCampaignId) return renderActiveCampaign();
          if (activeOneShotId) return React.createElement(OneShotDashboard, { 
              oneShot: activeOneShot, 
              onUpdate: handleUpdateOneShot,
              onAddHero: handleAddHero, 
              onUpdateHero: handleUpdateHero, 
              onRemoveHero: handleRemoveHero,
              onAddMonster: handleAddMonster, 
              onUpdateMonster: handleUpdateMonster, 
              onRemoveMonster: handleRemoveMonster,
              onGenerate: handleGenerateOneShotContent,
              onRewrite: handleRewrite,
              canGenerate
          });

          return React.createElement('div', { className: "animate-fade-in" },
            gmView === 'campaigns' ?
              React.createElement(CampaignList, { campaigns: appState.campaigns, onSelect: setActiveCampaignId, onDelete: handleDeleteCampaign, onNew: handleNewCampaign, canCreate: canCreateCampaign, onLoadExample: handleLoadExampleCampaign })
              :
              React.createElement(OneShotList, { oneShots: appState.oneShots || [], onSelect: setActiveOneShotId, onDelete: handleDeleteOneShot, onNew: handleNewOneShot, canCreate: canCreateOneShot })
          );
      } else { // Player Mode
          return !activePlayerGameId ?
            React.createElement('div', { className: "animate-fade-in" },
                React.createElement(PlayerGameList, { games: appState.playerGames || [], onSelect: setActivePlayerGameId, onDelete: handleDeletePlayerGame, onNew: handleNewPlayerGame, canCreate: canCreatePlayerGame })
            ) :
            (activePlayerGame && React.createElement(PlayerDashboard, { game: activePlayerGame, onUpdate: handleUpdatePlayerGame, onRewrite: handleRewrite, onGenerateBackground: handleGenerateBackground, openConfirmModal: openConfirmModal }));
      }
  };

  const showAnyDetailView = !!activeCampaignId || !!activeOneShotId || !!activePlayerGameId;

  return React.createElement(ThemeContext.Provider, { value: { theme, setTheme } },
      React.createElement('div', { 
          className: "flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]",
          style: {
            backgroundImage: 'radial-gradient(circle at top right, rgba(128, 0, 128, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(106, 90, 205, 0.2), transparent 50%)',
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif"
          }
      },
      React.createElement(Header, { 
          onBack: handleBack,
          showBack: showAnyDetailView, 
          user: isAnonymousMode ? null : user, 
          onSignOut: handleSignOut,
          onOpenBackupModal: () => setIsBackupModalOpen(true)
      }),
      !showAnyDetailView && React.createElement('div', {
            className: "hidden md:flex container mx-auto justify-center py-4 animate-fade-in gap-8"
        },
          React.createElement(ModeSwitcher, {
              mode: appMode,
              onModeChange: (mode) => {
                  setAppMode(mode);
                  setActiveCampaignId(null);
                  setActivePlayerGameId(null);
              }
          }),
          appMode === 'gm' && React.createElement(GMViewSwitcher, {
              view: gmView,
              onViewChange: setGmView
          })
      ),
      React.createElement('main', { className: "container mx-auto px-4 pb-24 flex-grow" },
          error && React.createElement('div', {
              className: "w-full max-w-4xl mx-auto my-4 p-4 bg-[var(--danger-bg)] border border-[var(--danger-border)] text-[var(--danger-text)] rounded-lg text-center",
              onClick: () => setError(null),
              style: { cursor: 'pointer' }
          },
              React.createElement('p', { className: "font-bold" }, t('errorTitle')),
              React.createElement('p', null, error)
          ),
          renderAppContent()
      ),
      React.createElement(Footer, null),
      appMode === 'gm' && React.createElement('div', { className: "fixed bottom-20 md:bottom-6 right-28 z-50" },
        React.createElement('button', {
            onClick: () => setIsMapManagerOpen(true),
            'aria-label': t('battleMaps'),
            className: "w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
        }, React.createElement(BattleMapIcon, { isOpen: isMapManagerOpen }))
      ),
      React.createElement(DiceRoller, null),
      React.createElement(ConfirmModal, {
        isOpen: modalState.isOpen,
        onClose: closeConfirmModal,
        onConfirm: handleConfirm,
        title: modalState.title,
        message: modalState.message,
      }),
       React.createElement(BackupModal, {
        isOpen: isBackupModalOpen,
        onClose: () => setIsBackupModalOpen(false),
        appState: { ...appState, theme },
        onLoad: handleLoadAppState
      }),
      React.createElement(BattleMapManager, {
        isOpen: isMapManagerOpen,
        onClose: () => {
          setIsMapManagerOpen(false);
          setActiveMapId(null);
        },
        maps: appState.maps || [],
        activeMapId: activeMapId,
        onSelectMap: setActiveMapId,
        onNewMap: handleNewMap,
        onUpdateMap: handleUpdateMap,
        onDeleteMap: handleDeleteMap,
      }),
      React.createElement(BottomNavBar, {
          onBack: handleBack,
          showBack: showAnyDetailView,
          user: isAnonymousMode ? null : user,
          onSignOut: handleSignOut,
          mode: appMode,
          onModeChange: (mode) => {
              setAppMode(mode);
              setActiveCampaignId(null);
              setActivePlayerGameId(null);
          },
          showModeSwitcher: !showAnyDetailView,
          gmView: gmView,
          onGmViewChange: setGmView,
          showGmViewSwitcher: !showAnyDetailView && appMode === 'gm',
          onOpenBackupModal: () => setIsBackupModalOpen(true)
      }),
      React.createElement('style', {
          dangerouslySetInnerHTML: {
            __html: `
              @keyframes fade-in {
                  from { opacity: 0; }
                  to { opacity: 1; }
              }
              @keyframes fade-in-up {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
              }
              @keyframes pop-in {
                  0% { opacity: 0; transform: scale(0.5); }
                  70% { opacity: 1; transform: scale(1.1); }
                  100% { opacity: 1; transform: scale(1); }
              }
              @keyframes pulse-gold {
                  0%, 100% { box-shadow: 0 0 8px 2px transparent; }
                  50% { box-shadow: 0 0 14px 4px var(--highlight-tertiary); }
              }
              @keyframes pulse-red {
                  0%, 100% { box-shadow: 0 0 8px 2px transparent; }
                  50% { box-shadow: 0 0 14px 4px var(--danger); }
              }
              .animate-fade-in {
                  animation: fade-in 0.8s ease-in-out;
              }
              .animate-fade-in-up {
                  animation: fade-in-up 0.6s ease-out;
              }
              .animate-pop-in {
                  animation: pop-in 0.3s ease-out forwards;
              }
              .crit-roll {
                  animation: pop-in 0.3s ease-out forwards, pulse-gold 1.5s 0.3s infinite;
              }
              .fumble-roll {
                  animation: pop-in 0.3s ease-out forwards, pulse-red 1.5s 0.3s infinite;
              }
            `,
          }
      })
    )
  );
};

const App = () => React.createElement(LanguageProvider, null, React.createElement(AppContent, null));

export default App;
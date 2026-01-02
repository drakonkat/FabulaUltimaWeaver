
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import CampaignNameEditor from './CampaignNameEditor.js';
import HeroManager from './HeroManager.js';
import MonsterManager from './MonsterManager.js';
import { chatWithNpc, modifyOneShotContent } from '../services/geminiService.js';


const SparklesIcon = ({ className = "h-4 w-4" }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm7-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" }));
const ChevronDownIcon = ({ open }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }));
const PlusIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }));
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" }));
const ChatBubbleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.242A8.937 8.937 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.832 14.168L5.5 12.5a6.938 6.938 0 00-.001-5l-.668-1.668a7.001 7.001 0 005.169 9.336z", clipRule: "evenodd" }));
const CloseIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }));
const SendIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" }));
const WandIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm7-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" }));


const NpcChatButton = ({ npc }) => {
    const { t, language } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = React.useRef(null);
    const chatRef = React.useRef(null);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    React.useEffect(scrollToBottom, [messages, isLoading]);
    
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [chatRef]);

    const handleToggleChat = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
        if (isOpen) { setMessages([]); }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage = { role: 'user', text: userInput };
        const newMessages = [...messages, newUserMessage];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const responseText = await chatWithNpc(npc, newMessages, language);
            const newModelMessage = { role: 'model', text: responseText };
            setMessages(prev => [...prev, newModelMessage]);
        } catch (err) {
            console.error(err);
            const errorMessageText = err.message || t('errorTitle');
            const errorMessage = { role: 'model', text: `[${errorMessageText}]`, isError: true };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!npc || !npc.name) return null;

    return React.createElement('div', { className: 'relative inline-block', ref: chatRef },
        React.createElement('button', {
            onClick: handleToggleChat,
            title: t('chatWithNpc', { npcName: npc.name }),
            className: 'flex items-center gap-1 text-sm text-[var(--accent-primary)] hover:underline'
        }, React.createElement(ChatBubbleIcon), t('chat')),
        isOpen && React.createElement('div', {
            className: 'absolute bottom-full right-0 mb-2 w-80 max-w-xs bg-[var(--bg-secondary)] border-2 border-[var(--border-accent)] rounded-lg shadow-xl flex flex-col z-20 animate-fade-in-up',
            onClick: e => e.stopPropagation()
        },
            React.createElement('div', { className: 'flex justify-between items-center p-2 border-b border-[var(--border-secondary)]' },
                React.createElement('h4', { className: 'font-bold text-[var(--text-primary)] text-sm truncate' }, npc.name),
                React.createElement('button', { onClick: handleToggleChat, className: 'p-1 rounded-full hover:bg-[var(--bg-tertiary)]' }, React.createElement(CloseIcon))
            ),
            React.createElement('div', { className: 'flex-grow p-2 h-64 overflow-y-auto flex flex-col gap-2' },
                messages.map((msg, index) => React.createElement('div', {
                    key: index,
                    className: `max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        msg.isError ? 'bg-[var(--danger-bg)] text-[var(--danger-text)] self-center text-center' :
                        msg.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] self-start'
                    }`
                }, msg.text)),
                isLoading && React.createElement('div', { className: 'self-start flex items-center gap-2 p-2' },
                    React.createElement('div', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]' }),
                    React.createElement('div', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]' }),
                    React.createElement('div', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce' })
                ),
                React.createElement('div', { ref: messagesEndRef })
            ),
            React.createElement('form', { onSubmit: handleSendMessage, className: 'p-2 border-t border-[var(--border-secondary)] flex gap-2' },
                React.createElement('input', {
                    type: 'text',
                    value: userInput,
                    onChange: e => setUserInput(e.target.value),
                    placeholder: t('typeMessagePlaceholder'),
                    className: 'flex-grow bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md px-2 py-1 text-sm focus:outline-none focus:border-[var(--border-accent)]'
                }),
                React.createElement('button', {
                    type: 'submit',
                    disabled: isLoading || !userInput.trim(),
                    className: 'p-2 rounded-md bg-[var(--accent-tertiary)] text-white hover:bg-[var(--accent-secondary)] disabled:bg-gray-500 disabled:cursor-not-allowed'
                }, React.createElement(SendIcon))
            )
        )
    );
};

const ModificationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
    const { t } = useTranslation();
    const [instruction, setInstruction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (instruction.trim()) {
            onConfirm(instruction);
        }
    };

    if (!isOpen) return null;

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/70 z-[100] flex items-center justify-center animate-fade-in",
        'aria-modal': true, role: "dialog", onClick: onClose
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl p-6 w-full max-w-md m-4 border-2 border-[var(--border-accent)]",
            onClick: e => e.stopPropagation()
        },
            React.createElement('h3', { className: "text-lg font-bold text-[var(--highlight-secondary)] mb-4" }, t('modifyWithAI')),
            React.createElement('form', { onSubmit: handleSubmit },
                React.createElement('textarea', {
                    value: instruction,
                    onChange: e => setInstruction(e.target.value),
                    placeholder: t('modificationPlaceholder'),
                    className: "w-full p-3 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] h-32 resize-none mb-4",
                    disabled: isLoading,
                    autoFocus: true
                }),
                React.createElement('div', { className: "flex justify-end gap-2" },
                    React.createElement('button', {
                        type: "button",
                        onClick: onClose,
                        disabled: isLoading,
                        className: "px-4 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors"
                    }, t('cancel')),
                    React.createElement('button', {
                        type: "submit",
                        disabled: isLoading || !instruction.trim(),
                        className: "px-4 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:opacity-90 transition-opacity disabled:opacity-50"
                    }, isLoading ? t('generating') : t('apply'))
                )
            )
        )
    );
};

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
    const { t, language } = useTranslation();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isModifying, setIsModifying] = useState(false);

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

    const handleModifyWithAI = async (instruction) => {
        if (!canGenerate || isGenerating) return;
        setIsGenerating(true);
        try {
            // Need to import this function or pass it down. Assuming it is imported at top level or available.
            // But since this component is inside OneShotDashboard.js, we can import `modifyOneShotContent` directly.
            const modifiedContent = await modifyOneShotContent(arc, instruction, 'mainStoryArc', language);
            if (modifiedContent) {
                onUpdate({ ...arc, ...modifiedContent });
            }
        } catch (e) {
            console.error("Modification failed", e);
        } finally {
            setIsGenerating(false);
            setIsModifying(false);
        }
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
        React.createElement(ModificationModal, { 
            isOpen: isModifying, 
            onClose: () => setIsModifying(false), 
            onConfirm: handleModifyWithAI,
            isLoading: isGenerating 
        }),
        React.createElement('div', { className: 'flex justify-between items-center mb-4' },
            React.createElement('h3', { className: 'text-xl font-semibold text-[var(--accent-primary)]' }, arc.title || t('mainStoryArc')),
            React.createElement('div', { className: 'flex gap-2' },
                React.createElement('button', { 
                    onClick: () => setIsModifying(true), 
                    disabled: !canGenerate || isGenerating, 
                    className: "flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-secondary)]/80 hover:bg-[var(--accent-secondary)] text-white transition-colors disabled:opacity-50" 
                },
                    React.createElement(WandIcon, { className: 'h-5 w-5 mr-1' }),
                    t('modifyWithAI')
                ),
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

const EditableCard = ({ item, fieldsConfig, onUpdate, onRemove, onRewrite, canGenerate, sectionKey }) => {
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
        React.createElement('div', { className: 'flex justify-end items-center mb-2 -mt-2 -mr-2' },
            sectionKey === 'npcs' && React.createElement(NpcChatButton, { npc: item }),
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
                            canGenerate,
                            sectionKey: key
                        }))
                    )
                    : React.createElement('p', { className: "text-[var(--text-muted)] italic text-center" }, t(config.emptyLabel))
            );
        })
    );
};

export default OneShotDashboard;

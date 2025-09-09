import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { chatWithNpc } from '../services/geminiService.js';


const Section = ({ title, children, icon }) => React.createElement('div', { className: "bg-[var(--bg-secondary)]/60 p-6 rounded-lg border border-[var(--border-accent)]/50 shadow-lg mb-6" },
    React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] mb-4 flex items-center gap-3", style: { fontFamily: 'serif' } },
        icon,
        title
    ),
    React.createElement('div', { className: "text-[var(--text-secondary)] leading-relaxed prose prose-invert prose-p:my-2" },
        children
    )
);

const ScrollIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-[var(--highlight-secondary)]", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" }),
    React.createElement('path', { fillRule: "evenodd", d: "M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z", clipRule: "evenodd" })
);

const UsersIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-[var(--highlight-secondary)]", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 4.385a.75.75 0 00-1.06 1.06 5.5 5.5 0 008.238 0 .75.75 0 10-1.06-1.06 4 4 0 01-6.118 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 4.385a.75.75 0 00-1.06 1.06 5.5 5.5 0 008.238 0 .75.75 0 10-1.06-1.06 4 4 0 01-6.118 0z" })
);

const SwordsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-[var(--highlight-secondary)]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 12l7-7 7 7-7 7-7-7z", transform: "rotate(45 12 12)" })
);

const ChatBubbleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.242A8.937 8.937 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.832 14.168L5.5 12.5a6.938 6.938 0 00-.001-5l-.668-1.668a7.001 7.001 0 005.169 9.336z", clipRule: "evenodd" }));
const CloseIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }));
const SendIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" }));


const NpcCard = ({ npc }) => {
    const { t, language } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatRef = useRef(null);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    useEffect(scrollToBottom, [messages, isLoading]);
    
    useEffect(() => {
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
        const newState = !isOpen;
        setIsOpen(newState);
        if (!newState) { setMessages([]); }
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
    
    return React.createElement('div', { className: "mb-4 p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)]" },
        React.createElement('div', { className: 'flex justify-between items-start' },
            React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-lg" }, npc.name),
            React.createElement('div', { className: 'relative inline-block', ref: chatRef },
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
            )
        ),
        React.createElement('p', { className: "text-[var(--text-muted)] whitespace-pre-wrap mt-2" }, npc.description)
    );
};

const CombatCard = ({ combat }) => {
    const { t } = useTranslation();
    const difficultyColor = {
        low: 'text-green-400',
        normal: 'text-yellow-400',
        high: 'text-[var(--danger)]'
    }[combat.difficulty];

    return React.createElement('div', { className: "p-4 bg-[var(--danger-bg)] rounded-md border border-[var(--danger-border)]" },
        React.createElement('h3', { className: "font-bold text-[var(--danger-text)] text-lg" }, `${t('encounter')}: ${combat.who}`),
        React.createElement('p', null, `${t('difficulty')}: `, React.createElement('span', { className: `font-bold ${difficultyColor}` }, combat.difficulty.toUpperCase()))
    );
};

const StoryDisplay = ({ data }) => {
  const { t } = useTranslation();
  return React.createElement('div', { className: "w-full max-w-4xl mx-auto p-4 md:p-6 animate-fade-in" },
    React.createElement('h1', { className: "text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[var(--highlight-tertiary)] to-[var(--highlight-primary-from)]", style: { fontFamily: 'serif' } },
      data.storyName
    ),
    React.createElement(Section, { title: t('mastersNarration'), icon: React.createElement(ScrollIcon, null) },
      React.createElement('div', { className: "bg-[var(--bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--highlight-tertiary)] italic max-h-60 overflow-y-auto" },
        React.createElement('p', { className: "whitespace-pre-wrap" }, data.masterToRead)
      )
    ),
    React.createElement(Section, { title: t('previousSituation'), icon: React.createElement(ScrollIcon, null) },
      React.createElement('p', { className: "whitespace-pre-wrap" }, data.previousSituation)
    ),
    data.worldSituationUpdate && React.createElement(Section, { title: t('worldSituationUpdate'), icon: React.createElement(ScrollIcon, null) },
        React.createElement('p', { className: "whitespace-pre-wrap" }, data.worldSituationUpdate)
    ),
    React.createElement(Section, { title: t('backgroundStory'), icon: React.createElement(ScrollIcon, null) },
      React.createElement('p', { className: "whitespace-pre-wrap" }, data.backgroundStory)
    ),
    React.createElement(Section, { title: t('keyNPCs'), icon: React.createElement(UsersIcon, null) },
      data.NPC.map((npc, index) => React.createElement(NpcCard, { key: index, npc: npc }))
    ),
    data.mustCombat && React.createElement(Section, { title: t('combatEncounter'), icon: React.createElement(SwordsIcon, null) },
      React.createElement(CombatCard, { combat: data.mustCombat })
    )
  );
};

export default StoryDisplay;
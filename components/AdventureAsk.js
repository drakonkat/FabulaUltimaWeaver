import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../hooks/useTranslation.js';
import { askAdventure } from '../services/adventureQuestions.js';

const AskContext = createContext(null);

export function AskButton({ section, item }) {
    const open = useContext(AskContext);
    const { t } = useTranslation();
    if (!open) return null;
    return React.createElement('button', {
        type: 'button', onClick: () => open({ section, item }),
        title: t('askAbout', { area: item?.name || item?.title || section }),
        'aria-label': t('askAbout', { area: item?.name || item?.title || section }),
        className: 'shrink-0 px-3 py-2 rounded-lg border border-[var(--border-accent)] text-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)]',
    }, 'Ask');
}

function AskDialog({ adventure, focus, onClose }) {
    const { t, language } = useTranslation();
    const dialog = useRef(null);
    const end = useRef(null);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => { if (!dialog.current.open) dialog.current.showModal(); }, []);
    useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [messages, isLoading]);

    const send = async event => {
        event.preventDefault();
        if (!question.trim() || isLoading) return;
        const next = [...messages, { role: 'user', text: question.trim() }];
        setIsLoading(true);
        setError(null);
        try {
            const answer = await askAdventure(adventure, focus, next, language);
            setMessages([...next, { role: 'model', text: answer }]);
            setQuestion('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return createPortal(React.createElement('dialog', {
        ref: dialog, onCancel: onClose, onClose,
        'aria-labelledby': 'adventure-ask-title',
        style: { width: 'calc(100% - 2rem)' },
        className: 'max-w-2xl max-h-[90dvh] p-0 rounded-xl border border-[var(--border-accent)] bg-[var(--bg-secondary)] text-[var(--text-primary)] backdrop:bg-black/70',
    },
        React.createElement('div', { className: 'flex flex-col max-h-[85dvh]' },
            React.createElement('div', { className: 'shrink-0 p-4 border-b border-[var(--border-primary)]' },
                React.createElement('div', { className: 'flex items-start justify-between gap-3' },
                    React.createElement('h2', { id: 'adventure-ask-title', className: 'text-lg font-bold break-words' }, t('askAbout', { area: focus.item?.name || focus.item?.title || focus.section })),
                    React.createElement('button', { type: 'button', onClick: onClose, className: 'px-3 py-2 rounded bg-[var(--bg-tertiary)]' }, t('askClose'))
                ),
                React.createElement('p', { className: 'text-sm text-[var(--text-muted)] mt-2' }, t('askReadOnly'))
            ),
            React.createElement('div', { className: 'min-h-0 overflow-y-auto p-4 space-y-4', role: 'log', 'aria-live': 'polite', 'aria-label': t('askConversation') },
                messages.map((message, index) => React.createElement('div', { key: index, className: 'whitespace-pre-wrap break-words' },
                    React.createElement('p', { className: 'font-semibold text-[var(--accent-primary)]' }, message.role === 'user' ? t('askQuestion') : t('askAnswer')),
                    React.createElement('p', null, message.text)
                )),
                isLoading && React.createElement('p', { role: 'status' }, t('generating')),
                error && React.createElement('p', { role: 'alert', className: 'text-[var(--danger-text)]' }, error),
                React.createElement('div', { ref: end })
            ),
            React.createElement('form', { onSubmit: send, className: 'shrink-0 p-4 border-t border-[var(--border-primary)] space-y-2' },
                React.createElement('label', { htmlFor: 'adventure-ask-question', className: 'block font-semibold' }, t('askQuestion')),
                React.createElement('textarea', {
                    id: 'adventure-ask-question', value: question, onChange: event => setQuestion(event.target.value),
                    autoFocus: true, disabled: isLoading, placeholder: t('askPlaceholder'),
                    className: 'w-full h-20 p-2 rounded border border-[var(--border-primary)] bg-[var(--bg-primary)]',
                }),
                React.createElement('button', { type: 'submit', disabled: isLoading || !question.trim(), className: 'px-4 py-2 rounded bg-[var(--accent-tertiary)] text-white disabled:opacity-50' }, 'Ask')
            )
        )
    ), document.body);
}

export function AdventureAskProvider({ adventure, children }) {
    const [focus, setFocus] = useState(null);
    return React.createElement(AskContext.Provider, { value: setFocus }, children,
        focus && React.createElement(AskDialog, { adventure, focus, onClose: () => setFocus(null) })
    );
}

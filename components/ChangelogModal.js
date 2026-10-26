import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { changelog } from '../data/changelog.js';

const CloseIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
);

const ChangelogModal = ({ isOpen, onClose }) => {
    const { t, language } = useTranslation();

    if (!isOpen) return null;

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/70 z-[100] flex items-center justify-center animate-fade-in",
        'aria-modal': true, role: "dialog", onClick: onClose
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl p-6 w-full max-w-2xl m-4 max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain border-2 border-[var(--border-accent)]",
            onClick: e => e.stopPropagation()
        },
            React.createElement('div', { className: "flex justify-between items-center mb-4" },
                React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('changelogTitle') + ' v' + __APP_VERSION__),
                React.createElement('button', {
                    onClick: onClose,
                    className: "p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--bg-tertiary)] transition-colors",
                    'aria-label': t('askClose')
                },
                    React.createElement(CloseIcon, null)
                )
            ),
            changelog.map(entry =>
                React.createElement('div', { key: entry.version, className: "mb-5 last:mb-0" },
                    React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-lg" }, 'v' + entry.version + ' - ' + entry.date),
                    React.createElement('ul', { className: "list-disc ml-5 mt-1 space-y-1 text-[var(--text-secondary)] text-sm" },
                        (entry[language] || entry.en).map((item, i) =>
                            React.createElement('li', { key: i }, item)
                        )
                    )
                )
            )
        )
    );
};

export default ChangelogModal;

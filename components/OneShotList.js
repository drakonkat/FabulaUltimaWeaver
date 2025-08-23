import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const PlusCircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z", clipRule: "evenodd" })
);

const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);

const OneShotList = ({ oneShots, onSelect, onDelete, onNew, canCreate }) => {
    const { t, language } = useTranslation();

    const sortedOneShots = [...oneShots].sort((a, b) => b.lastModified - a.lastModified);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString(language, {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex flex-wrap gap-4 justify-between items-center mb-6" },
            React.createElement('h2', { className: "text-3xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('oneShots')),
            React.createElement('button', {
                onClick: onNew,
                disabled: !canCreate,
                title: !canCreate ? t('limitCampaigns') : '',
                className: "flex items-center justify-center px-4 py-3 font-bold text-sm text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed"
            },
                React.createElement(PlusCircleIcon, { className: "h-5 w-5 mr-2" }),
                t('startNewOneShot')
            )
        ),
        React.createElement('div', { className: "space-y-4" },
            sortedOneShots.length === 0 ?
                React.createElement('div', { className: "text-center py-8" },
                    React.createElement('p', { className: "text-[var(--text-muted)] italic text-lg" }, t('noOneShots'))
                )
                :
                sortedOneShots.map(os =>
                    React.createElement('div', {
                        key: os.id,
                        className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex justify-between items-center gap-4 hover:bg-[var(--bg-primary)]/90 hover:border-[var(--border-accent-light)] transition-all duration-200"
                    },
                        React.createElement('div', { className: "flex-grow cursor-pointer", onClick: () => onSelect(os.id) },
                            React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, os.title),
                            React.createElement('p', { className: "text-sm text-[var(--text-subtle)]" }, `${t('lastModified')}: ${formatDate(os.lastModified)}`)
                        ),
                        React.createElement('button', {
                            onClick: (e) => { e.stopPropagation(); onDelete(os.id); },
                            className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors duration-200",
                            'aria-label': `${t('deleteOneShot')} ${os.title}`
                        },
                            React.createElement(TrashIcon, null)
                        )
                    )
                )
        )
    );
};

export default OneShotList;

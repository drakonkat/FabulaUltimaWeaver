import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const PlusCircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z", clipRule: "evenodd" })
);

const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);

const BookOpenIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" })
);

const CampaignList = ({ campaigns, onSelect, onDelete, onNew, canCreate, onLoadExample }) => {
    const { t, language } = useTranslation();

    const sortedCampaigns = [...campaigns].sort((a, b) => b.lastModified - a.lastModified);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString(language, {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement('div', { className: "flex flex-wrap gap-4 justify-between items-center mb-6" },
            React.createElement('h2', { className: "text-3xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('campaigns')),
            React.createElement('div', { className: "flex items-center gap-4" },
                React.createElement('button', {
                    onClick: onLoadExample,
                    className: "flex items-center justify-center px-4 py-3 font-semibold text-sm rounded-lg transition-all duration-300 bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white"
                },
                    React.createElement(BookOpenIcon, { className: "h-5 w-5 mr-2" }),
                    t('tryExampleCampaign')
                ),
                React.createElement('button', {
                    onClick: onNew,
                    disabled: !canCreate,
                    title: !canCreate ? t('limitCampaigns') : '',
                    className: "flex items-center justify-center px-4 py-3 font-bold text-sm text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed"
                },
                    React.createElement(PlusCircleIcon, { className: "h-5 w-5 mr-2" }),
                    t('startNewCampaign')
                )
            )
        ),
        React.createElement('div', { className: "space-y-4" },
            sortedCampaigns.length === 0 ?
                React.createElement('div', { className: "text-center py-8" },
                    React.createElement('p', { className: "text-[var(--text-muted)] italic text-lg" }, t('noCampaigns')),
                    React.createElement('p', { className: "text-[var(--text-muted)] mt-2" }, t('exampleCampaignDesc'))
                )
                :
                sortedCampaigns.map(campaign =>
                    React.createElement('div', {
                        key: campaign.id,
                        className: "p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex justify-between items-center gap-4 hover:bg-[var(--bg-primary)]/90 hover:border-[var(--border-accent-light)] transition-all duration-200"
                    },
                        React.createElement('div', { className: "flex-grow cursor-pointer", onClick: () => onSelect(campaign.id) },
                            React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-xl" }, campaign.name),
                            React.createElement('p', { className: "text-sm text-[var(--text-subtle)]" }, `${t('lastModified')}: ${formatDate(campaign.lastModified)}`)
                        ),
                        React.createElement('button', {
                            onClick: (e) => { e.stopPropagation(); onDelete(campaign.id); },
                            className: "p-2 text-[var(--danger)]/80 hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-full transition-colors duration-200",
                            'aria-label': `${t('deleteCampaign')} ${campaign.name}`
                        },
                            React.createElement(TrashIcon, null)
                        )
                    )
                )
        )
    );
};

export default CampaignList;
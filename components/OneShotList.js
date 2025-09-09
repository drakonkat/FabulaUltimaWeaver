
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { oneShotTemplates } from '../data/oneShotTemplates/index.js';

const PlusCircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z", clipRule: "evenodd" })
);

const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);

const DifficultyIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1.5 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" },
  React.createElement('path', { fillRule: "evenodd", d: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z", clipRule: "evenodd" })
);

const DurationIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1.5 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" },
  React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z", clipRule: "evenodd" })
);

const PlayersIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1.5 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" },
  React.createElement('path', { d: "M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 4.385a.75.75 0 00-1.06 1.06 5.5 5.5 0 008.238 0 .75.75 0 10-1.06-1.06 4 4 0 01-6.118 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 4.385a.75.75 0 00-1.06 1.06 5.5 5.5 0 008.238 0 .75.75 0 10-1.06-1.06 4 4 0 01-6.118 0z" })
);

const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 10a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm7-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V8h-1a1 1 0 010-2h1V5a1 1 0 011-1z", clipRule: "evenodd" }));


const OneShotGeneratorModal = ({ isOpen, onClose, onGenerate, isLoading, canGenerate }) => {
    const { t } = useTranslation();
    const [params, setParams] = useState({
        premise: '',
        genre: 'High Fantasy',
        numHeroes: '3-4 Heroes',
        difficulty: 'Medium',
        duration: 'Medium (~4 Hours)',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (params.premise.trim()) {
            onGenerate(params);
        }
    };

    if (!isOpen) return null;

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/70 z-[100] flex items-center justify-center animate-fade-in",
        'aria-modal': true, role: "dialog", onClick: onClose
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl p-6 w-full max-w-2xl m-4 border-2 border-[var(--border-accent)]",
            onClick: e => e.stopPropagation()
        },
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] mb-4" }, t('adventureSettings')),
            React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
                React.createElement('div', null,
                    React.createElement('label', { htmlFor: 'premise', className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, t('adventurePremise')),
                    React.createElement('textarea', {
                        id: 'premise', name: 'premise', value: params.premise, onChange: handleChange,
                        placeholder: t('adventurePremisePlaceholder'), required: true,
                        className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)] h-20 resize-none",
                    })
                ),
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'genre', className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, t('genre')),
                        React.createElement('select', { id: 'genre', name: 'genre', value: params.genre, onChange: handleChange, className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)]" },
                            React.createElement('option', { value: "High Fantasy" }, t('highFantasy')),
                            React.createElement('option', { value: "Dark Fantasy / Gore" }, t('darkFantasyGore')),
                            React.createElement('option', { value: "Cosmic Horror" }, t('cosmicHorror')),
                            React.createElement('option', { value: "Political Intrigue" }, t('politicalIntrigue')),
                            React.createElement('option', { value: "Mystery / Investigation" }, t('mysteryInvestigation')),
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'numHeroes', className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, t('numberOfHeroes')),
                        React.createElement('select', { id: 'numHeroes', name: 'numHeroes', value: params.numHeroes, onChange: handleChange, className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)]" },
                            React.createElement('option', { value: "1-2 Heroes" }, t('heroes1_2')),
                            React.createElement('option', { value: "3-4 Heroes" }, t('heroes3_4')),
                            React.createElement('option', { value: "5-6 Heroes" }, t('heroes5_6')),
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'difficulty', className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, t('adventureDifficulty')),
                        React.createElement('select', { id: 'difficulty', name: 'difficulty', value: params.difficulty, onChange: handleChange, className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)]" },
                            React.createElement('option', { value: "Easy" }, t('easy')),
                            React.createElement('option', { value: "Medium" }, t('medium')),
                            React.createElement('option', { value: "Hard" }, t('hard')),
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'duration', className: 'block text-sm font-medium text-[var(--accent-primary)] mb-1' }, t('adventureDuration')),
                        React.createElement('select', { id: 'duration', name: 'duration', value: params.duration, onChange: handleChange, className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border-2 border-[var(--border-primary)]" },
                            React.createElement('option', { value: "Short (~2 Hours)" }, t('durationShort')),
                            React.createElement('option', { value: "Medium (~4 Hours)" }, t('durationMedium')),
                            React.createElement('option', { value: "Long (5+ Hours)" }, t('durationLong')),
                        )
                    ),
                ),
                React.createElement('div', { className: "flex justify-end gap-4 pt-4 mt-4 border-t border-[var(--border-secondary)]" },
                    React.createElement('button', { type: 'button', onClick: onClose, className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors" }, t('cancel')),
                    React.createElement('button', {
                        type: 'submit', disabled: isLoading || !canGenerate || !params.premise.trim(),
                        className: "flex items-center justify-center px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed"
                    }, 
                        isLoading ? t('generatingAdventure') : t('generateAdventure')
                    )
                )
            )
        )
    );
};


const OneShotList = ({ oneShots, onSelect, onDelete, onNew, canCreate, onLoadTemplate, onOpenGenerator, onGenerate, isGeneratorOpen, onCloseGenerator, isLoading, canGenerate }) => {
    const { t, language } = useTranslation();

    const sortedOneShots = [...oneShots].sort((a, b) => b.lastModified - a.lastModified);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString(language, {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-8 p-6 bg-[var(--bg-secondary)]/60 rounded-lg border border-[var(--border-accent)]/50 shadow-lg" },
        React.createElement(OneShotGeneratorModal, { isOpen: isGeneratorOpen, onClose: onCloseGenerator, onGenerate, isLoading, canGenerate }),
        React.createElement('div', { className: "flex flex-wrap gap-4 justify-between items-center mb-6" },
            React.createElement('h2', { className: "text-3xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, t('oneShots')),
            React.createElement('div', { className: 'flex items-center gap-2' },
                 React.createElement('button', {
                    onClick: onOpenGenerator,
                    disabled: !canCreate,
                    title: !canCreate ? t('limitCampaigns') : '',
                    className: "flex items-center justify-center px-4 py-3 font-bold text-sm text-white rounded-lg transition-all duration-300 bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] disabled:bg-gray-500 disabled:cursor-not-allowed"
                },
                    React.createElement(SparklesIcon, null),
                    t('generateWithAI')
                ),
                React.createElement('button', {
                    onClick: onNew,
                    disabled: !canCreate,
                    title: !canCreate ? t('limitCampaigns') : '',
                    className: "flex items-center justify-center px-4 py-3 font-bold text-sm text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed"
                },
                    React.createElement(PlusCircleIcon, { className: "h-5 w-5 mr-2" }),
                    t('startNewOneShot')
                )
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
        ),
        React.createElement('div', { className: "mt-12 border-t-2 border-[var(--border-accent)]/30 pt-8" },
            React.createElement('h3', { className: 'text-2xl font-bold text-[var(--highlight-secondary)] mb-4 text-center', style: { fontFamily: 'serif' } }, t('premadeAdventures')),
            oneShotTemplates.length > 0 ?
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
                    oneShotTemplates.map(template => {
                        const metadata = template.metadata || {};
                        return React.createElement('div', { key: template.title.en, className: 'p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex flex-col' },
                            React.createElement('h4', { className: 'font-bold text-[var(--accent-primary)] text-lg' }, template.title[language] || template.title.en),
                            React.createElement('p', { className: 'text-sm text-[var(--text-muted)] mt-1 flex-grow' }, template.mainStoryArcs[0].premise[language] || template.mainStoryArcs[0].premise.en),
                            React.createElement('div', { className: 'flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--text-muted)] mt-4 pt-3 border-t border-[var(--border-secondary)]' },
                                metadata.difficulty && React.createElement('span', { className: 'flex items-center font-medium' },
                                    React.createElement(DifficultyIcon, null),
                                    `${t('difficulty')}: `,
                                    React.createElement('span', { className: 'ml-1 font-normal text-[var(--text-secondary)]' }, metadata.difficulty[language] || metadata.difficulty.en)
                                ),
                                metadata.duration && React.createElement('span', { className: 'flex items-center font-medium' },
                                    React.createElement(DurationIcon, null),
                                    `${t('duration')}: `,
                                    React.createElement('span', { className: 'ml-1 font-normal text-[var(--text-secondary)]' }, metadata.duration[language] || metadata.duration.en)
                                ),
                                metadata.players && React.createElement('span', { className: 'flex items-center font-medium' },
                                    React.createElement(PlayersIcon, null),
                                    `${t('players')}: `,
                                    React.createElement('span', { className: 'ml-1 font-normal text-[var(--text-secondary)]' }, metadata.players[language] || metadata.players.en)
                                )
                            ),
                            React.createElement('button', {
                                onClick: () => onLoadTemplate(template),
                                className: 'mt-4 w-full px-4 py-2 font-semibold text-sm text-white rounded-lg transition-all bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)]'
                            }, t('loadAdventure'))
                        );
                    })
                )
            : React.createElement('p', {className: 'text-center text-[var(--text-muted)] italic'}, 'No templates available.')
        )
    );
};

export default OneShotList;
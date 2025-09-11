
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { fabulaClassDetails } from '../data/fabulaUltimaData.js';

const ChevronDownIcon = ({ open }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }));

const CheckIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-3 w-3 text-white", viewBox: "0 0 20 20", fill: "currentColor" }, 
    React.createElement('path', { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })
);

const StarIcon = ({ filled }) => React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-6 w-6 transition-colors ${filled ? 'text-[var(--highlight-secondary)]' : 'text-[var(--text-subtle)] hover:text-[var(--text-muted)]'}`,
    viewBox: "0 0 20 20",
    fill: "currentColor"
}, React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
);


const FabulaClassDetails = ({ className, defaultExpanded = false, acquiredAbilities, onAbilityChange }) => {
    const { t, language } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    if (!className || !fabulaClassDetails[className]) {
        return null;
    }

    const data = fabulaClassDetails[className];
    const isEditable = !!onAbilityChange;

    const getText = (field) => {
        if (typeof field === 'object' && field !== null) {
            return field[language] || field.en;
        }
        return field;
    };

    const renderTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => React.createElement('p', { key: index, className: 'mb-2' }, line));
    };
    
    const parseMaxAcquisitions = (name) => {
        const match = name.match(/\(ç(\d+)\)/);
        if (match && match[1]) {
            return parseInt(match[1], 10);
        }
        return 1;
    };

    const content = React.createElement('div', { className: "p-6 bg-[var(--bg-secondary)]/60 border border-t-0 border-[var(--border-accent)]/50 rounded-b-lg" },
        React.createElement('div', { className: 'mb-6' },
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)] border-b-2 border-[var(--border-accent)]/50 pb-2 mb-3" }, t('classDescription')),
            React.createElement('div', { className: 'text-[var(--text-secondary)] space-y-2' }, renderTextWithLineBreaks(getText(data.description)))
        ),

        data.questions && React.createElement('div', { className: 'mb-6' },
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)] border-b-2 border-[var(--border-accent)]/50 pb-2 mb-3" }, t('classQuestions')),
            React.createElement('ul', { className: 'list-disc list-inside text-[var(--text-secondary)] space-y-1' },
                data.questions.map((q, i) => React.createElement('li', { key: i }, getText(q)))
            )
        ),
        
        data.benefits && React.createElement('div', { className: 'mb-6' },
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)] border-b-2 border-[var(--border-accent)]/50 pb-2 mb-3" }, t('classBenefits')),
            React.createElement('ul', { className: 'list-disc list-inside text-[var(--text-secondary)] space-y-1' },
                data.benefits.map((b, i) => React.createElement('li', { key: i }, getText(b)))
            )
        ),

        data.abilities && React.createElement('div', { className: 'mb-6' },
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)] border-b-2 border-[var(--border-accent)]/50 pb-2 mb-3" }, t('classAbilities')),
            React.createElement('div', { className: 'space-y-4' },
                data.abilities.map((ability, i) => {
                    const abilityId = ability.id;
                    const nameText = getText(ability.name);
                    const maxAcquisitions = parseMaxAcquisitions(nameText);
                    const currentAcquisitions = acquiredAbilities?.[abilityId] || 0;

                    let controls = null;
                    if (isEditable) {
                        if (maxAcquisitions === 1) {
                            controls = React.createElement('button', {
                                type: 'button',
                                'aria-label': currentAcquisitions > 0 ? `${t('acquired')}: ${nameText}` : `${t('acquire')}: ${nameText}`,
                                onClick: () => onAbilityChange(abilityId, currentAcquisitions === 0 ? 1 : 0),
                                className: `flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                                    currentAcquisitions > 0 
                                    ? 'bg-green-800/50 text-green-300 border border-green-600' 
                                    : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-secondary)]'
                                }`
                            },
                                React.createElement('div', { className: `w-4 h-4 rounded-sm border-2 flex items-center justify-center ${currentAcquisitions > 0 ? 'bg-green-500 border-green-400' : 'border-gray-400 bg-[var(--bg-secondary)]'}` },
                                    currentAcquisitions > 0 && React.createElement(CheckIcon)
                                ),
                                React.createElement('span', { className: 'font-semibold' }, currentAcquisitions > 0 ? t('acquired') : t('acquire'))
                            );
                        } else {
                            controls = React.createElement('div', { className: 'flex items-center gap-1' },
                                Array.from({ length: maxAcquisitions }).map((_, index) => {
                                    const starValue = index + 1;
                                    const isFilled = starValue <= currentAcquisitions;
                        
                                    const handleStarClick = () => {
                                        const newCount = starValue;
                                        if (newCount === currentAcquisitions) {
                                            onAbilityChange(abilityId, currentAcquisitions - 1);
                                        } else {
                                            onAbilityChange(abilityId, newCount);
                                        }
                                    };
                                    
                                    return React.createElement('button', {
                                        key: index,
                                        type: 'button',
                                        'aria-label': `Set ${nameText} rank to ${starValue}`,
                                        onClick: handleStarClick,
                                        className: 'p-0.5 rounded-full'
                                    }, React.createElement(StarIcon, { filled: isFilled }));
                                })
                            );
                        }
                    }

                    return React.createElement('div', { key: i },
                        React.createElement('div', { className: 'flex justify-between items-center' },
                            React.createElement('h4', { className: 'font-bold text-[var(--text-primary)]' }, nameText),
                            controls
                        ),
                        React.createElement('p', { className: 'text-[var(--text-muted)] text-sm mt-1' }, getText(ability.description))
                    );
                })
            )
        ),

        data.spells && React.createElement('div', null,
            React.createElement('h3', { className: "text-xl font-semibold text-[var(--accent-primary)] border-b-2 border-[var(--border-accent)]/50 pb-2 mb-3" }, t('classSpells')),
            React.createElement('div', { className: 'space-y-4' },
                data.spells.map((spell, i) => React.createElement('div', { key: i, className: 'p-3 bg-[var(--bg-primary)]/50 rounded-md border border-[var(--border-secondary)]' },
                    React.createElement('div', { className: 'flex justify-between items-baseline' }, 
                        React.createElement('h4', { className: 'font-bold text-[var(--text-primary)]' }, spell.name),
                        React.createElement('span', { className: 'text-xs text-[var(--text-muted)]' }, `MP: ${spell.mp}`)
                    ),
                    React.createElement('div', { className: 'text-xs text-[var(--text-muted)] mb-2' },
                        React.createElement('span', null, `${t('target')}: ${spell.target}`),
                        React.createElement('span', { className: 'mx-2' }, '|'),
                        React.createElement('span', null, `${t('duration')}: ${spell.duration}`)
                    ),
                    React.createElement('p', { className: 'text-[var(--text-secondary)] text-sm' }, spell.description)
                ))
            )
        )
    );

    return React.createElement('div', { className: "w-full max-w-4xl mx-auto mt-6 animate-fade-in" },
        React.createElement('button', {
            onClick: () => setIsExpanded(!isExpanded),
            'aria-expanded': isExpanded,
            className: `w-full flex justify-between items-center text-left p-4 bg-[var(--bg-secondary)] border border-[var(--border-accent)]/50 shadow-lg transition-all duration-300 ${isExpanded ? 'rounded-t-lg' : 'rounded-lg hover:bg-[var(--bg-tertiary)]'}`
        },
            React.createElement('div', null, 
                React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)]", style: { fontFamily: 'serif' } }, getText(data.name)),
                data.alsoKnownAs && React.createElement('p', { className: 'text-sm text-[var(--text-muted)] italic' }, `(${t('alsoKnownAs')}: ${getText(data.alsoKnownAs)})`)
            ),
            React.createElement(ChevronDownIcon, { open: isExpanded })
        ),
        isExpanded && content
    );
};

export default FabulaClassDetails;

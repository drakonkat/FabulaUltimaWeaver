
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { fabulaClassDetails } from '../data/fabulaUltimaData.js';

const ChevronDownIcon = ({ open }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }));

const FabulaClassDetails = ({ className }) => {
    const { t, language } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(true);

    if (!className || !fabulaClassDetails[className]) {
        return null;
    }

    const data = fabulaClassDetails[className];

    const getText = (field) => {
        if (typeof field === 'object' && field !== null) {
            return field[language] || field.en;
        }
        return field;
    };

    const renderTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => React.createElement('p', { key: index, className: 'mb-2' }, line));
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
                data.abilities.map((ability, i) => React.createElement('div', { key: i },
                    React.createElement('h4', { className: 'font-bold text-[var(--text-primary)]' }, getText(ability.name)),
                    React.createElement('p', { className: 'text-[var(--text-muted)] text-sm' }, getText(ability.description))
                ))
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

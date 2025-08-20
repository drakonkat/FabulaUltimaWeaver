

import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

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

const NpcCard = ({ npc }) => React.createElement('div', { className: "mb-4 p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)]" },
    React.createElement('h3', { className: "font-bold text-[var(--accent-primary)] text-lg" }, npc.name),
    React.createElement('p', { className: "text-[var(--text-muted)] whitespace-pre-wrap" }, npc.description)
);

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

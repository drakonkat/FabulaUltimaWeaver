import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

// Icons can be copied from BottomNavBar.js
const CampaignsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }));
const OneShotsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }));
const PlayerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }));


const MainViewSwitcher = ({ appMode, gmView, onModeChange, onGmViewChange }) => {
    const { t } = useTranslation();

    const buttons = [
        {
            id: 'campaigns',
            label: t('campaigns'),
            icon: React.createElement(CampaignsIcon),
            action: () => {
                onModeChange('gm');
                onGmViewChange('campaigns');
            },
            isActive: appMode === 'gm' && gmView === 'campaigns'
        },
        {
            id: 'one-shots',
            label: t('oneShots'),
            icon: React.createElement(OneShotsIcon),
            action: () => {
                onModeChange('gm');
                onGmViewChange('one-shots');
            },
            isActive: appMode === 'gm' && gmView === 'one-shots'
        },
        {
            id: 'player',
            label: t('playerMode'),
            icon: React.createElement(PlayerIcon),
            action: () => {
                onModeChange('player');
            },
            isActive: appMode === 'player'
        }
    ];

    return React.createElement('div', { className: "hidden md:flex container mx-auto justify-center py-4 animate-fade-in" },
        React.createElement('div', { className: "p-1.5 bg-[var(--bg-secondary)] rounded-lg flex text-sm shadow-md border border-[var(--border-secondary)] gap-2" },
            buttons.map(button => React.createElement('button', {
                key: button.id,
                onClick: button.action,
                className: `flex items-center px-4 py-2 rounded-md transition-all duration-300 font-semibold ${button.isActive ? 'bg-[var(--accent-secondary)] text-white shadow-lg' : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'}`
            },
                button.icon,
                button.label
            ))
        )
    );
};

export default MainViewSwitcher;

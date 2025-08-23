import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const ModeSwitcher = ({ mode, onModeChange }) => {
    const { t } = useTranslation();
    return React.createElement('div', { className: "p-1 bg-[var(--bg-secondary)] rounded-lg flex text-sm shadow-md border border-[var(--border-secondary)]" },
        React.createElement('button', {
            onClick: () => onModeChange('gm'),
            className: `px-3 py-1 rounded-md transition-colors font-medium ${mode === 'gm' ? 'bg-[var(--accent-secondary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`
        }, t('gmMode')),
        React.createElement('button', {
            onClick: () => onModeChange('player'),
            className: `px-3 py-1 rounded-md transition-colors font-medium ${mode === 'player' ? 'bg-[var(--accent-secondary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`
        }, t('playerMode'))
    );
};

export default ModeSwitcher;

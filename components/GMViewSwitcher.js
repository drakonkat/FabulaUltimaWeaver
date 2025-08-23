import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const GMViewSwitcher = ({ view, onViewChange }) => {
    const { t } = useTranslation();
    return React.createElement('div', { className: "p-1 bg-[var(--bg-secondary)] rounded-lg flex text-sm shadow-md border border-[var(--border-secondary)]" },
        React.createElement('button', {
            onClick: () => onViewChange('campaigns'),
            className: `px-3 py-1 rounded-md transition-colors font-medium ${view === 'campaigns' ? 'bg-[var(--accent-secondary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`
        }, t('campaigns')),
        React.createElement('button', {
            onClick: () => onViewChange('one-shots'),
            className: `px-3 py-1 rounded-md transition-colors font-medium ${view === 'one-shots' ? 'bg-[var(--accent-secondary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`
        }, t('oneShots'))
    );
};

export default GMViewSwitcher;

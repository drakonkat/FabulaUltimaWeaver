import React from 'react';
import { useTheme } from '../hooks/useTheme.js';
import { useTranslation } from '../hooks/useTranslation.js';

const ThemeIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-[var(--accent-primary)]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 21a4 4 0 01-4-4V5a4 4 0 014-4h10a4 4 0 014 4v12a4 4 0 01-4 4H7zM3 10h18M7 3v18" })
);

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return React.createElement('div', { className: "flex items-center gap-2" },
        React.createElement(ThemeIcon, null),
        React.createElement('select', {
            value: theme,
            onChange: handleThemeChange,
            className: "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-accent)] rounded-md py-1 px-2 text-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)]",
            'aria-label': t('theme')
        },
            React.createElement('option', { value: "dark" }, t('darkTheme')),
            React.createElement('option', { value: "light" }, t('lightTheme')),
            React.createElement('option', { value: "arcane" }, t('arcaneTheme')),
            React.createElement('option', { value: "draconic" }, t('draconicTheme'))
        )
    );
};

export default ThemeSwitcher;

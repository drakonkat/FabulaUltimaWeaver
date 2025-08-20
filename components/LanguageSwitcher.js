import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const LanguageSwitcher = () => {
    const { language, setLanguage, t } = useTranslation();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return React.createElement('div', { className: "flex items-center gap-2" },
        React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" },
            React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.884 5.75 7.232 5.75c.349 0 .72.02 1.07.271.35.25.626.628.626 1.107 0 .38-.158.74-.43.992a2.33 2.33 0 01-1.282.642c-.294.062-.598.093-.91.093v.003c-.312 0-.616-.031-.91-.093a2.33 2.33 0 01-1.281-.642c-.273-.252-.43-.612-.43-.992 0-.479.275-.857.625-1.107zM10 12a1 1 0 100 2h.01a1 1 0 100-2H10z", clipRule: "evenodd" })
        ),
        React.createElement('select',
            {
                value: language,
                onChange: handleLanguageChange,
                className: "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-accent)] rounded-md py-1 px-2 text-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)]",
                'aria-label': t('language')
            },
            React.createElement('option', { value: "en" }, "English"),
            React.createElement('option', { value: "it" }, "Italiano")
        )
    );
};

export default LanguageSwitcher;

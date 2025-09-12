import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../i18n/locales.js';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        try {
            return localStorage.getItem('gmsCodexLanguage') || 'en';
        } catch (e) {
            console.error("Could not read language from localStorage", e);
            return 'en';
        }
    });

    const setLanguage = (newLanguage) => {
        try {
            localStorage.setItem('gmsCodexLanguage', newLanguage);
        } catch (e) {
            console.error("Could not save language to localStorage", e);
        }
        setLanguageState(newLanguage);
    };

    const t = (key, replacements) => {
        const lang_map = translations[language] || translations['en'];
        let translation = lang_map[key] || key;

        if (replacements) {
            for (const placeholder in replacements) {
                translation = translation.replace(
                    new RegExp(`\\{${placeholder}\\}`, 'g'),
                    replacements[placeholder]
                );
            }
        }
        
        return translation;
    };

    return React.createElement(
        LanguageContext.Provider,
        { value: { language, setLanguage, t } },
        children
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
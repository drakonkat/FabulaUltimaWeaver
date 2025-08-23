
import React, { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher.js';
import ThemeSwitcher from './ThemeSwitcher.js';
import { useTranslation } from '../hooks/useTranslation.js';
import ModeSwitcher from './ModeSwitcher.js';

const BackIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" })
);

const SettingsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
);

const BottomNavBar = ({ onBack, showBack, user, onSignOut, mode, onModeChange, showModeSwitcher, onOpenBackupModal }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);
    
    const LeftContent = () => {
        if (showBack) {
            return React.createElement('button', { onClick: onBack, className: "flex items-center p-2 text-[var(--text-primary)] rounded-full hover:bg-[var(--bg-tertiary)]" },
                React.createElement(BackIcon, null)
            );
        }
        if (showModeSwitcher) {
            return React.createElement(ModeSwitcher, { mode, onModeChange });
        }
        return React.createElement('div', { className: 'w-10 h-10' }); // Placeholder for alignment
    };
    
    return React.createElement('nav', {
        className: "md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/90 backdrop-blur-sm border-t-2 border-[var(--border-accent)] shadow-lg z-50 text-[var(--text-primary)]"
    },
        React.createElement('div', { className: "container mx-auto px-4 h-16 flex justify-between items-center" },
            React.createElement('div', { className: 'flex-1 flex justify-start' },
                React.createElement(LeftContent, null)
            ),
            React.createElement('div', { className: "text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] tracking-wider", style: { fontFamily: 'serif' } }, "GDR Support"),
            React.createElement('div', { className: 'flex-1 flex justify-end relative', ref: menuRef },
                isMenuOpen && React.createElement('div', {
                    className: "absolute bottom-full right-0 mb-3 p-4 bg-[var(--bg-tertiary)] rounded-lg shadow-xl border border-[var(--border-primary)] flex flex-col gap-4 animate-fade-in-up w-52"
                },
                    React.createElement(ThemeSwitcher, null),
                    React.createElement(LanguageSwitcher, null),
                    React.createElement('button', { 
                        onClick: () => {
                            setIsMenuOpen(false);
                            onOpenBackupModal();
                        },
                        className: "w-full text-left px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-quaternary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] transition-colors"
                    },
                        t('backupAndRestore')
                    ),
                    user && React.createElement('button', { onClick: onSignOut, className: "w-full text-left px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-quaternary)] hover:bg-[var(--danger-bg)] text-[var(--text-primary)] hover:text-[var(--danger-text)] transition-colors" }, t('signOut'))
                ),
                React.createElement('button', { onClick: () => setIsMenuOpen(prev => !prev), className: "p-2 rounded-full hover:bg-[var(--bg-tertiary)]" },
                    user ? React.createElement('img', { src: user.picture, alt: user.name, className: "h-8 w-8 rounded-full border-2 border-[var(--accent-primary)]" })
                         : React.createElement(SettingsIcon, null)
                )
            )
        )
    );
};

export default BottomNavBar;

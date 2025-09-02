

import React, { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher.js';
import ThemeSwitcher from './ThemeSwitcher.js';
import { useTranslation } from '../hooks/useTranslation.js';

const CampaignsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }));
const OneShotsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }));
const PlayerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mb-1", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }));
const SettingsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
);

const TabButton = ({ icon, label, isActive, onClick }) => {
    return React.createElement('button', {
        onClick,
        className: `flex flex-col items-center justify-center flex-1 py-2 transition-colors duration-200 ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`
    },
        icon,
        React.createElement('span', { className: 'text-xs font-medium' }, label)
    );
};

const BottomNavBar = ({ user, onSignOut, onOpenBackupModal, mode, onModeChange, gmView, onGmViewChange, isVisible }) => {
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

    if (!isVisible) {
        return null;
    }

    const tabs = [
        { id: 'campaigns', label: t('campaigns'), icon: React.createElement(CampaignsIcon), isActive: mode === 'gm' && gmView === 'campaigns', action: () => { onModeChange('gm'); onGmViewChange('campaigns'); } },
        { id: 'one-shots', label: t('oneShots'), icon: React.createElement(OneShotsIcon), isActive: mode === 'gm' && gmView === 'one-shots', action: () => { onModeChange('gm'); onGmViewChange('one-shots'); } },
        { id: 'player', label: t('playerMode'), icon: React.createElement(PlayerIcon), isActive: mode === 'player', action: () => onModeChange('player') },
        { id: 'settings', label: t('theme'), icon: React.createElement(SettingsIcon), isActive: isMenuOpen, action: () => setIsMenuOpen(p => !p) }
    ];
    
    return React.createElement('nav', {
        className: "md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/90 backdrop-blur-sm border-t-2 border-[var(--border-accent)] shadow-lg z-50 text-[var(--text-primary)]"
    },
        React.createElement('div', { className: 'relative', ref: menuRef },
            isMenuOpen && React.createElement('div', {
                className: "absolute bottom-full right-0 mb-3 p-4 bg-[var(--bg-tertiary)] rounded-lg shadow-xl border border-[var(--border-primary)] flex flex-col gap-4 animate-fade-in-up w-52"
            },
                React.createElement(ThemeSwitcher, null),
                React.createElement(LanguageSwitcher, null),
                React.createElement('button', { 
                    onClick: () => { setIsMenuOpen(false); onOpenBackupModal(); },
                    className: "w-full text-left px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-quaternary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] transition-colors"
                }, t('backupAndRestore')),
                user && React.createElement('button', { onClick: onSignOut, className: "w-full text-left px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-quaternary)] hover:bg-[var(--danger-bg)] text-[var(--text-primary)] hover:text-[var(--danger-text)] transition-colors" }, t('signOut'))
            )
        ),
        React.createElement('div', { className: "container mx-auto flex justify-around items-center h-16" },
            tabs.map(tab => React.createElement(TabButton, {
                key: tab.id,
                icon: tab.icon,
                label: tab.label,
                isActive: tab.isActive,
                onClick: tab.action,
            }))
        )
    );
};

export default BottomNavBar;
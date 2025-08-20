
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher.js';
import ThemeSwitcher from './ThemeSwitcher.js';
import { useTranslation } from '../hooks/useTranslation.js';

const SwordIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-[var(--highlight-secondary)]", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement('path', { d: "M14.83,4.17l-2.83,2.83L14.83,9.83,16.24,8.41,18.41,6.24,19.83,4.83,18.41,3.41,14.83,4.17M13.41,5.59,4.41,14.59,2,17v5h5l2.41-2.41,9-9L13.41,5.59z" })
);

const BackIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" })
);

const Header = ({ onBack, showBack, user, onSignOut }) => {
  const { t } = useTranslation();

  return React.createElement('header', { className: "bg-[var(--bg-secondary)]/80 backdrop-blur-sm shadow-lg shadow-[var(--accent-tertiary)]/10 py-3 px-4 sm:px-8 border-b-2 border-[var(--border-accent)] sticky top-0 z-50" },
    React.createElement('div', { className: "container mx-auto flex items-center justify-between" },
      React.createElement('div', { className: "flex-1" },
        showBack && React.createElement('button', { onClick: onBack, className: "flex items-center px-3 py-2 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors duration-300" },
          React.createElement(BackIcon, null),
          t('backToCampaigns')
        )
      ),
      React.createElement('div', { className: "flex items-center justify-center gap-4 flex-shrink-0" },
        React.createElement(SwordIcon, null),
        React.createElement('h1', { className: "text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] tracking-wider text-center", style: { fontFamily: 'serif' } },
          "Adventure Weaver"
        ),
        React.createElement(SwordIcon, null)
      ),
      React.createElement('div', { className: "flex-1 flex justify-end items-center gap-4" },
        React.createElement(ThemeSwitcher, null),
        React.createElement(LanguageSwitcher, null),
        user && React.createElement('div', { className: "flex items-center gap-3" },
          React.createElement('img', { src: user.picture, alt: user.name, className: "h-8 w-8 rounded-full border-2 border-[var(--accent-primary)]" }),
          React.createElement('button', { onClick: onSignOut, className: "px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] transition-colors" },
            t('signOut')
          )
        )
      )
    )
  );
};

export default Header;
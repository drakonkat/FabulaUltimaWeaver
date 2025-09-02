

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

const GithubIcon = () => React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  className: "h-6 w-6"
},
  React.createElement('path', { d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" })
);

const BackupIcon = () => React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: "h-6 w-6"
},
    React.createElement('path', { d: "M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v3a1 1 0 001 1h12a1 1 0 001-1v-3a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM5 8a5 5 0 0110 0v3.586l-1.293 1.293A1 1 0 0013 14v2H7v-2a1 1 0 00-.707-.293L5 11.586V8z" })
);


const Header = ({ onBack, showBack, user, onSignOut, onOpenBackupModal }) => {
  const { t } = useTranslation();

  return React.createElement('header', { className: "flex bg-[var(--bg-secondary)]/80 backdrop-blur-sm shadow-lg shadow-[var(--accent-tertiary)]/10 py-3 px-4 sm:px-8 border-b-2 border-[var(--border-accent)] sticky top-0 z-50" },
    React.createElement('div', { className: "container mx-auto flex items-center justify-between" },
      React.createElement('div', { className: "flex-1" },
        showBack ? React.createElement('button', { onClick: onBack, className: "flex items-center px-3 py-2 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 hover:bg-[var(--accent-tertiary)] text-white transition-colors duration-300" },
          React.createElement(BackIcon, null),
          React.createElement('span', { className: 'hidden sm:inline' }, t('backToList'))
        ) : React.createElement('div', { className: 'w-10' })
      ),
      React.createElement('div', { className: "flex items-center justify-center gap-2 sm:gap-4 flex-shrink-0" },
        React.createElement(SwordIcon, null),
        React.createElement('h1', { className: "text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] tracking-wider text-center", style: { fontFamily: 'serif' } },
          "Adventure Weaver"
        ),
        React.createElement(SwordIcon, null)
      ),
      React.createElement('div', { className: "flex-1 flex justify-end items-center" },
          React.createElement('div', { className: 'hidden md:flex items-center gap-4' },
            React.createElement('a', { 
                href: "https://github.com/drakonkat/FabulaUltimaWeaver",
                target: "_blank",
                rel: "noopener noreferrer",
                'aria-label': "View on GitHub",
                className: "text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              },
                React.createElement(GithubIcon, null)
            ),
            React.createElement('button', {
                onClick: onOpenBackupModal,
                'aria-label': t('backupAndRestore'),
                title: t('backupAndRestore'),
                className: "text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            },
                React.createElement(BackupIcon, null)
            ),
            React.createElement(ThemeSwitcher, null),
            React.createElement(LanguageSwitcher, null),
            user && React.createElement('div', { className: "flex items-center gap-3" },
              React.createElement('img', { src: user.picture, alt: user.name, className: "h-8 w-8 rounded-full border-2 border-[var(--accent-primary)]" }),
              React.createElement('button', { onClick: onSignOut, className: "px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] transition-colors" },
                t('signOut')
              )
            )
        ),
        React.createElement('div', { className: 'md:hidden w-10' }) // Spacer for mobile
      )
    )
  );
};

export default Header;
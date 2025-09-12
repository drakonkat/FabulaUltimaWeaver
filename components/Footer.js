

import React from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const Footer = () => {
  const { t } = useTranslation();

  return React.createElement('footer', { className: "w-full bg-[var(--bg-secondary)]/50 border-t-2 border-[var(--border-secondary)] mt-auto py-4 px-4" },
    React.createElement('div', { className: "container mx-auto text-center text-[var(--text-muted)] text-sm" },
      React.createElement('div', { className: "flex justify-center items-center gap-6 mb-2" },
        React.createElement('a', { href: "#", className: "hover:text-[var(--accent-primary)] transition-colors" }, t('privacyPolicy')),
        React.createElement('span', { className: "select-none" }, "|"),
        React.createElement('a', { href: "#", className: "hover:text-[var(--accent-primary)] transition-colors" }, t('termsAndConditions'))
      ),
      React.createElement('p', null, `© ${new Date().getFullYear()} The GM's Codex. All rights reserved.`)
    )
  );
};

export default Footer;
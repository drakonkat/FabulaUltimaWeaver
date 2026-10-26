import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

export const safeLinkUrl = (value) => {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch {
        return '';
    }
};

const UsefulLinks = ({ adventure, onUpdate }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const links = adventure.usefulLinks || [];
    const inputClass = 'w-full min-w-0 p-2 rounded-md bg-[var(--bg-secondary)] border-2 border-[var(--border-primary)] focus:border-[var(--border-accent-light)]';

    const addLink = (event) => {
        event.preventDefault();
        const href = safeLinkUrl(url);
        if (!href) { setError(true); return; }
        onUpdate({ ...adventure, usefulLinks: [...links, { id: crypto.randomUUID(), name: name.trim() || href, url: href }] });
        setName('');
        setUrl('');
        setError(false);
    };

    return React.createElement('section', { className: 'w-full max-w-4xl mx-auto mt-6 p-4 rounded-lg border border-[var(--border-primary)]' },
        React.createElement('h2', { className: 'text-lg font-bold text-[var(--accent-primary)] mb-3' }, t('usefulLinks')),
        React.createElement('ul', { className: 'space-y-2 mb-3' }, links.map(link =>
            React.createElement('li', { key: link.id, className: 'flex items-center justify-between gap-3' },
                safeLinkUrl(link.url)
                    ? React.createElement('a', { href: safeLinkUrl(link.url), target: '_blank', rel: 'noopener noreferrer', className: 'min-w-0 break-all text-[var(--accent-primary)] underline hover:opacity-80' }, link.name || link.url)
                    : React.createElement('span', { className: 'min-w-0 break-all' }, link.name || link.url),
                React.createElement('button', {
                    type: 'button', className: 'shrink-0 px-3 py-2 text-[var(--danger)] hover:underline',
                    'aria-label': `${t('remove')}: ${link.name || link.url}`,
                    onClick: () => onUpdate({ ...adventure, usefulLinks: links.filter(item => item.id !== link.id) }),
                }, t('remove'))
            )
        )),
        React.createElement('form', { onSubmit: addLink, className: 'grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-end' },
            React.createElement('label', { className: 'min-w-0 text-sm' }, t('linkName'),
                React.createElement('input', { value: name, onChange: e => setName(e.target.value), className: inputClass })
            ),
            React.createElement('label', { className: 'min-w-0 text-sm' }, t('linkUrl'),
                React.createElement('input', { type: 'url', required: true, value: url, placeholder: 'https://example.com', onChange: e => { setUrl(e.target.value); setError(false); }, className: inputClass, 'aria-invalid': error })
            ),
            React.createElement('button', { type: 'submit', className: 'px-4 py-2 rounded-md bg-[var(--accent-tertiary)] text-white hover:opacity-90' }, t('addLink'))
        ),
        error && React.createElement('p', { role: 'alert', className: 'mt-2 text-sm text-[var(--danger)]' }, t('invalidLinkUrl'))
    );
};

export default UsefulLinks;

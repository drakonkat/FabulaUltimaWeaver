import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../hooks/useTranslation.js';
import UsefulLinks, { safeLinkUrl } from './UsefulLinks.js';

assert.equal(safeLinkUrl('https://example.com/rules?q=magic#spells'), 'https://example.com/rules?q=magic#spells');
assert.equal(safeLinkUrl('http://localhost:3000'), 'http://localhost:3000/');
for (const value of ['', '/relative', 'broken', 'javascript:alert(1)', 'data:text/html,test', 'file:///secret', 'ftp://example.com']) {
    assert.equal(safeLinkUrl(value), '', value);
}

globalThis.localStorage = { getItem: () => 'it' };
const render = adventure => renderToStaticMarkup(React.createElement(LanguageProvider, null,
    React.createElement(UsefulLinks, { adventure, onUpdate: () => {} })
));
assert.match(render({}), /Link utili/);
const html = render({ usefulLinks: [
    { id: '1', name: 'Regole', url: 'https://example.com/rules' },
    { id: '2', name: 'Unsafe imported link', url: 'javascript:alert(1)' },
] });
assert.match(html, /href="https:\/\/example.com\/rules"/);
assert.match(html, /rel="noopener noreferrer"/);
assert.doesNotMatch(html, /href="javascript:/);
assert.match(html, /Unsafe imported link/);
delete globalThis.localStorage;
console.log('Useful links checks passed');

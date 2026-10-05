import assert from 'node:assert/strict';
import { askAdventure } from './adventureQuestions.js';

const adventure = { title: 'The Bell', locations: [{ name: 'Root Cavern', description: 'Below the old well.' }], events: [{ description: 'The sentinel blocks the cavern.' }] };
const focus = { section: 'Events', item: adventure.events[0] };
const history = [{ role: 'user', text: 'Which cavern?' }, { role: 'model', text: 'Root Cavern.' }, { role: 'user', text: 'Where is the entrance?' }];
const before = JSON.stringify({ adventure, focus, history });
const env = { VITE_AI_BASE_URL: 'https://proxy.example/v1', VITE_AI_API_KEY: 'test-token', VITE_AI_MODEL: 'test-model' };
const originalFetch = globalThis.fetch;
try {
    globalThis.fetch = async (_url, options) => {
        const body = JSON.parse(options.body);
        assert.equal(body.response_format, undefined);
        assert.deepEqual(body.messages.map(message => message.role), ['system', 'user', 'assistant', 'user']);
        assert.match(body.messages[0].content, /Root Cavern/);
        assert.match(body.messages[0].content, /The sentinel blocks the cavern/);
        assert.match(body.messages[0].content, /Cite supporting section names/);
        assert.match(body.messages[0].content, /do not invent/);
        assert.match(body.messages[0].content, /Never rewrite/);
        assert.match(body.messages[0].content, /Respond in Italian/);
        return Response.json({ choices: [{ message: { content: 'Luoghi — Root Cavern: sotto il vecchio pozzo.' } }] });
    };
    assert.match(await askAdventure(adventure, focus, history, 'it', env), /vecchio pozzo/);
    assert.equal(JSON.stringify({ adventure, focus, history }), before);
    await assert.rejects(askAdventure(adventure, focus, [], 'it', env), /question/);
    await assert.rejects(askAdventure(adventure, focus, [{ role: 'user', text: ' ' }], 'it', env), /question/);
    globalThis.fetch = async () => new Response('', { status: 429 });
    await assert.rejects(askAdventure(adventure, focus, history, 'it', env), /429/);
    assert.equal(JSON.stringify({ adventure, focus, history }), before);
} finally {
    globalThis.fetch = originalFetch;
}
console.log('Read-only adventure question checks passed.');

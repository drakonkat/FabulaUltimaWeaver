import assert from 'node:assert/strict';
import { generateContent } from './aiClient.js';

const env = { VITE_AI_BASE_URL: 'https://proxy.example/v1/', VITE_AI_API_KEY: 'test-token', VITE_AI_MODEL: 'test-model' };
const request = {
    contents: [
        { role: 'user', parts: [{ inlineData: { mimeType: 'image/png', data: 'AA==' } }, { text: 'Describe this.' }] },
        { role: 'model', parts: [{ text: 'A map.' }] },
        { role: 'user', parts: [{ text: 'Continue.' }] },
    ],
    config: { systemInstruction: 'Be a GM.', responseSchema: { type: 'object', properties: { name: { type: 'string' } } } },
};
const originalFetch = globalThis.fetch;
try {
    globalThis.fetch = async (url, options) => {
        assert.equal(String(url), 'https://proxy.example/v1/chat/completions');
        assert.equal(options.headers.Authorization, 'Bearer test-token');
        const body = JSON.parse(options.body);
        assert.equal(body.model, 'test-model');
        assert.deepEqual(body.messages.map(m => m.role), ['system', 'user', 'assistant', 'user']);
        assert.match(body.messages[0].content, /"properties"/);
        assert.equal(body.messages[1].content[0].image_url.url, 'data:image/png;base64,AA==');
        assert.equal(body.response_format.type, 'json_object');
        return Response.json({ choices: [{ message: { content: '{"name":"Map"}' }, finish_reason: 'stop' }] });
    };
    assert.deepEqual(await generateContent(request, env), { text: '{"name":"Map"}' });
    await assert.rejects(generateContent(request, {}), /AI is not configured/);
    await assert.rejects(generateContent(request, { ...env, VITE_AI_BASE_URL: 'http://unsafe.example' }), /HTTPS/);
    globalThis.fetch = async (_url, options) => {
        const body = JSON.parse(options.body);
        assert.equal(body.response_format, undefined);
        assert.equal(body.messages[1].content, 'Hello');
        return Response.json({ choices: [{ message: { content: 'Hi' } }] });
    };
    assert.equal((await generateContent({ contents: { parts: [{ text: 'Hello' }] } }, env)).text, 'Hi');
    globalThis.fetch = async () => new Response('', { status: 429 });
    await assert.rejects(generateContent(request, env), /HTTP 429/);
    globalThis.fetch = async () => { throw new TypeError('Failed to fetch'); };
    await assert.rejects(generateContent(request, env), /CORS/);
    globalThis.fetch = async () => Response.json({ choices: [{ finish_reason: 'length', message: { content: '{' } }] });
    await assert.rejects(generateContent(request, env), /truncated/);
    globalThis.fetch = async () => Response.json({ choices: [] });
    await assert.rejects(generateContent(request, env), /empty or invalid/);
} finally {
    globalThis.fetch = originalFetch;
}
console.log('AI client checks passed.');

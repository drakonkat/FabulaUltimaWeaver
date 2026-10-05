// This token is public in a static build. Enforce quotas and model limits on the proxy.
export async function generateContent({ contents, config = {} }, env = import.meta.env ?? {}) {
    const { VITE_AI_BASE_URL: baseUrl, VITE_AI_API_KEY: apiKey, VITE_AI_MODEL: model } = env;
    if (!baseUrl || !apiKey || !model) {
        throw new Error('AI is not configured. Set VITE_AI_BASE_URL, VITE_AI_API_KEY and VITE_AI_MODEL before building.');
    }
    const endpoint = new URL(`${baseUrl.replace(/\/+$/, '')}/chat/completions`);
    if (endpoint.protocol !== 'https:' && !(endpoint.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(endpoint.hostname))) {
        throw new Error('The AI proxy URL must use HTTPS.');
    }
    const messages = [{
        role: 'system',
        content: (config.systemInstruction || '') + (config.responseSchema
            ? `\nReturn only a JSON object matching this schema (nullable fields may be null):\n${JSON.stringify(config.responseSchema)}`
            : ''),
    }, ...(Array.isArray(contents) ? contents : [contents]).map(({ role, parts }) => ({
        role: role === 'model' ? 'assistant' : (role || 'user'),
        content: parts.some(part => part.inlineData)
            ? parts.map(part => part.inlineData
                ? { type: 'image_url', image_url: { url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` } }
                : { type: 'text', text: part.text })
            : parts.map(part => part.text).join('\n'),
    }))];

    let response;
    try {
        response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model,
                messages,
                stream: false,
                ...(config.responseSchema ? { response_format: { type: 'json_object' } } : {}),
            }),
            signal: AbortSignal.timeout(120_000),
        });
    } catch (error) {
        throw new Error(error.name === 'TimeoutError'
            ? 'The AI request timed out. Please try again.'
            : 'Cannot reach the AI proxy. Check your connection and the proxy CORS allowed origins.');
    }
    if (!response.ok) {
        throw new Error(`AI proxy request failed (HTTP ${response.status}). ${response.status === 429
            ? 'Usage limit reached. Please try again later.'
            : 'Check the proxy token, model and allowed origins.'}`);
    }
    const data = await response.json();
    const choice = data.choices?.[0];
    if (choice?.finish_reason === 'length') {
        throw new Error('The AI response was truncated. Try a shorter request or increase the proxy output limit.');
    }
    const text = choice?.message?.content;
    if (typeof text !== 'string' || !text.trim()) {
        throw new Error('The AI returned an empty or invalid response. Please try again.');
    }
    return { text };
}

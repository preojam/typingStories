const baseURL = 'http://localhost:8080/api';
const defaultHeaders = { 'Content-Type': 'application/json' };

/**
 * Hilfsfunktion für fetch-Aufrufe
 * @param {string} path – Endpunkt-Pfad (z.B. '/scores?storyId=1')
 * @param {object} options – fetch-Optionen (method, headers, body etc.)
 * @returns {Promise<any>}
 */
async function request(path, options = {}) {
    const res = await fetch(`${baseURL}${path}`, {
        headers: defaultHeaders,
        ...options
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    // Manche Antworten haben keinen Body (z.B. 204)
    return res.status !== 204 ? res.json() : null;
}

/**
 * GET /api/scores?storyId={id}
 * @param {number|string} storyId
 * @returns {Promise<Array>}
 */
export async function fetchScoresByStory(storyId) {
    const query = `?storyId=${encodeURIComponent(storyId)}`;
    return await request(`/scores${query}`);
}

/**
 * POST /api/scores
 * Body: { story: { id }, component, value }
 * @param {{ storyId: number, component: string, value: number }} params
 * @returns {Promise<Object>}
 */
export async function createScore({ storyId, component, value }) {
    return await request('/scores', {
        method: 'POST',
        body: JSON.stringify({
            story:     { id: storyId },
            component: component,
            value:     value
        })
    });
}
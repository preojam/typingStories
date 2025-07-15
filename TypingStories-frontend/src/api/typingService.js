const baseURL = 'http://localhost:8080/api';
const defaultHeaders = { 'Content-Type': 'application/json' };

/**
 * Hilfsfunktion für fetch-Aufrufe
 * @param {string} path – Endpunkt-Pfad (inkl. Query-String, z.B. '/typingresults/1')
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
    // Bei 204 No Content gibt's keinen Body
    return res.status !== 204 ? res.json() : null;
}

/**
 * Alle TypingResults abrufen
 * GET /api/typingresults
 * @returns {Promise<Array>}
 */
export async function fetchAllTypingResults() {
    return await request('/typingresults');
}

/**
 * Einzelnes TypingResult abrufen
 * GET /api/typingresults/{id}
 * @param {number|string} resultId
 * @returns {Promise<Object>}
 */
export async function fetchTypingResultById(resultId) {
    return await request(`/typingresults/${encodeURIComponent(resultId)}`);
}

/**
 * Neues TypingResult anlegen
 * POST /api/typingresults
 * @param {{ username: string, wpm: number, errors: number, story: { id: number } }} resultData
 * @returns {Promise<Object>}
 */
export async function createTypingResult(resultData) {
    return await request('/typingresults', {
        method: 'POST',
        body: JSON.stringify(resultData)
    });
}

/**
 * Bestehendes TypingResult aktualisieren
 * PUT /api/typingresults/{id}
 * @param {number|string} resultId
 * @param {{ username: string, wpm: number, errors: number, story: { id: number } }} resultData
 * @returns {Promise<Object>}
 */
export async function updateTypingResult(resultId, resultData) {
    return await request(`/typingresults/${encodeURIComponent(resultId)}`, {
        method: 'PUT',
        body: JSON.stringify(resultData)
    });
}

/**
 * TypingResult löschen
 * DELETE /api/typingresults/{id}
 * @param {number|string} resultId
 * @returns {Promise<void>}
 */
export async function deleteTypingResult(resultId) {
    await request(`/typingresults/${encodeURIComponent(resultId)}`, {
        method: 'DELETE'
    });
}
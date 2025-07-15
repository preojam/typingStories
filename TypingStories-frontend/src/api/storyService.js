const baseURL = 'http://localhost:8080/api';
const defaultHeaders = { 'Content-Type': 'application/json' };

/**
 * Hilfsfunktion für fetch-Aufrufe
 * @param {string} path – Endpunkt-Pfad (inkl. Query-String, z.B. '/stories?genreId=1')
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
    // Manche DELETE-Antworten liefern keinen Body
    return res.status !== 204 ? res.json() : null;
}

/**
 * Alle Stories abrufen
 * GET /api/stories
 * @returns {Promise<Array>}
 */
export async function fetchAllStories() {
    return await request('/stories');
}

/**
 * Einzelne Story abrufen
 * GET /api/stories/{id}
 * @param {number|string} storyId
 * @returns {Promise<Object>}
 */
export async function fetchStoryById(storyId) {
    return await request(`/stories/${encodeURIComponent(storyId)}`);
}

/**
 * Neue Story anlegen
 * POST /api/stories
 * @param {{ title: string, content: string, genre: { id: number } }} storyData
 * @returns {Promise<Object>}
 */
export async function createStory(storyData) {
    return await request('/stories', {
        method: 'POST',
        body: JSON.stringify(storyData)
    });
}

/**
 * Bestehende Story aktualisieren
 * PUT /api/stories/{id}
 * @param {number|string} storyId
 * @param {{ title: string, content: string, genre: { id: number } }} storyData
 * @returns {Promise<Object>}
 */
export async function updateStory(storyId, storyData) {
    return await request(`/stories/${encodeURIComponent(storyId)}`, {
        method: 'PUT',
        body: JSON.stringify(storyData)
    });
}

/**
 * Story löschen
 * DELETE /api/stories/{id}
 * @param {number|string} storyId
 * @returns {Promise<void>}
 */
export async function deleteStory(storyId) {
    await request(`/stories/${encodeURIComponent(storyId)}`, {
        method: 'DELETE'
    });
}

/**
 * Stories nach Genre filtern
 * GET /api/stories?genreId={genreId}
 * @param {number|string} genreId
 * @returns {Promise<Array>}
 */
export async function fetchStoriesByGenre(genreId) {
    const query = `?genreId=${encodeURIComponent(genreId)}`;
    return await request(`/stories${query}`);
}

/**
 * Früher gelesene (letzte) Story abrufen
 * GET /api/stories/last
 * @returns {Promise<Object>}
 */
export async function fetchLastReadStory() {
    return await request('/stories/last');
}

/**
 * Eigene Stories abrufen
 * GET /api/stories/mine
 * @returns {Promise<Array>}
 */
export async function fetchMyStories() {
    return await request('/stories/mine');
}

/**
 * Stories per Suchbegriff suchen
 * GET /api/stories/search?query={searchTerm}
 * @param {string} searchTerm
 * @returns {Promise<Array>}
 */
export async function searchStories(searchTerm) {
    const query = `?query=${encodeURIComponent(searchTerm)}`;
    return await request(`/stories/search${query}`);
}
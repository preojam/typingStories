const baseURL = 'http://localhost:8080/api';
const defaultHeaders = { 'Content-Type': 'application/json' };

/**
 * Hilfsfunktion für fetch-Aufrufe
 * @param {string} path – Endpunkt-Pfad (z.B. '/genres')
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
 * Gibt alle Genres zurück
 * GET /api/genres
 * @returns {Promise<Array>}
 */
export async function fetchAllGenres() {
    return await request('/genres');
}

/**
 * Legt ein neues Genre an
 * POST /api/genres
 * @param {{ name: string }} genreData
 * @returns {Promise<Object>}
 */
export async function createGenre(genreData) {
    return await request('/genres', {
        method: 'POST',
        body: JSON.stringify(genreData)
    });
}

/**
 * Aktualisiert ein bestehendes Genre
 * PUT /api/genres/{id}
 * @param {number} genreId
 * @param {{ name: string }} genreData
 * @returns {Promise<Object>}
 */
export async function updateGenre(genreId, genreData) {
    return await request(`/genres/${genreId}`, {
        method: 'PUT',
        body: JSON.stringify(genreData)
    });
}

/**
 * Löscht ein Genre
 * DELETE /api/genres/{id}
 * @param {number} genreId
 * @returns {Promise<void>}
 */
export async function deleteGenre(genreId) {
    await request(`/genres/${genreId}`, {
        method: 'DELETE'
    });
}

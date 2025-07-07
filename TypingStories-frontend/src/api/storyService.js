import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

/**
 * Alle Stories abrufen
 * GET /api/stories
 * @returns {Promise<Array>}
 */
export function fetchAllStories() {
    return apiClient
        .get('/stories')
        .then(res => res.data);
}

/**
 * Einzelne Story abrufen
 * GET /api/stories/{id}
 * @param {number} storyId
 * @returns {Promise<Object>}
 */
export function fetchStoryById(storyId) {
    return apiClient
        .get(`/stories/${storyId}`)
        .then(res => res.data);
}

/**
 * Neue Story anlegen
 * POST /api/stories
 * @param {{ title: string, content: string, genre: { id: number } }} storyData
 * @returns {Promise<Object>}
 */
export function createStory(storyData) {
    return apiClient
        .post('/stories', storyData)
        .then(res => res.data);
}

/**
 * Bestehende Story aktualisieren
 * PUT /api/stories/{id}
 * @param {number} storyId
 * @param {{ title: string, content: string, genre: { id: number } }} storyData
 * @returns {Promise<Object>}
 */
export function updateStory(storyId, storyData) {
    return apiClient
        .put(`/stories/${storyId}`, storyData)
        .then(res => res.data);
}

/**
 * Story löschen
 * DELETE /api/stories/{id}
 * @param {number} storyId
 * @returns {Promise}
 */
export function deleteStory(storyId) {
    return apiClient.delete(`/stories/${storyId}`);
}

/**
 * Stories nach Genre filtern
 * GET /api/stories?genreId={genreId}
 * @param {number} genreId
 * @returns {Promise<Array>}
 */
export function fetchStoriesByGenre(genreId) {
    return apiClient
        .get('/stories', { params: { genreId } })
        .then(res => res.data);
}

/**
 * Früher gelesene (letzte) Story abrufen
 * GET /api/stories/last
 * @returns {Promise<Object>}
 */
export function fetchLastReadStory() {
    return apiClient
        .get('/stories/last')
        .then(res => res.data);
}

/**
 * Eigene Stories abrufen
 * GET /api/stories/mine
 * @returns {Promise<Array>}
 */
export function fetchMyStories() {
    return apiClient
        .get('/stories/mine')
        .then(res => res.data);
}

/**
 * Stories per Suchbegriff suchen
 * GET /api/stories/search?query={searchTerm}
 * @param {string} searchTerm
 * @returns {Promise<Array>}
 */
export function searchStories(searchTerm) {
    return apiClient
        .get('/stories/search', { params: { query: searchTerm } })
        .then(res => res.data);
}

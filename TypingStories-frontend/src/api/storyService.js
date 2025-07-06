import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

/**
 * Alle Stories abrufen
 * GET /api/stories
 */
export function fetchAllStories() {
    return apiClient.get('/stories');
}

/**
 * Einzelne Story abrufen
 * GET /api/stories/{id}
 * @param {number} storyId
 */
export function fetchStoryById(storyId) {
    return apiClient.get(`/stories/${storyId}`);
}

/**
 * Neue Story anlegen
 * POST /api/stories
 * @param {{ title: string, content: string, genre: { id: number } }} storyData
 */
export function createStory(storyData) {
    return apiClient.post('/stories', storyData);
}

/**
 * Bestehende Story aktualisieren
 * PUT /api/stories/{id}
 * @param {number} storyId
 * @param {{ title: string, content: string, genre: { id: number } }} storyData
 */
export function updateStory(storyId, storyData) {
    return apiClient.put(`/stories/${storyId}`, storyData);
}

/**
 * Story löschen
 * DELETE /api/stories/{id}
 * @param {number} storyId
 */
export function deleteStory(storyId) {
    return apiClient.delete(`/stories/${storyId}`);
}

/**
 * Stories nach Genre filtern
 * GET /api/stories?genreId={genreId}
 * @param {number} genreId
 */
export function fetchStoriesByGenre(genreId) {
    return apiClient.get('/stories', { params: { genreId: genreId } });
}

/**
 * Früher gelesene (letzte) Story abrufen
 * GET /api/stories/last
 * (Backend muss diesen Endpoint bereitstellen)
 */
export function fetchLastReadStory() {
    return apiClient.get('/stories/last');
}

/**
 * Eigene Stories abrufen
 * GET /api/stories/mine
 * (Backend muss diesen Endpoint bereitstellen, z.B. per JWT-Auth)
 */
export function fetchMyStories() {
    return apiClient.get('/stories/mine');
}

/**
 * Stories per Suchbegriff suchen
 * GET /api/stories/search?query={searchTerm}
 * @param {string} searchTerm
 */
export function searchStories(searchTerm) {
    return apiClient.get('/stories/search', { params: { query: searchTerm } });
}

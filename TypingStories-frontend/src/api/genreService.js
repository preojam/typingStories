import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

/**
 * Gibt alle Genres zurück
 * GET /api/genres
 */
export function fetchAllGenres() {
    return apiClient.get('/genres');
}

/**
 * Legt ein neues Genre an
 * POST /api/genres
 * @param {{ name: string }} genreData
 */
export function createGenre(genreData) {
    return apiClient.post('/genres', genreData);
}

/**
 * Aktualisiert ein bestehendes Genre
 * PUT /api/genres/{id}
 * @param {number} genreId
 * @param {{ name: string }} genreData
 */
export function updateGenre(genreId, genreData) {
    return apiClient.put(`/genres/${genreId}`, genreData);
}

/**
 * Löscht ein Genre
 * DELETE /api/genres/{id}
 * @param {number} genreId
 */
export function deleteGenre(genreId) {
    return apiClient.delete(`/genres/${genreId}`);
}

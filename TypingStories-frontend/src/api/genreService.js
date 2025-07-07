import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

/**
 * Gibt alle Genres zurück
 * GET /api/genres
 * @returns {Promise<Array>}
 */
export function fetchAllGenres() {
    return apiClient
        .get('/genres')
        .then(res => res.data);
}

/**
 * Legt ein neues Genre an
 * POST /api/genres
 * @param {{ name: string }} genreData
 * @returns {Promise<Object>}
 */
export function createGenre(genreData) {
    return apiClient
        .post('/genres', genreData)
        .then(res => res.data);
}

/**
 * Aktualisiert ein bestehendes Genre
 * PUT /api/genres/{id}
 * @param {number} genreId
 * @param {{ name: string }} genreData
 * @returns {Promise<Object>}
 */
export function updateGenre(genreId, genreData) {
    return apiClient
        .put(`/genres/${genreId}`, genreData)
        .then(res => res.data);
}

/**
 * Löscht ein Genre
 * DELETE /api/genres/{id}
 * @param {number} genreId
 * @returns {Promise}
 */
export function deleteGenre(genreId) {
    return apiClient
        .delete(`/genres/${genreId}`);
}

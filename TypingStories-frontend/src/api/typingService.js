import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

/**
 * Alle TypingResults abrufen
 * GET /api/typingresults
 */
export function fetchAllTypingResults() {
    return apiClient.get('/typingresults');
}

/**
 * Einzelnes TypingResult abrufen
 * GET /api/typingresults/{id}
 * @param {number} resultId
 */
export function fetchTypingResultById(resultId) {
    return apiClient.get(`/typingresults/${resultId}`);
}

/**
 * Neues TypingResult anlegen
 * POST /api/typingresults
 * @param {{ username: string, wpm: number, errors: number, story: { id: number } }} resultData
 */
export function createTypingResult(resultData) {
    return apiClient.post('/typingresults', resultData);
}

/**
 * Bestehendes TypingResult aktualisieren
 * PUT /api/typingresults/{id}
 * @param {number} resultId
 * @param {{ username: string, wpm: number, errors: number, story: { id: number } }} resultData
 */
export function updateTypingResult(resultId, resultData) {
    return apiClient.put(`/typingresults/${resultId}`, resultData);
}

/**
 * TypingResult löschen
 * DELETE /api/typingresults/{id}
 * @param {number} resultId
 */
export function deleteTypingResult(resultId) {
    return apiClient.delete(`/typingresults/${resultId}`);
}

// src/api/scoreService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

/** GET /api/scores?storyId={id} */
export function fetchScoresByStory(storyId) {
    return apiClient
        .get('/scores', { params: { storyId } })
        .then(res => res.data);
}

/** POST /api/scores
 *  Body: { story: { id }, component, value }
 */
export function createScore({ storyId, component, value }) {
    return apiClient
        .post('/scores', {
            story:     { id: storyId },
            component: component,
            value:     value
        })
        .then(res => res.data);
}

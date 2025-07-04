// src/api/storyService.js
import axios from 'axios';

// Erstelle eine Axios-Instanz mit Basis-URL deines Backends
const API = axios.create({
    baseURL: 'http://localhost:8080/api',  // passe Host/Port an, falls nötig
    headers: {
        'Content-Type': 'application/json'
    }
});

// CRUD-Methoden für Stories
export function fetchStories() {
    return API.get('/stories');
}

export function fetchStory(id) {
    return API.get(`/stories/${id}`);
}

export function createStory(data) {
    return API.post('/stories', data);
}

export function updateStory(id, data) {
    return API.put(`/stories/${id}`, data);
}

export function deleteStory(id) {
    return API.delete(`/stories/${id}`);
}

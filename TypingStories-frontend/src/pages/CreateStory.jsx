// src/pages/CreateStory.jsx
import React, { useState, useEffect } from 'react';
import { fetchAllGenres } from '../api/genreService';
import { createStory, fetchStoryById, updateStory } from '../api/storyService';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateStory() {
    const { storyId } = useParams();
    const isEdit = Boolean(storyId);
    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);      // immer Array
    const [formData, setFormData] = useState({
        coverUrl: '',
        title: '',
        genreId: '',
        content: ''
    });
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState('');

    // 1) Genres laden
    useEffect(() => {
        fetchAllGenres()
            .then(data => {
                // data muss hier ein Array sein
                setGenres(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error('Error loading genres', err);
                setGenres([]);
                setError('Konnte Genres nicht laden.');
            });
    }, []);

    // 2) Falls Edit-Modus, Story laden
    useEffect(() => {
        if (!isEdit) return;
        fetchStoryById(storyId)
            .then(data => {
                setFormData({
                    coverUrl: data.coverUrl || '',
                    title:   data.title      || '',
                    genreId: data.genre?.id?.toString() || '',
                    content: data.content    || ''
                });
            })
            .catch(err => {
                console.error('Error loading story', err);
                setError('Konnte Story nicht laden.');
            })
            .finally(() => setLoading(false));
    }, [isEdit, storyId]);

    // 3) Input-Handler
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(fd => ({ ...fd, [name]: value }));
    }

    // 4) Submit-Handler
    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        const payload = {
            coverUrl: formData.coverUrl || null,
            title:    formData.title,
            genre:    { id: Number(formData.genreId) },
            content:  formData.content
        };

        const request = isEdit
            ? updateStory(storyId, payload)
            : createStory(payload);

        request
            .then(() => navigate('/my-stories'))
            .catch(err => {
                console.error('Error saving story', err);
                setError('Speichern fehlgeschlagen. Bitte prüfe alle Felder.');
            });
    }

    // 5) Abbrechen
    function handleCancel() {
        navigate(-1);
    }

    if (loading) return <p>Loading…</p>;

    return (
        <div className="create-story p-6 max-w-xl mx-auto">
            <h2 className="text-2xl mb-4">
                {isEdit ? 'Edit Story' : 'Create New Story'}
            </h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Cover URL */}
                <div>
                    <label className="block mb-1 font-medium">Cover Image URL</label>
                    <input
                        type="text"
                        name="coverUrl"
                        value={formData.coverUrl}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="https://..."
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block mb-1 font-medium">Genre</label>
                    <select
                        name="genreId"
                        value={formData.genreId}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">-- select genre --</option>
                        {(genres || []).map(g => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-1 font-medium">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={8}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {isEdit ? 'Update Story' : 'Save Story'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

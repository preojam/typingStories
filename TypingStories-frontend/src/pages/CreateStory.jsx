// src/pages/CreateStory.jsx
import React, { useState, useEffect } from 'react';
import { fetchAllGenres } from '../api/genreService';
import { createStory } from '../api/storyService';
import { useNavigate } from 'react-router-dom';

export default function CreateStory() {
    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({
        coverUrl: '',
        title: '',
        genreId: '',
        content: ''
    });
    const navigate = useNavigate();

    // 1) hole alle Genres für das Dropdown
    useEffect(() => {
        fetchAllGenres().then(res => {
            setGenres(res.data);
        });
    }, []);

    // 2) Formular-Inputs im State ablegen
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(fd => ({ ...fd, [name]: value }));
    }

    // 3) bei Submit Story anlegen und zurück zu "My Stories"
    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            coverUrl: formData.coverUrl || null,
            title: formData.title,
            genre: { id: Number(formData.genreId) },
            content: formData.content
        };

        createStory(payload)
            .then(() => navigate('/my-stories'))
            .catch(err => {
                console.error('Fehler beim Anlegen:', err);
                alert('Story konnte nicht angelegt werden.');
            });
    }

    // 4) Abbrechen → zurück zur vorherigen Seite
    function handleCancel() {
        navigate(-1);
    }

    return (
        <div className="create-story p-6 max-w-xl mx-auto">
            <h2 className="text-2xl mb-4">Create New Story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Cover-URL */}
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
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block mb-1 font-medium">Genre</label>
                    <select
                        name="genreId"
                        value={formData.genreId}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- select genre --</option>
                        {genres.map(g => (
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
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save
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

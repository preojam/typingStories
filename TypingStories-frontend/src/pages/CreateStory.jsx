import React, { useState } from 'react';
import { createStory } from '../api/storyService';
import { useNavigate } from 'react-router-dom';

export default function CreateStory() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [genreId, setGenreId] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        await createStory({ title, genre: { id: genreId }, content });
        navigate('/stories');
    };

    return (
        <main>
            <h1>Neue Story erstellen</h1>
            <form onSubmit={handleSubmit}>
                <label>Titel:<br/>
                    <input value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <br/>
                <label>Genre-ID:<br/>
                    <input value={genreId} onChange={e => setGenreId(e.target.value)} required />
                </label>
                <br/>
                <label>Text:<br/>
                    <textarea value={content} onChange={e => setContent(e.target.value)} required />
                </label>
                <br/>
                <button type="submit">Speichern</button>
                <button type="button" onClick={() => navigate(-1)}>Abbrechen</button>
            </form>
        </main>
    );
}

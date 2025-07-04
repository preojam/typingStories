import React, { useState, useEffect } from 'react';
import { fetchStories } from '../api/storyService';
import { Link } from 'react-router-dom';

export default function Discover() {
    const [stories, setStories] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchStories().then(res => setStories(res.data));
    }, []);

    const filtered = stories.filter(s =>
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.genre.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <main>
            <h1>Discover</h1>
            <input
                type="text"
                placeholder="Suche nach Titel oder Genre…"
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <ul>
                {filtered.map(s => (
                    <li key={s.id}>
                        {s.title} ({s.genre.name}){' '}
                        <Link to={`/stories/${s.id}`}>Read</Link>{' '}
                        <Link to={`/stories/${s.id}/typing`}>Typing</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

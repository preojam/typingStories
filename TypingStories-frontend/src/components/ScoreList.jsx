// src/components/StoryList.jsx
import { useState, useEffect } from 'react';
import { Link }          from 'react-router-dom';
import { fetchStories }  from '../api/storyService';

export default function StoryList() {
    const [stories, setStories]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        // beim Mounten einmal Stories laden
        fetchStories()
            .then(response => {
                setStories(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Fehler beim Laden der Stories');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Lade Stories…</p>;
    if (error)   return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Alle Stories</h2>
            {stories.length === 0 ? (
                <p>Keine Stories gefunden.</p>
            ) : (
                <ul>
                    {stories.map(story => (
                        <li key={story.id} style={{ marginBottom: '0.5rem' }}>
                            <strong>{story.title}</strong> <em>({story.genre.name})</em>
                            {' — '}
                            <Link to={`/stories/${story.id}`}>Lesen</Link>
                            {' | '}
                            <Link to={`/stories/${story.id}/edit`}>Bearbeiten</Link>
                            {' | '}
                            <Link to={`/stories/${story.id}/typing`}>Tippen</Link>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/stories/new">
                <button>+ Neue Story erstellen</button>
            </Link>
        </div>
    );
}

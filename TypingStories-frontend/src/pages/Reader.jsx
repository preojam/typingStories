import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchStory } from '../api/storyService';

export default function Reader() {
    const { id } = useParams();
    const [story, setStory] = useState(null);

    useEffect(() => {
        fetchStory(id).then(r => setStory(r.data));
    }, [id]);

    if (!story) return <p>Lade Story…</p>;

    return (
        <article>
            <h1>{story.title}</h1>
            <p><strong>Genre:</strong> {story.genre.name}</p>
            <nav>
                <Link to="">Lesen</Link> |{' '}
                <Link to="edit">Edit</Link> |{' '}
                <Link to="typing">Typing</Link>
            </nav>
            {/* Hier wird die Unter-Route (Read / Edit / Typing) gerendert */}
            <Outlet context={story} />
        </article>
    );
}

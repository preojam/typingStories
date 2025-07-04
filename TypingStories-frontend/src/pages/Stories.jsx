import React, { useEffect, useState } from 'react';
import { fetchStories } from '../api/storyService';
import { Link } from 'react-router-dom';
import StoryList from "../components/ScoreList";

export default function Stories() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetchStories().then(res => setStories(res.data));
    }, []);

    return (
        <main>
            <h1>Meine Stories</h1>
            <Link to="/stories/new">+ Neue Story erstellen</Link>
            <ul>
                {stories.map(s => (
                    <li key={s.id}>
                        {s.title}{' '}
                        <Link to={`/stories/${s.id}`}>Detail</Link>{' '}
                        <Link to={`/stories/${s.id}/edit`}>Edit</Link>{' '}
                        <Link to={`/stories/${s.id}/typing`}>Typing</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

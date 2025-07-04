import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main>
            <h1>Willkommen bei TypingStories</h1>
            <p>Hier kannst du spannende Geschichten lesen, selber verfassen und deine Tipp-Skills trainieren.</p>
            <nav>
                <Link to="/discover">Discover Stories</Link> |{' '}
                <Link to="/stories">Meine Stories</Link>
            </nav>
        </main>
    );
}

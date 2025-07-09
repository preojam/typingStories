// src/pages/Discover.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams }         from 'react-router-dom';
import GenreBadge                  from '../components/GenreBadge';
import StoryCard                   from '../components/StoryCard';
import { fetchAllGenres }          from '../api/genreService';
import { fetchStoriesByGenre }     from '../api/storyService';

export default function Discover() {
    const [genres, setGenres]           = useState([]);
    const [stories, setStories]         = useState([]);
    const [error, setError]             = useState('');
    const [searchParams]                = useSearchParams();
    const genreIdParam                  = Number(searchParams.get('genreId'));

    // 1) Genres laden
    useEffect(() => {
        fetchAllGenres()
            .then(data => setGenres(data))
            .catch(() => setError('Genres could not be loaded. Please try again later.'));
    }, []);

    // 2) Wenn queryParam „genreId“ da ist, Stories laden
    useEffect(() => {
        if (!genreIdParam) {
            setStories([]);
            return;
        }
        fetchStoriesByGenre(genreIdParam)
            .then(data => setStories(data))
            .catch(() => setError('Stories could not be loaded. Please try again later.'));
    }, [genreIdParam]);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Discover</h1>

            {error && <p className="text-red-500">{error}</p>}

            {/* Genre-Pillen */}
            <div className="flex flex-wrap">
                {genres.map(g => (
                    <GenreBadge key={g.id} genre={g} />
                ))}
            </div>

            {/* Stories zum gewählten Genre */}
            {genreIdParam ? (
                stories.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {stories.map(s => (
                            <StoryCard key={s.id} story={s} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No stories in this genre yet.</p>
                )
            ) : (
                <p className="text-gray-600">Please choose a genre.</p>
            )}
        </div>
    );
}

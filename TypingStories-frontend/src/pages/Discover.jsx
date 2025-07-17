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
        <div>
            <h1 >Discover</h1>

            {error && <p>{error}</p>}

            {/* Genre-Pillen */}
            <div>
                {genres.map(g => (
                    <GenreBadge key={g.id} genre={g} />
                ))}
            </div>

            {/* Stories zum gewählten Genre */}
            {genreIdParam ? (
                stories.length > 0 ? (
                    <div>
                        {stories.map(s => (
                            <StoryCard key={s.id} story={s} />
                        ))}
                    </div>
                ) : (
                    <p>No stories in this genre yet.</p>
                )
            ) : (
                <p>Please choose a genre.</p>
            )}
        </div>
    );
}

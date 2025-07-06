// src/pages/Discover.jsx
import { useEffect, useState } from 'react';
import GenreBadge from '../components/GenreBadge';
import StoryCard from '../components/StoryCard';
import { fetchAllGenres } from '../api/genreService.js';
import { fetchStoriesByGenre } from '../api/storyService';

export default function Discover() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [storiesByGenre, setStoriesByGenre] = useState([]);

    // beim Initial-Mount alle Genres laden
    useEffect(() => {
        fetchAllGenres()
            .then(response => setGenres(response.data))
            .catch(console.error);
    }, []);

    // jedes Mal, wenn sich `selectedGenre` ändert, Stories nach Genre laden
    useEffect(() => {
        if (selectedGenre) {
            fetchStoriesByGenre(selectedGenre.id)
                .then(response => setStoriesByGenre(response.data))
                .catch(console.error);
        } else {
            setStoriesByGenre([]); // Clear, wenn kein Genre ausgewählt
        }
    }, [selectedGenre]);

    return (
        <div className="p-6">
            {/* Genre-Leiste */}
            <div className="flex space-x-2 overflow-x-auto mb-4">
                {genres.map(genre => (
                    <GenreBadge
                        key={genre.id}
                        genreObject={genre}
                        isActive={selectedGenre?.id === genre.id}
                        onClick={() => setSelectedGenre(genre)}
                    />
                ))}
            </div>

            {/* Story-Raster oder Hinweis */}
            {selectedGenre ? (
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        {selectedGenre.name} Stories
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {storiesByGenre.map(story => (
                            <StoryCard key={story.id} storyObject={story} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Bitte wähle zuerst ein Genre aus.</p>
            )}
        </div>
    );
}

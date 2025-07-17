import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import { searchStories } from '../api/storyService.js';

export default function SearchResults() {
    // Suchbegriff aus der URL holen
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const searchQuery = queryParameters.get('query') || '';

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);

        searchStories(searchQuery)
            .then(data => {
                setSearchResults(data); // ✅ Direktes JSON-Ergebnis von fetch
            })
            .catch(error => {
                console.error('Fehler beim Suchen:', error);
                setSearchResults([]); // Falls Fehler → leere Ergebnisse
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchQuery]);

    return (
        <div>
            <h2>Search Results for “{searchQuery}”</h2>

            {isLoading && <p>Loading…</p>}

            {!isLoading && searchResults.length === 0 && (
                <div>
                    <p>No stories found matching your search.</p>
                    <Link to="/">Back to Home</Link>
                </div>
            )}

            {!isLoading && searchResults.length > 0 && (
                <div>
                    {searchResults.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            )}
        </div>
    );
}

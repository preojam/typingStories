import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import { searchStories } from '../api/storyService.js';

export default function SearchResults() {
    // Suchbegriff aus URL holen
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
        // API-Aufruf: implementiere dazu in storyService.js eine Funktion searchStories(query)
        searchStories(searchQuery)
            .then(response => {
                setSearchResults(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchQuery]);

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Search Results for “{searchQuery}”</h2>

            {isLoading && <p>Loading…</p>}

            {!isLoading && searchResults.length === 0 && (
                <div>
                    <p>No stories found matching your search.</p>
                    <Link to="/" className="text-blue-400 hover:underline">
                        Back to Home
                    </Link>
                </div>
            )}

            {!isLoading && searchResults.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {searchResults.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            )}
        </div>
    );
}

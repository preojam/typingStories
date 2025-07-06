import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import { fetchMyStories } from '../api/storyService';

export default function MyStories() {
    const [myStories, setMyStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMyStories()
            .then(response => {
                setMyStories(response.data);
            })
            .catch(error => {
                console.error('Error fetching my stories:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p className="p-6">Loading your stories…</p>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">My Stories</h1>
                <Link
                    to="/writing/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    Create New Story
                </Link>
            </div>

            {myStories.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {myStories.map(storyItem => (
                        <StoryCard
                            key={storyItem.id}
                            storyObject={storyItem}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">
                    You haven't written any stories yet.
                </p>
            )}
        </div>
    );
}

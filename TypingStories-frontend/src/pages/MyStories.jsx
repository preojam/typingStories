import { useEffect, useState } from 'react';
import { fetchMyStories, deleteStory } from '../api/storyService';
import StoryCard from '../components/StoryCard';
import { Link, useNavigate } from 'react-router-dom';

export default function MyStories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyStories()
            .then(data => setStories(data))
            .catch(err => {
                console.error(err);
                setError('Error loading stories. Please try again later.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="page p-6">
                <h1 className="text-2xl mb-4">My Stories</h1>
                <p>Loading…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page p-6">
                <h1 className="text-2xl mb-4">My Stories</h1>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    // Handler zum Löschen und State-Update
    const handleDelete = id => {
        if (!window.confirm('Story wirklich löschen?')) return;
        deleteStory(id)
            .then(() => {
                setStories(prev => prev.filter(s => s.id !== id));
            })
            .catch(err => {
                console.error(err);
                alert('Löschen fehlgeschlagen');
            });
    };

    return (
        <div className="page p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl">My Stories</h1>
                <Link to="/writing/new" className="px-4 py-2 bg-green-600 text-white rounded">
                    Create New Story
                </Link>
            </div>

            {stories.length === 0 ? (
                <p>You have no stories yet. Write a new one!</p>
            ) : (
                <ul className="space-y-6">
                    {stories.map(story => (
                        <li key={story.id} className="flex items-start space-x-4">
                            {/* Story-Card */}
                            <StoryCard story={story} />

                            {/* Aktionen: Edit / Delete */}
                            <div className="flex flex-col space-y-2 mt-4">
                                <button
                                    onClick={() => navigate(`/writing/edit/${story.id}`)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(story.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
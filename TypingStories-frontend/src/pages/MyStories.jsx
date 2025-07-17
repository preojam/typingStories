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
            <div>
                <h1>My Stories</h1>
                <p>Loading…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>My Stories</h1>
                <p>{error}</p>
            </div>
        );
    }

    // Handler zum Löschen und State-Update
    const handleDelete = id => {
        if (!window.confirm('Are you sure?')) return;
        deleteStory(id)
            .then(() => {
                setStories(prev => prev.filter(s => s.id !== id));
            })
            .catch(err => {
                console.error(err);
                alert('Deleting story failed. Please try again later. If the problem persists, please contact the admin. Error message: ' + err.message.replace(/\n/g, ''));
            });
    };

    return (
        <div>
            <div>
                <h1>My Stories</h1>
                <Link to="/writing/new">
                    Create New Story
                </Link>
            </div>

            {stories.length === 0 ? (
                <p>You have no stories yet. Write a new one!</p>
            ) : (
                <ul>
                    {stories.map(story => (
                        <li key={story.id}>
                            {/* Story-Card */}
                            <StoryCard
                                key={story.id}
                                story={story}
                                showActions={true}
                                onEdit={(id) => navigate(`/writing/edit/${id}`)}
                                onDelete={handleDelete}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
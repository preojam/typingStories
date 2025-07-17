import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { fetchAllStories, fetchLastReadStory } from '../api/storyService';

export default function Home() {
    const [stories, setStories] = useState([]);      // immer ein Array
    const [lastStory, setLastStory] = useState(null);

    useEffect(() => {
        // Hol alle Stories (Service liefert bereits res.data)
        fetchAllStories()
            .then(data => {
                console.log('Fetched stories:', data);
                setStories(data || []);
            })
            .catch(err => {
                console.error('Error loading all stories', err);
                setStories([]);
            });

        // Hol die letzte gelesene Story
        fetchLastReadStory()
            .then(data => setLastStory(data))
            .catch(() => setLastStory(null));
    }, []);

    return (
        <div>
            <div>
                <div>
                    <h1>Welcome to TypingStories</h1>
                    <p>Words connect worlds…</p>
                </div>

                {lastStory && (
                    <div>
                        <h2>Last Read</h2>
                        <StoryCard story={lastStory} />
                    </div>
                )}
            </div>

            <h2>All Stories</h2>
            <div>
                {stories.map(s => (
                    <StoryCard key={s.id} story={s} />
                ))}
            </div>
        </div>
    );
}

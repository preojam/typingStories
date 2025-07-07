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
        <div className="p-6 space-y-8">
            <div className="flex justify-between">
                <div className="w-1/3 bg-gray-800 p-4 rounded">
                    <h1 className="text-2xl mb-2">Welcome to TypingStories</h1>
                    <p>Words connect worlds…</p>
                </div>

                {lastStory && (
                    <div className="w-1/3">
                        <h2 className="mb-2">Last Read</h2>
                        <StoryCard story={lastStory} />
                    </div>
                )}
            </div>

            <h2 className="text-xl">All Stories</h2>
            <div className="grid grid-cols-3 gap-4">
                {stories.map(s => (
                    <StoryCard key={s.id} story={s} />
                ))}
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { fetchAllStories, fetchLastReadStory } from '../api/storyService.js';

export default function Home() {
    const [stories, setAllStories] = useState([]);
    const [last, setLastStory] = useState(null);

    useEffect(() => {
        fetchAllStories().then(r => setAllStories(r.data));
        fetchLastReadStory().then(r => setLastStory(r.data))
            .catch(() => setLastStory(null));
    }, []);

    return (
        <div className="p-6 space-y-8">
            <div className="flex justify-between">
                <div className="w-1/3 bg-gray-800 p-4 rounded">
                    <h1 className="text-2xl mb-2">Welcome to TypingStories</h1>
                    <p>Words connect worlds…</p>
                </div>
                {last && (
                    <div className="w-1/3">
                        <h2 className="mb-2">Last Read</h2>
                        <StoryCard story={last} />
                    </div>
                )}
            </div>

            <h2 className="text-xl">All Stories</h2>
            <div className="grid grid-cols-3 gap-4">
                {stories.map(s => <StoryCard key={s.id} story={s} />)}
            </div>
        </div>
    );
}

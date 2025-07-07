// src/pages/Practice.jsx
import { useState, useEffect } from 'react';
import { useParams }          from 'react-router-dom';
import ToggleSwitch           from '../components/ToggleSwitch';
import TextDisplay            from '../components/TextDisplay';
import TypingPage             from '../components/TypingPage';
import { fetchStoryById }     from '../api/storyService';

export default function Practice() {
    const { storyId } = useParams();
    const [story, setStory] = useState(null);
    const [mode, setMode]   = useState('read');    // 'read' oder 'type'
    const [chapterIdx, setChapterIdx] = useState(0);

    // 1) Story laden
    useEffect(() => {
        fetchStoryById(storyId)
            .then(data => {
                setStory(data);       // <-- hier nicht data.data!
                setChapterIdx(0);     // erstes „Kapitel“
            })
            .catch(err => console.error(err));
    }, [storyId]);

    if (!story) return <p>Loading…</p>;

    // 2) Splitting nach „## Kapitel“-Marker im Text
    const raw = story.content || '';
    const parts = raw
        .split(/^##\s+/m)
        .filter(p => p.trim().length);

    // 3) Kapitel-Objekte bauen
    const chapters = parts.map((p, i) => {
        const [titleLine, ...lines] = p.split('\n');
        return {
            id:      i + 1,
            title:   titleLine.trim(),
            text:    lines.join('\n').trim()
        };
    });

    // 4) aktuellen Index absichern
    const current = chapters[chapterIdx] || chapters[0];

    return (
        <div className="flex h-full">
            {/* linke Sidebar */}
            <aside className="w-1/4 p-4 border-r">
                <h2 className="font-bold mb-4">{story.title}</h2>
                <ul>
                    {chapters.map(ch => (
                        <li
                            key={ch.id}
                            className={`cursor-pointer py-1 ${chapterIdx === ch.id-1 ? 'font-bold' : ''}`}
                            onClick={() => setChapterIdx(ch.id - 1)}
                        >
                            {ch.title || `Chapter ${ch.id}`}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Hauptbereich */}
            <main className="flex-1 p-6">
                <div className="flex justify-end mb-4">
                    <ToggleSwitch
                        selectedValue={mode}
                        options={[
                            { id: 'read', label: 'Read' },
                            { id: 'type', label: 'Type' }
                        ]}
                        onChange={setMode}
                    />
                </div>

                {mode === 'read' ? (
                    <TextDisplay
                        chapterText={current.text}
                        chapterNumber={current.id}
                        pageNumber={1}
                    />
                ) : (
                    <TypingPage
                        text={current.text}
                        chapter={current.id}
                        page={1}
                    />
                )}
            </main>

            {/* rechte Sidebar */}
            <aside className="w-1/4 p-4 border-l">
                {mode === 'read'
                    ? <div>Rating &amp; Stats…</div>
                    : <div>Live Typing Stats…</div>
                }
            </aside>
        </div>
    );
}

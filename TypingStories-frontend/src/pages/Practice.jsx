
import React, { useState, useEffect } from 'react';
import { useParams }          from 'react-router-dom';
import ToggleSwitch           from '../components/ToggleSwitch';
import TextDisplay            from '../components/TextDisplay';
import TypingPage             from '../components/TypingPage';
import RatingsPanel           from '../components/RatingsPanel';
import { fetchStoryById }     from '../api/storyService';

export default function Practice() {
    const { storyId } = useParams();

    // ── Hooks ─────────────────────────────────────────
    const [story, setStory]           = useState(null);
    const [mode, setMode]             = useState('read'); // 'read' oder 'type'
    const [chapterIdx, setChapterIdx] = useState(0);

    // ── Story laden ───────────────────────────────────
    useEffect(() => {
        fetchStoryById(storyId)
            .then(data => {
                setStory(data);
                setChapterIdx(0);
            })
            .catch(console.error);
    }, [storyId]);

    if (!story) return <p>Loading…</p>;

    // ── Kapitel splitten ──────────────────────────────
    const parts = (story.content || '')
        .split(/^##\s+/m)
        .filter(p => p.trim());
    const chapters = parts.map((p, i) => {
        const [titleLine, ...lines] = p.split('\n');
        return {
            id:    i + 1,
            title: titleLine.trim() || `Chapter ${i+1}`,
            text:  lines.join('\n').trim()
        };
    });
    const current = chapters[chapterIdx] || chapters[0];

    // ── Render ────────────────────────────────────────
    return (
        <div className="practice-page">
            {/* linke Sidebar */}
            <aside className="sidebar-left">
                <h2 className="story-title">{story.title}</h2>
                <ul>
                    {chapters.map(ch => (
                        <li
                            key={ch.id}
                            className={chapterIdx === ch.id-1 ? 'active' : ''}
                            onClick={() => setChapterIdx(ch.id-1)}
                        >
                            {ch.title}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Hauptbereich */}
            <main className="content-area">
                <div className="mode-switch">
                    <ToggleSwitch
                        selectedValue={mode}
                        options={[
                            { id: 'read', label: 'Read' },
                            { id: 'type', label: 'Type' }
                        ]}
                        onChange={setMode}
                    />
                </div>

                <div className="text-wrapper">
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
                </div>
            </main>

            {/* rechte Sidebar NUR im Read-Modus */}
            {mode === 'read' && (
                <aside className="sidebar-right">
                    <RatingsPanel storyId={storyId} />
                </aside>
            )}
        </div>
    );
}


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChapterList from '../components/ChapterList';
import TextDisplay from '../components/TextDisplay';
import ToggleSwitch from '../components/ToggleSwitch';
import { fetchStoryById } from '../api/storyService';
import TypingPage from '../components/TypingPage';

export default function Practice() {
    const { storyId } = useParams();
    const [currentStory, setCurrentStory] = useState(null);
    const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
    const [displayMode, setDisplayMode] = useState('read'); // 'read' oder 'type'

    // Story laden
    useEffect(() => {
        fetchStoryById(storyId)
            .then(response => {
                setCurrentStory(response.data);
                // direkt erstes Kapitel auswählen, falls vorhanden
                if (response.data.chapters && response.data.chapters.length > 0) {
                    setSelectedChapterNumber(response.data.chapters[0].number);
                }
            })
            .catch(error => console.error('Error fetching story by ID:', error));
    }, [storyId]);

    if (!currentStory) {
        return <p>Loading…</p>;
    }

    // Aktuelles Kapitel-Objekt ermitteln
    const currentChapter = currentStory.chapters.find(
        chapterObject => chapterObject.number === selectedChapterNumber
    );

    return (
        <div className="flex h-full">
            {/* linke Sidebar: Kapitel-Liste */}
            <aside className="w-1/4 p-4 border-r">
                <h2 className="font-bold mb-4">{currentStory.title}</h2>
                <ChapterList
                    chapters={currentStory.chapters}
                    selectedChapterNumber={selectedChapterNumber}
                    onSelectChapter={number => setSelectedChapterNumber(number)}
                />
            </aside>

            {/* Hauptbereich: Read/Type */}
            <main className="flex-1 p-6">
                <div className="flex justify-end mb-4">
                    <ToggleSwitch
                        selectedValue={displayMode}
                        onChange={newMode => setDisplayMode(newMode)}
                        options={[
                            { id: 'read', label: 'Read' },
                            { id: 'type', label: 'Type' }
                        ]}
                    />
                </div>

                {displayMode === 'read' ? (
                    <TextDisplay
                        chapterText={currentChapter.text}
                        chapterNumber={currentChapter.number}
                        pageNumber={currentChapter.page}
                    />
                ) : (
                    // Hier bindest du deine TypingPage-Komponente ein
                    <TypingPage
                        text={currentChapter.text}
                        chapterNumber={currentChapter.number}
                        pageNumber={currentChapter.page}
                    />
                )}
            </main>

            {/* rechte Sidebar: statische Platzhalter für Stats/Rating */}
            <aside className="w-1/4 p-4 border-l">
                {displayMode === 'read' ? (
                    <div>Rating und Statistiken…</div>
                ) : (
                    <div>Live-Typing-Statistiken…</div>
                )}
            </aside>
        </div>
    );
}

import React from 'react';
import TypingPage from '../components/TypingPage';

export default function Typing() {
    // Du kannst hier per useParams den Text holen oder aus Outlet context lesen
    const sampleText = "Hier könnte dein Story-Text stehen…";
    return (
        <main>
            <h1>Typing Mode</h1>
            <TypingPage text={sampleText} chapter={1} page={1} />
        </main>
    );
}

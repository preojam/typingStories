// src/components/TypingPage.jsx
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function TypingPage({ text, chapter, page }) {
    // Kapitel-Abschnitte splitten und "##"-Marker entfernen
    const sections = text
        .split(/##\s*/g)
        .map(s => s.trim())
        .filter(Boolean);
    const formatted = sections.join('\n\n');

    const [pos, setPos] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [inputs, setInputs] = useState([]);
    const containerRef = useRef(null);

    // Fokus auf das Div
    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    // Startzeit beim ersten Zeichen setzen
    useEffect(() => {
        if (pos > 0 && startTime === null) {
            setStartTime(Date.now());
        }
    }, [pos, startTime]);

    function handleKeyDown(e) {
        e.preventDefault();
        let key = e.key === 'Enter' ? '\n' : e.key;

        // Backspace
        if (key === 'Backspace' || key === '\b') {
            if (pos > 0) {
                setInputs(i => i.slice(0, -1));
                setPos(p => p - 1);
            }
            return;
        }

        // Nur druckbare Zeichen und '\n'
        if (key.length === 1) {
            // Update inputs und pos
            setInputs(i => [...i, key]);
            setPos(p => p + 1);

            // Wenn falsch, inkrementiere errors
            if (formatted[pos] !== key) {
                setErrors(err => err + 1);
            }
        }
    }

    // WPM und Accuracy live berechnen
    const elapsedMinutes = startTime
        ? (Date.now() - startTime) / 1000 / 60
        : 0;
    const wpm = elapsedMinutes > 0
        ? Math.round((pos / 5) / elapsedMinutes)
        : 0;
    const acc = pos > 0
        ? ((pos - errors) / pos) * 100
        : 100;

    return (
        <div className="typing-page space-y-4">
            <div className="typing-header flex justify-between text-sm text-gray-200">
                <span>Chapter {chapter}</span>
                <span>Page {page}</span>
                <span>{wpm} WPM</span>
                <span>{acc.toFixed(1)}% ACC</span>
            </div>

            <div
                ref={containerRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="typing-text p-4 border rounded bg-gray-900 font-mono text-base outline-none whitespace-pre-wrap break-word"
            >
                {formatted.split('').map((char, i) => {
                    if (i < pos) {
                        const typed = inputs[i];
                        const correct = typed === char;
                        return (
                            <span
                                key={i}
                                className={correct ? 'correct' : 'incorrect'}
                            >
                {typed}
              </span>
                        );
                    }
                    if (i === pos) {
                        return (
                            <span key={i} className="current">
                {char === '\n' ? '↵' : char}
              </span>
                        );
                    }
                    return (
                        <span key={i} className="pending">
              {char}
            </span>
                    );
                })}
            </div>
        </div>
    );
}

TypingPage.propTypes = {
    text:    PropTypes.string.isRequired,
    chapter: PropTypes.number.isRequired,
    page:    PropTypes.number.isRequired,
};

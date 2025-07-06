// src/components/TypingPage.jsx
import { useState, useEffect, useRef } from 'react';


export default function TypingPage({ text, chapter, page }) {
    const [pos, setPos] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [inputs, setInputs] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.focus();
    }, []);

    useEffect(() => {
        if (pos > 0 && !startTime) {
            setStartTime(Date.now());
        }
    }, [pos, startTime]);

    function handleKeyDown(e) {
        e.preventDefault();
        if (e.key === 'Backspace') {
            if (pos === 0) return;
            setInputs(inp => {
                const copy = [...inp];
                copy.pop();
                return copy;
            });
            setPos(p => p - 1);
            return;
        }
        if (e.key.length === 1) {
            setInputs(inp => [...inp, e.key]);
            setPos(p => p + 1);
            if (e.key !== text[pos]) {
                setErrors(err => err + 1);
            }
        }
    }

    const minutes = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
    const wpm = minutes > 0 ? Math.round((pos / 5) / minutes) : 0;
    const acc = pos > 0 ? ((pos - errors) / pos) * 100 : 100;

    return (
        <div className="typing-page">
            <div className="typing-header">
                <span>Chapter {chapter}</span>
                <span>Page {page}</span>
                <span>{wpm} WPM</span>
                <span>{acc.toFixed(1)}% ACC</span>
            </div>

            <div
                className="typing-text"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                ref={containerRef}
            >
                {text.split('').map((origChar, i) => {
                    if (i < pos) {
                        const typed = inputs[i];
                        return (
                            <span
                                key={i}
                                className={typed === origChar ? 'correct' : 'incorrect'}
                            >
                {typed === origChar ? origChar : typed}
              </span>
                        );
                    }
                    if (i === pos) {
                        return (
                            <span key={i} className="current">
                {origChar}
              </span>
                        );
                    }
                    return (
                        <span key={i} className="pending">
              {origChar}
            </span>
                    );
                })}
            </div>
        </div>
    );
}

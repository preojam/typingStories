// src/components/RatingsPanel.jsx
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fetchScoresByStory, createScore } from '../api/scoreService';

export default function RatingsPanel({ storyId }) {
    const [scores, setScores]           = useState([]);
    const [plot, setPlot]               = useState(0);
    const [characters, setCharacters]   = useState(0);
    const [styleRating, setStyleRating] = useState(0);
    const [error, setError]             = useState('');

    // 1) Lade alle bisherigen "overall"-Scores
    useEffect(() => {
        fetchScoresByStory(storyId)
            .then(data => setScores(data.filter(s => s.component === 'overall')))
            .catch(() => setError('Konnte Ratings nicht laden.'));
    }, [storyId]);

    // 2) Durchschnitt aus den drei Werten
    const avg = useMemo(() => {
        if (!plot || !characters || !styleRating) return '–';
        return ((plot + characters + styleRating) / 3).toFixed(1);
    }, [plot, characters, styleRating]);

    // 3) Neues Rating absenden
    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (!plot || !characters || !styleRating) {
            setError('Bewerte bitte alle drei Kriterien.');
            return;
        }
        createScore({ storyId, component: 'overall', value: parseFloat(avg) })
            .then(newScore => {
                setScores(prev => [...prev, newScore]);  // anhängen, nicht überschreiben
                setPlot(0);
                setCharacters(0);
                setStyleRating(0);
            })
            .catch(() => setError('Rating speichern fehlgeschlagen.'));
    }

    return (
        <div className="ratings-panel">
            <h3 className="font-semibold mb-2">Ratings</h3>

            <p>
                Score Average:{' '}
                <strong>
                    {scores.length
                        ? (scores.reduce((sum, s) => sum + s.value, 0) / scores.length).toFixed(1)
                        : '–'}
                </strong>{' '}
                / 10 ({scores.length})
            </p>

            <hr className="my-3 border-gray-600" />

            <form onSubmit={handleSubmit} className="space-y-3">
                {[
                    ['Plot', plot, setPlot],
                    ['Characters', characters, setCharacters],
                    ['Style', styleRating, setStyleRating]
                ].map(([label, val, setter]) => (
                    <div key={label}>
                        <label className="block">{label}</label>
                        <select
                            value={val}
                            onChange={e => setter(Number(e.target.value))}
                            className="form-input mt-1"
                        >
                            <option value={0}>—</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i+1} value={i+1}>{i+1}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <p>
                    Your Average Rating:{' '}
                    <strong className="text-lg">{avg}</strong> / 10
                </p>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Enter
                </button>
            </form>

            {/* Liste aller bisherigen Ratings */}
            <ul className="mt-4 list-disc list-inside text-sm">
                {scores.map(s => (
                    <li key={s.id}>
                        {s.createdAt?.substring(0,10) || ''}: {s.value.toFixed(1)} ({s.component})
                    </li>
                ))}
            </ul>
        </div>
    );
}

RatingsPanel.propTypes = {
    storyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

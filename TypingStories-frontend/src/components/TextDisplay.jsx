import React from 'react';
import PropTypes from 'prop-types';

export default function TextDisplay({ chapterText, chapterNumber, pageNumber }) {
    // 1) Split auf jeden '##'-Marker, entferne leere Strings und trimme
    const sections = chapterText
        .split(/##\s*/g)
        .map(s => s.trim())
        .filter(Boolean);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Chapter {chapterNumber}</span>
                <span className="font-semibold">Page {pageNumber}</span>
            </div>
            <div className="p-4 border rounded-md bg-white text-gray-900">
                {sections.map((sec, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">
                        {sec}
                    </p>
                ))}
            </div>
        </div>
    );
}

TextDisplay.propTypes = {
    chapterText: PropTypes.string.isRequired,
    chapterNumber: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
};

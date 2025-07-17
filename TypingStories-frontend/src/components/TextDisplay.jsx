import React from 'react';
import PropTypes from 'prop-types';

export default function TextDisplay({ chapterText, chapterNumber, pageNumber }) {
    // 1) Split auf jeden '##'-Marker, entferne leere Strings und trimme
    const sections = chapterText
        .split(/##\s*/g)
        .map(s => s.trim())
        .filter(Boolean);

    return (
        <div>
            <div>
                <span>Chapter {chapterNumber}</span>
                <span>Page {pageNumber}</span>
            </div>
            <div>
                {sections.map((sec, idx) => (
                    <p key={idx} >
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

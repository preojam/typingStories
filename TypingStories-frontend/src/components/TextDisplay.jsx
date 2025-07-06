import React from 'react';
import PropTypes from 'prop-types';

export default function TextDisplay({ chapterText, chapterNumber, pageNumber }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Chapter {chapterNumber}</span>
                <span className="font-semibold">Page {pageNumber}</span>
            </div>
            <div className="p-4 border rounded-md bg-white text-gray-900 whitespace-pre-wrap">
                {chapterText}
            </div>
        </div>
    );
}

TextDisplay.propTypes = {
    chapterText: PropTypes.string.isRequired,
    chapterNumber: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
};

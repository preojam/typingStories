import React from 'react';
import PropTypes from 'prop-types';

export default function ChapterList({ chapters, onSelectChapter }) {
    return (
        <ul className="space-y-2">
            {chapters.map(chapterObject => (
                <li key={chapterObject.number}>
                    <button
                        onClick={() => onSelectChapter(chapterObject.number)}
                    >
                        Kapitel {chapterObject.number}: {chapterObject.title}
                    </button>
                </li>
            ))}
        </ul>
    );
}

ChapterList.propTypes = {
    chapters: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedChapterNumber: PropTypes.number,
    onSelectChapter: PropTypes.func.isRequired
};

ChapterList.defaultProps = {
    selectedChapterNumber: null
};

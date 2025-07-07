import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CoverNotAvailable from '../assets/CoverNotAvailable.jpg';

export default function StoryCard({ story }) {
    if (!story) return null;

    const coverSrc = story.coverUrl
        ? `http://localhost:8080${story.coverUrl}`
        : CoverNotAvailable;

    const maxLen = 100;
    const text = story.content || '';
    const isLong = text.length > maxLen;
    const snippet = isLong ? text.substring(0, maxLen) : text;

    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img
                src={coverSrc}
                alt={`Cover for ${story.title}`}
                className="story-card__cover"
                onError={e => (e.currentTarget.src = CoverNotAvailable)}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{story.title}</h3>
                {story.genre && (
                    <p className="text-sm text-gray-600 mb-2">
                        Genre: {story.genre.name}
                    </p>
                )}
                {story.content && (
                    <p className="text-sm text-gray-800 mb-4">
                        {snippet}
                        {isLong && (
                            <>
                                …{' '}
                                <Link
                                    to={`/typing/${story.id}`}
                                    className="text-blue-600 underline"
                                >
                                    continue reading
                                </Link>
                            </>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}

StoryCard.propTypes = {
    story: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        content: PropTypes.string,
        genre: PropTypes.shape({
            name: PropTypes.string,
        }),
        coverUrl: PropTypes.string,
    }),
};

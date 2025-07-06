// src/components/StoryCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function StoryCard({ story }) {
    // Wenn in der DB kein coverUrl angegeben wurde, auf Default-Cover zurück­greifen
    const coverImageUrl = story.coverUrl
        ? `http://localhost:8080${story.coverUrl}`
        : '/default-cover.png';

    return (
        <div className="story-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            {/** Cover-Bild */}
            <img
                src={coverImageUrl}
                alt={`Cover for ${story.title}`}
                className="h-40 w-full object-cover"
            />

            <div className="p-4">
                {/** Titel */}
                <h3 className="text-lg font-semibold mb-1">{story.title}</h3>

                {/** Genre */}
                {story.genre && (
                    <p className="text-sm text-gray-600 mb-2">
                        Genre: {story.genre.name}
                    </p>
                )}

                {/** Inhalts-Vorschau */}
                {story.content && (
                    <p className="text-sm text-gray-800 mb-4">
                        {story.content.length > 100
                            ? story.content.substring(0, 100) + '…'
                            : story.content}
                    </p>
                )}

                {/** Link zur Typing-Übung */}
                <Link
                    to={`/typing/${story.id}`}
                    className="inline-block px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Weiterlesen
                </Link>
            </div>
        </div>
    );
}

StoryCard.propTypes = {
    story: PropTypes.shape({
        id: PropTypes.number.isRequired,
        coverUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string
        }),
        content: PropTypes.string
    }).isRequired
};

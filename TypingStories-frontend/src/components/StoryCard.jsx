import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CoverNotAvailable from '../assets/CoverNotAvailable.jpg';

export default function StoryCard({ story, showActions = false, onEdit, onDelete }) {
    if (!story) return null;

    const coverSrc = story.coverUrl
        ? `http://localhost:8080${story.coverUrl}`
        : CoverNotAvailable;

    const maxLen = 100;
    const text   = story.content || '';
    const snippet =
        text.length > maxLen
            ? text.substring(0, maxLen).trim() + '…'
            : text;

    return (
        <div className="story-card">
            <img
                className="story-card__cover"
                src={coverSrc}
                alt={`Cover for ${story.title}`}
                onError={e => (e.currentTarget.src = CoverNotAvailable)}
            />

            <div className="story-card__info">
                <h3 className="story-card__title">{story.title}</h3>

                {story.genre && (
                    <p className="story-card__genre">
                        Genre: <strong>{story.genre.name}</strong>
                    </p>
                )}

                {snippet && (
                    <p className="story-card__snippet">
                        {snippet}
                        {text.length > maxLen && (
                            <Link
                                to={`/typing/${story.id}`}
                                className="story-card__more"
                            >
                                continue
                            </Link>
                        )}
                    </p>
                )}

                {showActions && (
                    <div className="story-actions">
                        <button onClick={() => onEdit(story.id)} className="edit-btn">Edit</button>
                        <button onClick={() => onDelete(story.id)} className="delete-btn">Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}

StoryCard.propTypes = {
    story: PropTypes.shape({
        id:       PropTypes.number.isRequired,
        title:    PropTypes.string,
        content:  PropTypes.string,
        genre:    PropTypes.shape({
            name: PropTypes.string,
        }),
        coverUrl: PropTypes.string,
    }),
    showActions: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GenreBadge({ genre }) {
    return (
        <Link
            to={`/discover?genreId=${genre.id}`}
            className="genre-badge"
        >
            {genre.name}
        </Link>
    );
}

GenreBadge.propTypes = {
    genre: PropTypes.shape({
        id:   PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

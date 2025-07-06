import React from 'react';
import PropTypes from 'prop-types';

export default function GenreBadge({ genreObject, isActive, onClick }) {
    const baseClass =
        'px-3 py-1 rounded-full cursor-pointer border font-medium';
    const activeClass = isActive
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-transparent text-gray-700 border-gray-400 hover:bg-blue-100';

    return (
        <span
            className={`${baseClass} ${activeClass}`}
            onClick={() => onClick(genreObject)}
        >
      {genreObject.name}
    </span>
    );
}

GenreBadge.propTypes = {
    genreObject: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

GenreBadge.defaultProps = {
    isActive: false
};

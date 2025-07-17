import React from 'react';
import PropTypes from 'prop-types';

export default function ToggleSwitch({onChange, options }) {
    return (
        <div className="inline-flex border rounded-lg overflow-hidden">
            {options.map(option => {
                return (
                    <button
                        key={option.id}
                        onClick={() => onChange(option.id)}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}

ToggleSwitch.propTypes = {
    selectedValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

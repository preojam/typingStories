import React from 'react';
import PropTypes from 'prop-types';

export default function ToggleSwitch({ selectedValue, onChange, options }) {
    return (
        <div className="inline-flex border rounded-lg overflow-hidden">
            {options.map(option => {
                const isOptionActive = option.id === selectedValue;
                return (
                    <button
                        key={option.id}
                        className={
                            isOptionActive
                                ? 'px-4 py-1 bg-blue-600 text-white'
                                : 'px-4 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }
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

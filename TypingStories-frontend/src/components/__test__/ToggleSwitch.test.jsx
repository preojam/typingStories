import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleSwitch from '../ToggleSwitch';


test('renders options and handles click', () => {
    const onChange = jest.fn();
    const options = [
        { id: 'read', label: 'Read' },
        { id: 'type', label: 'Type' }
    ];

    render(<ToggleSwitch selectedValue="read" options={options} onChange={onChange} />);

    const readButton = screen.getByText(/Read/i);
    const typeButton = screen.getByText(/Type/i);

    expect(readButton).toBeInTheDocument();
    expect(typeButton).toBeInTheDocument();

    fireEvent.click(typeButton);
    expect(onChange).toHaveBeenCalledWith('type');
});

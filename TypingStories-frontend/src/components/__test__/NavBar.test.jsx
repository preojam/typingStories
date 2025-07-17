import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';


test('renders navbar links', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );

    expect(screen.getByText(/TypingStories/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('search input can be typed in', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'testquery' } });
    expect(input.value).toBe('testquery');
});

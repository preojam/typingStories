import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GenreBadge from '../GenreBadge';


test('renders genre badge with link', () => {
    const genre = { id: 42, name: 'Fantasy' };
    render(
        <BrowserRouter>
            <GenreBadge genre={genre} />
        </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: /Fantasy/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/discover?genreId=42`);
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingsPanel from '../RatingsPanel';


jest.mock('../../api/scoreService', () => ({
    fetchScoresByStory: jest.fn(() => Promise.resolve([
        { id: 1, component: 'overall', value: 8.0, createdAt: '2024-06-01' }
    ])),
    createScore: jest.fn(() => Promise.resolve({ id: 2, component: 'overall', value: 7.5 }))
}));

test('renders RatingsPanel header and form', async () => {
    render(<RatingsPanel storyId={1} />);

    expect(await screen.findByText(/Ratings/i)).toBeInTheDocument();
    expect(await screen.findByText(/Score Average/i)).toBeInTheDocument();
});

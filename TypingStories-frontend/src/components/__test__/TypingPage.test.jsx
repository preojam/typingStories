import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypingPage from '../TypingPage';

const sampleText = '## Section One\nHello world!\n\n## Section Two\nSecond part here.';

describe('TypingPage', () => {
    test('renders chapter and page header', () => {
        render(<TypingPage text={sampleText} chapter={1} page={1} />);
        expect(screen.getByText(/Chapter 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
    });

    test('allows focus and typing simulation', () => {
        render(<TypingPage text={'abc'} chapter={1} page={1} />);
        const currentChar = screen.getByText('a'); // Der erste Buchstabe hat class "current"
        const container = currentChar.closest('div');
        container.focus();

        fireEvent.keyDown(container, { key: 'a' });
        fireEvent.keyDown(container, { key: 'b' });
        fireEvent.keyDown(container, { key: 'c' });

        const correctSpans = container.querySelectorAll('.correct');
        expect(correctSpans.length).toBe(3);
    });

    test('shows WPM and accuracy counters after typing', () => {
        jest.useFakeTimers();
        render(<TypingPage text={'abc'} chapter={1} page={1} />);
        const currentChar = screen.getByText('a');
        const container = currentChar.closest('div');
        container.focus();

        fireEvent.keyDown(container, { key: 'a' });
        jest.advanceTimersByTime(2000); // 2 Sekunden später
        fireEvent.keyDown(container, { key: 'x' }); // falsch
        fireEvent.keyDown(container, { key: 'c' });

        // Überprüfe ob die Performance-Metriken angezeigt werden
        expect(screen.getByText(/WPM/i)).toBeInTheDocument();
        expect(screen.getByText(/% ACC/i)).toBeInTheDocument();

        jest.useRealTimers();
    });

    test('handles backspace correctly', () => {
        render(<TypingPage text={'abc'} chapter={1} page={1} />);
        const currentChar = screen.getByText('a');
        const container = currentChar.closest('div');
        container.focus();

        fireEvent.keyDown(container, { key: 'a' });
        fireEvent.keyDown(container, { key: 'b' });
        fireEvent.keyDown(container, { key: 'Backspace' });

        const correctSpans = container.querySelectorAll('.correct');
        expect(correctSpans.length).toBe(1); // nur 'a'
    });

    test('counts errors on incorrect input', () => {
        render(<TypingPage text={'a'} chapter={1} page={1} />);
        const currentChar = screen.getByText('a');
        const container = currentChar.closest('div');
        container.focus();

        fireEvent.keyDown(container, { key: 'x' }); // falsch
        const incorrect = container.querySelectorAll('.incorrect');
        expect(incorrect.length).toBe(1);
    });
});

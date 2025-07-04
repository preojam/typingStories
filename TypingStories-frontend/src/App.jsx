import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Home          from './pages/Home';
import Discover      from './pages/Discover';
import Stories       from './pages/Stories';
import Reader        from './pages/Reader';
import CreateStory   from './pages/CreateStory';
import Typing        from './pages/Typing';
import Practice      from './pages/Practice.jsx';
import Test          from './pages/Test';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                /* Top lvl */
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/stories" element={<Stories />} />

                /* Dropdown Stories */
                <Route path="/stories/:id" element={<Reader />} />
                <Route path="/stories/:id/create" element={<CreateStory />} />
                <Route path="/stories/:id/typing" element={<Typing />} />
                <Route path="/stories/:id/practice" element={<Practice />} />
                <Route path="/stories/:id/test" element={<Test />} />

                /* Fallback auf home */
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
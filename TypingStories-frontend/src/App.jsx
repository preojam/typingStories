import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import MyStories from './pages/MyStories';
import CreateStory from './pages/CreateStory';
import Practice from './pages/Practice';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';


export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <main className="app__content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/my-stories" element={<MyStories />} />
                        <Route path="/writing/new" element={<CreateStory />} />
                        <Route path="/writing/edit/:storyId" element={<CreateStory />} />
                        <Route path="/typing" element={<Navigate to="/typing/15" replace />} />
                        <Route path="/typing/:storyId" element={<Practice />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>

    );
}

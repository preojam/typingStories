import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        const q = searchText.trim();
        if (q) {
            navigate(`/search?query=${encodeURIComponent(q)}`);
            setSearchText('');
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/">TypingStories</Link>
            </div>

            <ul className="navbar__menu">
                <li className="navbar__item">
                    <Link to="/discover">Discover</Link>
                </li>

                <li className="navbar__item navbar__dropdown">
                    <button className="navbar__dropbtn">Writing ▾</button>
                    <ul className="navbar__dropdown-content">
                        <li><Link to="/my-stories">My Stories</Link></li>
                        <li><Link to="/writing/new">Create Story</Link></li>
                        <li><Link to="/typing">Typing</Link></li>
                    </ul>
                </li>

                <li className="navbar__item">
                    <form onSubmit={handleSearch} className="navbar__search-form">
                        <input
                            type="text"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            placeholder="Search…"
                            className="navbar__search-input"
                        />
                    </form>
                </li>
            </ul>
        </nav>
    );
}

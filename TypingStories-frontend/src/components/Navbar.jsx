import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>

                <li className="dropdown">
                    <NavLink to="/discover">Discover</NavLink>
                    <ul className="dropdown-menu">
                        /* z.B. Genre-Filter-Links */
                        <li><NavLink to="/discover?genre=Fantasy">Fantasy</NavLink></li>
                        <li><NavLink to="/discover?genre=Science">Science</NavLink></li>
                    </ul>
                </li>

                <li className="dropdown">
                    <NavLink to="/stories">Stories</NavLink>
                    <ul className="dropdown-menu">
                        <li><NavLink to="/stories/new">+ Create Story</NavLink></li>
                        /* Beispiel statischer Links */
                        <li><NavLinks to="/stories/reader">Reader</NavLinks></li>
                        <li><NavLinks to="/stories/reader/typing">Typing</NavLinks></li>
                        <li><NavLinks to="/stories/reader/practice">Practice</NavLinks></li>
                        <li><NavLinks to="/stories/reader/test">Test</NavLinks></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}
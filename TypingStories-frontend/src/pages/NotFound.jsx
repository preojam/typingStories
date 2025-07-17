import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to="/">
                Go Back Home
            </Link>
        </div>
    );
}

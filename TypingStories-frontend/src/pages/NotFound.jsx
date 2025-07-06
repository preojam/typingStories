import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link to="/" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
                Go Back Home
            </Link>
        </div>
    );
}

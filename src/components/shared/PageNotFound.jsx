import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
                <p className="text-lg text-gray-500 mb-8">Sorry, the page you are looking for doesn't exist. We are working on it!!</p>
                <Link to="/" className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-700">
                    <FaHome className="mr-2"/>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
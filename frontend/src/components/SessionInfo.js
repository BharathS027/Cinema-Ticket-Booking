import React from 'react';
import { Link } from 'react-router-dom';

const SessionInfo = ({ movieSessions, movieId }) => {
  const handleSessionSelect = (session) => {
    localStorage.setItem('movieSession', JSON.stringify(session));
  };

  return (
    <Link to={`/movie/${movieId}`} className='container'>
      <ul>
        {movieSessions.map((session, index) => (
          <li key={index}>
            <button
              onClick={() => handleSessionSelect(session)}
              className='bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-700 text-white w-full border rounded-lg text-left text-sm font-semibold p-2 my-1 flex space-x-2 hover:from-indigo-500 hover:via-pink-500 hover:to-purple-600 hover:text-teal-300 transition-all duration-300'
              style={{
                textShadow: '0 0 5px rgba(0, 255, 255, 0.8), 0 0 10px rgba(0, 255, 255, 0.8)',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
              }}
            >
              <span>{session.time}</span>
              <span className='border-2 border-teal-300 rounded px-2'>
                {session.language}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default SessionInfo;

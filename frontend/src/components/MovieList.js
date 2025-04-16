import React, { useEffect, useState } from 'react';
import FetchMoviesByGenre from '../API/FetchMoviesByGenre';
import FetchMoviesBySearch from '../API/FetchMoviesBySearch';
import Genres from './Genre';
import MovieCard from './MovieCard';

const MovieList = ({ searchText }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreIds, setGenreIds] = useState([]);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  useEffect(() => {
    const fetchMoviesBySearch = async () => {
      if (searchText) {
        const response = await FetchMoviesBySearch(
          ACCESS_TOKEN,
          page,
          searchText,
        );
        if (response) {
          const { filteredMovies, totalPages } = response;
          setMovies(filteredMovies);
          setTotalPages(totalPages);
        }
      }
    };

    const fetchMoviesByGenre = async () => {
      if (!searchText) {
        const response = await FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds);
        if (response) {
          const { filteredMovies, totalPages } = response;
          setMovies(filteredMovies);
          setTotalPages(totalPages);
        }
      }
    };

    fetchMoviesBySearch();
    fetchMoviesByGenre();
  }, [page, genreIds, searchText, ACCESS_TOKEN]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='container mx-auto px-4 py-6'>
      <Genres setGenreIds={setGenreIds} />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} hallNumber={index} />
        ))}
      </div>

      <div className='flex justify-center mt-6 space-x-4'>
        <button
          onClick={handlePrevPage}
          className={`transition transform duration-200 hover:scale-105 ${
            page === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-700 hover:to-pink-700'
          } rounded-full px-5 py-2 text-sm font-semibold shadow-md`}
          disabled={page === 1}
        >
          ⬅ Previous
        </button>

        <button
          onClick={handleNextPage}
          className={`transition transform duration-200 hover:scale-105 ${
            page === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-700 hover:to-pink-700'
          } rounded-full px-5 py-2 text-sm font-semibold shadow-md`}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default MovieList;

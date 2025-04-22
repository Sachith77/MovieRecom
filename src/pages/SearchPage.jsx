import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { searchMovies } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const data = await searchMovies(query, currentPage);
        setMovies(data.results);
        setTotalResults(data.total_results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (!query) {
    return (
      <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <h2>Please enter a search query</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '50px' }}
    >
      {loading && currentPage === 1 ? (
        <Loading />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ marginBottom: '30px' }}>
              Search Results for: <span className="gradient-text">"{query}"</span>
            </h2>
            {totalResults > 0 && (
              <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
                Found {totalResults} results
              </p>
            )}
          </motion.div>

          {movies.length > 0 ? (
            <>
              <MovieGrid movies={movies} />
              
              {currentPage < totalPages && (
                <div style={{ textAlign: 'center', margin: '40px 0' }}>
                  <button onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3>No movies found matching "{query}"</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SearchPage; 
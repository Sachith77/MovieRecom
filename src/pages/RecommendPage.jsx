import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGenres, searchMovies } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const RecommendPage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresList = await getGenres();
        setGenres(genresList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prevSelected => {
      if (prevSelected.includes(genreId)) {
        return prevSelected.filter(id => id !== genreId);
      } else {
        return [...prevSelected, genreId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) return;

    setLoading(true);
    setIsFormSubmitted(true);
    
    try {
      // Simple recommendation: Search movies with the selected genres
      const genreParam = selectedGenres.join('|');
      const data = await searchMovies('', 1, { with_genres: genreParam });
      setRecommendedMovies(data.results);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '50px' }}
    >
      <motion.h1
        className="gradient-text"
        style={{ marginBottom: '30px', textAlign: 'center' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get Personalized Movie Recommendations
      </motion.h1>
      
      <motion.p
        style={{ 
          textAlign: 'center', 
          maxWidth: '800px', 
          margin: '0 auto 50px',
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select your favorite genres to discover movies tailored just for you. Our AI-powered system will analyze your preferences and recommend the perfect movies.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '50px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '30px'
          }}
        >
          {genres.map(genre => (
            <button
              key={genre.id}
              type="button"
              onClick={() => handleGenreToggle(genre.id)}
              style={{
                background: selectedGenres.includes(genre.id) 
                  ? 'linear-gradient(45deg, var(--primary), var(--secondary))'
                  : 'var(--surface)',
                border: selectedGenres.includes(genre.id)
                  ? 'none'
                  : '1px solid var(--primary)',
                color: 'var(--text-primary)',
                padding: '10px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedGenres.includes(genre.id)
                  ? '0 0 15px rgba(12, 255, 225, 0.3)'
                  : 'none'
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <button 
          type="submit" 
          disabled={selectedGenres.length === 0 || loading}
          style={{
            padding: '15px 40px',
            fontSize: '1.1rem'
          }}
        >
          Get Recommendations
        </button>
      </motion.form>

      {loading ? (
        <Loading />
      ) : (
        isFormSubmitted && (
          <>
            {recommendedMovies.length > 0 ? (
              <MovieGrid 
                movies={recommendedMovies} 
                title="Your Personalized Recommendations" 
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h3>No recommendations found</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
                  Try selecting different genres or combinations
                </p>
              </div>
            )}
          </>
        )
      )}
    </motion.div>
  );
};

export default RecommendPage; 
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTrendingMovies } from '../api/movieService';
import HeroSection from '../components/HeroSection';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <MovieGrid 
            movies={trendingMovies} 
            title="Trending This Week"
          />
        )}
      </div>
    </motion.div>
  );
};

export default HomePage; 
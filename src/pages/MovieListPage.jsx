import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const MovieListPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data = [];
        
        switch (category) {
          case 'popular':
            data = await getPopularMovies();
            setTitle('Popular Movies');
            break;
          case 'top-rated':
            data = await getTopRatedMovies();
            setTitle('Top Rated Movies');
            break;
          case 'upcoming':
            data = await getUpcomingMovies();
            setTitle('Upcoming Movies');
            break;
          default:
            data = await getPopularMovies();
            setTitle('Popular Movies');
        }
        
        setMovies(data);
      } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '50px' }}
    >
      {loading ? (
        <Loading />
      ) : (
        <MovieGrid movies={movies} title={title} />
      )}
    </motion.div>
  );
};

export default MovieListPage; 
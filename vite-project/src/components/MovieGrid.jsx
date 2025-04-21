import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h2>
      )}
      
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MovieGrid; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPosterPath } from '../api/movieService';

const MovieCard = ({ movie }) => {
  // Pick a random genre for the tag (if available)
  const randomGenre = movie.genres && movie.genres.length > 0 
    ? movie.genres[Math.floor(Math.random() * movie.genres.length)]
    : null;
    
  // Calculate release year safely
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown';

  // Handle click to scroll to top when navigating
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className="movie-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 10px 25px rgba(12, 255, 225, 0.3)'
      }}
    >
      <Link to={`/movie/${movie.id}`} onClick={handleClick}>
        <div className="movie-poster-container" style={{ position: 'relative', paddingTop: '150%', overflow: 'hidden' }}>
          <img 
            src={formatPosterPath(movie.poster_path)} 
            alt={movie.title} 
            className="movie-poster-img"
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
          
          {randomGenre && (
            <div className="movie-genre-tag">
              {randomGenre.name}
            </div>
          )}
        </div>
        
        <div className="movie-info-container">
          <div className="movie-title-container">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-release-year">{releaseYear}</div>
          </div>
          
          <div className="movie-bottom">
            <div className="movie-rating">
              <span className="star">★</span>
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard; 
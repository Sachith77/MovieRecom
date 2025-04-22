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

  // Format rating with one decimal place
  const rating = movie.vote_average 
    ? movie.vote_average.toFixed(1) 
    : 'N/A';

  // Generate a small random tilt for the card
  const randomTilt = Math.random() * 6 - 3; // -3 to +3 degrees

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
      initial={{ opacity: 0, y: 20, rotateZ: randomTilt }}
      animate={{ opacity: 1, y: 0, rotateZ: randomTilt }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10, 
        rotateZ: 0,
        transition: { duration: 0.3 }
      }}
    >
      <Link to={`/movie/${movie.id}`} onClick={handleClick}>
        <div className="movie-poster-container">
          <img 
            src={formatPosterPath(movie.poster_path)} 
            alt={movie.title} 
            className="movie-poster-img"
          />
          
          {/* Rating overlay that only appears on hover */}
          <div className="movie-rating-overlay">
            <div className="rating-badge">
              <span className="rating-star">★</span>
              <span className="rating-value">{rating}</span>
            </div>
            <div className="view-details-text">View Details</div>
          </div>
          
          {randomGenre && (
            <div className="movie-genre-tag">
              {randomGenre.name}
            </div>
          )}
        </div>
        
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-release-year">{releaseYear}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard; 
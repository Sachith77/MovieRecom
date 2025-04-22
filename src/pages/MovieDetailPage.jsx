import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetails, formatPosterPath, formatBackdropPath } from '../api/movieService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!movie) return <div className="container">Movie not found</div>;

  const { 
    title, 
    poster_path, 
    backdrop_path, 
    overview, 
    vote_average, 
    release_date, 
    runtime, 
    genres, 
    credits, 
    recommendations 
  } = movie;

  // Background style with movie backdrop
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(8, 13, 33, 0.7), rgba(8, 13, 33, 1)), url(${formatBackdropPath(backdrop_path)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100vh',
    zIndex: '-1'
  };

  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get director name
  const director = credits?.crew?.find(person => person.job === 'Director')?.name || 'Unknown';

  // Get top cast
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={backgroundStyle}></div>
      
      <div className="container movie-details-container">
        <div className="movie-details-header">
          <motion.img 
            src={formatPosterPath(poster_path)} 
            alt={title} 
            className="movie-details-poster"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <div className="movie-details-info">
            <motion.h1 
              className="movie-details-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title} <span style={{ fontSize: '1.5rem', opacity: 0.7 }}>
                ({new Date(release_date).getFullYear()})
              </span>
            </motion.h1>
            
            <motion.div 
              className="movie-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="movie-meta-item">
                {new Date(release_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              {runtime && (
                <div className="movie-meta-item">
                  {formatRuntime(runtime)}
                </div>
              )}
              
              <div className="movie-meta-item movie-rating">
                <span className="rating-star">★</span>
                <span>{vote_average?.toFixed(1)}</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
                {genres?.map(genre => (
                  <span 
                    key={genre.id}
                    style={{
                      background: 'rgba(12, 255, 225, 0.2)',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      color: 'var(--primary)'
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.p 
              className="movie-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {overview}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 style={{ marginBottom: '10px' }}>Director</h3>
              <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>{director}</p>
              
              <h3 style={{ marginBottom: '10px' }}>Cast</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {cast.map(person => (
                  <span 
                    key={person.id}
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {person.name}{cast.indexOf(person) < cast.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {recommendations?.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <MovieGrid 
              movies={recommendations} 
              title="Similar Movies You Might Enjoy" 
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetailPage; 
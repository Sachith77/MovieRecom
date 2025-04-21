import { useState, useEffect } from 'react';
import { testFetchMovies } from '../api/movieService';

const TestPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await testFetchMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading test data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test Page</h1>
      <p>Found {movies.length} movies from the API</p>
      
      <div style={{ marginTop: '20px' }}>
        {movies.length > 0 ? (
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', listStyle: 'none', padding: 0 }}>
            {movies.map(movie => (
              <li key={movie.id} style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ position: 'relative', paddingTop: '150%', overflow: 'hidden' }}>
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                      alt={movie.title}
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <div style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: '#333', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      No Image
                    </div>
                  )}
                </div>
                <div style={{ padding: '10px', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{movie.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'} • 
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found. API connection may be failing.</p>
        )}
      </div>
    </div>
  );
};

export default TestPage; 
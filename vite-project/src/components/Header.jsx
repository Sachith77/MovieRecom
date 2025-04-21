import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">NexFlix</Link>
      
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/movies/popular" className="nav-link">Popular</Link>
        <Link to="/movies/top-rated" className="nav-link">Top Rated</Link>
        <Link to="/movies/upcoming" className="nav-link">Upcoming</Link>
      </nav>
      
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </form>
    </header>
  );
};

export default Header; 
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if a nav link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

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
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/movies/popular" 
          className={`nav-link ${isActive('/movies/popular') ? 'active' : ''}`}
        >
          Popular
        </Link>
        <Link 
          to="/movies/top-rated" 
          className={`nav-link ${isActive('/movies/top-rated') ? 'active' : ''}`}
        >
          Top Rated
        </Link>
        <Link 
          to="/movies/upcoming" 
          className={`nav-link ${isActive('/movies/upcoming') ? 'active' : ''}`}
        >
          Upcoming
        </Link>
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
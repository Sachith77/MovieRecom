import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <Canvas className="background-shader">
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
      </Canvas>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="gradient-text">Discover</span> Your Next Favorite Movie
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Explore the universe of cinema with our AI-powered recommendation system. 
          Find movies tailored just for you.
        </motion.p>
        
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <button 
            className="btn"
            onClick={() => navigate('/movies/popular')}
          >
            Explore Movies
          </button>
          
          <button 
            className="btn"
            onClick={() => navigate('/recommend')}
            style={{ 
              background: 'transparent', 
              border: '2px solid var(--primary)',
              boxShadow: '0 0 10px rgba(12, 255, 225, 0.3) inset'
            }}
          >
            Get Recommendations
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection; 
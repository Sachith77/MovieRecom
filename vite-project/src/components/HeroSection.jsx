import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const EnhancedStars = () => {
  return (
    <>
      {/* Deeper layer of stars (smaller, more distant) */}
      <Stars 
        radius={120} 
        depth={60} 
        count={3000} 
        factor={2} 
        saturation={0}
        fade
        speed={0.5}
      />
      
      {/* Closer layer of stars (larger, more prominent) */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={5} 
        saturation={0}
        fade
        speed={0.3}
      />
      
      {/* Add a subtle ambient light for atmosphere */}
      <ambientLight intensity={0.05} />
      
      {/* Add a subtle directional light for dimension */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.1} 
        color={new THREE.Color('#0cffe1')} 
      />
    </>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      {/* Enhanced background effect */}
      <Canvas className="background-shader">
        <EnhancedStars />
        <fog attach="fog" args={['#000000', 30, 90]} />
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
          style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
        >
          <span className="gradient-text">Discover</span> Your Next Favorite Movie
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ color: '#c0c0c0' }}
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
              background: 'rgba(12, 12, 12, 0.8)', 
              border: '2px solid var(--primary)',
              boxShadow: '0 0 10px rgba(12, 255, 225, 0.2) inset'
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
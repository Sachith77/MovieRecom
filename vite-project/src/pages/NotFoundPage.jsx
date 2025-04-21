import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const NotFoundPage = () => {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ fontSize: '8rem', margin: 0 }}
        >
          <span className="gradient-text">404</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ marginBottom: '30px' }}
        >
          This page doesn't exist in our universe
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ marginBottom: '40px' }}
        >
          The page you're looking for has been lost in space or may have never existed.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Link to="/" className="btn">
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage; 
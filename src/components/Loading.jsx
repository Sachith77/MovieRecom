import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="loading">
      <motion.div 
        className="loading-spinner"
        animate={{ 
          rotate: 360,
          boxShadow: [
            '0 0 15px rgba(12, 255, 225, 0.5)',
            '0 0 25px rgba(12, 255, 225, 0.8)',
            '0 0 15px rgba(12, 255, 225, 0.5)'
          ]
        }}
        transition={{ 
          rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
    </div>
  );
};

export default Loading; 
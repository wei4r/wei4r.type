import React from 'react';
import styles from '../css/skeleton.module.css';

interface SkeletonWordProps {
  width?: number;
  className?: string;
}

const SkeletonWord: React.FC<SkeletonWordProps> = ({ width, className = '' }) => {
  // Generate random width if not provided (for variety)
  const skeletonWidth = width || Math.floor(Math.random() * 60) + 40;
  
  return (
    <div 
      className={`${styles.skeletonWord} ${className}`}
      style={{ width: `${skeletonWidth}px` }}
    >
      <div className={styles.skeletonShimmer}></div>
    </div>
  );
};

interface SkeletonWordsContainerProps {
  wordCount?: number;
  className?: string;
}

const SkeletonWordsContainer: React.FC<SkeletonWordsContainerProps> = ({ 
  wordCount = 20,
  className = '' 
}) => {
  return (
    <div className={`${styles.skeletonContainer} ${className}`}>
      {Array.from({ length: wordCount }, (_, index) => (
        <SkeletonWord key={index} />
      ))}
    </div>
  );
};

export { SkeletonWord, SkeletonWordsContainer };
export default SkeletonWordsContainer;
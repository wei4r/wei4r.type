import React from 'react';
import styles from '../css/loading.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <div className={styles.spinnerInner}></div>
    </div>
  );
};

export default LoadingSpinner;
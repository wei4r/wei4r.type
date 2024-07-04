import React, { useEffect, useState } from 'react';
import styles from '../css/page.module.css';

interface CursorProps {
  left: number;
  top: number;
  height: number;
}

const Cursor: React.FC<CursorProps> = ({ left, top, height }) => {
  return (
    <div
      className={styles.cursor}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        height: `${height}px`,
      }}
    ></div>
  );
};

export default Cursor;
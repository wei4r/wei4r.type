import { useEffect, useState, useRef, useCallback } from 'react';
export const useCountdown = (time: number, interval = 1000) => {
  
  // const intervalRef = useRef<NodeJS.Timer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdown, setCountdown] = useState<number>(time);

  const startCountdown = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev > interval) return prev - interval;
        else {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          intervalRef.current = null;
          return 0;
        }
      });
    }, interval);
  }, [interval]);

  const resetCountdown = useCallback(() => {
    console.log("resetCountdown");
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = null;
    setCountdown(time);
  }, [time]);

  useEffect(() => {
    setCountdown(time);
  }, [time]);
  return { countdown, startCountdown, resetCountdown};
};

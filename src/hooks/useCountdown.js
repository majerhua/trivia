import { useEffect, useState } from 'react';

const useCountdown = () => {

  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDown => countDown + 1);
      }, 1000);
  
      return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(countDown / 60);
  const seconds = Math.floor(countDown % 60);

  return [minutes, seconds];
};

export { useCountdown };
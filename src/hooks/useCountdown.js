import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {

  const countDownDate = targetDate;
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {

    if(countDown < countDownDate) {
      const interval = setInterval(() => {
        setCountDown(countDown => countDown + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }
    

  }, [countDownDate]);

  const minutes = Math.floor(countDown / 60);
  const seconds = Math.floor(countDown % 60);

  return [minutes, seconds];
};

export { useCountdown };
import Container from './UI/Container.tsx';
import { useTimersContext, type Timer as TimerProps} from '../store/timers-context.tsx'
import { useEffect, useRef, useState } from 'react';

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const intervalRef = useRef<number | null>(null);
  const {isRunning} = useTimersContext();

  if(remainingTime <= 0 && intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    let timer: number;
    
    if(isRunning) {
      timer = setInterval(function () {
        setRemainingTime(prevTime => prevTime - 50);
      }, 50);
      intervalRef.current = timer
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(timer);
    }
  }, [isRunning]);
  
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <progress max={duration * 1000} value={remainingTime}/>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}

import { createContext } from "react";

type Timer = {
    name: string;
    duration: number;
};

type TimerState = {
    isRunning: boolean;
    timers: Timer[];
};

type TimerContextValue = TimerState & {
    addTimer: (timerData: Timer) => void;
    startTimer: () => void;
    stopTimer: () => void;
};

const TimerContext = createContext<TimerContextValue | null>(null);
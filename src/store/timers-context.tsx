import { type ReactNode, createContext } from "react";

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

type TimersContextProviderProps = {
    children: ReactNode;
};

export default function TimersContextProvider({children}: TimersContextProviderProps) {
    const ctx: TimerContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {

        },
        startTimer() {
            
        },
        stopTimer() {
            
        },
    };
    return (
        <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>
    )
}
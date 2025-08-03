import { type ReactNode, createContext, useContext } from "react";

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

const TimersContext = createContext<TimerContextValue | null>(null);

export function useTimersContext() {
    const timersCtx = useContext(TimersContext);

    if (timersCtx === null) {
        throw new Error('TimersContext is null - that should not be the case!');
    }

    return timersCtx;
}

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
        <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
    )
}
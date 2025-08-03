import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
    name: string;
    duration: number;
};

type TimerState = {
    isRunning: boolean;
    timers: Timer[];
};

const initialState: TimerState = {
    isRunning: true,
    timers: []
}

type TimerContextValue = TimerState & {
    addTimer: (timerData: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void;
};

type AddTimerAction = {
    type: 'ADD_TIMER',
    payload: Timer
}

type StartTimerAction = {
    type: 'START_TIMERS'
}

type StopTimerAction = {
    type: 'STOP_TIMERS'
}
type Action = AddTimerAction | StartTimerAction | StopTimerAction;

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

function timersReducer(state: TimerState, action: Action): TimerState {
    if (action.type === 'ADD_TIMER') {
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration
                }
            ],
        }
    }
    if (action.type === 'START_TIMERS') {
        return {
            ...state,
            isRunning: true
        }
    }
    if (action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false
        }
    }

    return state;
}

export default function TimersContextProvider({children}: TimersContextProviderProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState);

    const ctx: TimerContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({ type: 'ADD_TIMER', payload: timerData });
        },
        startTimers() {
            dispatch({ type: 'START_TIMERS'});
        },
        stopTimers() {
            dispatch({ type: 'STOP_TIMERS'});
        },
    };
    return (
        <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
    )
}
import { useCallback } from "react";
import useBoolean from "./useBoolean";
import useCounter from "./useCounter";
import useInterval from "./useInterval";

//  hooks input and output interface
interface CountdownOption {
   countStart: number; // the countdown's starting number, initial value of returned number
   intervalMs?: number; // `1000` by default, the countdown's interval, in miliseconds 
   isIncrement?: boolean;  // `false` by default, true if the countdown is increment
   countStop?: number; // `0` the countdown's stopping number. Pass `-Infinity` to decrease forever 
} 

interface CountdownControllers {
    startCountdown: () => void;
    stopCountdown: () => void;
    resetCountdown: () => void;
}

const useCountdown = (params: CountdownOption): [number, CountdownControllers] => {
     const countStart = params.countStart;
     const intervalMs = params.intervalMs ?? 1000;
     const isIncrement = params.isIncrement ?? false;
     const countStop = params.countStop ?? 0;

     const { counter, decrement,increment, reset: resetCounter} = useCounter(countStart);

     const { value: isCountdownRunning, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false)

     const resetCountdown = () => {
        stopCountdown()
        resetCounter()
     }

     const countdownCallback = useCallback(() => {
           if(counter === countStop) {
              stopCountdown();
              return;
           }

           if(isIncrement) {
              increment()
           } else {
              decrement()
           }
     }, [countStop, decrement, increment, stopCountdown])

     useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

     return [counter, {
         resetCountdown, 
         startCountdown, 
         stopCountdown
     }]
}

export default useCountdown
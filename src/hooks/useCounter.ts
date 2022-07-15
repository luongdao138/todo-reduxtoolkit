import React, { SetStateAction, useCallback, useState } from "react";

interface ReturnType {
     counter: number;
     decrement: () => void;
     increment: () => void;
     reset: () => void;
     setCounter: React.Dispatch<SetStateAction<number>>
}

const useCounter = (intitialValue?: number): ReturnType => {
    const [counter, setCounter] = useState<number>(intitialValue || 0);

    const reset = useCallback(() => {
         setCounter(intitialValue || 0)
    }, []);

    const increment = useCallback(() => {
         setCounter(prev => prev + 1)
    }, []);

    const decrement = useCallback(() => {
         setCounter(prev => prev - 1)
    }, []);

    return {
         counter,
         decrement,
         increment,
         reset,
         setCounter
    }
};

export default useCounter;

import _ from "lodash";
import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number | null | undefined) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback
    }, [callback]);

    useEffect(() => {
    // don't schedule if no delay is specified, 0 is a valid delay value
     if(_.isNil(delay)) {
         return;
     }

     const intervalId = setInterval(() => savedCallback.current(),  delay);

     return () => clearInterval(intervalId)
    }, [delay])
}

export default useInterval;
import {  useRef } from "react";

export default function useFirstRender() {
    const isFirstRenderRef = useRef<boolean>(true);

    if(isFirstRenderRef.current) {
        isFirstRenderRef.current = false

        return true;
    }

    return isFirstRenderRef.current
}
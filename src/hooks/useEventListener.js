import { useEffect, useRef } from "react";

export const useEventListener = (eventName, handler, element) => {

    const ref = useRef(handler);
    
    useEffect(() => {
        ref.current = handler
    }, [handler])

    useEffect(() => {
        element.addEventListener(eventName, ref.current);
        return () => {
            element.removeEventListener(eventName, ref.current);
        }
    }, [eventName, element]);

};
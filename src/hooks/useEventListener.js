import { useEffect, useRef } from "react";

export const useEventListener = (eventName, handler, element) => {

    const ref = useRef(handler);

    useEffect(() => {
        ref.current = handler
    }, [handler])

    useEffect(() => {
        if (element !== null) {
            element.addEventListener(eventName, ref.current);
        }
        return () => {
            if (element !== null) {
                element.removeEventListener(eventName, ref.current);
            }
        }
    }, [eventName, element]);

};
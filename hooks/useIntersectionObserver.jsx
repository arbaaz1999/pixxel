"use client"
import { useEffect, useRef, useState } from 'react'

const useInterfaceObserver = (thresold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: thresold })

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [thresold])


    return [ref, isVisible]
}

export default useInterfaceObserver
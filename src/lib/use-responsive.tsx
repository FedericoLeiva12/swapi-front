import { useEffect, useState } from "react";

export const useResponsive = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        windowWidth,
    }
}
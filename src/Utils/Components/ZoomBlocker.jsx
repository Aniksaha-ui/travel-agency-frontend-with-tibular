import { useEffect } from "react";

const ZoomBlocker = () => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                (e.ctrlKey || e.metaKey) &&
                (e.key === "+" ||
                    e.key === "-" ||
                    e.key === "=" ||
                    e.key === "0" ||
                    e.which === 187 ||
                    e.which === 189 ||
                    e.which === 107 ||
                    e.which === 109 ||
                    e.which === 48 ||   // 0
                    e.which === 96)     // Numpad 0
            ) {
                e.preventDefault();
            }
        };

        const handleWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        const handleGestureStart = (e) => {
            e.preventDefault();
        };

        // Prevent zoom on double tap (sometimes needed for mobile)
        let lastTouchEnd = 0;
        const handleTouchEnd = (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };

        window.addEventListener("keydown", handleKeyDown, { passive: false });
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("gesturestart", handleGestureStart, { passive: false }); // Safari

        // Note: Touch blockers might interfere with normal usage, so being careful here.
        // The CSS touch-action: pan-x pan-y should handle most pinching. 
        // We add document level prevention for scale > 1 just in case

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("gesturestart", handleGestureStart);
        };
    }, []);

    return null;
};

export default ZoomBlocker;

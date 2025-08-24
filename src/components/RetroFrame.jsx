import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const RetroFrame = ({ children, className = "", style = {} }) => {
    const frameRef = useRef(null);

    // Add transition animation support
    useEffect(() => {
        const handlePageTransition = (e) => {
            if (frameRef.current) {
                // Apply transition effect to the frame when navigation occurs
                frameRef.current.style.transition = "opacity 0.3s, transform 0.3s";
                frameRef.current.style.opacity = "0.8";
                frameRef.current.style.transform = "scale(0.98)";

                // Reset after transition completes
                setTimeout(() => {
                    if (frameRef.current) {
                        frameRef.current.style.opacity = "1";
                        frameRef.current.style.transform = "scale(1)";
                    }
                }, 100);
            }
        };

        window.addEventListener("page-transition-start", handlePageTransition);
        return () => window.removeEventListener("page-transition-start", handlePageTransition);
    }, []);

    return (
        <motion.div
            ref={frameRef}
            className={`pixel-border rounded-none relative overflow-hidden ${className}`}
            style={style}
            initial={{ boxShadow: "0 0 0px #fff" }}
            animate={{ boxShadow: ["0 0 0px #fff", "0 0 16px #00fff7, 0 0 32px #fff"], borderColor: ["#fff", "#00fff7", "#fff"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
            <div className="scanline">
                {children}
            </div>
        </motion.div>
    );
};

export default RetroFrame;

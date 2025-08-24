import React, { useRef, useEffect, useState } from "react";

const PixelCanvas = ({
    width,
    height,
    sprite,
    animate = false,
    scale = 1,
    className = ""
}) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(0);
    const [isActive, setIsActive] = useState(true);

    // Handle animation frames
    useEffect(() => {
        if (!canvasRef.current || !sprite || !animate) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let currentFrame = 0;
        let lastFrameTime = 0;
        const frameInterval = 200; // ms between frames

        const renderFrame = (timestamp) => {
            if (!isActive) return;

            if (timestamp - lastFrameTime >= frameInterval) {
                ctx.clearRect(0, 0, width, height);

                // Draw the current frame of the sprite
                if (sprite.frames && sprite.frames.length > 0) {
                    const frame = sprite.frames[currentFrame];
                    for (let y = 0; y < frame.length; y++) {
                        for (let x = 0; x < frame[y].length; x++) {
                            const pixel = frame[y][x];
                            if (pixel) {
                                ctx.fillStyle = pixel;
                                ctx.fillRect(x, y, 1, 1);
                            }
                        }
                    }

                    currentFrame = (currentFrame + 1) % sprite.frames.length;
                    lastFrameTime = timestamp;
                }
            }

            frameRef.current = requestAnimationFrame(renderFrame);
        };

        frameRef.current = requestAnimationFrame(renderFrame);

        // Handle page transitions - pause animations when navigating
        const handlePageTransition = () => {
            setIsActive(false);
            // Resume after potential navigation is complete
            setTimeout(() => setIsActive(true), 400);
        };

        window.addEventListener("page-transition-start", handlePageTransition);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener("page-transition-start", handlePageTransition);
        };
    }, [sprite, animate, width, height, isActive]);

    // Handle visibility changes (tab switching, etc.)
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsActive(document.visibilityState === 'visible');
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // Initial render for non-animated sprites
    useEffect(() => {
        if (!canvasRef.current || !sprite) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!animate && sprite.frames && sprite.frames.length > 0) {
            const frame = sprite.frames[0];
            for (let y = 0; y < frame.length; y++) {
                for (let x = 0; x < frame[y].length; x++) {
                    const pixel = frame[y][x];
                    if (pixel) {
                        ctx.fillStyle = pixel;
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
            }
        }
    }, [sprite, animate]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={`pixel-art ${className}`}
            style={{
                width: `${width * scale}px`,
                height: `${height * scale}px`,
                imageRendering: "pixelated"
            }}
        />
    );
};

export default PixelCanvas;

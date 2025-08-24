import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RetroFrame from "./RetroFrame";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ensure component is properly mounted
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Improved navigation handler with better animation sync
    const handleNavigation = useCallback((path) => {
        if (isNavigating) return; // Prevent multiple navigation attempts

        setIsNavigating(true);

        // Add state to track that this is a user-initiated navigation
        const navigationState = {
            source: 'user-action',
            timestamp: Date.now()
        };

        // Shorter animation duration to prevent blank page
        const animationDuration = 200;

        // Use setTimeout to allow animation to play before navigating
        setTimeout(() => {
            navigate(path, { state: navigationState });
            // Reset navigation state after navigation completes
            setTimeout(() => setIsNavigating(false), 100);
        }, animationDuration);
    }, [navigate, isNavigating]);

    // Add state for button hover
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <AnimatePresence mode="wait">
            {mounted && (
                <motion.section
                    className="min-h-[85vh] grid place-items-center pt-10 md:pt-16 relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key="hero-section"
                    role="region"
                    aria-label="Hero section"
                >
                    {/* Add subtle scanlines overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)' }}>
                    </div>

                    <RetroFrame className="max-w-6xl w-[95%] mx-auto p-4 md:p-6 lg:p-10 bg-[var(--color-panel)] relative overflow-hidden">
                        {/* Game UI header bar */}
                        <div className="absolute top-0 left-0 right-0 h-6 border-b border-[#304060] bg-[#0c1526] flex items-center justify-between px-4">
                            <div className="text-xs font-[var(--font-terminal)] text-[var(--color-secondary)]">CHARACTER SELECT</div>
                            <motion.div
                                className="h-2 w-2 bg-[var(--color-primary)]"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            ></motion.div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center pt-4">
                            <motion.div
                                className="space-y-3 md:space-y-5 text-center md:text-left"
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                    <motion.div
                                        className="w-3 h-3 bg-[var(--color-primary)]"
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    ></motion.div>
                                    <p className="text-[var(--color-secondary)] tracking-widest text-xs sm:text-sm">PLAYER 1 // PORTFOLIO</p>
                                </div>

                                {/* Glitched title with pixel effect */}
                                <div className="relative">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-pixel)] text-[var(--color-primary)] leading-tight">
                                        ABHINAV
                                        <span className="text-[var(--color-secondary)] block sm:inline"> DEOKULIAR</span>
                                    </h2>

                                    {/* Pixelated highlight effect */}

                                </div>

                                {/* Class and spec display */}
                                <motion.div
                                    className="bg-[#0c1526] border-l-2 border-[var(--color-secondary)] pl-3 py-1"
                                    animate={{
                                        borderLeftColor: ['rgba(0, 255, 170, 1)', 'rgba(0, 255, 170, 0.5)', 'rgba(0, 255, 170, 1)']
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <p className="text-base sm:text-lg md:text-xl">Web Developer • MERN Stack • Python • Blockchain</p>
                                </motion.div>

                                {/* Character stats */}
                                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0c1526] p-2 border border-[#304060]">
                                    <div className="flex justify-between px-2">
                                        <span className="text-[var(--color-secondary)]">LVL:</span>
                                        <span>23</span>
                                    </div>
                                    <div className="flex justify-between px-2">
                                        <span className="text-[var(--color-secondary)]">HP:</span>
                                        <span className="text-red-400">85/100</span>
                                    </div>
                                    <div className="flex justify-between px-2">
                                        <span className="text-[var(--color-secondary)]">MP:</span>
                                        <span className="text-blue-400">60/100</span>
                                    </div>
                                    <div className="flex justify-between px-2">
                                        <span className="text-[var(--color-secondary)]">EXP:</span>
                                        <span>3400/4000</span>
                                    </div>
                                </div>

                                {/* Enhanced buttons */}
                                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                                    {
                                        [
                                            { id: 0, label: "START", path: "/about", icon: "▶" },
                                            { id: 1, label: "CONTINUE", path: "/projects", icon: "⏯" },
                                            { id: 2, label: "OPTIONS", path: "/contact", icon: "⚙" }
                                        ].map((btn) => (
                                            <motion.button
                                                key={btn.id}
                                                className="btn-pixel text-sm md:text-base relative"
                                                onClick={() => handleNavigation(btn.path)}
                                                disabled={isNavigating}
                                                onMouseEnter={() => setHoveredButton(btn.id)}
                                                onMouseLeave={() => setHoveredButton(null)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                aria-label={btn.label.toLowerCase()}
                                            >
                                                {/* Button highlight animation */}
                                                {hoveredButton === btn.id && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-[var(--color-primary)] opacity-20 -z-10"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 0.2 }}
                                                        exit={{ opacity: 0 }}
                                                    ></motion.div>
                                                )}
                                                <span className="mr-1">{btn.icon}</span>
                                                {btn.label}
                                            </motion.button>
                                        ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="justify-self-center mt-4 md:mt-0 relative"
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >

                                {/* Character frame with improved UI */}
                                <div className="relative">
                                    {/* Character class label */}
                                    <motion.div
                                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--color-secondary)] px-3 py-1 z-20"
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                    >

                                    </motion.div>

                                    <motion.div
                                        className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-black/60 grid place-items-center pixel-border shadow-2xl shadow-purple-900 relative z-10"
                                        animate={{
                                            scale: [0.85, 0.84, 0.85]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 3,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <img src="/src/assets/profile_pic.png" alt="Profile" className="w-full h-full object-cover" />

                                        {/* Level badge */}
                                        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[var(--color-primary)] rounded-full grid place-items-center border-2 border-[#102040] z-20">
                                            <span className="text-xs font-bold text-[#102040]">23</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Enhanced character name */}
                                <div className="text-center mt-4 space-y-2">
                                    <motion.p
                                        className="font-[var(--font-pixel)] text-sm"
                                        animate={{ color: ['#ffffff', 'rgba(0, 255, 170, 0.8)', '#ffffff'] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <span className="text-[var(--color-secondary)]">《</span>
                                        DARK SLAYER
                                        <span className="text-[var(--color-secondary)]">》</span>
                                    </motion.p>

                                    {/* Health bar */}
                                    <div>
                                        <div className="w-full h-2 bg-[#102040] pixel-border-sm">
                                            <motion.div
                                                className="h-full bg-red-500"
                                                initial={{ width: '0%' }}
                                                animate={{ width: '85%' }}
                                                transition={{ delay: 0.8, duration: 1 }}
                                            ></motion.div>
                                        </div>
                                    </div>

                                    {/* Energy bar */}
                                    <div>
                                        <div className="w-full h-2 bg-[#102040] pixel-border-sm">
                                            <motion.div
                                                className="h-full bg-blue-500"
                                                initial={{ width: '0%' }}
                                                animate={{ width: '60%' }}
                                                transition={{ delay: 0.9, duration: 1 }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Game UI footer */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-[#304060] bg-[#0c1526] flex items-center justify-center">
                            <motion.span
                                className="text-xs font-[var(--font-terminal)]"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                PRESS START TO BEGIN YOUR JOURNEY
                            </motion.span>
                        </div>
                    </RetroFrame>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Hero;

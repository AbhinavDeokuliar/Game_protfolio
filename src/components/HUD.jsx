import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Game HUD elements
const Dot = () => (
    <motion.span
        className="inline-block w-2 h-2 bg-[var(--color-primary)]"
        style={{ boxShadow: "var(--crt-glow)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
    />
);

// Mini-map blip animation
const MapBlip = ({ isActive, onClick, label, position }) => (
    <motion.div
        className={`absolute ${position} cursor-pointer z-10 group`}
        onClick={onClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
    >
        {/* Main blip dot */}
        <motion.div
            className={`w-2 h-2 rounded-full ${isActive ? 'bg-yellow-300' : 'bg-[var(--color-primary)]'}`}
            animate={{
                opacity: isActive ? [1, 0.7, 1] : [0.7, 0.3, 0.7],
                scale: isActive ? [1, 1.4, 1] : [1, 1.1, 1],
                boxShadow: isActive ?
                    ["0 0 5px #ffff00", "0 0 12px #00ffaa", "0 0 5px #ffff00"] :
                    "none"
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Ring effect for active blips */}
        {isActive && (
            <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300 pointer-events-none"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        )}

        {/* Tooltip on hover */}
        <motion.div
            className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full bg-[var(--color-panel)] border border-[var(--color-secondary)] px-1 py-0.5 rounded-sm text-[6px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
        >
            <p className="text-[var(--color-primary)]">{label}</p>
        </motion.div>
        {isActive && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[6px] text-white font-[var(--font-pixel)] bg-[rgba(0,0,0,0.7)] px-1">
                {label}
            </div>
        )}
    </motion.div>
);

const HUD = ({ menuOpen, setMenuOpen, sections, activeSection, handleSectionChange, transitionComplete = true }) => {
    // Game stats for HUD
    const gameStats = {
        level: 28,
        hp: 85,
        mp: 60,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Add state to track screen size for responsive adaptations
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

    // Update screen size state on resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update time display
    useEffect(() => {
        const updateTime = () => {
            gameStats.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        const timeInterval = setInterval(updateTime, 60000);
        return () => clearInterval(timeInterval);
    }, []);

    // Modified section change handler with debouncing
    const handleSectionClick = useCallback((index) => {
        // Don't allow navigation during transitions
        if (!transitionComplete) return;

        const navigationState = {
            source: 'map-navigation',
            timestamp: Date.now(),
            previousSection: activeSection
        };

        handleSectionChange(index, navigationState);
    }, [activeSection, handleSectionChange, transitionComplete]);

    const location = useLocation();

    // Update time periodically and handle bfcache restoration
    useEffect(() => {
        // Update time every minute
        const timeInterval = setInterval(() => {
            gameStats.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }, 60000);

        // Handle bfcache restoration
        const handlePageShow = (e) => {
            if (e.persisted) {
                // Update time immediately when restored from bfcache
                gameStats.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        };

        window.addEventListener('pageshow', handlePageShow);

        return () => {
            clearInterval(timeInterval);
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            {/* Main HUD bar */}
            <div className="border-b border-[var(--color-secondary)] bg-[var(--color-panel)] bg-opacity-80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between">
                    {/* Left side - Player info */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Dot />
                        <motion.h1
                            className="text-base sm:text-lg md:text-xl font-[var(--font-pixel)] text-[var(--color-primary)]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            {isMobile ? "A.EXE" : "ABHINAV.exe"}
                        </motion.h1>
                        <span className="text-xs border border-[var(--color-secondary)] px-1 bg-[var(--color-bg)] text-[var(--color-secondary)]">
                            Lv.{gameStats.level}
                        </span>
                    </div>

                    {/* Right side - Menu button & stats */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Game clock - only on larger screens */}
                        {!isMobile && (
                            <motion.div
                                className="text-xs font-[var(--font-terminal)] hidden md:block"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                            >
                                {gameStats.time}
                            </motion.div>
                        )}

                        {/* Status indicators - only on larger screens */}
                        {!isMobile && (
                            <div className="hidden md:flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-red-400">HP</span>
                                    <div className="w-12 h-2 bg-gray-900 pixel-border-sm">
                                        <div className="h-full bg-red-500" style={{ width: `${gameStats.hp}%` }}></div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-blue-400">MP</span>
                                    <div className="w-12 h-2 bg-gray-900 pixel-border-sm">
                                        <div className="h-full bg-blue-500" style={{ width: `${gameStats.mp}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Menu button */}
                        <motion.button
                            className="px-2 sm:px-3 py-1 border border-[var(--color-secondary)] text-xs font-[var(--font-pixel)] text-[var(--color-primary)]"
                            onClick={() => setMenuOpen(!menuOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={menuOpen ? {
                                backgroundColor: "rgba(0, 255, 170, 0.2)",
                                borderColor: "var(--color-primary)"
                            } : {}}
                        >
                            MENU
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mini-map - conditionally rendered based on screen size */}
            {!isMobile && (
                <motion.div
                    className="fixed top-16 right-4 w-32 sm:w-40 h-28 sm:h-36 border border-[var(--color-secondary)] bg-[var(--color-bg)] bg-opacity-70 hidden md:block overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(0, 255, 170, 0.3)",
                        backgroundColor: "rgba(10, 20, 30, 0.9)"
                    }}
                >
                    {/* Map scan line effect - subtle retro CRT effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent opacity-5 pointer-events-none"
                        animate={{
                            y: [-36, 36]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear"
                        }}
                    />
                    {/* Map title */}
                    <div className="absolute -top-6 left-0 text-[9px] font-[var(--font-pixel)] text-[var(--color-primary)]">
                        PORTFOLIO MAP
                    </div>

                    {/* Map grid lines */}
                    <div className="w-full h-full opacity-30"
                        style={{
                            backgroundImage: 'linear-gradient(to right, var(--color-secondary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-secondary) 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                        }}
                    ></div>

                    {/* Game "zones" */}
                    <div className="absolute inset-3 opacity-20">
                        {/* HOME zone */}
                        <motion.div
                            className="absolute top-0 left-0 w-1/2 h-1/3 border border-[var(--color-primary)]"
                            animate={activeSection === 0 ? {
                                borderColor: ["rgba(0, 255, 170, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(0, 255, 170, 0.8)"]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute top-1 left-1 text-[5px] text-[var(--color-primary)] opacity-80">HOME</div>
                        </motion.div>

                        {/* ABOUT zone */}
                        <motion.div
                            className="absolute top-1/3 left-0 w-1/3 h-1/3 border border-[var(--color-primary)]"
                            animate={activeSection === 1 ? {
                                borderColor: ["rgba(0, 255, 170, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(0, 255, 170, 0.8)"]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute top-1 left-1 text-[5px] text-[var(--color-primary)] opacity-80">ABOUT</div>
                        </motion.div>

                        {/* SKILLS zone */}
                        <motion.div
                            className="absolute top-1/3 right-0 w-2/3 h-1/3 border border-[var(--color-primary)]"
                            animate={activeSection === 2 ? {
                                borderColor: ["rgba(0, 255, 170, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(0, 255, 170, 0.8)"]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute top-1 left-1 text-[5px] text-[var(--color-primary)] opacity-80">SKILLS</div>
                        </motion.div>

                        {/* PROJECTS zone */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-3/5 h-1/3 border border-[var(--color-primary)]"
                            animate={activeSection === 3 ? {
                                borderColor: ["rgba(0, 255, 170, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(0, 255, 170, 0.8)"]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute top-1 left-1 text-[5px] text-[var(--color-primary)] opacity-80">PROJECTS</div>
                        </motion.div>

                        {/* CONTACT zone */}
                        <motion.div
                            className="absolute bottom-0 right-0 w-2/5 h-1/3 border border-[var(--color-primary)]"
                            animate={activeSection === 4 ? {
                                borderColor: ["rgba(0, 255, 170, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(0, 255, 170, 0.8)"]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute top-1 left-1 text-[5px] text-[var(--color-primary)] opacity-80">CONTACT</div>
                        </motion.div>
                    </div>

                    {/* Map location points - Modified to use received props with bfcache support */}
                    {/* HOME */}
                    <MapBlip
                        isActive={activeSection === 0}
                        onClick={() => handleSectionClick(0)}
                        label={sections[0].label}
                        position="top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* ABOUT */}
                    <MapBlip
                        isActive={activeSection === 1}
                        onClick={() => handleSectionClick(1)}
                        label={sections[1].label}
                        position="top-[35%] left-[15%] transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* SKILLS */}
                    <MapBlip
                        isActive={activeSection === 2}
                        onClick={() => handleSectionClick(2)}
                        label={sections[2].label}
                        position="top-[50%] right-[30%] transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* PROJECTS */}
                    <MapBlip
                        isActive={activeSection === 3}
                        onClick={() => handleSectionClick(3)}
                        label={sections[3].label}
                        position="bottom-[25%] left-[30%] transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* CONTACT */}
                    <MapBlip
                        isActive={activeSection === 4}
                        onClick={() => handleSectionClick(4)}
                        label={sections[4].label}
                        position="bottom-[20%] right-[20%] transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* Current section highlight */}
                    <div className="absolute inset-0 pointer-events-none">
                        {activeSection === 0 && (
                            <motion.div
                                className="absolute top-0 left-0 w-1/2 h-1/3 border-2 border-white"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        )}
                        {activeSection === 1 && (
                            <motion.div
                                className="absolute top-1/3 left-0 w-1/3 h-1/3 border-2 border-white"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        )}
                        {activeSection === 2 && (
                            <motion.div
                                className="absolute top-1/3 right-0 w-2/3 h-1/3 border-2 border-white"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        )}
                        {activeSection === 3 && (
                            <motion.div
                                className="absolute bottom-0 left-0 w-3/5 h-1/3 border-2 border-white"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        )}
                        {activeSection === 4 && (
                            <motion.div
                                className="absolute bottom-0 right-0 w-2/5 h-1/3 border-2 border-white"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        )}
                    </div>

                    {/* Map legend */}
                    <motion.div
                        className="absolute -bottom-5 left-0 text-[7px] font-[var(--font-terminal)] text-[var(--color-primary)]"
                        animate={{
                            textShadow: ["0 0 0px #00ffaa", "0 0 2px #00ffaa", "0 0 0px #00ffaa"]
                        }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                    >
                        <span className="text-[var(--color-secondary)]">LOC:</span> {sections[activeSection].label}
                    </motion.div>

                    {/* Context tooltip - only shown on larger screens */}
                    {!isSmallScreen && (
                        <motion.div
                            className="absolute -right-4 -bottom-4 bg-[var(--color-panel)] border border-[var(--color-secondary)] p-1.5 text-[6px] w-28"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, type: "spring", stiffness: 300 }}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-[var(--color-primary)]">MAP NAVIGATION</p>
                                <motion.span
                                    className="inline-block w-1.5 h-1.5 bg-[var(--color-primary)]"
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            </div>
                            <p className="opacity-70 mt-1">Click on blips to fast travel between sections</p>
                            <p className="mt-0.5 opacity-80 text-[var(--color-secondary)]">
                                Current zone: <span className="text-white">{sections[activeSection].label}</span>
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </motion.header>
    );
};

export default HUD;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RetroFrame from "./RetroFrame";
import { motion, AnimatePresence } from "framer-motion";
import { pixelSprites } from "../utils/pixelSprites";
import PixelCanvas from "./PixelCanvas";
import { useRetroNavigation } from './NavigationHelper';

const About = () => {
    const navigate = useNavigate();
    const retroNavigate = useRetroNavigation();
    const [isMobile, setIsMobile] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleNavigation = (path) => {
        if (isNavigating) return;
        setIsNavigating(true);

        const animationDuration = 200;

        setTimeout(() => {
            navigate(path, {
                state: {
                    source: 'user-action',
                    timestamp: Date.now()
                }
            });

            setTimeout(() => setIsNavigating(false), 100);
        }, animationDuration);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Faster staggering
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence mode="wait">
            {mounted && (
                <motion.section
                    id="about"
                    className="py-8 sm:py-12 md:py-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key="about-section"
                >
                    <div className="max-w-6xl mx-auto w-[95%]">
                        {/* Character stats header */}
                        <motion.div
                            className="flex items-center justify-between mb-6"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center">
                                <motion.div
                                    className="w-8 h-8 bg-[#102040] border-2 border-[var(--color-secondary)] grid place-items-center mr-3"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <span className="text-lg">👤</span>
                                </motion.div>
                                <h3 className="font-[var(--font-pixel)] text-base sm:text-xl">CHARACTER PROFILE</h3>
                            </div>

                            <div className="hidden sm:flex items-center space-x-2 text-xs">
                                <div className="bg-[#0c1526] px-2 py-1 border border-[#304060] text-[var(--color-secondary)]">
                                    ID: ADB-2023
                                </div>
                                <motion.div
                                    className="bg-[var(--color-primary)] px-2 py-1 text-[var(--color-bg)]"
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    ONLINE
                                </motion.div>
                            </div>
                        </motion.div>

                        <RetroFrame className="p-3 sm:p-6 bg-[var(--color-panel)]">
                            {/* Game console style header - removing colored dots */}
                            <div className="bg-[#0c1526] border-b border-[#304060] mb-4 p-2 hidden sm:flex items-center justify-between">
                                {/* Empty space where dots were */}
                                <div className="w-20"></div>

                                <div className="font-[var(--font-terminal)] text-xs text-center text-[var(--color-secondary)]">
                                    CHARACTER_DATA.exe - PROFILE VIEWER v1.2.4
                                </div>

                                <div className="flex items-center space-x-2">
                                    <motion.div
                                        className="w-2 h-2 bg-[var(--color-primary)]"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                                    ></motion.div>
                                    <motion.div
                                        className="w-2 h-2 bg-[var(--color-primary)]"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, repeatType: "reverse" }}
                                    ></motion.div>
                                    <motion.div
                                        className="w-2 h-2 bg-[var(--color-primary)]"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, repeatType: "reverse" }}
                                    ></motion.div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                                {/* Left side - Character sprite */}
                                <motion.div
                                    className="md:col-span-3 border-b md:border-b-0 md:border-r border-[#304060] pb-4 md:pb-0 md:pr-6"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="flex flex-col items-center md:items-start">
                                        <div className="relative mb-8"> {/* Increased margin-bottom from default (or mb-4) to mb-8 */}
                                            <motion.div
                                                className="absolute -inset-2 rounded-lg"
                                                animate={{
                                                    boxShadow: ["0 0 8px 2px rgba(0, 255, 170, 0.3)", "0 0 12px 4px rgba(0, 255, 170, 0.5)", "0 0 8px 2px rgba(0, 255, 170, 0.3)"]
                                                }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            ></motion.div>

                                            <motion.div
                                                className="aspect-square bg-[#102040] grid place-items-center border-2 border-[#304060] relative z-20 "
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="w-24 sm:w-32 h-24 sm:h-32 relative">
                                                    <img
                                                        src="/src/assets/profile_pic.png"
                                                        alt="Character Profile"
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* Level indicator */}
                                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--color-primary)] rounded-full grid place-items-center border-2 border-[#102040]">
                                                        <span className="text-xs font-bold text-[#102040]">23</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Character stats - responsive layout - now properly separated from profile image */}
                                    <motion.div
                                        className="text-xs font-[var(--font-terminal)] grid grid-cols-2 md:block bg-[#0c1526] p-3 border border-[#304060]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[var(--color-secondary)] text-xs">STATS</span>
                                            <span className="bg-[#102040] px-2 py-0.5 text-[var(--color-primary)] text-xs">CLASS DATA</span>
                                        </div>

                                        <div className="grid grid-cols-2 mb-1">
                                            <span className="text-[var(--color-secondary)]">CLASS:</span>
                                            <span>Web Developer</span>
                                        </div>
                                        <div className="grid grid-cols-2 mb-1">
                                            <span className="text-[var(--color-secondary)]">LEVEL:</span>
                                            <span>Final Year</span>
                                        </div>
                                        <div className="grid grid-cols-2 mb-1">
                                            <span className="text-[var(--color-secondary)]">EXP:</span>
                                            <span>2022 - 2026</span>
                                        </div>
                                        <div className="grid grid-cols-2 mb-1">
                                            <span className="text-[var(--color-secondary)]">HP:</span>
                                            <div className="w-full h-2 bg-gray-900 pixel-border-sm">
                                                <motion.div
                                                    className="h-full bg-red-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "85%" }}
                                                    transition={{ delay: 0.5, duration: 0.8 }}
                                                ></motion.div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 mb-1">
                                            <span className="text-[var(--color-secondary)]">MP:</span>
                                            <div className="w-full h-2 bg-gray-900 pixel-border-sm">
                                                <motion.div
                                                    className="h-full bg-blue-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "60%" }}
                                                    transition={{ delay: 0.6, duration: 0.8 }}
                                                ></motion.div>
                                            </div>
                                        </div>

                                        {/* Inventory quick stats */}
                                        <div className="mt-3 pt-2 border-t border-[#304060] grid grid-cols-2 gap-2">
                                            <div className="text-center">
                                                <div className="text-[var(--color-secondary)] text-xs">PROJECTS</div>
                                                <div className="text-[var(--color-primary)]">4</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[var(--color-secondary)] text-xs">SKILLS</div>
                                                <div className="text-[var(--color-primary)]">12+</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Right side - Character description */}
                                <div className="md:col-span-9">
                                    <motion.div
                                        className="text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {/* Enhanced character description with game UI elements */}
                                        <motion.div
                                            className="bg-[#0c1526] border-2 border-[#304060] p-4 relative"
                                            variants={itemVariants}
                                        >
                                            {/* Status bar decorations */}
                                            <div className="absolute -top-1 left-4 w-2 h-2 bg-[var(--color-primary)]"></div>
                                            <div className="absolute -top-1 right-4 w-2 h-2 bg-[var(--color-primary)]"></div>

                                            {/* Character name with game-style title */}
                                            <div className="mb-3 pb-2 border-b border-[#304060]">
                                                <h4 className="text-[var(--color-primary)] font-[var(--font-pixel)] text-lg mb-1 flex items-center">
                                                    ABHINAV DEOKULIAR
                                                    <span className="ml-2 bg-[#102040] text-xs px-2 py-0.5 text-[var(--color-secondary)]">Lv.23 Developer</span>
                                                </h4>
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <span className="text-[var(--color-secondary)] mr-1">CLASS:</span>
                                                    <span className="mr-3">Full Stack Web Developer</span>
                                                    <span className="text-[var(--color-secondary)] mr-1">FACTION:</span>
                                                    <span>MERN Alliance</span>
                                                </div>
                                            </div>

                                            {/* Character bio with typewriter-like styling */}
                                            <motion.p
                                                className="relative pl-4 border-l-2 border-[var(--color-secondary)]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                            >
                                                <span className="font-[var(--font-terminal)]">{">"}</span> A final-year B.E. CSE student at Chandigarh University with strong skills in full-stack
                                                web development, Python programming, and blockchain. Proficient in MERN stack,
                                                JavaScript, Python, C++, and Java.
                                                <motion.span
                                                    className="inline-block w-2 h-4 bg-[var(--color-secondary)] ml-1 align-middle"
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                ></motion.span>
                                            </motion.p>

                                            {/* Character stats in game style */}
                                            <div className="grid grid-cols-3 gap-2 mt-4">
                                                <motion.div
                                                    className="bg-[#102040] p-2 text-center"
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <div className="text-[var(--color-secondary)] text-xs">FOCUS</div>
                                                    <div className="text-[var(--color-primary)] font-bold">Web Dev</div>
                                                </motion.div>
                                                <motion.div
                                                    className="bg-[#102040] p-2 text-center"
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <div className="text-[var(--color-secondary)] text-xs">SPECIALTY</div>
                                                    <div className="text-[var(--color-primary)] font-bold">MERN Stack</div>
                                                </motion.div>
                                                <motion.div
                                                    className="bg-[#102040] p-2 text-center"
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <div className="text-[var(--color-secondary)] text-xs">SECONDARY</div>
                                                    <div className="text-[var(--color-primary)] font-bold">Blockchain</div>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Quest notification box */}
                                        <motion.div
                                            className="py-2 px-3 bg-[#102040] border border-[#304060] text-sm relative overflow-hidden"
                                            variants={itemVariants}
                                        >
                                            {/* Animated notification indicator */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1">
                                                <motion.div
                                                    className="w-full h-full bg-yellow-500"
                                                    animate={{
                                                        opacity: [0.5, 1, 0.5],
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                ></motion.div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mr-2 mt-0.5 text-yellow-300">
                                                    <motion.div
                                                        animate={{ rotate: [0, 10, -10, 0] }}
                                                        transition={{ repeat: Infinity, duration: 3 }}
                                                    >
                                                        !
                                                    </motion.div>
                                                </div>
                                                <div>
                                                    <div className="text-yellow-300 font-[var(--font-pixel)] text-xs mb-1">QUEST COMPLETION:</div>
                                                    <p>Built multiple real-world projects including client feedback portals, task management systems, and blockchain applications.</p>
                                                </div>
                                            </div>

                                            {/* Quest rewards */}
                                            <div className="mt-2 text-right text-xs">
                                                <span className="bg-[#0c1526] px-2 py-1 text-[var(--color-secondary)]">
                                                    +500 XP
                                                </span>
                                                <span className="bg-[#0c1526] px-2 py-1 text-yellow-300 ml-2">
                                                    +3 Skill Points
                                                </span>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="border-t border-[#304060] py-4 my-4"
                                            variants={itemVariants}
                                        >
                                            <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-4 flex items-center">
                                                <span className="inline-block w-4 h-4 bg-[var(--color-secondary)] mr-2"></span>
                                                QUEST LOG: WORK JOURNEY
                                            </h4>

                                            {/* Game-style journey path */}
                                            <div className="relative pb-4">
                                                {/* Journey path line */}
                                                <div className="absolute left-3 top-6 bottom-0 w-1 bg-[#304060] hidden md:block"
                                                    style={{ backgroundImage: 'linear-gradient(0deg, transparent 0%, transparent 50%, #102040 50%, #102040 100%)', backgroundSize: '6px 6px' }}>
                                                </div>

                                                {/* First quest/job */}
                                                <motion.div
                                                    className="mb-8 relative"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <div className="md:ml-8 bg-[#0c1526] border border-[#304060] p-3 relative">
                                                        {/* Level indicator for desktop */}
                                                        <div className="absolute left-0 top-3 w-7 h-7 bg-[var(--color-secondary)] rounded-full grid place-items-center transform -translate-x-1/2 hidden md:grid">
                                                            <span className="text-xs font-bold text-[#0c1526]">2</span>
                                                        </div>

                                                        {/* Quest header */}
                                                        <div className="flex items-center mb-2">
                                                            <div className="flex items-center justify-center w-8 h-8 mr-2 bg-[#102040] border border-[var(--color-secondary)]">
                                                                <span role="img" aria-label="work" className="text-lg">💻</span>
                                                            </div>
                                                            <div>
                                                                <div className="text-[var(--color-primary)] font-[var(--font-pixel)]">
                                                                    DC Infotech Pvt. Ltd.
                                                                </div>
                                                                <div className="flex items-center text-xs">
                                                                    <span className="text-[var(--color-secondary)] mr-1">ROLE:</span>
                                                                    <span>Web Developer Intern</span>
                                                                    <span className="mx-2">•</span>
                                                                    <span className="text-gray-400">May 2023-Present</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Quest description */}
                                                        <div className="ml-10">
                                                            {/* XP and rewards */}
                                                            <div className="flex items-center text-xs mb-2">
                                                                <span className="bg-[#102040] text-[var(--color-secondary)] px-2 py-0.5 mr-2">
                                                                    XP +1200
                                                                </span>
                                                                <span className="bg-[#102040] px-2 py-0.5 text-yellow-400 flex items-center">
                                                                    <span className="inline-block w-2 h-2 bg-yellow-400 mr-1"></span> SKILL LEVEL UP
                                                                </span>
                                                            </div>

                                                            {/* Quest objectives */}
                                                            <div className="text-sm space-y-2">
                                                                <motion.div
                                                                    className="flex items-start"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.3 }}
                                                                >
                                                                    <span className="text-green-400 mr-2">✓</span>
                                                                    <span>Developed full-stack applications: Client Feedback Portal and Task Management System using MERN stack</span>
                                                                </motion.div>
                                                                <motion.div
                                                                    className="flex items-start"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.4 }}
                                                                >
                                                                    <span className="text-green-400 mr-2">✓</span>
                                                                    <span>Implemented user authentication, dynamic dashboards, and database integration</span>
                                                                </motion.div>
                                                                <motion.div
                                                                    className="flex items-start"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.5 }}
                                                                >
                                                                    <span className="text-green-400 mr-2">✓</span>
                                                                    <span>Collaborated with team members under agile practices using Git and GitHub</span>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Second quest/job */}
                                                <motion.div
                                                    className="mb-2 relative"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <div className="md:ml-8 bg-[#0c1526] border border-[#304060] p-3 relative">
                                                        {/* Level indicator for desktop */}
                                                        <div className="absolute left-0 top-3 w-7 h-7 bg-[var(--color-primary)] rounded-full grid place-items-center transform -translate-x-1/2 hidden md:grid">
                                                            <span className="text-xs font-bold text-[#0c1526]">1</span>
                                                        </div>

                                                        {/* Quest header */}
                                                        <div className="flex items-center mb-2">
                                                            <div className="flex items-center justify-center w-8 h-8 mr-2 bg-[#102040] border border-[var(--color-secondary)]">
                                                                <span role="img" aria-label="freelance" className="text-lg">🌐</span>
                                                            </div>
                                                            <div>
                                                                <div className="text-[var(--color-primary)] font-[var(--font-pixel)]">
                                                                    Freelance Quest
                                                                </div>
                                                                <div className="flex items-center text-xs">
                                                                    <span className="text-[var(--color-secondary)] mr-1">ROLE:</span>
                                                                    <span>Web Developer</span>
                                                                    <span className="mx-2">•</span>
                                                                    <span className="text-gray-400">January 2023 (Remote)</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Quest description */}
                                                        <div className="ml-10">
                                                            {/* XP and rewards */}
                                                            <div className="flex items-center text-xs mb-2">
                                                                <span className="bg-[#102040] text-[var(--color-secondary)] px-2 py-0.5 mr-2">
                                                                    XP +800
                                                                </span>
                                                                <span className="bg-[#102040] px-2 py-0.5 text-blue-400 flex items-center">
                                                                    <span className="inline-block w-2 h-2 bg-blue-400 mr-1"></span> RARE ITEM: VPS CONFIG
                                                                </span>
                                                            </div>

                                                            {/* Quest objectives */}
                                                            <div className="text-sm space-y-2">
                                                                <motion.div
                                                                    className="flex items-start"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.4 }}
                                                                >
                                                                    <span className="text-green-400 mr-2">✓</span>
                                                                    <span>Built Vehicle Token Generation System for a client using Node.js, Express, and MongoDB</span>
                                                                </motion.div>
                                                                <motion.div
                                                                    className="flex items-start"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.5 }}
                                                                >
                                                                    <span className="text-green-400 mr-2">✓</span>
                                                                    <span>Integrated role-based access control and real-time data management</span>
                                                                </motion.div>
                                                                <motion.div
                                                                    className="flex items-start"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.6 }}
                                                                >
                                                                    <span className="text-green-400 mr-2">✓</span>
                                                                    <span>Deployed on Hostinger VPS with custom domain configuration</span>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Future quests indicator */}
                                                <div className="md:ml-8 mt-4 text-center md:text-left text-xs font-[var(--font-terminal)] text-[var(--color-secondary)] flex items-center justify-center md:justify-start">
                                                    <motion.div
                                                        className="w-2 h-2 bg-[var(--color-secondary)] mr-2"
                                                        animate={{ opacity: [1, 0.4, 1] }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                    ></motion.div>
                                                    <motion.span
                                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                    >
                                                        NEW QUESTS AVAILABLE SOON...
                                                    </motion.span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="border-t border-[#304060] py-4 my-4"
                                            variants={itemVariants}
                                        >
                                            <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-4 flex items-center">
                                                <span className="inline-block w-4 h-4 bg-[var(--color-primary)] mr-2"></span>
                                                TRAINING GROUNDS: EDUCATION
                                            </h4>

                                            {/* Game-style education path */}
                                            <div className="relative">
                                                {/* Connect skill tree with a line */}
                                                <div className="absolute left-4 top-16 w-1 bottom-12 bg-[#304060] hidden md:block"
                                                    style={{ backgroundImage: 'radial-gradient(#304060 20%, transparent 20%)', backgroundSize: '6px 18px' }}>
                                                </div>

                                                {/* University */}
                                                <motion.div
                                                    className="mb-8 ml-0 md:ml-12 relative"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <div className="bg-[#0c1526] border border-[#304060] p-3 relative overflow-hidden">
                                                        {/* Level indicator */}
                                                        <div className="absolute md:-left-8 top-3 md:top-1/2 md:transform md:-translate-y-1/2 md:translate-x-0 left-2 -top-2 transform -translate-y-full px-2 py-1 bg-[var(--color-primary)] font-[var(--font-pixel)] text-xs text-[var(--color-bg)] hidden md:block">
                                                            LVL 12
                                                        </div>

                                                        {/* Decorative grid background */}
                                                        <div className="absolute inset-0 opacity-5"
                                                            style={{
                                                                backgroundImage: 'linear-gradient(#00ffaa 1px, transparent 1px), linear-gradient(90deg, #00ffaa 1px, transparent 1px)',
                                                                backgroundSize: '20px 20px'
                                                            }}>
                                                        </div>

                                                        <div className="flex flex-col md:flex-row md:items-center">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-[#102040] border-2 border-[var(--color-secondary)] mb-3 md:mb-0 md:mr-4 flex-shrink-0">
                                                                <span role="img" aria-label="university" className="text-2xl">🎓</span>
                                                            </div>

                                                            <div className="flex-1">
                                                                <div className="flex flex-wrap items-center justify-between mb-1">
                                                                    <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)]">
                                                                        Bachelors in Computer Science Engineering
                                                                    </h5>

                                                                    <span className="text-xs bg-[var(--color-secondary)] text-[#102040] px-2 py-0.5 font-bold md:ml-2">
                                                                        ACTIVE
                                                                    </span>
                                                                </div>

                                                                <div className="flex flex-wrap items-center text-xs mb-3">
                                                                    <span className="mr-2">Chandigarh University, Mohali</span>
                                                                    <span className="text-[var(--color-secondary)]">|</span>
                                                                    <span className="ml-2">2022-2026</span>
                                                                </div>

                                                                {/* Skill tree progress */}
                                                                <div className="mt-3">
                                                                    <div className="flex justify-between text-xs mb-1">
                                                                        <span className="text-[var(--color-secondary)]">PROGRESS:</span>
                                                                        <span>80%</span>
                                                                    </div>
                                                                    <div className="w-full h-2 bg-[#102040] pixel-border-sm">
                                                                        <motion.div
                                                                            className="h-full"
                                                                            style={{
                                                                                background: 'linear-gradient(90deg, #00ffaa, #00ccff)',
                                                                                width: '80%'
                                                                            }}
                                                                            initial={{ width: '0%' }}
                                                                            animate={{ width: '80%' }}
                                                                            transition={{ delay: 0.3, duration: 1 }}
                                                                        ></motion.div>
                                                                    </div>
                                                                </div>

                                                                {/* Skills gained */}
                                                                <motion.div
                                                                    className="mt-3 flex flex-wrap gap-2"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.5 }}
                                                                >
                                                                    <span className="px-1 py-0.5 bg-[#102040] text-xs border border-[#304060]">+12 Development</span>
                                                                    <span className="px-1 py-0.5 bg-[#102040] text-xs border border-[#304060]">+10 Problem Solving</span>
                                                                    <span className="px-1 py-0.5 bg-[#102040] text-xs border border-[#304060]">+8 Teamwork</span>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Intermediate */}
                                                <motion.div
                                                    className="mb-8 ml-0 md:ml-12 relative"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <div className="bg-[#0c1526] border border-[#304060] p-3 relative overflow-hidden">
                                                        {/* Level indicator */}
                                                        <div className="absolute md:-left-8 top-3 md:top-1/2 md:transform md:-translate-y-1/2 md:translate-x-0 left-2 -top-2 transform -translate-y-full px-2 py-1 bg-[var(--color-secondary)] font-[var(--font-pixel)] text-xs text-[var(--color-bg)] hidden md:block">
                                                            LVL 8
                                                        </div>

                                                        {/* Decorative pattern background */}
                                                        <div className="absolute inset-0 opacity-5"
                                                            style={{
                                                                backgroundImage: 'repeating-linear-gradient(45deg, #00ffaa, #00ffaa 5px, transparent 5px, transparent 12px)',
                                                            }}>
                                                        </div>

                                                        <div className="flex flex-col md:flex-row md:items-center">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-[#102040] border-2 border-[var(--color-secondary)] mb-3 md:mb-0 md:mr-4 flex-shrink-0">
                                                                <span role="img" aria-label="school" className="text-2xl">📚</span>
                                                            </div>

                                                            <div className="flex-1">
                                                                <div className="flex flex-wrap items-center justify-between mb-1">
                                                                    <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)]">
                                                                        Intermediate (CBSE)
                                                                    </h5>

                                                                    <span className="text-xs bg-green-500 text-[#102040] px-2 py-0.5 font-bold md:ml-2">
                                                                        COMPLETED
                                                                    </span>
                                                                </div>

                                                                <div className="flex flex-wrap items-center text-xs mb-3">
                                                                    <span className="mr-2">Gyansthali High School, Bihar</span>
                                                                    <span className="text-[var(--color-secondary)]">|</span>
                                                                    <span className="ml-2">2020-2022</span>
                                                                </div>

                                                                {/* Skill tree progress */}
                                                                <div className="mt-3">
                                                                    <div className="flex justify-between text-xs mb-1">
                                                                        <span className="text-[var(--color-secondary)]">PROGRESS:</span>
                                                                        <span>100%</span>
                                                                    </div>
                                                                    <div className="w-full h-2 bg-[#102040] pixel-border-sm">
                                                                        <motion.div
                                                                            className="h-full"
                                                                            style={{
                                                                                background: 'linear-gradient(90deg, #00ffaa, #00ccff)',
                                                                                width: '100%'
                                                                            }}
                                                                            initial={{ width: '0%' }}
                                                                            animate={{ width: '100%' }}
                                                                            transition={{ delay: 0.4, duration: 1 }}
                                                                        ></motion.div>
                                                                    </div>
                                                                </div>

                                                                {/* Achievement unlocked */}
                                                                <motion.div
                                                                    className="mt-3 flex items-center"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.6 }}
                                                                >
                                                                    <span className="text-yellow-400 text-sm mr-2">🏆</span>
                                                                    <span className="text-yellow-400 text-xs">ACHIEVEMENT UNLOCKED: College Preparation</span>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Matriculation */}
                                                <motion.div
                                                    className="mb-4 ml-0 md:ml-12 relative"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <div className="bg-[#0c1526] border border-[#304060] p-3 relative overflow-hidden">
                                                        {/* Level indicator */}
                                                        <div className="absolute md:-left-8 top-3 md:top-1/2 md:transform md:-translate-y-1/2 md:translate-x-0 left-2 -top-2 transform -translate-y-full px-2 py-1 bg-blue-400 font-[var(--font-pixel)] text-xs text-[var(--color-bg)] hidden md:block">
                                                            LVL 5
                                                        </div>

                                                        {/* Decorative dots background */}
                                                        <div className="absolute inset-0 opacity-5"
                                                            style={{
                                                                backgroundImage: 'radial-gradient(#00ffaa 2px, transparent 2px)',
                                                                backgroundSize: '12px 12px'
                                                            }}>
                                                        </div>

                                                        <div className="flex flex-col md:flex-row md:items-center">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-[#102040] border-2 border-[var(--color-secondary)] mb-3 md:mb-0 md:mr-4 flex-shrink-0">
                                                                <span role="img" aria-label="school" className="text-2xl">📝</span>
                                                            </div>

                                                            <div className="flex-1">
                                                                <div className="flex flex-wrap items-center justify-between mb-1">
                                                                    <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)]">
                                                                        Matriculation (CBSE)
                                                                    </h5>

                                                                    <span className="text-xs bg-green-500 text-[#102040] px-2 py-0.5 font-bold md:ml-2">
                                                                        COMPLETED
                                                                    </span>
                                                                </div>

                                                                <div className="flex flex-wrap items-center text-xs mb-3">
                                                                    <span className="mr-2">Litera Valley School, Bihar</span>
                                                                    <span className="text-[var(--color-secondary)]">|</span>
                                                                    <span className="ml-2">2010-2020</span>
                                                                </div>

                                                                {/* Skill tree progress */}
                                                                <div className="mt-3">
                                                                    <div className="flex justify-between text-xs mb-1">
                                                                        <span className="text-[var(--color-secondary)]">PROGRESS:</span>
                                                                        <span>100%</span>
                                                                    </div>
                                                                    <div className="w-full h-2 bg-[#102040] pixel-border-sm">
                                                                        <motion.div
                                                                            className="h-full"
                                                                            style={{
                                                                                background: 'linear-gradient(90deg, #00ffaa, #00ccff)',
                                                                                width: '100%'
                                                                            }}
                                                                            initial={{ width: '0%' }}
                                                                            animate={{ width: '100%' }}
                                                                            transition={{ delay: 0.5, duration: 1 }}
                                                                        ></motion.div>
                                                                    </div>
                                                                </div>

                                                                {/* Skills gained */}
                                                                <motion.div
                                                                    className="mt-3 flex flex-wrap gap-2"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.7 }}
                                                                >
                                                                    <span className="px-1 py-0.5 bg-[#102040] text-xs border border-[#304060]">+5 Fundamentals</span>
                                                                    <span className="px-1 py-0.5 bg-[#102040] text-xs border border-[#304060]">+6 Core Knowledge</span>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Future education indicator */}
                                                <motion.div
                                                    className="ml-0 md:ml-12 mt-4 text-center md:text-left text-xs font-[var(--font-terminal)] flex items-center justify-center md:justify-start"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.8 }}
                                                >
                                                    <span className="text-[var(--color-primary)] mr-2">💡</span>
                                                    <span className="text-[var(--color-secondary)]">ADVANCED TRAINING PATHS UNLOCKING SOON...</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="border-t border-b border-[#304060] py-4 my-4"
                                            variants={itemVariants}
                                        >
                                            <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-4 flex items-center">
                                                <span className="inline-block w-4 h-4 bg-[var(--color-primary)] mr-2"></span>
                                                CHARACTER ATTRIBUTES
                                            </h4>

                                            {/* Game-style character attributes panel */}
                                            <div className="bg-[#0c1526] border border-[#304060] p-4 relative">
                                                {/* Decorative corner pixels */}
                                                <div className="absolute top-0 left-0 w-2 h-2 bg-[var(--color-primary)]"></div>
                                                <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-primary)]"></div>
                                                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[var(--color-primary)]"></div>
                                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[var(--color-primary)]"></div>

                                                {/* Game UI inspired attributes layout */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Left column - Attributes with meters */}
                                                    <div className="md:col-span-1 space-y-3">
                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-[var(--color-secondary)]">COMMUNICATION</span>
                                                                <span>90%</span>
                                                            </div>
                                                            <div className="w-full h-3 bg-[#102040] pixel-border-sm">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00ccff]"
                                                                    style={{ width: '90%' }}
                                                                    initial={{ width: '0%' }}
                                                                    animate={{ width: '90%' }}
                                                                    transition={{ delay: 0.2, duration: 1 }}
                                                                ></motion.div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-[var(--color-secondary)]">MANAGEMENT</span>
                                                                <span>85%</span>
                                                            </div>
                                                            <div className="w-full h-3 bg-[#102040] pixel-border-sm">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00ccff]"
                                                                    style={{ width: '85%' }}
                                                                    initial={{ width: '0%' }}
                                                                    animate={{ width: '85%' }}
                                                                    transition={{ delay: 0.3, duration: 1 }}
                                                                ></motion.div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-[var(--color-secondary)]">PROBLEM SOLVING</span>
                                                                <span>95%</span>
                                                            </div>
                                                            <div className="w-full h-3 bg-[#102040] pixel-border-sm">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00ccff]"
                                                                    style={{ width: '95%' }}
                                                                    initial={{ width: '0%' }}
                                                                    animate={{ width: '95%' }}
                                                                    transition={{ delay: 0.4, duration: 1 }}
                                                                ></motion.div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right column */}
                                                    <div className="md:col-span-1 space-y-3">
                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-[var(--color-secondary)]">TEAMWORK</span>
                                                                <span>92%</span>
                                                            </div>
                                                            <div className="w-full h-3 bg-[#102040] pixel-border-sm">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00ccff]"
                                                                    style={{ width: '92%' }}
                                                                    initial={{ width: '0%' }}
                                                                    animate={{ width: '92%' }}
                                                                    transition={{ delay: 0.5, duration: 1 }}
                                                                ></motion.div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-[var(--color-secondary)]">DECISION MAKING</span>
                                                                <span>88%</span>
                                                            </div>
                                                            <div className="w-full h-3 bg-[#102040] pixel-border-sm">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00ccff]"
                                                                    style={{ width: '88%' }}
                                                                    initial={{ width: '0%' }}
                                                                    animate={{ width: '88%' }}
                                                                    transition={{ delay: 0.6, duration: 1 }}
                                                                ></motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Character class special abilities */}
                                                <div className="mt-6 pt-4 border-t border-[#304060]">
                                                    <div className="text-xs text-[var(--color-secondary)] mb-2">SPECIAL ABILITIES:</div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                        {[
                                                            { name: 'Fast Learner', icon: '⚡' },
                                                            { name: 'Creative Problem Solver', icon: '🔍' },
                                                            { name: 'Team Coordinator', icon: '🤝' },
                                                            { name: 'Project Management', icon: '📊' },
                                                            { name: 'Adaptive Strategy', icon: '🔄' }
                                                        ].map((ability, index) => (
                                                            <motion.div
                                                                key={ability.name}
                                                                className="bg-[#102040] px-2 py-1 border border-[#304060] flex items-center text-xs"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.2 + (index * 0.1), duration: 0.3 }}
                                                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 170, 0.1)' }}
                                                            >
                                                                <span className="mr-1">{ability.icon}</span>
                                                                <span>{ability.name}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Character rank */}
                                                <motion.div
                                                    className="mt-4 text-center"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.8 }}
                                                >
                                                    <span className="bg-[var(--color-primary)] text-[var(--color-bg)] text-xs px-3 py-1 font-[var(--font-pixel)]">
                                                        CHARACTER RANK: S-TIER
                                                    </span>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Bottom navigation buttons - stack on mobile - updated to match Skills.jsx */}
                                        <motion.div
                                            className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 py-5"
                                            variants={itemVariants}
                                        >
                                            <motion.button
                                                onClick={() => handleNavigation('/')}
                                                className="flex items-center px-4 py-2 bg-[#0c1526] border border-[#304060] text-sm font-[var(--font-pixel)]"
                                                whileHover={{
                                                    scale: 1.03,
                                                    backgroundColor: "rgba(0, 255, 170, 0.05)",
                                                    boxShadow: "0 0 8px rgba(0, 255, 170, 0.3)"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isNavigating}
                                            >
                                                <span className="mr-2">◀</span>
                                                RETURN TO VILLAGE
                                            </motion.button>

                                            {!isMobile && (
                                                <div className="flex items-center space-x-1">
                                                    {['C', 'B', 'A', 'S'].map((rank, i) => (
                                                        <motion.span
                                                            key={rank}
                                                            className={`w-6 h-6 grid place-items-center border ${i === 3 ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]' : 'border-[#304060] opacity-60'}`}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.3 + (i * 0.05), duration: 0.3 }}
                                                        >
                                                            {rank}
                                                        </motion.span>
                                                    ))}

                                                    {/* RPG-style selection indicator */}
                                                    <motion.div
                                                        className="ml-1 flex space-x-0.5"
                                                        animate={{ y: [0, -1, 0, 1, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        <span className="w-1 h-1 bg-[var(--color-primary)]"></span>
                                                        <span className="w-1 h-1 bg-[var(--color-primary)]"></span>
                                                    </motion.div>
                                                </div>
                                            )}

                                            <motion.button
                                                onClick={() => handleNavigation('/skills')}
                                                className="flex items-center px-4 py-2 bg-[#0c1526] border border-[#304060] text-sm font-[var(--font-pixel)] text-[var(--color-primary)]"
                                                whileHover={{
                                                    scale: 1.03,
                                                    backgroundColor: "rgba(0, 255, 170, 0.1)",
                                                    boxShadow: "0 0 8px rgba(0, 255, 170, 0.3)"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isNavigating}
                                            >
                                                VIEW SKILLS
                                                <motion.span
                                                    className="ml-2"
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >▶</motion.span>
                                            </motion.button>
                                        </motion.div>

                                        {/* RPG menu tips */}
                                        <motion.div
                                            className="mt-4 text-center text-xs text-[var(--color-secondary)] opacity-60 px-4 py-2 border-t border-[#304060]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.6 }}
                                            transition={{ delay: 1, duration: 0.5 }}
                                        >
                                            <div className="flex justify-center items-center space-x-2">
                                                <span className="inline-block px-1 bg-[#102040] border border-[#304060]">A</span>
                                                <span>SELECT</span>
                                                <span className="inline-block px-1 bg-[#102040] border border-[#304060] ml-3">B</span>
                                                <span>BACK</span>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </RetroFrame>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};



export default About;

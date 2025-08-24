import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RetroFrame from "./RetroFrame";
import { motion, AnimatePresence } from "framer-motion";

// Real projects from resume with RPG stats
const projects = [
    {
        title: "Vehicle Token Generator",
        role: "Freelance Developer",
        rpgClass: "Engineer", // RPG class
        level: 18, // Project complexity level
        desc: "Designed and configured a vehicle token system with real-time data, role-based access control, and admin dashboard.",
        tech: ["Node.js", "MongoDB", "Express", "Hostinger VPS"],
        link: "https://github.com/AbhinavDeokuliar/vehicle-token-system",
        stats: {  // RPG-style stats
            strength: 75,
            intelligence: 90,
            agility: 65,
            stamina: 80,
            difficulty: 3,
            xpReward: 150
        }
    },
    {
        title: "Interactive Map App",
        role: "Python Developer",
        rpgClass: "Cartographer",
        level: 12,
        desc: "Created an interactive map application with custom markers, location-based data visualization, and searchable points of interest.",
        tech: ["Python", "Folium", "Data Visualization", "GeoPy"],
        link: "https://github.com/AbhinavDeokuliar/InteractiveMaps",
        stats: {
            strength: 60,
            intelligence: 85,
            agility: 70,
            stamina: 65,
            difficulty: 2,
            xpReward: 100
        }
    },
    {
        title: "Task Management System",
        role: "Full Stack Developer",
        rpgClass: "Commander",
        level: 24,
        desc: "Architected a comprehensive system for task assignment, tracking, and reporting with role-based access and status filters.",
        tech: ["MERN Stack", "React", "Node.js", "MongoDB", "JWT"],
        link: "https://github.com/AbhinavDeokuliar/Task-Management-System",
        stats: {
            strength: 85,
            intelligence: 80,
            agility: 75,
            stamina: 90,
            difficulty: 4,
            xpReward: 200
        }
    },
    {
        title: "Blockchain Certification",
        role: "Blockchain Developer",
        rpgClass: "Cryptomancer",
        level: 30,
        desc: "Created a decentralized platform for issuing and verifying skill certificates using smart contracts for tamper-proof credentials.",
        tech: ["Solidity", "Ethereum", "Web3.js", "MetaMask"],
        link: "https://github.com/AbhinavDeokuliar/Blockchain-Certification",
        stats: {
            strength: 95,
            intelligence: 90,
            agility: 70,
            stamina: 85,
            difficulty: 5,
            xpReward: 250
        }
    },
];

// Tech skills with RPG ability mapping
const techAbilities = {
    "Node.js": { icon: "⚡", type: "lightning", effect: "+15 processing speed" },
    "MongoDB": { icon: "💾", type: "storage", effect: "+20 data capacity" },
    "Express": { icon: "🔄", type: "flow", effect: "+10 routing power" },
    "Hostinger VPS": { icon: "🏰", type: "fortress", effect: "+25 uptime" },
    "Python": { icon: "🐍", type: "wisdom", effect: "+15 code clarity" },
    "Folium": { icon: "🗺️", type: "mapping", effect: "+20 visualization" },
    "Data Visualization": { icon: "📊", type: "insight", effect: "+15 data comprehension" },
    "GeoPy": { icon: "📍", type: "location", effect: "+10 geo-accuracy" },
    "MERN Stack": { icon: "⚔️", type: "full-stack", effect: "+30 development power" },
    "React": { icon: "⚛️", type: "elemental", effect: "+20 UI reactivity" },
    "JWT": { icon: "🔐", type: "security", effect: "+15 authentication" },
    "Solidity": { icon: "⛓️", type: "blockchain", effect: "+25 contract security" },
    "Ethereum": { icon: "💠", type: "crypto", effect: "+20 decentralization" },
    "Web3.js": { icon: "🌐", type: "connection", effect: "+15 blockchain integration" },
    "MetaMask": { icon: "🦊", type: "interface", effect: "+10 wallet connection" },
};

// Add new RPG quest difficulty types with colors
const questDifficultyTypes = {
    1: { name: "Novice", color: "text-green-400" },
    2: { name: "Apprentice", color: "text-blue-400" },
    3: { name: "Adept", color: "text-purple-400" },
    4: { name: "Expert", color: "text-orange-400" },
    5: { name: "Master", color: "text-red-400" },
};

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false); // Track local transitions
    const [mounted, setMounted] = useState(false); // Track component mount state
    const [playerXP, setPlayerXP] = useState(0); // RPG player XP
    const [showAbilityTooltip, setShowAbilityTooltip] = useState(null); // For tech ability tooltip
    const [battleEffect, setBattleEffect] = useState(null); // For RPG-style combat effects
    const [questNotification, setQuestNotification] = useState(null);
    const [ambientSound, setAmbientSound] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Set mounted state when component mounts
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Detect mobile devices for responsive adjustments
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Restore state from bfcache when component remounts
    useEffect(() => {
        // Check if we have a previously selected project in location state
        if (location.state?.activeProject !== undefined) {
            setActiveProject(location.state.activeProject);
        }

        // Retrieve stored XP or initialize
        const storedXP = localStorage.getItem('playerXP');
        if (storedXP) {
            setPlayerXP(parseInt(storedXP, 10));
        }
    }, [location]);

    // Store player XP when it changes
    useEffect(() => {
        localStorage.setItem('playerXP', playerXP.toString());
    }, [playerXP]);

    // Generate player level from XP
    const calculatePlayerLevel = useCallback(() => {
        return Math.floor(Math.sqrt(playerXP / 10)) + 1;
    }, [playerXP]);

    // Play subtle "quest accepted" sound
    const playQuestSound = useCallback((type) => {
        if (ambientSound) {
            const audio = new Audio(
                type === 'examine'
                    ? '/sounds/examine.mp3'  // You would need to add these sound files
                    : '/sounds/quest.mp3'
            );
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Audio play prevented'));
        }
    }, [ambientSound]);

    // Enhanced XP gain with RPG flair
    const gainXP = useCallback((amount, message = null) => {
        // Show floating notification
        setQuestNotification({
            message: message || `+${amount} XP gained!`,
            type: 'xp'
        });

        // Play sound
        playQuestSound('quest');

        // Show battle effect
        setBattleEffect({ type: 'xp', amount });

        // Schedule XP to be added after animation
        setTimeout(() => {
            setPlayerXP(prev => prev + amount);
            setBattleEffect(null);

            // Clear notification
            setTimeout(() => {
                setQuestNotification(null);
            }, 1000);
        }, 1500);
    }, [playQuestSound]);

    // Improved navigation handler with better timing
    const handleNavigation = useCallback(
        (path) => {
            // Prevent multiple rapid transitions
            if (isTransitioning) return;
            setIsTransitioning(true);

            // Store current state for restoration when navigating back
            const navigationState = {
                source: "user-action",
                timestamp: Date.now(),
                activeProject: activeProject,
                previousPath: location.pathname,
            };

            // Shorter animation duration to prevent blank page
            const animationDuration = 200;

            // Use setTimeout to allow animation to play before navigating
            setTimeout(() => {
                navigate(path, { state: navigationState });
                // Reset navigation state after a delay
                setTimeout(() => setIsTransitioning(false), 100);
            }, animationDuration);
        },
        [activeProject, isTransitioning, location.pathname, navigate]
    );

    // Close context menu when clicking elsewhere
    useEffect(() => {
        const handleClickOutside = () => {
            if (showMenu) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showMenu]);

    // Game-like animation variants with responsive adjustments
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: isMobile ? 0.1 : 0.2, // Faster staggering
                delayChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.3, // Faster animation
            },
        },
        hover: {
            scale: isMobile ? 1.02 : 1.05,
            boxShadow: "0 0 15px rgba(0, 255,247, 0.7)",
            transition: {
                type: "spring",
                stiffness: 300,
            },
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: { duration: 0.2 },
        }
    };

    // RPG battle effect animations
    const battleEffectVariants = {
        initial: { y: -20, scale: 0.8, opacity: 0 },
        animate: { y: -50, scale: 1.2, opacity: 1 },
        exit: { y: -80, opacity: 0 },
    };

    return (
        <AnimatePresence mode="wait">
            {mounted && (
                <motion.section
                    id="projects"
                    className="py-8 sm:py-12 md:py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key="projects-section"
                >
                    <div className="max-w-6xl mx-auto w-[95%]">
                        {/* RPG Player Stats Bar - make it more visually distinct */}
                        <motion.div
                            className="mb-6 border-2 border-[var(--color-secondary)] bg-[var(--color-panel)] p-3 relative rpg-panel"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                boxShadow: "0 0 10px rgba(0,255,170,0.2)",
                                backgroundImage: "radial-gradient(circle at center, rgba(0,255,170,0.03) 0%, transparent 70%)"
                            }}
                        >
                            {/* Quest notification system - shows temporary messages */}
                            <AnimatePresence>
                                {questNotification && (
                                    <motion.div
                                        className="absolute -top-10 right-5 px-4 py-1.5 bg-[#102040] border border-[var(--color-secondary)] text-sm text-[var(--color-primary)]"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                    >
                                        {questNotification.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Sound toggle - adds to immersion */}
                            <motion.button
                                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--color-panel)] border border-[var(--color-secondary)] flex items-center justify-center text-xs"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setAmbientSound(!ambientSound)}
                                title={ambientSound ? "Mute sounds" : "Enable sounds"}
                            >
                                {ambientSound ? "🔊" : "🔇"}
                            </motion.button>

                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    {/* Character avatar */}
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] bg-[#102030] grid place-items-center overflow-hidden">
                                            <span className="text-2xl">👨‍💻</span>

                                            {/* Level badge */}
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-full grid place-items-center text-xs font-bold">
                                                {calculatePlayerLevel()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Character stats */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-[var(--font-pixel)] text-[var(--color-primary)]">DEVELOPER</h3>
                                            <div className="px-1 bg-[#203040] text-xs">LVL {calculatePlayerLevel()}</div>
                                        </div>

                                        {/* XP Bar */}
                                        <div className="w-40 h-2 bg-[#102030] mt-1 relative border border-[#304060]">
                                            <motion.div
                                                className="h-full bg-[var(--color-primary)]"
                                                style={{
                                                    width: `${(playerXP % 100) / 100 * 100}%`,
                                                    backgroundImage: "linear-gradient(90deg, var(--color-primary) 70%, rgba(0,255,170,0.8) 100%)"
                                                }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(playerXP % 100) / 100 * 100}%` }}
                                                transition={{ duration: 1 }}
                                            ></motion.div>
                                            <div className="absolute top-0 left-0 w-full text-center text-[0.6rem] text-white">
                                                XP: {playerXP % 100}/100
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Battle stats */}
                                <div className="flex flex-wrap gap-4 text-xs">
                                    <div className="stat-item">
                                        <div className="text-[var(--color-secondary)]">STRENGTH</div>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 mr-1">⚔️</span>
                                            <span>{60 + calculatePlayerLevel() * 2}</span>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="text-[var(--color-secondary)]">INTELLIGENCE</div>
                                        <div className="flex items-center">
                                            <span className="text-blue-400 mr-1">✨</span>
                                            <span>{75 + calculatePlayerLevel() * 3}</span>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="text-[var(--color-secondary)]">QUESTS</div>
                                        <div className="flex items-center">
                                            <span className="text-green-400 mr-1">📜</span>
                                            <span>{projects.length} / 10</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Game time */}
                                <div className="text-xs opacity-70 font-[var(--font-terminal)]">
                                    GAME TIME: {Math.floor(Date.now() / 1000) % 86400}
                                </div>
                            </div>

                            {/* Mini-quest tracker */}
                            <div className="absolute -bottom-3 right-5 px-3 py-0.5 text-xs bg-[var(--color-bg)] border border-[var(--color-secondary)] flex items-center">
                                <span className="text-[var(--color-primary)] mr-1">!</span>
                                <span>Active Quests: {projects.length}</span>
                            </div>
                        </motion.div>

                        {/* Enhanced RPG Menu Header with quest map style */}
                        <motion.div
                            className="mb-6 sm:mb-8 border border-[var(--color-secondary)] bg-[var(--color-panel)] py-2 sm:py-3 px-3 sm:px-4 relative overflow-hidden rpg-quest-board"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            style={{
                                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgb3BhY2l0eT0iMC4wNSI+PGcgZmlsbD0iIzAwZmZhYSI+PHBhdGggZD0iTTAgMGgxMHYxMEgwek0yMCAwaDF2MWgtMXogTTQwIDBoMTB2MTBINDBNMTAgMTBoMTB2MTBIMTBNMzAgMTBoMXYxaC0xek01MCAxMGgxdjFoLTF6IE0wIDIwaDEwdjEwSDBNMjAgMjBoMTB2MTBIMjBNNDAgMjBoMTB2MTBINDBNMTAgMzBoMXYxaC0xek0zMCAzMGgxMHYxMEgzME01MCAzMGgxdjFoLTF6IE0wIDQwaDEwdjEwSDBNMjAgNDBoMXYxaC0xek00MCA0MGgxMHYxMEg0ME0xMCA1MGgxdjFoLTF6TTMwIDUwaDEwdjEwSDMwTTUwIDUwaDEwdjEwSDUweiI+PC9wYXRoPjwvZz48L3N2Zz4=')"
                            }}
                        >
                            {/* Pixelated corners */}
                            <div className="absolute top-0 left-0 w-3 h-3 bg-[var(--color-primary)]"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-primary)]"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 bg-[var(--color-primary)]"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-primary)]"></div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <motion.div
                                        className="w-6 h-6 mr-3 grid place-items-center"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 3,
                                            ease: "linear",
                                        }}
                                    >
                                        <span
                                            className="text-xl text-[var(--color-primary)]"
                                            role="img"
                                            aria-label="game controller"
                                        >
                                            🎮
                                        </span>
                                    </motion.div>
                                    <h3 className="font-[var(--font-pixel)] text-xl text-[var(--color-primary)]">
                                        AVAILABLE QUESTS
                                    </h3>
                                </div>

                                {/* Menu version number like in old games */}
                                <div className="text-xs font-[var(--font-terminal)] opacity-70">
                                    PATCH v2.1.4
                                </div>
                            </div>

                            {/* RPG-style quest log */}
                            <div className="mt-2 text-xs font-[var(--font-terminal)] text-[var(--color-secondary)] flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="pixel-loader mr-2"></div>
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        [A] SELECT QUEST • [B] BACK • [C] VIEW DETAILS
                                    </motion.span>
                                </div>

                                <div className="px-2 bg-[#102040] border border-[#304060] flex items-center gap-1">
                                    <span className="text-yellow-400">📜</span>
                                    <span className="text-[var(--color-primary)]">QUEST LOG ({projects.length})</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Game level selection grid */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 rpg-quest-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {projects.map((p, i) => (
                                <motion.div
                                    key={p.title}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    animate={activeProject === i ? "hover" : "visible"}
                                    onClick={() => {
                                        setActiveProject(activeProject === i ? null : i);
                                        // Gain XP when viewing project details for first time
                                        if (activeProject !== i) {
                                            gainXP(5, "Quest details discovered!");
                                        }
                                    }}
                                    className="cursor-pointer"
                                    onContextMenu={(e) => {
                                        if (isMobile) return; // Disable context menu on mobile
                                        e.preventDefault();
                                        setShowMenu(true);
                                        setMenuPosition({ x: e.clientX, y: e.clientY });
                                        playQuestSound('examine');
                                    }}
                                >
                                    <RetroFrame
                                        className={`p-3 sm:p-5 bg-[var(--color-panel)] relative overflow-visible rpg-quest-card ${activeProject === i ? 'active-quest' : ''}`}
                                        style={{
                                            boxShadow: activeProject === i ? "0 0 15px rgba(0, 255, 170, 0.3)" : "none"
                                        }}
                                    >
                                        {/* Quest Difficulty Badge - more RPG like */}
                                        <div className="absolute -top-3 -right-3 px-2 py-0.5 bg-[#102030] border border-[var(--color-secondary)]">
                                            <span className={`text-xs ${questDifficultyTypes[p.stats.difficulty]?.color || "text-white"}`}>
                                                {questDifficultyTypes[p.stats.difficulty]?.name || "Quest"}
                                            </span>
                                        </div>

                                        {/* Quest Difficulty Stars */}
                                        <div className="absolute -top-2 left-4 flex">
                                            {[...Array(p.stats.difficulty)].map((_, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="text-yellow-400 text-xs"
                                                    animate={{ y: [0, -2, 0] }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 1,
                                                        delay: idx * 0.2
                                                    }}
                                                >
                                                    ★
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Status effects when active - animated better */}
                                        <AnimatePresence>
                                            {activeProject === i && (
                                                <motion.div
                                                    className="absolute -top-1 left-0 w-full h-1"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.div
                                                        className="h-full bg-[var(--color-primary)]"
                                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Project image/icon - more RPG style */}
                                        <div className="mb-4 h-[80px] relative overflow-hidden border-2 border-[#304060]">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-br from-[#102040] to-[#304060]"
                                                style={{
                                                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgb3BhY2l0eT0iMC4xIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMwMDAwMDAiPjwvcmVjdD48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMDAwMCI+PC9yZWN0Pjwvc3ZnPg==')",
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {/* Pixelated project icon with relevant icons */}
                                                <motion.div
                                                    className="w-12 h-12 relative"
                                                    style={{ imageRendering: "pixelated" }}
                                                    animate={
                                                        activeProject === i
                                                            ? {
                                                                scale: [1, 1.1, 1],
                                                                rotate: [0, 5, -5, 0],
                                                            }
                                                            : {}
                                                    }
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    {i === 0 && <span className="text-3xl">🚗</span>}
                                                    {i === 1 && <span className="text-3xl">🗺️</span>}
                                                    {i === 2 && <span className="text-3xl">📋</span>}
                                                    {i === 3 && <span className="text-3xl">🔐</span>}
                                                </motion.div>
                                            </div>

                                            {/* Selected highlight effect */}
                                            {activeProject === i && (
                                                <motion.div
                                                    className="absolute inset-0 bg-[var(--color-primary)]"
                                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                />
                                            )}

                                            {/* XP Reward indicator - better RPG style */}
                                            <div className="absolute bottom-1 right-1 px-1 bg-black bg-opacity-70 text-yellow-400 text-[0.65rem] flex items-center">
                                                <motion.span
                                                    className="mr-1"
                                                    animate={activeProject === i ? {
                                                        scale: [1, 1.2, 1],
                                                    } : {}}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                >
                                                    +{p.stats.xpReward}
                                                </motion.span>
                                                <span>✨</span>
                                            </div>
                                        </div>

                                        {/* Quest name - more fantasy styled */}
                                        <div className="flex items-center justify-between mb-2">
                                            <motion.h4
                                                className="font-[var(--font-pixel)] text-[var(--color-primary)] truncate"
                                                animate={{
                                                    textShadow:
                                                        activeProject === i
                                                            ? ["0 0 5px #00fff7", "0 0 15px #00fff7", "0 0 5px #00fff7"]
                                                            : "none",
                                                    color:
                                                        activeProject === i
                                                            ? ["#00ffaa", "#00ccff", "#00ffaa"]
                                                            : "#00ffaa",
                                                }}
                                                transition={{
                                                    repeat: activeProject === i ? Infinity : 0,
                                                    duration: 1.5,
                                                }}
                                            >
                                                {p.title}
                                            </motion.h4>
                                        </div>

                                        {/* Character class and role indicators with more RPG style */}
                                        <div className="flex items-center justify-between mb-2">
                                            {/* RPG Class with icon */}
                                            <div className="flex items-center px-2 py-0.5 bg-[#102030] border border-[#304060]">
                                                <span className="text-xs text-[var(--color-secondary)] mr-1">⚜️</span>
                                                <span className="text-xs text-yellow-400">{p.rpgClass}</span>
                                            </div>

                                            {/* Role display */}
                                            <div className="text-xs text-[var(--color-secondary)]">
                                                [{p.role}]
                                            </div>
                                        </div>

                                        {/* Description with RPG scroll styling */}
                                        <div className="mt-2 h-16 overflow-hidden relative">
                                            <motion.div
                                                className={`text-sm rpg-scroll ${activeProject === i
                                                    ? "border-l-2 border-[var(--color-primary)] pl-2"
                                                    : ""
                                                    }`}
                                                animate={
                                                    activeProject === i
                                                        ? {
                                                            opacity: 1,
                                                            height: "auto",
                                                            transition: { duration: 0.3 },
                                                        }
                                                        : {
                                                            opacity: 0.7,
                                                            height: "3rem",
                                                            transition: { duration: 0.3 },
                                                        }
                                                }
                                            >
                                                <p
                                                    className={
                                                        activeProject === i ? "text-[var(--color-primary)]" : ""
                                                    }
                                                >
                                                    {p.desc}
                                                </p>

                                                {/* Quest status shown when active - with RPG style */}
                                                {activeProject === i && (
                                                    <motion.div
                                                        className="mt-2 text-xs flex items-center quest-status"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <span className="bg-[#102030] text-[var(--color-secondary)] px-2 py-0.5 mr-2 flex items-center">
                                                            <motion.span
                                                                animate={{ rotate: [0, 360] }}
                                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                                className="inline-block mr-1 text-[0.6rem]"
                                                            >
                                                                ✓
                                                            </motion.span>
                                                            QUEST COMPLETED
                                                        </span>
                                                        <span className="text-yellow-400 text-xs">
                                                            +{p.stats.xpReward} XP
                                                        </span>
                                                    </motion.div>
                                                )}
                                            </motion.div>

                                            {/* Blinking cursor when active */}
                                            {activeProject === i && (
                                                <motion.span
                                                    className="inline-block w-2 h-4 bg-[var(--color-primary)] absolute right-0 top-0"
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                ></motion.span>
                                            )}
                                        </div>

                                        {/* Stats display with more RPG flair */}
                                        {activeProject === i && (
                                            <motion.div
                                                className="mt-2 flex justify-between border-t border-[#304060] pt-2 text-xs"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex items-center stat-tooltip" data-tooltip="Combat Strength">
                                                    <span className="text-red-400 mr-1">⚔️</span>
                                                    <span className="text-[var(--color-secondary)]">{p.stats.strength}</span>
                                                </div>
                                                <div className="flex items-center stat-tooltip" data-tooltip="Magic Power">
                                                    <span className="text-blue-400 mr-1">✨</span>
                                                    <span className="text-[var(--color-secondary)]">{p.stats.intelligence}</span>
                                                </div>
                                                <div className="flex items-center stat-tooltip" data-tooltip="Evasion">
                                                    <span className="text-green-400 mr-1">🏃</span>
                                                    <span className="text-[var(--color-secondary)]">{p.stats.agility}</span>
                                                </div>
                                                <div className="flex items-center stat-tooltip" data-tooltip="Endurance">
                                                    <span className="text-yellow-400 mr-1">❤️</span>
                                                    <span className="text-[var(--color-secondary)]">{p.stats.stamina}</span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Tech = abilities with more RPG styling */}
                                        <div className="mt-3">
                                            <div className="text-xs mb-1 text-[var(--color-secondary)] flex items-center rpg-section-heading">
                                                <motion.span
                                                    className="mr-1"
                                                    animate={activeProject === i ? { rotateY: [0, 360] } : {}}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                >🧪</motion.span>
                                                <span>ABILITIES & EQUIPMENT:</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs rpg-abilities">
                                                {p.tech.map((t) => (
                                                    <div
                                                        key={t}
                                                        className="relative"
                                                        onMouseEnter={() => {
                                                            setShowAbilityTooltip(t);
                                                            activeProject === i && playQuestSound('examine');
                                                        }}
                                                        onMouseLeave={() => setShowAbilityTooltip(null)}
                                                    >
                                                        <motion.span
                                                            className="inline-block px-2 py-1 bg-[#102040] border border-[var(--color-secondary)] ability-tag"
                                                            whileHover={{
                                                                y: -2,
                                                                boxShadow: "0 3px 6px rgba(0,255,170,0.3)"
                                                            }}
                                                            style={{
                                                                backgroundImage:
                                                                    activeProject === i
                                                                        ? "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,255,170,0.1) 2px, rgba(0,255,170,0.1) 4px)"
                                                                        : "none",
                                                            }}
                                                        >
                                                            {techAbilities[t]?.icon && (
                                                                <motion.span
                                                                    className="mr-1"
                                                                    animate={activeProject === i ? { scale: [1, 1.2, 1] } : {}}
                                                                    transition={{ duration: 2, repeat: Infinity }}
                                                                >{techAbilities[t].icon}</motion.span>
                                                            )}
                                                            {t}
                                                        </motion.span>

                                                        {/* RPG Style Ability tooltip */}
                                                        {showAbilityTooltip === t && (
                                                            <motion.div
                                                                className="absolute bottom-full left-0 mb-2 w-40 bg-black bg-opacity-90 border border-[var(--color-primary)] p-2 z-10 rpg-tooltip"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0 }}
                                                            >
                                                                <div className="text-[var(--color-primary)] font-bold mb-1 flex items-center">
                                                                    {techAbilities[t]?.icon && <span className="mr-1">{techAbilities[t].icon}</span>}
                                                                    {t}
                                                                </div>
                                                                <div className="text-[0.65rem]">
                                                                    <div className="text-yellow-400">Type: {techAbilities[t]?.type || "standard"}</div>
                                                                    <div className="text-green-400">{techAbilities[t]?.effect || "+10 coding power"}</div>
                                                                </div>
                                                                <div className="absolute left-2 bottom-[-6px] w-3 h-3 bg-black border-r border-b border-[var(--color-primary)] transform rotate-45"></div>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Game command button with RPG styling */}
                                        <div className="mt-4 flex justify-center items-center border-t border-[#304060] pt-3">
                                            <motion.a
                                                href={p.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-pixel text-xs relative px-4 py-2 flex items-center gap-2 bg-[#102040] border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-[var(--font-pixel)] rpg-button"
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: "0 0 12px rgba(0, 255, 247, 0.6)"
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                animate={{
                                                    boxShadow:
                                                        activeProject === i
                                                            ? ["0 0 0px #00fff7", "0 0 10px #00fff7", "0 0 0px #00fff7"]
                                                            : "none",
                                                }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Reward XP for viewing project code
                                                    gainXP(25, "Examining quest details...");
                                                    playQuestSound('examine');
                                                }}
                                            >
                                                <span role="img" aria-label="view">🔍</span> EXAMINE CODE
                                            </motion.a>
                                        </div>

                                        {/* RPG-style status indicators */}
                                        {activeProject === i && (
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 rpg-status-indicators">
                                                {/* Active status indicators */}
                                                <motion.div
                                                    className="w-2 h-2 rounded-full bg-green-500"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                ></motion.div>
                                                <motion.div
                                                    className="w-2 h-2 rounded-full bg-blue-500"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
                                                ></motion.div>
                                                <motion.div
                                                    className="w-2 h-2 rounded-full bg-yellow-500"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
                                                ></motion.div>
                                            </div>
                                        )}
                                    </RetroFrame>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Mobile-friendly menu alternative - simplified to one button */}
                        <AnimatePresence>
                            {isMobile && activeProject !== null && (
                                <motion.div
                                    className="fixed bottom-0 left-0 right-0 bg-[var(--color-panel)] border-t-2 border-[var(--color-secondary)] p-3 z-50"
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: 100 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <button
                                            className="btn-pixel text-xs relative px-4 py-2 flex items-center gap-1 bg-[#102040] border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-[var(--font-pixel)]"
                                            onClick={() => {
                                                window.open(projects[activeProject].link, "_blank");
                                                // Gain XP when viewing project
                                                gainXP(25);

                                                // Show battle effect
                                                setBattleEffect({
                                                    type: 'accept',
                                                    message: 'EXAMINING PROJECT!',
                                                    amount: 25
                                                });

                                                setTimeout(() => {
                                                    setBattleEffect(null);
                                                }, 1500);
                                            }}
                                        >
                                            <span role="img" aria-label="view">🔍</span> EXAMINE CODE
                                        </button>
                                        <div className="text-sm text-[var(--color-primary)] flex items-center">
                                            <span className="mr-1">📜</span>
                                            {projects[activeProject].title}
                                        </div>
                                        <button
                                            className="btn-pixel text-xs relative px-3 py-1.5 flex items-center gap-1 bg-[#102030] border border-[var(--color-secondary)] text-[var(--color-secondary)]"
                                            onClick={() => setActiveProject(null)}
                                        >
                                            <span role="img" aria-label="close">✖️</span> CLOSE
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Game menu UI - updated menu actions with simplified options */}
                        <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    className="fixed z-50 w-48 bg-[var(--color-bg)] border-2 border-[var(--color-secondary)] pixel-border-sm"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    style={{
                                        top: menuPosition.y,
                                        left: menuPosition.x,
                                        backgroundImage:
                                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px)",
                                    }}
                                    // Prevent bubbling to document click handler
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="font-[var(--font-pixel)] text-xs text-[var(--color-primary)] border-b border-[var(--color-secondary)] p-2">
                                        QUEST ACTIONS
                                    </div>
                                    <div className="p-1">
                                        {[
                                            {
                                                name: "EXAMINE CODE",
                                                icon: "🔍",
                                                action: () => {
                                                    window.open(projects[activeProject || 0].link, "_blank");
                                                    gainXP(25);
                                                    setBattleEffect({
                                                        type: 'accept',
                                                        message: 'EXAMINING PROJECT!',
                                                        amount: 25
                                                    });
                                                    setTimeout(() => setBattleEffect(null), 1500);
                                                }
                                            },
                                            { name: "VIEW DETAILS", icon: "📖", action: () => { } },
                                            { name: "SKILL TREE", icon: "⚔️", action: () => handleNavigation("/skills") },
                                            { name: "RETURN TO TOWN", icon: "🏠", action: () => handleNavigation("/") },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={item.name}
                                                className="py-1 px-2 text-sm cursor-pointer hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] flex items-center gap-2"
                                                whileHover={{ x: 3 }}
                                                onClick={() => {
                                                    if (item.action) item.action();
                                                    setShowMenu(false);
                                                }}
                                            >
                                                <span className="w-4 text-xs">{i + 1}</span>
                                                <span
                                                    className="text-base leading-none"
                                                    role="img"
                                                    aria-label={item.name}
                                                >
                                                    {item.icon}
                                                </span>
                                                <span>{item.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Click anywhere else to close menu */}
                        {showMenu && (
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowMenu(false)}
                            ></div>
                        )}

                        {/* Game console footer with enhanced RPG terminal feel */}
                        <motion.div
                            className="mt-10 py-4 px-5 border border-[var(--color-secondary)] bg-[var(--color-panel)] text-xs font-[var(--font-terminal)] rpg-terminal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            style={{
                                backgroundImage: "linear-gradient(to bottom, rgba(0,255,170,0.03), transparent)",
                                boxShadow: "0 0 10px rgba(0,0,0,0.2) inset"
                            }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-1 text-[var(--color-secondary)]">
                                    <span>&gt;</span>
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        _
                                    </motion.span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 border border-[var(--color-secondary)] bg-[#102030] hover:bg-[#203040] flex items-center gap-2"
                                        onClick={() => handleNavigation("/skills")}
                                    >
                                        <span className="text-xs">⚔️</span>
                                        <span className="text-[var(--color-primary)]">SKILLS</span>
                                    </button>

                                    <button
                                        className="px-3 py-1 border border-[var(--color-secondary)] bg-[#102030] hover:bg-[#203040] flex items-center gap-2"
                                        onClick={() => handleNavigation("/")}
                                    >
                                        <span className="text-xs">🏠</span>
                                        <span className="text-[var(--color-primary)]">TOWN</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-1 text-[var(--color-primary)]">
                                [QUEST MASTER]: {projects.length} quests available. Current level: {calculatePlayerLevel()}
                            </div>

                            {/* Game-like text commands */}
                            <div className="mt-3 font-[var(--font-terminal)]">
                                <span className="text-green-400">SYSTEM&gt;</span> Quest database loaded
                                <br />
                                <span className="text-yellow-400">INFO&gt;</span> Player stats: LVL {calculatePlayerLevel()} • XP {playerXP} • QUESTS {projects.length}/10
                                <br />
                                <span className="text-[var(--color-primary)]">USER&gt;</span> /quests --show-available --sort-by=difficulty
                                <br />
                                <span className="text-[var(--color-primary)]">&gt;</span>{" "}
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                >
                                    _
                                </motion.span>
                            </div>

                            <motion.div
                                className="mt-1"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                                style={{ height: "1px", background: "var(--color-secondary)" }}
                            ></motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

// Add new CSS to apply to the document
const styleElement = document.createElement('style');
styleElement.textContent = `
    .rpg-quest-card {
        transition: all 0.3s ease;
    }
    
    .active-quest {
        background: linear-gradient(to bottom, #102040, #203050) !important;
    }
    
    .rpg-section-heading {
        border-bottom: 1px dashed rgba(0,255,170,0.3);
        padding-bottom: 3px;
    }
    
    .stat-tooltip {
        position: relative;
    }
    
    .stat-tooltip:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: var(--color-primary);
        padding: 2px 4px;
        border: 1px solid var(--color-secondary);
        white-space: nowrap;
        font-size: 0.65rem;
        pointer-events: none;
    }
    
    .rpg-button::before {
        content: '';
        position: absolute;
        inset: -2px;
        border: 1px dashed rgba(0,255,170,0.3);
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .rpg-button:hover::before {
        opacity: 1;
    }
    
    .rpg-scroll {
        position: relative;
        background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1));
    }
    
    .rpg-terminal {
        background-color: rgba(16, 32, 48, 0.7);
        backdrop-filter: blur(3px);
    }
    
    .rpg-abilities .ability-tag {
        position: relative;
        overflow: hidden;
    }
    
    .rpg-abilities .ability-tag::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0,255,170,0.2), transparent);
        transition: all 0.6s;
    }
    
    .rpg-abilities .ability-tag:hover::after {
        left: 100%;
    }
`;

document.head.appendChild(styleElement);

export default Projects;


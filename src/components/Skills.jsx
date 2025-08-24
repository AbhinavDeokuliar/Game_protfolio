import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RetroFrame from "./RetroFrame";
import { motion, AnimatePresence } from "framer-motion";
import PixelCanvas from "./PixelCanvas";
import { pixelSprites } from "../utils/pixelSprites";

// Skill categories with levels and descriptions
const skillCategories = {
    "Languages": [
        { name: "C", level: 7, desc: "Core programming fundamentals" },
        { name: "C++", level: 7, desc: "Object-oriented programming" },
        { name: "Java", level: 7, desc: "Cross-platform application development" },
        { name: "Python", level: 8, desc: "Data visualization and automation" }
    ],
    "Web Dev": [
        { name: "JavaScript", level: 8, desc: "Dynamic web application development" },
        { name: "HTML/CSS", level: 8, desc: "Frontend structure and styling" },
        { name: "React", level: 8, desc: "Component-based UI development" },
        { name: "Responsive Design", level: 7, desc: "Adaptable interfaces for all devices" }
    ],
    "Backend": [
        { name: "Node.js", level: 7, desc: "Server-side JavaScript runtime" },
        { name: "Express", level: 7, desc: "Web application framework" },
        { name: "MongoDB", level: 7, desc: "NoSQL database management" },
        { name: "RESTful APIs", level: 7, desc: "API design and implementation" }
    ],
    "Tools": [
        { name: "Git", level: 7, desc: "Version control and collaboration" },
        { name: "GitHub", level: 7, desc: "Project management and code hosting" },
        { name: "VS Code", level: 8, desc: "Code editor and development environment" },
        { name: "Postman", level: 6, desc: "API testing and documentation" }
    ],
    "Blockchain": [
        { name: "Solidity", level: 6, desc: "Smart contract development" },
        { name: "Ethereum", level: 6, desc: "Blockchain platform implementation" },
        { name: "Smart Contracts", level: 6, desc: "Self-executing contracts with code" },
        { name: "Hostinger VPS", level: 6, desc: "Virtual private server deployment" }
    ]
};

// Add RPG class information for categories
const skillClassInfo = {
    "Languages": {
        icon: "🧙‍♂️", // Wizard/Mage icon
        class: "Programmer",
        level: 24,
        mastery: 78, // Percentage of mastery
        color: "#9c5fff"
    },
    "Web Dev": {
        icon: "🧝‍♂️", // Elf/Archer icon
        class: "Web Wizard",
        level: 29,
        mastery: 85,
        color: "#00ccff"
    },
    "Backend": {
        icon: "🛡️", // Tank/Shield icon
        class: "System Architect",
        level: 22,
        mastery: 75,
        color: "#00ffaa"
    },
    "Tools": {
        icon: "🧰", // Craftsman icon
        class: "Technician",
        level: 26,
        mastery: 83,
        color: "#ffcc00"
    },
    "Blockchain": {
        icon: "⛓️", // Chain icon
        class: "Crypto Mage",
        level: 18,
        mastery: 65,
        color: "#ff6b6b"
    }
};

// Add skill-specific icon mapping
const skillIconMap = {
    // Languages
    "C": "🧠",
    "C++": "⚙️",
    "Java": "☕",
    "Python": "🐍",

    // Web Dev
    "JavaScript": "📜",
    "HTML/CSS": "🎨",
    "React": "⚛️",
    "Responsive Design": "📱",

    // Backend
    "Node.js": "🟢",
    "Express": "🚂",
    "MongoDB": "🍃",
    "RESTful APIs": "🔌",

    // Tools
    "Git": "🔀",
    "GitHub": "🐙",
    "VS Code": "📝",
    "Postman": "📬",

    // Blockchain
    "Solidity": "📊",
    "Ethereum": "💎",
    "Smart Contracts": "📜",
    "Hostinger VPS": "🖥️"
};

const Skills = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Languages");
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Ensure component is properly mounted
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Calculate star rating based on level (1-10)
    const getStars = (level) => {
        const fullStars = Math.floor(level / 2);
        const halfStar = level % 2 === 1;
        return { fullStars, halfStar };
    };

    // Add animation state for category hover
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Add state for detailed view and selected skill
    const [activeSkill, setActiveSkill] = useState(null);
    const [showDetailView, setShowDetailView] = useState(false);

    // Handle skill selection
    const handleSkillSelect = (skill) => {
        setActiveSkill(skill);
        setShowDetailView(true);
    };

    // Close detail view
    const closeDetailView = () => {
        setShowDetailView(false);
        setTimeout(() => setActiveSkill(null), 300); // Wait for animation to complete
    };

    // Add navigation handler
    const handleNavigation = useCallback((path) => {
        // Short animation duration to prevent blank page
        const animationDuration = 200;

        // Use setTimeout to allow animation to play before navigating
        setTimeout(() => {
            navigate(path);
        }, animationDuration);
    }, [navigate]);

    return (
        <AnimatePresence mode="wait">
            {mounted && (
                <motion.section
                    id="skills"
                    className="py-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key="skills-section"
                >
                    <div className="max-w-6xl mx-auto w-[95%]">
                        {/* Inventory header */}
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 mr-3">
                                <PixelCanvas
                                    width={32}
                                    height={32}
                                    sprite={pixelSprites.items.key}
                                    animate={false}
                                    scale={1.5}
                                />
                            </div>
                            <h3 className="font-[var(--font-pixel)] text-xl">SKILL TREE & ABILITIES</h3>
                        </div>

                        <RetroFrame className="bg-[var(--color-panel)] relative">
                            {/* Game UI inventory style */}
                            <div className="grid grid-cols-12 border-b border-[#304060]">
                                {/* Enhanced RPG-style left sidebar - categories */}
                                <div className="col-span-4 md:col-span-3 border-r border-[#304060] bg-[#0a1525]">
                                    <div className="p-4 font-[var(--font-pixel)] text-xs text-[var(--color-secondary)] mb-1 border-b border-[#304060] flex justify-between items-center">
                                        <span>CHARACTER CLASSES</span>
                                        <motion.div
                                            className="w-2 h-2 bg-[var(--color-primary)]"
                                            animate={{ opacity: [1, 0.4, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        ></motion.div>
                                    </div>

                                    {/* RPG class selection */}
                                    <div className="py-2">
                                        {Object.keys(skillCategories).map((cat) => {
                                            const classInfo = skillClassInfo[cat];
                                            const isSelected = selectedCategory === cat;
                                            const isHovered = hoveredCategory === cat;

                                            return (
                                                <motion.div
                                                    key={cat}
                                                    className={`relative py-4 px-3 cursor-pointer border-b border-[#1c2c45] ${isSelected ? 'bg-gradient-to-r from-[#102040] to-[#0a1525]' : ''
                                                        }`}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    onMouseEnter={() => setHoveredCategory(cat)}
                                                    onMouseLeave={() => setHoveredCategory(null)}
                                                    whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.05)" }}
                                                >
                                                    {/* Selection indicator */}
                                                    {isSelected && (
                                                        <motion.div
                                                            className="absolute left-0 top-0 bottom-0 w-1"
                                                            style={{ backgroundColor: classInfo.color }}
                                                            layoutId="categoryIndicator"
                                                        />
                                                    )}

                                                    <div className="flex items-center mb-2">
                                                        {/* Class icon in circular frame */}
                                                        <div
                                                            className="w-8 h-8 rounded-full mr-3 grid place-items-center"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${classInfo.color}88, #102040)`,
                                                                boxShadow: isSelected ? `0 0 8px ${classInfo.color}88` : 'none',
                                                                border: `1px solid ${isSelected ? classInfo.color : '#304060'}`
                                                            }}
                                                        >
                                                            <motion.span
                                                                className="text-lg"
                                                                animate={isSelected ? {
                                                                    scale: [1, 1.2, 1],
                                                                    rotate: [0, 5, -5, 0]
                                                                } : {}}
                                                                transition={{
                                                                    repeat: isSelected ? Infinity : 0,
                                                                    duration: 2
                                                                }}
                                                            >
                                                                {classInfo.icon}
                                                            </motion.span>
                                                        </div>

                                                        <div>
                                                            <h5 className={`font-[var(--font-pixel)] text-sm ${isSelected ? 'text-[var(--color-primary)]' : ''
                                                                }`}>
                                                                {cat}
                                                            </h5>
                                                            <p className="text-xs opacity-70">{classInfo.class}</p>
                                                        </div>
                                                    </div>

                                                    {/* Class level and mastery bar */}
                                                    <div className="ml-11 text-xs">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="opacity-70">LV.{classInfo.level}</span>
                                                            <span className="text-[var(--color-secondary)]">{classInfo.mastery}%</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-[#0c1526] pixel-border-sm overflow-hidden">
                                                            <motion.div
                                                                className="h-full"
                                                                style={{
                                                                    backgroundColor: classInfo.color,
                                                                    width: `${isHovered || isSelected ? classInfo.mastery : 0}%`
                                                                }}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${isHovered || isSelected ? classInfo.mastery : 0}%` }}
                                                                transition={{ duration: 0.5 }}
                                                            />
                                                        </div>

                                                        {/* Skill count badge */}
                                                        <div className="flex justify-end mt-1">
                                                            <span
                                                                className="text-[0.6rem] px-1 inline-flex items-center justify-center"
                                                                style={{
                                                                    color: isSelected ? classInfo.color : 'white',
                                                                    border: `1px solid ${isSelected ? classInfo.color : '#304060'}`
                                                                }}
                                                            >
                                                                {skillCategories[cat].length} SKILLS
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Glowing effect when selected */}
                                                    {
                                                        isSelected && (
                                                            <motion.div
                                                                className="absolute inset-0 pointer-events-none"
                                                                style={{
                                                                    background: `radial-gradient(circle at center, ${classInfo.color}22 0%, transparent 70%)`,
                                                                }}
                                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                transition={{ repeat: Infinity, duration: 2 }}
                                                            />
                                                        )
                                                    }
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Character level summary */}
                                    <div className="p-3 border-t border-[#304060] mt-2">
                                        <div className="font-[var(--font-terminal)] text-xs flex justify-between mb-1">
                                            <span className="text-[var(--color-secondary)]">OVERALL LV.</span>
                                            <span>25</span>
                                        </div>
                                        <div className="h-2 w-full bg-[#0c1526] pixel-border-sm overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00ccff]"
                                                style={{ width: '75%' }}
                                                initial={{ width: 0 }}
                                                animate={{ width: '75%' }}
                                                transition={{ duration: 1.2, delay: 0.3 }}
                                            />
                                        </div>
                                        <div className="text-center mt-2 text-xs opacity-70">
                                            <span>7500 / 10000 XP</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Simplified Main Content - Skills Grid */}
                                <div className="col-span-8 md:col-span-9 p-4">
                                    {/* Simplified header */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <span
                                                    className="text-lg mr-2"
                                                    style={{ color: skillClassInfo[selectedCategory].color }}
                                                >
                                                    {skillClassInfo[selectedCategory].icon}
                                                </span>
                                                <h4 className="text-[var(--color-primary)] font-[var(--font-pixel)]">
                                                    {selectedCategory} ABILITIES
                                                </h4>
                                            </div>
                                            <div className="hidden md:flex text-xs font-[var(--font-terminal)] items-center">
                                                <span className="mr-1">POINTS:</span>
                                                <span className="text-[var(--color-primary)]">3</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Simplified skill grid with better interactivity */}
                                    <motion.div
                                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {skillCategories[selectedCategory].map((skill, i) => {
                                            // Calculate if skill is "equipped" (for demo purposes)
                                            const isEquipped = skill.level > 6;

                                            return (
                                                <motion.div
                                                    key={skill.name}
                                                    className={`cursor-pointer ${isEquipped ? 'border-[var(--color-primary)]' : 'border-[#304060]'} border bg-[#0c1526] relative overflow-hidden`}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow: `0 0 10px 1px ${skillClassInfo[selectedCategory].color}33`
                                                    }}
                                                    onClick={() => handleSkillSelect(skill)}
                                                    onMouseEnter={() => setHoveredSkill(skill)}
                                                    onMouseLeave={() => setHoveredSkill(null)}
                                                >
                                                    {/* Skill icon and level */}
                                                    <div className="p-3 text-center">
                                                        <div
                                                            className="w-12 h-12 mx-auto grid place-items-center border border-[#304060] mb-2"
                                                            style={{
                                                                backgroundColor: '#0a1525',
                                                                boxShadow: isEquipped ? `0 0 6px ${skillClassInfo[selectedCategory].color}66` : 'none'
                                                            }}
                                                        >
                                                            {/* Use skill-specific icon if available, otherwise fall back to category icon */}
                                                            {skillIconMap[skill.name] ? (
                                                                <span className="text-2xl">{skillIconMap[skill.name]}</span>
                                                            ) : (
                                                                <PixelCanvas
                                                                    width={24}
                                                                    height={24}
                                                                    sprite={
                                                                        selectedCategory === "Languages" ? pixelSprites.items.sword :
                                                                            selectedCategory === "Web Dev" ? pixelSprites.items.shield :
                                                                                selectedCategory === "Backend" ? pixelSprites.items.key :
                                                                                    selectedCategory === "Tools" ? pixelSprites.items.potion :
                                                                                        selectedCategory === "Blockchain" ? pixelSprites.items.book :
                                                                                            pixelSprites.items.book
                                                                    }
                                                                    scale={1}
                                                                />
                                                            )}
                                                        </div>

                                                        <h5 className="font-[var(--font-pixel)] text-sm truncate px-1">
                                                            {skill.name}
                                                        </h5>

                                                        {/* Simple level indicator */}
                                                        <div className="flex justify-center items-center mt-1">
                                                            <span className="text-xs mr-1 opacity-70">LV.</span>
                                                            <span className="text-xs font-[var(--font-pixel)] text-[var(--color-secondary)]">{skill.level}</span>
                                                        </div>
                                                    </div>

                                                    {/* Simple progress bar */}
                                                    <div className="h-1 w-full bg-[#102040]">
                                                        <motion.div
                                                            className="h-full"
                                                            style={{
                                                                width: `${skill.level * 10}%`,
                                                                background: `linear-gradient(90deg, ${skillClassInfo[selectedCategory].color}, ${skillClassInfo[selectedCategory].color}88)`
                                                            }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${skill.level * 10}%` }}
                                                            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                                                        ></motion.div>
                                                    </div>

                                                    {/* Equipped indicator */}
                                                    {isEquipped && (
                                                        <motion.div
                                                            className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center"
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                        >
                                                            <span className="text-[0.5rem] text-[#0c1526]">✓</span>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>

                                    {/* Interactive skill info panel - shows when hovering */}
                                    {hoveredSkill && !showDetailView && (
                                        <motion.div
                                            className="mt-4 p-3 bg-[#0a1525] border border-[#304060]"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-[var(--font-pixel)] text-[var(--color-primary)]">{hoveredSkill.name}</h4>
                                                    <p className="text-xs mt-1 opacity-80">{hoveredSkill.desc}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-[var(--color-secondary)]">Mastery: {hoveredSkill.level * 10}%</div>
                                                    <div className="flex mt-1">
                                                        {[...Array(5)].map((_, starIdx) => {
                                                            const { fullStars, halfStar } = getStars(hoveredSkill.level);
                                                            let starType = "☆";
                                                            let starClass = "opacity-40";

                                                            if (starIdx < fullStars) {
                                                                starType = "★";
                                                                starClass = "text-yellow-400";
                                                            } else if (starIdx === fullStars && halfStar) {
                                                                starType = "⯪";
                                                                starClass = "text-yellow-400";
                                                            }

                                                            return (
                                                                <span key={starIdx} className={`text-xs ${starClass}`}>{starType}</span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs mt-2 text-center font-[var(--font-terminal)] opacity-70">
                                                Click to view details
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Enhanced Certifications panel */}
                            <motion.div
                                className="border-t border-[#304060] mt-4 pt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <div className="flex items-center justify-between px-4 mb-4">
                                    <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)]">
                                        ACHIEVEMENTS & CERTIFICATIONS
                                    </h4>
                                    <div className="flex items-center bg-[#0c1526] p-1 border border-[#304060] text-xs">
                                        <span className="text-[var(--color-secondary)] mr-2">COMPLETED:</span>
                                        <span className="text-[var(--color-primary)]">4/10</span>
                                    </div>
                                </div>

                                {/* Achievement grid with improved cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                                    {/* Achievement 1 */}
                                    <motion.div
                                        className="border border-[#304060] bg-[#0c1526] cursor-pointer overflow-hidden"
                                        whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.05)", scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Achievement header with progress bar */}
                                        <div className="relative">
                                            <div className="bg-gradient-to-r from-yellow-600 to-amber-800 h-1.5">
                                                <motion.div
                                                    className="h-full bg-yellow-400"
                                                    style={{ width: '100%' }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 1 }}
                                                ></motion.div>
                                            </div>
                                            <div className="flex justify-between items-start p-3">
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="text-2xl mr-3 bg-yellow-500/20 w-12 h-12 rounded-lg grid place-items-center"
                                                        animate={{ scale: [1, 1.05, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                                                    >
                                                        <span className="text-yellow-400">🏆</span>
                                                    </motion.div>
                                                    <div>
                                                        <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)] text-sm">Blockchain Technology</h5>
                                                        <p className="text-xs opacity-70">METACRAFTERS</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 text-xs border border-yellow-500/30"
                                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        RARE
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievement body */}
                                        <div className="px-3 pb-3">
                                            <div className="flex gap-2 mt-2 mb-1">
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-yellow-500">
                                                    <span className="text-yellow-500 mr-1">+10</span>
                                                    <span>Blockchain</span>
                                                </div>
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-blue-400">
                                                    <span className="text-blue-400 mr-1">+5</span>
                                                    <span>Coding</span>
                                                </div>
                                            </div>

                                            {/* Date & completion */}
                                            <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-[#304060]/50">
                                                <div className="text-[var(--color-secondary)]">
                                                    Completed: <span className="opacity-70">May 2023</span>
                                                </div>
                                                <div className="text-green-400 flex items-center">
                                                    <span className="mr-1">✓</span> VERIFIED
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Achievement 2 */}
                                    <motion.div
                                        className="border border-[#304060] bg-[#0c1526] cursor-pointer overflow-hidden"
                                        whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.05)", scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Achievement header with progress bar */}
                                        <div className="relative">
                                            <div className="bg-gradient-to-r from-blue-600 to-indigo-800 h-1.5">
                                                <motion.div
                                                    className="h-full bg-blue-400"
                                                    style={{ width: '100%' }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 1, delay: 0.1 }}
                                                ></motion.div>
                                            </div>
                                            <div className="flex justify-between items-start p-3">
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="text-2xl mr-3 bg-blue-500/20 w-12 h-12 rounded-lg grid place-items-center"
                                                        animate={{ scale: [1, 1.05, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                                                    >
                                                        <span className="text-blue-400">🤖</span>
                                                    </motion.div>
                                                    <div>
                                                        <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)] text-sm">AI Internship</h5>
                                                        <p className="text-xs opacity-70">Campalin</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 text-xs border border-blue-500/30"
                                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        EPIC
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievement body */}
                                        <div className="px-3 pb-3">
                                            <div className="flex gap-2 mt-2 mb-1">
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-blue-400">
                                                    <span className="text-blue-400 mr-1">+12</span>
                                                    <span>AI</span>
                                                </div>
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-purple-400">
                                                    <span className="text-purple-400 mr-1">+8</span>
                                                    <span>ML</span>
                                                </div>
                                            </div>

                                            {/* Date & completion */}
                                            <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-[#304060]/50">
                                                <div className="text-[var(--color-secondary)]">
                                                    Completed: <span className="opacity-70">Jan 2023</span>
                                                </div>
                                                <div className="text-green-400 flex items-center">
                                                    <span className="mr-1">✓</span> VERIFIED
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Achievement 3 */}
                                    <motion.div
                                        className="border border-[#304060] bg-[#0c1526] cursor-pointer overflow-hidden"
                                        whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.05)", scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Achievement header with progress bar */}
                                        <div className="relative">
                                            <div className="bg-gradient-to-r from-green-600 to-emerald-800 h-1.5">
                                                <motion.div
                                                    className="h-full bg-green-400"
                                                    style={{ width: '100%' }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                ></motion.div>
                                            </div>
                                            <div className="flex justify-between items-start p-3">
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="text-2xl mr-3 bg-green-500/20 w-12 h-12 rounded-lg grid place-items-center"
                                                        animate={{ scale: [1, 1.05, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                                                    >
                                                        <span className="text-green-400">☁️</span>
                                                    </motion.div>
                                                    <div>
                                                        <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)] text-sm">Cloud IoT Edge ML</h5>
                                                        <p className="text-xs opacity-70">NPTEL</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="bg-green-500/20 text-green-400 px-1.5 py-0.5 text-xs border border-green-500/30"
                                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        UNCOMMON
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievement body */}
                                        <div className="px-3 pb-3">
                                            <div className="flex gap-2 mt-2 mb-1">
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-green-400">
                                                    <span className="text-green-400 mr-1">+8</span>
                                                    <span>Cloud</span>
                                                </div>
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-cyan-400">
                                                    <span className="text-cyan-400 mr-1">+6</span>
                                                    <span>IoT</span>
                                                </div>
                                            </div>

                                            {/* Date & completion */}
                                            <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-[#304060]/50">
                                                <div className="text-[var(--color-secondary)]">
                                                    Completed: <span className="opacity-70">Dec 2022</span>
                                                </div>
                                                <div className="text-green-400 flex items-center">
                                                    <span className="mr-1">✓</span> VERIFIED
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Achievement 4 */}
                                    <motion.div
                                        className="border border-[#304060] bg-[#0c1526] cursor-pointer overflow-hidden"
                                        whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.05)", scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Achievement header with progress bar */}
                                        <div className="relative">
                                            <div className="bg-gradient-to-r from-cyan-600 to-teal-800 h-1.5">
                                                <motion.div
                                                    className="h-full bg-cyan-400"
                                                    style={{ width: '100%' }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                ></motion.div>
                                            </div>
                                            <div className="flex justify-between items-start p-3">
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="text-2xl mr-3 bg-cyan-500/20 w-12 h-12 rounded-lg grid place-items-center"
                                                        animate={{ scale: [1, 1.05, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                                                    >
                                                        <span className="text-cyan-400">🌐</span>
                                                    </motion.div>
                                                    <div>
                                                        <h5 className="text-[var(--color-primary)] font-[var(--font-pixel)] text-sm">Internet of Things</h5>
                                                        <p className="text-xs opacity-70">NPTEL</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 text-xs border border-cyan-500/30"
                                                        animate={{ opacity: [0.8, 1, 0.8] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        UNCOMMON
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievement body */}
                                        <div className="px-3 pb-3">
                                            <div className="flex gap-2 mt-2 mb-1">
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-cyan-400">
                                                    <span className="text-cyan-400 mr-1">+10</span>
                                                    <span>IoT</span>
                                                </div>
                                                <div className="flex-1 bg-[#102030] px-2 py-1 text-xs flex items-center justify-center border-l-2 border-purple-400">
                                                    <span className="text-purple-400 mr-1">+4</span>
                                                    <span>Design</span>
                                                </div>
                                            </div>

                                            {/* Date & completion */}
                                            <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-[#304060]/50">
                                                <div className="text-[var(--color-secondary)]">
                                                    Completed: <span className="opacity-70">Nov 2022</span>
                                                </div>
                                                <div className="text-green-400 flex items-center">
                                                    <span className="mr-1">✓</span> VERIFIED
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Locked achievement */}
                                    <motion.div
                                        className="border border-[#304060]/50 bg-[#0c1526]/80 cursor-not-allowed opacity-70 overflow-hidden"
                                        whileHover={{ opacity: 0.8 }}
                                    >
                                        <div className="p-4 text-center flex flex-col items-center justify-center h-full">
                                            <div className="mb-3 text-xl">🔒</div>
                                            <h5 className="text-[var(--color-secondary)] font-[var(--font-pixel)] text-sm mb-1">Achievement Locked</h5>
                                            <p className="text-xs opacity-70">Complete more quests to unlock</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Achievement summary footer */}
                                <div className="mt-6 px-4 flex justify-between items-center text-xs">
                                    <div className="flex items-center">
                                        <span className="text-[var(--color-secondary)] mr-2">TOTAL XP FROM ACHIEVEMENTS:</span>
                                        <span className="bg-[#102030] px-2 py-1 text-[var(--color-primary)]">+53 SKILL POINTS</span>
                                    </div>
                                    <motion.button
                                        className="border border-[#304060] px-3 py-1 flex items-center"
                                        whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.1)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        VIEW ALL
                                        <span className="ml-1">→</span>
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Simplified bottom info panel */}
                            <div className="p-3 text-xs mt-4 bg-[#0c1526] flex justify-between items-center">
                                <div>
                                    <span className="text-[var(--color-secondary)] font-[var(--font-terminal)]">TOTAL SKILLS:</span>
                                    <span className="ml-2">{Object.values(skillCategories).flat().length}</span>
                                </div>
                                <div className="font-[var(--font-terminal)] opacity-70">
                                    [TAB] SWITCH CATEGORY • [E] SELECT • [ESC] CLOSE
                                </div>
                            </div>

                            {/* Navigation buttons - NEW */}
                            <div className="px-4 py-5 flex justify-between">
                                <motion.button
                                    onClick={() => handleNavigation('/')}
                                    className="flex items-center px-4 py-2 bg-[#0c1526] border border-[#304060] text-sm font-[var(--font-pixel)]"
                                    whileHover={{
                                        scale: 1.03,
                                        backgroundColor: "rgba(0, 255, 170, 0.05)",
                                        boxShadow: "0 0 8px rgba(0, 255, 170, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="mr-2">◀</span>
                                    RETURN TO VILLAGE
                                </motion.button>

                                <motion.button
                                    onClick={() => handleNavigation('/projects')}
                                    className="flex items-center px-4 py-2 bg-[#0c1526] border border-[#304060] text-sm font-[var(--font-pixel)] text-[var(--color-primary)]"
                                    whileHover={{
                                        scale: 1.03,
                                        backgroundColor: "rgba(0, 255, 170, 0.1)",
                                        boxShadow: "0 0 8px rgba(0, 255, 170, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    VIEW QUESTS
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >▶</motion.span>
                                </motion.button>
                            </div>

                            {/* Detailed skill view - appears when a skill is selected */}
                            <AnimatePresence>
                                {showDetailView && activeSkill && (
                                    <motion.div
                                        className="absolute inset-0 bg-[#0a1525]/95 backdrop-blur-sm z-10 p-6 flex flex-col"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Close button */}
                                        <motion.button
                                            className="absolute top-4 right-4 w-8 h-8 grid place-items-center border border-[#304060]"
                                            onClick={closeDetailView}
                                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-xs">×</span>
                                        </motion.button>

                                        {/* Skill detail header */}
                                        <div className="flex items-center mb-4">
                                            <div
                                                className="w-12 h-12 grid place-items-center border border-[#304060] mr-4"
                                                style={{
                                                    backgroundColor: '#0a1525',
                                                    boxShadow: `0 0 10px ${skillClassInfo[selectedCategory].color}66`
                                                }}
                                            >
                                                {/* Use skill-specific icon in the detail view too */}
                                                {skillIconMap[activeSkill.name] ? (
                                                    <span className="text-2xl">{skillIconMap[activeSkill.name]}</span>
                                                ) : (
                                                    <PixelCanvas
                                                        width={24}
                                                        height={24}
                                                        sprite={
                                                            selectedCategory === "Languages" ? pixelSprites.items.sword :
                                                                selectedCategory === "Web Dev" ? pixelSprites.items.shield :
                                                                    selectedCategory === "Backend" ? pixelSprites.items.key :
                                                                        selectedCategory === "Tools" ? pixelSprites.items.potion :
                                                                            selectedCategory === "Blockchain" ? pixelSprites.items.book :
                                                                                pixelSprites.items.book
                                                        }
                                                        scale={1}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-[var(--font-pixel)] text-[var(--color-primary)]">
                                                    {activeSkill.name}
                                                </h3>
                                                <div className="flex items-center text-xs">
                                                    <span className="text-[var(--color-secondary)] mr-2">{selectedCategory}</span>
                                                    <span className="opacity-60">•</span>
                                                    <span className="ml-2">Level {activeSkill.level}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skill detail content */}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Left column */}
                                            <div>
                                                <div className="bg-[#0c1526] p-4 border border-[#304060] mb-4">
                                                    <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-2">DESCRIPTION</h4>
                                                    <p className="text-sm">{activeSkill.desc}</p>
                                                </div>

                                                <div className="bg-[#0c1526] p-4 border border-[#304060]">
                                                    <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-2">MASTERY</h4>

                                                    {/* Detailed level meter */}
                                                    <div className="mb-3">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span>Progress</span>
                                                            <span>{activeSkill.level * 10}%</span>
                                                        </div>
                                                        <div className="w-full h-4 bg-[#0a1525] pixel-border-sm relative">
                                                            <motion.div
                                                                className="h-full"
                                                                style={{
                                                                    width: `${activeSkill.level * 10}%`,
                                                                    background: `linear-gradient(90deg, ${skillClassInfo[selectedCategory].color}, ${skillClassInfo[selectedCategory].color}88)`
                                                                }}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${activeSkill.level * 10}%` }}
                                                                transition={{ duration: 0.8 }}
                                                            ></motion.div>

                                                            {/* Level markers */}
                                                            {[...Array(11)].map((_, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="absolute top-full h-1 border-l border-[#304060]"
                                                                    style={{ left: `${idx * 10}%` }}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-between text-[0.6rem] mt-2 opacity-60">
                                                            <span>Beginner</span>
                                                            <span>Intermediate</span>
                                                            <span>Expert</span>
                                                        </div>
                                                    </div>

                                                    {/* Star rating */}
                                                    <div className="flex items-center justify-center mt-4">
                                                        {[...Array(5)].map((_, starIdx) => {
                                                            const { fullStars, halfStar } = getStars(activeSkill.level);
                                                            let starType = "☆";
                                                            let starClass = "opacity-40";

                                                            if (starIdx < fullStars) {
                                                                starType = "★";
                                                                starClass = "text-yellow-400";
                                                            } else if (starIdx === fullStars && halfStar) {
                                                                starType = "⯪";
                                                                starClass = "text-yellow-400";
                                                            }

                                                            return (
                                                                <motion.span
                                                                    key={starIdx}
                                                                    className={`text-xl ${starClass} mx-1`}
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{
                                                                        delay: 0.3 + (starIdx * 0.1),
                                                                        duration: 0.5
                                                                    }}
                                                                >
                                                                    {starType}
                                                                </motion.span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right column */}
                                            <div>
                                                <div className="bg-[#0c1526] p-4 border border-[#304060] mb-4">
                                                    <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-2">ABILITIES</h4>

                                                    {/* List of abilities based on level */}
                                                    {[
                                                        { level: 2, name: "Basic Usage" },
                                                        { level: 4, name: "Intermediate Application" },
                                                        { level: 6, name: "Advanced Implementation" },
                                                        { level: 8, name: "Expert Optimization" },
                                                        { level: 10, name: "Master Level Proficiency" }
                                                    ].map((ability, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center py-1 ${activeSkill.level >= ability.level ? '' : 'opacity-40'}`}
                                                        >
                                                            <div
                                                                className={`w-4 h-4 mr-2 border ${activeSkill.level >= ability.level ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'border-[#304060]'}`}
                                                            >
                                                                {activeSkill.level >= ability.level && <span className="text-[0.6rem] text-[#0c1526]">✓</span>}
                                                            </div>
                                                            <span className="text-sm">{ability.name}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="bg-[#0c1526] p-4 border border-[#304060] flex flex-col justify-between">
                                                    <h4 className="text-sm font-[var(--font-pixel)] text-[var(--color-secondary)] mb-2">ACTIONS</h4>

                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        <motion.button
                                                            className="px-3 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm flex-1"
                                                            whileHover={{ backgroundColor: "rgba(0, 255, 170, 0.1)" }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {activeSkill.level > 6 ? "EQUIPPED" : "EQUIP"}
                                                        </motion.button>

                                                        <motion.button
                                                            className="px-3 py-2 border border-[#304060] text-sm"
                                                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                                            whileTap={{ scale: 0.98 }}
                                                            disabled={activeSkill.level >= 10}
                                                        >
                                                            LEVEL UP
                                                        </motion.button>
                                                    </div>

                                                    <div className="text-center mt-4 text-xs opacity-60">
                                                        {activeSkill.level >= 10 ? "Maximum level reached" : `${10 - activeSkill.level} more levels to max mastery`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </RetroFrame>
                    </div>
                </motion.section >
            )}
        </AnimatePresence >
    );
};

export default Skills;

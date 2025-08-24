import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RetroFrame from "./RetroFrame";
import { motion } from "framer-motion";

const Contact = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    // Updated navigation handler with error handling
    const handleNavigation = useCallback((path) => {
        try {
            // Short animation duration to prevent blank page
            const animationDuration = 200;

            // Use setTimeout to allow animation to play before navigating
            setTimeout(() => {
                navigate(path);
            }, animationDuration);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback direct navigation
            window.location.href = path;
        }
    }, [navigate]);

    // Contact data items with proper formatting
    const contactItems = [
        { icon: "✉️", label: "Email", value: "deokuliarav@gmail.com", href: "mailto:deokuliarav@gmail.com" },
        { icon: "🔗", label: "LinkedIn", value: "/in/abhinav-deokuliar-123a542aa", href: "https://www.linkedin.com/in/abhinav-deokuliar-123a542aa" },
        { icon: "⚔️", label: "GitHub", value: "github.com/AbhinavDeokuliar", href: "https://github.com/AbhinavDeokuliar" },
        { icon: "🏰", label: "Base", value: "Patna, Bihar" }
    ];

    return (
        <motion.section
            id="contact"
            className="py-16 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
        >
            <div className="max-w-6xl mx-auto w-[95%]">
                <h3 className="mb-4 font-[var(--font-pixel)] text-xl flex items-center">
                    <span className="inline-block mr-2 text-2xl">📜</span> QUEST LOG: CONTACT
                </h3>
                <RetroFrame className="p-6 bg-[var(--color-panel)] relative overflow-hidden">
                    {/* Pixel art decorative elements */}
                    <div className="absolute top-2 right-2 text-xl">🔮</div>
                    <div className="absolute bottom-2 left-2 text-xl">🗡️</div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Left column - Contact info */}
                        <div className="space-y-4 relative">
                            <h4 className="font-[var(--font-pixel)] text-[var(--color-primary)] mb-4 border-b border-[var(--color-primary)] pb-2">
                                COMMUNICATION CHANNELS
                            </h4>

                            {contactItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-2 rounded-md transition-all duration-200 ${hoveredItem === index ? 'bg-[rgba(var(--color-primary-rgb),0.1)] scale-105' : ''}`}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    whileHover={{ x: 5 }}
                                >
                                    <p className="flex items-center flex-wrap">
                                        <span className="inline-block w-6 mr-2">{item.icon}</span>
                                        <span className="font-[var(--font-pixel)] text-sm mr-2">{item.label}:</span>
                                        {item.href ? (
                                            <a
                                                className="text-[var(--color-primary)] underline cursor-pointer hover:brightness-125"
                                                href={item.href}
                                                target={item.label !== "Email" ? "_blank" : undefined}
                                                rel={item.label !== "Email" ? "noreferrer" : undefined}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-[var(--color-primary)]">{item.value}</span>
                                        )}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right column - Quest Details */}
                        <div className="flex flex-col justify-between border-l-2 border-[rgba(var(--color-primary-rgb),0.3)] pl-6 md:pl-8">
                            <div>
                                <h4 className="font-[var(--font-pixel)] text-[var(--color-primary)] mb-4 border-b border-[var(--color-primary)] pb-2">
                                    QUEST DETAILS
                                </h4>
                                <div className="text-sm space-y-3 bg-[rgba(0,0,0,0.2)] p-3 rounded-md border border-[rgba(255,255,255,0.1)]">
                                    <p className="leading-relaxed">
                                        <span className="text-[var(--color-primary)]">Mission:</span> Seeking allies for epic web development and blockchain adventures!
                                    </p>
                                    <p className="leading-relaxed">
                                        <span className="text-[var(--color-primary)]">Reward:</span> Collaborative projects and mutual growth in the digital realm.
                                    </p>
                                </div>
                            </div>

                            {/* Navigation buttons to match Skills.jsx */}
                            <div className="mt-8 flex flex-wrap gap-3">
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
                        </div>
                    </motion.div>
                </RetroFrame>
            </div>
        </motion.section>
    );
};

export default Contact;

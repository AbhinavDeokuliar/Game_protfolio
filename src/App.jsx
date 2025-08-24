import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HUD from "./components/HUD";

// Sound effects (commented out to avoid autoplay issues)
// const audioStartup = new Audio('/sounds/startup.wav');
// const audioMenuSelect = new Audio('/sounds/select.wav');
// const audioMenuMove = new Audio('/sounds/move.wav');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gamepadPosition, setGamepadPosition] = useState(0);
  const [showPixelTransition, setShowPixelTransition] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Define sections with path mapping
  const sections = [
    { id: "home", path: "/", label: "START GAME" },
    { id: "about", path: "/about", label: "CHARACTER" },
    { id: "skills", path: "/skills", label: "INVENTORY" },
    { id: "projects", path: "/projects", label: "QUESTS" },
    { id: "contact", path: "/contact", label: "OPTIONS" },
  ];

  // Determine active section based on current route
  const getActiveSectionIndex = () => {
    const path = location.pathname;
    const index = sections.findIndex(section =>
      section.path === path ||
      (path === "/" && section.path === "/")
    );
    return index !== -1 ? index : 0;
  };

  const activeSection = getActiveSectionIndex();

  // Set gamepadPosition based on active section
  useEffect(() => {
    setGamepadPosition(activeSection);
  }, [activeSection]);

  // Handle page transition events from buttons
  useEffect(() => {
    const handlePageTransition = (e) => {
      setShowPixelTransition(true);

      // We don't need to navigate here - the component will do that
      setTimeout(() => {
        setShowPixelTransition(false);
      }, 800);
    };

    window.addEventListener('page-transition-start', handlePageTransition);
    return () => window.removeEventListener('page-transition-start', handlePageTransition);
  }, []);

  // Auto-start game if URL is not root
  useEffect(() => {
    if (location.pathname !== "/" && !gameStarted) {
      setGameStarted(true);
    }
  }, [location.pathname, gameStarted]);

  // Simulate initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // audioStartup.play();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Section change handler with transition effect
  const handleSectionChange = (index) => {
    if (index === activeSection) return;

    // Start pixel transition effect
    setShowPixelTransition(true);

    // After transition completes, change section
    setTimeout(() => {
      // Navigate to the new route
      navigate(sections[index].path);
      setMenuOpen(false);
      setShowPixelTransition(false);

      // Scroll to top when changing sections
      window.scrollTo(0, 0);
    }, 800);
  };

  // Keyboard navigation handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;

      if (e.key === 'ArrowDown' && gamepadPosition < sections.length - 1) {
        // audioMenuMove.play();
        setGamepadPosition(gamepadPosition + 1);
      }
      else if (e.key === 'ArrowUp' && gamepadPosition > 0) {
        // audioMenuMove.play();
        setGamepadPosition(gamepadPosition - 1);
      }
      else if (e.key === 'Enter' || e.key === ' ') {
        // audioMenuSelect.play();
        handleSectionChange(gamepadPosition);
      }
      else if (e.key === 'Escape') {
        setMenuOpen(!menuOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gamepadPosition, menuOpen]);

  return (
    <>
      <div className="noise"></div>
      <AnimatePresence mode="sync" initial={false}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[var(--color-bg)] z-50 flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              data-text="LOADING GAME..."
              className="glitch text-3xl md:text-4xl font-[var(--font-pixel)] mb-12 text-[var(--color-primary)]"
            >
              LOADING GAME...
            </motion.h1>

            <div className="w-48 h-4 bg-gray-800 pixel-border-sm mb-6 relative overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-primary)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              ></motion.div>
            </div>

            <motion.div
              className="text-sm font-[var(--font-terminal)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              INITIALIZING PORTFOLIO SYSTEM...
            </motion.div>
          </motion.div>
        ) : !gameStarted ? (
          // Title screen
          <motion.div
            key="title-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[var(--color-bg)] z-50 flex flex-col items-center justify-center"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-[var(--font-pixel)] mb-10 text-[var(--color-primary)]"
              animate={{
                textShadow: ["0 0 7px #00ffaa", "0 0 10px #00ffaa", "0 0 21px #00ffaa", "0 0 7px #00ffaa"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              PORTFOLIO.EXE
            </motion.h1>

            <motion.button
              className="btn-pixel text-xl px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0 0 0 2px #0a0f1e, 0 0 0 4px var(--color-primary)",
                  "0 0 0 2px #0a0f1e, 0 0 15px 4px var(--color-primary)",
                  "0 0 0 2px #0a0f1e, 0 0 0 4px var(--color-primary)"]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={() => setGameStarted(true)}
            >
              PRESS START
            </motion.button>

            <motion.p
              className="absolute bottom-10 text-xs opacity-70"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              © {new Date().getFullYear()} Abhinav Deokuliar
            </motion.p>
          </motion.div>
        ) : (
          <main className="min-h-full relative">
            <HUD
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              sections={sections}
              activeSection={activeSection}
              handleSectionChange={handleSectionChange}
            />

            {/* Retro game-style menu overlay */}
            <AnimatePresence mode="sync">
              {menuOpen && (
                <motion.div
                  className="fixed inset-0 z-40 flex items-start justify-center pt-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-black opacity-70"></div>

                  <motion.div
                    className="relative z-50 w-64 bg-[var(--color-panel)] border-2 border-[var(--color-secondary)] pixel-border"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="p-2 border-b-2 border-[var(--color-secondary)] font-[var(--font-pixel)] text-[var(--color-primary)] text-center">
                      GAME MENU
                    </div>

                    <div className="p-2">
                      {sections.map((section, idx) => (
                        <motion.div
                          key={section.id}
                          className={`flex items-center p-3 cursor-pointer relative ${gamepadPosition === idx ? 'bg-[rgba(0,255,170,0.2)]' : ''}`}
                          onClick={() => handleSectionChange(idx)}
                          whileHover={{ x: 3 }}
                          onMouseEnter={() => setGamepadPosition(idx)}
                        >

                          {/* Menu Icon */}
                          <span className={`mr-2 ${gamepadPosition === idx ? 'text-[var(--color-primary)]' : ''}`}>
                            {section.id === "home" && "🏠"}
                            {section.id === "about" && "👤"}
                            {section.id === "skills" && "🎒"}
                            {section.id === "projects" && "📜"}
                            {section.id === "contact" && "⚙️"}
                          </span>
                          <span className={`font-[var(--font-pixel)] text-sm ${gamepadPosition === idx ? 'text-[var(--color-primary)]' : ''}`}>
                            {section.label}
                          </span>

                          {/* Selected item highlights */}
                          {gamepadPosition === idx && (
                            <motion.span
                              className="absolute right-2 text-[var(--color-primary)]"
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              &gt;
                            </motion.span>
                          )}
                        </motion.div>
                      ))}

                      {/* Exit game option */}
                      <motion.div
                        className={`flex items-center p-3 cursor-pointer relative mt-4 border-t border-[var(--color-secondary)] ${gamepadPosition === sections.length ? 'bg-[rgba(0,255,170,0.2)]' : ''}`}
                        whileHover={{ x: 3 }}
                        onClick={() => {
                          // audioStartup.play();
                          setGameStarted(false);
                        }}
                        onMouseEnter={() => setGamepadPosition(sections.length)}
                      >

                        <span className={`font-[var(--font-pixel)] text-sm ${gamepadPosition === sections.length ? 'text-[var(--color-accent)]' : ''}`}>
                          EXIT GAME
                        </span>
                      </motion.div>
                    </div>

                    <div className="p-2 border-t border-[var(--color-secondary)] text-xs font-[var(--font-terminal)] opacity-70 text-center">
                      PRESS [ESC] TO CLOSE
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen transition effect */}
            {showPixelTransition && (
              <motion.div
                className="fixed inset-0 z-50 bg-[var(--color-bg)]"
                initial={{
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                }}
                animate={{
                  clipPath: [
                    "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                  ]
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="h-full w-full flex items-center justify-center">
                  <motion.div
                    className="w-6 h-6 bg-[var(--color-primary)]"
                    animate={{ rotate: 180, scale: [1, 20, 1] }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Active section with AnimatePresence */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

            {/* Game stats footer */}
            <footer className="py-10 border-t border-[var(--color-secondary)] bg-[var(--color-panel)] text-center relative overflow-hidden">
              <div className="max-w-6xl mx-auto w-[95%]">
                {/* Stats bar */}
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-4">
                  <div className="flex items-center">
                    <span className="text-xs text-[var(--color-secondary)] mr-2">HP:</span>
                    <div className="w-20 h-3 bg-gray-900 pixel-border-sm">
                      <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-[var(--color-secondary)] mr-2">MP:</span>
                    <div className="w-20 h-3 bg-gray-900 pixel-border-sm">
                      <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-[var(--color-secondary)] mr-2">XP:</span>
                    <div className="w-20 h-3 bg-gray-900 pixel-border-sm">
                      <motion.div
                        className="h-full bg-yellow-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 3 }}
                      ></motion.div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-[var(--color-secondary)] mr-2">GOLD:</span>
                    <motion.span
                      className="flex items-center"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="mr-1">128</span>
                      <span className="text-yellow-400">🪙</span>
                    </motion.span>
                  </div>
                </div>

                <p className="text-xs opacity-70">
                  © {new Date().getFullYear()} Abhinav Deokuliar
                </p>

                {/* Controller hints */}
                <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs font-[var(--font-terminal)]">
                  <div className="flex items-center">
                    <span className="bg-gray-800 px-1 mr-1 border border-gray-700">[ESC]</span>
                    <span>Menu</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-800 px-1 mr-1 border border-gray-700">[↑]</span>
                    <span className="bg-gray-800 px-1 mr-1 border border-gray-700">[↓]</span>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-800 px-1 mr-1 border border-gray-700">[Enter]</span>
                    <span>Select</span>
                  </div>
                </div>
              </div>

              {/* Pixelated corners */}
              <div className="absolute top-0 left-0 w-4 h-4 bg-[var(--color-secondary)] opacity-30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-secondary)] opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-[var(--color-secondary)] opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--color-secondary)] opacity-30"></div>
            </footer>
          </main>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
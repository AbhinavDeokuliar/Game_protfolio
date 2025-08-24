import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook to enable smooth navigation between pages
 * @returns {Function} navigate - Function to navigate between pages with transition effects
 */
export const useRetroNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Enhanced navigation with transition effects
    const retroNavigate = (path, options = {}) => {
        // Don't navigate if we're already on this path
        if (path === location.pathname) return;

        // Create navigation state
        const navigationState = {
            source: 'user-action',
            timestamp: Date.now(),
            previousPath: location.pathname,
            ...options.state
        };

        // Dispatch transition event
        try {
            const transitionEvent = new CustomEvent('page-transition-start', {
                detail: { path, navigationState }
            });
            window.dispatchEvent(transitionEvent);

            // Add transition class to body for global effects
            document.body.classList.add('navigating');

            // Navigate after animation delay
            setTimeout(() => {
                navigate(path, {
                    ...options,
                    state: navigationState
                });

                // Remove transition class after navigation
                setTimeout(() => {
                    document.body.classList.remove('navigating');
                }, 100);
            }, 300);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback navigation
            navigate(path, options);
        }
    };

    return retroNavigate;
};

/**
 * Component to handle global navigation effects
 */
const NavigationHandler = () => {
    const location = useLocation();

    // Set up global navigation listeners
    useEffect(() => {
        // Reset scroll position on navigation
        window.scrollTo(0, 0);

        // Handle back/forward navigation
        const handlePopState = () => {
            const transitionEvent = new CustomEvent('page-transition-start', {
                detail: { path: location.pathname, navigationState: { source: 'popstate' } }
            });
            window.dispatchEvent(transitionEvent);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [location.pathname]);

    return null; // This is a utility component with no UI
};

export default NavigationHandler;

/**
 * Utility functions for page navigation and transitions
 */

// Debounced navigation handler
let isTransitioning = false;
let pendingNavigation = null;

/**
 * Handle navigation with debouncing to prevent rapid multiple transitions
 *
 * @param {string} path - The path to navigate to
 * @param {Object} state - State to pass to the navigation
 * @param {Object} options - Additional options
 * @returns {boolean} - Whether the navigation was initiated
 */
export const handleSafeNavigation = (path, state = {}, options = {}) => {
	if (isTransitioning) {
		// Store this as pending if we want to queue navigations
		if (options.queue) {
			pendingNavigation = { path, state };
		}
		return false;
	}

	isTransitioning = true;

	// Create navigation state
	const navigationState = {
		source: state.source || "user-action",
		timestamp: Date.now(),
		...state,
	};

	// Trigger transition animation
	const transitionEvent = new CustomEvent("page-transition-start", {
		detail: { path, navigationState },
	});
	window.dispatchEvent(transitionEvent);

	// Reset transitioning state after delay
	setTimeout(() => {
		isTransitioning = false;

		// Process any pending navigation
		if (pendingNavigation) {
			const { path: pendingPath, state: pendingState } = pendingNavigation;
			pendingNavigation = null;
			handleSafeNavigation(pendingPath, pendingState);
		}
	}, options.timeout || 800);

	return true;
};

/**
 * Register global transition listeners
 *
 * @param {Function} onStart - Called when transition starts
 * @param {Function} onComplete - Called when transition completes
 */
export const registerTransitionListeners = (onStart, onComplete) => {
	const handleTransitionStart = (e) => {
		if (onStart) onStart(e.detail);
	};

	const handleTransitionComplete = () => {
		if (onComplete) onComplete();
	};

	window.addEventListener("page-transition-start", handleTransitionStart);
	window.addEventListener(
		"page-transition-complete",
		handleTransitionComplete
	);

	return () => {
		window.removeEventListener(
			"page-transition-start",
			handleTransitionStart
		);
		window.removeEventListener(
			"page-transition-complete",
			handleTransitionComplete
		);
	};
};

/**
 * Preload assets for a route to ensure smoother transitions
 *
 * @param {string} path - The route path to preload
 */
export const preloadRoute = (path) => {
	// This could be expanded to preload specific assets for each route
	// For now it's a placeholder for future enhancement
	console.log(`Preloading route: ${path}`);
};

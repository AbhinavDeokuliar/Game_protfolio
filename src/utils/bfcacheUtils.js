/**
 * Utility functions for handling back/forward cache (bfcache)
 */

// Check if current page load is from bfcache
export const isFromBfCache = (event) => {
	return event.persisted;
};

// Register a listener for pageshow events to detect bfcache restoration
export const registerBfCacheHandler = (callback) => {
	const handler = (event) => {
		if (isFromBfCache(event)) {
			callback(event);
		}
	};

	window.addEventListener("pageshow", handler);
	return () => window.removeEventListener("pageshow", handler);
};

// Create state object for navigation with appropriate metadata
export const createNavigationState = (options = {}) => {
	return {
		source: options.source || "user-action",
		timestamp: Date.now(),
		...options,
	};
};

// Navigation handler with bfcache support
export const handleNavigation = (navigate, path, options = {}) => {
	const state = createNavigationState(options);

	// Trigger transition animation
	const transitionEvent = new CustomEvent("page-transition-start", {
		detail: { path, state },
	});
	window.dispatchEvent(transitionEvent);

	// Use setTimeout to allow animation to start before navigating
	setTimeout(() => {
		navigate(path, { state });
	}, options.delay || 300);

	return state;
};

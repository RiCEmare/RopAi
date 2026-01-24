import React, { createContext, useState, useCallback, useRef } from "react";

// Create the Context
export const GlobalContext = createContext();

// Smooth scroll animation with easing
const animateScroll = (container, targetLeft, duration = 800) => {
	const startLeft = container.scrollLeft;
	const distance = targetLeft - startLeft;
	const startTime = performance.now();

	// Ease-in-out cubic for smooth acceleration and deceleration
	const easeInOutCubic = (t) => {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	};

	const scroll = (currentTime) => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = easeInOutCubic(progress);

		container.scrollLeft = startLeft + distance * easedProgress;

		if (progress < 1) {
			requestAnimationFrame(scroll);
		}
	};

	requestAnimationFrame(scroll);
};

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
	const [pred, setPred] = useState(null);
	const [loading, setLoading] = useState(false);
	const scrollRefHolder = useRef(null);

	const setScrollRef = useCallback((ref) => {
		scrollRefHolder.current = ref;
	}, []);

	const scrollToSection = useCallback((sectionIndex) => {
		const isMobile = window.innerWidth < 768;
		const container = scrollRefHolder.current?.current;

		if (!container) return;

		if (isMobile) {
			// Vertical scroll on mobile - use section IDs
			const sectionIds = ["home", "buykit", "predict", "results"];
			const targetId =
				typeof sectionIndex === "number"
					? sectionIds[sectionIndex]
					: sectionIndex;
			const targetSection = container.querySelector(`#${targetId}`);
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		} else {
			// Horizontal scroll on desktop
			// Section widths: Home=100vw, BuyKit=50vw, Predict=100vw, Results=100vw
			// Scroll positions to show proper alignment:
			// 0: Home (start at 0)
			// 1: BuyKit (start at 50vw - shows right half of Home + BuyKit)
			// 2: Predict (start at 150vw)
			// 3: Results (start at 250vw)
			const vw = window.innerWidth;
			const scrollPositions = [
				0, // Home: start
				vw * 0.5, // BuyKit: scroll 50vw so Home's right half + BuyKit visible
				vw * 1.5, // Predict: after Home(100vw) + BuyKit(50vw)
				vw * 2.5, // Results: after Home + BuyKit + Predict
			];

			const targetScroll = scrollPositions[sectionIndex] || 0;

			// Use custom animated scroll with easing
			animateScroll(container, targetScroll, 800);
		}
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				pred,
				setPred,
				loading,
				setLoading,
				scrollToSection,
				setScrollRef,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

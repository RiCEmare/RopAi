import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import BuyKit from "./pages/BuyKit";
import Results from "./pages/Results";
import { useEffect, useRef, useContext, useState, useCallback } from "react";
import { GlobalContext } from "./GlobalState";

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

function App() {
	const { pred, setScrollRef } = useContext(GlobalContext);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const scrollRef = useRef(null);
	const isScrolling = useRef(false);

	// Handle resize for responsive behavior
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Pass scroll ref to global context
	useEffect(() => {
		if (scrollRef.current) {
			setScrollRef(scrollRef);
		}
	}, [setScrollRef]);

	// Horizontal scroll handler for desktop - snap to specific positions
	const onWheel = useCallback(
		(e) => {
			if (isMobile) return;
			if (e.deltaY === 0) return;
			e.preventDefault();

			// Debounce: ignore scroll events while animating
			if (isScrolling.current) return;

			const container = scrollRef.current;
			if (!container) return;

			const scrollLeft = container.scrollLeft;
			const vw = window.innerWidth;

			// Define snap points: Home(0), BuyKit(50vw), Predict(150vw), Results(250vw)
			const snapPoints = [0, vw * 0.5, vw * 1.5, vw * 2.5];

			// Find current position index
			let currentIndex = 0;
			for (let i = snapPoints.length - 1; i >= 0; i--) {
				if (scrollLeft >= snapPoints[i] - 10) {
					currentIndex = i;
					break;
				}
			}

			let targetIndex = currentIndex;
			if (e.deltaY > 0 && currentIndex < snapPoints.length - 1) {
				// Scroll right
				targetIndex = currentIndex + 1;
			} else if (e.deltaY < 0 && currentIndex > 0) {
				// Scroll left
				targetIndex = currentIndex - 1;
			}

			// Don't scroll to Results if it doesn't exist
			if (targetIndex === 3 && !pred) {
				targetIndex = 2;
			}

			// Don't scroll if we're already at the target
			if (targetIndex === currentIndex) return;

			// Set scrolling flag and clear after animation
			isScrolling.current = true;
			setTimeout(() => {
				isScrolling.current = false;
			}, 850); // Slightly longer than animation duration

			// Use custom animated scroll with easing
			animateScroll(container, snapPoints[targetIndex], 800);
		},
		[isMobile, pred],
	);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container || isMobile) return;

		container.addEventListener("wheel", onWheel, { passive: false });
		return () => container.removeEventListener("wheel", onWheel);
	}, [onWheel, isMobile]);

	return (
		<div className="app-wrapper">
			<Navbar />
			<LoadingScreen />
			<div
				className={`scroll-container ${isMobile ? "vertical" : "horizontal"}`}
				ref={scrollRef}>
				<section
					className="scroll-item home-section"
					id="home">
					<Home />
				</section>
				<section
					className="scroll-item buykit-section"
					id="buykit">
					<BuyKit />
				</section>
				<section
					className="scroll-item predict-section"
					id="predict">
					<Predict />
				</section>
				{pred && (
					<section
						className="scroll-item results-section"
						id="results">
						<Results />
					</section>
				)}
			</div>
		</div>
	);
}

export default App;

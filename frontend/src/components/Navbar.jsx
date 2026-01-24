import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";
import logo from "../assets/RopAi_logo.png";

const Navbar = () => {
	const { scrollToSection } = useContext(GlobalContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
	const navRefs = useRef([]);

	// Get nav item positions
	const getNavPositions = () => {
		return navRefs.current.map((ref) => {
			if (!ref) return { left: 0, width: 0 };
			const rect = ref.getBoundingClientRect();
			const parentRect =
				ref.parentElement.parentElement.getBoundingClientRect();
			return {
				left: rect.left - parentRect.left,
				width: rect.width,
			};
		});
	};

	// Interpolate between two positions
	const lerp = (start, end, progress) => start + (end - start) * progress;

	// Listen to scroll events to update indicator position smoothly
	useEffect(() => {
		const handleScroll = () => {
			const isMobile = window.innerWidth < 768;
			if (isMobile) return;

			const container = document.querySelector(".scroll-container");
			if (!container) return;

			const scrollLeft = container.scrollLeft;
			const vw = window.innerWidth;
			const positions = getNavPositions();

			if (positions.length < 4) return;

			// Define scroll ranges for each section
			// Home: 0 to 0.5vw, BuyKit: 0.5vw to 1.5vw, Predict: 1.5vw to 2.5vw, Results: 2.5vw+
			const scrollRanges = [
				{ start: 0, end: vw * 0.5 }, // Home -> BuyKit
				{ start: vw * 0.5, end: vw * 1.5 }, // BuyKit -> Predict
				{ start: vw * 1.5, end: vw * 2.5 }, // Predict -> Results
			];

			let targetLeft, targetWidth;

			if (scrollLeft <= 0) {
				// At Home
				targetLeft = positions[0].left;
				targetWidth = positions[0].width;
			} else if (scrollLeft >= vw * 2.5) {
				// At Results
				targetLeft = positions[3].left;
				targetWidth = positions[3].width;
			} else if (scrollLeft < vw * 0.5) {
				// Between Home and BuyKit
				const progress = scrollLeft / (vw * 0.5);
				targetLeft = lerp(
					positions[0].left,
					positions[1].left,
					progress,
				);
				targetWidth = lerp(
					positions[0].width,
					positions[1].width,
					progress,
				);
			} else if (scrollLeft < vw * 1.5) {
				// Between BuyKit and Predict
				const progress = (scrollLeft - vw * 0.5) / (vw * 1.0);
				targetLeft = lerp(
					positions[1].left,
					positions[2].left,
					progress,
				);
				targetWidth = lerp(
					positions[1].width,
					positions[2].width,
					progress,
				);
			} else {
				// Between Predict and Results
				const progress = (scrollLeft - vw * 1.5) / (vw * 1.0);
				targetLeft = lerp(
					positions[2].left,
					positions[3].left,
					progress,
				);
				targetWidth = lerp(
					positions[2].width,
					positions[3].width,
					progress,
				);
			}

			setIndicatorStyle({ left: targetLeft, width: targetWidth });
		};

		const container = document.querySelector(".scroll-container");
		if (container) {
			container.addEventListener("scroll", handleScroll);
			handleScroll(); // Initial position
		}

		// Also update on resize
		window.addEventListener("resize", handleScroll);

		return () => {
			if (container) {
				container.removeEventListener("scroll", handleScroll);
			}
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	// Initialize indicator position after refs are set
	useEffect(() => {
		const timer = setTimeout(() => {
			const positions = getNavPositions();
			if (positions[0]) {
				setIndicatorStyle({
					left: positions[0].left,
					width: positions[0].width,
				});
			}
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const handleNavClick = (index) => {
		scrollToSection(index);
		setIsMenuOpen(false);
	};

	return (
		<nav className="relative z-50 bg-dark-bg">
			<div className="container mx-auto my-4 md:my-8 px-6 md:px-24 flex justify-between items-center">
				{/* Logo */}
				<div className="text-xl font-bold">
					<span
						onClick={() => handleNavClick(0)}
						className="cursor-pointer">
						<img
							src={logo}
							alt="RopAi"
							className="max-h-10 md:max-h-16"
						/>
					</span>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:block relative">
					<ul className="flex space-x-8 lg:space-x-16 text-white font-zain font-regular text-lg lg:text-2xl">
						<li>
							<span
								ref={(el) => (navRefs.current[0] = el)}
								className="px-3 py-2 cursor-pointer transition-colors hover:text-green"
								onClick={() => handleNavClick(0)}>
								Home
							</span>
						</li>
						<li>
							<span
								ref={(el) => (navRefs.current[1] = el)}
								className="px-3 py-2 cursor-pointer transition-colors hover:text-green"
								onClick={() => handleNavClick(1)}>
								Buy Kit
							</span>
						</li>
						<li>
							<span
								ref={(el) => (navRefs.current[2] = el)}
								className="px-3 py-2 cursor-pointer transition-colors hover:text-green"
								onClick={() => handleNavClick(2)}>
								Predict
							</span>
						</li>
						<li>
							<span
								ref={(el) => (navRefs.current[3] = el)}
								className="px-3 py-2 cursor-pointer transition-colors hover:text-green"
								onClick={() => handleNavClick(3)}>
								Results
							</span>
						</li>
					</ul>

					{/* Glow indicator line */}
					<div
						className="absolute -bottom-4 h-0.5 bg-green rounded-full"
						style={{
							left: `${indicatorStyle.left}px`,
							width: `${indicatorStyle.width}px`,
							boxShadow:
								"0 0 10px #43FF8E, 0 0 20px #43FF8E, 0 0 30px #43FF8E",
						}}
					/>
				</div>

				{/* Mobile Hamburger Button */}
				<button
					className="md:hidden text-white p-2 focus:outline-none"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						{isMenuOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						)}
					</svg>
				</button>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden absolute top-full left-0 right-0 bg-dark-bg border-t border-grey z-50">
					<ul className="flex flex-col text-white font-zain font-regular text-xl py-4">
						<li>
							<span
								className="block px-6 py-3 hover:bg-grey2 hover:text-green cursor-pointer transition-colors"
								onClick={() => handleNavClick(0)}>
								Home
							</span>
						</li>
						<li>
							<span
								className="block px-6 py-3 hover:bg-grey2 hover:text-green cursor-pointer transition-colors"
								onClick={() => handleNavClick(1)}>
								Buy Kit
							</span>
						</li>
						<li>
							<span
								className="block px-6 py-3 hover:bg-grey2 hover:text-green cursor-pointer transition-colors"
								onClick={() => handleNavClick(2)}>
								Predict
							</span>
						</li>
						<li>
							<span
								className="block px-6 py-3 hover:bg-grey2 hover:text-green cursor-pointer transition-colors"
								onClick={() => handleNavClick(3)}>
								Results
							</span>
						</li>
					</ul>
				</div>
			)}

			{/* Divider */}
			<hr className="h-0.5 border-t-0 bg-grey opacity-100 mx-6 md:mx-20" />
		</nav>
	);
};

export default Navbar;

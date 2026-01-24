import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalState";
import loaderImage from "../assets/RopAi_Symbol.png"; // Update with the path to your PNG image

const LoadingScreen = () => {
	const { loading } = useContext(GlobalContext);
	const [showSlowMessage, setShowSlowMessage] = useState(false);

	useEffect(() => {
		// Disable scrolling while loading
		if (loading) {
			document.body.classList.add("no-scroll");

			// Show slow server message after 3 seconds
			const timer = setTimeout(() => {
				setShowSlowMessage(true);
			}, 3000);

			return () => clearTimeout(timer);
		} else {
			document.body.classList.remove("no-scroll");
			setShowSlowMessage(false);
		}

		// Cleanup
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [loading]);

	if (!loading) return null; // Don't render the loader if not loading

	return (
		<div className="loader-overlay">
			<img
				src={loaderImage}
				alt="Loading..."
				className="loader-image"
			/>
			{showSlowMessage && (
				<p className="loader-slow-message">
					Server is waking up... This may take up to 50 seconds due to
					inactivity on Render.
				</p>
			)}
		</div>
	);
};

export default LoadingScreen;

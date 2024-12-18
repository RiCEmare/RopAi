import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalState";
import loaderImage from "../assets/RopAi_Symbol.png"; // Update with the path to your PNG image

const LoadingScreen = () => {
  const { loading } = useContext(GlobalContext);

  useEffect(() => {
    // Disable scrolling while loading
    if (loading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [loading]);

  if (!loading) return null; // Don't render the loader if not loading

  return (
    <div className="loader-overlay">
      <img src={loaderImage} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default LoadingScreen;

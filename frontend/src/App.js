import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import BuyKit from "./pages/BuyKit";
import Results from "./pages/Results";
import { useEffect, useRef, useContext } from "react";
import { GlobalContext } from "./GlobalState";

function App() {

  const { pred } = useContext(GlobalContext); 



  const useHorizontalScroll = () => {
    const scrollRef = useRef();

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    useEffect(() => {
      // Store the ref value to unsubscribe from event during componentWillUnmount
      let refValueHolder = null;
      if (scrollRef) {
        refValueHolder = scrollRef.current;
        refValueHolder.addEventListener("wheel", onWheel);
      }
      return () => {
        refValueHolder.removeEventListener("wheel", onWheel);
      };
    }, []);

    return scrollRef;
  };

  const scrollRef = useHorizontalScroll();
  return (
    <>
      <Navbar />
      <div
        className="scroll-container"
        ref={scrollRef}
      >
        <div className="scroll-item">
          <Home />
        </div>
        <div className="scroll-item" style={{ flex: "0 0 50vw" }}>
          <BuyKit />
        </div>
        <div className="scroll-item">
          <Predict />
        </div>
        {pred && ( // Only render when `pred` is not null or has changed
          <div className="scroll-item">
            <Results />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

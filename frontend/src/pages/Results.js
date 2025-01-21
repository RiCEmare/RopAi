import React from "react";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalState";
import Tooltip from "../components/ToolTip";

const Results = () => {
  const { pred, scrollToSection } = useContext(GlobalContext);

  console.log("Predictions:", pred);

  const transformCrops = (data) => {
    // Extract the crops based on probability
    const topCrops = data.crops.sort((a, b) => b.probability - a.probability); // Sort by probability in descending order

    // Map the data to the required format
    return topCrops.map((crop) => ({
      name: crop.name, // Include the name
      width: `${(crop.probability * 36).toFixed(2)}rem`, // Scale the width (max 36rem)
      percent: (crop.probability * 100).toFixed(2), // Convert probability to percentage
      info: crop.info, // Include the info
    }));
  };

  const [crops, setCrops] = useState([
    {
      name: "Kidney Beans",
      percent: 65,
      width: "1rem",
      info: {},
    },
    {
      name: "Orange",
      percent: 15,
      width: "5.40rem",
      info: {},
    },
    {
      name: "Maize",
      percent: 10,
      width: "3.60rem",
      info: {},
    },
    {
      name: "Mango",
      percent: 7,
      width: "2.52rem",
      info: {},
    },
    {
      name: "Apple",
      percent: 3,
      width: "1.08rem",
      info: {},
    },
  ]);

  useEffect(() => {
    if (pred && pred.crops) {
      // Transform the data whenever pred changes
      const transformedCrops = transformCrops(pred);
      setCrops(transformedCrops); // Update the state
      scrollToSection(3); // Scroll to the results section
    }
  }, [pred, scrollToSection]); // Dependency array to monitor changes in pred
  return (
    <div className="min-h-screen text-white flex flex-col font-zain">
      {/* Soil Characteristics */}
      <div className="flex align-top items-start flex-col px-24 pt-10 pb-8">
        <p className="font-bold text-6xl">
          Crops predicted to get the best yield:
        </p>
      </div>
      <div className="flex align-top items-center justify-center flex-row px-24">
        {/* Names column */}
        <div className="flex flex-col space-y-12 py-6">
          {crops.map((crop, index) => (
            <Tooltip content={crop.info} key={`name-${index}`}>
            <p
              className={`${index === 0 ? "font-bold" : "font-light"} text-3xl`} // Highlight the first crop
              
            >
              {crop.name} {/* Display crop name */}
            </p>
            </Tooltip>
          ))}
        </div>

        {/* Vertical divider */}
        <hr className="inline-block w-0.5 h-auto ml-8 self-stretch bg-neutral-100 opacity-100 dark:opacity-50" />

        {/* Bar chart column */}
        <div className="flex flex-col space-y-12 py-6">
          {crops.map((crop, index) => (
            <Tooltip content={crop.info} key={`chart-${index}`}>
            <div
              className="flex flex-row items-center space-y-1"
              
            >
              <hr
                className="h-8 border-t-0 bg-green opacity-100"
                style={{ width: crop.width }} // Apply the width dynamically
              />
              
                <p className="font-light text-2xl ml-2">{crop.percent}%</p>

              
            </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Results;

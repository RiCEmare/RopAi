import React from "react";
import { useState } from "react";

const Results = () => {
    const [crops, setCrops] = useState([
        { width: '100px', percent: 20 },
        { width: '150px', percent: 40 },
        { width: '200px', percent: 60 },
        { width: '250px', percent: 80 },
        { width: '300px', percent: 100 }
      ]);
  return (
    <div className="min-h-screen text-white flex flex-col font-zain">
      {/* Soil Characteristics */}
      <div className="flex align-top items-start flex-col px-24 pt-10 pb-8">
        <p className="font-bold text-6xl">
          Crops predicted to get the best yield:
        </p>
      </div>
      <div className="flex align-top items-center justify-center flex-row px-24">
        <div className="flex flex-col space-y-12 py-6">
          <p className="font-bold text-3xl">Kidney Beans</p>
          <p className="font-light text-3xl">Kidney Beans</p>
          <p className="font-light text-3xl">Kidney Beans</p>
          <p className="font-light text-3xl">Kidney Beans</p>
          <p className="font-light text-3xl">Kidney Beans</p>
        </div>
        <hr className="inline-block w-0.5 h-auto ml-8 self-stretch bg-neutral-100 opacity-100 dark:opacity-50" />
        {/* bar chart*/}
        <div className="flex flex-col space-y-12 py-6">
        {crops.map((crop, index) => (
        <div className="flex flex-row items-center space-y-1" key={index}>
          <hr
            className="h-8 border-t-0 bg-green opacity-100"
            style={{ width: crop.width }} // Apply the width dynamically
          />
          <p className="font-light text-2xl ml-2">{crop.percent}%</p> {/* Map and display the percent */}
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};
export default Results;

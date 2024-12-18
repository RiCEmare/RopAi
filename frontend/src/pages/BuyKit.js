import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";

const BuyKit = () => {
  const { scrollToSection } = useContext(GlobalContext);
  return (
    <div className="min-h-screen text-white flex ">
      {/* Left side */}
      <div className="relative flex flex-col px-24 py-32 text-wrap font-zain font-light text-3xl">
        <p>
          To Test the soil characteristics, you may need a specialized soil test
          kit. This can help us measure the soils:
        </p>
        <ul className="list-disc whitespace-normal">
          <li>Nitrogen Ratio</li>
          <li>Phosporus Ratio</li>
          <li>Potassium Ratio</li>
          <li>pH Level</li>
        </ul>
        <p>You can use the given link to buy one.</p>
        <a
          href="https://www.daraz.com.np/products/ph-soil-test-kit-box-with-npk-testers-comprehensive-soil-analysis-tool-i107035150.html"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green items-center justify-center flex mt-8 w-52 rounded-lg"
          onClick={() => scrollToSection(3)}
        >
          <p className="font-bold my-3 mx-6">Buy Now!</p>
        </a>
      </div>
    </div>
  );
};

export default BuyKit;

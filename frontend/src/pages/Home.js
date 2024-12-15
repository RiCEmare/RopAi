import React from "react";
import grassImg from "../assets/grass.png";
import quote from "../assets/quote.png";
const Home = () => (
  <div className="min-h-screen text-white flex ">
    {/* Left side */}
    <div className="relative flex flex-col px-24 py-32 w-1/2 text-wrap font-zain font-light text-4xl">
    <img src={quote} alt="quote" className="max-h-16 absolute ml-96 pl-24 -mt-10"/>
      <p>
        <b>RopAi</b> is a platform that provides crop recommendations based on soil
        characteristics, environmental factors and geolocation with the use of
        AI model to help farmers in Nepal make better decisions about which
        crops to plant, when to plant them, and when to harvest.
      </p>
      <div className="bg-green items-center justify-center flex mt-8 w-52 rounded-lg">
        <p className="font-bold my-3 mx-6">Get Started!</p>
      </div>
    </div>
    <div className="w-1/2 justify-start flex mr-14">
    <img src={grassImg} alt="grass" className=" object-contain" />
    </div>
    
  </div>
);

export default Home;

import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";
import grassImg from "../assets/grass.png";
import quote from "../assets/quote.png";

const Home = () => {
	const { scrollToSection } = useContext(GlobalContext);

	return (
		<div className="min-h-full text-white flex flex-col md:flex-row p-6 md:p-0">
			{/* Left side - Text content */}
			<div className="relative flex flex-col px-6 md:px-12 lg:px-16 xl:px-24 py-12 md:py-12 lg:py-16 xl:py-24 w-full md:w-1/2 text-wrap font-zain font-light text-lg md:text-xl lg:text-2xl xl:text-3xl order-2 md:order-1">
				<img
					src={quote}
					alt="quote"
					className="max-h-10 md:max-h-12 lg:max-h-14 xl:max-h-16 absolute left-6 md:left-auto md:ml-72 lg:ml-80 xl:ml-96 md:pl-12 lg:pl-16 xl:pl-24 -mt-6 md:-mt-8 lg:-mt-9 xl:-mt-10 hidden md:block"
				/>
				<p className="leading-relaxed">
					<b>RopAi</b> is a platform that provides crop
					recommendations based on soil characteristics, environmental
					factors and geolocation with the use of AI model to help
					farmers in Nepal make better decisions about which crops to
					plant, when to plant them, and when to harvest.
				</p>
				<button
					className="bg-green items-center justify-center flex mt-4 md:mt-5 lg:mt-6 xl:mt-7 w-40 md:w-44 lg:w-48 xl:w-52 rounded-lg hover:bg-opacity-90 transition-all"
					onClick={() => scrollToSection(1)}>
					<p className="font-bold my-2 md:my-2.5 lg:my-2.5 xl:my-3 mx-4 md:mx-5 lg:mx-5 xl:mx-6 text-sm md:text-sm lg:text-base xl:text-base">
						Get Started!
					</p>
				</button>
			</div>

			{/* Right side - Image */}
			<div className="w-full md:w-1/2 flex justify-center items-end md:justify-start md:mr-8 lg:mr-12 xl:mr-14 order-1 md:order-2">
				<img
					src={grassImg}
					alt="grass"
					className="object-contain object-bottom max-h-48 md:max-h-full w-full"
				/>
			</div>
		</div>
	);
};

export default Home;

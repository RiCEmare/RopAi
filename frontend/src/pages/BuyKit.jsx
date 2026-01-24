import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";

const BuyKit = () => {
	const { scrollToSection } = useContext(GlobalContext);

	return (
		<div className="min-h-full text-white flex p-6 md:p-0 items-center">
			{/* Content */}
			<div className="relative flex flex-col px-6 md:px-12 lg:px-16 xl:px-24 py-8 md:py-12 lg:py-16 xl:py-24 text-wrap font-zain font-light text-base md:text-lg lg:text-xl xl:text-2xl max-w-full md:max-w-lg lg:max-w-xl">
				<p className="leading-relaxed">
					To Test the soil characteristics, you may need a specialized
					soil test kit. This can help us measure the soils:
				</p>
				<ul className="list-disc whitespace-normal pl-6 mt-2 md:mt-3 space-y-0.5">
					<li>Nitrogen Ratio</li>
					<li>Phosporus Ratio</li>
					<li>Potassium Ratio</li>
					<li>pH Level</li>
				</ul>
				<p className="mt-2 md:mt-3">
					You can use the given link to buy one.
				</p>
				<div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-3 md:mt-4 lg:mt-6">
					<a
						href="https://www.daraz.com.np/products/ph-soil-test-kit-box-with-npk-testers-comprehensive-soil-analysis-tool-i107035150.html"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-green items-center justify-center flex w-full sm:w-40 md:w-44 lg:w-52 rounded-lg hover:bg-opacity-90 transition-all">
						<p className="font-bold my-2 md:my-2.5 lg:my-3 mx-4 md:mx-5 lg:mx-6 text-sm md:text-sm lg:text-base">
							Buy Now!
						</p>
					</a>
					<button
						className="bg-grey2 items-center justify-center flex w-full sm:w-40 md:w-44 lg:w-52 rounded-lg hover:bg-grey3 transition-all"
						onClick={() => scrollToSection(2)}>
						<p className="font-bold my-2 md:my-2.5 lg:my-3 mx-4 md:mx-5 lg:mx-6 text-sm md:text-sm lg:text-base">
							Skip →
						</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BuyKit;

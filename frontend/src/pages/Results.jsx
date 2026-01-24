import React from "react";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalState";
import Tooltip from "../components/ToolTip";

const Results = () => {
	const { pred, scrollToSection } = useContext(GlobalContext);

	console.log("Predictions:", pred);

	const transformCrops = (data) => {
		const topCrops = data.crops.sort(
			(a, b) => b.probability - a.probability,
		);
		return topCrops.map((crop) => ({
			name: crop.name,
			widthPercent: (crop.probability * 100).toFixed(2),
			percent: (crop.probability * 100).toFixed(2),
			info: crop.info,
		}));
	};

	const [crops, setCrops] = useState([
		{ name: "Kidney Beans", percent: 65, widthPercent: 65, info: {} },
		{ name: "Orange", percent: 15, widthPercent: 15, info: {} },
		{ name: "Maize", percent: 10, widthPercent: 10, info: {} },
		{ name: "Mango", percent: 7, widthPercent: 7, info: {} },
		{ name: "Apple", percent: 3, widthPercent: 3, info: {} },
	]);

	useEffect(() => {
		if (pred && pred.crops) {
			const transformedCrops = transformCrops(pred);
			setCrops(transformedCrops);
			scrollToSection(3);
		}
	}, [pred, scrollToSection]);

	return (
		<div className="min-h-full text-white flex flex-col font-zain p-4 md:p-0 overflow-y-auto">
			{/* Header */}
			<div className="flex items-start flex-col px-4 md:px-12 lg:px-16 xl:px-24 pt-6 md:pt-8 lg:pt-10 pb-4 md:pb-6 lg:pb-8">
				<p className="font-bold text-2xl md:text-3xl lg:text-5xl xl:text-6xl leading-tight">
					Crops predicted to get the best yield:
				</p>
			</div>

			{/* Results Chart */}
			<div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center px-4 md:px-12 lg:px-16 xl:px-24">
				{/* Names column */}
				<div className="flex flex-col space-y-4 md:space-y-8 lg:space-y-12 py-4 md:py-6 w-full md:w-auto">
					{crops.map((crop, index) => (
						<Tooltip
							content={crop.info}
							key={`name-${index}`}>
							<div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
								<p
									className={`${index === 0 ? "font-bold" : "font-light"} text-lg md:text-xl lg:text-2xl xl:text-3xl min-w-24 md:min-w-0`}>
									{crop.name}
								</p>

								{/* Mobile: Inline bar */}
								<div className="flex md:hidden flex-row items-center flex-1 gap-2">
									<div
										className="h-6 bg-green rounded-sm"
										style={{
											width: `${Math.min(crop.widthPercent, 100)}%`,
											minWidth: "8px",
										}}
									/>
									<p className="font-light text-sm">
										{crop.percent}%
									</p>
								</div>
							</div>
						</Tooltip>
					))}
				</div>

				{/* Desktop: Vertical divider */}
				<hr className="hidden md:inline-block w-0.5 h-auto ml-4 lg:ml-8 self-stretch bg-neutral-100 opacity-100 dark:opacity-50" />

				{/* Desktop: Bar chart column */}
				<div className="hidden md:flex flex-col space-y-8 lg:space-y-12 py-6">
					{crops.map((crop, index) => (
						<Tooltip
							content={crop.info}
							key={`chart-${index}`}>
							<div className="flex flex-row items-center">
								<div
									className="h-6 lg:h-8 bg-green rounded-sm"
									style={{
										width: `${Math.min(crop.widthPercent * 0.28, 28)}rem`,
										minWidth: "1rem",
									}}
								/>
								<p className="font-light text-lg lg:text-xl xl:text-2xl ml-2">
									{crop.percent}%
								</p>
							</div>
						</Tooltip>
					))}
				</div>
			</div>
		</div>
	);
};

export default Results;

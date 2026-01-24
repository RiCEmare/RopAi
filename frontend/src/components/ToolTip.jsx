import React, { useState } from "react";
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useHover,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal,
	useClientPoint,
} from "@floating-ui/react";

const Tooltip = ({ children, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: "bottom",
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				fallbackAxisSideDirection: "end",
			}),
			shift(),
		],
	});

	const hover = useHover(context, { move: false });
	const focus = useFocus(context);
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "tooltip" });
	const clientPoint = useClientPoint(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		hover,
		focus,
		dismiss,
		role,
		clientPoint,
	]);

	return (
		<>
			<div
				ref={refs.setReference}
				{...getReferenceProps()}>
				{children}
			</div>
			<FloatingPortal>
				{isOpen && (
					<div
						className="bg-black text-white border-2 border-green rounded-md font-zain font-light text-2xl flex-col p-3 pr-20 space-y-4"
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}>
						<>
							<p className="font-bold text-3xl">
								Ideal Platation Time:
							</p>
							{content.plantation_time}
						</>
						<>
							<p className="font-bold text-3xl">
								Best Planted Before:
							</p>
							{content.planted_before}
						</>
						<>
							<p className="font-bold text-3xl">
								Common Diseases:
							</p>
							<ul className="list-disc pl-5">
								{content.common_diseases.map(
									(disease, index) => (
										<li key={index}>{disease}</li>
									),
								)}
							</ul>
						</>
					</div>
				)}
			</FloatingPortal>
		</>
	);
};

export default Tooltip;

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FlyoutLinkExp = () => {
	return (
		<div className="flex justify-center bg-gray-800 px-3 py-12">
			<FlyoutLink href="#"
				FlyoutContent={PricingContent}
			>
				Pricing
			</FlyoutLink>
		</div>
	)
}

const FlyoutLink = ({ children, href, FlyoutContent }) => {
	const [open, setOpen] = useState(false);
	const showFlyout = FlyoutContent && open;

	return (
		<div
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			className="relative w-fit h-fit"
		>
			<a href={href} className="relative text-white">
				{children}
				<span
					style={{
						transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
					}}
					// 	className="absolute -bottom-2 -left-1 -right-1 h-1 origin-left rounded-full
					//  bg-indigo-300 transition-transform duration-300 ease-out"
					className="absolute -bottom-2 -left-1 -right-1 h-1 origin-left rounded-full bg-cyan 
					duration-300 "
				/>
			</a>
			{/* render flyout content */}
			{showFlyout && (
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 15 }}
					style={{ translateX: "-50%" }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="absolute left-1/2 top-8 bg-white text-black z-50"
				>
					<div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
					{/* <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 
					rotate-45 bg-white" /> */}
					<FlyoutContent />
				</motion.div>
			)}
		</div>
	)
}

const PricingContent = () => {
	return (
		<div className="w-64 bg-white p-6 shadow-xl">
			<div className="mb-3 space-y-3">
				<h3 className="font-semibold">For Individuals</h3>
				<a href="#" className="block text-sm hover:underline">
					Introduction
				</a>
				<a href="#" className="block text-sm hover:underline">
					Pay as you go
				</a>
			</div>
			<div className="mb-6 space-y-3">
				<h3 className="font-semibold">For Companies</h3>
				<a href="#" className="block text-sm hover:underline">
					Startups
				</a>
				<a href="#" className="block text-sm hover:underline">
					SMBs
				</a>
				<a href="#" className="block text-sm hover:underline">
					Enterprise
				</a>
			</div>
			<button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
				Contact sales
			</button>
		</div>
	);
};

export default FlyoutLinkExp
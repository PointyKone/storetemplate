import {MenuIcon, XIcon, ShoppingCartIcon} from "@heroicons/react/outline"
import Link from "next/link";
import { useTheme } from "next-themes";
import { animated, useSpring } from "react-spring";
import { motion } from "framer-motion";
import { NextRouter, useRouter } from "next/router";
import { FC } from "react";
import { useNavbar } from "./Context";

import styles from "../styles/Navbar.module.css"
import * as animations from "../utils/aminations"

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
}

const NavItem: FC<{ href: string; text: string; dropdown?: boolean; router: NextRouter }> = ({
	href,
	text,
	router,
	dropdown
  }) => {
	const isActive = router.pathname === href;

	if (dropdown) {
		return (
			<Link href={href}>
				<a className={classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover-text-white", "block px-3 py-2 rounded-md text-base font-medium")}>{text}</a>
			</Link>
		)
	}
  
	return (
	  	<Link href={href}>
			<a
			className={classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium")}
			>
			{text}
			</a>
	  	</Link>
	);
};

const DropdownItem: FC<{ href: string; text: string; router: NextRouter }> = ({
	href,
	text,
	router
  }) => {
	const isActive = router.pathname === href;
  
	return (
	  	<Link href={href}>
			<a
			className={classNames(isActive ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
			>
			{text}
			</a>
	  	</Link>
	);
};

const ToggleMode: React.FC = () => {
	const { theme, setTheme } = useTheme();
  
	const properties = {
	  sun: {
		r: 9,
		transform: "rotate(40deg)",
		cx: 12,
		cy: 4,
		opacity: 0
	  },
	  moon: {
		r: 5,
		transform: "rotate(90deg)",
		cx: 30,
		cy: 0,
		opacity: 1
	  },
	  springConfig: { mass: 4, tension: 250, friction: 35 }
	};
	const { r, transform, cx, cy, opacity } =
	  theme === "dark" ? properties["moon"] : properties["sun"];
	const svgContainerProps = useSpring({
	  transform,
	  config: properties.springConfig
	});
	const centerCircleProps: any = useSpring({
	  r,
	  config: properties.springConfig
	});
	const maskedCircleProps: any = useSpring({
	  cx,
	  cy,
	  config: properties.springConfig
	});
	const linesProps = useSpring({ opacity, config: properties.springConfig });
  
	return (
	  <motion.div
		className="h-6 pl-4 pr-6 text-sm text-gray-700 flex"
		variants={animations.Pfp}
		onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
	  >
		<animated.svg
		  xmlns="http://www.w3.org/2000/svg"
		  width="24"
		  height="24"
		  viewBox="0 0 24 24"
		  fill="none"
		  stroke="currentColor"
		  strokeWidth="2"
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  style={{ ...svgContainerProps, cursor: "pointer" }}
		>
		  <mask id="mask">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<animated.circle
			  style={maskedCircleProps}
			  cx="12"
			  cy="4"
			  r="9"
			  fill="black"
			/>
		  </mask>
		  <animated.circle
			style={centerCircleProps}
			fill="currentColor"
			cx="12"
			cy="12"
			r="9"
			mask="url(#mask)"
		  />
  
		  <animated.g style={linesProps} fill="currentColor">
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		  </animated.g>
		</animated.svg>
		<button className="border-none pl-2">Toggle Theme</button>
	  </motion.div>
	);
  };

const Navbar = () => {

	const {isOpen, dropdownOpen, toggle, toggleDropdown} = useNavbar();

	const router = useRouter();

	const links = ["men", "women", "kids"];
	const dropdownLinks = ["profile", "settings", "kids"];

	return (
		<nav className="bg-gray-800">
			<>
			<section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute flex items-center sm:hidden">
						<button onClick={toggle} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							{isOpen ? (
								<XIcon aria-hidden="true" className="block h-6 w-6" />
							) : (
								<MenuIcon aria-hidden="true" className="block h-6 w-6" />
							)}
						</button>
					</div>

					<section className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-lg">
						<div className="flex-shrink-0 flex items-center">
							<Link href="/">
									<h1 className="text-white font-semibold block lg:hidden h-8 w-auto">StoreTemplate</h1>
							</Link>
							<Link href="/">
									<h1 className="text-white font-semibold hidden lg:block h-8 w-auto">StoreTemplate</h1>
							</Link>
						</div>

						<section className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								{links.map((link, index) => (
									<NavItem href={`/${link}`} router={router} text={link.charAt(0).toUpperCase() + link.slice(1)} key={index} />
								))}
							</div>
						</section>
					</section>

					<section className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						
						<div className="relative">
							<div>
								<button onClick={toggleDropdown} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
									<img
										className="h-8 w-8 rounded-full"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
                            		/>
								</button>
							</div>
							
							<div className={classNames(dropdownOpen ? styles.navTransitionProfileActive : styles.navTransitionProfileInactive, styles.navTransitionProfile)}>
								<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
									{dropdownLinks.map((link, index) => (
										<DropdownItem href={`/${link}`} key={index} router={router} text={link.charAt(0).toUpperCase() + link.slice(1)} />
									))}
									<ToggleMode />
								</div>
							</div>
						</div>
						<button className="ml-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
							<ShoppingCartIcon className="h-6 w-6" aria-hidden="true"></ShoppingCartIcon>
						</button>
					</section>
				</div>
			</section>

			<section className={classNames(isOpen ? "" : "hidden", "transition-all")}>
				<div className="px-2 pt-2 pb-3 space-y-1">
					{links.map((link, index) => (
						<NavItem href={`/${link}`} router={router} text={link.charAt(0).toUpperCase() + link.slice(1)} key={index} dropdown/>
					))}
				</div>
			</section>
			</>
		</nav>
	)
}

export default Navbar;

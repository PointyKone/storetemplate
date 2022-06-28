import {MenuIcon, XIcon, ShoppingCartIcon} from "@heroicons/react/outline"
import Link from "next/link";
import { useNavbarContext } from "./NavbarContext";

import styles from "../styles/Navbar.module.css"

const Navbar = () => {

	const {pages, dropdownLinks, isOpen, dropdownOpen, toggle, toggleDropdown} = useNavbarContext();

	const classNames = (...classes: string[]) => {
		return classes.filter(Boolean).join(" ");
	}

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
								{pages.map((page) => (
									<Link href={page.href} key={page.name}>
										<a className={classNames(page.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium")}>{page.name}</a>
									</Link>
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
									{dropdownLinks.map(link => (
										<Link href={link.href} key={link.name}>
											<a className={classNames(link.current ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>{link.name}</a>
										</Link>
									))}
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
					{pages.map(page => (
						<Link key={page.name} href={page.href}>
							<a className={classNames(
						page.current
						? "bg-gray-900 text-white"
						: "text-gray-300 hover:bg-gray-700 hover:text-white",
						"block px-3 py-2 rounded-md text-base font-medium"
					)}>{page.name}</a>
						</Link>
					))}
				</div>
			</section>
			</>
		</nav>
	)
}

export default Navbar;

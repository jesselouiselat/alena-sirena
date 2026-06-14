import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import MobileMenu from '@/Components/MobileMenu';
import FlyoverMenu from '@/Components/FlyoverMenu';

const navigation = {
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
};

export default function AuthenticatedLayout({ categories = [], header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile View Slider Drawer Panel */}
            <MobileMenu 
                categories={categories} 
                open={open} 
                setOpen={setOpen} 
                navigation={navigation} 
            />

            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            
                            {/* Mobile Hamburger Layout Trigger Menu Button */}
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden hover:text-gray-500 transition"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Branding Identity Logo Marks via Laravel Breeze application token props */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <span className="sr-only">Your Company</span>
                                    <ApplicationLogo className="h-8 w-auto fill-current text-indigo-600" />
                                </Link>
                            </div>

                            {/* Mega Flyout Dynamic Categories Selector Component Block */}
                            <FlyoverMenu categories={categories} navigation={navigation} />

                            {/* Navigation Toolbar Utilities Controls Segment Right Side Align */}
                            <div className="ml-auto flex items-center">
                                
                                {/* User Account Profiler Actions and Session Controls */}
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? (
                                        <div className="relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none transition py-2"
                                                        >
                                                            {user.name}
                                                            <svg
                                                                className="-me-0.5 ms-2 h-4 w-4 text-gray-400"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('profile.edit')}>
                                                        Profile
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href={route('dashboard')}>
                                                        Dashboard
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Log Out
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    ) : (
                                        <>
                                            <Link href={route('login')} className="text-sm font-medium text-gray-700 hover:text-gray-800 transition">
                                                Sign in
                                            </Link>
                                            <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                            <Link href={route('register')} className="text-sm font-medium text-gray-700 hover:text-gray-800 transition">
                                                Create account
                                            </Link>
                                        </>
                                    )}
                                </div>

                                {/* Global Query Search Trigger Wrapper Layout Area */}
                                <div className="flex lg:ml-6">
                                    <Link href="#" className="p-2 text-gray-400 hover:text-gray-500 transition">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>

                                {/* Commerce Bag Cart Interactivity Panel Trigger */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link href="#" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500 transition"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 transition">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Optional Contextual Breadcrumbs Page Headers */}
            {header && (
                <header className="bg-white border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Application Body Canvas Yield */}
            <main>
                {children}
            </main>
        </div>
    );
}
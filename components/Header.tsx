"use client"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const NAV = ["Explore", "Hire Talent", "Community"]

const SearchIcon = () => (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
)

export default function Header() {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center gap-4 sm:gap-8">
                        <button 
                            className="md:hidden p-2 text-gray-400 hover:text-white"
                            onClick={() => setOpen(!open)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                        <h1 
                            onClick={() => router.push("/")}
                            className="text-xl sm:text-2xl font-bold text-pink-500 cursor-pointer tracking-tight"
                        >
                            Dribbble
                        </h1>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            {NAV.map(item => (
                                <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors">{item}</a>
                            ))}
                        </nav>
                    </div>

                    <div className="hidden lg:flex flex-1 max-w-xs mx-4">
                        <div className="flex items-center gap-2 bg-gray-900 rounded-full px-4 py-2 w-full border border-gray-800 focus-within:border-gray-600">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-transparent text-xs sm:text-sm outline-none w-full text-gray-300 placeholder-gray-500" 
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {session?.user ? (
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => router.push("/profile")}
                                    className="hidden sm:block text-sm font-medium hover:text-pink-400 transition-all border border-gray-700 px-4 py-2 rounded-full"
                                >
                                    {session.user.name}
                                </button>
                                <button 
                                    onClick={() => signOut()}
                                    className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button 
                                    onClick={() => signIn()}
                                    className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-all px-2"
                                >
                                    Log in
                                </button>
                                <button 
                                    onClick={() => router.push("/signups")}
                                    className="text-xs sm:text-sm font-semibold bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-2 rounded-full transition-all shadow-lg"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-in slide-in-from-top duration-200">
                    <div className="px-4 py-4 space-y-4">
                        <div className="flex items-center gap-2 bg-black rounded-full px-4 py-2 border border-gray-800">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-transparent text-sm outline-none w-full text-gray-300" 
                            />
                        </div>
                        <nav className="flex flex-col gap-1">
                            {NAV.map(item => (
                                <a key={item} href="#" className="block py-3 px-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg">{item}</a>
                            ))}
                            {session?.user && (
                                <button 
                                    onClick={() => { router.push("/profile"); setOpen(false); }}
                                    className="w-full text-left py-3 px-4 text-sm font-bold text-pink-500 hover:bg-gray-800 rounded-lg border border-pink-500/20 mt-2"
                                >
                                    View Profile
                                </button>
                            )}
                        </nav>
                        {!session?.user && (
                             <button 
                                onClick={() => router.push("/signups")}
                                className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-sm"
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
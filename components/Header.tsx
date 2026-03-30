"use client"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const NAV = ["Explore", "Hire Talent", "Community"]

const SearchIcon = () => (
    <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
)

export default function Header() {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className="">
            <header className="bg-black text-white border-b border-gray-800">

                <div className="hidden md:flex items-center justify-between px-8 py-4">
                    <h1 className="text-2xl font-bold text-pink-500 tracking-tight">Dribbble</h1>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 rounded-full px-4 py-2">
                            <SearchIcon />
                            <input type="text" placeholder="What are you looking for?" className="bg-transparent text-sm outline-none w-52 text-gray-300 placeholder-gray-500" />
                        </div>
                        <nav className="flex items-center gap-5 text-sm font-medium text-white">
                            {NAV.map(item => (
                                <a key={item} href="#" className="hover:text-pink-400 transition-colors">{item}</a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        {session?.user ? (
                            <button onClick={() => signOut()} className="text-sm font-medium text-white hover:text-pink-400 transition-colors">Log out</button>
                        ) : (
                            <button onClick={() => signIn()} className="text-sm font-medium text-white hover:text-pink-400 transition-colors">Log in</button>
                        )}

                        {
                            !session?.user ? (
                                <button onClick={() => router.push("/signups")} className="text-sm font-semibold bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-colors">
                                    Sign up
                                </button>
                            ) : (
                                <button onClick={() => router.push("/profile")} className="text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-colors">
                                    {session.user.name}
                                </button>
                            )
                        }
                    </div>
                </div>

                <div className="md:hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold text-pink-500 tracking-tight">Dribbble</h1>
                        <div className="flex items-center gap-2">
                            {session?.user ? (
                                <button onClick={() => signOut()} className="text-sm font-medium text-white hover:text-pink-400 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-colors">Log out</button>
                            ) : (
                                <button onClick={() => signIn()} className="text-sm font-medium text-white hover:text-pink-400 transition-colors">Log in</button>
                            )}
                            {!session?.user && (
                                <button
                                    onClick={() => router.push("/signups")}
                                    className="text-sm font-semibold bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-full transition-colors">
                                    Sign up
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mx-4 mb-3 rounded-full px-4 py-2">
                        <SearchIcon />
                        <input type="text" placeholder="What are you looking for?" className="bg-transparent text-sm outline-none w-full text-gray-300 placeholder-gray-500" />
                    </div>

                    {open && (
                        <nav className="flex flex-col gap-4 px-4 py-4 border-t border-gray-800 text-sm font-medium text-white">
                            {NAV.map(item => (
                                <a key={item} href="#" className="hover:text-pink-400 transition-colors">{item}</a>
                            ))}
                        </nav>
                    )}
                </div>

            </header>
        </div>
    )
}